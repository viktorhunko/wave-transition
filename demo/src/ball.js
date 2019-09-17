export default class Ball {
  constructor(x = 0, y = 0, radius = 2, color = '#000000') {
    this.x = x;
    this.y = y;
    this.originalX = x;
    this.originalY = y;
    this.vx = 0;
    this.vy = 0;
    this.radius = radius;
    this.color = color;
    this.friction = .99;
    this.springFactor = .01;
  }
  setPos(x, y) {
    this.x = x;
    this.y = y;
  }

  think(subject, sensitivity = 30){
    const dx = this.x - subject.x;
    const dy = this.y - subject.y;
    const dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

    // interaction
    if (dist < sensitivity) {
      const angle = Math.atan2(dy, dx);
      const tx = subject.x + Math.cos(angle) * sensitivity;
      const ty = subject.y + Math.sin(angle) * sensitivity;

      this.vx += tx - this.x;
      this.vy += ty - this.y;
    }
  
    // spring back
    const dx1 = -(this.x - this.originalX);
    const dy1 = -(this.y - this.originalY);
    this.vx += dx1 * this.springFactor;
    this.vy += dy1 * this.springFactor;

    // friction
    this.vx *= this.friction;
    this.vy *= this.friction;

    // actual move
    this.x += this.vx;
    this.y += this.vy;
  }
  
  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}
  