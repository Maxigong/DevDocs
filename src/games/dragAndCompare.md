---
tags: ["gsap", "draggable", "game"]
---

# DragAndCompare

::: danger Required GSAP installation

This examples required gsap

:::

<Draggable-DragAndCompare />

::: warning
MatchingCards uses nested components for the icons
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
