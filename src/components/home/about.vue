<template>
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
</template>

<script>
import 'swiper/css/swiper.min.css'
import Swiper from 'swiper'
export default {
  mounted() {
    this.$bus.$emit('isLoading', true)
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
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/_grid.scss';
@import '../../assets/_mixin.scss';
@import '../../assets/_variable.scss';
.home-title-other {
  color: $important;
  font-size: 20px;
  margin-top: 60px;
  text-align: center;
  margin: 60px auto 20px auto;
  border-bottom: 1px solid rgba(128, 128, 128, 0.6);
  width: 250px;
  padding: 10px 0;
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
}
</style>
