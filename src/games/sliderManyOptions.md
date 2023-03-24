---
tags: ["btn", "button", "slider", "css", "staedel", "clip-path", "range"]
sidebarDepth: 2
---

# Slider Many Options

::: tip ChatGTP Explanation

The explanation of the code was created using ChatGTP after sharing the code snippet.

**_Prompt :_** "I am writing a documentation site using vuepress, I will paste a code snippet and I want you to explain it to me as if I was a junior developer. The explanation needs to be clear but not too long and I need it in English and Korean."
:::

## Description

Vue.js 컴포넌트로, 활동 래퍼를 나타냅니다. 몇 개의 섹션을 포함하고 있습니다. 첫 번째 섹션은 이미지가 있으면 이미지를 표시합니다. 두 번째 섹션은 사용자가 선택할 수있는 다른 옵션에 해당하는 버튼 세트를 표시합니다. 사용자가 이러한 버튼 중 하나를 클릭하면 handleClick() 함수가 호출됩니다. 세 번째 섹션은 레인지 슬라이더와 제출 버튼을 표시합니다. 이 섹션은 사용자가 아직 선택을하지 않은 경우에 표시됩니다.

컴포넌트는 story_name, title, img, options와 같은 여러 프롭을받습니다. options 프롭은 각 옵션에 대한 정보를 포함하는 객체의 배열입니다. 이 정보에는 id, label, votes, shortFeedBack 및 longFeedBack이 포함됩니다.

자바 스크립트 섹션에서 컴포넌트는 GSAP 애니메이션 라이브러리를 가져옵니다. 또한 컴포넌트의 데이터를 정의합니다. 데이터에는 showTotalVotes, answerRange, sliderValue 및 totalVotes가 포함됩니다. 데이터 함수는이 속성을 초기 값으로 포함하는 객체를 반환합니다.

sliderValue watcher는 각 옵션의 백분율을 계산하고 해당 옵션의 투표 속성에 설정합니다.

handleClick() 함수는 선택한 옵션과 인덱스를 인수로받습니다. 총 투표수를 업데이트하고 결과 섹션을 표시하는 showTotalVotes 플래그를 true로 설정합니다.

::: tip English
::: details Expand

This is a Vue.js component that represents an activity wrapper. It contains a few sections. The first section displays an image if there is one. The second section displays a set of buttons that correspond to the different options that a user can select. When a user clicks on one of these buttons, the function handleClick() is called. The third section displays a range slider and a submit button. This section is shown when the user has not yet made a selection.

The component receives several props, such as story_name, title, img, and options. The options prop is an array of objects that contain information about each option, including its id, label, votes, shortFeedBack, and longFeedBack.

In the JavaScript section, the component imports the GSAP animation library. It also defines the component's data, which includes showTotalVotes, answerRange, sliderValue, and totalVotes. The data function returns an object that contains these properties with their initial values.

There is also a sliderValue watcher that computes the percentage for each option and sets it to the corresponding option's votes property.

The handleClick() function receives the selected option and its index as arguments. It updates the totalVotes count and sets the showTotalVotes flag to true, which displays the results section.

The template includes a conditional rendering that shows or hides certain sections based on the value of showTotalVotes. There are also v-for and v-if directives that generate dynamic content for the buttons and the result section, respectively.
:::

## Example

<StaedelGames-SliderManyOptions/>

## Snippets

::: tip Code example

::: details Click me to view the code

