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

      tl.fromTo('.Direction4', { x: 0, opacity: 1 }, { x: '-100%', opacity: 1 })
        .fromTo('.Direction3', { y: 0, opacity: 1 }, { y: '-100%', opacity: 1 })
        .fromTo('.Direction2', { x: 0, opacity: 1 }, { x: '100%', opacity: 1 });
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
