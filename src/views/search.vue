<template>
  <div>
    <h2 class="title">搜尋結果</h2>
    <div class="search container">
      <table class="table table-striped">
        <tbody>
          <tr class="item" v-for="item in filterRooms" :key="item.name" @click="routeRoom(item.id)">
            <td class="item-img">
              <div class="item-img-container">
                <div class="item-img-container-bg" :style="`background-image:url(${item.imageUrl})`"></div>
              </div>
            </td>
            <td class="item-all">
              <article class="all">
                <h4 class="all-primary">{{ item.name }}</h4>
                <div class="all-secondary">
                  <p class="all-secondary-description">
                    {{ item.description }}
                  </p>
                  <aside class="all-secondary-detail">
                    <!-- <div class="all-secondary-detail-cart" @click="deleteCollection($event, item.id)">
                    <i class="fas fa-ban"></i>
                    <span>取消收藏</span>
                  </div> -->
                    <div>
                      <div class="all-secondary-detail-number">
                        <i class="fas fa-male icon" v-for="guest in item.guest" :key="guest + item.name"></i>
                        <p class="people">x{{ item.guest }}</p>
                      </div>
                      <div class="all-secondary-detail-price">
                        <p class="two">平日:${{ item.normalDayPrice | currency }}</p>
                        <p class="two">假日:${{ item.holidayPrice | currency }}</p>
                      </div>
                    </div>
                  </aside>
                </div>
              </article>
            </td>
          </tr>
        </tbody>
      </table>
      <section class="picker">
        <label class="picker-group-item" id="picker-in">
          <h4 class="picker-group-item-title">入住時間</h4>
          <Datepicker
            v-model="first.date"
            :disabled-dates="first.disabledDates"
            @selected="firstHandler"
            :wrapper-class="'search-picker'"
            :input-class="'search-picker-input'"
            :id="'picker-in'"
            :format="'yyyy-MM-dd'"
            :language="zh"
          ></Datepicker>
        </label>
        <label class="picker-group-item" id="picker-out">
          <h4 class="picker-group-item-title">退房時間</h4>
          <Datepicker v-model="end.date" :disabled-dates="end.disabledDates" :format="'yyyy-MM-dd'" :wrapper-class="'search-picker'" :input-class="'search-picker-input'" :id="'picker-out'" :language="zh"></Datepicker>
        </label>

        <div class="picker-group-item">
          <h4 class="picker-group-item-title">大人</h4>
          <select v-model="adult">
            <option :value="item" v-for="item in 4" :key="item + '大人'">{{ item }}</option>
          </select>
        </div>
        <div class="picker-group-item">
          <h4 class="picker-group-item-title">小孩</h4>
          <select v-model="kid">
            <option :value="item - 1" v-for="item in 5" :key="item - 1 + '小孩'">{{ item - 1 }}</option>
          </select>
        </div>
        <a href="#" class="picker-book" @click="searchHandler($event)">search</a>
      </section>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Datepicker from 'vuejs-datepicker'
