---
tags: ["cards", "flip", "stamp", "css"]
sidebarDepth: 3
---

# Cards

::: tip ChatGTP Explanation

The explanation of the code was created using ChatGTP after sharing the code snippet.

**_Prompt :_** "I am writing a documentation site using vuepress, I will paste some codes and I want you to explain de code as I was a junior developer. The explanation needs to be clear but not too long and I need it in English and Korean."
:::

## Cards flip

### Description

이것은 Vue 컴포넌트로, 앞면과 뒷면이 있는 카드 목록을 표시합니다. 각 카드에는 앞면과 뒷면에 이미지가 있으며 클릭하여 뒤집을 수 있습니다. 카드는 컴포넌트의 데이터에 배열로 저장되며 각 카드의 상태(뒤집혔는지 여부)도 배열에 저장됩니다. 컴포넌트는 CSS를 사용하여 카드를 클릭할 때 플립 애니메이션을 생성합니다.

::: tip English
::: details Expand

This is a Vue component that displays a list of cards with a front and back side. Each card has an image on its front and back, and can be flipped over by clicking on it. The cards are stored in an array in the component's data, and the state of each card (whether it's flipped or not) is also stored in the array. The component uses CSS to create the flip animation when a card is clicked.
:::

### Example

<Cards-CardFlip/>

### Snippets

::: tip Code example

::: details Click me to view the code

```html
<template>
    <div>
        <div class="section-center">
            <!-- single article -->
            <div
                v-for="card in cards"
                :key="card.id"
                @click="handleClick(card)"
                class="card"
            >
                <!-- card front -->
                <div
                    :class="{ 'move-front': card.cardActive }"
                    class="card-side card-front"
                >
                    <img :src="card.imgFront" alt="" />
                </div>
                <!-- card back -->
                <div
                    :class="{ 'move-back': card.cardActive }"
                    class="card-side card-back"
                >
                    <img :src="card.imgBack" alt="" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                cards: [
                    {
                        id: 1,
                        imgFront: require("../../public/logo.png"),
                        imgBack: require("../../public/logo_green.jpeg"),
                        cardActive: false,
                    },
                    // {
                    //   id: 2,
                    // imgFront: require('../../public/logo.png'),
                    // imgBack: require('../../public/logo_green.jpeg'),
                    //   cardActive: false,
                    // },
                ],
            };
        },
        methods: {
            handleClick(card) {
                card.cardActive = !card.cardActive;
            },
        },
    };
</script>

<style scoped>
    .section-center {
        display: flex;
        justify-content: center;
        flex-direction: column;
        gap: 6rem;
        align-items: center;
    }
    .card {
        perspective: 1500px;
        position: relative;
        width: 550px;
        height: 300px;
        max-height: 300px;
    }
    img {
        width: 100%;
        height: 300px;
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
        max-height: 300px;
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
</style>
```

:::

## Card Stamp

### Description

이것은 Vue.js 구성 요소로 도장 컬렉션을 렌더링합니다. 구성 요소에는 "stamp-container" 클래스를 가진 div가 있으며, 이 div는 여러 개의 div 요소를 포함합니다. "background" div 요소는 "cards-container" div 요소를 포함하고, "cards-container" div 요소는 여러 개의 "card-container" div 요소를 포함합니다. 각 "card-container" div 요소는 클릭 시 도장 이미지를 표시하는 "card" div 요소를 포함합니다.

컴포넌트의 데이터에있는 "stampData" 배열에는 각 도장의 속성을 정의하는 객체가 포함되어 있습니다. 이 속성은 도장 ID, 활성 여부 및 흔들림 여부 등을 정의합니다. "isSelected" 변수는 선택된 도장 수를 추적합니다.

사용자가 도장을 클릭하면 "stamp" 메소드가 호출됩니다. 이 메소드는 도장의 "isStampActive" 및 "IsShaking" 속성을 토글하고 도장 상태에 따라 "isSelected" 변수를 증가 또는 감소시킵니다. "handleClick" 메소드는 모든 도장이 선택되었는지 확인하고 선택되었으면 "stampEvent" 이벤트를 발생시킵니다.

컴포넌트에는 도장 컬렉션의 레이아웃과 모양을 정의하는 몇 가지 CSS 스타일도 있습니다.

::: tip English
::: details Expand

