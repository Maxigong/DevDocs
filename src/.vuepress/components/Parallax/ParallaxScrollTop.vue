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
