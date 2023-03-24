---
tags: ["gsap", "options", "staedel", "buttons", "game"]
sidebarDepth: 2
---

# Poll Many Options

::: tip ChatGTP Explanation

The explanation of the code was created using ChatGTP after sharing the code snippet.

**_Prompt :_** "I am writing a documentation site using vuepress, I will paste some codes and I want you to explain de code as I was a junior developer. The explanation needs to be clear but not too long and I need it in English and Korean."
:::

## Description

이 코드는 사용자가 표시된 옵션 중 하나를 선택할 수 있는 버튼이 있는 대화형 이미지를 표시하는 Vue 구성 요소입니다. 구성 요소는 스토리 이름, 제목, 이미지 URL 및 옵션 배열과 같은 여러 가지 소품을 받습니다. 옵션 배열에는 ID, 옵션 이름 및 기타 피드백 텍스트가 있는 객체가 포함됩니다.

구성 요소 템플릿은 이미지와 버튼 컨테이너의 두 섹션으로 구성됩니다. 이미지 섹션에는 이미지가 있는 경우 이미지가 표시되고 버튼 섹션에는 옵션의 버튼이 표시됩니다. 사용자가 버튼을 클릭하면 클릭 이벤트를 처리하기 위해 메서드가 호출됩니다. 이 방법에서는 버튼의 클릭 애니메이션이 트리거되고 선택한 옵션의 투표 수가 증가합니다.

이 구성 요소에는 총 투표 수와 총 투표 수를 표시할지 여부를 추적하는 showTotalVotes 및 totalVotes와 같은 일부 데이터 속성도 있습니다. 총 투표 수는 버튼 아래에 표시됩니다.

::: tip English
::: details Expand

This code is a Vue component that displays an interactive image with buttons, where the user can select one of the options displayed. The component receives several props, such as the story name, title, image URL, and options array. The options array contains objects with an ID, the option name, and other feedback texts.

The component template consists of two sections: the image and the buttons' container. The image section shows the image if it exists, and the button section displays the options' buttons. When the user clicks on a button, a method is called to handle the click event. In this method, the button's click animation is triggered, and the selected option's vote count is incremented.

The component also has some data properties, such as showTotalVotes and totalVotes, that keep track of the total number of votes and whether to show the total vote count. The total vote count is displayed below the buttons.
:::

::: warning GSA
This components uses gsap
:::

## Example

<StaedelGames-PollManyOptions/>

## Snippets

::: warning Nested Components
This component uses nested components
:::

::: tip Parent Component

::: details Click me to view the code

```html
<template>
    <div class="activity-wrapper">
        <!-- Image -->
        <section class="activity-image-container top-section">
            <img v-if="img" :src="img" :alt="title" />
        </section>
        <!-- Buttons  options -->
        <section class="result-section">
            <h3 class="vote-count" v-if="showTotalVotes">
                Total Votes: {{ totalVotes }}
            </h3>
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
                totalVotes: 0,
            };
        },
        methods: {
            handleClick(item, idx) {
                this.$refs.btns[idx]
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
    .activity-buttons {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 18px;
    }

    .activity-buttons {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 18px;
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

    .vote-count {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.5rem;
    }

    .vote-count {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.5rem;
    }
</style>
```

:::

::: tip Child Component
See **_Buttons Options Buttons_**
:::
