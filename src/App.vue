<template>
  <div class="app">
    <div><img src="./assets/background_SSA.jpg" id="backgroundapp" alt="backgroundapp"></div>
    <div id="musicPlayer">
      <div class="songList">
        <div class="headerSongList">
          <button v-on:click="previousAlbum">
            <font-awesome-icon icon="angles-left" />
          </button>
          <img
            v-bind:src="this.$store.state.allAlbum[this.albumIndex].cover"
            alt="Pochette Album"
          />
          <button v-on:click="nextAlbum">
            <font-awesome-icon icon="angles-right" />
          </button>
        </div>
        <div class="albumSong">
          <SongOnList
            v-for="song in this.$store.state.allAlbum[this.albumIndex].songs"
            :key="song"
            v-bind:title="song.title"
            v-bind:url="song.url"
            v-bind:id="song.id"
            v-bind:onPlay="song.play"
            v-bind:cover="this.$store.state.allAlbum[this.albumIndex].cover"
            v-on:playSong="playSong"
            v-on:stopSong="stopSong"
          >
          </SongOnList>
        </div>
      </div>
      <div class="Display">
        <div class="informations">
          <div class="informations__time">
            <p>{{ currentDuration }}</p>
            <input
              id="ProgressBar"
              type="range"
              min="0"
              v-bind:max="this.secDuration"
              v-model="this.currentTime"
              v-on:change="changeCurrentTime()"
            />
            <p>{{ totalDuration }}</p>
          </div>
          <div class="informations__track">
            <p>{{ this.$store.state.currentAudio.title }}</p>
          </div>
        </div>
        <div class="Display__Option">
          <div class="Display__Option__Trick">
            <button id="Shuffle" class="off" v-on:click="Shuffle">
              <font-awesome-icon icon="shuffle" />
            </button>
            <button id="Loop" class="off" v-on:click="Loop">
              <font-awesome-icon icon="repeat" />
            </button>
            <button id="Visu" class="off" v-on:click="VisuDisplay()">
                <font-awesome-icon icon="eye" />
            </button>
          </div>
          <div class="Display__Option__Volume">
            <button id="Mute" v-on:click="Mute()">
              <font-awesome-icon v-if="this.volume == 0" icon="volume-xmark" />
              <font-awesome-icon
                v-else-if="this.volume < 25"
                icon="volume-off"
              />
              <font-awesome-icon
                v-else-if="this.volume < 75"
                icon="volume-low"
              />
              <font-awesome-icon v-else icon="volume-high" />
            </button>
            <input
              id="VolumeRange"
              type="range"
              min="0"
              max="100"
              step="1"
              v-model="this.volume"
              v-on:change="changeVolume()"
            />
          </div>
        </div>
        <div class="Display__navigation">
          <button id="Previous" v-on:click="previousSong()">
            <font-awesome-icon icon="angle-left" />
          </button>
          <div class="Display__navigation__OnOff">
            <button
              id="Play"
              v-if="this.playPause === false"
              v-on:click="playSong()"
            >
              <font-awesome-icon icon="play" />
            </button>
            <button
              id="Pause"
              v-if="this.playPause === true"
              v-on:click="pauseSong()"
            >
              <font-awesome-icon icon="pause" />
            </button>
            <button id="Stop" v-on:click="stopSong">
              <font-awesome-icon icon="stop" />
            </button>
          </div>
          <button id="Next" v-on:click="nextSong()">
            <font-awesome-icon icon="angle-right" />
          </button>
        </div>
      </div>
    </div>
    <SporeVisualisateur v-bind:audio="this.audio" ref="SporeVisualisateur"></SporeVisualisateur>
  </div>
</template>

<script>
import SongOnList from "./components/SongOnList.vue";
import SporeVisualisateur from "./components/SporeVisualisateur.vue"


