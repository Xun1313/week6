<template>
  <div>
    <header class="facility-pic">
      <div class="facility-pic-bg"></div>
    </header>
    <div class="container">
      <article>
        <h3 class="facility-title-other">設施介紹</h3>
        <p class="facility-introduce">
          在炎炎夏日的您不僅游泳，還可以運動健身、更可以全家大小享受悠閒的水上活動樂趣。戶外35米舒適的游泳池有樹蔭保護，使你不受炙陽酷曬。
        </p>
      </article>
      <div class="row">
        <div class="col-md-6 item" v-for="item in facility" :key="item.id">
          <div class="facility-item" @click="routeHandler(item.id)">
            <div
              class="facility-item-pic"
              :style="`background-image:url(${item.pic})`"
            ></div>
            <article class="facility-item-content">
              <h4 class="facility-item-content-title">{{ item.name }}</h4>
              <h4 class="facility-item-content-word">{{ item.content }}</h4>
            </article>
            <router-link :to="`/facility/${item.id}`" class="facility-item-more"
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
      facility: []
    }
  },
  methods: {
    routeHandler(id) {
      this.$router.push(`/facility/${id}`)
    }
  },
  mounted() {
    this.$bus.$emit('isLoading', true)
    this.$http.get(`${process.env.VUE_APP_api}/facility`).then(res => {
      if (res.data.success) {
        this.facility = res.data.facility
      }
      this.$bus.$emit('isLoading', false)
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/_grid.scss';
@import '../assets/_mixin.scss';
@import '../assets/_variable.scss';
.facility {
  &-pic {
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
  }
  &-introduce {
    text-align: center;
    opacity: 0.7;
    margin-bottom: 50px;
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
  &-item {
    position: relative;
    height: 100%;
    transition: 0.3s all;
    cursor: pointer;
    &:hover {
      box-shadow: 0px 0px 15px 0px grey;
    }
    &-pic {
      @extend %bg;
      width: 100%;
      height: 300px;
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
        font-weight: normal;
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
        background-color: darken($important, 10%);
      }
    }
  }
}
.item {
  margin-bottom: 30px;
}
</style>
