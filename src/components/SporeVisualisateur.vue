<template>
    <div>
        <canvas id="SporeVisualisateur"></canvas>
    </div>
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
            Ctx: null,
            dataArray: {},
            barWidth: 5,
            barHeight: 0,
            x: 0,            
        }

    },
    methods: {
        initPlayer() {
            if(this.audioCtx){
                this.animate()
            }
            else {
                this.audioCtx = new AudioContext()
                this.audioSrc = this.audioCtx.createMediaElementSource(this.audio)
                this.analyser = this.audioCtx.createAnalyser();
                this.audioSrc.connect(this.analyser)
                this.analyser.connect(this.audioCtx.destination)
                this.analyser.fftSize = 512
                this.bufferLength = this.analyser.frequencyBinCount
                this.dataArray = new Uint8Array(this.bufferLength)
                
                this.animate()                
            }

        },
        animate() {
            if(!this.$store.state.VisuOn) {
                this.x = 0
                this.Ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
                return
            }
            else{
                this.x = 0
                this.Ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
                this.analyser.getByteFrequencyData(this.dataArray)
                this.drawVisualiser()
                requestAnimationFrame(this.animate)

            }

        },
        drawVisualiser() {
            for(let i = 0 ; i < this.bufferLength; i++ ) {
                this.barHeight = this.dataArray[i] * 1.5;
                this.Ctx.save()
                this.Ctx.translate(this.canvas.width/2, this.canvas.height/2)
                this.Ctx.rotate( i * 3)
                this.Ctx.strokeStyle = 'green'
                this.Ctx.beginPath()

                this.Ctx.moveTo(15,0);
                this.Ctx.lineTo(5, this.barHeight*2.5)
                this.Ctx.stroke()
                this.x += this.barWidth

                if (this.i > this.bufferLength * 0.6) {
                    this.Ctx.beginPath()
                    this.Ctx.arc(0, 0 , this.barHeight*1.5, 0, Math.PI *2)
                }
                this.Ctx.restore()
            }
        }
    },
    mounted() {
        this.canvas = document.getElementById("SporeVisualisateur");
        this.canvas.height = window.innerHeight
        this.canvas.width = window.innerWidth
        this.Ctx = this.canvas.getContext("2d");

    }
}
</script>

<style lang="scss" scoped>

#SporeVisualisateur {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -4;
}
</style>