export default {
  name: "App",
  components: {
    'SporeVisualisateur': SporeVisualisateur,
    SongOnList,

  },
  data() {
    return {
      songInteval: null,
      previousVolume: 0,
      onShuffle: false,
      playPause: false,
      onLoop: false,
      volume: 100,
      albumIndex: 0,
      audio: null,
      totalDuration: "0:00",
      currentDuration: "0:00",
      secDuration: 0,
      currentTime: 0,
      background: './assets/background_SSA.png'       
    };
  },
  methods: {
    // NAVIGATE
    previousAlbum() {
      if (this.albumIndex == 0) {
        this.albumIndex = 2;
      } else {
        this.albumIndex--;
      }
    },
    nextAlbum() {
      if (this.albumIndex == 2) {
        this.albumIndex = 0;
      } else {
        this.albumIndex++;
      }
    },
    nextSong() {
      if (this.onShuffle) {
        this.stopSong();
        this.getRandomSong();
        this.playSong();
      } else {
        let id = this.$store.state.currentAudio.id - 1;
        for (let j = 0; j <= this.$store.state.allAlbum.length; j++) {
          if (
            this.$store.state.currentAudio.cover ==
            this.$store.state.allAlbum[j].cover
          ) {
            if (!this.$store.state.allAlbum[j].songs[id + 1]) {
              if (!this.$store.state.allAlbum[j + 1]) {
                this.buildNewSong(0, 0);
                this.albumIndex = 0;
                return;
              } else {
                this.buildNewSong(j + 1, 0);
                this.albumIndex++;
                return;
              }
            } else {
              this.buildNewSong(j, id + 1);
              return;
            }
          }
        }
      }
    },
    previousSong() {
      if (this.onShuffle) {
        this.stopSong();
        this.getRandomSong();
        this.playSong();
      } else {
        let id = this.$store.state.currentAudio.id - 1;
        for (let j = 0; j <= this.$store.state.allAlbum.length; j++) {
          if (
            this.$store.state.currentAudio.cover ==
            this.$store.state.allAlbum[j].cover
          ) {
            let allAlbumLength = this.$store.state.allAlbum.length - 1;
            let allSongLength = this.$store.state.allAlbum[j].songs.length - 1;
            if (!this.$store.state.allAlbum[j].songs[id - 1]) {
              if (!this.$store.state.allAlbum[j - 1]) {
                this.buildNewSong(allAlbumLength, allSongLength);
                this.albumIndex = allAlbumLength;
                return;
              } else {
                this.buildNewSong(j - 1, allSongLength);
                this.albumIndex--;
                return;
              }
            } else {
              this.buildNewSong(j, id - 1);
              return;
            }
          }
        }
      }
    },

    // PLAY//OFF//PAUSE

    playSong() {
      if (this.$store.state.currentAudio.url == null) {
        this.getRandomSong();
      }
      if (this.$store.state.onPlay) {
        this.audio.play();
      } else {
        this.audio.src = this.$store.state.currentAudio.url;
        this.audio.preload = "auto"
        this.audio.play()
        setTimeout(
             function () {
               this.getInfo();
             }.bind(this),
             100
           );
          this.$store.state.onPlay = true;
          this.$store.commit("SwitchOnOff", this.$store.state.currentAudio.id);          
      }
      this.playPause = true;
      this.audio.addEventListener('timeupdate', () => {
        this.currentTime = Math.floor(this.audio.currentTime) 
        this.transformInMin(this.currentTime)
        }
      )
    },
    pauseSong() {
      this.audio.pause();
      this.playPause = false;
      return
    },
    stopSong() {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.playPause = false;
      this.$store.state.onPlay = false;
      this.$store.commit("SwitchOnOff", this.$store.state.currentAudio.id);
      return
    },

    //UTILITY

    getInfo() {
      let secTrack = Math.floor(this.audio.duration % 60);
      let minTrack = Math.floor(this.audio.duration / 60);
      
      this.secDuration = this.audio.duration;
      if(secTrack < 10) {
        secTrack = `0${secTrack}`
      }
      if(minTrack < 10) {
        minTrack = `0${minTrack}`
      }
      this.totalDuration = `${minTrack}:${secTrack}`;
    },
    transformInMin(time) {
      let s = Number(time);
      let minute = Math.floor(s / 60);
      let seconde = Math.floor(s % 60);
      if (seconde < 10) {
        seconde = `0${seconde}`;
      }
      if (minute < 10) {
        minute = `0${minute}`;
      }
      return this.currentDuration = `${minute}:${seconde}`;
    },
    changeVolume() {
      let setVolume = this.volume / 100;
      this.audio.volume = setVolume;
    },
    Mute() {
      if (this.audio.volume == 0) {
        this.audio.volume = this.previousVolume;
        this.volume = this.previousVolume * 100;
      } else {
        this.previousVolume = this.audio.volume;
        this.volume = 0;
        this.audio.volume = 0;
      }
    },
    buildNewSong(indexAlbum, indexSong) {
      clearInterval(this.songInteval);
      if (this.$store.state.onPlay == true) {
        this.$store.commit("SwitchOnOff", this.$store.state.currentAudio.id);
      }
      let newAudio = {
        title: this.$store.state.allAlbum[indexAlbum].songs[indexSong].title,
        url: this.$store.state.allAlbum[indexAlbum].songs[indexSong].url,
        cover: this.$store.state.allAlbum[indexAlbum].cover,
        id: this.$store.state.allAlbum[indexAlbum].songs[indexSong].id,
      };
      this.$store.commit("changeCurrentSong", newAudio);
      this.$store.state.onPlay = false;
      this.playSong();
    },
    getRandomSong() {
      let a = Math.floor(Math.random() * this.$store.state.allAlbum.length);
      let s = Math.floor(
        Math.random() * this.$store.state.allAlbum[a].songs.length
      );
      this.albumIndex = a;
      let audio = {
        title: this.$store.state.allAlbum[a].songs[s].title,
        url: this.$store.state.allAlbum[a].songs[s].url,
        cover: this.$store.state.allAlbum[a].cover,
        id: this.$store.state.allAlbum[a].songs[s].id,
      };
      this.$store.commit("changeCurrentSong", audio);
    },
    Loop() {
      this.$store.commit("changeLoop");
      let Loop = document.getElementById("Loop")
      if (this.onLoop) {
        this.audio.loop = false;
        this.onLoop = false;
        Loop.removeAttribute("class", "on");
        Loop.setAttribute("class", "off")
      } else {
        this.audio.loop = true;
        this.onLoop = true;
        Loop.removeAttribute("class", "off");
        Loop.setAttribute("class", "on");
      }
    },
    Shuffle() {
      let Shuffle = document.getElementById("Shuffle")
      if (this.onShuffle) {
        this.onShuffle = false;
        Shuffle.removeAttribute("class", "on");
        Shuffle.setAttribute("class", "off")
      } else {
        this.onShuffle = true;
        Shuffle.removeAttribute("class", "off");
        Shuffle.setAttribute("class", "on")
      }
    },
    VisuDisplay() {
      let Visu = document.getElementById("Visu")
      if(this.$store.state.VisuOn) {
          this.$store.state.VisuOn = false
          Visu.removeAttribute("class", "on");
          Visu.setAttribute("class", "off")
      }
      else {
          this.$store.state.VisuOn = true;
          this.$refs.SporeVisualisateur.initPlayer()
          Visu.removeAttribute("class", "off");
          Visu.setAttribute("class", "on")
      }
    },
    changeCurrentTime() {
      this.audio.pause()
      let setCurrentTime = document.getElementById("ProgressBar").value;
      this.audio.currentTime = setCurrentTime;
      this.audio.play()
    },
    endSong() {
      if (this.onShuffle) {
        this.$store.commit("SwitchOnOff", this.$store.state.currentAudio.id);
        this.getRandomSong();
        this.playSong();
      } else {
        this.nextSong();
      }
    },
  },
  created() {
    this.audio = new Audio();
    this.audio.addEventListener("ended", this.endSong);
  },
};
</script>

