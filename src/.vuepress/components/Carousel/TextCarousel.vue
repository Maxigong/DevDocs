<template>
    <section class="component-wrapper">
        <span @click="nextSlide" class="slider-btn prev">
            <svg
                width="25"
                height="43"
                viewBox="0 0 25 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M1.41421 20.0623L20.6014 0.875151C21.8613 -0.384778 24.0156 0.507553 24.0156 2.28936V40.6638C24.0156 42.4456 21.8613 43.3379 20.6014 42.078L1.41421 22.8908C0.633165 22.1097 0.633165 20.8434 1.41421 20.0623Z"
                />
            </svg>
        </span>
        <span @click="prevSlide" class="slider-btn next">
            <svg
                width="25"
                height="43"
                viewBox="0 0 25 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M1.41421 20.0623L20.6014 0.875151C21.8613 -0.384778 24.0156 0.507553 24.0156 2.28936V40.6638C24.0156 42.4456 21.8613 43.3379 20.6014 42.078L1.41421 22.8908C0.633165 22.1097 0.633165 20.8434 1.41421 20.0623Z"
                />
            </svg>
        </span>
        <div :id="`slider-modal-content-${pk}`" class="slider-modal-content">
            <div
                :id="activeSlideIndex"
                v-if="showSlides"
                class="carousel-container"
            >
                <div class="text-wrapper">
                    <div :id="`center-slide-${pk}`" class="center-slide"></div>
                    <div
                        class="slide"
                        :id="`slide-${pk}`"
                        v-for="slide in slides"
                        :class="slide.position"
                        :key="slide.id"
                        :style="slide.styles"
                    >
                        {{ slide.name }}
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import ArrowIcon from "../icons/ArrowIcon.vue";
gsap.registerPlugin(Draggable);
export default {
    name: "SliderTop",
    components: { ArrowIcon },
    props: {
        pk: {
            type: String,
            default: "hello",
        },
        slides: {
            type: Array,
            default: () => [
                { id: 1, name: "sliderOne", url: "" },
                { id: 2, name: "sliderTwo", url: "" },
                { id: 3, name: "sliderThree", url: "" },
                { id: 4, name: "sliderFour", url: "" },
            ],
        },
    },
    mounted() {
        if (this.slides) {
            this.orderSlides(this.slides, this.activeSlideIndex);
            setTimeout(() => {
                this.dragFunction();
                gsap.set(`#slide-${this.pk}`, { clearProps: "all" });
            }, 500);
        }
    },
    data() {
        return {
            activeSlideIndex: 0,
            showSlides: false,
        };
    },
    methods: {
        dragFunction() {
            const self = this;
            Draggable.create(`#center-slide-${self.pk}`, {
                type: "x",

                onDragEnd: function () {
                    if (this.getDirection() === "right") {
                        self.prevSlide();
                    } else if (this.getDirection() === "left") {
                        self.nextSlide();
                    }
                    gsap.set(`#center-slide-${self.pk}`, {
                        clearProps: "all",
                    });
                },
            });
        },
        nextSlide() {
            ++this.activeSlideIndex;
            this.displayOrder(this.activeSlideIndex);
        },
        prevSlide() {
            --this.activeSlideIndex;
            this.displayOrder(this.activeSlideIndex);
        },
        displayOrder() {
            gsap.set(`#slide-${this.pk}`, { clearProps: "all" });

            if (this.activeSlideIndex === this.slides.length) {
                this.activeSlideIndex = 0;
            } else if (this.activeSlideIndex < 0) {
                this.activeSlideIndex = this.slides.length - 1;
            }

            this.$emit("currentSelection", this.slides[this.activeSlideIndex]);
            this.orderSlides(this.slides, this.activeSlideIndex);
        },
        orderSlides(array, activeIndex) {
            array.forEach((element, idx) => {
                element.position = "nextSlide";
                if (idx === activeIndex) {
                    element.position = "activeSlide";
                } else if (
                    idx === activeIndex - 1 ||
                    (activeIndex === 0 && idx === array.length - 1)
                ) {
                    element.position = ["lastSlide", "fadeSlides"];
                } else if (
                    idx === activeIndex + 1 ||
                    (activeIndex === array.length - 1 && idx === 0)
                ) {
                    element.position = ["nextSlide", "fadeSlides"];
                }
            });
            if (!this.showSlides) {
                this.showSlides = true;
            }
        },
    },
};
</script>

<style scoped>
.component-wrapper {
    position: relative;
    width: 100%;
}

.slider-modal-content {
    position: relative;
    gap: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    cursor: grab;
    width: 100%;
    max-width: 420px;
    margin: 0 auto;
    overflow: hidden;
}

.center-slide {
    width: 230px;
    height: 80px;

    position: absolute;
    top: 0;
    left: 0;
    z-index: 2000;
}
.carousel-container {
    width: 230px;
    height: 80px;
    position: relative;
    display: flex;
    border: 2px solid #7e194b;
    border-radius: 100px;

    color: #7e194b;
    /* background: red; */

    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0 auto;
}

.slide {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3.2rem;
    transition: 0.3s all linear;
    z-index: 1;
}
.slide.activeSlide {
    opacity: 1;
    transform: translateX(0);
}
.slide.lastSlide {
    transform: translateX(-75%);
}
.slide.nextSlide {
    transform: translate(75%);
}
.fadeSlides {
    opacity: 1;
    font-size: 20px;
    opacity: 0.5;
}

img {
    width: 100%;
}
.slider-btn {
    position: absolute;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1100;
    padding: 26px;
    overflow: hidden;
    cursor: pointer;
    left: 50%;
}

.prev {
    top: -100%;
    transform: translateX(-50%);
}
.next {
    transform: translateX(-50%) rotate(-180deg);
    bottom: -100%;
}

svg {
    pointer-events: none;
    fill: #7e194b;
}
</style>
