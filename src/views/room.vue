<template>
  <div class="room">
    <div class="nav">
      <div class="nav-title">WHITE INN</div>
      <div class="nav-group">
        <template v-for="(item,value) in roomKind">
          <div
            class="nav-group-item"
            v-if="value!==roomInfo.name"
            @click="routeRoom(item)"
          >{{value}}</div>
        </template>
      </div>
      <label class="nav-menu" for="nav-switch">
        <i class="fas fa-bars"></i>
      </label>
    </div>
    <input type="checkbox" id="nav-switch" />
    <div class="menu">
      <div
        class="menu-item"
        v-for="(item,value) in roomKind"
        :key="item"
        @click="routeRoom(item)"
      >{{value}}</div>
    </div>

    <div class="all">
      <div class="main">
        <div class="main-primary">
          <div
            class="main-primary-pic1"
            :style="`background-image:url(${roomInfo.imageUrl[switchPic[0]]})`"
            @click="zoomHandler()"
          >
            <div class="main-primary-pic1-btn" @click="switchPicHandler($event)">
              <i class="fas fa-angle-right"></i>
            </div>
          </div>
        </div>
        <div class="main-sub">
          <div class="main-sub-pic2">
            <div
              class="main-sub-pic2-sub"
              :style="`background-image:url(${roomInfo.imageUrl[switchPic[1]]})`"
            ></div>
          </div>
          <div class="main-sub-pic2">
            <div
              class="main-sub-pic2-sub"
              :style="`background-image:url(${roomInfo.imageUrl[switchPic[2]]})`"
            ></div>
          </div>
        </div>
      </div>

      <div class="info">
        <div class="info-header">
          <div class="info-header-title">{{roomInfo.name}}</div>
          <div class="info-header-price">
            <div class="info-header-price-day">平日(一~四)價格:{{roomInfo.normalDayPrice}}</div>
            <div class="info-header-price-day">假日(五~日)價格:{{roomInfo.holidayPrice}}</div>
          </div>
        </div>
        <div class="info-main">
          <div class="info-main-detail">
            <div class="info-main-detail-describe">{{roomInfo.description}}</div>
            <div class="info-main-detail-content">
              <div class="content">房客人數限制:{{roomInfo.descriptionShort.GuestMax}}人</div>
              <div class="content">床型:{{roomInfo.descriptionShort.Bed[0]}}</div>
              <div class="content">衛浴數量:{{roomInfo.descriptionShort['Private-Bath']}}間</div>
              <div class="content">房間大小:{{roomInfo.descriptionShort.Footage}}平方公尺</div>
              <div
                class="content"
              >checkin時間:{{roomInfo.checkInAndOut.checkInEarly}}~{{roomInfo.checkInAndOut.checkInLate}}</div>
              <div class="content">checkout時間:{{roomInfo.checkInAndOut.checkOut}}</div>
            </div>
          </div>

          <datePicker @toggleOrder="toggleOrder"></datePicker>
        </div>

        <div class="info-footer row">
          <div class="info-footer-item col-4" v-for="(key,value,index) in roomDevice" :key="value">
            <input type="checkbox" class="info-footer-item-check" :checked="key" disabled />
            <div class="info-footer-item-name">{{value}}</div>
          </div>
        </div>
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
        <div class="order-all-title">{{roomInfo.name}}</div>
        <div class="order-all-item">
          <div class="order-all-item-sign">入住</div>
          <div class="order-all-item-date">{{orderInfo.date[0]}}星期{{changeDay(0)}}</div>
          <div class="order-all-item-time">({{roomInfo.checkInAndOut.checkInEarly}}起)</div>
        </div>
        <div class="order-all-item">
          <div class="order-all-item-sign">退房</div>
          <div
            class="order-all-item-date"
          >{{orderInfo.date[orderInfo.date.length-1]}}星期{{changeDay(orderInfo.date.length-1)}}</div>
          <div class="order-all-item-time">({{roomInfo.checkInAndOut.checkOut}}前)</div>
        </div>
        <div class="order-all-sum">{{orderInfo.date.length}}晚/{{price}}元</div>
        <div class="order-all-confirm" @click="orderHandler()">確定</div>
        <div class="order-all-cancel" @click="toggleOrder()">
          <i class="fas fa-times"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import datePicker from "../components/date-picker";
