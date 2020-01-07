<template>
  <div class="order container">
    <div class="order-title">恭喜你已訂房成功，以下為你的訂房資訊</div>
    <div class="order-all">
      <div class="order-all-title">{{ calculate.name }}</div>
      <div class="order-all-item">
        <div class="order-all-item-sign">入住</div>
        <div class="order-all-item-date">
          {{ calculate.firstDate }}星期{{ calculate.firstDay }}
        </div>
        <div class="order-all-item-time">({{ calculate.checkInEarly }}起)</div>
      </div>
      <div class="order-all-item">
        <div class="order-all-item-sign">退房</div>
        <div class="order-all-item-date">
          {{ calculate.lastDate }}星期{{ calculate.lastDay }}
        </div>
        <div class="order-all-item-time">({{ calculate.checkOut }}前)</div>
      </div>
      <div class="order-all-sum">
        {{ calculate.days }}晚/{{ calculate.sum }}元
      </div>
      <button type="button" class="order-all-confirm" @click="routeHandler()">
        回首頁
      </button>
      <!-- <div class="order-all-cancel">
        <i class="fas fa-times"></i>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      calculate: {}
    }
  },
  methods: {
    routeHandler() {
      this.$router.push('/')
    }
  },
  mounted() {
    this.calculate = this.$route.params
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/_grid.scss';
@import '../assets/_variable.scss';
.order {
  &-title {
    text-align: center;
    margin: 30px 0;
  }
  &-all {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    /* position: absolute;
    width: 100%;
    height: 100%; */
    padding: 20px;
    font-size: 16px;
    @include pad {
      font-size: 20px;
    }
    @include lapTopHigh {
      padding: 20px 80px;
    }
    &-title {
      width: 100%;
      text-align: center;
      font-size: 30px;
      padding: 10px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.6);
      margin-bottom: 20px;
    }
    &-item {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
      //text-align: center;
      &-sign {
        outline: 1px solid rgb(134, 78, 78);
        padding: 5px 20px;
        @include phone {
          padding: 5px 10px;
        }
        font-size: 16px;
        margin-right: 10px;
        white-space: nowrap;
      }
      &-date {
        margin-right: 10px;
        white-space: nowrap;
        @include phone {
          margin-right: 5px;
        }
      }
      &-time {
        white-space: nowrap;
      }
    }
    &-sum {
      width: 60%;
      @include phone {
        width: 90%;
      }
      margin: 20px auto 0 auto;
      padding: 10px;
      border-top: 2px solid black;
      font-weight: bold;
      text-align: right;
    }
    &-confirm {
      outline: none;
      color: white;
      background-color: $important;
      padding: 5px 20px;
      margin-bottom: 20px;
      transition: 0.5s all;
      &:hover {
        background-color: white;
        color: $important;
      }
    }
  }
}
</style>
