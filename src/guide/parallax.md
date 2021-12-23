---
tags: ['parallax', 'npm', 'gsap']
---

# Parrallax

::: danger
All this components uses gsap
:::

::: warning CODE
Find all codes examples at the end
:::

## Card Effect 1

<Parallax-parallaxCards/>

### Code

## Text Animation

<Parallax-textAnimation/>

## Parallax Card Down

<Parallax-ParallaxCardDown/>

## Parallax Different Directions

<Parallax-ParallaxDifferentDirections/>

## Parallax Scroll Top

<Parallax-ParallaxScrollTop/>

## Code examples

### Parallax Cards

::: tip vue.js code example parallaxCards

::: details Click me to view the code

```html
<template>
  <div class="summary-parallax-container">
    <div class="card-container-2">
      <div
        v-for="(card, index) in cards"
        :key="card.id"
        class="summary-parallax-card"
        :class="card.name"
        :style="{ background: card.color, marginLeft: index * 10 + 'px' }"
      >
        <h2>{{ card.text }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);
  export default {
    data() {
      return {
        cards: [
          {
            id: 1,
            // name: 'card1',
            text: ' 나를 어떻게 표현하고 싶은지에 따라 나의 정체성을 만들 수 있습니다. 온라인에서의 나의 선택에 따라 내 온라인 정체성이 결정됩니다.',
            color: '#29BCC3',
          },
          {
            id: 2,
            name: 'card2',
            text: ' 나를 어떻게 표현하고 싶은지에 따라 나의 정체성을 만들 수 있습니다. 온라인에서의 나의 선택에 따라 내 온라인 정체성이 결정됩니다.',
            color: '#203B3F',
          },
          {
            id: 3,
            name: 'card3',
            text: ' 나를 어떻게 표현하고 싶은지에 따라 나의 정체성을 만들 수 있습니다. 온라인에서의 나의 선택에 따라 내 온라인 정체성이 결정됩니다.',
            color: '#203B3F',
          },
          {
            id: 4,
            name: 'card4',
            text: ' 나를 어떻게 표현하고 싶은지에 따라 나의 정체성을 만들 수 있습니다. 온라인에서의 나의 선택에 따라 내 온라인 정체성이 결정됩니다.',
            color: '#203B3F',
          },
          // {
          //   id: 5,
          //   name: 'card5',
          //   text: ' 나를 어떻게 표현하고 싶은지에 따라 나의 정체성을 만들 수 있습니다. 온라인에서의 나의 선택에 따라 내 온라인 정체성이 결정됩니다.',
          //   color: '#203B3F',
          // },
          // {
          //   id: 6,
          //   name: 'card6',
          //   text: ' 나를 어떻게 표현하고 싶은지에 따라 나의 정체성을 만들 수 있습니다. 온라인에서의 나의 선택에 따라 내 온라인 정체성이 결정됩니다.',
          //   color: '#203B3F',
          // },
        ],
      };
    },
    mounted() {
      this.animations();
    },
    methods: {
      animations() {
        const singleCard = [];
        this.cards.map((card) => {
          if (card.name) {
            singleCard.push(card.name);
          }
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.summary-parallax-container',
            start: 'top top',
            toggleActions: 'play none reverse pause',
            scrub: true,
            pinSpacing: true,
            pin: '.summary-parallax-container',
            end: () =>
              '+=' +
              document.querySelector('.summary-parallax-card').offsetWidth * 2,
          },
        });

        const reverseCardsArray = singleCard.reverse();
        for (let i = 0; i < reverseCardsArray.length; i++) {
          tl.to(`.${reverseCardsArray[i]}`, {
            xPercent: 100 * 2,
            opacity: 1,
          });
        }
      },
    },
  };
</script>

<style scoped>
  .summary-parallax-container {
    height: 600px;
    width: 100%;
    margin: 0 auto;
    background-color: cornsilk;
    font-weight: 700;
    overflow: hidden;
  }
  .left,
  .card-container-2 {
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }

  .card-container-2 {
    display: flex;
    flex-wrap: wrap;
  }
  .card-container-2 h2 {
    font-size: 20px;
    color: #ffffff;
    margin-bottom: 66px;
    /* width: 719px; */
    margin-right: auto;
    margin-left: auto;
    display: inline-block;
  }
  .card-content {
    height: 100%;
    width: 100%;
  }

  .summary-parallax-card {
    width: 500px;
    height: 300px;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    margin: 0 auto;
    padding: 3rem;
    display: grid;
    justify-content: center;
    align-items: end;
    line-height: 4rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
```

