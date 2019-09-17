<template>
  <div id="app" style="touch-action: none; height: 100%;
    overflow: hidden;
    width: 100%;
    position: fixed;">
    <div style="position: absolute; top: 0;">Started: <span id="started"></span></div>
    <div style="position: absolute; top: 20px;">ended: <span id="ended"></span></div>
    <div style="position: absolute; top: 40px;">touches: <span id="touches"></span></div>
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
import Ball from './ball';
import Mouse from './mouse';

const mouse = new Ball(0, 0, 30, 'rgba(255, 0, 0, .5)');

export default {
  name: 'app',
  data () {
    return {
      canvas: null,
      ctx: null,
      dots: [],
      mousePos: null
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    render() {
      window.requestAnimationFrame(this.render);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      mouse.setPos(this.mousePos.x, this.mousePos.y);
	    mouse.draw(this.ctx);
      this.dots.forEach(ball => {
        ball.think(this.mousePos, 100);
        ball.draw(this.ctx);
      });
      this.draw();
    },
    init() {
      for (let i = 0; i < 300; i++) {
        this.dots.push(
          // new Ball(
          //   (window.innerWidth / 2) + 100 * Math.cos(i * 2 * Math.PI / 9),
          //   (window.innerHeight / 2) + 100 * Math.sin(i * 2 * Math.PI / 9)
          // )
          new Ball(
            window.innerWidth * Math.random(),
            window.innerHeight * Math.random()
          )
        );
      }
      window.addEventListener('resize', this.resize, false);
      this.resize();
      this.render();
    },
    initCanvas(width, height) {
      this.canvas = document.getElementById('canvas');
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.ctx = this.canvas.getContext('2d');
      this.mousePos = new Mouse(this.canvas);
    },
    resize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.initCanvas();
    },
    draw() {
      this.ctx.beginPath();
	    this.ctx.moveTo(this.dots[0].x, this.dots[0].y);
      // this.dots.forEach(({ x, y }) => this.ctx.lineTo(x, y));
      // this.ctx.fillStyle = 'rgba(0, 0, 0, .3)';
      // const dlen = this.dots.length;
      // for (let i = 0; i <= dlen; ++i) {
      //   const p0 = this.dots[i + 0 >= dlen ? i + 0 - dlen : i + 0];
      //   const p1 = this.dots[i + 1 >= dlen ? i + 1 - dlen : i + 1];
      //   this.ctx.quadraticCurveTo(p0.x, p0.y, (p0.x + p1.x) * 0.5, (p0.y + p1.y) * 0.5);
	    // }
      // this.ctx.closePath();
      this.ctx.fill();
      // this.ctx.stroke();
    }
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
</style>