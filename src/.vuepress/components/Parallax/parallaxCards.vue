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
