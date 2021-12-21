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
      this.$emit('cardClick', cardDetails);
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
