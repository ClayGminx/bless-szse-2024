<template>
    <img id="mindMappingImg"
         ref="mindMappingImg"
         src="/深交所宣传标语思维导图.v2.png"
         alt="深交所宣传标语思维导图"
         draggable="false"
         @mousedown="startDrag"
         @mousemove="onDragging"
         @mouseup="endDrag"
         @mousewheel="zoomInOut"
         :width="imgWidth"
         :style="imgStyle"
         :class="{ flutter: dragging }"/>
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
            imgStyle: {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)'
            },
            flutter: {
                zIndex: 9999,
                pointerEvents: 'none'
            },
            initial: {
                offsetLeft: 0,
                offsetTop: 0,
                pageX: 0,
                pageY: 0
            },
            imgWidth: '63%',
            scale: 0.523,
            clonedImg: null,
            dragging: false,
            playPath: [{// 中心主题
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
        }
    },
    computed: {
        getMaxDisplayWidth() {
            return Math.floor(window.innerWidth * 0.63);
        },
        getMaxDisplayHeight() {
            return Math.floor(window.innerHeight * 0.7);
        }
    },
    methods: {
        startDrag(e) {
            this.dragging = true;
            this.initial.offsetLeft = e.target.offsetLeft;
            this.initial.offsetTop = e.target.offsetTop;
            this.initial.pageX = e.pageX;
            this.initial.pageY = e.pageY;
        },
        onDragging(e) {
            if (this.dragging) {
                let left = this.initial.offsetLeft + e.pageX - this.initial.pageX,
                    top = this.initial.offsetTop + e.pageY - this.initial.pageY;
                this.imgStyle.left = `${left}px`;
                this.imgStyle.top = `${top}px`;
            }
        },
        endDrag() {
            this.dragging = false;
        },
        zoomInOut(e) {
            let width = parseInt(this.imgWidth),
                delta = parseInt(width * 0.05),
                left = parseInt(this.imgStyle.left),
                top = parseInt(this.imgStyle.top);
            if (e.wheelDelta > 0) {// 放大
                width += delta;
                this.imgStyle.left = `${left - delta / 2}px`;
                this.imgStyle.top = `${top - parseInt(delta * this.scale  /2)}px`;
            } else {// 缩小
                const minWidth = 194;
                width -= delta;
                if (width < minWidth) {
                    return;
                }
                this.imgStyle.left = `${left + delta / 2}px`;
                this.imgStyle.top = `${top + parseInt(delta * this.scale  /2)}px`;
            }
            this.imgWidth = `${width}px`;
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
        const img = this.$refs.mindMappingImg;
        let left = img.offsetLeft - img.offsetWidth / 2,
            top = parseInt(img.offsetTop - img.offsetWidth * this.scale / 2);
        this.imgStyle = {
            position: 'absolute',
            left: `${left}px`,
            top: `${top}px`
        };
        this.imgWidth = `${img.offsetWidth}px`;
    }
}
</script>

<style scoped>
#mindMappingImg:hover {
    /* 开始抓取的动作 */
    cursor: grab;
}

#mindMappingImg:active {
    /* 正在抓取的动作 */
    cursor: grabbing;
}
</style>