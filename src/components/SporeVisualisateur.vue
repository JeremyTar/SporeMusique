<template>

</template>

<script>
export default {
    name: "SporeVisualisateur",
    props: {
        audio: Audio
    },
    data() {
        return {
            init: false,
            audioSrc: null,
            analyser: null,
            bufferLength: null,
            canvas: null,
            AudioCtx: null,
            dataArray: {},
            barWidth: 0,
            barHeight: 0,
            x: 0,            
        }

    },
    methods: {
        initPlayer() {
            this.audioCtx = new AudioContext
            this.audioSrc = this.audioCtx.createMediaElementSource(this.audio)
            
            this.analyser = this.audioCtx.createAnalyser();
            this.audioSrc.connect(this.analyser)
            this.analyser.connect(this.audioCtx.destination)
            this.analyser.fftSize = 512
            this.bufferLength = this.analyser.frequencyBinCount
            this.dataArray = new Uint8Array(this.bufferLength)
            console.log(this.dataArray)
        },
        animate() {
            this.x = 0
            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
            this.analyser.getByteFrequencyData(this.dataArray)

            for(let i = 0 ; i < this.bufferLength; i++ ) {
                this.barHeight = this.dataArray[i]
                this.ctx.fillStyle = "green"
                this.ctx.fillRect(this.x, this.canvas.height - this.barHeight, this.barWidth, this.barHeight)
            }
            requestAnimationFrame(this.animate)
        },
        go() {
            this.initPlayer()
        }
    },
    mounted() {
        this.canvas = document.getElementById("Visualizer");
        this.ctx = this.canvas.getContext("2d");
    }
}
</script>