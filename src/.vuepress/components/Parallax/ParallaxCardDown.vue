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
