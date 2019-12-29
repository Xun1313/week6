<template>
  <div class="container">
    <div class="swiper-container1">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="banner">
            <div class="banner-pic pic1"></div>
            <div class="banner-word">
              <span>Choose Your Room</span>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="banner">
            <div class="banner-pic pic2"></div>
            <div class="banner-word">
              <span>This Is Your Vacation</span>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
      <a href="#" class="start" @click="scrollBanner($event)"></a>
      <!-- <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div> -->
    </div>
  </div>
</template>

<script>
import 'swiper/css/swiper.min.css';
import Swiper from 'swiper';
export default {
  methods: {
    scrollBanner(e){
      e.preventDefault();
      window.scrollTo({
        top:document.querySelector('.recommend').offsetTop,
        behavior:'smooth'
      })
    }
  },
  mounted() {
    this.$bus.$emit('isLoading', true);
    var swiper = new Swiper('.swiper-container1', {
      slidesPerView: 1,
      spaceBetween: 30,
      autoplay: true,
      loop: true,
      effect: 'fade',
      speed: 400,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      /* navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }, */
    });
    this.$bus.$emit('isLoading', false);
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/_grid.scss';
@import '../assets/_mixin.scss';
.container {
  overflow: hidden;
}
.banner {
  width: 100%;
  height: 0;
  padding-bottom: 60%;
  @include lapTopHigh {
    padding-bottom: 50%;
  }
  position: relative;
  &-pic {
    position: absolute;
    width: 100%;
    height: 100%;
    @extend %bg;
    background-position: bottom;
  }
  .pic1 {
    background-image: url('../assets/home.jpg');
  }
  .pic2 {
    background-image: url('../assets/home2.jpg');
  }
  &-word {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    height: 100px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    @include lapTop {
      font-size: 30px;
    }
  }
}
.start {
  text-decoration: none;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  width: 30px;
  bottom: 40px;
  color: white;
  z-index: 50;
  font-size: 16px;
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid white;
  padding: 5px;
  text-align: center;
  display: none;
  @include lapTop {
    font-size: 20px;
    display: block;
  }
  &:after {
    content: '>>';
    color: white;
    display: block;
    animation-name: arrow;
    animation-duration:1.5s;
    animation-iteration-count:infinite
  }
}
@keyframes arrow {
  0% {
    transform: translateY(-5px) rotate(90deg);
  }
  100% {
    transform: translateY(5px) rotate(90deg);
  }
}
html,
body {
  position: relative;
  height: 100%;
}
body {
  background: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}
.swiper-container1 {
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  position: relative;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
</style>
