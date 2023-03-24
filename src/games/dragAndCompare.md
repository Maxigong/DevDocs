---
tags: ["gsap", "draggable", "game"]
sidebarDepth: 2
---

# Drag And Compare

::: tip ChatGTP Explanation

The explanation of the code was created using ChatGTP after sharing the code snippet.

**_Prompt :_** "I am writing a documentation site using vuepress, I will paste a code snippet and I want you to explain it to me as if I was a junior developer. The explanation needs to be clear but not too long and I need it in English and Korean."
:::

## Description

::: warning Required GSAP installation

This examples required gsap

:::

이 코드는 이미지 비교 도구를 만드는 Vue 컴포넌트입니다. 이 컴포넌트는 두 개의 이미지를 나란히 보여주는 컨테이너와 사용자가 하나의 이미지를 드래그할 수 있는 슬라이더로 이루어져 있습니다. 이 컴포넌트는 이미지 URL과 제목이 포함된 두 개의 객체를 props으로 받습니다.

템플릿 섹션은 컴포넌트의 HTML 구조를 정의합니다. 사용자를 위한 힌트 문구, 두 개의 이미지를 담는 컨테이너, 그리고 드래그 가능한 슬라이더가 포함됩니다.

스크립트 섹션은 컴포넌트의 기능을 정의합니다. 이 코드는 GreenSock Animation Platform (gsap) 라이브러리와 Draggable 플러그인을 가져와 gsap 인스턴스에 등록합니다. 컴포넌트는 기본 이미지와 드래그 가능한 인스턴스를 정의하는 등 여러 옵션을 포함하고 있습니다. mounted() 라이프사이클 훅은 드래그 가능한 인스턴스를 초기화하고, beforeDestroy() 훅은 컴포넌트가 파괴될 때 드래그 가능한 인스턴스를 제거하는 데 사용됩니다. 마지막으로, dragImages() 메서드는 드래그 가능한 슬라이더의 기능을 정의하는 데 사용됩니다.

스타일 섹션은 컴포넌트의 CSS를 정의합니다. 이미지와 슬라이더의 크기와 위치, 그리고 드래그 가능한 홀더와 아이콘의 스타일을 포함합니다.

::: tip English
::: details Expand

This code is a Vue component that creates an image comparison tool. It consists of a container that holds two images side by side, and a draggable slider that allows the user to reveal one image while hiding the other. The component takes an array of two objects as a prop, where each object contains an image URL and a title.

The template section defines the HTML structure of the component. It includes a paragraph that serves as a hint for the user, the container that holds the two images, and the draggable slider.

The script section includes the functionality of the component. It imports the GreenSock Animation Platform (gsap) library and the Draggable plugin, and registers the plugin with the gsap instance. The component then defines several options, including the default images to display and the draggable instance. The mounted() lifecycle hook is used to initialize the draggable instance, and the beforeDestroy() hook is used to remove the draggable instance when the component is destroyed. Finally, the dragImages() method is used to define the functionality of the draggable slider.
:::

## Example

<ClientOnly>
<Draggable-DragAndCompare />
</ClientOnly>

## Snippets

::: warning Nested Components
This component uses nested components
:::

::: tip Main Component

::: details Click me to view the code

```html
<template>
    <section>
        <p class="hint">Drag art left of right to compare</p>
        <div class="activity-image-container top-section">
            <section ref="imagesContainer" class="drag-poll-wrapper">
                <img
                    v-for="(art, idx) in options"
                    :key="art.id"
                    class="img"
                    :class="`${idx === 1 ? 'dragIt' : ''}`"
                    :src="art.img"
                    alt=""
                />
                <div class="dragger">
                    <div class="holder">
                        <span class="icon">
                            <Icons-ArrowIcon />
                        </span>
                        <span class="rotate icon">
                            <Icons-ArrowIcon />
                        </span>
                    </div>
                </div>
            </section>
        </div>
    </section>
</template>

<script>
    import { gsap } from "gsap";
    import { Draggable } from "gsap/Draggable";
    gsap.registerPlugin(Draggable);

    export default {
        props: {
            options: {
                type: Array,
                default: () => [
                    {
                        id: 1,
                        img: "https://sammlung.staedelmuseum.de/images/102185/thumb-xl.jpg",
                        option: "Jean-Léon Gérôme",
                    },
                    {
                        id: 2,
                        img: "https://sammlung.staedelmuseum.de/images/3018/thumb-xl.jpg",
                        option: "Impressionists",
                    },
                ],
            },
        },
        mounted() {
            this.dragImages();
        },
        beforeDestroy() {
            this.draggableInstance[0].kill();
        },
        data() {
            return {
                draggableInstance: null,
                showDragger: false,
            };
        },

        methods: {
            dragImages() {
                this.showDragger = true;
                this.draggableInstance = Draggable.create(".dragger", {
                    type: "x",
                    bounds: ".drag-poll-wrapper",
                    onDrag: function () {
                        let x = -gsap.getProperty(this.target, "x");
                        gsap.set(".dragIt", {
                            clipPath: `inset(  0px ${x}px 0px  0px )`,
                            transformOrigin: "top left",
                        });
                    },
                });
            },
        },
    };
</script>

<style scoped>
    .activity-image-container {
        padding: 1rem 0;
        margin: 1rem auto;
        height: unset;
    }
    .drag-poll-wrapper {
        min-height: 300px;
        max-width: 600px;
        margin: 0 auto;
        position: relative;
    }
    p {
        text-align: center;
    }
    .img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        object-fit: cover;
    }
    .dragger {
        top: 0;
        right: 0;
        width: 10px;
        height: 100%;
        background: #ffd700;
        opacity: 0.5;
        position: absolute;
        display: grid;
        place-content: center;
    }
    .dragIt {
        clip-path: inset(0px 0px 0px 0px);
    }
    .holder {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 2px solid var(--main-color-2);
        background: #ffd700;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .icon svg {
        width: 15px;
        height: 15px;
        fill: var(--main-color-2);
    }

    .rotate svg {
        rotate: 180deg;
    }
</style>
```

:::
::: tip Arrow Icon Component
::: details Click me to view the code

```html
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
```

:::
