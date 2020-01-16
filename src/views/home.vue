<template>
  <div class="home">
    <banner />
    <section class="recommend">
      <div class="recommend-bg">
        <h2 class="home-title">精選推薦</h2>
        <section class="suggest">
          <div class="swiper-container suggest-container">
            <div class="swiper-wrapper">
              <div
                class="swiper-slide"
                v-for="(item, index) in allRooms"
                :key="item.id + index"
              >
                <section class="home-suggest">
                  <div class="home-suggest-container">
                    <!-- @click="roomHandler(item.id)" -->
                    <div
                      class="home-suggest-container-pic"
                      :style="
                        `background-image:url(${
                          item['room-detail'].imageUrl[1]
                        })`
                      "
                    ></div>
                  </div>
                  <article class="home-suggest-detail">
                    <h4>{{ item['rooms-detail'].name }}</h4>
                    <p>平日$ {{ item['rooms-detail'].normalDayPrice }}</p>
                    <p>假日$ {{ item['rooms-detail'].holidayPrice }}</p>
                    <p class="home-suggest-detail-none">
                      房客人數限制:{{
                        item['room-detail'].descriptionShort.GuestMax
                      }}人
                    </p>
                    <p class="home-suggest-detail-none">
                      床型:{{ item['room-detail'].descriptionShort.Bed[0] }}
                    </p>
                    <p class="home-suggest-detail-none">
                      房間大小:{{
                        item['room-detail'].descriptionShort.Footage
                      }}平方公尺
                    </p>

                    <router-link
                      :to="`/room/${item.id}`"
                      class="home-suggest-detail-book"
                      >BOOK NOW</router-link
                    >
                  </article>
                </section>
                <!-- <div class="home-suggest" @click="roomHandler(item.id)">
                  <div class="home-suggest-pic" :style="`background-image:url(${item['room-detail'].imageUrl[1]})`" @click="roomHandler(item.id)"></div>
                </div> -->
              </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
          </div>
        </section>
      </div>
    </section>

    <!-- <div class="container"> -->
    <!-- </div> -->

    <!-- <div class="container"> -->

    <section class="about">
      <h2 class="home-title-other">關於我們</h2>
      <div class="swiper-container about-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="about-bg about-bg1">
              <article class="about-bg-word">
                <h4>
                  設施多樣
                </h4>
                <p>
                  <!-- WHITE INN坐落在美茵河畔法蘭克福市的中心地帶，距離法蘭克福中央火車站只有100米之遙。 -->飯店1F提供桌上型個人電腦，多功能事務機（列印、影印、掃描），沙發休息區，書報區。另外客房提供配備了空調以及免費無線網路連接的隔音客房，並設有一間時尚的餐廳。Europa
                  Style酒店的所有客房都擁有舒適的陳設，配有可以收看衛星頻道的平面電視、筆記本電腦保險箱和迷你吧，部分客房設有沏茶/咖啡設施。
                </p>
              </article>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="about-bg about-bg2">
              <article class="about-bg-word">
                <h4>
                  鄰近景點
                </h4>
                <p>
                  飯店距離眾多的國際化餐廳、酒吧和夜總會都只有很短的步行路程。著名的Zeil購物區以及Frankfurt
                  Messe Exhibition Grounds展覽中心距離酒店有大約5分鐘車程。
                  Europa酒店每天早晨供應自助早餐。酒店的酒吧供應各種飲品。
                  禮賓處的工作人員可以幫助客人安排遊覽法蘭克福市的行程，24小時前台可以提供行李寄存服務。
                </p>
              </article>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="about-bg about-bg3">
              <article class="about-bg-word">
                <h4>
                  舒適乾淨
                </h4>
                <p>
                  飯店於 2018 年 11
                  月新開業，提供現代風格的空調客房。房內設有平面電視、附淋浴和吹風機的私人衛浴、抗過敏寢具和枕頭目錄。接待櫃台備有
                  iPad 供客人免費租用。此外，所有客房均配有當代藝術家Hartwig
                  Ebersbach的大幅畫作以及42英寸的電視、Nespresso咖啡機和高效的空調系統。
                </p>
              </article>
            </div>
          </div>
        </div>
        <!-- Add Pagination -->
        <!-- <div class="swiper-pagination"></div> -->
        <!-- Add Arrows -->
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>
    </section>

    <!-- <div class="container"> -->
    <section class="row group-grid">
      <div class="col-md-6 group">
        <section class="group-item">
          <div class="group-item-bg group-item-bg1"></div>
          <div class="group-item-content" @click="routeHandler('list')">
            <h4 class="group-item-content-title">客房介紹</h4>
            <router-link to="/list" class="group-item-content-more"
              >了解更多</router-link
            >
          </div>
        </section>
      </div>
      <div class="col-md-6 group">
        <section class="group-item">
          <div class="group-item-bg group-item-bg2"></div>
          <div class="group-item-content" @click="routeHandler('facility')">
            <h4 class="group-item-content-title">設施介紹</h4>
            <router-link to="/facility" class="group-item-content-more"
              >了解更多</router-link
            >
          </div>
        </section>
      </div>
      <div class="col-md-4 group">
        <section class="group-item">
          <div class="group-item-bg group-item-bg3"></div>
          <div class="group-item-content" @click="routeHandler('news')">
            <h4 class="group-item-content-title">最新消息</h4>
            <router-link to="/news" class="group-item-content-more"
              >了解更多</router-link
            >
          </div>
        </section>
      </div>
      <div class="col-md-4 group">
        <section class="group-item">
          <div class="group-item-bg group-item-bg4"></div>
          <div class="group-item-content" @click="routeHandler('gallery')">
            <h4 class="group-item-content-title">照片集錦</h4>
            <router-link to="/gallery" class="group-item-content-more"
              >了解更多</router-link
            >
          </div>
        </section>
      </div>
      <div class="col-md-4 group">
        <section class="group-item">
          <div class="group-item-bg group-item-bg5"></div>
          <div class="group-item-content" @click="routeHandler('contact')">
            <h4 class="group-item-content-title">聯絡我們</h4>
            <router-link to="/contact" class="group-item-content-more"
              >了解更多</router-link
            >
          </div>
        </section>
      </div>
    </section>
    <!-- </div> -->

    <section class="container">
      <h2 class="home-title-other">顧客評論</h2>
      <section class="scroll">
        <figure class="scroll-flex">
          <img
            src="../assets/scroll/sean-o-KMn4VEeEPR8-unsplash.jpg"
            alt=""
            class="scroll-flex-pic"
          />
          <figcaption class="scroll-flex-people">
            <h5 class="scroll-flex-people-name">周小姐</h5>
            <h5 class="scroll-flex-people-word">
              玩沙玩水的首選，有絕美的獨立沙灘，沙質細膩，整體乾淨舒適，環境很好，也提供很多水上的玩法，大人、小孩都玩得很開心。
            </h5>
          </figcaption>
        </figure>

        <figure class="scroll-flex">
          <img
            src="../assets/scroll/hello-lightbulb-yB6WFHbkX40-unsplash.jpg"
            alt=""
            class="scroll-flex-pic"
          />
          <figcaption class="scroll-flex-people">
            <h5 class="scroll-flex-people-name">蔣先生</h5>
            <h5 class="scroll-flex-people-word">
              飯店的天台有瞭望台提供高處往下看的視角，並且有提供簡易拍照區供遊客拍照，不過因瞭望台地勢較高，要小心強風的吹襲。
            </h5>
          </figcaption>
        </figure>

        <figure class="scroll-flex">
          <img
            src="../assets/scroll/patric-wong-iIn9RMIlay8-unsplash.jpg"
            alt=""
            class="scroll-flex-pic"
          />
          <figcaption class="scroll-flex-people">
            <h5 class="scroll-flex-people-name">蔡小姐</h5>
            <h5 class="scroll-flex-people-word">
              我是一大早就去游泳，喜歡一個人靜靜玩。工作人員會主動打招呼。清潔做得非常好。游累了可以泡湯，用水按摩身體，非常舒服！
            </h5>
          </figcaption>
        </figure>

        <figure class="scroll-flex">
          <img
            src="../assets/scroll/troy-t-kbiGSJpiTKE-unsplash.jpg"
            alt=""
            class="scroll-flex-pic"
          />
          <figcaption class="scroll-flex-people">
            <h5 class="scroll-flex-people-name">顏先生</h5>
            <h5 class="scroll-flex-people-word">
              服務好，早餐buffet原本不敢抱太大期待，結果出忽意料之外的好吃，菜色豐富，補菜速度快，餐點多樣品質也好，真的很有誠意。
            </h5>
          </figcaption>
        </figure>
      </section>
    </section>
    <!-- </div> -->
  </div>
