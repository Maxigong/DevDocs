---
tags: ["gsap", "draggable", "game", "staedel"]
sidebarDepth: 3
---

# Drag And Match

::: tip ChatGTP Explanation

The explanation of the code was created using ChatGTP after sharing the code snippet.

The prompt is, "I am writing a documentation site using vuepress, I will paste some codes and I want you to explain de code as I was a junior developer. The explanation needs to be clear but not too long and I need it in English and Korean."
:::

## Description

::: warning Required GSAP installation

This examples required gsap

:::
이것은 두 개의 하위 구성 요소를 포함하는 Vue.js 구성 요소입니다. 첫 번째 자식 구성 요소는 이미지, 제목 및 키워드 배열과 같은 일부 소품을 받는 DragAndMatchTop 구성 요소입니다. 두 번째 자식 구성 요소는 키워드 배열을 받는 DragAndMatchKeywords 구성 요소입니다.

또한 이 구성 요소는 GreenSock 애니메이션 플랫폼(gsap) 라이브러리를 가져오고 Draggable 플러그인을 사용하여 드래그 가능한 요소를 생성합니다.

스크립트 섹션에는 아트 인벤토리 번호, 작업 완료 여부를 나타내는 부울, 스토리 이름, 피드백이 포함된 올바른 키워드 배열, 제목, 이미지, 키워드 배열.

이 구성 요소에는 드래그 가능한 요소와 해당 동작을 초기화하는 DragMatchFunc와 같은 일부 메서드, 드래그 가능한 요소를 제거하는 beforeDestroy 후크, userSelection, imageWidth, imageHeight, totalFails, totalTries 및 draggableInstance와 같은 일부 데이터 속성이 있습니다.

템플릿 섹션은 두 개의 하위 구성 요소를 렌더링하고 작은 태그에 총 실패 및 시도 횟수를 표시합니다. 첫 번째 하위 구성 요소는 이미지와 제목을 표시하고 두 번째 하위 구성 요소는 키워드와 함께 드래그할 수 있는 요소 목록을 표시합니다.
::: tip English
::: details Expand
This is a Vue.js component that contains two child components. The first child component is a DragAndMatchTop component that receives some props, such as an image, a title, and an array of keywords. The second child component is a DragAndMatchKeywords component that receives an array of keywords.

This component also imports the GreenSock Animation Platform (gsap) library and uses its Draggable plugin to create draggable elements.

In the script section, there are some props that this component receives, such as the art inventory number, a boolean indicating if the task is completed, the story name, an array of right keywords with their feedback, a title, an image, and an array of keywords.

The component has some methods, such as DragMatchFunc, that initializes the draggable elements and their behavior, the beforeDestroy hook, which removes the draggable elements, and some data properties, such as userSelection, imageWidth, imageHeight, totalFails, totalTries, and draggableInstance.

The template section renders the two child components and shows the total number of fails and tries in a small tag. The first child component shows an image and a title, and the second child component shows a list of draggable elements with the keywords.
:::

## Example

<ClientOnly>
<DragAndMatch-DragAndMatch/>
</ClientOnly>

## Snippets

::: warning Nested Components
This component uses nested components
:::

::: tip Parent Component

::: details Click me to view the code