This is a Vue.js component that renders a stamp collection. The component has a div with a class of "stamp-container" that contains several div elements. The "background" div element contains a "cards-container" div element, which in turn contains several "card-container" div elements. Each "card-container" div element contains a "card" div element that displays a stamp image when clicked.

The "stampData" array in the component's data contains objects that define each stamp's properties, such as the stamp ID, whether it is active, and whether it is shaking. The "isSelected" variable in the component's data keeps track of the number of stamps that have been selected.

When a user clicks a stamp, the "stamp" method is called, which toggles the stamp's "isStampActive" and "IsShaking" properties and increments or decrements the "isSelected" variable based on the stamp's state. The "handleClick" method checks whether all stamps have been selected and emits a "stampEvent" event if they have.

The component also has some CSS styles that define the layout and appearance of the stamp collection.
:::

### Example

<Cards-Stamp/>

### Snippets

::: tip Code example

::: details Click me to view the code

```html
<template>
    <div>
        <div class="stamp-container">
            <div class="background">
                <div class="cards-container">
                    <div
                        v-for="card in stampData"
                        :key="card.id"
                        class="card-container"
                    >
                        <div
                            class="card"
                            @click="stamp(card)"
                            :class="{ IsShaking: card.IsShaking }"
                        >
                            <div class="card-top"></div>
                            <div
                                class="stamp"
                                :class="{ isStampActive: card.isStampActive }"
                            >
                                <img :src="card.stampImg" alt="" />
                            </div>
                        </div>
                    </div>
                    <!-- <div class="card-right-container"></div> -->
                </div>
                <button class="btn" @click="handleClick">Text</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        // props: { stampData: Array },
        mounted() {},
        data() {
            return {
                isSelected: 0,
                stampData: [
                    {
                        id: 1,
                        isStampActive: false,
                        IsShaking: true,
                        stampImg: require("../../public/logo.png"),
                    },
                    // { id: 2, isStampActive: false, IsShaking: true,stampImg: require('../../public/logo.png'), },
                ],
            };
        },
        methods: {
            stamp(card) {
                card.isStampActive = !card.isStampActive;
                card.IsShaking = !card.IsShaking;
                if (!card.IsShaking) {
                    this.isSelected++;
                } else {
                    this.isSelected--;
                }
            },
            handleClick() {
                if (this.isSelected === this.stampData.length) {
                    this.$emit("stampEvent");
                }
            },
        },
    };
</script>

<style scoped>
    /* full container */
    .stamp-container {
        width: 100%;
        height: 500px;
        margin: 0 auto;
        position: relative;
        overflow: hidden;
    }

    .background {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: cornsilk;
        z-index: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding-top: 46px;
    }
    .cards-container {
        width: 100%;
        height: 562px;
        display: flex;
        gap: 40px;
        align-items: center;
        justify-content: center;
        margin: 0 50px;
    }
    .card-container {
        background-color: white;
    }
    .card-right-container {
        background-color: white;
    }
    .card-right-container,
    .card-container {
        max-width: 570px;
        height: 100%;
        display: grid;
        place-content: center;
    }
    .card {
        width: 480px;
        height: 385px;
        display: flex;
        justify-content: center;
        position: relative;
        border: 2px solid;
    }
    .card-top {
        margin-top: 16px;
        width: 447.39px;
        height: 263.67px;
        border: 2px solid;
    }

    .stamp {
        width: 230px;
        height: 256px;
        content: "";
        opacity: 0;
        position: absolute;
        bottom: 0;
        right: 0;
        transform: scale(3);
        transition: all 0.3s cubic-bezier(0.6, 0.04, 0.98, 0.335);
        /* z-index: -2; */
        /* display: none; */
    }

    .isStampActive {
        opacity: 1;
        transform: translateX(0) scale(1);
        z-index: 1;
    }
    .stamp img {
        width: 100%;
        height: 100%;
    }
    .IsShaking {
        animation: shakeSkake 250ms linear infinite;
    }

    .btn {
        width: 136px;
        height: 57px;
        z-index: 1;
        border: 2px solid;
        border-radius: 100px;
        margin-top: 35px;
    }

    /* animations */
    @keyframes shakeSkake {
        0% {
            transform: rotate(1deg) translate(3px, 0px);
        }
        50% {
            transform: rotate(-1deg) translate(-3px, 0px);
        }
        100% {
            transform: translate(0, 0) rotate(0px);
        }
    }
</style>
```

:::