<style lang="scss">
@font-face {
  font-family: "Roboto";
  src: url("./assets/Font/Roboto-Regular.ttf");
}

@font-face {
  font-family: "Cafe";
  src: url("./assets/Font/Louis-George-Cafe.ttf");
}

$backgroundcolor: #cddfb7;
$darkShadow: #aebe9c;
$whiteShadow: #ecffd2;

@mixin ombreNeumoprhisme {
  -webkit-box-shadow: 12px 12px 24px $darkShadow, -12px -12px 24px $whiteShadow;
  box-shadow: 12px 12px 24px $darkShadow, -12px -12px 24px $whiteShadow;
}

@mixin buttonRondFat {
  -webkit-border-radius: 150px;
  border-radius: 150px;
  background: $backgroundcolor;
  -webkit-box-shadow: 12px 12px 20px $darkShadow, -12px -12px 20px $whiteShadow;
  box-shadow: 12px 12px 20px $darkShadow, -12px -12px 20px $whiteShadow;
  width: 15px;
  height: 15px;
  padding: 15px;
  border: none;
  color: green;
}

@mixin buttonRondTiny {
  -webkit-border-radius: 150px;
  border-radius: 150px;
  background: $backgroundcolor;
  -webkit-box-shadow: 6px 6px 18px $darkShadow, -6px -6px 18px $whiteShadow;
  box-shadow: 6px 6px 18px $darkShadow, -12px -6px 18px $whiteShadow;
  width: 15px;
  height: 15px;
  padding: 5px;
  border: none;
  color: green;
}

@mixin withouBorder {
  -webkit-border-radius: 150px;
  border-radius: 150px;
  background: $backgroundcolor;
  width: 15px;
  height: 15px;
  padding: 5px;
  border: none;
}

