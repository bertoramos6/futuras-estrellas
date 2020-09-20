<template>
  <div>
    <transition-group name="fade" tag="div">
      <div v-for="i in [currentIndex]" :key="i">
        <img :src="currentImg"/>
        <p class="textoSlides" v-show="ver1">CONECTA CON TU FUTURO</p>
        <p class="textoSlides" v-show="ver2">ENCUENTRA A TUS FUTURAS ESTRELLAS</p>
        <p class="textoSlides" v-show="ver3">AÑADE EXPERIENCIAS PASADAS</p>
        <p class="textoSlides" v-show="ver4">SUBE Y VE HIGHLIGHTS</p>
      </div>
    </transition-group>
    <a class="prev" @click="prev" href="#">&#10094; Previous</a>
    <a class="next" @click="next" href="#">&#10095; Next</a>
  </div>
</template>

<script>
export default {
  name: "Slider",
  data() {
    return {
      images: [
        "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        "https://images.unsplash.com/photo-1585757318177-0570a997dc3a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        "https://images.unsplash.com/photo-1570937942681-1c3be4164f05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
      ],
      ver1: true,
      ver2: false,
      ver3: false,
      ver4: false,
      timer: null,
      currentIndex: 0
    };
  },

  mounted: function() {
    this.startSlide();
  },

  methods: {
    startSlide: function() {
      this.timer = setInterval(this.next, 10000);
    },

    next: function() {
      this.currentIndex += 1;
      if ((Math.abs(this.currentIndex) % this.images.length) === 0) {
          this.ver1 = true;
          this.ver2 = false;
          this.ver3 = false;
          this.ver4= false;
      } else if((Math.abs(this.currentIndex) % this.images.length) === 1) {
          this.ver1 = false;
          this.ver2 = true;
          this.ver3 = false;
          this.ver4= false;
      } else if((Math.abs(this.currentIndex) % this.images.length) === 2) {
          this.ver1 = false;
          this.ver2 = false;
          this.ver3 = true;
          this.ver4= false;
      } else {
          this.ver1 = false;
          this.ver2 = false;
          this.ver3 = false;
          this.ver4= true;
      }
    },
    prev: function() {
      this.currentIndex -= 1;
      if ((Math.abs(this.currentIndex) % this.images.length) === 0) {
          this.ver1 = true;
          this.ver2 = false;
          this.ver3 = false;
          this.ver4= false;
      } else if((Math.abs(this.currentIndex) % this.images.length) === 1) {
          this.ver1 = false;
          this.ver2 = true;
          this.ver3 = false;
          this.ver4= false;
      } else if((Math.abs(this.currentIndex) % this.images.length) === 2) {
          this.ver1 = false;
          this.ver2 = false;
          this.ver3 = true;
          this.ver4= false;
      } else {
          this.ver1 = false;
          this.ver2 = false;
          this.ver3 = false;
          this.ver4= true;
      }
    }
  },

  computed: {
    currentImg: function() {
      return this.images[Math.abs(this.currentIndex) % this.images.length];
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all .7s ease;
  overflow: hidden;
  visibility: visible;
  width:100%;
  opacity: 1;
}

.fade-enter,
.fade-leave-to {
  visibility: hidden;
  position: absolute;
  width:100%;
  opacity: 0;
}

img {
  height: 500px;
  width:100%;
  object-fit: cover;
}

.prev, .next {
  cursor: pointer;
  position: absolute;
  z-index: 1;
  top: 400px;
  padding: 16px;
  color: whitesmoke;
  font-weight: bold;
  font-size: 18px;
  transition: 0.7s ease;
  border-radius: 1rem;
  text-decoration: none;
  user-select: none;
}

.next {
  right: 0;
}

.prev {
  left: 0;
}
.textoSlides {
    position: absolute;
    top:15%;
    left: 5%;
    text-align: left;
    font-weight: 900;
    font-size: 300%;
    color: white;
    text-shadow: 1px 1px 10px black;
}
.prev:hover, .next:hover {
  background-color: rgba(0,0,0,0.9);
}
@media screen and (max-width: 759px) {
img {
    height: 300px;
    width:100%;
    object-fit: cover;
}
.prev, .next {
  cursor: pointer;
  position: absolute;
  z-index: 1;
  top: 300px;
  padding: 16px;
  color: whitesmoke;
  font-weight: bold;
  font-size: 15px;
  transition: 0.7s ease;
  border-radius: 1rem;
  text-decoration: none;
  user-select: none;
}
.textoSlides {
    position: absolute;
    top:5%;
    left: 5%;
    text-align: left;
    font-weight: 900;
    font-size: 200%;
    color: white;
    text-shadow: 1px 1px 10px black;
}
}
</style>