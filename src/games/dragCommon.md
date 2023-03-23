---
tags: ["gsap", "draggable", "game"]
sidebarDepth: 2
---

# DragCommon

# DragAndCompare

::: danger Required GSAP installation

All this examples required gsap

:::

<Draggable-DragCommon />

::: tip Main Component

::: details Click me to view the code

```html
<template>
    <div>
        <div class="drag-area">
            <h2 class="drag-label">Drag the words here</h2>
        </div>
        <div class="words-container">
            <p
                v-for="(word, idx) in keywords"
                :key="idx"
                :class="word"
                class="single-word"
                :id="word"
            >
                {{ word }}
            </p>
        </div>
        <div class="result-world-container">
            <p
                v-for="(world, idx) in rightKeywords"
                :key="idx"
                class="result-word"
            >
                {{ world }}
            </p>
        </div>
    </div>
</template>

<script>
    import { gsap } from "gsap";
    import { Draggable } from "gsap/Draggable";
    gsap.registerPlugin(Draggable);
    export default {
        props: {
            keywords: {
                type: Array,
                default: () => [
                    "red",
                    "blue",
                    "pink",
                    "black",
                    "yellow",
                    "green",
                ],
            },
            rightKeywords: {
                type: Array,
                default: () => ["blue"],
                // default: () => ["blue", "black", "yellow"],
            },
        },
        mounted() {
            gsap.set(".result-word", {
                opacity: 0,
                yPercent: 200,
                stagger: true,
            });
            this.dragWord();
        },
        beforeDestroy() {
            this.draggableInstance.forEach((element) => {
                element[0].kill();
            });
        },
        data() {
            return { draggableInstance: [] };
        },
        methods: {
            dragWord() {
                let self = this;
                let singleWord = gsap.utils.toArray(".single-word");
                singleWord.forEach((word) => {
                    let allDraggable = Draggable.create(word, {
                        onDrag: function () {
                            if (this.hitTest(".drag-area", "80%")) {
                                word.classList.add("matched");
                            } else {
                                word.classList.remove("matched", "scored");
                            }
                        },
                        onRelease: function () {
                            gsap.set(".drag-label", { display: "none" });

                            if (!word.classList.contains("matched")) {
                                let tl = gsap.timeline();
                                tl.to(this.target, {
                                    x: 0,
                                    y: 0,
                                });
                            } else if (!word.classList.contains("scored")) {
                                console.log(word);
                                let isRightKeyword = self.rightKeywords.find(
                                    (k) => k == word.id
                                );

                                if (isRightKeyword) {
                                    word.classList.add("scored");
                                    let correctArray =
                                        gsap.utils.toArray(".scored");

                                    if (
                                        self.rightKeywords.length ===
                                        correctArray.length
                                    ) {
                                        // TODO Completed
                                        self.showResult = true;

                                        let tl = gsap.timeline({});
                                        tl.to(".words-container", {
                                            opacity: 0,
                                            height: 0,
                                        })
                                            .set(
                                                ".words-container, .drag-area",
                                                {
                                                    display: "none",
                                                }
                                            )
                                            .to(
                                                ".result-word",
                                                {
                                                    opacity: 1,
                                                    yPercent: 0,
                                                    stagger: true,
                                                },
                                                "<"
                                            );

                                        self.draggableInstance.forEach(
                                            (element) => {
                                                element[0].kill();
                                            }
                                        );
                                    }
                                } else {
                                    setTimeout(() => {
                                        let wordsMatch = [];
                                        let tl = gsap.timeline();
                                        tl.to(this.target, {
                                            x: 0,
                                            y: 0,
                                            onComplete: () => {
                                                word.classList.remove(
                                                    "matched"
                                                );
                                                wordsMatch =
                                                    gsap.utils.toArray(
                                                        ".matched"
                                                    );
                                            },
                                        });

                                        if (wordsMatch.length === 0) {
                                            gsap.set(".drag-label", {
                                                display: "block",
                                            });
                                        }
                                    }, 1000);
                                }
                            }
                        },
                    });
                    this.draggableInstance.push(allDraggable);
                });
            },
        },
    };
</script>

<style scoped>
    .drag-area {
        width: 80%;
        height: 120px;
        margin: 1rem auto;
        background: white;
        border-radius: 20px;
        position: relative;
    }
    .drag-area h2 {
        color: var(--main-color-2);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .words-container,
    .result-world-container {
        display: flex;
        justify-content: center;
        align-items: center;
        /* max-width: 300px; */
        flex-wrap: wrap;
        gap: 1rem;
        margin: 1rem auto;
    }
    .single-word,
    .result-word {
        border: 1px solid red;
        padding: 1rem;
        border-radius: 30px;
    }

    .matched {
        border: 1px solid black;
        color: black;
    }
</style>
```

:::
