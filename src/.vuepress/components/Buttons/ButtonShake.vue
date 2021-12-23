<template>
  <button
    :class="{ isBtnActive: isBtnActive }"
    @click="vibrate"
    class="btn-test"
  >
    click here
  </button>
</template>

<script>
export default {
  data() {
    return {
      isBtnActive: false,
    };
  },
  methods: {
    vibrate() {
      this.isBtnActive = true;
      setTimeout(() => {
        this.isBtnActive = false;
      }, 500);
      window.navigator.vibrate([200, 100, 200]);
    },
  },
};
</script>

<style scoped>
.btn-test {
  height: 50.12px;
  width: 200.91px;
  background: #f95c63;
  border-radius: 51px;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 150%;
  text-align: center;
  text-transform: capitalize;
  color: #ffffff;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3 linear;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  border: none;
}
.btn-test:active {
  transform: translateY(3px);
  /* display: none; */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
.isBtnActive {
  color: #f95c63;
  background-color: white;
  border: 2px solid #f95c63;
  animation: shake 100ms 3 linear;
}

@keyframes shake {
  0% {
    transform: translate(3px, 0);
  }
  50% {
    transform: translate(-3px, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>
