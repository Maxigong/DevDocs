<template>
  <div class="match-container">
    <Card
      @cardClick="handleClick"
      v-for="card in cards"
      :key="card.id"
      :cardDetails="card"
      :valid="valid"
    />

    <!-- MODAL -->
    <div :class="{ isModalActive: isModalActive }" class="modal-container">
      <h2>You won!!!</h2>
      <!-- END OF MODAL -->
    </div>
  </div>
</template>

<script>
import Card from '../Games/Card.vue';
export default {
  components: { Card },
  data() {
    return {
      matchCounter: 0, // Check amount of matches
      isModalActive: false,
      valid: true, // Activate click event, Prevent clicking more than 2 cards
      selection1: null,
      selection2: null,
      match1: '',
      match2: '',
      cardID1: null,
      cardID2: null,
      myMatch: null,
      cards: [
        {
          id: 1,
          match: 'A',
          imgFront: '',
          imgBack: require('../../public/logo_green.jpeg'),
          // imgFront: require('../../public/logo_green.jpeg'),
          cardActive: false,
          isMatched: false,
        },
        {
          id: 2,
          match: 'B',
          imgBack: require('../../public/logo.png'),
          // imgFront: require('../../public/logo_green.jpeg'),
          imgFront: '',
          cardActive: false,
          isMatched: false,
        },
        {
          id: 3,
          match: 'A',
          imgBack: require('../../public/logo_green.jpeg'),
          // imgFront: require('../../public/logo.png'),
          imgFront: '',
          cardActive: false,
          isMatched: false,
        },
        {
          id: 4,
          match: 'B',
          imgBack: require('../../public/logo.png'),
          // imgFront: require('../../public/logo.png'),
          imgFront: '',
          cardActive: false,
          isMatched: false,
        },
      ],
    };
  },
  methods: {
    handleClick(card) {
      if (this.match1 === '') {
        this.selection1 = card;
        this.match1 = card.match;
        this.cardID1 = card.id;
      } else if (card.id !== this.cardID1 && card.isMatched == false) {
        this.selection2 = card;
        this.match2 = card.match;
        this.cardID2 = card.id;
        this.valid = false; // Prevent from clicking more than 2 cards
      }

      // if (this.cardID1 !== this.cardID2 && this.match1 === this.match2) {
      if (this.match1 === this.match2) {
        this.match1 = '';
        this.match2 = '';
        this.selection1.isMatched = true;
        this.selection2.isMatched = true;
        this.selection1 = null;
        this.selection2 = null;
        this.valid = !this.valid;
        this.matchCounter++;
      } else if (this.match2 && this.match1 !== this.match2) {
        setTimeout(() => {
          this.match1 = '';
          this.match2 = '';
          this.selection1.cardActive = false;
          this.selection2.cardActive = false;
          this.valid = !this.valid;
        }, 1500);
      }
      if (this.matchCounter === this.cards.length / 2) {
        this.isModalActive = true;
        // var count = 100;
        // var defaults = {
        //   origin: { y: 0.5 },
        // };

        // function fire(particleRatio, opts) {
        //   confetti(
        //     Object.assign({}, defaults, opts, {
        //       particleCount: Math.floor(count * particleRatio),
        //     })
        //   );
        // }

        // fire(0.25, {
        //   spread: 26,
        //   startVelocity: 55,
        // });
        // fire(0.2, {
        //   spread: 60,
        // });
        // fire(0.35, {
        //   spread: 100,
        //   decay: 0.91,
        //   scalar: 0.8,
        // });
        // fire(0.1, {
        //   spread: 120,
        //   startVelocity: 25,
        //   decay: 0.92,
        //   scalar: 1.2,
        // });
        // fire(0.1, {
        //   spread: 120,
        //   startVelocity: 45,
        // });
      }
    },
  },
};
</script>

<style scoped>
.match-container {
  width: 800px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  gap: 2rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.single-car {
  height: 200px;
  width: 150px;
  background: chocolate;
}
.modal-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  opacity: 0;
  transition: all 0.5s linear;
  transform: scale(0);
  z-index: -1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}
.modal-container h2 {
  font-size: 42px;
  text-transform: uppercase;
}
.isModalActive {
  opacity: 1;
  transform: scale(1);
  z-index: 1;
}
</style>