```html
<template>
    <div class="component-container">
        <small>Fails {{ totalFails }}/{{ totalTries }}</small>
        <DragAndMatch-DragAndMatchTop
            :art_img="img"
            :title="story_name"
            :keywords="rightKeywords"
            :show-circles="true"
            :subtitle="title"
        />
        <DragAndMatch-Keywords :story_keywords_list="keywords" />
    </div>
</template>

<script>
    import { gsap } from "gsap";
    import { Draggable } from "gsap/Draggable";
    gsap.registerPlugin(Draggable);
    export default {
        props: {
            art_inventory_number: {
                type: String,
                default: "SG 1278",
            },
            isCompleted: {
                type: Boolean,
                default: false,
            },
            story_name: {
                type: String,
                default: "Medea",
            },
            rightKeywords: {
                type: Array,
                default: () => [
                    {
                        id: 1,
                        keyword: "dress",
                        position: { top: 8, left: 43 },
                        shortFeedBack:
                            "The dress soiled with ash is a wedding dress, but it does not belong to Medea.",
                        longFeedBack:
                            "Jason and Medea married, had two sons and lived happily together for many years. But when the king of Corinth offers Jason to marry his daughter and take over the city, the story takes a tragic turn: Medea, who had betrayed her family for Jason and left her homeland, is to be banished abroad – whereupon she forges a cruel revenge plan. She sends Jason's new bride a wedding dress made out of poisoned fabric.",
                    },
                    {
                        id: 2,
                        keyword: "snakeskin",
                        position: { top: 9, left: 60 },
                        shortFeedBack:
                            "Medea takes revenge on her husband Jason, who wanted to leave her for someone else, by killing his new bride and their children. After the deed, she flees on the chariot of the sun god, which was drawn by flying serpents",
                        longFeedBack:
                            "The snake is a symbol of renewal: Medea begins a new chapter in her story. Nothing remains of her old life with Jason.",
                    },
                    {
                        id: 3,
                        keyword: "childrens dresses",
                        position: { top: 64, left: 35 },
                        shortFeedBack:
                            "The little white dresses stand for the killed children of Medea and Jason.",
                        longFeedBack:
                            "When Medea learns that Jason plans to leave her for another woman, she plots a terrible act of revenge. First she poisoned Jason's new bride. But to take everything from Jason - just as he took everything from her - she goes to the extreme. In her madness she kills her own children.",
                    },
                    {
                        id: 4,
                        keyword: "teeth",
                        position: { top: 24, left: 41 },
                        shortFeedBack:
                            "In the Argonaut saga, enchanted dragon teeth transform into warriors that Jason must fight.",
                        longFeedBack:
                            "When Jason demands that the King of Colchis hand over the Golden Fleece, he presents her with an impossible task: The young hero is to sow enchanted dragon teeth from which.",
                    },
                    {
                        id: 5,
                        keyword: "gold",
                        position: { top: 63, left: 48 },
                        shortFeedBack:
                            "In the Argonaut saga, enchanted dragon teeth transform into warriors that Jason must fight.",
                        longFeedBack:
                            "When Jason demands that the King of Colchis hand over the Golden Fleece, he presents her with an impossible task: The young hero is to sow enchanted dragon teeth from which.",
                    },
                ],
            },
            title: {
                type: String,
                default:
                    "Anselm Kiefer's work deals with the Medea myth. The story begins with Jason and Princess Medea falling in love. Find out more by matching the terms!",
            },
            img: {
                type: String,
                default:
                    "https://sammlung.staedelmuseum.de/images/4138/thumb-xl.jpg",
            },

            keywords: {
                type: Array,
                default: () => [
                    "dress",
                    "snakeskin",
                    "childrens dresses",
                    "teeth",
                    "gold",
                ],
            },
        },
        mounted() {
            setTimeout(() => {
                this.DragMatchFunc();
            }, 2000);
        },
        beforeDestroy() {
            //  remove draggables
            this.draggableInstance.forEach((element) => {
                element[0].kill();
            });
        },
        data() {
            return {
                userSelection: null,
                imageWidth: null,
                imageHeight: null,
                totalFails: 0,
                totalTries: 3,
                draggableInstance: [],
            };
        },

        methods: {
            // The main function of this components, that affect the child components is control here.
            DragMatchFunc() {
                let score = 0; // player score
                let circles = gsap.utils.toArray(".circles"); // get all circles
                let keywordsList = gsap.utils.toArray(".options"); // get options

                let overlapThreshold = "30%"; // how much the option should overlap the circle to be consider match
                let circle = null;
                let self = this; // scope reference

                // create  a draggable for each work(options)
                for (let i = 0; i < keywordsList.length; i++) {
                    let allDraggable = Draggable.create(keywordsList[i], {
                        // check if it match
                        onDrag: function () {
                            circle = keywordsList[i];
                            if (circles[i]) {
                                if (
                                    this.hitTest(circles[i], overlapThreshold)
                                ) {
                                    circle.classList.add(
                                        "highlight",
                                        "matched"
                                    );
                                } else {
                                    circle.classList.remove(
                                        "highlight",
                                        "matched"
                                    );
                                }
                            }
                        },
                        onRelease: function () {
                            // if it does not match return to the original position
                            if (!circle.classList.contains("matched")) {
                                let tl = gsap.timeline();
                                tl.to(this.target, {
                                    background: "red",
                                    duration: 1,
                                    ease: "bounce.out",
                                    yoyo: true,
                                }).to(this.target, {
                                    x: 0,
                                    y: 0,
                                    onComplete: () => {
                                        gsap.set(this.target, {
                                            clearProps: "background",
                                        });
                                        // update number of fails
                                        ++self.totalFails;

                                        // check if player could not answer correctly
                                        if (
                                            self.totalFails === self.totalTries
                                        ) {
                                            window.alert("fail");
                                            self.totalFails = 0;
                                            score = 0;
                                        }
                                    },
                                });

                                circle.classList.remove("scored");
                            } else if (!circle.classList.contains("scored")) {
                                circle.classList.add("scored");
                            }
                        },
                        onDragEnd: () => {
                            this.userSelection = this.rightKeywords[i];
                            let currentBox = circles[i];

                            if (!this.userSelection) return;

                            // hide or show circles if there is a match
                            if (
                                circle.classList.contains("scored") &&
                                currentBox.style.visibility !== "hidden"
                            ) {
                                score += 1;

                                currentBox.style.visibility = "hidden";
                            } else if (
                                currentBox.style.visibility === "hidden"
                            ) {
                                score -= 1;
                                currentBox.style.visibility = "visible";
                            }

                            score <= 0 ? (score = 0) : score;

                            // check score
                            if (score === this.rightKeywords.length) {
                                window.alert("Completed");
                                // if challenge is complete prevent the player to continue dragging
                                this.draggableInstance.forEach((element) => {
                                    element[0].kill();
                                });
                            }
                            circle = null;
                        },
                    });
                    // add all instance to an array to clean the function when  completed
                    this.draggableInstance.push(allDraggable);
                }
            },
        },
    };
</script>

<style scoped>
    .component-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        overflow: hidden;
    }
    small {
        text-align: center;
        display: inline-block;
        width: 100%;
        margin-left: 10rem;
    }
</style>
```

