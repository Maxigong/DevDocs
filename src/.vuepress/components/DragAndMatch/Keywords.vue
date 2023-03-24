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
