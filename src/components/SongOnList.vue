<template>
    <div class="SongList">
        <p>{{title}}</p>
        <div class="SongList__media">
            <div v-if="onPlay" id="barres">
                <div id="barre1"></div>
                <div id="barre2"></div>
                <div id="barre3"></div>
            </div>
            <button v-if="!onPlay" v-on:click="putSong()"><font-awesome-icon icon="eject" /></button>
        </div>
    </div>
</template>

<script>

export default {
    name: "SongOnList",
    data() {
        return {
            audio: {},
        }  
    },
    props: {
        title: String,
        url: String,
        cover: String,
        id: Number,
        onPlay: Boolean,
    },
    methods: {
        putSong() {
            let audio = {
                title: this.title,
                url: this.url,
                cover: this.cover,
                id: this.id
            }
            if(this.$store.state.onPlay === true) {
                this.$store.state.onPlay = false
                this.$emit('stopSong')
            }
            this.$store.commit('changeCurrentSong', audio)
            this.$emit('playSong')
            this.$store.state.onPlay = true         
        }
    },
}
</script>

<style lang="scss" scoped>
.SongList {
    padding: 5px;
    border-radius: 5px;
    background: #cddfb7;
    box-shadow: inset 10px 10px 30px #aebe9c,
                inset -10px -10px 30px #ecffd2;
    border: 0.2px ridge #ecffd2;
    width: 90%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px auto 10px auto;
    &__media {
        display: flex;
        margin: 0px 10px;
        button {
            -webkit-border-radius: 150px;
            border-radius: 150px;
            color: green;
            width: 25px;
            height: 25px;
            padding: 5px;
            border: none;
            background: none;
        }
        #barres {
            width: 25px;
            height: 25px;
            display: flex;
            justify-content: space-evenly;
            align-items: flex-end;
            margin-right: 5px;
            margin-bottom: 5px;
            #barre1 {
                width: 5px;
                height: 10px;
                background-color: green;
                animation: playAnimation1 1s linear infinite;
            }
            #barre2 {
                width: 5px;
                height: 15px;
                background-color: green;
                animation: playAnimation2 1s ease infinite;
            }
            #barre3 {
                width: 5px;
                height: 2px;
                background-color: green;
                animation: playAnimation3 1s ease-in-out infinite;
            }
        }
    }
}

@keyframes playAnimation3 {
    0% {
        height: 2px;
    }
    50% {
        height: 15px;
    }
    100% {
        height: 2px;
    }
}

@keyframes playAnimation2 {
    0% {
        height: 15px;
    }
    50% {
        height: 2px;
    }
    100% {
        height: 15px;
    }
}

@keyframes playAnimation1 {
    0% {
        height: 10px;
    }
    25% {
        height: 15px;
    }
    50% {
        height: 10px;
    }
    75% {
        height: 2px
    }
    100%{
        height: 10px;
    }
}
</style>