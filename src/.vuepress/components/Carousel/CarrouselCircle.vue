<template>
    <section :id="`container-wrapper-${pk}`" class="container-wrapper">
        <div :id="`circle-${pk}`" class="circular-carrousel-wrapper">
            <div
                :id="`single-item-${pk}`"
                class="single-item"
                v-for="(item, idx) in items"
                :key="item.order"
                :class="activeSlideIndex == idx && 'active'"
            >
                <div
                    :id="`circle-item-${pk}`"
                    :class="{ isSelected: item.isSelected }"
                    class="circle-item"
                >
                    <h2>{{ item.name }}</h2>
                    <!-- <img :src="item.url" alt="" /> -->
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);
export default {
    props: {
        pk: {
            type: String,
            required: true,
        },

        items: {
            type: Array,
            default: () => [
                { id: 1, name: "one" },
                { id: 2, name: "two" },
                { id: 10, name: "three" },
                { id: 7, name: "four" },
                { id: 1, name: "five" },
                { id: 2, name: "six" },
                { id: 10, name: "seven" },
                { id: 7, name: "eight" },
            ],
        },
    },
    data() {
        return {
            activeSlideIndex: 0,
        };
    },
    mounted() {
        setTimeout(() => {
            // create a circle
            this.circleSetup(
                `#circle-${this.pk}`,
                `#single-item-${this.pk}`,
                -50
            );
            this.animation();
        }, 10);
    },
    methods: {
        animation() {
            let activeSlideIndex = this.activeSlideIndex;
            let activeSlideIndexSnap = this.activeSlideIndex;

            const items = gsap.utils.toArray(`#circle-item-${this.pk}`);
            const size = (items.length * 530) / items.length;

            // gsap.set(".circular-carrousel-wrapper", {
            //     width: `${size}px`,
            //     height: `${size}px`,
            // });

            const self = this;
            const oneItem = 360 / items.length;
            Draggable.create(`#circle-${this.pk}`, {
                trigger: `#circle-item-${this.pk}`,
                type: "rotation",
                liveSnap: true,
                snap: function (endValue) {
                    activeSlideIndexSnap = Math.round(endValue / oneItem);
                    return Math.round(
                        (activeSlideIndexSnap * 360) / items.length
                    );
                },

                onRelease: function () {
                    const maxRotation = gsap.utils.wrap(0, 360, this.rotation);

                    activeSlideIndex = Math.abs(
                        Math.floor(maxRotation / oneItem) - items.length
                    );

                    if (activeSlideIndex === items.length) {
                        self.displayOrder(0);
                    } else {
                        self.displayOrder(activeSlideIndex);
                    }
                },
            });
        },
        displayOrder(activeSlideIndex) {
            this.activeSlideIndex = activeSlideIndex;

            this.$emit(
                "handleMoodImageSelection",
                this.items[this.activeSlideIndex].id
            );
        },

        circleSetup(circle, items, percentageValue) {
            const mainCircle = document.querySelector(circle);
            const circleItem = gsap.utils.toArray(items);

            const radius = mainCircle.offsetWidth / 2;
            const center = mainCircle.offsetWidth / 2;
            const total = circleItem.length;
            const slice = (2 * Math.PI) / total;

            circleItem.forEach((item, i) => {
                const angle = i * slice;

                const x = center + radius * Math.sin(angle);
                const y = center - radius * Math.cos(angle);

                gsap.set(item, {
                    rotation: angle + "_rad",
                    xPercent: percentageValue,
                    yPercent: percentageValue,
                    x,
                    y,
                });
            });
        },
    },
};
</script>

<style scoped>
.container-wrapper {
    height: 300px;
    width: 100%;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
}

.circular-carrousel-wrapper {
    top: 140%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%) scale(1);

    width: 530px;
    height: 530px;

    transform-origin: center center;
    border-radius: 50%;
    transition: 0.3s all linear;
    display: grid;
    place-content: center;
    z-index: 1;
    background-size: contain;
}

.single-item {
    position: absolute;
    opacity: 0.5;
}
.active {
    opacity: 1;
}
h2 {
    color: white;
}

img {
    width: 100%;
    max-height: unset;
}

.circle-item {
    height: 96px;
    width: 96px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s linear;
    pointer-events: none;
    background: #7e194b;
    border-radius: 100%;
    overflow: hidden;
}

.active .circle-item {
    width: 240px;
    height: 240px;
    pointer-events: initial;
}
.active .isSelected {
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
}
</style>
