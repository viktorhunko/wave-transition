<template>
  <div id="app">
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
class Circle {
  constructor(x, y, r = 100, n = 10) {
    this.cx = x;
    this.cy = y;
    this.r = r;
    this.n = n;
    this._dots = [];
    this.swells = true;
    this.initDots();
  }
  initDots() {
    for (let i = 0; i < this.n; i++) {
      const { x, y } = this.rotate(1, i);
      this._dots.push({
        x,
        y,
        deviation: 1
      });
    }
  }
  get dots() {
    return this._dots;
  }
  set dots(dots) {
    this._dots = dots;
  }
  rotate(deviation, i) {
    const radians = ((2 * Math.PI) / this.n) * i;
    const startX = this.cx;
    const startY = this.cy - this.r;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    const rotatedX = (cos * (startX - this.cx)) + (sin * (startY - this.cy)) + this.cx;
    const rotatedY = (cos * (startY - this.cy)) - (sin * (startX - this.cx)) + this.cy;
    const deviatedX = (rotatedX * deviation) + (this.cx * (1 - deviation));
    const deviatedY = (rotatedY * deviation) + (this.cy * (1 - deviation));
    return { x: deviatedX, y: deviatedY };
  }
  update() {
    if (this.swells) {
      this._dots[3].deviation += .01;
    } else {
      this._dots[3].deviation -= .01;
    }
    for (let i = 0; i < this._dots.length; i++) {
      ({ x: this._dots[i].x, y: this._dots[i].y } = this.rotate(this._dots[i].deviation, i));
    }

    if (this._dots[3].deviation >= 1.25) this.swells = false;
    if (this._dots[3].deviation <= .75) this.swells = true;
  }
}
export default {
  name: 'app',
  data () {
    return {
      canvas: null,
      ctx: null,
      fps: 60,
      circle: null
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.resize();
      const interval = Math.round(1000 / this.fps);
      const timer = setInterval(this.update, interval);
      this.addListener(window, 'resize', this.resize);
    },
    initCanvas(width, height) {
      this.canvas = document.getElementById('canvas');
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.ctx = this.canvas.getContext('2d');
    },
    resize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.circle = new Circle(this.width / 2, this.height / 2, 100, 36);
      this.initCanvas();
    },
    update() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.circle.update();
      this.draw();
    },
    draw() {
      if (!this.circle.dots.length) return;
      this.ctx.beginPath();
      this.ctx.moveTo(this.circle.dots[0].x, this.circle.dots[0].y);
      this.ctx.fillStyle = 'red';
      for(let i = 1; i < this.circle.dots.length; i++) {
        this.ctx.lineTo(this.circle.dots[i].x, this.circle.dots[i].y);
      }
      this.ctx.fill();
    },
    addListener(e, str, func) {
      if (e.addEventListener) {
        e.addEventListener(str, func, false);
      } else if (e.attachEvent) {
        e.attachEvent(`on${str}`, func);
      }
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