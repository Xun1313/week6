<template>
  <div class="room">
    <div class="nav">
      <div class="nav-group">
        <template v-for="(item, index) in roomKind">
          <div class="nav-group-item" v-if="item.id !== roomInfo.id" @click="routeRoom(item.id)">{{ item.name }}</div>
        </template>
      </div>
    </div>

    <div class="all">
      <div class="main">
        <div class="main-primary">
          <div class="main-primary-pic1" :style="`background-image:url(${roomInfo.imageUrl[switchPic[0]]})`" @click="zoomHandler()">
            <div class="main-primary-pic1-btn" @click="switchPicHandler($event)">
              <i class="fas fa-angle-right"></i>
            </div>
          </div>
        </div>
        <div class="main-sub">
          <div class="main-sub-pic2">
            <div class="main-sub-pic2-sub" :style="`background-image:url(${roomInfo.imageUrl[switchPic[1]]})`"></div>
          </div>
          <div class="main-sub-pic2">
            <div class="main-sub-pic2-sub" :style="`background-image:url(${roomInfo.imageUrl[switchPic[2]]})`"></div>
          </div>
        </div>
      </div>

      <div class="info">
        <div class="info-header">
          <div class="info-header-title">{{ roomInfo.name }}</div>
          <div class="info-header-price">
            <div class="info-header-price-day">平日(一~四)價格:{{ roomInfo.normalDayPrice }}</div>
            <div class="info-header-price-day">假日(五~日)價格:{{ roomInfo.holidayPrice }}</div>
          </div>
        </div>
        <div class="info-main">
          <div class="info-main-detail">
            <div class="info-main-detail-describe">{{ roomInfo.description }}</div>
            <div class="info-main-detail-content">
              <div class="content">房客人數限制:{{ roomInfo.descriptionShort.GuestMax }}人</div>
              <div class="content">床型:{{ roomInfo.descriptionShort.Bed[0] }}</div>
              <div class="content">衛浴數量:{{ roomInfo.descriptionShort['Private-Bath'] }}間</div>
              <div class="content">房間大小:{{ roomInfo.descriptionShort.Footage }}平方公尺</div>
              <div class="content">checkin時間:{{ roomInfo.checkInAndOut.checkInEarly }}~{{ roomInfo.checkInAndOut.checkInLate }}</div>
              <div class="content">checkout時間:{{ roomInfo.checkInAndOut.checkOut }}</div>
            </div>
          </div>

          <datePicker @toggleOrder="toggleOrder" @cartHandler="cartHandler" :roomId="roomId"></datePicker>
        </div>

        <div class="info-footer row">
          <div class="info-footer-item col-4" v-for="(key, value, index) in roomDevice" :key="value">
            <input type="checkbox" class="info-footer-item-check" :checked="key" disabled />
            <div class="info-footer-item-name">{{ value }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="home-title">其他房型</div>
      <div class="home-all">
        <template v-for="(item, index) in roomKind">
          <div class="home-all-item item" v-if="item.id !== roomId && item.GuestMin === roomInfo.descriptionShort.GuestMin">
            <div class="item-group">
              <img :src="item.imageUrl" class="item-group-pic" />
              <div class="item-group-more">
                <div class="item-group-more-word" @click="roomHandler(item.id)">See More</div>
              </div>
            </div>
            <div class="item-title">{{ item.name }}</div>
            <div class="item-normal">平日$ {{ item.normalDayPrice }}</div>
            <div class="item-holiday">假日$ {{ item.holidayPrice }}</div>
          </div>
        </template>
      </div>
    </div>

    <div class="zoom none" ref="zoom">
      <div class="zoom-pic" :style="`background-image:url(${zoomPic})`"></div>
      <div class="zoom-cancel" @click="zoomHandler()">
        <i class="fas fa-times"></i>
      </div>
    </div>
    <div class="light" ref="dark"></div>

    <div class="order none" ref="order">
      <div class="order-all">
        <div class="order-all-title">{{ roomInfo.name }}</div>
        <div class="order-all-item">
          <div class="order-all-item-sign">入住</div>
          <div class="order-all-item-date">{{ calculate.firstDate }}星期{{ calculate.firstDay }}</div>
          <div class="order-all-item-time">({{ calculate.checkInEarly }}起)</div>
        </div>
        <div class="order-all-item">
          <div class="order-all-item-sign">退房</div>
          <div class="order-all-item-date">{{ calculate.lastDate }}星期{{ calculate.lastDay }}</div>
          <div class="order-all-item-time">({{ calculate.checkOut }}前)</div>
        </div>
        <div class="order-all-sum">{{ calculate.days }}晚/{{ calculate.sum }}元</div>
        <div class="order-all-confirm" @click="orderHandler()">確定</div>
        <div class="order-all-cancel" @click="toggleOrder()">
          <i class="fas fa-times"></i>
        </div>
      </div>
    </div>

    <div class="cart none" ref="cart">
      <div class="cart-container">
        <div class="cart-container-word">商品已加入收藏!</div>
        <div class="cart-container-confirm" @click="cartHandler()">確定</div>
      </div>
    </div>
  </div>
</template>

<script>
import datePicker from '../components/date-picker';
const moment = require('moment');
export default {
  data() {
    return {
      moment: moment,
      roomId: '',
      orderInfo: {
        date: [],
        name: '',
        tel: '',
      },
      zoomPic: '',
      switchPic: [0, 1, 2],
      roomDevice: {
        空調: '',
        早餐: '',
        適合兒童: '',
        漂亮的視野: '',
        'Mini Bar': '',
        寵物攜帶: '',
        冰箱: '',
        'Room Service': '',
        禁止吸菸: '',
        沙發: '',
        電話: '',
        wifi: '',
      },
      roomKind: [],
      roomInfo: {
        checkInAndOut: {},
        descriptionShort: {
          Bed: [],
        },
        imageUrl: [],
      },
      calculate: {},
      otherKind: [],
    };
  },
  methods: {
    switchPicHandler(e) {
      e.stopPropagation();
      this.switchPic = this.switchPic
        .map(e => {
          return e + 1;
        })
        .map(e => {
          return e === 3 ? (e = 0) : (e = e);
        });
    },
    zoomHandler() {
      this.zoomPic = this.roomInfo.imageUrl[this.switchPic[0]];
      this.toggleWindow('zoom');
    },
    orderHandler() {
      /* var token = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
        console.log(token); */
      this.$bus.$emit('isLoading', true);
      this.$http
        .post(`${process.env.VUE_APP_api}/purchase`, {
          ...this.orderInfo,
          id: this.roomId,
        })
        .then(res => {
          //彈跳視窗
          res.data.success ? '' : this.$router.push('/login');
          this.toggleWindow('order');
          this.$bus.$emit('isLoading', false);
        });
    },
    toggleOrder(val) {
      //初始化訂單資料
      if (val) {
        this.orderInfo = val;
        //差異天數
        const diff = moment(this.orderInfo.date[1]).diff(moment(this.orderInfo.date[0]), 'days');
        //初始天
        let firstDay = this.orderInfo.date[0];
        //所有星期
        let days = [this.orderInfo.date[0]];
        for (let i = 0; i < diff; i++) {
          const result = moment(firstDay)
            .add(1, 'd')
            .format('YYYY-MM-DD');
          days.push(result);
          firstDay = result;
        }
        this.orderInfo.date = days;
        const { holidayPrice, normalDayPrice } = this.roomInfo;
        this.$http
          .post(`${process.env.VUE_APP_api}/purchase/calculate`, {
            date: this.orderInfo.date,
            checkInAndOut: this.roomInfo.checkInAndOut,
            price: { holidayPrice, normalDayPrice },
          })
          .then(res => {
            this.calculate = res.data;
          });
      } else {
        this.orderInfo = {};
        this.$set(this.orderInfo, 'date', []);
      }
      //彈跳視窗
      this.toggleWindow('order');
    },
    toggleWindow(dom) {
      this.$refs[dom].classList.toggle('none');
      this.$refs.dark.classList.toggle('dark');
    },
    routeRoom(val) {
      this.roomId = val;
      this.$refs.dark.classList.remove('dark');
      this.$router.push(`/room/${val}`);
      //this.$refs['nav-switch'].checked = false;
      /* this.$router.push(`/room/${val}`)
      .then(() => {
          location.reload();
        })
        .catch(err => {}); */
    },
    updateRoom() {
      this.$bus.$emit('isLoading', true);
      this.$http
        .get(`${process.env.VUE_APP_api}/room/${this.roomId}`, {
          /* headers: {
          "CSRF-Token": token
        } */
        })
        .then(res => {
          this.roomInfo = res.data.room[0];
          let sum = 0;
          for (const key in this.roomDevice) {
            this.roomDevice[key] = Object.values(res.data.room[0].amenities)[sum];
            sum++;
          }
          this.$bus.$emit('isLoading', false);
        });
    },
    roomHandler(id) {
      this.$router.push(`/room/${id}`);
    },
    cartHandler() {
      this.toggleWindow('cart');
    },
  },
  mounted() {
    //let token = document.head.querySelector('meta[name="csrf-token"]');
    this.roomId = this.$route.params.id;
    this.updateRoom();
    this.$http.get(`${process.env.VUE_APP_api}/rooms`).then(res => {
      console.log(res.data);
      res.data.item.forEach(e => {
        this.roomKind.push({
          id: e.id,
          ...e['rooms-detail'],
          GuestMin: e['room-detail'].descriptionShort.GuestMin,
        });
      });
    });
    this.$bus.$on('refreshRoom', roomId => {
      this.roomId = roomId;
      this.updateRoom();
    });
    /* this.$http.get('https://challenge.thef2e.com/api/thef2e2019/stage6/room/3Elqe8kfMxdZv5xFLV4OUeN6jhmxIvQSTyj4eTgIowfIRvF4rerA2Nuegzc2Rgwu',{
      headers:{
        Authorization:'Bearer 90jD9OF3s2JA5WZuRfcHTkHpCwAqMVv3C8m3j2J8VbhcRj7Lpn1wbNrWJZ9N',
        Accept:'application/json'
      }
    }).then(res=>{
      console.log(res.data);
    }) */
  },
  watch: {
    $route(now) {
      this.roomId = now.params.id;
      this.updateRoom();
    },
  },
  components: {
    datePicker,
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/_mixin.scss';
@import '../assets/_grid.scss';
@import url('https://fonts.googleapis.com/css?family=Indie+Flower&display=swap');
/* .room{
  min-height: 100vh;
} */
.nav {
  position: relative;
  z-index: 25;
  width: 100%;
  //background-color: #f0f0f0;
  padding: 10px 50px;
  &-group {
    display: none;
    @include lapTopHigh {
      display: flex;
      align-items: center;
    }
    padding: 30px 0 0 0;
    &-item {
      font-size: 16px;
      margin-left: 20px;
      cursor: pointer;
      transition: 0.5s all;
      &:hover {
        color: lighten(black, 50%);
      }
    }
    &-item:first-child {
      margin-left: auto;
    }
  }
  /* &-menu {
    margin-left: auto;
    display: block;
    text-align: right;
    @include lapTopHigh {
      display: none;
    }
    i {
      cursor: pointer;
    }
  } */
}
/* .menu {
  @include lapTopHigh {
    display: none;
  }
  z-index: 10;
  position: fixed;
  background-color: black;
  width: 100%;
  overflow: hidden;
  transition: 0.5s all;
  transform: translateY(-110%);
  //margin-bottom: 60px;
  &-item {
    border-bottom: 1px white solid;
    padding: 10px;
    color: white;
    cursor: pointer;
  }
} */

.all {
  padding: 0;
  position: relative;
  //transform: translateY(15%);
  margin: 50px 0;
  z-index: 15;
  @include lapTopHigh {
    display: flex;
    padding: 0 50px; //固定內縮的尺寸
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
  padding: 0 30px;
  width: 100%;
  @include lapTopHigh {
    width: 150%;
  }
  &-header {
    text-align: center;
    @include lapTopHigh {
      display: flex;
      justify-content: space-between;
    }
    margin-bottom: 15px;
    &-title {
      font-size: 30px;
      margin-bottom: 10px;
    }
    &-price {
      margin-bottom: 10px;
      &-day {
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
      }
      &-content {
        font-size: 16px;
      }
    }
  }
  &-footer {
    font-size: 16px;
    margin: 20px 0;
    padding: 10px;
    border-top: 1px solid black;
    &-item {
      display: flex;
      align-items: center;
      padding: 0;
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
  height: 0;
  width: 95%;
  padding-bottom: 100%;
  @include pad {
    width: 75%;
    padding-bottom: 55%;
  }
  @include lapTopHigh {
    width: 55%;
    padding-bottom: 35%;
  }
  &-all {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 20px;
    font-size: 16px;
    @include pad {
      font-size: 20px;
    }
    @include lapTopHigh {
      padding: 80px;
    }
    &-cancel {
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
      color: white;
      background-color: rgb(134, 78, 78);
      padding: 10px 20px;
      margin-bottom: 20px;
      cursor: pointer;
      transition: 0.5s all;
      &:hover {
        background-color: darken(rgb(134, 78, 78), 15%);
        color: darken(white, 15%);
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
    &-confirm {
      color: white;
      background-color: rgb(134, 78, 78);
      padding: 5px 15px;
      margin-top: 20px;
      cursor: pointer;
      transition: 0.5s all;
      &:hover {
        background-color: darken(rgb(134, 78, 78), 15%);
        color: darken(white, 15%);
      }
    }
  }
}
.home-title {
}
.home-all {
  @include lapTop {
    display: flex;
  }
  align-items: center;
  //width: 90%;
  /* padding: 0 50px;
  margin: auto; */
  .item {
    color: rgba(20, 5, 5, 0.5);
    padding-left: 1px;
    padding-right: 1px;
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
      &-pic {
        @include lapTop {
          width: 250px;
        }
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
        transition: 0.5s all;
        &-word {
          padding: 5px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