:::

### DragAndMatchTop

한국어: DragAndMatchTop 컴포넌트는 Vue.js 컴포넌트로, 이미지와 해당 이미지의 일부 단어들 위에 원형 마커를 표시합니다. 이 컴포넌트는 예술 이미지 URL, 제목, 키워드, 부제목, 완료 여부 등 다양한 속성을 받아들이며, isCompleted 속성에 따라 사용자에게 메시지를 표시합니다. CSS와 GSAP 애니메이션 라이브러리를 사용하여 원형 마커를 이미지 위에 배치하고, 컴포넌트가 마운트되면 원형 마커가 숨겨지며 일정 시간이 지난 후 올바른 위치로 애니메이션됩니다.

::: tip English
::: details Expand
The DragAndMatchTop component is a Vue.js component that displays an image with circles placed on specific keywords. It receives various props such as the art image URL, title, keywords, subtitle, and isCompleted, and based on the isCompleted prop, it displays a message for the user. The circles are positioned on the image using CSS and GSAP animation library. When the component is mounted, the circles are hidden, and after a certain amount of time, they are animated to their correct positions.
:::

::: tip DragAndMatchTop Component

::: details Click me to view the code

```html
<template>
    <div class="activity-image-container">
        <div class="paint-details">
            <section class="paint-details">
                <img class="img" v-if="art_img" :src="art_img" :alt="title" />
                <slot name="circles"> </slot>
                <span
                    v-for="(circle, idx) in keywords"
                    :key="idx"
                    :class="`circle-${circle.keyword
                        .trim()
                        .replaceAll(' ', '-')}`"
                    class="circles"
                >
                </span>
            </section>

            <h2 class="subtile">{{ message }}</h2>
        </div>
    </div>
</template>

<script>
    import { gsap } from "gsap";
    export default {
        props: {
            art_img: {
                type: String,
            },
            title: {
                type: String,
                default: "",
            },
            keywords: {
                type: Array,
            },
            subtitle: {
                type: String,
                default: "Title",
            },
            isCompleted: {
                type: Boolean,
                default: false,
            },
            setCircleTime: {
                type: Number,
                default: 2000,
            },
        },
        mounted() {
            gsap.set(".circles", { opacity: 0 });
            setTimeout(() => {
                this.setCirclePosition();
            }, this.setCircleTime);
        },

        computed: {
            message() {
                return this.isCompleted
                    ? "Click word on the image to learn more"
                    : "Drag the right keywords";
            },
        },
        methods: {
            setCirclePosition() {
                let artImg = document.querySelector(".img");
                this.imageWidth = artImg.offsetWidth;
                this.imageHeight = artImg.offsetHeight;

                this.keywords.forEach((element) => {
                    let { top, left } = element.position;

                    let topPosition = Math.floor(
                        (top * this.imageHeight) / 100
                    );
                    let leftPosition = Math.floor(
                        (left * this.imageWidth) / 100
                    );

                    return gsap.to(
                        `.circle-${element.keyword
                            .trim()
                            .replaceAll(" ", "-")}`,
                        {
                            translateX: leftPosition,
                            translateY: topPosition,
                            opacity: 1,
                            duration: 1,
                        }
                    );
                });
            },
        },
    };
</script>

<style scoped>
    .activity-image-container {
        height: auto;
        margin-top: 0;
    }
    .paint-details {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: relative;
        height: auto;
    }

    .paint-details .img {
        height: auto;
        max-height: 300px;
        object-fit: contain;
        max-width: 100%;
    }

    .subtile {
        color: #7e194b;
        margin: 0.5rem;
        font-size: 14px;
    }

    .circles {
        background: rgba(237, 234, 227, 0.2);
        border: 2px dashed #ffffff;
        top: 0;
        left: 0;
        bottom: unset;
        position: absolute;
        background: transparent;
        height: 62px;
        width: 62px;
        border-radius: 50%;
    }
</style>
```

