import {
    createStore
} from 'vuex';

const store = createStore({
            state() {
                return {
                    VisuOn: false,
                    onPlay: false,
                    currentAudio: {},
                    allAlbum: [{
                            songs: [{
                                    id: 1,
                                    title: 'Dopamine',
                                    url: require("../assets/Song/SansSucreAJoute/Dopamine.mp3"),
                                    play : false
                                },
                                {
                                    id: 2,
                                    title: 'Ocytocine',
                                    url: require("../assets/Song/SansSucreAJoute/Ocytocine.mp3"),
                                    play : false
                                },
                                {
                                    id: 3,
                                    title: 'Somastotatine',
                                    url: require("../assets/Song/SansSucreAJoute/Somastotatine.mp3"),
                                    play : false
                                },
                                {
                                    id: 4,
                                    title: 'Leptine',
                                    url: require("../assets/Song/SansSucreAJoute/Leptine.mp3"),
                                    play : false
                                },
                                {
                                    id: 5,
                                    title: 'Adrenaline',
                                    url: require("../assets/Song/SansSucreAJoute/Adrenaline.mp3"),
                                    play : false
                                },
                                {
                                    id: 6,
                                    title: 'Endorphine',
                                    url: require("../assets/Song/SansSucreAJoute/Endorphine.mp3"),
                                    play : false
                                },
                                {
                                    id: 7,
                                    title: 'Serotonine',
                                    url: require("../assets/Song/SansSucreAJoute/Serotonine.mp3"),
                                    play : false
                                },
                                {
                                    id: 8,
                                    title: 'Melatonine',
                                    url: require("../assets/Song/SansSucreAJoute/Melatonine.mp3"),
                                    play : false
                                },
                                {
                                    id: 9,
                                    title: 'Inhibine',
                                    url: require("../assets/Song/SansSucreAJoute/Inhibine.mp3"),
                                    play : false
                                }
                            ],
                            cover: require("../assets/Cover/SSA.png")
                        },
                        {
                            songs: [{
                                    id: 1,
                                    title: "Pandore",
                                    url: require('../assets/Song/DidactiqueetDictame/Pandore.wav'),
                                    play : false
                                },
                                {
                                    id: 2,
                                    title: "Thalie",
                                    url: require('../assets/Song/DidactiqueetDictame/Thalie.wav'),
                                    play : false
                                },
                                {
                                    id: 3,
                                    title: "H??speris",
                                    url: require('../assets/Song/DidactiqueetDictame/Hesperis.mp3'),
                                    play : false
                                },
                                {
                                    id: 4,
                                    title: "Candice",
                                    url: require('../assets/Song/DidactiqueetDictame/Candice.wav'),
                                    play : false
                                },
                                {
                                    id: 5,
                                    title: "Tayg??te",
                                    url: require('../assets/Song/DidactiqueetDictame/Tayg??te.wav'),
                                    play : false
                                },
                                {
                                    id: 6,
                                    title: "Calypso",
                                    url: require('../assets/Song/DidactiqueetDictame/Calypso.wav'),
                                    play : false
                                },
                                {
                                    id: 7,
                                    title: "Cyll??ne",
                                    url: require('../assets/Song/DidactiqueetDictame/Cyll??ne.wav'),
                                    play : false
                                },
                                {
                                    id: 8,
                                    title: 'Idyie',
                                    url: require("../assets/Song/DidactiqueetDictame/Idyie.mp3"),
                                    play : false
                                },
                                {
                                    id: 9,
                                    title: "Tych??",
                                    url: require('../assets/Song/DidactiqueetDictame/Tych??.wav'),
                                    play : false
                                },
                            ],
                            cover: require('../assets/Cover/PochetteDidactiqueetDictame.png')
                        },
                        {
                            songs: [{
                                    id: 1,
                                    title: "Algarade",
                                    url: require('../assets/Song/Elevator/Algarade.wav'),
                                    play : false
                                },
                                {
                                    id: 2,
                                    title: "P??rip??tie",
                                    url: require('../assets/Song/Elevator/P??rip??tie.wav'),
                                    play : false
                                },
                                {
                                    id: 3,
                                    title: "Rh??totique",
                                    url: require('../assets/Song/Elevator/Rh??torique.wav'),
                                    play : false
                                },
                                {
                                    id: 4,
                                    title: "Outrecuidance",
                                    url: require('../assets/Song/Elevator/Outrecuidance.wav'),
                                    play : false
                                },
                                {
                                    id: 5,
                                    title: "Dissemblance",
                                    url: require('../assets/Song/Elevator/Dissemblance.wav'),
                                    play : false
                                },
                                {
                                    id: 6,
                                    title: "Labeur",
                                    url: require('../assets/Song/Elevator/Labeur.wav'),
                                    play : false
                                },
                                {
                                    id: 7,
                                    title: "Blasph??me",
                                    url: require('../assets/Song/Elevator/Blasph??me.wav'),
                                    play : false                                },
                                {
                                    id: 8,
                                    title: "Concupiscence",
                                    url: require('../assets/Song/Elevator/Concupiscence.wav'),
                                    play : false
                                },
                                {
                                    id: 9,
                                    title: "Chim??re",
                                    url: require('../assets/Song/Elevator/Chim??re.wav'),
                                    play : false
                                },
                            ],
                            cover: require('../assets/Cover/PochetteElevator.jpg')
                        }
                    ]
                }
            },
            mutations: {
                changeCurrentSong(state, song) {
                    state.currentAudio = song
                    state.onPlay = false
                },
                SwitchOnOff(state, id) {
                    let idIndex = id - 1
                    for (let j = 0; j <= state.allAlbum.length; j++) {
                        if (state.currentAudio.cover == state.allAlbum[j].cover) {
                            if(state.allAlbum[j].songs[idIndex].play == true) {
                                this.state.allAlbum[j].songs[idIndex].play = false
                            } else {
                                state.allAlbum[j].songs[idIndex].play = true
                            }
                            break
                        }
                    }
                },
               TurnOffPlaying(state) {
                    state.onPlay = true
                },
                TurnOnPlaying(state) {
                    state.onPlay = false
                },
            },

    })

export default store;