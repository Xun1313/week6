<template>
  <section class="recommend">
    <div class="recommend-bg">
      <h2 class="recommend-title">精選推薦</h2>
      <section class="home">
        <div class="swiper-container home-container">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(item, index) in allRooms"
              :key="item.id + index"
            >
              <section class="home-suggest">
                <div class="home-suggest-container">
                  <div
                    class="home-suggest-container-pic"
                    :style="`background-image:url(${item.primary.imageUrl[1]})`"
                  ></div>
                </div>
                <article class="home-suggest-detail">
                  <h4>{{ item['rooms-detail'].name }}</h4>
                  <p>
                    平日$ {{ item['rooms-detail'].normalDayPrice | currency }}
                  </p>
                  <p>
                    假日$ {{ item['rooms-detail'].holidayPrice | currency }}
                  </p>
                  <p class="home-suggest-detail-none">
                    房客人數限制:{{ item.primary.descriptionShort.GuestMax }}人
                  </p>
                  <p class="home-suggest-detail-none">
                    床型:{{ item.primary.descriptionShort.Bed[0] }}
                  </p>
                  <p class="home-suggest-detail-none">
                    房間大小:{{ item.primary.descriptionShort.Footage }}平方公尺
                  </p>
                  <router-link
                    :to="`/room/${item.id}`"
                    class="home-suggest-detail-book"
                    >BOOK NOW</router-link
                  >
                </article>
              </section>
            </div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import 'swiper/css/swiper.min.css'
import Swiper from 'swiper'
export default {
  data() {
    return {
      allRooms: []
    }
  },
  mounted() {
    this.$bus.$emit('isLoading', true)
    this.$http
      .get(`${process.env.VUE_APP_api}/rooms`)
      .then(res => {
        this.allRooms = res.data.item
      })
      .then(() => {
        new Swiper('.home-container', {
          loop: true,
          slidesPerView: 1,
          speed: 400,
          autoplay: true,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        })
        this.$bus.$emit('isLoading', false)
      })
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/_grid.scss';
@import '../../assets/_mixin.scss';
@import '../../assets/_variable.scss';
.recommend {
  @extend %bg;
  background-image: url('https://images.unsplash.com/photo-1533779283484-8ad4940aa3a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60');
  background-attachment: fixed;
  width: 100%;
  min-height: 100vh;
  position: relative;
  &-bg {
    background: rgba(0, 0, 0, 0.4);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  &-title {
    //font-family: 'Indie Flower', cursive;
    color: white;
    margin: 80px 0 50px;
    text-align: center;
    font-size: 40px;
    @include lapTop {
      font-size: 50px;
    }
  }
}
.home {
  &-suggest {
    @include lapTop {
      display: flex;
    }
    &-container {
      position: relative;
      left: 50%;
      width: 55%;
      height: 0;
      padding-bottom: 36.6%;
      transform: translateX(-50%);
      @include lapTop {
        transform: translateX(0%);
        left: 80px;
        width: 40%;
        padding-bottom: 26.6%;
      }
      &-pic {
        @extend %bg;
        /* width: 230px;
          height: 200px; */
        width: 100%;
        height: 100%;
        position: absolute;
      }
    }
    &-detail {
      color: white;
      background-color: transparent;
      position: relative;
      right: 0;
      text-align: center;
      left: 0px;
      @include lapTop {
        left: 150px;
        text-align: left;
      }
      h4 {
        @include lapTop {
          margin: 0px 0 30px;
          font-size: 30px;
        }
        margin: 20px 0 30px;
        font-size: 25px;
      }
      p {
        margin-bottom: 5px;
      }
      &-none {
        display: none;
        @include lapTop {
          display: block;
        }
      }
      &-book {
        text-decoration: none;
        background-color: $important;
        color: white;
        padding: 10px 0;
        margin: 30px auto;
        @include lapTop {
          margin: 30px 0;
        }
        display: block;
        text-align: center;
        width: 150px;
        transition: 0.5s all;
        &:hover {
          background-color: darken($important, 10%);
        }
      }
    }
  }
}
.home {
  width: 100%;
  overflow: hidden;
  html,
  body {
    position: relative;
    height: 100%;
  }
  body {
    background: #eee;
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    color: #000;
    margin: 0;
    padding: 0;
  }
  .swiper-container {
    width: 100%;
    height: 100%;
  }
  .swiper-slide {
    text-align: center;
    background-color: transparent;
    /* Center slide text vertically */
    /* display: -webkit-box;
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
    align-items: center; */
  }
  .swiper-button-next,
  .swiper-button-prev {
    color: $important;
  }
}
</style>