import { zh } from 'vuejs-datepicker/dist/locale'
export default {
  data() {
    return {
      rooms: [],
      adult: 1,
      kid: 0,
      first: {
        date: '',
        disabledDates: {
          to: ''
        }
      },
      end: {
        date: '',
        disabledDates: {
          to: new Date()
        }
      },
      zh,
      moment
    }
  },
  methods: {
    firstHandler(val) {
      const date = new Date(val)
      const date2 = new Date(val)
      date.setDate(val.getDate() + 1)
      this.end.disabledDates.to = date
      date2.setDate(val.getDate() + 1)
      this.end.date = date2
    },
    routeRoom(id) {
      this.$router.push(`/room/${id}`)
    },
    searchHandler(e) {
      this.$bus.$emit('isLoading', true)
      e.preventDefault()
      const start = moment(this.first.date).format('YYYY-MM-DD')
      const end = moment(this.end.date).format('YYYY-MM-DD')
      /* let obj = {}
      this.$router.push({
        query: Object.assign({}, this.$route.query, obj)
      }) */
      /* this.$route.query.adult=3
      this.$route.query.kid=3
      this.$route.query.start=start
      this.$route.query.end=end */

      this.$router.push({
        path: 'search',
        query: {
          adult: this.adult,
          kid: this.kid,
          start,
          end
        }
      })
      this.$bus.$emit('isLoading', false)
    }
  },
  computed: {
    filterRooms() {
      const { adult, kid } = this.$route.query
      const sum = adult * 1 + kid * 1
      const people = { 1: 1, 2: 2, 3: 4, 4: 4 }
      if (people[sum]) {
        return this.rooms.filter(e => {
          return e.guest <= people[sum]
        })
      } else {
        return this.rooms
      }
    }
  },
  mounted() {
    this.$bus.$emit('isLoading', true)
    const { adult, kid, start, end } = this.$route.query
    const date = new Date()
    date.setDate(date.getDate() - 1)
    this.first.disabledDates.to = date
    this.first.date = new Date(start)
    this.end.date = new Date(end)
    this.adult = adult
    this.kid = kid

    /* const date2 = new Date()
    date2.setDate(date2.getDate() + 1)
    this.end.date = date2 */

    this.$http.get(`${process.env.VUE_APP_api}/rooms`).then(res => {
      res.data.item.forEach(e => {
        this.rooms.push({
          id: e.id,
          ...e['rooms-detail'],
          guest: e['primary'].descriptionShort.GuestMax,
          description: e['primary'].description
        })
      })
      this.$bus.$emit('isLoading', false)
    })
  },
  components: {
    Datepicker
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/_mixin.scss';
@import '../assets/_grid.scss';
@import '../assets/_variable.scss';
.search {
  @include lapTopHigh {
    display: flex;
  }
  .picker {
    @include lapTopHigh {
      width: 315px;
      margin: 20px 0 0 30px;
    }
    margin: 20px 0 0;
    width: 100%;
    padding: 30px;
    outline: 1px solid rgba(0, 0, 0, 0.1);
    padding: 20px;
    &-group {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      &-item {
        width: 100%;
        margin-bottom: 15px;
        &-title {
          //color: white;
          opacity: 0.8;
        }
        &-time {
          padding: 5px;
          cursor: pointer;
          margin: 0;
          border: 1px solid rgba(0, 0, 0, 0.2);
          opacity: 0.7;
        }
        &:last-child {
          margin-left: 15px;
        }
        select {
          display: block;
          width: 100%;
          opacity: 0.5;
        }
      }
    }
    &-book {
      text-decoration: none;
      color: white;
      background-color: $important;
      text-align: center;
      padding: 5px 0;
      width: 100px;
      margin-left: auto;
      display: block;
      transition: 0.5s all;
      &:hover {
        background-color: darken($important, 10%);
      }
    }
  }
}
.title {
  color: $important;
  margin: 30px auto 0 auto;
  text-align: center;
  padding: 10px 0;
  border-bottom: 1px solid rgba(128, 128, 128, 0.6);
  width: 250px;
}
.table {
  //width: 95%;
  width: 100%;
  margin-top: 20px !important;
  /* @include lapTop {
    width: 80%;
  } */
  margin: auto;
  margin-bottom: 50px;
}
.item {
  cursor: pointer;
  transition: 0.5s all;
  &:hover {
    box-shadow: 0px 0px 10px 1px grey;
  }
  &-img {
    &-container {
      width: 100%;
      height: 0;
      padding-bottom: 73.4%;
      /* @include pad {
        padding-bottom: 20%;
      } */
      position: relative;
      &-bg {
        @extend %bg;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
}
.all {
  &-primary {
    text-align: left;
    font-size: 20px;
    @include pad {
      font-size: 24px;
    }
  }
  &-secondary {
    &-description {
      display: -webkit-box;
      max-width: 400px;
      //height: 109.2px;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
      text-indent: 10%;
      margin: 15px 5px;
      opacity: 0.6;
    }
    &-detail {
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      position: relative;
      &-cart {
        display: flex;
        align-items: center;
        color: red;
        position: absolute;
        right: 85px;
        cursor: pointer;
        transition: 0.5s all;
        &:hover {
          color: darken(red, 15%);
        }
      }
      &-number {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .icon {
          color: $important;
          font-size: 40px;
          margin-right: 10px;
        }
        .people {
          font-size: 20px;
        }
      }
      &-price {
        .two {
          white-space: nowrap;
          text-align: right;
          font-size: 16px;
        }
      }
    }
  }
}
.empty {
  opacity: 0.6;
  padding: 30px;
  font-size: 40px;
}
th,
td {
  vertical-align: top;
  text-align: center;
  font-size: 16px;
  padding: 10px;
  /* &:nth-child(1) {
    width: 20%;
    @include lapTop {
      width: 10%;
    }
  }
  &:nth-child(n + 2) {
    width: 28%;
  } */
  &:nth-child(1) {
    width: 1%;
    /* @include lapTop {
      width: 5%;
    }
    @include lapTopHigh {
      width: 1%;
    } */
  }
  &:nth-child(n + 2) {
    width: 1%;
    @include lapTopHigh {
      width: 2%;
    }
  }
}
</style>

<style lang="scss">
.search-picker {
  &-input {
    display: block;
    cursor: pointer;
    opacity: 0.5;
    overflow: hidden;
    padding: 0 0 0 5px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    outline: none;
  }
}
</style>
