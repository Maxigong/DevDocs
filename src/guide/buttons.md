---
tags: ["btn", "button", "shake", "css", "staedel", "clip-path"]
---

# Buttons

## ButtonShake

<Buttons-ButtonShake/>

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

::: warning
This examples required gsap, gsap is uses for animations. So it can be replace with CSS animations
:::

<Buttons-OptionsButtonsWrapper/>

::: danger
MatchingCards uses nested components
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
