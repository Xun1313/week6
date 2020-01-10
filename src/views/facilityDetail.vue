<template>
  <div class="container">
    <div class="detail">
      <img :src="facility.pic" alt="" class="detail-pic" />
      <div class="detail-title">{{ facility.name }}</div>
      <!-- <div class="detail-word">{{ facility.content }}</div> -->
      <div class="detail-notice">
        <div class="detail-notice-title">注意事項</div>
        <div class="detail-notice-content">
          <p>{{ facility.notice }}</p>
          <p>開放時間：{{ facility.timeStart }}~{{ facility.timeEnd }}</p>
        </div>
      </div>
      <pool v-if="title[0] === show"></pool>
      <kid v-if="title[1] === show"></kid>
      <gym v-if="title[2] === show"></gym>
      <friend v-if="title[3] === show"></friend>
    </div>
  </div>
</template>

<script>
import gym from '../components/facility/gym'
import kid from '../components/facility/kid'
import pool from '../components/facility/pool'
import friend from '../components/facility/friend'
export default {
  data() {
    return {
      facility: {},
      show: '',
      title: ['大眾池', '兒童戲水區', '健身房', '交誼廳']
    }
  },
  mounted() {
    this.$bus.$emit('isLoading', true)
    this.$http
      .get(`${process.env.VUE_APP_api}/facility/${this.$route.params.id}`)
      .then(res => {
        if (res.data.success) {
          console.log(res.data)
          this.show = res.data.facility.name
          this.facility = res.data.facility
        }
        this.$bus.$emit('isLoading', false)
      })
  },
  components: {
    pool,
    kid,
    gym,
    friend
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/_grid.scss';
@import '../assets/_mixin.scss';
@import '../assets/_variable.scss';
.detail {
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