</template>

<script>
import 'swiper/css/swiper.min.css'
import Swiper from 'swiper'
import banner from '../components/banner'
export default {
  data() {
    return {
      allRooms: []
    }
  },
  methods: {
    /* roomHandler(id) {
      this.$router.push(`/room/${id}`)
    }, */
    routeHandler(val) {
      this.$router.push(`/${val}`)
    },
    scrollRoom(e, val) {
      e.preventDefault()
      //window.scrollTo(0,this.$refs[val].offsetTop)
      window.scrollTo({
        top: this.$refs[val].offsetTop,
        behavior: 'smooth'
      })
    }
  },
  mounted() {
    //let token = document.head.querySelector('meta[name="csrf-token"]');
    //window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
    this.$bus.$emit('isLoading', true)
    this.$http
      .get(`${process.env.VUE_APP_api}/rooms`, {
        /* headers: {
          "CSRF-Token": token
        } */
      })
      .then(res => {
        //axios.defaults.headers.common['X-CSRF-TOKEN'] = res.data.csrfToken
        this.allRooms = res.data.item
      })
      .then(() => {
        new Swiper('.suggest-container', {
          loop: true,
          slidesPerView: 1,
          speed: 400,
          autoplay: true,
          breakpoints: {
            // when window width is >= 480px
            /* 768: {
              slidesPerView: 3,
              spaceBetween: 30
            } */
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        })
      })
      .then(() => {
        new Swiper('.about-container', {
          slidesPerView: 1,
          spaceBetween: 30,
          loop: true,
          autoplay: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        })
        this.$bus.$emit('isLoading', false)
      })
  },
  components: {
    banner
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/_grid.scss';
@import '../assets/_mixin.scss';
@import '../assets/_variable.scss';
/* @import url('https://fonts.googleapis.com/css?family=Indie+Flower&display=swap'); */
.home {
  margin: auto;
  .recommend {
    @extend %bg;
    //background: url('../assets/suggest.jpg');
    //background-image: url('../assets/suggest.jpg');
    background-image: url('https://images.unsplash.com/photo-1533779283484-8ad4940aa3a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60');
    background-attachment: fixed;
    width: 100%;
    min-height: 100vh;
    //margin: 0 20px;
    position: relative;
    &-bg {
      background: rgba(0, 0, 0, 0.4);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      //justify-content: center;
    }
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
  /* &-header {
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
      }
    }
  } */
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
  /* &-menu {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    &-item {
      list-style: none;
      cursor: pointer;
    }
  } */

  &-info {
    width: 100%;
    padding: 0 20px;
    @include lapTop {
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
.about {
  &-bg {
    position: relative;
    width: 100%;
    height: 100vh;
    //padding-bottom: 45%;
    //margin-bottom: 30px;
    @extend %bg;
    &1 {
      background-image: url('https://images.unsplash.com/photo-1541987817603-d2b3e0fad6d0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60');
    }
    &2 {
      background-image: url('https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60');
    }
    &3 {
      background-image: url('https://images.unsplash.com/photo-1541123356219-284ebe98ae3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60');
    }
    &-word {
      background-color: rgba(0, 0, 0, 0.7);
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      margin: 0;
      width: 100%;
      padding: 50px 50px 0;
      @include pad {
        width: 80%;
        padding: 80px 90px 0;
      }
      @include lapTop {
        width: 70%;
      }
      @include lapTopHigh {
        width: 50%;
      }
      color: white;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: column;
      h4 {
        font-size: 40px;
        margin-bottom: 40px;
        @include lapTop {
          font-size: 50px;
        }
      }
      p {
        margin: 0;
        line-height: 2;
        opacity: 0.7;
        text-align: left;
      }
    }
  }
}
.group-grid {
  width: 100%;
  margin: auto;
}
.group {
  padding: 1px;
  &-item {
    width: 100%;
    height: 0;
    padding-bottom: 67%;
    position: relative;
    &-content {
      position: absolute;
      width: 95%;
      height: 95%;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      cursor: pointer;
      transition: 0.5s all;
      &:hover {
        background-color: rgba(0, 0, 0, 0.7);
      }
      &:hover > &-more {
        bottom: 50px;
      }
      &-title {
        font-size: 30px;
      }
      &-more {
        color: white;
        position: absolute;
        bottom: -70px;
        outline: 1px solid white;
        padding: 5px;
        transition: 0.3s all;
        font-size: 16px;
        text-decoration: none;
        &:hover {
          outline: none;
          background-color: $important;
        }
      }
    }
    &-bg {
      position: absolute;
      width: 100%;
      height: 100%;
      @extend %bg;
      &1 {
        background-image: url('../assets/list.jpg');
      }
      &2 {
        background-image: url('../assets/facility/facility.jpg');
      }
      &3 {
        background-image: url('http://www.theriverside.com.tw/wp-content/uploads/sites/308/2019/09/樂不思鼠-01-1200x750.jpg');
      }
      &4 {
        background-image: url('https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60');
      }
      &5 {
        background-image: url('https://images.unsplash.com/photo-1566454869316-b6cfb093a071?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60');
      }
    }
  }
}
.scroll {
  width: 100%;
  @include lapTop {
    width: 700px;
  }
  height: 30vh;
  margin: 0 auto 30px;
  overflow-y: scroll;
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
        z-index: -1;
        position: relative;
      }
    }
  }
}

.suggest {
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
.about {
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
    margin-left: auto;
    margin-right: auto;
  }
  .swiper-slide {
    text-align: center;
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
}
.swiper-button-prev {
  //left: 50px;
}
.swiper-button-next,
.swiper-button-prev {
  //bottom: 50px;
  color: white;
}
.swiper-pagination {
  position: relative;
  top: 0;
}
/deep/.swiper-pagination-bullet-active {
  background-color: $important;
}
</style>
