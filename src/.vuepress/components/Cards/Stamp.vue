<template>
  <div>
    <div class="stamp-container">
      <div class="background">
        <div class="cards-container">
          <div v-for="card in stampData" :key="card.id" class="card-container">
            <div
              class="card"
              @click="stamp(card)"
              :class="{ IsShaking: card.IsShaking }"
            >
              <div class="card-top"></div>
              <div class="stamp" :class="{ isStampActive: card.isStampActive }">
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
          stampImg: require('../../public/logo.png'),
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
        this.$emit('stampEvent');
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
  content: '';
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
