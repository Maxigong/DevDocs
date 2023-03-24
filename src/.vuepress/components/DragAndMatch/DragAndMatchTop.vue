<template>
    <div class="activity-image-container">
        <div class="paint-details">
            <section class="paint-details">
                <img class="img" v-if="art_img" :src="art_img" :alt="title" />
                <slot name="circles"> </slot>
                <span
                    v-for="(circle, idx) in keywords"
                    :key="idx"
                    :class="`circle-${circle.keyword
                        .trim()
                        .replaceAll(' ', '-')}`"
                    class="circles"
                >
                </span>
            </section>

            <h2 class="subtile">{{ message }}</h2>
        </div>
    </div>
</template>

<script>
import { gsap } from "gsap";
export default {
    props: {
        art_img: {
            type: String,
        },
        title: {
            type: String,
            default: "",
        },
        keywords: {
            type: Array,
        },
        subtitle: {
            type: String,
            default: "Title",
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
        setCircleTime: {
            type: Number,
            default: 2000,
        },
    },
    mounted() {
        gsap.set(".circles", { opacity: 0 });
        setTimeout(() => {
            this.setCirclePosition();
        }, this.setCircleTime);
    },

    computed: {
        message() {
            return this.isCompleted
                ? "Click word on the image to learn more"
                : "Drag the right keywords";
        },
    },
    methods: {
        setCirclePosition() {
            let artImg = document.querySelector(".img");
            this.imageWidth = artImg.offsetWidth;
            this.imageHeight = artImg.offsetHeight;

            this.keywords.forEach((element) => {
                let { top, left } = element.position;

                let topPosition = Math.floor((top * this.imageHeight) / 100);
                let leftPosition = Math.floor((left * this.imageWidth) / 100);

                return gsap.to(
                    `.circle-${element.keyword.trim().replaceAll(" ", "-")}`,
                    {
                        translateX: leftPosition,
                        translateY: topPosition,
                        opacity: 1,
                        duration: 1,
                    }
                );
            });
        },
    },
};
</script>

<style scoped>
.activity-image-container {
    height: auto;
    margin-top: 0;
}
.paint-details {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    height: auto;
}

.paint-details .img {
    height: auto;
    max-height: 300px;
    object-fit: contain;
    max-width: 100%;
}

.subtile {
    color: #7e194b;
    margin: 0.5rem;
    font-size: 14px;
}

.circles {
    background: rgba(237, 234, 227, 0.2);
    border: 2px dashed #ffffff;
    top: 0;
    left: 0;
    bottom: unset;
    position: absolute;
    background: transparent;
    height: 62px;
    width: 62px;
    border-radius: 50%;
}
</style>
