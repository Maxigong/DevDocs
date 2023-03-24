---
tags: ["games", "vue", "match"]
sidebarDepth: 2
---

# Matching Cards

::: tip ChatGTP Explanation

The explanation of the code was created using ChatGTP after sharing the code snippet.

The prompt is, "I am writing a documentation site using vuepress, I will paste some codes and I want you to explain de code as I was a junior developer. The explanation needs to be clear but not too long and I need it in English and Korean."
:::

## Description

이것은 메모리 매칭 게임을 생성하는 Vue.js 컴포넌트입니다. 게임은 플레이어가 클릭하여 뒤집어 숨겨진 이미지를 드러내는 카드로 구성됩니다. 게임의 목표는 모든 카드가 짝지어질 때까지 일치하는 카드 쌍을 찾는 것입니다.

컴포넌트 템플릿은 "match-container" 클래스를 가진 div로 구성됩니다. 이 div 내부에는 v-for 지시문을 사용하여 반복되는 Card 컴포넌트가 있습니다. Card 컴포넌트에는 @cardClick 이벤트 리스너가 있으며, 카드를 클릭할 때 handleClick 메소드를 호출합니다. Card 컴포넌트는 카드 세부 정보, 카드 ID 및 카드를 클릭할 수 있는지 여부를 결정하는 Boolean 값을 전달받습니다.

Card 컴포넌트 다음에는 기본적으로 숨겨진 "modal-container" 클래스의 div가 있습니다. 모든 카드가 짝지어지면 isModalActive 값이 true로 설정되어 모달이 표시됩니다.

컴포넌트 데이터 객체는 게임에 필요한 값을 초기화합니다. matchCounter는 매치 수를 추적합니다. isModalActive 값은 모달이 표시되는지 여부를 결정합니다. valid 값은 플레이어가 동시에 두 개 이상의 카드를 클릭하는 것을 방지합니다. selection1 및 selection2 값은 플레이어가 클릭한 두 개의 카드를 추적합니다. match1 및 match2 값은 선택한 두 개의 카드를 비교하는 데 사용됩니다. cardID1 및 cardID2 값은 선택한 두 개의 카드의 ID를 비교하는 데 사용됩니다. myMatch 값은 코드에서 사용되지 않습니다. 마지막으로, cards 배열에는 게임의 각 카드에 대한 세부 정보가 포함됩니다.

handleClick 메소드는 카드가 클릭될 때 호출됩니다. match1 값이 비어 있으면 selection1 값이 클릭된 카드로 설정되고, match1 및 cardID1 값이 카드의 매치 및 ID 값으로 설정됩니다. match1 값이 비어 있지 않고, 클릭된 카드의 ID가 처음 선택한 카드의 ID와 같지 않으면, selection2 값이 클릭된 카드로 설정되고, match2 및 cardID2 값이 카드의 매치 및 ID 값으로 설정됩니다. valid 값은 두 개 이상의 카드를 동시에 클릭하는 것을 방지하기 위해 false로 설정됩니다.

match1과 match2가 동일하면, 두 카드는 일치합니다. match

::: tip English
::: details Expand

This is a Vue.js component that creates a memory matching game. The game consists of cards that the player can click on to flip them over and reveal a hidden image. The goal of the game is to find pairs of matching cards until all cards have been matched.

The component template consists of a div with the class "match-container". Within this div, there is a Card component that is looped through using the v-for directive. The Card component has a @cardClick event listener that calls the handleClick method when a card is clicked. The Card component is passed the card details, the card's ID, and a Boolean value that determines if the card can be clicked on.

After the Card component, there is a div with the class "modal-container" that is hidden by default. When all the cards have been matched, the isModalActive value is set to true, which displays the modal.

The component data object initializes the values needed for the game. The matchCounter keeps track of the number of matches made. The isModalActive value determines if the modal is displayed. The valid value prevents the player from clicking on more than two cards at a time. The selection1 and selection2 values keep track of the two cards that the player clicks on. The match1 and match2 values are used to compare the matches of the two selected cards. The cardID1 and cardID2 values are used to compare the IDs of the two selected cards. The myMatch value is not used in the code. Finally, the cards array holds the details for each card in the game.

The handleClick method is called when a card is clicked on. If the match1 value is empty, the selection1 value is set to the clicked card, and the match1 and cardID1 values are set to the card's match and ID values. If the match1 value is not empty and the clicked card's ID is not equal to the first selected card's ID, then the selection2 value is set to the clicked card, and the match2 and cardID2 values are set to the card's match and ID values. The valid value is set to false to prevent the player from clicking on more than two cards at a time.

If match1 and match2 are equal, the two cards are a match. The matchCounter is incremented, and the selection1 and selection2 cards are set to be matched. The match1 and match2 values are reset to empty strings, and the selection1 and selection2 values are set back to null. The valid value is toggled to true, allowing the player to select another pair of cards.

If match1 and match2 are not equal, then the two cards do not match. The setTimeout function is called to delay the flipping of the two selected cards back over. The match1 and match2 values are reset to empty strings, and the selection1 and selection2 cards are set back to their inactive states. The valid value is toggled to true, allowing the player to select another pair of cards.

When the matchCounter is equal to half the length of the cards array, all cards have been matched, and the isModalActive value is set to true, which displays the modal.
:::

## Example

<Games-MatchingCards/>

