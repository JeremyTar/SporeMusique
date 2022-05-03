import {
    createApp
} from 'vue'

import App from './App.vue'
import store from "./store"

import {
    library
} from "@fortawesome/fontawesome-svg-core";
import {
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faAngleLeft,
    faAngleRight,
    faPause,
    faPlay,
    faRepeat,
    faShuffle,
    faStop,
    faVolumeLow,
    faVolumeHigh,
    faVolumeOff,
    faVolumeXmark,
    faEject,
    faEye,
} from "@fortawesome/free-solid-svg-icons";
import {
    FontAwesomeIcon
} from "@fortawesome/vue-fontawesome";

library.add(faPlay, 
    faStop, 
    faPause, 
    faAngleDoubleLeft, 
    faAngleDoubleRight, 
    faAngleLeft,
    faAngleRight,
    faRepeat, 
    faVolumeLow, 
    faVolumeHigh, 
    faVolumeOff,
    faVolumeXmark,
    faShuffle,
    faEject,
    faEye)


    
createApp(App)
    .use(store)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app');