```html
<template>
    <div class="activity-wrapper">
        <section class="activity-image-container top-section">
            <img v-if="img" :src="img" :alt="title" />
        </section>
        <section
            v-show="showTotalVotes"
            class="slide-result-container result-section"
        >
            <h3>Total Votes: {{ totalVotes }}</h3>
            <div class="activity-buttons">
                <button
                    ref="btns"
                    v-for="(option, idx) in options"
                    :key="idx"
                    class="btn activity-btn"
                    @click="handleClick(option, idx)"
                >
                    <Buttons-OptionsButtons
                        :option="option"
                        :showTotalVotes="showTotalVotes"
                        :totalVotes="totalVotes"
                    />
                </button>
            </div>
        </section>
        <section v-show="!showTotalVotes" class="slide-container">
            <h2 v-if="options.length > 0">{{ options[answerRange].option }}</h2>
            <input type="range" v-model="sliderValue" />
            <button
                v-if="options.length > 0"
                class="btn"
                @click="handleClick(options[answerRange])"
            >
                Submit
            </button>
        </section>
    </div>
</template>

<script>
    import { gsap } from "gsap";
    export default {
        props: {
            story_name: {
                type: String,
                default: "Story name",
            },
            title: {
                type: String,
                default: "Title",
            },
            img: {
                type: String,
                default:
                    "https://sammlung.staedelmuseum.de/images/102185/thumb-xl.jpg",
            },

            options: {
                type: Array,
                default: () => [
                    {
                        id: 1,
                        option: "cycle",
                        votes: 0,
                        shortFeedBack:
                            "The cords make tracks in the sand in an eternal circle. The work is reminiscent of the cycle of becoming and passing away.",
                        longFeedBack:
                            'The artist calls the work <i>"a kinetic memento mori"</i>. The Latin expression means to be aware of one\'s own mortality. For Uecker, sand is the ultimate symbol of the earth. The Old Testament says, "For you are dust and to dust you shall become". With the words, God indicated that the first man, Adam, will return to what he was created from. In the Christian Church there is also the burial formula "Earth to earth, ashes to ashes, dust to dust."',
                    },
                    {
                        id: 2,
                        option: "sandbox",
                        votes: 0,
                        shortFeedBack:
                            "The cords make tracks in the sand in an eternal circle. The work is reminiscent of the cycle of becoming and passing away.",
                        longFeedBack:
                            'The artist calls the work <i>"a kinetic memento mori"</i>. The Latin expression means to be aware of one\'s own mortality. For Uecker, sand is the ultimate symbol of the earth. The Old Testament says, "For you are dust and to dust you shall become". With the words, God indicated that the first man, Adam, will return to what he was created from. In the Christian Church there is also the burial formula "Earth to earth, ashes to ashes, dust to dust."',
                    },
                    {
                        id: 3,
                        option: "plowing",
                        votes: 0,
                        shortFeedBack:
                            "The cords make tracks in the sand in an eternal circle. The work is reminiscent of the cycle of becoming and passing away.",
                        longFeedBack:
                            'The artist calls the work <i>"a kinetic memento mori"</i>. The Latin expression means to be aware of one\'s own mortality. For Uecker, sand is the ultimate symbol of the earth. The Old Testament says, "For you are dust and to dust you shall become". With the words, God indicated that the first man, Adam, will return to what he was created from. In the Christian Church there is also the burial formula "Earth to earth, ashes to ashes, dust to dust."',
                    },
                    {
                        id: 4,
                        option: "circle",
                        votes: 0,
                        shortFeedBack:
                            "The cords make tracks in the sand in an eternal circle. The work is reminiscent of the cycle of becoming and passing away.",
                        longFeedBack:
                            'The artist calls the work <i>"a kinetic memento mori"</i>. The Latin expression means to be aware of one\'s own mortality. For Uecker, sand is the ultimate symbol of the earth. The Old Testament says, "For you are dust and to dust you shall become". With the words, God indicated that the first man, Adam, will return to what he was created from. In the Christian Church there is also the burial formula "Earth to earth, ashes to ashes, dust to dust."',
                    },
                ],
            },
        },
        data() {
            return {
                showTotalVotes: false,
                answerRange: 0,
                sliderValue: 0,
                totalVotes: 0,
            };
        },
        computed: {},
        watch: {
            sliderValue(value) {
                this.options.forEach((element, idx) => {
                    let percentage = (idx * 100) / this.options.length;
                    if (value > percentage) {
                        return (this.answerRange = idx);
                    }
                });
            },
        },
        methods: {
            handleClick(item, idx) {
                this.$refs.btns[this.answerRange]
                    .querySelector(".options-quiz-result")
                    .classList.add("is-selected");

                this.totalVotes = this.options.reduce((acc, cur) => {
                    acc += cur.votes;
                    return acc;
                }, 0);
                if (!this.showTotalVotes) {
                    ++item.votes;
                    ++this.totalVotes;
                    this.showTotalVotes = true;
                }

                this.resultButtonsAnimation(this.options, this.totalVotes);
            },
            resultButtonsAnimation(options, totalVotes) {
                let buttons = gsap.utils.toArray(".options-quiz-result"); // get all buttons

                // animate clipPath
                buttons.forEach((element, idx) => {
                    let value = `${(options[idx].votes * 100) / totalVotes}%`;
                    gsap.to(element, {
                        clipPath: `polygon(0 0, ${value} 0%, ${value} 100%, 0% 100%)`,
                        duration: 1,
                    });
                });

                let tl = gsap.timeline({});
                const topSection = document.querySelector(".top-section"); // target top section

                // fade top section and only show results buttons

                tl.to(topSection, {
                    opacity: 0,
                    height: 0,
                    transformOrigin: "top center",
                })
                    .to(".activity-image-container", { margin: 0 }, 0)
                    .to(".activity-wrapper", { display: "block" });
            },
        },
    };
</script>

<style scoped>
    .slide-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 0.5rem;
        margin: 1rem;
    }

    .slide-result-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 0.5rem;
    }

    .activity-buttons {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 18px;
        width: 100%;
    }

    .activity-btn {
        position: relative;
        min-height: 45px;
        text-align: start;
        justify-content: space-between;
        height: fit-content;
        border: 0.5px solid #7e194b;
        border-radius: 100px;
        overflow: hidden;
        background: transparent;
        color: #7e194b;
        font-size: 18px;
        width: 100%;
    }

    .showTotalVotes {
        visibility: visible;
    }
</style>
```

:::
:::

::: tip Child Component
See **_Buttons Options Buttons_**
:::
