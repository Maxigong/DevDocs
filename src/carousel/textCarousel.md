---
tags: ["carrousel", "gsap", "draggable"]
sidebarDepth: 2
---

# Text Carousel (Draggable)

::: tip ChatGTP Explanation

The explanation of the code was created using ChatGTP after sharing the code snippet.

**_Prompt :_** "I am writing a documentation site using vuepress, I will paste a code snippet and I want you to explain it to me as if I was a junior developer. The explanation needs to be clear but not too long and I need it in English and Korean."
:::

## Description

::: warning GSA
This components uses gsap
:::

이것은 Vue.js 컴포넌트로, 아이템의 슬라이더 또는 캐러셀을 만듭니다. 이 컴포넌트는 두 개의 화살표 버튼이 있는 래퍼 섹션, 아이템을 보여주는 컨테이너 및 아이템을 클릭하면 나타나는 모달을 포함합니다.

아이템은 아이디, 이름 및 URL이 포함된 객체 배열로 컴포넌트에 제공됩니다. 아이템은 좌우로 이동할 수 있는 슬라이드의 형태로 표시되며, 화살표 버튼이나 중앙 슬라이드를 드래그하여 이동할 수 있습니다. 활성 슬라이드는 컨테이너의 중앙에 표시되며, 이전 및 다음 슬라이드는 양쪽에 표시됩니다.

이 컴포넌트는 GSAP 애니메이션 라이브러리를 사용하여 슬라이드의 드래깅 및 이동을 처리합니다. GSAP의 Draggable 플러그인을 사용하여 드래그 가능한 슬라이드를 생성하며, clearProps 메소드는 슬라이드의 위치를 이동할 때 초기화하는 데 사용됩니다.

::: tip English
::: details Expand

This is a Vue.js component that creates a slider or carousel of items. The component consists of a wrapper section that contains two arrow buttons for moving between the items, a container that displays the items, and a modal that appears when an item is clicked.

The items are provided to the component as an array of objects containing the item's id, name, and url. The items are displayed as a series of slides that can be moved left or right using the arrow buttons or by dragging the central slide. The active slide is displayed in the center of the container with the previous and next slides visible on either side.

The component uses the GSAP animation library to handle the dragging and movement of the slides. The Draggable plugin from GSAP is used to create a draggable slide, and the clearProps method is used to reset the position of the slides when they are moved.

:::

## Example

<div style="margin:5rem 0">
<ClientOnly>
<Carousel-TextCarousel pk="carouselTwo"/>
</ClientOnly>
</div>

## Snippet

::: tip Code example

::: details Click me to view the code

```html
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

                this.$emit(
                    "currentSelection",
                    this.slides[this.activeSlideIndex]
                );
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
```

:::
