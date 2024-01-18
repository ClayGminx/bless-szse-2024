<template>
  <div id="MusicPlayer">
    <div class="music-info">
      <div class="music-title">{{ playlist[current].title }}</div>
      <div class="music-artist">{{  playlist[current].artist }}</div>
    </div>
    <div class="music-actions">
      <button class="backward-button" title="播放上一首" @click="playPrevious">
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="12.5" viewBox="0 0 320 512">
          <path fill="#f5f5dc" d="M267.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160L64 241V96c0-17.7-14.3-32-32-32S0 78.3 0 96V416c0 17.7 14.3 32 32 32s32-14.3 32-32V271l11.5 9.6 192 160z"/>
        </svg>
      </button>
      <span>&emsp;</span>
      <button class="play-button" title="播放歌曲" v-if="!playing" @click="playCurrent">
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="15" viewBox="0 0 384 512">
          <path fill="#f5f5dc" d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/>
        </svg>
      </button>
      <button class="pause-button" title="暂停播放" v-if="playing" @click="pause">
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="12.5" viewBox="0 0 320 512">
          <path fill="#f5f5dc" d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/>
        </svg>
      </button>
      <span>&emsp;</span>
      <button class="forward-button" title="播放下一首" @click="playNext">
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="12.5" viewBox="0 0 320 512">
          <path fill="#f5f5dc" d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4l192 160L256 241V96c0-17.7 14.3-32 32-32s32 14.3 32 32V416c0 17.7-14.3 32-32 32s-32-14.3-32-32V271l-11.5 9.6-192 160z"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MusicPlayer',
  data() {
    return {
      playlist: [{
        url: '/songs/新年喜洋洋.mp3',
        title: '新年喜洋洋',
        artist: '卓依婷'
      },{
        url: '/songs/恭喜恭喜.mp3',
        title: '恭喜恭喜',
        artist: '卓依婷'
      },{
        url: '/songs/新年好.mp3',
        title: '新年好',
        artist: '卓依婷'
      }],
      current: 0,
      playing: false,
      audio: null
    }
  },
  methods: {
    playCurrent() {
      if (this.audio != null) {
        this.playing = true;
        this.audio.play();
      } else {
        let songPath = this.playlist[this.current].url;
        let audio = new Audio(songPath);
        audio.addEventListener('canplaythrough', e => {
          audio.play();
          this.audio = audio;
          this.playing = true;
        });
        audio.addEventListener('ended', e => {
          this.playNext();
        });
      }
    },
    pause() {
      if (this.audio != null) {
        this.playing = false;
        this.audio.pause();
      }
    },
    playNext() {
      // 先暂停播放当前歌曲
      if (this.audio instanceof Audio) {
        this.playing = false;
        this.audio.pause();
        this.audio = null;
      }

      this.current = (this.current + 1) % this.playlist.length;
      this.playCurrent();
    },
    playPrevious() {
      // 先暂停播放当前歌曲
      if (this.audio instanceof Audio) {
        this.playing = false;
        this.audio.pause();
        this.audio = null;
      }

      this.current = (this.current - 1 + this.playlist.length) % this.playlist.length;
      this.playCurrent();
    }
  }
}
</script>

<style scoped>
#MusicPlayer {
  display: inline-block;
  position: fixed;
  left: 0;
  bottom: 1em;
}

#MusicPlayer > .music-info {
  display: inline-block;
  width: 6em;
  color: white;
  margin: 0;
  padding: 0 1em;
}

.music-title {
  font-weight: bold;
  margin-bottom: 0.3em;
}

.music-artist {
  color: #ccc;
  font-size: smaller;
}

#MusicPlayer > .music-actions {
  display: inline-block;
  height: 30px;
}

.music-actions > button {
  border: none;
  background: unset;
  padding: 0;
  width: 15px;
  text-align: center;
}

.music-actions > button:hover {
  cursor: pointer;
}
</style>