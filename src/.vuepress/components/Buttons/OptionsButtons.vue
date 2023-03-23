<template>
    <div class="wrapper">
        <span class="option-text">
            {{ option.option }}
        </span>
        <span class="amount">
            {{
                !showTotalVotes
                    ? ""
                    : Math.round((option.votes * 100) / totalVotes) + "%"
            }}
        </span>

        <span
            :class="option.isSelected || 'is-selected'"
            class="btn options-quiz-result"
            id="activity-btn"
        >
            <span>
                {{ option.option }}
            </span>
            <span class="amount">
                {{
                    !showTotalVotes
                        ? ""
                        : Math.round((option.votes * 100) / totalVotes) + "%"
                }}
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
