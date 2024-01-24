<template>
  <div id="app">
    <!-- 思维导图 -->
    <MindMapping/>
    
    <!-- 音乐播放器 -->
    <MusicPlayer/>

    <!-- 烟花 -->
    <SpringFirework/>

    <!-- 上浮宣传标语 -->
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="25" height="110" style="position: absolute; top: 580px; left: 1%" id="text1">
      <text x="0"
            y="25"
            fill="#F5DF9D"
            transform="rotate(90,0,25)"
            rotate="-90"
            style="font: 25px 楷体,楷体-简; letter-spacing:1px">公诚勤廉</text>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="25" height="260" style="position: absolute; top: 350px; left: 50px;" id="text2">
      <text x="0"
            y="25"
            fill="#F5DF9D"
            transform="rotate(90,0,25)"
            rotate="-90"
            style="font: 25px 楷体,楷体-简; letter-spacing:1px">全面实现深交所数字化</text>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="25" height="260" style="position: absolute; top: 400px; left: 100px;" id="text3">
      <text x="0"
            y="25"
            fill="#F5DF9D"
            transform="rotate(90,0,25)"
            rotate="-90"
            style="font: 25px 楷体,楷体-简; letter-spacing:1px">快速灵活协同业务创新</text>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="25" height="260" style="position: absolute; top: 300px; left: 150px;" id="text4">
      <text x="0"
            y="25"
            fill="#F5DF9D"
            transform="rotate(90,0,25)"
            rotate="-90"
            style="font: 25px 楷体,楷体-简; letter-spacing:1px">持续有力保障安全运营</text>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="25" height="260" style="position: absolute; top: 410px; left: 200px;" id="text5">
      <text x="0"
            y="25"
            fill="#F5DF9D"
            transform="rotate(90,0,25)"
            rotate="-90"
            style="font: 25px 楷体,楷体-简; letter-spacing:1px">提高深交所核心竞争力</text>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="25" height="370" style="position: absolute; top: 260px; right: 255px" id="text6">
      <text x="0"
            y="25"
            fill="#F5DF9D"
            transform="rotate(90,0,25)"
            rotate="-90"
            style="font: 25px 楷体,楷体-简; letter-spacing:1px">建设国际一流的数字化基础设施</text>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="25" height="320" style="position: absolute; top: 200px; right: 205px" id="text7">
      <text x="0"
            y="25"
            fill="#F5DF9D"
            transform="rotate(90,0,25)"
            rotate="-90"
            style="font: 25px 楷体,楷体-简; letter-spacing:1px">打造世界领先的数字化平台</text>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="25" height="320" style="position: absolute; top: 350px; right: 155px" id="text8">
      <text x="0"
            y="25"
            fill="#F5DF9D"
            transform="rotate(90,0,25)"
            rotate="-90"
            style="font: 25px 楷体,楷体-简; letter-spacing:1px">构建卓越精益的数字化能力</text>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="25" height="320" style="position: absolute; top: 300px; right: 105px" id="text9">
      <text x="0"
            y="25"
            fill="#F5DF9D"
            transform="rotate(90,0,25)"
            rotate="-90"
            style="font: 25px 楷体,楷体-简; letter-spacing:1px">构筑开放协作的数字化生态</text>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="25" height="160" style="position: absolute; top: 500px; right: 55px" id="text10">
      <text x="0"
            y="25"
            fill="#F5DF9D"
            transform="rotate(90,0,25)"
            rotate="-90"
            style="font: 25px 楷体,楷体-简; letter-spacing:1px">汇聚创新资本</text>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="25" height="160" style="position: absolute; top: 500px; right: 25px" id="text11">
      <text x="0"
            y="25"
            fill="#F5DF9D"
            transform="rotate(90,0,25)"
            rotate="-90"
            style="font: 25px 楷体,楷体-简; letter-spacing:1px">激发成长动力</text>
    </svg>
  </div>
</template>

<script>
import MusicPlayer from '@/components/MusicPlayer.vue';
import MindMapping from '@/components/MindMapping.vue';
import SpringFirework from '@/components/SpringFirework.vue';

export default {
  name: 'App',
  components: {MusicPlayer, MindMapping, SpringFirework}
}
</script>

<style scoped>
#id {
  height: 700px;
}

@keyframes floatText1 {
  from {top: 580px}
  to {top: -110px}
}

@-webkit-keyframes floatText1 {
  from {top: 580px}
  to {top: -110px}
}

#text1 {
  /* 每像素100ms的速度 */
  animation: floatText1 69s linear 1s infinite;
}

@keyframes floatText2 {
  from {top: 350px}
  to {top: -260px}
}

@-webkit-keyframes floatText2 {
  from {top: 350px}
  to {top: -260px}
}

#text2 {
  animation: floatText2 61s linear 1s infinite;
}

@keyframes floatText3 {
  from {top: 400px}
  to {top: -260px}
}

@-webkit-keyframes floatText3 {
  from {top: 400px}
  to {top: -260px}
}

#text3 {
  animation: floatText3 66s linear 1s infinite;
}

@keyframes floatText4 {
  from {top: 300px}
  to {top: -260px}
}

@-webkit-keyframes floatText4 {
  from {top: 300px}
  to {top: -260px}
}

#text4 {
  animation: floatText4 56s linear 1s infinite;
}

@keyframes floatText5 {
  from {top: 410px}
  to {top: -260px}
}

@-webkit-keyframes floatText5 {
  from {top: 410px}
  to {top: -260px}
}

#text5 {
  animation: floatText5 67s linear 1s infinite;
}

@keyframes floatText6 {
  from {top: 260px}
  to {top: -370px}
}

@-webkit-keyframes floatText6 {
  from {top: 260px}
  to {top: -370px}
}

#text6 {
  animation: floatText6 63s linear 1s infinite;
}

@keyframes floatText7 {
  from {top: 200px}
  to {top: -320px}
}

@-webkit-keyframes floatText7 {
  from {top: 200px}
  to {top: -320px}
}

#text7 {
  animation: floatText7 52s linear 1s infinite;
}

@keyframes floatText8 {
  from {top: 350px}
  to {top: -320px}
}

@-webkit-keyframes floatText8 {
  from {top: 350px}
  to {top: -320px}
}

#text8 {
  animation: floatText8 67s linear 1s infinite;
}

@keyframes floatText9 {
  from {top: 300px}
  to {top: -320px}
}

@-webkit-keyframes floatText9 {
  from {top: 300px}
  to {top: -320px}
}

#text9 {
  animation: floatText9 62s linear 1s infinite;
}

@keyframes floatText10 {
  from {top: 500px}
  to {top: -160px}
}

@-webkit-keyframes floatText10 {
  from {top: 500px}
  to {top: -160px}
}

#text10 {
  animation: floatText10 66s linear 1s infinite;
}

@keyframes floatText11 {
  from {top: 500px}
  to {top: -160px}
}

@-webkit-keyframes floatText11 {
  from {top: 500px}
  to {top: -160px}
}

#text11 {
  animation: floatText11 66s linear 1s infinite;
}
</style>