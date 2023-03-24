<template>
    <div class="main-container">
        <span @click="nextSlide" class="slider-btn next">
            <svg
                width="25"
                height="43"
                viewBox="0 0 25 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M23.5858 20.0623L4.39859 0.875151C3.13866 -0.384778 0.984375 0.507553 0.984375 2.28936V40.6638C0.984375 42.4456 3.13866 43.3379 4.39859 42.078L23.5858 22.8908C24.3668 22.1097 24.3668 20.8434 23.5858 20.0623Z"
                />
            </svg>
        </span>
        <span @click="prevSlide" class="slider-btn prev">
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
        <div
            :id="activeSlideIndex"
            v-if="showSlides"
            class="carousel-container"
        >
            <div
                class="slide"
                ref="slide"
                v-for="(slide, idx) in slides"
                :class="slide.position"
                :key="slide.id"
            >
                {{ idx }}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        slides: {
            type: Array,
            default: () => [
                { id: 1, name: "sliderOne" },
                { id: 2, name: "slider Two" },
                { id: 3, name: "slider Three" },
            ],
        },
    },
    mounted() {
        this.orderSlides(this.slides, this.activeSlideIndex);
    },
    data() {
        return {
            activeSlideIndex: 0,
            showSlides: false,
        };
    },
    methods: {
        nextSlide() {
            ++this.activeSlideIndex;
            this.displayOrder(this.activeSlideIndex);
        },
        prevSlide() {
            --this.activeSlideIndex;
            this.displayOrder();
        },
        displayOrder() {
            if (this.activeSlideIndex === this.slides.length) {
                this.activeSlideIndex = 0;
            } else if (this.activeSlideIndex < 0) {
                this.activeSlideIndex = this.slides.length - 1;
            }

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
                    element.position = "lastSlide";
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
.main-container {
    height: 500px;
    width: 100%;
    background: #7e194b3a;
    overflow: hidden;
    display: block;
    position: relative;
    padding: 1rem;
}

.slider-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}
.slider-btn svg {
    fill: #7e194b;
}
.next {
    right: 25px;
}

.prev {
    left: 25px;
}

.carousel-container {
    width: 80%;
    height: 100%;
    overflow: hidden;
    position: relative;
    display: flex;
    background: white;
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
    font-size: 2rem;
    transition: 0.3s all linear;
    background: white;
}
.slide.activeSlide {
    opacity: 1;
    transform: translateX(0);
}
.slide.lastSlide {
    transform: translateX(-100%);
}
.slide.nextSlide {
    transform: translate(100%);
}
img {
    width: 100%;
}
</style>
