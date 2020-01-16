<template>
  <header class="all">
    <section class="swiper-container1">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <article class="banner banner1">
            <h4 class="banner-word">
              Luxury & More
              <br />
              Meets Classic
            </h4>
          </article>
        </div>
        <div class="swiper-slide">
          <article class="banner banner2">
            <h4 class="banner-word">
              Enjoy A Luxury
              <br />
              Experience
            </h4>
          </article>
        </div>
      </div>
      <div class="swiper-pagination"></div>
      <!-- <a href="#" class="start" @click="scrollBanner($event)"></a> -->
      <!-- <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div> -->
    </section>
    <section class="container">
      <div class="banner-picker">
        <div class="picker">
          <div class="picker-group">
            <div class="picker-group-item">
              <h4 class="picker-group-item-title">入住時間</h4>
              <Datepicker
                v-model="first.date"
                :disabled-dates="first.disabledDates"
                @selected="firstHandler"
                :wrapper-class="'home-picker'"
                :input-class="'home-picker-input'"
                :format="'yyyy-MM-dd'"
                :language="zh"
              ></Datepicker>
            </div>
            <div class="picker-group-item">
              <h4 class="picker-group-item-title">退房時間</h4>
              <Datepicker
                v-model="end.date"
                :disabled-dates="end.disabledDates"
                :format="'yyyy-MM-dd'"
                :wrapper-class="'home-picker'"
                :input-class="'home-picker-input'"
                :language="zh"
              ></Datepicker>
            </div>
          </div>
          <div class="picker-group">
            <div class="picker-group-item">
              <h4 class="picker-group-item-title">大人</h4>
              <select v-model="adult">
                <option :value="item" v-for="item in 4" :key="item + '大人'">{{
                  item
                }}</option>
              </select>
            </div>
            <div class="picker-group-item">
              <h4 class="picker-group-item-title">小孩</h4>
              <select v-model="kid">
                <option
                  :value="item - 1"
                  v-for="item in 5"
                  :key="item - 1 + '小孩'"
                  >{{ item - 1 }}</option
                >
              </select>
            </div>
          </div>
          <a href="#" class="picker-book" @click="searchHandler()">search</a>
        </div>
      </div>
    </section>
  </header>
</template>

<script>
import moment from 'moment'
import 'swiper/css/swiper.min.css'
import Swiper from 'swiper'
import Datepicker from 'vuejs-datepicker'
import { zh } from 'vuejs-datepicker/dist/locale'
export default {
  data() {
    return {
      adult: 1,
      kid: 0,
      first: {
        date: new Date(),
        disabledDates: {
          to: ''
        }
      },
      end: {
        date: '',
        disabledDates: {
          to: new Date()
        }
      },
      zh,
      moment
    }
  },
  methods: {
    firstHandler(val) {
      const date = new Date(val)
      const date2 = new Date(val)
      date.setDate(val.getDate() + 1)
      this.end.disabledDates.to = date
      date2.setDate(val.getDate() + 1)
      this.end.date = date2
    },
    searchHandler() {
      const start = moment(this.first.date).format('YYYY-MM-DD')
      const end = moment(this.end.date).format('YYYY-MM-DD')
      this.$router.push(
        `/search?adult=${this.adult}&kid=${this.kid}&start=${start}&end=${end}`
      )
    }
  },
  mounted() {
    this.$bus.$emit('isLoading', true)
    const date = new Date()
    date.setDate(date.getDate() - 1)
    this.first.disabledDates.to = date
    const date2 = new Date()
    date2.setDate(date2.getDate() + 1)
    this.end.date = date2
    new Swiper('.swiper-container1', {
      slidesPerView: 1,
      spaceBetween: 30,
      autoplay: true,
      loop: true,
      effect: 'fade',
      speed: 400,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
      /* navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }, */
    })
    this.$bus.$emit('isLoading', false)
  },
  components: {
    Datepicker
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/_grid.scss';
@import '../assets/_mixin.scss';
@import '../assets/_variable.scss';
.all {
  position: relative;
}
.banner {
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @extend %bg;
  /* &-pic {
    position: absolute;
    width: 100%;
    height: 100%;
    background-position: bottom;
  } */
  &1 {
    background-image: url('../assets/home.jpg');
  }
  &2 {
    background-image: url('../assets/home2.jpg');
    background-position: bottom;
  }
  &-picker {
    /* display: none;
    @include lapTopHigh {
      display: block;
    } */
    margin: 20px 0;
    @include lapTopHigh {
      margin: 0;
      padding: 30px;
      display: block;
      position: absolute;
      top: 50%;
      right: 70px;
      z-index: 10;
      transform: translateY(-50%);
      background-color: rgba(0, 0, 0, 0.5);
    }
    .picker {
      outline: 1px solid rgba(0, 0, 0, 0.3);
      padding: 20px;
      @include lapTopHigh {
        padding: 0;
        outline: none;
      }
      &-group {
        @include lapTopHigh {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
        }
        &-item {
          margin-bottom: 15px;
          @include lapTopHigh {
            margin-bottom: 0;
          }
          width: 100%;
          &-title {
            @include lapTopHigh {
              color: white;
            }
          }
          &:last-child {
            @include lapTopHigh {
              margin-left: 15px;
            }
          }
          select {
            display: block;
            width: 100%;
          }
        }
      }
      &-book {
        text-decoration: none;
        color: white;
        background-color: $important;
        text-align: center;
        padding: 5px 0;
        width: 100px;
        margin-left: auto;
        display: block;
        transition: 0.5s all;
        &:hover {
          background-color: darken($important, 10%);
        }
      }
    }
  }
  &-word {
    margin: auto;
    font-size: 40px;
    @include lapTopHigh {
      font-size: 50px;
      margin-left: 70px;
    }
    /* position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    height: 100px; */
    //background-color: rgba(0, 0, 0, 0.5);
    color: white;
    /* display: flex;
    align-items: center;
    justify-content: center; */
    /* @include lapTop {
      font-size: 30px;
    } */
  }
}
/* .start {
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
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
  }
} */
/* @keyframes arrow {
  0% {
    transform: translateY(-5px) rotate(90deg);
  }
  100% {
    transform: translateY(5px) rotate(90deg);
  }
} */
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

<style lang="scss">
@import '../assets/_grid.scss';
.home-picker {
  width: 100%;
  @include lapTopHigh {
    width: 200px;
  }
  &-input {
    display: block;
    width: 100%;
  }
}
</style>
