<template>
  <div class="container">
    <div class="all">
      <main class="main">
        <section class="main-primary">
          <div class="main-primary-pic1" :style="`background-image:url(${roomInfo.imageUrl[switchPic[0]]})`" @click="zoomHandler()">
            <button type="button" class="main-primary-pic1-btn" @click.stop="switchPicHandler()">
              <i class="fas fa-angle-right"></i>
            </button>
          </div>
        </section>
        <section class="main-sub">
          <div class="main-sub-pic2">
            <div class="main-sub-pic2-sub" :style="`background-image:url(${roomInfo.imageUrl[switchPic[1]]})`"></div>
          </div>
          <div class="main-sub-pic2">
            <div class="main-sub-pic2-sub" :style="`background-image:url(${roomInfo.imageUrl[switchPic[2]]})`"></div>
          </div>
        </section>
      </main>

      <section class="info">
        <header class="info-header">
          <h3 class="info-header-title">{{ roomInfo.name }}</h3>
          <div class="info-header-price">
            <h5 class="info-header-price-day">平日(一~四)價格:{{ roomInfo.normalDayPrice | currency }}</h5>
            <h5 class="info-header-price-day">假日(五~日)價格:{{ roomInfo.holidayPrice | currency }}</h5>
          </div>
        </header>
        <section class="info-main">
          <article class="info-main-detail">
            <article class="info-main-detail-describe">
              {{ roomInfo.description }}
            </article>
            <article class="info-main-detail-content">
              <p class="content">房客人數限制:{{ roomInfo.descriptionShort.GuestMax }}人</p>
              <p class="content">床型:{{ roomInfo.descriptionShort.Bed[0] }}</p>
              <p class="content">衛浴數量:{{ roomInfo.descriptionShort['Private-Bath'] }}間</p>
              <p class="content">房間大小:{{ roomInfo.descriptionShort.Footage }}平方公尺</p>
              <p class="content">入住時間:{{ roomInfo.checkInAndOut.checkInEarly }}~{{ roomInfo.checkInAndOut.checkInLate }}</p>
              <p class="content">退房時間:{{ roomInfo.checkInAndOut.checkOut }}</p>
            </article>
          </article>

          <datePicker @toggleOrder="toggleOrder" @cartHandler="cartHandler" :roomId="roomId" :error="error"></datePicker>
        </section>

        <footer class="info-footer row">
          <div class="info-footer-item col-4" v-for="(item, key, index) in roomDevice" :key="index">
            <input type="checkbox" class="info-footer-item-check" :checked="item" disabled />
            <h4 class="info-footer-item-name">{{ roomDeviceZh[key] }}</h4>
          </div>
        </footer>
      </section>
    </div>

    <h4 class="home-title">其他相關房型</h4>
    <div class="home-all row">
      <template v-for="item in roomKind">
        <figure class="home-all-item item col-md-4" v-if="item.id !== roomId && item.GuestMin === roomInfo.descriptionShort.GuestMin" :key="item.id">
          <div class="item-group" @click="roomHandler(item.id)">
            <img :src="item.imageUrl" class="item-group-pic" />
            <div class="item-group-more">
              <h4 class="item-group-more-word">See More</h4>
            </div>
          </div>
          <figcaption>
            <h4 class="item-title">{{ item.name }}</h4>
            <h4 class="item-normal">平日$ {{ item.normalDayPrice | currency }}</h4>
            <h4 class="item-holiday">假日$ {{ item.holidayPrice | currency }}</h4>
          </figcaption>
        </figure>
      </template>
    </div>

    <section class="zoom none" ref="zoom">
      <div class="zoom-pic" :style="`background-image:url(${zoomPic})`"></div>
      <button type="button" class="zoom-cancel" @click="zoomHandler()">
        <i class="fas fa-times"></i>
      </button>
    </section>
    <div class="light" ref="dark"></div>

    <section class="order none" ref="order">
      <div class="order-all">
        <header class="order-all-title">{{ roomInfo.name }}</header>
        <div class="order-all-item">
          <h4 class="order-all-item-sign">入住</h4>
          <h4 class="order-all-item-date">{{ calculate.firstDate }}星期{{ calculate.firstDay }}</h4>
          <h4 class="order-all-item-time">({{ calculate.checkInEarly }}起)</h4>
        </div>
        <div class="order-all-item">
          <h4 class="order-all-item-sign">退房</h4>
          <h4 class="order-all-item-date">{{ calculate.lastDate }}星期{{ calculate.lastDay }}</h4>
          <h4 class="order-all-item-time">({{ calculate.checkOut }}前)</h4>
        </div>
        <h4 class="order-all-sum">{{ calculate.days }}晚/{{ calculate.sum | currency }}元</h4>
        <div class="order-all-pay">
          <h3 class="order-all-pay-title">付款方式</h3>
          <div class="order-all-pay-group">
            <label class="pay" for="store">
              <input type="radio" name="pay" id="store" value="store" v-model="payKind" />
              <p class="pay-way">現場付款</p>
            </label>
            <label class="pay" for="line">
              <input type="radio" name="pay" id="line" value="line" v-model="payKind" />
              <div class="pay-pic"></div>
              <!-- <p class="pay-way">LINE PAY</p> -->
            </label>
          </div>
        </div>
        <footer class="order-all-footer">
          <button type="button" class="order-all-footer-confirm" @click="orderHandler()">
            確定
          </button>
          <!-- <div @click="mobile()">mobile</div> -->
          <button type="button" class="order-all-footer-cancel" @click="cancelOrder()">
            <i class="fas fa-times"></i>
          </button>
        </footer>
      </div>
    </section>

    <section class="cart none" ref="cart">
      <div class="cart-container">
        <h4 class="cart-container-word">商品已加入收藏!</h4>
        <button type="button" class="cart-container-confirm" @click="cartHandler()">
          確定
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import datePicker from '../components/date-picker'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
export default {
  data() {
    return {
      error: {
        switch: false,
        message: []
      },
      payKind: 'store',
      moment,
      roomId: '',
      orderInfo: {
        date: [],
        name: '',
        tel: ''
      },
      zoomPic: '',
      switchPic: [0, 1, 2],
      roomDeviceZh: {
        'Air-Conditioner': '空調',
        Breakfast: '早餐',
        'Child-Friendly': '適合兒童',
        'Great-View': '漂亮的視野',
        'Mini-Bar': 'Mini Bar',
        'Pet-Friendly': '攜帶寵物',
        Refrigerator: '冰箱',
        'Room-Service': '客房服務',
        'Smoke-Free': '禁止吸菸',
        Sofa: '沙發',
        Television: '電話',
        'Wi-Fi': 'Wi-Fi'
      },
      roomDevice: {},
      roomKind: [],
      roomInfo: {
        checkInAndOut: {},
        descriptionShort: {
          Bed: []
        },
        imageUrl: []
      },
      calculate: {},
      otherKind: []
    }
  },
  methods: {
    mobileHandler() {
      this.$bus.$emit('isLoading', true)
      this.$http
        .post(
          `https://cors-anywhere.herokuapp.com/https://sandbox-api-pay.line.me/v2/payments/request`,
          {
            amount: this.calculate.sum,
            productName: this.roomInfo.name,
            orderId: uuidv4(),
            currency: 'TWD',
            confirmUrl: process.env.VUE_APP_confirmUrl,
            productImageUrl: this.roomInfo.imageUrl[0]
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'X-LINE-ChannelId': '1653856070',
              'X-LINE-ChannelSecret': 'c048569e7ccbbf22e5dac612c47a15a9'
            },
            withCredentials: false
          }
        )
        .then(res => {
          console.log(res.data)
          location.href = res.data.info.paymentUrl.web
        })
    },
    switchPicHandler() {
      this.switchPic = this.switchPic
        .map(e => {
          return e + 1
        })
        .map(e => {
          return e === 3 ? (e = 0) : e
        })
    },
    zoomHandler() {
      this.zoomPic = this.roomInfo.imageUrl[this.switchPic[0]]
      this.toggleWindow('zoom')
    },
    orderHandler() {
      this.$bus.$emit('isLoading', true)
      this.$http
        .post(`${process.env.VUE_APP_api}/purchase`, {
          ...this.orderInfo,
          id: this.roomId
        })
        .then(res => {
          if (res.data.success) {
            //在這裡判斷是用哪種支付
            this.payKind === 'store' ? this.$router.push('/buy') : this.mobileHandler()
          } else {
            this.$router.push('/login')
          }
        })
    },
    toggleOrder(val) {
      //初始化訂單資料
      this.orderInfo = val
      //差異天數
      const diff = moment(this.orderInfo.date[1]).diff(moment(this.orderInfo.date[0]), 'days')
      //初始天
      let firstDay = this.orderInfo.date[0]
      //所有星期
      let days = [this.orderInfo.date[0]]
      for (let i = 0; i < diff; i++) {
        const result = moment(firstDay)
          .add(1, 'd')
          .format('YYYY-MM-DD')
        days.push(result)
        firstDay = result
      }
      this.orderInfo.date = days
      const { holidayPrice, normalDayPrice } = this.roomInfo
      this.$http
        .post(`${process.env.VUE_APP_api}/purchase/calculate`, {
          ...this.orderInfo,
          checkInAndOut: this.roomInfo.checkInAndOut,
          price: { holidayPrice, normalDayPrice }
        })
        .then(res => {
          if (res.data.success) {
            this.calculate = res.data
            this.error = { switch: false, message: [] }
            //彈跳視窗
            this.toggleWindow('order')
          } else {
            res.data.message === '未登入' ? this.$router.push('/login') : (this.error = { switch: true, message: res.data.message })
          }
          this.$bus.$emit('isLoading', false)
        })
    },
    cancelOrder() {
      this.calculate = {}
      this.orderInfo = {}
      this.$set(this.orderInfo, 'date', [])
      //彈跳視窗
      this.toggleWindow('order')
    },
    toggleWindow(dom) {
      this.$refs[dom].classList.toggle('none')
      this.$refs.dark.classList.toggle('dark')
    },
    updateRoom() {
      this.$bus.$emit('isLoading', true)
      this.$http.get(`${process.env.VUE_APP_api}/room/${this.roomId}`).then(res => {
        this.roomInfo = res.data.room[0]
        this.roomDevice = res.data.room[0].amenities
        this.$bus.$emit('isLoading', false)
      })
    },
    roomHandler(id) {
      this.$router.push(`/room/${id}`)
    },
    cartHandler() {
      this.toggleWindow('cart')
    }
  },
  mounted() {
    this.roomId = this.$route.params.id
    this.updateRoom()
    this.$http.get(`${process.env.VUE_APP_api}/rooms`).then(res => {
      res.data.item.forEach(e => {
        this.roomKind.push({
          id: e.id,
          ...e['rooms-detail'],
          GuestMin: e.primary.descriptionShort.GuestMin
        })
      })
    })
    this.$bus.$on('refreshRoom', roomId => {
      this.roomId = roomId
      this.updateRoom()
    })
  },
  watch: {
    $route(now) {
      this.roomId = now.params.id
      this.updateRoom()
    }
  },
  components: {
    datePicker
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/_mixin.scss';
@import '../assets/_grid.scss';
@import '../assets/_variable.scss';
@import url('https://fonts.googleapis.com/css?family=Indie+Flower&display=swap');
.all {
  padding: 0;
  position: relative;
  //transform: translateY(15%);
  margin: 50px 0;
  z-index: 15;
  @include lapTopHigh {
    display: flex;
    //transform: translateY(25%);
  }
}
.main {
  @include lapTopHigh {
    width: 100%;
  }
  position: relative;
  z-index: 20;
  width: 60%;
  margin: 0 auto;
  &-primary {
    width: 100%;
    height: 0;
    padding-bottom: 66%;
    position: relative;
    display: flex;
    flex-direction: column;
    margin-bottom: 1px;
    &-pic1 {
      @extend %bg;
      position: absolute;
      width: 100%;
      height: 100%;
      cursor: pointer;
      transition: 1s all;
      &-btn {
        outline: none;
        border: none;
        position: absolute;
        bottom: 5%;
        right: 5%;
        background-color: #f0f0f0;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        cursor: pointer;
        transition: 0.5s background-color;
        &:hover {
          background-color: darken(#f0f0f0, 10%);
        }
        i {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 25px;
          opacity: 0.4;
        }
      }
    }
  }
  &-sub {
    display: flex;
    align-items: center;
    &-pic2 {
      width: 50%;
      height: 0;
      padding-bottom: 33%;
      position: relative;
      margin: 0 1px;
      &-sub {
        @extend %bg;
        position: absolute;
        width: 100%;
        height: 100%;
        transition: 1s all;
      }
    }
  }
}
.info {
  width: 100%;
  padding: 0;
  @include lapTopHigh {
    padding: 0 0 0 30px;
    width: 150%;
  }
  &-header {
    margin: 0;
    text-align: center;
    @include lapTopHigh {
      display: flex;
      justify-content: space-between;
    }
    margin-bottom: 15px;
    &-title {
      color: $important;
      font-size: 30px;
      margin-bottom: 10px;
    }
    &-price {
      &-day {
        color: $important;
        font-weight: bold;
        font-size: 16px;
      }
    }
  }
  &-main {
    @include lapTopHigh {
      display: flex;
    }
    &-detail {
      flex-grow: 1;
      width: 100%;
      margin: 0 30px 30px 0;
      &-describe {
        text-indent: 8%;
        margin: 0 auto 15px auto;
        font-size: 16px;
        color: $word;
        font-size: 20px;
      }
      &-content {
        opacity: 0.6;
        font-size: 16px;
        p {
          margin: 0;
        }
      }
    }
  }
  &-footer {
    opacity: 0.6;
    font-size: 16px;
    margin: 20px 0;
    padding: 10px;
    border-top: 1px solid rgba(0, 0, 0, 6);
    &-item {
      display: flex;
      align-items: center;
      padding: 0;
      &-name {
        margin: 0;
      }
      &-check {
        margin-right: 5px;
      }
    }
  }
}
.zoom {
  z-index: 35;
  overflow: hidden;
  transition: 0.5s all;
  opacity: 1;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 0;
  width: 80%;
  padding-bottom: 52%;
  @include lapTopHigh {
    width: 60%;
    padding-bottom: 40%;
  }
  &-pic {
    @extend %bg;
    position: absolute;
    width: 100%;
    height: 100%;
  }
  &-cancel {
    position: absolute;
    bottom: 5%;
    right: 5%;
    background-color: #f0f0f0;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    outline: none;
    border: none;
    transition: 0.5s background-color;
    &:hover {
      background-color: darken(#f0f0f0, 10%);
    }
    i {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 25px;
      opacity: 0.4;
    }
  }
}
.none {
  opacity: 0 !important;
  z-index: -1 !important;
}
.light {
  background-color: rgba(255, 255, 255, 1);
  z-index: 10;
  transition: 0.5s all;
}
.dark {
  background-color: rgba(32, 28, 28, 0.7);
  /* @include lapTopHigh {
    background-color: rgba(255, 255, 255,0)
  } */
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 100%;
  height: 100%;
  z-index: 30;
}
.order {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 30;
  transition: 0.5s all;
  opacity: 1;
  width: 95%;
  height: 450px;
  overflow-y: auto;
  @include pad {
    width: 500px;
    height: 550px;
  }
  /* @include pad {
    width: 75%;
    padding-bottom: 55%;
  }
  @include lapTopHigh {
    width: 55%;
    padding-bottom: 35%;
  } */
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
      padding: 20px 50px;
    }
    &-title {
      width: 100%;
      text-align: center;
      font-size: 26px;
      padding-bottom: 10px;
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
      width: 100%;
      margin: 20px auto 0;
      padding: 10px;
      border-top: 2px solid black;
      font-weight: bold;
      text-align: right;
    }
    &-pay {
      width: 100%;
      margin: 0 auto;
      &-title {
        border-bottom: 1px solid rgba(0, 0, 0, 0.6);
        padding-bottom: 10px;
      }
      &-group {
        display: flex;
        align-items: center;
        .pay {
          cursor: pointer;
          display: flex;
          align-items: center;
          margin-bottom: 0;
          &-way {
            margin: 0 0 0 5px;
          }
          &-pic {
            background-image: url('../assets/line-pay3.jpg');
            @extend %bg;
            height: 100px;
            width: 170px;
            margin-left: 5px;
          }
        }
        .pay + .pay {
          margin-left: 20px;
        }
      }
    }
    &-footer {
      width: 100%;
      &-confirm {
        outline: none;
        color: white;
        background-color: $important;
        padding: 5px 20px;
        display: block;
        margin: 20px auto;
        transition: 0.5s all;
        &:hover {
          background-color: darken($important, 10%);
        }
      }
      &-cancel {
        background-color: #f0f0f0;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        outline: none;
        border: none;
        margin-left: auto;
        position: relative;
        display: block;
        transition: 0.5s background-color;
        &:hover {
          background-color: darken(#f0f0f0, 10%);
        }
        i {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 25px;
          opacity: 0.4;
        }
      }
    }
  }
}
.cart {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  z-index: 30;
  transition: 0.5s all;
  opacity: 1;
  /* height: 0;
  width: 50%;
  padding-bottom: 20%;
  @include lapTopHigh {
    width: 35%;
    padding-bottom: 5%;
  } */
  &-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    /* position: absolute;
    width: 100%;
    height: 100%; */
    width: 250px;
    padding: 20px;
    font-size: 16px;
    @include pad {
      font-size: 20px;
    }
    /* @include lapTopHigh {
      padding: 80px;
    } */
    &-word {
      margin: 0;
    }
    &-confirm {
      outline: none;
      color: white;
      background-color: $important;
      padding: 5px 20px;
      margin-top: 20px;
      transition: 0.5s all;
      &:hover {
        background-color: darken($important, 10%);
      }
    }
  }
}
.home-title {
  color: $important;
  border-bottom: 1px solid rgba(128, 128, 128, 0.6);
  padding: 10px 0;
  margin-bottom: 20px;
}
.home-all {
  /* @include lapTop {
    display: flex;
  } */
  //align-items: center;
  //width: 90%;
  /* padding: 0 50px;
  margin: auto; */
  .item {
    color: rgba(20, 5, 5, 0.5);
    margin-bottom: 20px;
    &-title {
      color: $word;
    }
    &-normal,
    &-holiday {
      opacity: 0.6;
    }
    &-group {
      position: relative;
      &:hover > .item-group-more {
        background-color: rgba(0, 0, 0, 0.5);
        height: 100%;
      }
      &-pic {
        cursor: pointer;
        /* @include lapTop {
          width: 250px;
        } */
        width: 100%;
        height: auto;
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
        cursor: pointer;
        transition: 0.5s all;
        &-word {
          padding: 5px;
        }
      }
    }
  }
}
</style>
