<template>
  <table class="table table-striped">
    <!-- <thead>
      <tr>
        <th></th>
        <th>房型</th>
        <th>人數</th>
        <th>價格</th>
      </tr>
    </thead> -->
    <tbody>
      <tr class="item" v-for="(item, index) in rooms" :key="item.name">
        <td class="item-img" :style="`background-image:url(${item.imageUrl})`"></td>
        <td class="item-name">{{ item.name }}</td>
        <td class="item-number">
          <div class="number">
            <div class="number-icon">
              <i class="fas fa-male" v-for="guest in item.guest" :key="guest + item.name"></i>
            </div>
            <span class="number-people">x{{ item.guest }}</span>
          </div>
        </td>
        <td class="item-price">
          <div class="price">
            <div class="price-two">平日:${{ item.normalDayPrice }}</div>
            <div class="price-two">假日:${{ item.holidayPrice }}</div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      rooms: [],
      users: [],
    };
  },
  methods: {
    updateData() {},
  },
  mounted() {
    this.$http.get(`${process.env.VUE_APP_api}/${this.$route.params.item}`).then(res => {
      this.rooms = res.data.rooms.map(e => {
        return {
          ...e['rooms-detail'],
          guest: e['room-detail'].descriptionShort.GuestMin,
        };
      });
    });
  },
  watch: {
    /* $route(now){
      now.params.item
      this.updateData()
    } */
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/_mixin.scss';
.table {
  width: 80%;
  margin: auto;
}
.item {
  &-img {
    @extend %bg;
    width: 150px;
    height: auto;
  }
}
.number {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      margin: 0 5px;
      font-size: 40px;
      color: gray;
    }
  }
}
.price {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &-two {
    margin: 0 0 10px 0;
  }
}
th,
td {
  vertical-align: middle;
  text-align: center;
  font-size: 16px;
  white-space: nowrap;
  &:nth-child(1) {
    width: 15%;
  }
  &:nth-child(n + 2) {
    width: 28%;
  }
}
</style>
