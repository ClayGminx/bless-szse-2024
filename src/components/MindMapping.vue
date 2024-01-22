<template>
    <div id="MindMapping" :style="mindMappingStyle">
        <img id="MindMappingImg"
             src="/深交所宣传标语思维导图.v2.png"
             alt="深交所宣传标语思维导图"
             draggable="true"
             :width="imgWidth"
             :style="imgStyle"/>
    </div>
</template>

<script>
export default {
    name: 'MindMapping',
    data() {
        return {
            mindMappingStyle: {
                display: 'inline-block',
                position: 'absolute',
                border: '1px solid #fff',
                width: '775px',
                height: '400px',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                overflow: 'hidden'
            },
            imgStyle: {
                position: 'relative',
                top: '0px',
                left: '0px',
                opacity: 1
            },
            imgWidth: '100%',
            pos: {
                x: 0,
                y: 0,
                offsetX: 0,
                offsetY: 0
            }
        }
    },
    mounted() {
        const mindMapping = document.getElementById('MindMapping');
        const mindMappingImg = document.getElementById('MindMappingImg');

        mindMapping.addEventListener('mousewheel', event => {
            let width = parseInt(this.imgWidth);
            if (event.wheelDelta > 0) {
                // 放大图片
                width += 5;
            } else {
                // 缩小图片
                if (width > 0) {
                    width -= 5;
                }
                if (width < 0) {
                    width = 0;
                }
            }
            this.imgWidth = width + '%';
        });

        mindMappingImg.addEventListener('dragstart', event => {
            this.pos.x = event.pageX;
            this.pos.y = event.pageY;
            this.imgStyle.opacity = 0.5;
            console.log(`dragstart ${this.pos.x},${this.pos.y}`);
        });
        mindMappingImg.addEventListener('drag', event => {
            let offsetX = event.pageX - this.pos.x,
                offsetY = event.pageY - this.pos.y;
            console.log(`drag ${offsetX},${offsetY}`);
            console.log(`drag ${this.imgStyle.left},${this.imgStyle.top}`);
            this.imgStyle.left = parseInt(this.imgStyle.left) + offsetX + 'px';
            this.imgStyle.top = parseInt(this.imgStyle.top) + offsetY + 'px';
        });
        mindMappingImg.addEventListener('dragend', event => {
            // let offsetX = event.pageX - this.pos.x,
            //     offsetY = event.pageY - this.pos.y;
            // this.imgStyle.left = parseInt(this.imgStyle.left) + offsetX + 'px';
            // this.imgStyle.top = parseInt(this.imgStyle.top) + offsetY + 'px';
            this.imgStyle.opacity = 1;
        });
    }
}
</script>

<style scoped>
</style>