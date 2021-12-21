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
        .to('.text-top', { rotateY: 360, translateY: '-200px', scale: 4 }, '<')

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
