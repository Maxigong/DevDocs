<template>
    <div class="zoom-section">
        <div class="zoom-section__wrapper-options">
            <button class="close-icon" @click="closeZoom">x</button>
        </div>
        <p class="tip">Double tap or pinch on the image to zoom it.</p>
        <div class="pinch-container">
            <div class="zoom-area">
                <img id="pinch" :src="image" alt="" />
            </div>
        </div>
    </div>
</template>
<script>
import PinchZoom from "../../../../node_modules/pinch-zoom-js";

export default {
    props: {
        activity: { type: Object },
        image: {
            type: String,
            default:
                "https://sammlung.staedelmuseum.de/images/102185/thumb-xl.jpg",
        },
    },
    mounted() {
        this.pinch();
    },

    data() {
        return {
            pinchZoomInstance: null,
        };
    },

    computed: {
        // ...mapState({
        //     optionIndex: (state) => state.activitiesState.optionIndex,
        //     image() {
        //         return this.activity.img
        //             ? this.activity.img
        //             : this.activity.options[this.optionIndex].img;
        //     },
        // }),
    },
    methods: {
        pinch() {
            const el = document.querySelector("div.zoom-area");
            this.pinchZoomInstance = new PinchZoom(el, {
                draggableUnzoomed: false,
                tapZoomFactor: 4,
                animationDuration: 600,
                setOffsetsOnce: true,
                minZoom: 1,
            });
            this.pinchZoomInstance.enable();
        },
        closeZoom() {
            this.zoom = this.minZoom;
            this.pinchZoomInstance.destroy();
        },
    },
};
</script>

<style scoped>
.tip {
    margin-bottom: 2rem;
}
.zoom-section {
    background: rgba(0, 0, 0, 0.9);
    height: 300px;
    width: 300px;
    position: fixed;
    top: 0;
    z-index: 2000; /* todo */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.zoom-icon,
.close-icon {
    background: transparent;
    border: none;
    background: var(--main-color-1);
    width: 25px;
    height: 25px;
    border-radius: 50%;
    font-size: 1.25rem;
    top: 25px;
    right: 20px;
}

img {
    width: 100%;
    width: 290px;
}

.pinch-container {
    width: 100%;
    height: 290px;
    overflow: hidden;
    border-bottom: var(--main-color-1) 1px solid;
    border-top: var(--main-color-1) 1px solid;
}
</style>
