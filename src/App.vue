<template>
  <div id="app">
    <canvas id="bitRain" ref="bitRain"></canvas>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      fontSize: 8,
      columns: 0,
      yPositions: []
    }
  },
  methods: {
    drawRain() {
      // const ctx = document.getElementById('bitRain').getContext('2d');
      // ctx.fillStyle = 'rgba(0,0,0,0)';
      // ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      // ctx.font = '700 8px Arial';
      // ctx.fillStyle = '#00cc33';
      // for (let i = 0; i < this.columns; i++) {
      //   let index = Math.floor(Math.random() * 2);
      //   let x = i * this.fontSize;
      //   let y = this.yPositions[i] * this.fontSize;
      //   ctx.fillText('' + index, x, y);
      //   if (y >= this.$refs.bitRain.height && Math.random() > 0.99) {
      //     this.yPositions[i] = 0;
      //   }
      //   this.yPositions[i]++;
      // }
    }
  },
  mounted() {
    this.columns = Math.floor(window.innerWidth / this.fontSize);
    // for (let i = 0; i < this.columns; i++) {
    //   this.yPositions.push(0);
    // }
    const ctx = document.getElementById('bitRain').getContext('2d');
    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.font = '16px 楷体';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('公诚勤廉', 300, 300);
  }
}
</script>

<style scoped>
#bitRain {
  margin: 0 8px;
  width: 100%;
  height: 100%;
}
</style>