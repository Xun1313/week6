<template>
  <div>
    <div class="title">購買紀錄</div>
    <table class="table table-striped">
      <!-- <thead>
      <tr>
        <th></th>
        <th>房型</th>
        <th>人數</th>
        <th>價格</th>
      </tr>
    </thead> -->
      <tbody v-if="purchase.length > 0">
        <tr class="item" v-for="(item, index) in purchase" :key="item.room.id + index">
          <td class="item-img">
            <div class="item-img-container">
              <div class="item-img-container-bg" :style="`background-image:url(${item.room['rooms-detail'].imageUrl})`"></div>
            </div>
          </td>
          <td class="item-all">
            <div class="all">
              <div class="all-primary">{{ item.room['rooms-detail'].name }}</div>
              <div class="all-secondary">
                <div class="all-secondary-item">
                  <div class="all-secondary-item-sign">入住</div>
                  <div class="all-secondary-item-date">{{ item.user.firstDate }}星期{{ item.user.firstDay }}</div>
                  <div class="all-secondary-item-time">({{ item.user.checkInEarly }}起)</div>
                </div>
                <div class="all-secondary-item">
                  <div class="all-secondary-item-sign">退房</div>
                  <div class="all-secondary-item-date">{{ item.user.lastDate }}星期{{ item.user.lastDay }}</div>
                  <div class="all-secondary-item-time">({{ item.user.checkOut }}前)</div>
                </div>
                <div class="all-secondary-sum">{{ item.user.days }}晚/{{ item.user.sum }}元</div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td class="empty">尚無購買紀錄</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      purchase: [],
    };
  },
  methods: {
    updateData() {},
  },
  mounted() {
    this.$bus.$emit('isLoading', true);
    this.$http.get(`${process.env.VUE_APP_api}/purchase`).then(res => {
      res.data.success ? (this.purchase = res.data.purchase) : '';
      this.$bus.$emit('isLoading', false);
    });
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/_mixin.scss';
@import '../assets/_grid.scss';
@import '../assets/_variable.scss';
.title {
  color: $important;
  margin: 30px auto 0 auto;
  text-align: center;
  padding: 10px 0;
  border-bottom: 1px solid rgba(128, 128, 128, 0.6);
  width: 250px;
}
.table {
  width: 95%;
  margin-top: 30px !important;
  @include lapTop {
    width: 80%;
  }
  margin: auto;
}
.item {
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 15px;
    font-size: 16px;
    &-item {
      display: flex;
      flex-direction: column;
      @include pad {
        flex-direction: row;
      }
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
      //text-align: center;
      * {
        margin-bottom: 5px;
      }
      &-sign {
        outline: 1px solid rgb(134, 78, 78);
        font-size: 16px;
        padding: 5px 10px;
        margin-right: auto;
        @include pad {
          padding: 5px 20px;
          margin-right: 10px;
        }
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
        margin-right: auto;
      }
    }
    &-sum {
      width: 100%;
      margin: 20px auto 0 auto;
      padding: 10px;
      border-top: 2px solid black;
      font-weight: bold;
      text-align: right;
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
  vertical-align: middle;
  text-align: center;
  font-size: 16px;
  padding: 10px;
  &:nth-child(1) {
    width: 15%;
    @include lapTop {
      width: 5%;
    }
    @include lapTopHigh {
      width: 1%;
    }
  }
  &:nth-child(n + 2) {
    width: 1%;
  }
  /* &:nth-child(1) {
    width: 20%;
    @include lapTop {
      width: 10%;
    }
  }
  &:nth-child(n + 2) {
    width: 28%;
  } */
}
</style>