:::

### Text Animation

::: tip vue.js code example textAnimation

::: details Click me to view the code

```html
<template>
  <div class="animation-container-2">
    <div class="text-top">
      <h3>챌린지를</h3>
    </div>
    <div class="text-center">
      <h2>시작해볼까요?</h2>
    </div>
    <div class="cicle-container">
      <div class="circle"></div>
    </div>
  </div>
</template>

<script>
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);
  export default {
    mounted() {
      this.animations();
    },
    methods: {
      animations() {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.animation-container-2',
            start: 'top top',
            toggleActions: 'play none reverse pause',
            scrub: 1,
            pinSpacing: true,
            pin: '.animation-container-2',
          },
        });
        const circle = gsap.timeline({
          scrollTrigger: {
            trigger: '.animation-container-2',
            start: 'top top',
            toggleActions: 'play none reverse pause',
            scrub: 1,
            pinSpacing: true,
            pin: '.animation-container-2',
          },
          background: 'red',
        });
        circle.to('.circle', {
          opacity: 1,
          width: '700px',
          height: '700px',
        });

        tl
          // .to('.animation-container-2', { background: 'orange' })
          .to('.text-top', { opacity: 0, scale: 3 })
          .to('.text-top', { opacity: 1, scale: 8 })
          // .to('.animation-container-2', { background: 'yellow' })
          .to(
            '.text-top',
            { rotateY: 360, translateY: '-200px', scale: 4 },
            '<'
          )

          .to('.text-center', { opacity: 1 })
          // .to('.animation-container-2', { background: 'blue' })
          .to('.text-center', { rotateZ: 360, scale: 3 }, '<');
        // .to('.animation-container-2', {
        //   background: 'red',
        // });
      },
    },
  };
</script>

<style scoped>
  h2,
  h3 {
    color: #29bcc3;
  }
  .animation-container-2 {
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
  }
  .text-top,
  .text-center {
    opacity: 0;
  }
  .text-center h2 {
    font-size: 32px;
  }
  .text-top h3 {
    font-size: 22px;
  }

  .circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #203b3f;
    width: 0px;
    height: 0px;
    border-radius: 50%;
    z-index: -1;
    opacity: 0;
    padding: 0px;
    width: 100px;
    height: 100px;
    line-height: 50px;
  }
</style>
```

:::

### Parallax CardDown

::: tip vue.js code example ParallaxCardDown

::: details Click me to view the code ParallaxCardDown

