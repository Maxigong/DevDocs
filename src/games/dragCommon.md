---
tags: ["gsap", "draggable", "game"]
sidebarDepth: 2
---

# Drag Common

::: tip ChatGTP Explanation

The explanation of the code was created using ChatGTP after sharing the code snippet.

The prompt is, "I am writing a documentation site using vuepress, I will paste some codes and I want you to explain de code as I was a junior developer. The explanation needs to be clear but not too long and I need it in English and Korean."
:::

## Description

이 코드는 Vue.js를 사용하여 만든 워드 매치 게임 컴포넌트입니다. 사용자는 드래그 가능한 단어를 드래그해서 특정 영역에 놓아야 합니다. 이 코드는 GSAP 라이브러리를 사용하여 애니메이션 효과를 추가하고, 뷰 컴포넌트에서 props와 data를 사용하여 컴포넌트에 필요한 데이터를 전달하고 관리합니다. 그리고 마지막으로, 컴포넌트에는 스타일을 지정하는 CSS 코드가 포함되어 있습니다.

::: tip English
::: details Expand
This is a Vue component that displays a draggable list of words. The user can drag and drop the words into a designated area, and if the word is a correct match, it will be highlighted and scored. The component has three main sections: the drag area, the words container, and the result word container.

In the HTML template, there is a div with class "drag-area" that contains a heading "Drag the words here." The words container displays a list of words using Vue's v-for directive. Each word is displayed as a paragraph element with a class of "single-word" and a unique ID based on the word's content. The result word container displays the correct words that have been matched and scored by the user.

The component uses the GSAP library to create draggable objects. In the script section, the component imports the necessary modules from GSAP and registers them as plugins. The component defines two props: "keywords" and "rightKeywords" that accept arrays of strings. "keywords" is used to generate the list of draggable words, and "rightKeywords" is used to define the correct words that should be matched and scored.

In the "mounted" lifecycle hook, the component sets the initial state of the result word container by setting the opacity to 0 and yPercent to 200. It also calls the "dragWord" method to create draggable objects for each word in the words container. In the "beforeDestroy" lifecycle hook, the component destroys all draggable instances before the component is destroyed to prevent memory leaks.

The "dragWord" method creates a Draggable instance for each word in the words container using the GSAP library. When a word is dragged, the "onDrag" method is called, and it checks if the word is within the drag area. If it is, the word's class is updated to "matched," indicating that it is a correct match. If not, the word's class is updated to remove "matched" and "scored." When the user releases the word, the "onRelease" method is called. If the word is not a match, it is returned to its original position using GSAP's timeline animation. If the word is a match, it is checked against the "rightKeywords" prop. If it is a correct match, the word's class is updated to "scored," and if all correct words have been scored, the result word container is displayed with the correct words.

The style section contains CSS rules for the drag area, words container, and result word container. The "matched" class is used to style words that have been correctly matched by the user.
:::

::: danger Required GSAP installation

All this examples required gsap

:::

## Example

<!-- <Draggable-DragCommon /> -->

## Snippets

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
