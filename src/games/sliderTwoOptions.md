---
tags: ["btn", "button", "slider", "css", "staedel", "clip-path", "range"]
sidebarDepth: 2
---

# Slider Two Options

::: tip ChatGTP Explanation

The explanation of the code was created using ChatGTP after sharing the code snippet.

The prompt is, "I am writing a documentation site using vuepress, I will paste some codes and I want you to explain de code as I was a junior developer. The explanation needs to be clear but not too long and I need it in English and Korean."
:::

## Description

이것은 이미지와 함께 투표 옵션과 슬라이더를 보여주는 Vue 컴포넌트입니다. 사용자가 투표하면 각 옵션의 총 투표 수가 표시되며 사용자는 각 옵션에 대한 피드백을 볼 수 있습니다.

이 컴포넌트는 이미지와 옵션 두 개의 섹션을 가진 div로 구성됩니다. 옵션 섹션에는 슬라이더와 두 가지 옵션이 있는 슬라이드 컨테이너가 포함되어 있습니다. 사용자는 첫 번째 옵션보다 두 번째 옵션을 얼마나 선호하는지를 나타내기 위해 슬라이더를 이동할 수 있습니다. 사용자가 제출 버튼을 클릭하면 선택한 옵션의 투표를 처리하는 함수가 트리거됩니다. 이 함수는 선택한 옵션의 투표를 업데이트합니다.

사용자가 투표를 제출한 후, 컴포넌트는 각 옵션의 총 투표 수와 피드백을 표시합니다.

이 컴포넌트는 gsap 애니메이션 라이브러리를 가져옵니다.

::: tip English
::: details Expand
This is a Vue component that shows an image with a set of options to vote for, along with a slider. When the user votes, it shows the total votes for each option, and the user can see the feedback on each option.

The component consists of a div with two sections, one for the image and one for the options. The options section contains a slide container, which has a slider and two options. The user can slide the slider to indicate how much they like the first option over the second one. When the user clicks the submit button, it triggers a function to handle the vote, which updates the votes for the chosen option.

After the user submits their vote, the component shows the total votes and feedback for each option.

This component also imports a library called gsap for animation.
:::

::: warning GSA
This components uses gsap
:::

## Example

<StaedelGames-SliderTwoOptions/>

## Snippets

::: tip Code example

::: details Click me to view the code

```html
<template>
    <div class="activity-wrapper">
        <section class="activity-image-container top-section">
            <img :src="img" />
        </section>
        <section class="options-text">
            <div v-show="!showTotalVotes" class="slide-container">
                <div class="slide" v-if="options.length > 0">
                    <p>{{ options[0].option }}</p>
                    <input type="range" v-model="sliderValue" />
                    <p>{{ options[1].option }}</p>
                </div>
                <button class="btn" @click="handleClick(options[answerRange])">
                    Submit
                </button>
            </div>
            <!-- end of slider -->

            <!-- Result -->
            <!-- v-show="showTotalVotes" -->
            <div
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
            </div>
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
                totalVotes: 0,
                showTotalVotes: false,
                answerRange: 0,
                sliderValue: 50,
            };
        },

        watch: {
            sliderValue(value) {
                let id = value >= 50 ? 1 : 0;
                return (this.answerRange = id);
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
    .section-container {
        position: relative;
        width: 100%;
        padding: 1rem;
    }
    .image-container {
        width: 100%;
        height: 100%;
        position: relative;
    }
    img {
        width: 100%;
        height: 100%;
        position: relative;
        object-fit: cover;
    }
    /* option */
    .options-text {
        display: grid;
        grid-template-rows: auto 1fr auto;
        padding: 0 1rem;
        position: relative;
    }
    .option-text {
        background: white;
        color: black;
        padding: 1rem;
        font-size: 0.75rem;
    }
    .slide-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .slide {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 2rem auto;
        width: 100%;
    }

    .result {
        position: absolute;
        bottom: 0;
        opacity: 0;
        left: 0;
        width: 100%;
        height: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .slide-result-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 0.5rem;
        height: 100%;
    }

    .slide-single-result {
        position: relative;
        height: 30px;
        text-align: start;
        justify-content: space-between;
    }

    .activity-buttons {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        gap: 18px;
    }

    .activity-btn {
        position: relative;
        min-height: 45px;
        text-align: start;
        justify-content: space-between;
        height: fit-content;
        border-radius: 100px;
        overflow: hidden;
        background: transparent;
        color: #7e194b;
        font-size: 18px;
        width: 100%;
    }

    .btn {
        width: 100%;
        max-width: 302px;
        border: 0.5px solid #7e194b;
        color: #7e194b;
        border-radius: 8px;
        cursor: pointer;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        line-height: 24px;
        max-width: 100%;
        padding: 0 25px;
        position: relative;
        text-align: center;
        text-decoration: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-user-select: none;
        -ms-touch-action: manipulation;
        touch-action: manipulation;

        /* test */
        width: 276px;
        height: 50px;
        margin: 0 auto;
        text-transform: uppercase;
        font-weight: 300;
    }
</style>
```

:::

::: tip Child Component
See **_Buttons Options Buttons_**
:::
