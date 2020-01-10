<template>
  <div class="home">
    <banner />
    <div class="container">
      <div class="recommend">
        <div class="home-title">精選推薦</div>
      </div>
    </div>

    <div class="container">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(item, index) in allRooms"
            :key="item.id + index"
          >
            <div class="home-suggest" @click="roomHandler(item.id)">
              <div
                class="home-suggest-pic"
                :style="
                  `background-image:url(${item['room-detail'].imageUrl[1]})`
                "
                @click="roomHandler(item.id)"
              ></div>
            </div>
            <div class="home-name">
              {{ item['rooms-detail'].name }}
            </div>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>
    </div>
    <div class="container">
      <div class="home-title-other">關於我們</div>
      <div class="about">
        <div class="about-bg">
          <div class="about-bg-pic"></div>
          <!-- <img class="about-pic" src="https://images.unsplash.com/photo-1541987817603-d2b3e0fad6d0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60" alt="" /> -->
        </div>
        <div class="about-word">
          <p>
            WHITE
            INN坐落在美茵河畔法蘭克福市的中心地帶，距離法蘭克福中央火車站只有100米之遙。飯店提供配備了空調以及免費無線網路連接的隔音客房，並設有一間時尚的餐廳。Europa
            Style酒店的所有客房都擁有舒適的陳設，配有可以收看衛星頻道的平面電視、筆記本電腦保險箱和迷你吧，部分客房設有沏茶/咖啡設施。
          </p>
          <p>
            飯店距離眾多的國際化餐廳、酒吧和夜總會都只有很短的步行路程。著名的Zeil購物區以及Frankfurt
            Messe Exhibition Grounds展覽中心距離酒店有大約5分鐘車程。
            Europa酒店每天早晨供應自助早餐。酒店的酒吧供應各種飲品。
            禮賓處的工作人員可以幫助客人安排遊覽法蘭克福市的行程，24小時前台可以提供行李寄存服務。
          </p>
          <p>
            飯店於 2018 年 11
            月新開業，提供現代風格的空調客房。房內設有平面電視、附淋浴和吹風機的私人衛浴、抗過敏寢具和枕頭目錄。接待櫃台備有
            iPad 供客人免費租用。此外，所有客房均配有當代藝術家Hartwig
            Ebersbach的大幅畫作以及42英寸的電視、Nespresso咖啡機和高效的空調系統。
          </p>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row group-grid">
        <div class="col-md-6 group">
          <div class="group-item">
            <div class="group-item-bg group-item-bg1"></div>
            <div class="group-item-content" @click="routeHandler('list')">
              <div class="group-item-content-title">客房介紹</div>
              <router-link to="/list" class="group-item-content-more"
                >了解更多</router-link
              >
            </div>
          </div>
        </div>
        <div class="col-md-6 group">
          <div class="group-item">
            <div class="group-item-bg group-item-bg2"></div>
            <div class="group-item-content" @click="routeHandler('facility')">
              <div class="group-item-content-title">設施介紹</div>
              <router-link to="/facility" class="group-item-content-more"
                >了解更多</router-link
              >
            </div>
          </div>
        </div>
        <div class="col-md-4 group">
          <div class="group-item">
            <div class="group-item-bg group-item-bg3"></div>
            <div class="group-item-content" @click="routeHandler('news')">
              <div class="group-item-content-title">最新消息</div>
              <router-link to="/news" class="group-item-content-more"
                >了解更多</router-link
              >
            </div>
          </div>
        </div>
        <div class="col-md-4 group">
          <div class="group-item">
            <div class="group-item-bg group-item-bg4"></div>
            <div class="group-item-content" @click="routeHandler('gallery')">
              <div class="group-item-content-title">照片集錦</div>
              <router-link to="/gallery" class="group-item-content-more"
                >了解更多</router-link
              >
            </div>
          </div>
        </div>
        <div class="col-md-4 group">
          <div class="group-item">
            <div class="group-item-bg group-item-bg5"></div>
            <div class="group-item-content" @click="routeHandler('contact')">
              <div class="group-item-content-title">聯絡我們</div>
              <router-link to="/contact" class="group-item-content-more"
                >了解更多</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="home-title-other">顧客評論</div>
      <div class="scroll">
        <div class="scroll-flex">
          <img
            src="../assets/scroll/sean-o-KMn4VEeEPR8-unsplash.jpg"
            alt=""
            class="scroll-flex-pic"
          />
          <div class="scroll-flex-people">
            <div class="scroll-flex-people-name">周小姐</div>
            <div class="scroll-flex-people-word">
              玩沙玩水的首選，有絕美的獨立沙灘，沙質細膩，整體乾淨舒適，環境很好，也提供很多水上的玩法，大人、小孩都玩得很開心。
            </div>
          </div>
        </div>

        <div class="scroll-flex">
          <img
            src="../assets/scroll/hello-lightbulb-yB6WFHbkX40-unsplash.jpg"
            alt=""
            class="scroll-flex-pic"
          />
          <div class="scroll-flex-people">
            <div class="scroll-flex-people-name">蔣先生</div>
            <div class="scroll-flex-people-word">
              飯店的天台有瞭望台提供高處往下看的視角，並且有提供簡易拍照區供遊客拍照，不過因瞭望台地勢較高，要小心強風的吹襲。
            </div>
          </div>
        </div>

        <div class="scroll-flex">
          <img
            src="../assets/scroll/patric-wong-iIn9RMIlay8-unsplash.jpg"
            alt=""
            class="scroll-flex-pic"
          />
          <div class="scroll-flex-people">
            <div class="scroll-flex-people-name">蔡小姐</div>
            <div class="scroll-flex-people-word">
              我是一大早就去游泳，喜歡一個人靜靜玩。工作人員會主動打招呼。清潔做得非常好。游累了可以泡湯，用水按摩身體，非常舒服！
            </div>
          </div>
        </div>

        <div class="scroll-flex">
          <img
            src="../assets/scroll/troy-t-kbiGSJpiTKE-unsplash.jpg"
            alt=""
            class="scroll-flex-pic"
          />
          <div class="scroll-flex-people">
            <div class="scroll-flex-people-name">顏先生</div>
            <div class="scroll-flex-people-word">
              服務好，早餐buffet原本不敢抱太大期待，結果出忽意料之外的好吃，菜色豐富，補菜速度快，餐點多樣品質也好，真的很有誠意。
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="home-info">
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
      </div> -->
    </div>
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
    roomHandler(id) {
      this.$router.push(`/room/${id}`)
    },
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
        new Swiper('.swiper-container', {
          loop: true,
          slidesPerView: 1,
          speed: 400,
          autoplay: true,
          breakpoints: {
            // when window width is >= 480px
            768: {
              slidesPerView: 3,
              spaceBetween: 30
            }
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
  .test {
    background-image: url('../assets/home2.jpg');
    @extend %bg;
    width: 100%;
    height: 500px;
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
    cursor: pointer;
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 67%;
    &-pic {
      @extend %bg;
      /* width: 230px;
      height: 200px; */
      width: 100%;
      height: 100%;
      position: absolute;
    }
  }
  &-name {
    color: $word;
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
  margin-bottom: 50px;
  &-bg {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 45%;
    margin-bottom: 30px;
    &-pic {
      @extend %bg;
      background-image: url('https://images.unsplash.com/photo-1541987817603-d2b3e0fad6d0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60');
      position: absolute;
      width: 100%;
      height: 100%;
      box-shadow: 0px 0px 10px 0px grey;
      border-radius: 10px;
    }
  }
  &-word {
    opacity: 0.7;
    text-indent: 40px;
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
</style>
