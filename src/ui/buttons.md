---
tags: ["btn", "button", "shake", "css", "staedel", "clip-path"]
sidebarDepth: 3
---

# Buttons

::: tip ChatGTP Explanation

The explanation of the code was created using ChatGTP after sharing the code snippet.

The prompt is, "I am writing a documentation site using vuepress, I will paste some codes and I want you to explain de code as I was a junior developer. The explanation needs to be clear but not too long and I need it in English and Korean."
:::

## Button Shake

### Description

이 코드는 Vue 컴포넌트를 정의하여 "click here"라는 텍스트를 가진 버튼을 표시합니다. 버튼은 click 이벤트 핸들러를 가지고 있으며, 클릭시 vibrate 라는 메서드를 호출합니다. 버튼을 클릭하면, 잠시동안 버튼 엘리먼트에 isBtnActive라는 CSS 클래스가 추가되어 흔들리게됩니다.

vibrate 메서드는 isBtnActive 데이터 속성을 true로 설정하여 CSS 애니메이션을 시작하고, 500 밀리초 후에 속성을 false로 재설정하여 CSS 애니메이션을 종료합니다. 마지막으로, 장치를 진동시키기 위해 navigator.vibrate() 메서드를 호출합니다.

이 컴포넌트는 버튼 엘리먼트에 대한 몇 가지 CSS 스타일을 정의하며, transition 속성을 포함하여 클릭시 버튼이 부드럽게 애니메이션되도록합니다. 또한 @keyframes 지시문을 사용하여 shake 애니메이션을 정의합니다.

::: tip English
::: details Expand

This code defines a Vue component that displays a button with the text "click here". The button has a click event handler that triggers a method called vibrate when clicked. When the button is clicked, it also adds a CSS class called isBtnActive to the button element for a brief moment, causing it to shake.

The vibrate method sets the isBtnActive data property to true to trigger the CSS animation, then uses setTimeout to reset the property back to false after 500 milliseconds. Finally, it calls the navigator.vibrate() method to vibrate the device.

The component also defines some CSS styles for the button element, including a transition property that causes the button to smoothly animate when clicked. Additionally, it defines the shake animation using the @keyframes directive.
:::

### Example

<Buttons-ButtonShake/>

### Snippets

::: tip Code example

::: details Click me to view the code

```html
<template>
    <button
        :class="{ isBtnActive: isBtnActive }"
        @click="vibrate"
        class="btn-test"
    >
        click here
    </button>
</template>

<script>
    export default {
        data() {
            return {
                isBtnActive: false,
            };
        },
        methods: {
            vibrate() {
                this.isBtnActive = true;
                setTimeout(() => {
                    this.isBtnActive = false;
                }, 500);
                window.navigator.vibrate([200, 100, 200]);
            },
        },
    };
</script>

<style scoped>
    .btn-test {
        height: 50.12px;
        width: 200.91px;
        background: #f95c63;
        border-radius: 51px;
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        line-height: 150%;
        text-align: center;
        text-transform: capitalize;
        color: #ffffff;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.3 linear;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
        border: none;
    }
    .btn-test:active {
        transform: translateY(3px);
        /* display: none; */
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }
    .isBtnActive {
        color: #f95c63;
        background-color: white;
        border: 2px solid #f95c63;
        animation: shake 100ms 3 linear;
    }

    /* Animation most important part */

    @keyframes shake {
        0% {
            transform: translate(3px, 0);
        }
        50% {
            transform: translate(-3px, 0);
        }
        100% {
            transform: translate(0, 0);
        }
    }
</style>
```

:::

## Options Buttons

### Description

이 코드는 Vue.js 컴포넌트로, 각 버튼에 해당하는 옵션과 피드백이 있는 버튼 목록을 보여줍니다. 사용자는 하나의 옵션을 선택할 수 있으며 선택하면 해당 옵션의 투표 수가 1 증가하고 총 투표 수도 1 증가합니다. 첫 선택인 경우 총 투표 수가 표시됩니다. 선택된 옵션 버튼은 강조되며 강조를 업데이트하기 위한 애니메이션이 재생됩니다.

::: tip English
::: details Expand

This code is a Vue.js component that displays a list of options as buttons, each with its own feedback. The user can select one option, and upon selection, the option's vote count increases by 1, and the total vote count increases by 1. If this is the first selection, the total vote count is displayed. The selected option button is highlighted, and an animation is played to update the size of the highlight to match the updated vote count.
:::

### Example

<Buttons-OptionsButtonsWrapper/>

### Snippets

::: warning
This examples required gsap, gsap is uses for animations. So it can be replace with CSS animations
:::

