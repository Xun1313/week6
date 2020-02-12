<template>
  <div>
    <div class="container">
      <h3 class="order-title">恭喜你已訂房成功，以下為你的訂房資訊</h3>
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
            <td>{{ info.primary.description }}</td>
          </tr>
          <tr>
            <th>房客人數限制</th>
            <td>{{ info.primary.descriptionShort.GuestMax }}人</td>
          </tr>
          <tr>
            <th>床型</th>
            <td>{{ info.primary.descriptionShort.Bed[0] }}</td>
          </tr>
          <tr>
            <th>衛浴數量</th>
            <td>{{ info.primary.descriptionShort['Private-Bath'] }}間</td>
          </tr>
          <tr>
            <th>房間大小</th>
            <td>{{ info.primary.descriptionShort.Footage }}平方公尺</td>
          </tr>
          <tr>
            <th>checkin時間</th>
            <td>
              {{ info.primary.checkInAndOut.checkInEarly }}~{{
                info.primary.checkInAndOut.checkInLate
              }}
            </td>
          </tr>
          <tr>
            <th>checkout時間</th>
            <td>{{ info.primary.checkInAndOut.checkOut }}</td>
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
      <h4 class="home-title">其他相關房型</h4>
      <div class="home-all row">
        <template v-for="item in roomKind">
          <figure
            class="home-all-item item col-md-4"
            v-if="
              item.id !== info.id &&
                item.GuestMin === info.primary.descriptionShort.GuestMin
            "
            :key="item.id"
          >
            <div class="item-group" @click="roomHandler(item.id)">
              <img :src="item.imageUrl" class="item-group-pic" />
              <div class="item-group-more">
                <h4 class="item-group-more-word">See More</h4>
              </div>
            </div>
            <figcaption>
              <h4 class="item-title">{{ item.name }}</h4>
              <p class="item-normal">平日$ {{ item.normalDayPrice }}</p>
              <p class="item-holiday">假日$ {{ item.holidayPrice }}</p>
            </figcaption>
          </figure>
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
        'rooms-detail': {},
        primary: {
          descriptionShort: {
            Bed: []
          },
          checkInAndOut: ''
        }
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
          GuestMin: e.primary.descriptionShort.GuestMin
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
    color: $important;
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
