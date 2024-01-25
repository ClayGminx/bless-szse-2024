<template>
  <div id="imgContainer"
       ref="imgContainer"
       draggable="false"
       @mousedown="startDrag"
       @mousemove="onDragging"
       @mouseup="endDrag"
       @mousewheel="zoomInOut"
       :style="imgContainerStyle"
       :class="{ flutter: dragging }"></div>
</template>

<script>
/*
   图片位置：
   水平居中、垂直居中

   展示最大宽度：
   window.innerWidth * 0.63

   展示最大高度：
   window.innerHeight * 0.7

   演示：
   if 演示部分的宽度 <= 展示最大宽度
     演示宽度 = 演示部分的宽度
   else
     演示宽度 = 展示最大宽度
   
   演示缩放比 = 演示宽度 / 演示部分的宽度
   演示高度 = 演示部分的高度 * 演示缩放比
   if 演示高度 > 展示最大高度
     演示宽度 = 演示宽度 * 展示最大高度 / 演示高度
     演示缩放比 = 演示宽度 / 演示部分的宽度

   background-size = 图片原始宽度 / 演示部分的宽度
   演示高度 = 演示部分的高度 * 演示缩放比
   background-position-x = 0 - 演示部分的横坐标 * 演示缩放比
   background-position-y = 0 - 演示部分的纵坐标 * 演示缩放比
 */
export default {
  name: 'MindMapping',
  data() {
    return {
      // 图片的原始尺寸
      imgSize: {
        w: 4195,
        h: 2037
      },
      imgContainerStyle: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '0px',
        height: '0px',
        backgroundSize: 'cover'
      },
      flutter: {
        zIndex: 9999,
        pointerEvents: 'none'
      },
      initialPos: {
        offsetLeft: 0,
        offsetTop: 0,
        pageX: 0,
        pageY: 0
      },
      dragging: false,
      showPath: [{// 中心主题
        x: 1870,
        y: 850,
        w: 837,
        h: 258
      }, {// 价值观
        x: 2640,
        y: 0,
        w: 800,
        h: 230
      }, {// 使命
        x: 2640,
        y: 178,
        w: 800,
        h: 280
      }, {// 愿景
        x: 2640,
        y: 395,
        w: 395,
        h: 270
      }, {// 总体原则
        x: 2640,
        y: 623,
        w: 1440,
        h: 555
      }, {// 主要目标
        x: 2640,
        y: 1164,
        w: 1440,
        h: 492
      }, {// 主要目标
        x: 2640,
        y: 1662,
        w: 1558,
        h: 375
      }, {// 战略目标
        x: 0,
        y: 0,
        w: 1990,
        h: 2037
      }, {// 使命&愿景
        x: 326,
        y: 140,
        w: 978,
        h: 586
      }, {// 原则策略
        x: 244,
        y: 718,
        w: 982,
        h: 660
      }, {// 战略目标
        x: 42,
        y: 1364,
        w: 1188,
        h: 256
      }, {// 重点任务
        x: 432,
        y: 1600,
        w: 794,
        h: 390
      }]
    };
  },
  computed: {
    getMaxDisplayWidth() {
      return window.innerWidth - 605;
    },
    getMaxDisplayHeight() {
      return Math.floor(window.innerHeight * 0.7);
    }
  },
  methods: {
      startDrag(e) {
          this.dragging = true;
          this.initialPos.offsetLeft = e.target.offsetLeft;
          this.initialPos.offsetTop = e.target.offsetTop;
          this.initialPos.pageX = e.pageX;
          this.initialPos.pageY = e.pageY;
      },
      onDragging(e) {
          if (this.dragging) {
              let left = this.initialPos.offsetLeft + e.pageX - this.initialPos.pageX,
                  top = this.initialPos.offsetTop + e.pageY - this.initialPos.pageY;
              this.imgContainerStyle.left = `${left}px`;
              this.imgContainerStyle.top = `${top}px`;
          }
      },
      endDrag() {
          this.dragging = false;
      },
      zoomInOut(e) {
          let width = parseInt(this.$refs.imgContainer.offsetWidth),
              delta = parseInt(width * 0.05),
              left = parseInt(this.imgContainerStyle.left),
              top = parseInt(this.imgContainerStyle.top),
              scale = this.imgSize.h / this.imgSize.w;
          if (e.wheelDelta > 0) {// 放大
              width += delta;
              this.imgContainerStyle.left = `${left - delta / 2}px`;
              this.imgContainerStyle.top = `${top - parseInt(delta * scale / 2)}px`;
          } else {// 缩小
              const minWidth = 194;
              width -= delta;
              if (width < minWidth) {
                  return;
              }
              this.imgContainerStyle.left = `${left + delta / 2}px`;
              this.imgContainerStyle.top = `${top + parseInt(delta * scale / 2)}px`;
          }
          this.imgContainerStyle.width = `${width}px`;
          let height = Math.ceil(width * scale);
          this.imgContainerStyle.height = `${height}px`;
      },
      getDisplayProp(x, y, w, h) {
          let displayWidth, displayHeight, displayX, displayY, scale;
          if (w > this.getMaxDisplayWidth) {
              displayWidth = this.getMaxDisplayWidth;
          } else {
              displayWidth = w;
          }
          scale = Math.round(displayWidth / w * 10000) / 10000;
          displayHeight = Math.floor(h * scale);
          if (displayHeight > this.getMaxDisplayHeight) {
              displayWidth = parseInt(displayWidth * this.getMaxDisplayHeight / displayHeight);
              scale = Math.round(displayWidth / w * 10000) / 10000;
          }
          displayHeight = Math.floor(h * scale);
          displayX = 0 - Math.floor(x * scale);
          displayY = 0 - Math.floor(y * scale);
          return {
              x: displayX,
              y: displayY,
              w: displayWidth,
              h: displayHeight
          };
      },
      getBackgroundSize(w) {
          let scale = Math.floor(this.imgSize / w * 100);
          return `${scale}%`;
      }
  },
  mounted() {
    let h = Math.ceil(this.getMaxDisplayWidth * (this.imgSize.h / this.imgSize.w));
    this.imgContainerStyle.width = `${this.getMaxDisplayWidth}px`;
    this.imgContainerStyle.height = `${h}px`;

    this.$nextTick(() => {
      let target = this.$refs.imgContainer;
      let left = target.offsetLeft - Math.floor(target.offsetWidth / 2),
          top = Math.floor(target.offsetTop - target.offsetWidth * (this.imgSize.h / this.imgSize.w) / 2);
      console.debug(`left=${left}, top=${top}`);
      this.imgContainerStyle.left = `${left}px`;
      this.imgContainerStyle.top = `${top}px`;
      this.imgContainerStyle.transform = undefined;
    });
  }
}
</script>

<style scoped>
#imgContainer {
  display: inline-block;
  position: absolute;
  background-image: url(深交所宣传标语.v3.png);
  background-repeat: no-repeat;
}

#imgContainer:hover {
  /* 开始抓取的动作 */
  cursor: grab;
}

#imgContainer:active {
  /* 正在抓取的动作 */
  cursor: grabbing;
}
</style>