---
tags: ["carrousel", "gsap", "draggable"]
sidebarDepth: 2
---

# Circular Carrousel

::: tip ChatGTP Explanation

The explanation of the code was created using ChatGTP after sharing the code snippet.

**_Prompt :_** "I am writing a documentation site using vuepress, I will paste some codes and I want you to explain de code as I was a junior developer. The explanation needs to be clear but not too long and I need it in English and Korean."
:::

## Description

::: warning GSA
This components uses gsap
:::

주어진 코드는 드래그 기능을 갖는 원형 캐로셀을 만드는 Vue 컴포넌트입니다. section 요소 안에는 circular 클래스를 가진 원형 div가 있으며, 이 div는 items 배열에 있는 각 항목마다 circle-item 클래스를 가진 div와 single-item 클래스를 가진 여러 div를 포함합니다. 컴포넌트는 GSAP 애니메이션 라이브러리를 사용하여 캐로셀에 드래그 기능을 만듭니다.

컴포넌트가 마운트되면 setTimeout 함수가 실행되어 circleSetup() 함수를 사용하여 원형을 만들고 애니메이션을 animation() 함수를 사용하여 시작합니다. activeSlideIndex 변수는 현재 활성 슬라이드의 인덱스를 추적합니다.

animation() 함수는 GSAP의 Draggable 클래스를 사용하여 드래그 가능한 인스턴스를 만들고 liveSnap 함수를 설정하여 사용자가 캐로셀을 놓았을 때 스냅된 인덱스를 추적합니다. 캐로셀을 놓았을 때 displayOrder() 함수가 activeSlideIndex를 업데이트하고 선택한 항목의 ID를 부모 컴포넌트에 "handleMoodImageSelection" 이벤트로 보냅니다.

circleSetup() 함수에서는 원과 circle-item div가 GSAP의 set 메서드를 사용하여 원형으로 배치됩니다. 컴포넌트에는 컨테이너 및 캐로셀 요소의 위치, 크기 및 항목 및 원형의 스타일을 포함하는 CSS 스타일링도 포함됩니다.

::: tip English
::: details Expand

The given code is a Vue component that creates a circular carousel with draggable functionality. It consists of a section element containing a circular div that holds several divs with class "single-item" and a div with class "circle-item" for each item in the items array. The component uses the GSAP animation library to create the draggable functionality for the carousel.

When the component is mounted, a setTimeout function runs to create the circle with circleSetup() function and initiate the animation using the animation() function. The activeSlideIndex variable keeps track of the index of the currently active slide.

The animation function creates a draggable instance using the Draggable class from GSAP, and sets up a liveSnap function to keep track of the snapped index when the user releases the carousel. When the carousel is released, the displayOrder() function updates the activeSlideIndex and emits a "handleMoodImageSelection" event to the parent component with the ID of the selected item.

In the circleSetup() function, the circle and the circle-item divs are positioned in a circle using GSAP's set method. The component also includes CSS styling for the container and carousel elements, including positioning, dimensions, and styles for the items and circles.

:::

## Example

<ClientOnly>
<Carousel-CarrouselCircle pk="carouselTwo"/>
</ClientOnly>

## Snippet

::: tip Code example

::: details Click me to view the code

```html
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
                        const maxRotation = gsap.utils.wrap(
                            0,
                            360,
                            this.rotation
                        );

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
```

:::