## Snippets

::: warning Nested Components
This component uses nested components
:::

::: tip Parent Component

::: details Click me to view the code

```html
<template>
    <div class="match-container">
        <Card
            @cardClick="handleClick"
            v-for="card in cards"
            :key="card.id"
            :cardDetails="card"
            :valid="valid"
        />

        <!-- MODAL -->
        <div :class="{ isModalActive: isModalActive }" class="modal-container">
            <h2>You won!!!</h2>
            <!-- END OF MODAL -->
        </div>
    </div>
</template>

<script>
    import Card from "../Games/Card.vue";
    export default {
        components: { Card },
        data() {
            return {
                matchCounter: 0, // Check amount of matches
                isModalActive: false,
                valid: true, // Activate click event, Prevent clicking more than 2 cards
                selection1: null,
                selection2: null,
                match1: "",
                match2: "",
                cardID1: null,
                cardID2: null,
                myMatch: null,
                cards: [
                    {
                        id: 1,
                        match: "A",
                        imgFront: "",
                        imgBack: require("../../public/logo_green.jpeg"),
                        // imgFront: require('../../public/logo_green.jpeg'),
                        cardActive: false,
                        isMatched: false,
                    },
                    {
                        id: 2,
                        match: "B",
                        imgBack: require("../../public/logo.png"),
                        // imgFront: require('../../public/logo_green.jpeg'),
                        imgFront: "",
                        cardActive: false,
                        isMatched: false,
                    },
                    {
                        id: 3,
                        match: "A",
                        imgBack: require("../../public/logo_green.jpeg"),
                        // imgFront: require('../../public/logo.png'),
                        imgFront: "",
                        cardActive: false,
                        isMatched: false,
                    },
                    {
                        id: 4,
                        match: "B",
                        imgBack: require("../../public/logo.png"),
                        // imgFront: require('../../public/logo.png'),
                        imgFront: "",
                        cardActive: false,
                        isMatched: false,
                    },
                ],
            };
        },
        methods: {
            handleClick(card) {
                if (this.match1 === "") {
                    this.selection1 = card;
                    this.match1 = card.match;
                    this.cardID1 = card.id;
                } else if (
                    card.id !== this.cardID1 &&
                    card.isMatched == false
                ) {
                    this.selection2 = card;
                    this.match2 = card.match;
                    this.cardID2 = card.id;
                    this.valid = false; // Prevent from clicking more than 2 cards
                }

                // if (this.cardID1 !== this.cardID2 && this.match1 === this.match2) {
                if (this.match1 === this.match2) {
                    this.match1 = "";
                    this.match2 = "";
                    this.selection1.isMatched = true;
                    this.selection2.isMatched = true;
                    this.selection1 = null;
                    this.selection2 = null;
                    this.valid = !this.valid;
                    this.matchCounter++;
                } else if (this.match2 && this.match1 !== this.match2) {
                    setTimeout(() => {
                        this.match1 = "";
                        this.match2 = "";
                        this.selection1.cardActive = false;
                        this.selection2.cardActive = false;
                        this.valid = !this.valid;
                    }, 1500);
                }
                if (this.matchCounter === this.cards.length / 2) {
                    this.isModalActive = true;
                }
            },
        },
    };
</script>

<style scoped>
    .match-container {
        width: 800px;
        height: 100%;
        margin: 0 auto;
        display: flex;
        gap: 2rem;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .single-car {
        height: 200px;
        width: 150px;
        background: chocolate;
    }
    .modal-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.2);
        opacity: 0;
        transition: all 0.5s linear;
        transform: scale(0);
        z-index: -1;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
    }
    .modal-container h2 {
        font-size: 42px;
        text-transform: uppercase;
    }
    .isModalActive {
        opacity: 1;
        transform: scale(1);
        z-index: 1;
    }
</style>
```

:::

::: tip Child Component

::: details Click me to view the code

```html
<template>
    <div>
        <div class="section-center">
            <!-- single article -->
            <div
                @click="valid && handleClick(cardDetails)"
                class="card"
                :id="cardDetails.match"
            >
                <!-- card front -->
                <div
                    :class="{ 'move-front': cardDetails.cardActive }"
                    class="card-side card-front"
                >
                    <!-- <img :src="cardDetails.imgFront" alt="" /> -->
                </div>
                <!-- card back -->
                <div
                    :class="{ 'move-back': cardDetails.cardActive }"
                    class="card-side card-back"
                >
                    <img :src="cardDetails.imgBack" alt="" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            cardDetails: Object,
            valid: Boolean,
        },
        mounted() {},
        data() {
            return {};
        },
        methods: {
            handleClick(cardDetails) {
                cardDetails.cardActive = true;
                this.$emit("cardClick", cardDetails);
            },
        },
    };
</script>

<style scoped>
    .section-center {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
    .card {
        perspective: 1500px;
        position: relative;
        width: 150px;
        height: 250px;
        border: none;
    }
    .card img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .card-side {
        transition: all 1s linear;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        visibility: visible;
        backface-visibility: hidden;
    }

    .card-back {
        transform: rotateY(180deg);
        display: grid;
        place-items: center;
    }
    .move-front {
        transform: rotateY(-180deg);
    }
    .move-back {
        transform: rotateY(0);
    }

    .card-front {
        background: darkcyan;
    }
</style>
```

:::
