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
                            if (this.hitTest(circles[i], overlapThreshold)) {
                                circle.classList.add("highlight", "matched");
                            } else {
                                circle.classList.remove("highlight", "matched");
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
                                    if (self.totalFails === self.totalTries) {
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
                        } else if (currentBox.style.visibility === "hidden") {
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