```html
<template>
  <div class="container">
    <div class="right">
      <div v-for="(card, index) in cards" :key="card.id">
        <div class="section">
          <div
            class="card"
            :class="card.name"
            :style="{ background: card.color, marginTop: index * 20 + 'px' }"
          >
            <h2>{{ card.text }}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);
  export default {
    data() {
      return {
        cards: [
          {
            id: 1,
            text: ' 나를 어떻게 표현하고 싶은지에 따라 나의 정체성을 만들 수 있습니다. 온라인에서의 나의 선택에 따라 내 온라인 정체성이 결정됩니다.',
            color: '#BDE4A7',
            name: '',
          },
          {
            id: 2,
            text: ' 나를 어떻게 표현하고 싶은지에 따라 나의 정체성을 만들 수 있습니다. 온라인에서의 나의 선택에 따라 내 온라인 정체성이 결정됩니다.',
            color: '#DBCBD8',
            name: 'card12',
          },
          {
            id: 3,
            text: ' 나를 어떻게 표현하고 싶은지에 따라 나의 정체성을 만들 수 있습니다. 온라인에서의 나의 선택에 따라 내 온라인 정체성이 결정됩니다.',
            color: '#9FBBCC',
            name: 'card13',
          },
          {
            id: 4,
            text: ' 나를 어떻게 표현하고 싶은지에 따라 나의 정체성을 만들 수 있습니다. 온라인에서의 나의 선택에 따라 내 온라인 정체성이 결정됩니다.',
            color: '#FF2C55',
            name: 'card14',
          },
          // {
          //   id: 5,
          //   name: 'card5',
          //   text: ' 나를 어떻게 표현하고 싶은지에 따라 나의 정체성을 만들 수 있습니다. 온라인에서의 나의 선택에 따라 내 온라인 정체성이 결정됩니다.',
          //   color: '#203B3F',
          // },
          // {
          //   id: 6,
          //   name: 'card6',
          //   text: ' 나를 어떻게 표현하고 싶은지에 따라 나의 정체성을 만들 수 있습니다. 온라인에서의 나의 선택에 따라 내 온라인 정체성이 결정됩니다.',
          //   color: '#203B3F',
          // },
        ],
      };
    },
    mounted() {
      this.animations();
    },
    methods: {
      animations() {
        const singleCard = [];
        this.cards.map((card) => {
          if (card.name) {
            singleCard.push(card.name);
          }
        });

        const tl = gsap.timeline({
          ease: 'none',
          scrollTrigger: {
            trigger: '.container',
            start: 'top top',
            toggleActions: 'play none reverse pause',
            scrub: true,
            pinSpacing: true,
            pin: '.container',

            end: () => '+=' + document.querySelector('.card').offsetHeight * 10,
          },
        });

        const reverseCardsArray = singleCard.reverse();
        for (let i = 0; i < reverseCardsArray.length; i++) {
          tl.to(`.${reverseCardsArray[i]}`, {
            yPercent: 100,
          }).to(`.${reverseCardsArray[i]}`, {
            opacity: 0,
          });
        }
      },
    },
  };
</script>

<style scoped>
  .container {
    height: 100vh;
    width: 100%;
    margin: 0 auto;
    background-color: cornsilk;
    font-weight: 700;
    position: relative;
  }
  .left,
  .right {
    background-color: cornsilk;
    height: 100%;
    width: 100%;
    position: relative;
  }
  .left {
    background-color: green;
    display: grid;
    place-content: center;
    font-size: 22px;
    padding: 2rem;
  }
  .right {
    display: flex;
    flex-wrap: wrap;
  }
  .right h2 {
    font-size: 20px;
  }
  .card-content {
    height: 100%;
    width: 100%;
  }
  .section {
    max-width: 300px;
    margin: 0 auto;
  }
  .card {
    height: 500px;
    width: 300px;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    margin: 0 auto;
    padding: 3rem;
    display: grid;
    place-content: center;
    line-height: 4rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
  .section {
    width: 1000px;
  }
  /*  */
</style>
```

:::

### Parallax Different Directions

::: tip vue.js code example ParallaxDifferentDirections

::: details Click me to view the code

