<template>
  <header class="all">
    <section class="swiper-container1">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="header header1"></div>
        </div>
        <div class="swiper-slide">
          <div class="header header2"></div>
        </div>
      </div>
      <article class="title">
        <h4>
          Enjoy A Luxury
        </h4>
        <h4>
          Experience
        </h4>
      </article>
      <div class="swiper-pagination"></div>
      <!-- <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div> -->
    </section>
    <section class="banner container">
      <div class="banner-word">
        <h4>
          Enjoy A Luxury
        </h4>
        <h4>
          Experience
        </h4>
      </div>
      <div class="banner-picker">
        <div class="picker">
          <div class="picker-group">
            <label class="picker-group-item" for="picker-group-in">
              <h4 class="picker-group-item-title">入住時間</h4>
              <Datepicker
                v-model="first.date"
                :disabled-dates="first.disabledDates"
                @selected="firstHandler"
                :wrapper-class="'home-picker'"
                :input-class="'home-picker-input'"
                :format="'yyyy-MM-dd'"
                :language="zh"
                :id="'picker-group-in'"
              ></Datepicker>
            </label>

            <label class="picker-group-item" for="picker-group-out">
              <h4 class="picker-group-item-title">退房時間</h4>
              <Datepicker
                v-model="end.date"
                :disabled-dates="end.disabledDates"
                :format="'yyyy-MM-dd'"
                :wrapper-class="'home-picker'"
                :input-class="'home-picker-input'"
                :id="'picker-group-out'"
                :language="zh"
              ></Datepicker>
            </label>
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
@import '../../assets/_grid.scss';
@import '../../assets/_mixin.scss';
@import '../../assets/_variable.scss';
.title {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  white-space: nowrap;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px 10px;
  font-size: 40px;
  z-index: 10;
  color: white;
  text-align: center;
  @include lapTopHigh {
    display: none;
  }
}
.banner {
  @include lapTopHigh {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    z-index: 10;
    transform: translateY(-50%);
    left: 0;
    right: 0;
    margin: auto;
    background-color: rgba(0, 0, 0, 0.5);
  }
  &-word {
    white-space: nowrap;
    font-size: 40px;
    text-align: center;
    display: none;
    @include lapTopHigh {
      font-size: 50px;
      display: block;
    }
    color: white;
  }
  &-picker {
    margin: 30px 0;
    @include lapTopHigh {
      margin-left: 80px;
    }
    .picker {
      padding: 20px;
      outline: 1px solid rgba(0, 0, 0, 0.3);
      @include lapTopHigh {
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
          &-time {
            background-color: white;
            padding: 0 5px;
            cursor: pointer;
            margin: 0;
            border: 1px solid rgba(0, 0, 0, 0.3);
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
}
.all {
  position: relative;
}
.header {
  width: 100%;
  height: 80vh;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @extend %bg;
  &1 {
    background-image: url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60');
  }
  &2 {
    background-image: url('https://images.unsplash.com/photo-1527142879-95b61a0b8226?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60');
    background-position: bottom;
  }
  &-picker {
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

<style lang="scss">
@import '../../assets/_grid.scss';
.home-picker {
  width: 100%;
  @include lapTopHigh {
    width: 200px;
  }
  &-input {
    display: block;
    cursor: pointer;
    overflow: hidden;
    border: 1px solid black;
    width: 100%;
    padding: 0 0 0 5px;
    outline: none;
  }
}
</style>
