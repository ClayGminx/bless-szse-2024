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
export default {
    name: 'MindMapping',
    data() {
        return {
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
            imgWidth: '50%',
            scale: 0.523,
            clonedImg: null,
            dragging: false
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