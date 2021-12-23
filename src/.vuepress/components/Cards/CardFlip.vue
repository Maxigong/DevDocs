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
          imgFront: require('../../public/logo.png'),
          imgBack: require('../../public/logo_green.jpeg'),
          cardActive: false,
        },
        // {
        //   id: 2,
        //   imgFront:
        //     'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png',
        //   imgBack:
        //     'https://med.stanford.edu/news/all-news/2021/09/cat-fur-color-patterns/_jcr_content/main/image.img.780.high.jpg/cat_by-Kateryna-T-Unsplash.jpg',
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