@mixin buttonCarre {
  -webkit-border-radius: 10px;
  border-radius: 10px;
  background: $backgroundcolor;
  -webkit-box-shadow: 12px 12px 20px $darkShadow, -12px -12px 20px $whiteShadow;
  box-shadow: 12px 12px 20px $darkShadow, -12px -12px 20px $whiteShadow;
  width: 15px;
  height: 15px;
  padding: 15px;
  border: none;
  color: green;
}

* {
  box-sizing: content-box;
}
body {
  background: $backgroundcolor;
  font-family: "Cafe";
}

#backgroundapp {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -5;
  width: 100%;
  height: 100%;
  opacity: 0.05;
}
.app {
  text-align: center;
  color: green;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  #musicPlayer {
    width: 50%;
    height: 80%;
    min-width: 300px;
    max-width: 500px;
    border-radius: 50px;
    background: $backgroundcolor;
    z-index: 1;
    margin: 15px;
    padding: 10px;
    @media (min-width: 425px) {
      @include ombreNeumoprhisme;
    }
    @media (max-height: 750px) {
      height: 100%;
    }
    .Display {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      width: 85%;
      height: 30%;
      padding: 15px;
      align-content: center;
      margin: auto;
      &__navigation {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        height: 25%;
        #Previous {
          @include buttonRondTiny;
        }
        &__OnOff {
          display: flex;
          justify-content: space-evenly;
          #Play {
            @include buttonRondFat;
            margin-right: 5px;
          }
          #Play:active {
          box-shadow: inset 5px 5px 15px #aebe9c,
            inset -5px -5px 15px #ecffd2;
          }
          #Pause {
            @include buttonRondFat;
            margin-right: 5px;
          }
          #Pause:active {
          box-shadow: inset 5px 5px 15px #aebe9c,
            inset -5px -5px 15px #ecffd2;
          }
          #Stop {
            @include buttonCarre;
            margin-left: 5px;
          }
          #Stop:active {
          box-shadow: inset 10px 10px 25px #aebe9c,
            inset -10px -10px 25px #ecffd2;
          }
        }
        #Next {
          @include buttonRondTiny;
        }
        #Next:active {
          box-shadow: inset 5px 5px 15px #aebe9c,
            inset -5px -5px 15px #ecffd2;
          }
      }
      &__Option {
        display: flex;
        justify-content: space-between;
        &__Trick {
          display: flex;
          justify-content: space-around;
          width: 30%;
          .off {
            @include withouBorder;
            opacity: 0.5;
          }
          .on {
            border-radius: 5px;
            background: linear-gradient(145deg, #b9c9a5, #dbefc4);
            box-shadow:  10px 10px 25px #aebe9c,
             -10px -10px 25px #ecffd2;
             opacity: 1;
             border: 0;
          }
          #Shuffle {
            color: green;
          }
          #Loop {
            color: green;
          }
          #Visu {
            color: green;
          }
        }
        &__Volume {
          display: flex;
          justify-content: space-evenly;
          width: 70%;
          #Mute {
            @include withouBorder;
            color: green;
            width: 25%;
          }
          input[type="range"] {
            -webkit-appearance: none;
            margin: 10px 0;
            width: 100%;
          }
          input[type="range"]:focus {
            outline: none;
          }
          input[type="range"]::-webkit-slider-runnable-track {
            width: 100%;
            height: 5px;
            cursor: pointer;
            -webkit-box-shadow: 6px 6px 18px $darkShadow,
              -6px -6px 18px $whiteShadow;
            box-shadow: 6px 6px 18px $darkShadow, -12px -6px 18px $whiteShadow;
            background: #205928;
            border-radius: 38px;
            border: 0px solid #18d501;
          }
          input[type="range"]::-webkit-slider-thumb {
            box-shadow: 1px 1px 1px #00aa00;
            border: 1px solid #83e584;
            height: 20px;
            width: 20px;
            border-radius: 20px;
            background: #439643;
            cursor: pointer;
            -webkit-appearance: none;
            margin-top: -8px;
          }
          input[type="range"]:focus::-webkit-slider-runnable-track {
            background: #205928;
          }
          input[type="range"]::-moz-range-track {
            width: 100%;
            height: 5px;
            cursor: pointer;
            transition: 0.2s;
            -webkit-box-shadow: 6px 6px 18px $darkShadow,
              -6px -6px 18px $whiteShadow;
            box-shadow: 6px 6px 18px $darkShadow, -12px -6px 18px $whiteShadow;
            background: #205928;
            border-radius: 38px;
            border: 0px solid #18d501;
          }
          input[type="range"]::-moz-range-thumb {
            box-shadow: 1px 1px 1px #00aa00;
            border: 1px solid #83e584;
            height: 20px;
            width: 20px;
            border-radius: 20px;
            background: #439643;
            cursor: pointer;
          }
          input[type="range"]::-ms-track {
            width: 100%;
            height: 5px;
            cursor: pointer;
            transition: 0.2s;
            background: transparent;
            border-color: transparent;
            color: transparent;
          }
          input[type="range"]::-ms-fill-lower {
            background: #205928;
            border: 0px solid #18d501;
            border-radius: 76px;
            -webkit-box-shadow: 6px 6px 18px $darkShadow,
              -6px -6px 18px $whiteShadow;
            box-shadow: 6px 6px 18px $darkShadow, -12px -6px 18px $whiteShadow;
          }
          input[type="range"]::-ms-fill-upper {
            background: #205928;
            border: 0px solid #18d501;
            border-radius: 76px;
            -webkit-box-shadow: 6px 6px 18px $darkShadow,
              -6px -6px 18px $whiteShadow;
            box-shadow: 6px 6px 18px $darkShadow, -12px -6px 18px $whiteShadow;
          }
          input[type="range"]::-ms-thumb {
            margin-top: 1px;
            box-shadow: 1px 1px 1px #00aa00;
            border: 1px solid #83e584;
            height: 20px;
            width: 20px;
            border-radius: 20px;
            background: #439643;
            cursor: pointer;
          }
          input[type="range"]:focus::-ms-fill-lower {
            background: #205928;
          }
          input[type="range"]:focus::-ms-fill-upper {
            background: #205928;
          }
        }
      }
      .informations {
        width: 100%;
        &__track {
          width: 100%;
          display: flex;
          justify-content: center;
          align-content: center;
          height: 1.2em;
          p {
            margin: 0;
            font-size: 1.2em;
          }
        }
        &__time {
          width: 100%;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          /* partie commune */
          input[type="range"]#ProgressBar {
            width: 70%;
            height: 15px;
            -webkit-appearance: none; /*nécessaire pour Chrome */
            padding: 0; /* nécessaire pour IE */
            font: inherit; /* même rendu suivant font document */
            outline: none;
            color: green; /* sert pour couleur de référence, via currentColor, pour le curseur */
            opacity: 0.8;
            background: $backgroundcolor; /* sert pour couleur de fond de la zone de déplacement */
            box-sizing: border-box; /* même modèle de boîte pour tous */
            transition: opacity 0.2s;
            cursor: pointer;
            @include ombreNeumoprhisme;
            border-radius: 5px;
          }

          /* Chrome */

          input[type="range"]#ProgressBar::-webkit-slider-runnable-track {
            height: 100%;
            border: none;
            border-radius: 0;
            background-color: rgb(
              109,
              204,
              109
            ); /* supprimé définie sur l'input */
          }
          /* le curseur */
          input[type="range"]#ProgressBar::-webkit-slider-thumb {
            -webkit-appearance: none; /* également nécessaire sur le curseur */
            width: 3px;
            height: inherit; /* s'adapte à la hauteur de l'input */
            border: solid 1px green;
            border-radius: 0; /* pris en compte sur Webkit et Edge */
            background: green; /* pris en compte sur Webkit only */
          }
          input[type="range"]#ProgressBar::-webkit-slider-thumb:hover {
            background: rgb(6, 26, 6); /* pris en compte sur Webkit only */
          }
        }
      }
    }
    .songList {
      height: 65%;
      width: 100%;
      border-radius: 50px;
      list-style: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      .headerSongList {
        height: 45%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        padding: 15px;
        button {
          @include buttonRondFat;
          transition: 0.2s
        }
        button:active {
          box-shadow: inset 7px 7px 20px #aebe9c,
            inset -7px -7px 20px #ecffd2;
        }
        img {
          width: 45%;
          object-fit: cover;
          border-radius: 7px;
          background: #cddfb7;
          box-shadow: 7px 7px 19px #acbb9a, -7px -7px 19px #eeffd4;
        }
      }
      .albumSong {
        height: 55%;
        width: 90%;
        margin: 0 5px 0 5px;
        overflow-y: scroll;
        scrollbar-width: thin;
        scrollbar-color: $darkShadow $backgroundcolor;
      }
      .albumSong::-webkit-scrollbar {
        width: 10px;
      }
      .albumSong::-webkit-scrollbar-track {
        background: $backgroundcolor;
      }
      .albumSong::-webkit-scrollbar-thumb {
        background-color: green;
        border-radius: 9px;
        border: 3px solid $backgroundcolor;
      }
    }
  }
}
</style>
