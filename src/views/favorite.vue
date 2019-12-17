<template>
  <div>
    <div class="title">收藏</div>
    <table class="table table-striped">
      <!-- <thead>
      <tr>
        <th></th>
        <th>房型</th>
        <th>人數</th>
        <th>價格</th>
      </tr>
    </thead> -->
      <tbody v-if="rooms.length > 0">
        <tr class="item" v-for="item in rooms" :key="item.name" @click="routeRoom(item.id)">
          <td class="item-img">
            <div class="item-img-container">
              <div class="item-img-container-bg" :style="`background-image:url(${item.imageUrl})`"></div>
            </div>
          </td>
          <td class="item-all">
            <div class="all">
              <div class="all-primary">{{ item.name }}</div>
              <div class="all-secondary">
                <div class="all-secondary-description">{{ item.description }}</div>
                <div class="all-secondary-detail">
                  <div class="all-secondary-detail-cart" @click="deleteCollection($event, item.id)">
                    <i class="fas fa-ban"></i>
                    <span>取消收藏</span>
                  </div>
                  <div>
                    <div class="all-secondary-detail-number">
                      <i class="fas fa-male icon" v-for="guest in item.guest" :key="guest + item.name"></i>
                      <div class="people">x{{ item.guest }}</div>
                    </div>
                    <div class="all-secondary-detail-price">
                      <div class="two">平日:${{ item.normalDayPrice }}</div>
                      <div class="two">假日:${{ item.holidayPrice }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td class="empty">尚無收藏</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rooms: [],
    };
  },
  methods: {
    routeRoom(id) {
      this.$router.push(`/room/${id}`);
    },
    deleteCollection(e, id) {
      e.stopPropagation();
      this.$http.delete(`${process.env.VUE_APP_api}/favorite/${id}`).then(res => {
        this.getCollection();
      });
    },
    getCollection() {
      this.$bus.$emit('isLoading', true);
      this.$http.get(`${process.env.VUE_APP_api}/favorite`).then(res => {
        if (res.data.success) {
          this.rooms = res.data.rooms.map(e => {
            return {
              ...e['rooms-detail'],
              id: e.id,
              guest: e['room-detail'].descriptionShort.GuestMin,
              description: e['room-detail'].description,
            };
          });
        }
        this.$bus.$emit('isLoading', false);
      });
    },
  },
  mounted() {
    this.getCollection();
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
  margin-top: 20px !important;
  @include lapTop {
    width: 80%;
  }
  margin: auto;
}
.item {
  cursor: pointer;
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
  vertical-align: middle;
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
