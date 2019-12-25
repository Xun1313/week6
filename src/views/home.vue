<template>
  <div class="home">
    <!-- <div class="home-title">WHITE INN</div> -->
    <!-- <div class="bg-light"> -->
    <div class="container">
      <div class="home-header">
        <div class="home-header-display">
          <div class="home-header-display-word">挑選屬於你的房間類型</div>
          <img src="../assets/home.jpg" class="home-header-display-pic" alt="" />
        </div>
        <div class="home-header-display">
          <div class="home-header-display-word">顧客評論</div>

          <div class="home-header-display-scroll scroll">
            <div class="scroll-flex">
              <img src="../assets/scroll/anmol-seth-hDbCjHNdF48-unsplash.jpg" alt="" class="scroll-flex-pic" />
              <div class="scroll-flex-people">
                <div class="scroll-flex-people-name">蔡小姐</div>
                <div class="scroll-flex-people-word">房型空間大的很驚艷，Spa設施場地夠大</div>
              </div>
            </div>

            <div class="scroll-flex">
              <img src="../assets/scroll/daniil-vnoutchkov-U1IHfPUYyPE-unsplash.jpg" alt="" class="scroll-flex-pic" />
              <div class="scroll-flex-people">
                <div class="scroll-flex-people-name">周小姐</div>
                <div class="scroll-flex-people-word">溫泉湯池也算舒適，早餐樣式足夠豐富</div>
              </div>
            </div>

            <div class="scroll-flex">
              <img src="../assets/scroll/hello-lightbulb-yB6WFHbkX40-unsplash.jpg" alt="" class="scroll-flex-pic" />
              <div class="scroll-flex-people">
                <div class="scroll-flex-people-name">蔣先生</div>
                <div class="scroll-flex-people-word">房間裝潢很棒 窗簾拉開看到的風景很美</div>
              </div>
            </div>

            <div class="scroll-flex">
              <img src="../assets/scroll/manuel-moreno-DGa0LQ0yDPc-unsplash.jpg" alt="" class="scroll-flex-pic" />
              <div class="scroll-flex-people">
                <div class="scroll-flex-people-name">顏先生</div>
                <div class="scroll-flex-people-word">讓人可以很放鬆的地方</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="recommend">
      <div class="home-title">精選推薦</div>
    </div>
    <!-- <div class="home-suggest">
      <div class="home-suggest-item" v-for="(item, index) in allRooms" :key="item.id + index">
        <img :src="item['room-detail'].imageUrl[1]" alt="" class="home-suggest-item-pic" />
        <div class="home-suggest-item-name">132</div>
      </div>
    </div> -->
    <div class="container">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, index) in allRooms" :key="item.id + index">
            <div class="home-suggest" @click="roomHandler(item.id)">
              <div class="home-suggest-pic" :style="`background-image:url(${item['room-detail'].imageUrl[1]})`" @click="roomHandler(item.id)"></div>
              <div class="home-suggest-name">{{ item['rooms-detail'].name }}</div>
            </div>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>
    </div>

    <div class="container">
      <div class="home-title-other">選擇房型</div>
      <div class="home-scroll">
        <div class="home-scroll-single" @click="scrollRoom('single')">
          <div class="home-scroll-item">
            <div class="single-bg"></div>
            <div class="single-word">Single</div>
          </div>
        </div>
        <div class="home-scroll-double" @click="scrollRoom('double')">
          <div class="home-scroll-item">
            <div class="double-bg"></div>
            <div class="double-word">Double</div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="home-title-other" ref="single">精選單人房</div>
      <div class="home-all row">
        <template v-for="item in allRooms">
          <div class="home-all-item item col-12 col-md-6" v-if="item['room-detail'].descriptionShort.GuestMin === 1">
            <div class="item-group">
              <img :src="item['rooms-detail'].imageUrl" class="item-group-pic" />
              <div class="item-group-more">
                <div class="item-group-more-word" @click="roomHandler(item.id)">See More</div>
              </div>
            </div>
            <div class="item-title">{{ item['rooms-detail'].name }}</div>
            <div class="item-normal">平日$ {{ item['rooms-detail'].normalDayPrice }}</div>
            <div class="item-holiday">假日$ {{ item['rooms-detail'].holidayPrice }}</div>
          </div>
        </template>
      </div>

      <div class="home-title-other" ref="double">精選雙人房</div>
      <div class="home-all row">
        <template v-for="item in allRooms">
          <div class="home-all-item item col-12 col-md-6" v-if="item['room-detail'].descriptionShort.GuestMin === 2">
            <div class="item-group">
              <img :src="item['rooms-detail'].imageUrl" class="item-group-pic" />
              <div class="item-group-more">
                <div class="item-group-more-word" @click="roomHandler(item.id)">See More</div>
              </div>
            </div>
            <div class="item-title">{{ item['rooms-detail'].name }}</div>
            <div class="item-normal">$ {{ item['rooms-detail'].normalDayPrice }}</div>
            <div class="item-holiday">$ {{ item['rooms-detail'].holidayPrice }}</div>
          </div>
        </template>
      </div>

      <div class="home-info">
        <div class="home-info-group">
          <i class="fas fa-map-marker-alt"></i>
          <div class="content">台北市OO區OO街123號</div>
        </div>
        <div class="home-info-group">
          <i class="fas fa-phone-alt"></i>
          <div class="content">123456789</div>
        </div>
        <div class="home-info-group">
          <i class="fas fa-envelope"></i>
          <div class="content">abcd@efgijk.com</div>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import 'swiper/css/swiper.min.css';
