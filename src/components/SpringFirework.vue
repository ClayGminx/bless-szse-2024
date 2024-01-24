<template>
    <canvas id="SpringFirework" ref="SpringFirework"></canvas>
</template>

<script>
class FireWork {
  constructor(startX, startY, endX, endY) {
    // 烟花起始点(从哪个地方开始发射)
    this.startX = startX;
    this.startY = startY;

    // 当前坐标(烟花移动过程中使用)
    this.x = this.startX;
    this.y = this.startY;

    // 烟花结束点(发射到哪个地方)
    this.endX = endX;
    this.endY = endY;

    // 目标距离
    this.targetDistance = this._getPointsDistance(
      this.startX,
      this.startY,
      this.endX,
      this.endY
    );

    // 当前烟花移动的距离
    this.currentDistance = 0;

    // hsla 色调
    this.hue = this._getRandomRange(0, 360);
    // hsla 亮度
    this.lightness = this._getRandomRange(50, 70);

    // 被发射的角度(根据给定的开始、结束位置计算角度)
    this.angle = Math.atan2(this.endY - this.startY, this.endX - this.startX);

    // 移动速度
    this.speed = 2;
    this.acceleration = 1.05; // 加速度系数
  }

  draw(ctx) {
    ctx.save();
    this.speed *= this.acceleration;
    const moveX = this.x + Math.cos(this.angle) * this.speed;
    const moveY = this.y + Math.sin(this.angle) * this.speed;
    ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.lightness}%, 60%)`; // 仅亮度会变化
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(moveX, moveY);
    ctx.stroke();
    ctx.restore();

    this.currentDistance = this._getPointsDistance(
      this.startX,
      this.startY,
      moveX,
      moveY
    );

    this.x = moveX;
    this.y = moveY;
  }

  // 是否到达目标地点
  isArrived() {
    return this.currentDistance >= this.targetDistance;
  }

  // 获取烟花色调
  getHue() {
    return this.hue;
  }

  // 获取目标位置的坐标
  getTargetCoordinate() {
    return [this.endX, this.endY];
  }

  _getRandomRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  // 计算直角（笛卡尔）坐标系中两点间距离
  _getPointsDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  }
}

class Particle {
  constructor(x, y, hue) {
    // 初始位置
    this.x = x;
    this.y = y;

    // 从烟花那得来的hsla色调
    this.hue = this._getRandomRange(hue - 20, hue + 20);
    //this.hue = hue
    // 随机hsla亮度
    this.lightness = this._getRandomRange(50, 80);

    // 初始透明度
    this.alpha = 1
    // 随机的透明度衰变系数（透明度减淡）
    this.alphaDecay = this._getRandomRange(0.015, 0.03);

    // 模拟下坠摩擦力(让粒子减速)
    this.friction = 0.95;
    // 模拟重力加速度
    this.gravity = 1;

    // 随机角度
    this.angle = this._getRandomRange(0, 2 * Math.PI);
    // 随机初始速度
    this.speed = this._getRandomRange(1, 10);
  }

  draw(ctx) {
    ctx.save();
    // 减速
    this.speed *= this.friction;
    // 计算新位置
    const moveX = this.x + Math.cos(this.angle) * this.speed;
    const moveY = this.y + Math.sin(this.angle) * this.speed + this.gravity;

    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(moveX, moveY);

    ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.lightness}%, ${this.alpha})`;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.restore();
    this.x = moveX;
    this.y = moveY;
    // 透明度衰减
    this.alpha -= this.alphaDecay;
  }

  _getRandomRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  // 粒子是否已经看不见
  isVanished() {
    return this.alpha < this.alphaDecay;
  }
}

export default {
    name: 'SpringFirework',
    data() {
        return {
            timeTicker: 0,
            timeTotal: 80,
            fireworks: [],
            particlesCount: 50,
            particles: []
        }
    },
    methods: {
        resizeCanvas() {
            const canvas = this.$refs.SpringFirework;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        },
        getRandomRange(min, max) {
            return Math.random() * (max - min) + min;
        },
        draw() {
            const canvas = this.$refs.SpringFirework;
            const ctx = canvas.getContext('2d');
            // 透明度控制拖尾效果
            ctx.fillStyle = 'rgba(0,0,0,0.03)';
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // 画烟花
            for (let index = 0; index < this.fireworks.length; index++) {
                const firework = this.fireworks[index]
                firework.draw(ctx)
                if (firework.isArrived()) {
                    this.fireworks.splice(index, 1)
                    index--
                    for (let j = 0; j < this.particlesCount; j++) {
                        this.particles.push(
                            new Particle(
                                ...firework.getTargetCoordinate(),
                                firework.getHue()
                            )
                        )
                    }
                }
            }

            // 画粒子
            for (let index = 0; index < this.particles.length; index++) {
                const particle = this.particles[index]
                particle.draw(ctx)
                if (particle.isVanished()) {
                    this.particles.splice(index, 1)
                    index--
                }
            }

            // 函数循环80次自动发射8支烟花
            if (this.timeTicker >= this.timeTotal) {
                for (let index = 0; index < this.timeTotal / 10; index++) {
                    this.fireworks.push(
                        new FireWork(
                            canvas.width / 2,
                            canvas.height,
                            this.getRandomRange(0, canvas.width),
                            this.getRandomRange(100, canvas.height / 2)
                        )
                    )
                }
                this.timeTicker = 0
            } else {
                this.timeTicker++
            }

            window.requestAnimationFrame(this.draw);
        }
    },
    mounted() {
        this.resizeCanvas();
        this.draw();
    }
}
</script>