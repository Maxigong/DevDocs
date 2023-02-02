<template>
  <div class="slider-container">
    <span ref="left" class="arrow left"></span>
    <span ref="right" class="arrow right"></span>
    <div
      ref="singleSlide"
      class="slide"
      v-for="slider in sliders"
      :key="slider.id"
    >
      <img :src="slider.img" alt="" />
    </div>
    <!-- <div
      ref="singleSlide"
      class="slide"
      v-for="slider in componentsSections"
      :key="slider.id"
    >
      <component v-bind:is="slider.name"></component>
    </div> -->
  </div>
</template>

<script>
// import BottomInput from '@/components/input/BottomInput';
// import CartoonInputA from '@/components/input/CartoonInputA';

export default {
  // components: { BottomInput, CartoonInputA },
  mounted() {
    this.slidersFunc();
  },
  data() {
    return {
      // componentsSections: [
      //   { id: 1, name: BottomInput },
      //   { id: 2, name: CartoonInputA },
      //   { id: 3, name: BottomInput },
      // ],
      sliders: [
        { id: 1, img: require('../public/logo_green.jpeg') },
        { id: 2, img: require('../public/logo_green.jpeg') },
        { id: 3, img: require('../public/logo_green.jpeg') },
        { id: 4, img: require('../public/logo_green.jpeg') },
      ],
    };
  },
  methods: {
    slidersFunc() {
      // variables
      const slidesGroup = this.$refs.singleSlide; // get all sliders
      const arrowLeft = this.$refs.left;
      const arrowRight = this.$refs.right;

      slidesGroup.forEach(function (slide, index) {
        slide.style.left = `${index * 100}%`;
        console.log(slide, index);
      });
      let counter = 0;

      arrowLeft.style.display = 'none'; // hide arrowLeft in the beginning

      function carousel() {
        if (counter < slidesGroup.length - 1) {
          arrowRight.style.display = 'block';
        } else {
          arrowRight.style.display = 'none';
        }
        if (counter > 0) {
          arrowLeft.style.display = 'block';
        } else {
          arrowLeft.style.display = 'none';
        }
        slidesGroup.forEach(function (slide) {
          slide.style.transform = `translateX(-${counter * 100}%)`;
        });
      }
      arrowRight.addEventListener('click', function () {
        counter++;
        carousel();
      });

      arrowLeft.addEventListener('click', function () {
        counter--;
        carousel();
      });
    },
  },
};
</script>

<style scoped>
.slider-container {
  position: relative;
  width: 100%;
  max-width: 1280px;
  height: 400px;
  margin: 0 auto;
  overflow: hidden;
}
.slide {
  border: 4px solid;
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--clr-primary-9);
  color: var(--clr-white);
  display: grid;
  place-items: center;
  transition: all 0.25s ease-in-out;
  text-align: center;
}
img {
  object-fit: cover;
  object-position: center;
}
span {
  font-size: 32px;
  display: block;
  position: absolute;
  z-index: 1;
}
.arrow {
  border: solid black;
  border-width: 0 15px 15px 0;
  display: inline-block;
  padding: 30px;
}

.right {
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}

.left {
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
}
</style>