const moment = require("moment");
export default {
  data() {
    return {
      moment: moment,
      orderInfo: {
        date: []
      },
      zoomPic: "",
      switchPic: [0, 1, 2],
      roomDevice: {
        空調: "",
        早餐: "",
        適合兒童: "",
        漂亮的視野: "",
        "Mini Bar": "",
        寵物攜帶: "",
        冰箱: "",
        "Room Service": "",
        禁止吸菸: "",
        沙發: "",
        電話: "",
        wifi: ""
      },
      /* roomKind: {
        "Single Room":'',
        "Deluxe Single Room":'',
        "Double Room":'',
        "Deluxe Double Room":'',
        "Twin Room":'',
        "Deluxe Twin Room":''
      }, */
      roomKind: {},
      roomInfo: {
        checkInAndOut: {},
        descriptionShort: {
          Bed: []
        },
        imageUrl: []
      }
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
      this.$refs.zoom.classList.toggle("none");
      this.$refs.dark.classList.toggle("dark");
    },
    orderHandler() {
      /* var token = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
        console.log(token); */
      this.$http
        .post(
          `${process.env.VUE_APP_api}/room/${this.roomId}`,
          {
            ...this.orderInfo
          },
          /* {
            credentials: 'same-origin',
            headers: {
              "CSRF-Token": token
            }
          } */
        )
        .then(res => {
          console.log(res);
          //彈跳視窗
          this.orderWindow();
        });
    },
    toggleOrder(val) {
      //初始化訂單資料
      if (val) {
        this.orderInfo = val;
      } else {
        this.orderInfo = {};
        this.$set(this.orderInfo, "date", []);
      }
      //彈跳視窗
      this.orderWindow();
    },
    orderWindow() {
      this.$refs.order.classList.toggle("none");
      this.$refs.dark.classList.toggle("dark");
    },
    routeRoom(val) {
      this.$router
        .push(`/room/${val}`)
        .then(() => {
          location.reload();
        })
        .catch(err => {});
    },
    changeDay(val) {
      switch (new Date(this.orderInfo.date[val]).getDay()) {
        case 0:
          return "日";
          break;
        case 1:
          return "一";
          break;
        case 2:
          return "二";
          break;
        case 3:
          return "三";
          break;
        case 4:
          return "四";
          break;
        case 5:
          return "五";
          break;
        case 6:
          return "六";
          break;
        default:
          break;
      }
    }
  },
  computed: {
    price() {
      //差異天數
      const diff = moment(this.orderInfo.date[1]).diff(
        moment(this.orderInfo.date[0]),
        "days"
      );
      //初始天
      let firstDay = this.orderInfo.date[0];
      //所有星期
      let days = [this.orderInfo.date[0]];
      for (let i = 0; i < diff; i++) {
        const result = moment(firstDay)
          .add(1, "d")
          .format("YYYY-MM-DD");
        days.push(result);
        firstDay = result;
      }
      this.orderInfo.date = days;
      //所有的價格
      let all = [];
      days.forEach((e, i) => {
        const day = new Date(days[i]).getDay();
        if (day >= 1 && day <= 4) {
          all.push(this.roomInfo.normalDayPrice);
        } else {
          all.push(this.roomInfo.holidayPrice);
        }
      });
      const sum = all.reduce((prev, next) => {
        return prev + next;
      }, 0);
      return sum;
    }
  },
  mounted() {
    //let token = document.head.querySelector('meta[name="csrf-token"]');
    this.roomId = this.$route.params.id;
    this.$http
      .get(`${process.env.VUE_APP_api}/room/${this.roomId}`, {
        /* headers: {
          "CSRF-Token": token
        } */
      })
      .then(res => {
        console.log(res);
        this.roomInfo = res.data.room[0];
        let sum = 0;
        for (const key in this.roomDevice) {
          this.roomDevice[key] = Object.values(res.data.room[0].amenities)[sum];
          sum++;
        }
      });
    this.$http
      .get(`${process.env.VUE_APP_api}/rooms`, {
        /* headers: {
          "CSRF-Token": token
        } */
      })
      .then(res => {
        res.data.item.forEach(e => {
          this.$set(this.roomKind, e.name, e.id);
        });
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
  components: {
    datePicker
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/_mixin.scss";
@import "../assets/_grid.scss";
/* .room{
  min-height: 100vh;
} */
.nav {
  position: fixed;
  z-index: 20;
  width: 100%;
  background-color: #f0f0f0;
  padding: 10px 50px;
  &-title {
    font-size: 30px;
  }
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
  &-menu {
    margin-left: auto;
    display: block;
    text-align: right;
    @include lapTopHigh {
      display: none;
    }
    i {
      cursor: pointer;
    }
  }
}
.menu {
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
}
#nav-switch {
  display: none;
  &:checked ~ .menu {
    z-index: 25;
    transform: translateY(105px);
  }
}

.all {
  padding: 0;
  position: relative;
  transform: translateY(15%);
  z-index: 15;
  @include lapTopHigh {
    display: flex;
    padding: 0 50px; //固定內縮的尺寸
    transform: translateY(25%);
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
  padding: 0 0 0 30px;
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
    margin: 0;
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
  z-index: 30;
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
  z-index: 10 !important;
}
.light {
  background-color: rgba(255, 255, 255, 1);
  z-index: 10;
  transition: 0.5s all;
}
.dark {
  background-color: rgba(32, 28, 28, 0.7);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 100%;
  height: 100%;
  z-index: 25;
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
</style>