::: warning Nested Components
This component uses nested components
:::

::: tip Parent Component

::: details Click me to view the code

```html
<template>
    <div class="activity-wrapper">
        <section class="result-section">
            <h3 class="vote-count" v-if="showTotalVotes">
                Total Votes: {{ totalVotes }}
            </h3>
            <div class="activity-buttons">
                <!-- array of options -->
                <button
                    ref="btns"
                    v-for="(option, idx) in options"
                    :key="idx"
                    class="btn activity-btn"
                    @click="handleClick(option, idx)"
                >
                    <!-- One OptionsButtons per options-->
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
    import { gsap } from "gsap"; // gsap
    export default {
        props: {
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
                showTotalVotes: false, // showResults
                totalVotes: 0,
            };
        },
        methods: {
            handleClick(item, idx) {
                // add a class to selected button for  styles
                this.$refs.btns[idx]
                    .querySelector(".options-quiz-result")
                    .classList.add("is-selected");

                // check total votes
                this.totalVotes = this.options.reduce((acc, cur) => {
                    acc += cur.votes;
                    return acc;
                }, 0);
                if (!this.showTotalVotes) {
                    ++item.votes;
                    ++this.totalVotes;
                    this.showTotalVotes = true;
                }
                // clipPath animation
                this.resultButtonsAnimation(this.options, this.totalVotes);
            },

            // This animations can be done with out gsap. But there  would be more lines of code to write.
            resultButtonsAnimation(options, totalVotes) {
                let buttons = gsap.utils.toArray(".options-quiz-result");
                buttons.forEach((element, idx) => {
                    let value = `${(options[idx].votes * 100) / totalVotes}%`;
                    gsap.to(element, {
                        clipPath: `polygon(0 0, ${value} 0%, ${value} 100%, 0% 100%)`,
                        duration: 1,
                    });
                });
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
</style>
```

:::

### Single Button

이것은 프로그레스 바를 만드는 Vue 구성 요소입니다. 구성 요소에는 진행 값, 최대 값 및 프로그레스 바의 색상과 같은 여러 프롭이 있습니다. 또한 계산된 속성이 있어 진행 값 및 최대 값에 기초하여 프로그레스 바의 너비를 계산합니다.

구성 요소는 "progress-bar" 클래스가있는 div를 렌더링하며 계산된 속성에 따라 프로그레스 바의 너비를 설정하는 스타일 속성이 있습니다. 또한 div의 배경색은 전달 된 색상 prop으로 설정됩니다.

::: tip English
::: details Expand

This is a Vue component that creates a progress bar. The component has several props, including the progress value, the maximum value, and the color of the progress bar. It also has a computed property that calculates the width of the progress bar based on the progress and maximum values.

The component renders a div with a class of "progress-bar" that has a style attribute that sets the width of the progress bar based on the computed property. The div also has a background color set to the color prop passed in.
:::

::: warning
This examples required gsap, gsap is uses for animations. So it can be replace with CSS animations
:::

::: tip Child Component

::: details Click me to view the code

```html
<template>
    <div class="wrapper">
        <!-- options name -->
        <span class="option-text"> {{ option.option }} </span>
        <!-- NOTES
        There two buttons with the same data, one on top of another.
        The second will animate the clip-path width after one of  buttons is clicked.
        -->
        <span class="amount">
            {{ !showTotalVotes ? "" : Math.round((option.votes * 100) /
            totalVotes) + "%" }}
        </span>

        <span
            :class="option.isSelected || 'is-selected'"
            class="btn options-quiz-result"
            id="activity-btn"
        >
            <span> {{ option.option }} </span>
            <span class="amount">
                {{ !showTotalVotes ? "" : Math.round((option.votes * 100) /
                totalVotes) + "%" }}
            </span>
        </span>
    </div>
</template>

<script>
    import { gsap } from "gsap";
    export default {
        props: {
            option: {
                type: Object,
                default: () => ({
                    text: "option 1",
                    isSelected: false,
                    votes: 10,
                }),
            },
            showTotalVotes: {
                type: Boolean,
                default: false,
            },
            totalVotes: {
                type: Number,
                default: 10,
            },
        },
    };
</script>

<style scoped>
    .wrapper {
        display: flex;
        justify-content: space-around;
        width: 100%;
    }

    .options-quiz-result {
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 100%;
        width: 100%;
        clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%);
        display: flex;
        justify-content: space-around;

        align-items: center;
    }
    .amount {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .is-selected {
        background: #7e194b;
        color: white;
    }
</style>
```

:::