import Swiper from 'swiper';
export default {
  data() {
    return {
      allRooms: [],
    };
  },
  methods: {
    roomHandler(id) {
      this.$router.push(`/room/${id}`);
    },
    scrollRoom(val) {
      //window.scrollTo(0,this.$refs[val].offsetTop)
      window.scrollTo({
        top: this.$refs[val].offsetTop,
        behavior: 'smooth',
      });
    },
  },
  mounted() {
    //let token = document.head.querySelector('meta[name="csrf-token"]');
    //window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
    this.$bus.$emit('isLoading', true);
    this.$http
      .get(`${process.env.VUE_APP_api}/rooms`, {
        /* headers: {
          "CSRF-Token": token
        } */
      })
      .then(res => {
        //axios.defaults.headers.common['X-CSRF-TOKEN'] = res.data.csrfToken
        this.allRooms = res.data.item;
        this.$bus.$emit('isLoading', false);
      })
      .then(() => {
        var swiper = new Swiper('.swiper-container', {
          loop: true,
          slidesPerView: 1,
          speed: 200,
          breakpoints: {
            // when window width is >= 480px
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        });
      });
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/_grid.scss';
@import '../assets/_mixin.scss';
@import '../assets/_variable.scss';
/* @import url('https://fonts.googleapis.com/css?family=Indie+Flower&display=swap'); */
.home {
  margin: auto;
  /* height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @include lapTop {
    height: 100vh;
  } */
  .recommend {
    @extend %bg;
    background-image: url('../assets/suggest.jpg');
    background-attachment: fixed;
    width: 100%;
    height: 200px;
    margin: 50px 0 20px 0;
    position: relative;
  }
  &-title {
    //font-family: 'Indie Flower', cursive;
    color: $important;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    width: 100%;
    height: 100%;
    /* &::before{
      content: '';
      width: 300px;
      outline: 1px solid black;
    } */
  }
  &-title-other {
    color: $important;
    font-size: 20px;
    margin-top: 60px;
    text-align: center;
    margin: 60px auto 20px auto;
    border-bottom: 1px solid rgba(128, 128, 128, 0.6);
    width: 250px;
    padding: 10px 0;
  }
  &-header {
    @include lapTop {
      display: flex;
    }
    align-items: center;
    justify-content: space-between;
    &-display {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 25px;
      &-word {
        margin-bottom: 10px;
        color: $important;
      }
      &-pic {
        height: auto;
        width: 250px;
        @include lapTop {
          width: 500px;
        }
        /* @extend %bg;
        background-image: url('../assets/home.jpg'); */
        /* width: 350px;
        height: 350px; */
      }
      .scroll {
        //width: 500px;
        height: 333.33px;
        overflow-y: scroll;
        padding: 15px;
        &-flex {
          display: flex;
          margin-bottom: 15px;
          &-pic {
            width: 150px;
            @include lapTop {
              width: 230px;
            }
            height: auto;
          }
          &-people {
            padding: 15px;
            &-name {
              margin-bottom: 20px;
            }
            &-word {
              font-size: 16px;
              opacity: 0.6;
            }
          }
        }
      }
    }
  }
  &-suggest {
    cursor: pointer;
    &-pic {
      @extend %bg;
      width: 230px;
      height: 200px;
    }
    &-name {
      color: $word;
    }
    /* &-pic {
      width: 230px;
      height: auto;
    } */
    /* display: flex;
    align-items: center; */
    /* &-item {
      display: flex;
      flex-direction: column;
      align-items: center;
    } */
  }
  /* &-menu {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    &-item {
      list-style: none;
      cursor: pointer;
    }
  } */
  &-scroll {
    display: flex;
    align-items: center;
    border-radius: 50px;
    width: 200px;
    margin: 0 auto 30px;
    overflow: hidden;
    border: 2px solid $important;
    justify-content: center;
    height: 55px;
    box-shadow: 0px 0px 5px 5px grey;
    &-item {
      font-weight: bold;
      cursor: pointer;
      position: relative;
      .single-bg {
        position: absolute;
        transform: rotate(10deg);
        padding: 75px;
        top: -100%;
        left: -92%;
        z-index: 5;
        transition: 0.5s all;
      }
      .single-word {
        margin: 0 10px;
        color: $important;
        transition: 0.5s all;
        position: relative;
        z-index: 10;
      }
      .double-bg {
        position: absolute;
        color: $important;
        text-align: right;
        background-color: $important;
        transform: rotate(10deg);
        padding: 75px;
        top: -50%;
        left: 0;
        z-index: 5;
        transition: 0.5s all;
      }
      .double-word {
        margin: 0 10px;
        position: relative;
        left: 10px;
        z-index: 10;
        transition: 0.5s all;
        color: white;
      }
    }
    &-single {
      &:hover .single-bg {
        background-color: $important;
      }
      &:hover .single-word {
        color: white;
      }
    }
    &-double {
      &:hover .double-bg {
        background-color: white;
      }
      &:hover .double-word {
        color: $important;
      }
    }
  }
  &-all {
    //width: 90%;
    padding: 0 50px;
    margin: auto;
    .item {
      /* padding-left: 1px;
      padding-right: 1px; */
      margin-bottom: 20px;
      /* @include lapTop {
        transform: translateY(-70px);
      } */
      &-group {
        position: relative;
        &:hover > .item-group-more {
          background-color: rgba(0, 0, 0, 0.5);
          height: 100%;
        }
        &-title {
          color: $important;
        }
        &-pic {
          width: 100%;
          height: auto;
          cursor: pointer;
        }
        &-more {
          background-color: rgba(0, 0, 0, 0);
          color: white;
          font-weight: bold;
          position: absolute;
          left: 0px;
          top: 0;
          width: 100%;
          //height: 100%;
          height: 0;
          overflow: hidden;
          justify-content: center;
          align-items: center;
          display: flex;
          transition: 0.5s all;
          &-word {
            padding: 5px;
            cursor: pointer;
          }
        }
      }
      &-normal,
      &-holiday {
        opacity: 0.6;
      }
    }
  }
  &-info {
    width: 100%;
    padding: 0 20px;
    @include lapTop {
      width: 75%;
      margin: auto;
      display: flex;
      justify-content: space-around;
      padding: 0;
    }
    color: rgba(0, 0, 0, 0.5);
    &-group {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .content {
        margin-left: 5px;
      }
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
.swiper-container {
  width: 100%;
  height: 100%;
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
.swiper-button-next,
.swiper-button-prev {
  color: $important;
}
</style>