```html
<template>
  <div>
    <div class="new-container-3">
      <div class="card-container">
        <div
          v-for="card in cards"
          :key="card.id"
          class="single-card"
          :class="card.name"
          :style="{ background: card.color }"
        >
          <h2>{{ card.text }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);
  export default {
    data() {
      return {
        cards: [
          {
            id: 1,
            text: 'Text',
            color: 'lightgrey',
            name: 'Direction1',
          },
          { id: 2, text: 'Text', color: 'lightsalmon', name: 'Direction2' },
          { id: 3, text: 'Text', color: 'lightskyblue', name: 'Direction3' },
          {
            id: 4,
            text: 'Text',
            color: 'violet',
            name: 'Direction4',
          },
        ],
      };
    },
    mounted() {
      this.animations();
    },
    methods: {
      animations() {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.new-container-3',
            start: 'top top',
            toggleActions: 'play none reverse pause',
            scrub: 1,
            pinSpacing: true,
            pin: '.new-container-3',
            // end: '+=' + window.innerHeight * 3,
            end: '+=' + window.innerHeight * this.cards.length,
            // end: '+=3000',
          },
        });

        tl.fromTo(
          '.Direction4',
          { x: 0, opacity: 1 },
          { x: '-100%', opacity: 1 }
        )
          .fromTo(
            '.Direction3',
            { y: 0, opacity: 1 },
            { y: '-100%', opacity: 1 }
          )
          .fromTo(
            '.Direction2',
            { x: 0, opacity: 1 },
            { x: '100%', opacity: 1 }
          );
        // .fromTo('.Direction4', { y: 0, opacity: 1 }, { y: '-200%', opacity: 1 });
      },
    },
  };
</script>

<style scoped>
  .new-container-3 {
    height: 100vh;
    width: 100%;
    margin: 0 auto;
    background-color: cornsilk;
    font-weight: 700;
    overflow: hidden;
  }
  .left,
  .card-container {
    height: 100%;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }

  .card-container {
    display: flex;
    flex-wrap: wrap;
  }
  .card-container h2 {
    font-size: 20px;
  }
  .card-content {
    height: 100%;
    width: 100%;
  }

  .single-card {
    height: 100%;
    width: 100%;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    margin: 0 auto;
    padding: 3rem;
    display: grid;
    place-content: center;
    line-height: 4rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
```

:::

### Parallax Scroll Top

::: tip vue.js code example

::: details Click me to view the code

```html
<template>
  <div class="card-test-4">
    <div v-for="card in cards" :key="card.id">
      <div
        :class="card.name"
        class="single-card-4"
        :style="{ background: card.color }"
      >
        <h2>{{ card.text }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);
  export default {
    data() {
      return {
        cards: [
          {
            id: 1,
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, voluptas?',
            color: 'darkturquoise',
            name: 'cardScrollTop1',
          },
          {
            id: 2,
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, voluptas?',
            color: 'darkred',
            name: 'cardScrollTop2',
          },
          {
            id: 3,
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, voluptas?',
            color: 'darkorange',
            name: 'cardScrollTop3',
          },
          {
            id: 4,
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, voluptas?',
            color: 'darkolivegreen',
            name: 'cardScrollTop4',
          },
        ],
      };
    },
    mounted() {
      this.animations();
    },
    methods: {
      animations() {
        const sections = gsap.utils.toArray('.single-card-4');

        sections.forEach((panel, i) => {
          if (i < sections.length - 1) {
            ScrollTrigger.create({
              trigger: panel,
              start: 'top top',
              pin: true,
              pinSpacing: false,
              scrub: 1,
              end: () =>
                '+=' + document.querySelector('.card-test-4').offsetWidth,
              // onEnter: () => console.log('is Active'),
              // onLeave: () => console.log('not Active'),
            });
          } else {
            ScrollTrigger.create({
              trigger: panel,
              start: 'top top',
              pin: true,
              pinSpacing: true,
              scrub: 1,
              end: () =>
                '+=' + document.querySelector('.card-test-4').offsetWidth,
              // onEnter: () => console.log('is Active'),
              // onLeave: () => console.log('not Active'),
            });
          }
        });
      },
    },
  };
</script>

<style scoped>
  .card-test-4 {
    height: 100%;
    width: 100%;
    position: relative;
  }

  .single-card-4 {
    height: 100vh;
    width: 100%;
    display: grid;
    place-content: center;
    padding: 3rem;
    line-height: 4rem;
  }
</style>
```

:::
