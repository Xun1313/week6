<template>
  <div>
    <h3 class="title">收藏</h3>
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
            <article class="all">
              <h4 class="all-primary">{{ item.name }}</h4>
              <div class="all-secondary">
                <p class="all-secondary-description">
                  {{ item.description }}
                </p>
                <aside class="all-secondary-detail">
                  <div class="all-secondary-detail-number">
                    <i class="fas fa-male icon" v-for="guest in item.guest" :key="guest + item.name"></i>
                    <p class="people">x{{ item.guest }}</p>
                  </div>
                  <div class="all-secondary-detail-price">
                    <p class="two">平日:{{ item.normalDayPrice | currency }}</p>
                    <p class="two">假日:{{ item.holidayPrice | currency }}</p>
                  </div>
                  <div class="all-secondary-detail-cart" @click="deleteCollection($event, item.id)">
                    <i class="fas fa-ban"></i>
                    <h5>取消收藏</h5>
                  </div>
                </aside>
              </div>
            </article>
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
      rooms: []
    }
  },
  methods: {
    routeRoom(id) {
      this.$router.push(`/room/${id}`)
    },
    deleteCollection(e, id) {
      e.stopPropagation()
      this.$http.delete(`${process.env.VUE_APP_api}/favorite/${id}`).then(() => {
        this.getCollection()
      })
    },
    getCollection() {
      this.$bus.$emit('isLoading', true)
      this.$http.get(`${process.env.VUE_APP_api}/favorite`).then(res => {
        if (res.data.success) {
          this.rooms = res.data.rooms.map(e => {
            return {
              ...e['rooms-detail'],
              id: e.id,
              guest: e.primary.descriptionShort.GuestMax,
              description: e.primary.description
            }
          })
        }
        this.$bus.$emit('isLoading', false)
      })
    }
  },
  mounted() {
    this.getCollection()
  }
}
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
  margin-bottom: 50px;
}
.item {
  transition: 0.5s all;
  cursor: pointer;
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
      /* display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      position: relative; */
      &-cart {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        color: red;
        cursor: pointer;
        transition: 0.5s all;
        &:hover {
          color: darken(red, 15%);
        }
        h5 {
          font-size: 16px;
          margin: 0;
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
          font-size: 16px;
          white-space: nowrap;
          text-align: right;
          margin: 0;
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
