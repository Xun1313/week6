<template>
  <div>
    <!-- <div class="order container">
      <div class="order-title">恭喜你已訂房成功，以下為你的訂房資訊</div>
      <div class="order-all">
        <div class="order-all-title">{{ info['rooms-detail'].name }}</div>
        <div class="order-all-item">
          <div class="order-all-item-sign">入住</div>
          <div class="order-all-item-date">{{ calc.firstDate }}星期{{ calc.firstDay }}</div>
          <div class="order-all-item-time">({{ calc.checkInEarly }}起)</div>
        </div>
        <div class="order-all-item">
          <div class="order-all-item-sign">退房</div>
          <div class="order-all-item-date">{{ calc.lastDate }}星期{{ calc.lastDay }}</div>
          <div class="order-all-item-time">({{ calc.checkOut }}前)</div>
        </div>

        <div class="order-all-item">
          <div class="order-all-item-sign">房型說明</div>
          <span>{{ info['room-detail'].description }}</span>
        </div>

        <div class="order-all-item">
          <div class="order-all-item-sign">房客人數限制</div>
          <span>{{ info['room-detail'].descriptionShort.GuestMax }}人</span>
        </div>

        <div class="order-all-item">
          <div class="order-all-item-sign">床型</div>
          <span>{{ info['room-detail'].descriptionShort.Bed[0] }}</span>
        </div>

        <div class="order-all-item">
          <div class="order-all-item-sign">衛浴數量</div>
          <span>{{ info['room-detail'].descriptionShort['Private-Bath'] }}間</span>
        </div>

        <div class="order-all-item">
          <div class="order-all-item-sign">房間大小</div>
          <span>{{ info['room-detail'].descriptionShort.Footage }}平方公尺</span>
        </div>

        <div class="order-all-item">
          <div class="order-all-item-sign">checkin時間</div>
          <span>{{ info['room-detail'].checkInAndOut.checkInEarly }}~{{ info['room-detail'].checkInAndOut.checkInLate }}</span>
        </div>

        <div class="order-all-item">
          <div class="order-all-item-sign">checkout時間</div>
          <span>{{ info['room-detail'].checkInAndOut.checkOut }}</span>
        </div>

        <div class="order-all-sum">{{ calc.days }}晚/{{ calc.sum }}元</div>
        <button type="button" class="order-all-confirm" @click="routeHandler()">
          回首頁
        </button>
      </div>
    </div> -->
    <div class="container">
      <div class="order-title">恭喜你已訂房成功，以下為你的訂房資訊</div>
      <!-- <div class="order-all-title">{{ info['rooms-detail'].name }}</div> -->
      <table class="table">
        <tbody>
          <tr>
            <th>入住</th>
            <td>
              {{ calc.firstDate }}星期{{ calc.firstDay }} ({{
                calc.checkInEarly
              }}起)
            </td>
          </tr>
          <tr>
            <th>退房</th>
            <td>
              {{ calc.lastDate }}星期{{ calc.lastDay }} ({{ calc.checkOut }}前)
            </td>
          </tr>
          <tr>
            <th>房型名稱</th>
            <td>{{ info['rooms-detail'].name }}</td>
          </tr>
          <tr>
            <th>房型說明</th>
            <td>{{ info['room-detail'].description }}</td>
          </tr>
          <tr>
            <th>房客人數限制</th>
            <td>{{ info['room-detail'].descriptionShort.GuestMax }}人</td>
          </tr>
          <tr>
            <th>床型</th>
            <td>{{ info['room-detail'].descriptionShort.Bed[0] }}</td>
          </tr>
          <tr>
            <th>衛浴數量</th>
            <td>
              {{ info['room-detail'].descriptionShort['Private-Bath'] }}間
            </td>
          </tr>
          <tr>
            <th>房間大小</th>
            <td>{{ info['room-detail'].descriptionShort.Footage }}平方公尺</td>
          </tr>
          <tr>
            <th>checkin時間</th>
            <td>
              {{ info['room-detail'].checkInAndOut.checkInEarly }}~{{
                info['room-detail'].checkInAndOut.checkInLate
              }}
            </td>
          </tr>
          <tr>
            <th>checkout時間</th>
            <td>{{ info['room-detail'].checkInAndOut.checkOut }}</td>
          </tr>
          <tr>
            <th colspan="2" class="order-sum">
              {{ calc.days }}晚/{{ calc.sum }}元
            </th>
          </tr>
        </tbody>
      </table>
      <button type="button" class="order-all-confirm" @click="routeHandler()">
        回首頁
      </button>
      <div class="home-title">其他相關房型</div>
      <div class="home-all row">
        <template v-for="item in roomKind">
          <div
            class="home-all-item item col-md-4"
            v-if="
              item.id !== info.id &&
                item.GuestMin === info['room-detail'].descriptionShort.GuestMin
            "
            :key="item.id"
          >
            <div class="item-group" @click="roomHandler(item.id)">
              <img :src="item.imageUrl" class="item-group-pic" />
              <div class="item-group-more">
                <div class="item-group-more-word">See More</div>
              </div>
            </div>
            <div class="item-title">{{ item.name }}</div>
            <div class="item-normal">平日$ {{ item.normalDayPrice }}</div>
            <div class="item-holiday">假日$ {{ item.holidayPrice }}</div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {
        'room-detail': {
          descriptionShort: {
            Bed: ''
          },
          checkInAndOut: {}
        },
        'rooms-detail': {}
      },
      calc: {},
      roomKind: []
    }
  },
  methods: {
    routeHandler() {
      this.$router.push('/')
    },
    roomHandler(id) {
      this.$router.push(`/room/${id}`)
    }
  },
  mounted() {
    this.$bus.$emit('isLoading', false)
    this.$http.get(`${process.env.VUE_APP_api}/purchase/last`).then(res => {
      if (res.data.success) {
        this.info = res.data.content
        this.calc = res.data.calculate
      }
      this.$bus.$emit('isLoading', false)
    })
    this.$http.get(`${process.env.VUE_APP_api}/rooms`).then(res => {
      console.log(res.data)
      res.data.item.forEach(e => {
        this.roomKind.push({
          id: e.id,
          ...e['rooms-detail'],
          GuestMin: e['room-detail'].descriptionShort.GuestMin
        })
      })
      this.$bus.$emit('isLoading', false)
    })
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/_grid.scss';
@import '../assets/_variable.scss';
th,
td {
  vertical-align: middle;
}
th {
  color: $important;
  width: 15%;
}
td {
  font-size: 16px;
}
.order-sum {
  text-align: right;
}
.order {
  &-title {
    text-align: center;
    margin: 30px 0;
  }
  &-all {
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; */
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
      //justify-content: center;
      //align-items: center;
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
      margin: 0 auto 20px;
      display: block;
      transition: 0.5s all;
      &:hover {
        background-color: white;
        color: $important;
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