:::

### Keywords

한국어 설명: 이것은 두 가지 다른 스타일로 키워드 목록을 표시하는 Vue 구성 요소입니다. 구성 요소는 story_keywords_list 배열을 props로 사용하며, v-for 지시문을 사용하여 키워드를 두 가지 스타일로 표시합니다. 첫 번째 스타일의 키워드는 "keywords" 클래스가 지정된 div로 묶이고, 두 번째 스타일의 키워드는 "keywordsback" 클래스가 지정된 div로 묶입니다.

각 키워드는 "options" 클래스가 지정된 span 요소로 표시됩니다. "options" 클래스는 빨간색 배경색과 테두리를 제공합니다. "options-back" 클래스는 점선 테두리 스타일과 투명 색상을 제공합니다. "options" 클래스의 불투명도는 초기에 0으로 설정되고, "options-back" 클래스의 불투명도는 초기에 1로 설정됩니다.

컴포넌트가 마운트될 때, gsap 라이브러리를 사용하여 키워드를 애니메이션으로 표시합니다. "keywords" 클래스의 불투명도가 1로 설정되고, 키워드는 y 축 전환을 사용하여 0.05 초 간격으로 애니메이션됩니다. 마지막으로 "options-back" 클래스의 불투명도가 1로 설정됩니다.

요약하면, 이것은 두 가지 다른 스타일로 키워드 목록을 표시하고 gsap 라이브러리를 사용하여 키워드를 애니메이션으로 표시하는 Vue 구성 요소입니다.

::: tip English
::: details Expand
This is a Vue component that displays a list of keywords in two different styles. The component takes in an array of story_keywords_list as a prop, which is iterated through using a v-for directive to display the keywords in both styles. The keywords in the first style are wrapped in a div with the class "keywords" while the keywords in the second style are wrapped in a div with the class "keywordsback".

Each keyword is displayed as a span element with a class of "options". The "options" class provides a red background color and a border. The "options-back" class provides a dashed border style and a transparent color. The opacity of the "options" class is set to 0 initially, and the opacity of the "options-back" class is set to 1 initially.

When the component is mounted, it animates the keywords using the gsap library. The opacity of the "keywords" class is set to 1, and the keywords are animated using a y-axis transition with a stagger of 0.05 seconds. Finally, the opacity of the "options-back" class is set to 1.

In summary, this is a Vue component that displays a list of keywords in two different styles and animates the display of the keywords using the gsap library.
:::

::: tip Keywords Component

::: details Click me to view the code

```html
<template>
    <section class="keyword-section">
        <!-- all keywords -->
        <!-- keywords that  can be drag -->
        <div class="keywords">
            <span
                v-for="(keyword, idx) in story_keywords_list"
                :key="idx"
                :class="`selected-${idx}`"
                class="options"
                id="keyword"
                :style="`order: ${keyword.order ? keyword.order : idx}`"
            >
                {{ keyword }}
            </span>
        </div>
        <!-- end of all keywords -->
        <!-- keywords for styles -->

        <div class="keywords keywordsback">
            <span
                v-for="(keyword, idx) in story_keywords_list"
                :key="idx"
                :class="`selected-${idx}`"
                class="options-back"
                :style="`order: ${keyword.order ? keyword.order : idx}`"
            >
                {{ keyword }}
            </span>
        </div>
        <!-- end of all keywords -->
    </section>
</template>

<script>
    import { gsap } from "gsap";
    export default {
        props: {
            story_keywords_list: {
                type: Array,
            },
            detail: {
                type: Number,
                default: 2,
            },
        },
        mounted() {
            // animate keywords
            let tl = gsap.timeline({ delay: this.detail });
            tl.set(".keywords", { opacity: 1 })
                .from("#keyword", {
                    yPercent: 100,
                    stagger: 0.05,
                })
                .set(".options-back", { opacity: 1 });
        },
    };
</script>

<style scoped>
    .keyword-section {
        position: relative;
        display: flex;
    }

    .keywords,
    .keywordsback {
        display: flex;
        align-items: center;
        place-content: center;
        flex-wrap: wrap;
        gap: 0.5rem;
        /* margin: 1rem; */
        opacity: 0;
        max-width: 400px;
    }
    .keywordsback {
        position: absolute;
        top: 0;
    }

    .options,
    .options-back {
        padding: 1rem;
        height: 34px;
        background: red;
        background: transparent;
        border: 1px solid #7e194b;
        color: #7e194b;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        text-align: center;
    }

    .options-back {
        color: transparent;
        border-style: dashed;
        opacity: 0;
    }
    .options {
        z-index: 1;
    }
</style>
```

:::
