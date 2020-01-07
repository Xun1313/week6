<template>
  <div>
    <div class="container">
      <div class="news-title-other">最新消息</div>
      <div class="row">
        <div class="col-md-6 item" v-for="item in news" :key="item.id">
          <div class="news-item">
            <div
              class="news-item-pic"
              :style="`background-image:url(${item.pic})`"
              @click="routeHandler(item.id)"
            ></div>
            <div class="news-item-content">
              <div class="news-item-content-title">{{ item.name }}</div>
              <div class="news-item-content-word">{{ item.content }}</div>
            </div>
            <router-link :to="`/news/${item.id}`" class="news-item-more"
              >了解更多</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      news: [],
      route: {}
    }
  },
  methods: {
    routeHandler(id) {
      //const route={'擴大國旅冬遊住宿優惠活動':'trip','環保‧愛地球':'protect','Line好友圈':'line'}
      //this.$router.push(`/newsDetail/${id}`)
      this.$router.push(`/news/${id}`)
    }
  },
  mounted() {
    this.$bus.$emit('isLoading', true)
    this.$http.get(`${process.env.VUE_APP_api}/news`).then(res => {
      console.log(res.data)
      this.news = res.data.news
      this.$bus.$emit('isLoading', false)
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/_grid.scss';
@import '../assets/_mixin.scss';
@import '../assets/_variable.scss';
.news {
  /* &-pic {
    width: 100%;
    height: 0;
    padding-bottom: 64%;
    @include lapTop {
      padding-bottom: 35%;
    }
    position: relative;
    &-bg {
      background-image: url('../assets/facility/facility.jpg');
      @extend %bg;
      background-position: bottom;
      width: 100%;
      height: 100%;
      position: absolute;
    }
  } */
  /* &-introduce {
    text-align: center;
    opacity: 0.7;
    margin-bottom: 50px;
  } */
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
  &-item {
    position: relative;
    height: 100%;
    transition: 0.3s all;
    &:hover {
      box-shadow: 0px 0px 15px 0px grey;
    }
    &-pic {
      @extend %bg;
      width: 100%;
      height: 300px;
      cursor: pointer;
    }
    &-content {
      padding: 0px 50px;
      margin: 30px 0 80px;
      &-title {
        color: $important;
        margin-bottom: 20px;
        text-align: center;
      }
      &-word {
        opacity: 0.7;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
      }
    }
    &-more {
      text-decoration: none;
      color: white;
      background-color: $important;
      display: block;
      width: 100px;
      text-align: center;
      padding: 5px;
      margin: 0 auto;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 15px;
      transition: 0.5s all;
      &:hover {
        color: $important;
        background-color: white;
      }
    }
  }
}
.item {
  margin-bottom: 30px;
}
</style>
