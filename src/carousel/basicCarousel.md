---
tags: ["carrousel"]
sidebarDepth: 2
---

# Basic Carrousel

::: tip ChatGTP Explanation

The explanation of the code was created using ChatGTP after sharing the code snippet.

**_Prompt :_** "I am writing a documentation site using vuepress, I will paste a code snippet and I want you to explain it to me as if I was a junior developer. The explanation needs to be clear but not too long and I need it in English and Korean."
:::

## Description

이것은 캐러셀/슬라이더를 표시하는 Vue 컴포넌트입니다.

이 컴포넌트는 버튼 두 개(다음 슬라이드로 이동하는 버튼과 이전 슬라이드로 이동하는 버튼)이 있는 컨테이너 div로 구성됩니다. 컨테이너에는 또 다른 div가 포함되어 있으며 "carousel-container" 클래스를 가지고 있으며 표시할 슬라이드가 포함됩니다.

컴포넌트의 데이터 섹션에서는 "activeSlideIndex"와 "showSlides" 두 개의 변수를 정의합니다. "activeSlideIndex" 변수는 현재 표시되는 슬라이드의 인덱스를 추적하고, "showSlides" 변수는 슬라이드 컨테이너의 가시성을 전환하는 데 사용됩니다.

컴포넌트는 "nextSlide", "prevSlide", "displayOrder" 세 가지 메서드를 정의합니다. "nextSlide" 메서드는 "activeSlideIndex" 변수를 증가시키고 "displayOrder"를 호출하여 다음 슬라이드를 표시합니다. "prevSlide" 메서드는 "active

::: tip English
::: details Expand

The component consists of a container div with two buttons, one for navigating to the next slide and one for navigating to the previous slide. The container also includes another div with the class "carousel-container" that contains the slides to be displayed.

The data section of the component defines two variables, "activeSlideIndex" and "showSlides". The "activeSlideIndex" variable keeps track of the index of the currently displayed slide, while the "showSlides" variable is used to toggle the visibility of the slide container.

The component defines three methods: "nextSlide", "prevSlide", and "displayOrder". The "nextSlide" method increments the "activeSlideIndex" variable and calls "displayOrder" to display the next slide. The "prevSlide" method decrements the "activeSlideIndex" variable and calls "displayOrder" to display the previous slide. The "displayOrder" method is responsible for determining the order in which the slides should be displayed. If the current slide is the last slide, it sets "activeSlideIndex" to 0 to start over from the beginning. If the current slide is the first slide and "prevSlide" is called, it sets "activeSlideIndex" to the last slide index. It then calls the "orderSlides" method to update the position of the slides.

The "orderSlides" method updates the position of the slides based on the active slide index. It assigns the class "nextSlide" to all slides, and then assigns the class "activeSlide" to the slide with the active slide index. It also assigns the class "lastSlide" to the slide that comes before the active slide or the last slide if the active slide is the first slide.

The component is also passed an array of slide objects as a prop, which is used to generate the slides. The slides are generated using the "v-for" directive, and each slide is assigned a position class based on its position relative to the active slide.

The component includes some CSS styles that define the appearance of the slider and its slides.

:::

## Example

<Carousel-BasicCarousel/>

## Snippet

::: tip Code example

::: details Click me to view the code

```html
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
```

:::
