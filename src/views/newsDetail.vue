<template>
  <div class="container">
    <div class="detail">
      <div class="detail-title">{{ news.name }}</div>
      <!-- <div class="detail-word">{{ news.content }}</div> -->
      <trip v-if="title[0] === show"></trip>
      <protect v-if="title[1] === show"></protect>
      <lines v-if="title[2] === show"></lines>
      <year v-if="title[3] === show"></year>
      <img :src="news.pic" alt="" class="detail-pic" />
    </div>
  </div>
</template>

<script>
import trip from '../components/news/trip'
import protect from '../components/news/protect'
import lines from '../components/news/line'
import year from '../components/news/year'

export default {
  data() {
    return {
      news: {},
      show: '',
      title: [
        '擴大國旅冬遊住宿優惠活動',
        '環保‧愛地球',
        'Line好友圈',
        '通通發大財春酒尾牙專案'
      ]
    }
  },
  mounted() {
    this.$bus.$emit('isLoading', true)
    this.$http
      .get(`${process.env.VUE_APP_api}/news/${this.$route.params.id}`)
      .then(res => {
        if (res.data.success) {
          this.show = res.data.news.name
          this.news = res.data.news
        }
        this.$bus.$emit('isLoading', false)
      })
  },
  components: {
    trip,
    protect,
    lines,
    year
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/_grid.scss';
@import '../assets/_mixin.scss';
@import '../assets/_variable.scss';
.detail {
  margin-bottom: 50px;
  &-pic {
    max-width: 750px;
    width: 100%;
    height: auto;
    display: block;
    margin: auto;
  }
  &-title {
    color: $important;
    font-size: 30px;
    margin-top: 60px;
    text-align: center;
    margin: 60px auto 20px auto;
    border-bottom: 1px solid rgba(128, 128, 128, 0.6);
    width: 250px;
    padding: 10px 0;
  }
  &-word {
    opacity: 0.7;
    text-align: center;
  }
  &-notice {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 40px 0;
    &-title {
      display: flex;
      align-items: center;
      opacity: 0.6;
      font-size: 25px;
      &::after {
        content: '';
        margin: 0 20px;
        width: 2px;
        display: block;
        height: 60px;
        background-color: rgba(0, 0, 0, 0.7);
      }
    }
    &-content {
      opacity: 0.7;
      p {
        margin: 20px 0;
      }
    }
  }
}
</style>
