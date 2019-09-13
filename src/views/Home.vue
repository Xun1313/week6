<template>
  <div class="home">
    <div class="home-title">WHITE INN</div>
    <div class="bg-light">
      <div class="home-all row">
        <div
          class="home-all-item item col-12 col-md-4 col-xl-2"
          v-for="item in allRooms"
          :key="item.id"
        >
          <img :src="item.imageUrl" class="item-pic" @click="roomHandler(item.id)" />
          <div class="item-title">{{item.name}}</div>
          <div class="item-normal">$ {{item.normalDayPrice}}</div>
          <div class="item-holiday">$ {{item.holidayPrice}}</div>
        </div>
      </div>

      <div class="home-info">
        <div class="home-info-group">
          <i class="fas fa-map-marker-alt"></i>
          <div class="content">台北市OO區OO街123號</div>
        </div>
        <div class="home-info-group">
          <i class="fas fa-phone-alt"></i>
          <div class="content">123456789</div>
        </div>
        <div class="home-info-group">
          <i class="fas fa-envelope"></i>
          <div class="content">abcd@efgijk.com</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/_grid.scss";
.home {
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @include lapTop {
    height: 100vh;
  }
  margin: auto;
  &-title {
    display: flex;
    justify-content: center;
    margin: 80px 0;
    font-size: 40px;
  }
  &-all {
    width: 90%;
    padding: 0 50px;
    margin: auto;
    .item {
      color: rgba(20, 5, 5, 0.5);
      padding-left: 1px;
      padding-right: 1px;
      margin-bottom: 20px;
      @include lapTop {
        transform: translateY(-70px);
      }
      &-pic {
        width: 100%;
        height: auto;
        cursor: pointer;
      }
    }
  }
  &-info {
    width: 100%;
    padding: 0 20px;
    @include lapTop {
      width: 75%;
      margin: auto;
      display: flex;
      justify-content: space-around;
      padding: 0;
    }
    color: rgba(0, 0, 0, 0.5);
    &-group {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .content {
        margin-left: 5px;
      }
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      allRooms: []
    };
  },
  methods: {
    roomHandler(id) {
      this.$router.push(`/room/${id}`);
    }
  },
  mounted() {
    //let token = document.head.querySelector('meta[name="csrf-token"]');
    //window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
    this.$http
      .get(`${process.env.VUE_APP_api}/rooms`, {
        /* headers: {
          "CSRF-Token": token
        } */
      })
      .then(res => {
        //axios.defaults.headers.common['X-CSRF-TOKEN'] = res.data.csrfToken
        this.allRooms = res.data.item;
      });
  }
};
</script>
