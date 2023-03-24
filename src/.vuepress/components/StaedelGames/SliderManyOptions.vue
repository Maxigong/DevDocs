<template>
    <div class="activity-wrapper">
        <section class="activity-image-container top-section">
            <img v-if="img" :src="imageActivity" :alt="title" />
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
            <h2 v-if="options.length > 0">
                {{ options[answerRange].option }}
            </h2>
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
    mounted() {},
    data() {
        return {
            showTotalVotes: false,
            answerRange: 0,
            sliderValue: 0,
            totalVotes: 0,
        };
    },
    computed: {
        imageActivity() {
            return this.img.startsWith("http")
                ? this.img
                : require(`../../assets/img/art-img/${this.img}`);
        },
    },
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
        // handleClick(item) {
        //     // add styles to selectedButton
        //     this.$refs.btns[this.answerRange]
        //         .querySelector(".options-quiz-result")
        //         .classList.add("is-selected");

        //     this.totalVotes = this.options.reduce((acc, cur) => {
        //         acc += cur.votes;
        //         return acc;
        //     }, 0);

        //     ++item.votes;
        //     ++this.totalVotes;
        //     this.$emit("updateVotes", {
        //         id: item.id,
        //         totalVotes: this.totalVotes,
        //     });
        //     this.showTotalVotes = true;
        // },

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
}

.activity-btn {
    position: relative;
    min-height: 45px;
    text-align: start;
    justify-content: space-between;
    height: fit-content;
    border: 0.5px solid #ffffff;
    border-radius: 100px;
    overflow: hidden;
    background: transparent;
    color: var(--main-color-1);
    font-size: 18px;
}
.options-quiz-result {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    width: 100%;
    background: var(--main-color-1);
    color: var(--main-color-2);
    clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%);
}

.vote-count {
    visibility: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
}
.showTotalVotes {
    visibility: visible;
}
</style>
