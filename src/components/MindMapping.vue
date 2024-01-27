<template>
  <div>
    <transition
      :enter-active-class="enterActiveClass"
      :leave-active-class="leaveActiveClass">
      <div id="imgContainer"
           ref="imgContainer"
           draggable="false"
           v-if="active"
           @mousedown="startDrag"
           @mousemove="onDragging"
           @mouseup="endDrag"
           @mousewheel="zoomInOut"
           :style="imgContainerStyle"
           :class="{ flutter: dragging }"></div>
    </transition>
  </div>
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
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: 'auto',
        width: '0px',
        height: '0px',
        backgroundSize: 'cover'
      },
      flutter: {
        zIndex: 9999,
        pointerEvents: 'none'
      },
      enterAnimation: ['animate__animated', 'animate__heartBeat'],
      initialPos: {
        offsetLeft: 0,
        offsetTop: 0,
        pageX: 0,
        pageY: 0
      },
      // 是否正在拖动
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
        w: 1000,
        h: 270
      }, {// 深交所“十四五”发展战略规划与“优一”建设纲要的总体原则
        x: 2640,
        y: 623,
        w: 1440,
        h: 555
      }, {// 深交所“十四五”发展战略规划的主要目标
        x: 2640,
        y: 1164,
        w: 1440,
        h: 492
      }, {// “优一”建设纲要的主要目标
        x: 2640,
        y: 1662,
        w: 1558,
        h: 375
      }, {// 十四五IT发展战略目标
        x: 0,
        y: 0,
        w: 1890,
        h: 2037
      }, {// 战略目标之使命&愿景
        x: 326,
        y: 140,
        w: 978,
        h: 586
      }, {// 战略目标之原则&策略
        x: 244,
        y: 718,
        w: 982,
        h: 660
      }, {// 战略目标之战略目标
        x: 42,
        y: 1364,
        w: 1188,
        h: 256
      }, {// 战略目标之重点任务
        x: 432,
        y: 1600,
        w: 794,
        h: 390
      }],
      nextPath: -1,
      // 是否正在演示
      showing: false,
      // 要不要显示思维导图
      active: false,
      // 入场类名
      enterActiveClass: 'animate__animated animate__backInDown',
      // 离场类名
      leaveActiveClass: ''
    };
  },
  computed: {
    getMaxShowWidth() {
      return window.innerWidth - 605;
    },
    getMaxShowHeight() {
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
      console.debug('start drag', this.initialPos);
    },
    onDragging(e) {
      if (this.dragging) {
        // 拖拽时改变位置
        let left = this.initialPos.offsetLeft + e.pageX - this.initialPos.pageX,
            top = this.initialPos.offsetTop + e.pageY - this.initialPos.pageY;
        this.imgContainerStyle.right = undefined;
        this.imgContainerStyle.bottom = undefined;
        this.imgContainerStyle.margin = undefined;
        this.imgContainerStyle.left = `${left}px`;
        this.imgContainerStyle.top = `${top}px`;
      }
    },
    endDrag() {
      this.dragging = false;
    },
    zoomInOut(e) {
      if (this.showing) {
        // 演示时不要缩放，因为太复杂了
        return;
      }
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
    getShowProp(x, y, w, h) {
        let displayWidth, displayHeight, displayX, displayY, scale;
        if (w > this.getMaxShowWidth) {
            displayWidth = this.getMaxShowWidth;
        } else {
            displayWidth = w;
        }
        scale = Math.round(displayWidth / w * 10000) / 10000;
        displayHeight = Math.floor(h * scale);
        if (displayHeight > this.getMaxShowHeight) {
            displayWidth = parseInt(displayWidth * this.getMaxShowHeight / displayHeight);
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
        let scale = Math.floor(this.imgSize.w / w * 100);
        return `${scale}%`;
    },
    showNext() {
      if (++this.nextPath === this.showPath.length) {
        this.nextPath--;
        return;
      }
      this.showing = true;
      this.internalShow();
    },
    showPrevious() {
      if (--this.nextPath < 0) {
        this.nextPath++;
        return;
      }
      this.showing = true;
      this.internalShow();
    },
    internalShow() {
      const next = this.showPath[this.nextPath];
      console.debug(`show ${this.nextPath}: ${JSON.stringify(next)}`);

      const showProp = this.getShowProp(next.x, next.y, next.w, next.h);
      console.debug(`show property: ${JSON.stringify(showProp)}`);

      this.active = false;

      switch (this.nextPath) {
        case 0:
          this.enterActiveClass = 'animate__animated animate__heartBeat';
          break;
        case 1:
          this.enterActiveClass = 'animate__animated animate__rotateInDownLeft';
          break;
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 9:
        case 10:
        case 11:
          this.enterActiveClass = 'animate__animated animate__fadeInUp';
          break;
        case 7:
          this.enterActiveClass = 'animate__animated animate__bounceInLeft';
          break;
        case 8:
          this.enterActiveClass = 'animate__animated animate__rotateInDownRight';
          break;
        default:
          break;
      }
      
      this.$nextTick(() => {
        this.imgContainerStyle.width = `${showProp.w}px`;
        this.imgContainerStyle.height = `${showProp.h}px`;
        this.imgContainerStyle.backgroundPosition = `${showProp.x}px ${showProp.y}px`;
        this.imgContainerStyle.backgroundSize = this.getBackgroundSize(next.w);
        this.imgContainerStyle.left = 0;
        this.imgContainerStyle.right = 0;
        this.imgContainerStyle.top = 0;
        this.imgContainerStyle.bottom = 0;
        this.imgContainerStyle.margin = 'auto';
        this.active = true;
      });
    },
    startMindMapping() {// 思维导图入场
      // 计算思维导图的尺寸
      let h = Math.ceil(this.getMaxShowWidth * (this.imgSize.h / this.imgSize.w));
      this.imgContainerStyle.width = `${this.getMaxShowWidth}px`;
      this.imgContainerStyle.height = `${h}px`;
      this.active = true;
      console.debug(`mind mapping: width=${this.imgContainerStyle.width}, height=${h}`);
    },
    leaveMindMapping() {// 思维导图离场
      // 注意，此处队离场类样式的代码，应当放在`$nextTick()`之前
      this.leaveActiveClass = 'animate__animated animate__backOutDown animate__slower';
      this.$nextTick(() => {
        this.active = false;
      });
    }
  },
  mounted() {
    // 监听键盘指令
    this.$bus.$on('startMindMapping', this.startMindMapping);
    this.$bus.$on('leaveMindMapping', this.leaveMindMapping);
    this.$bus.$on('showNext', this.showNext);
    this.$bus.$on('showPrevious', this.showPrevious);
  }
}
</script>

<style scoped>
#imgContainer {
  display: inline-block;
  position: absolute;
  background-image: url(images/深交所宣传标语.v3.png);
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