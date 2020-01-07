<template>
  <div>
    <div class="list-pic">
      <div class="list-pic-bg"></div>
    </div>
    <div class="container">
      <div class="list-title-other">客房介紹</div>
      <p class="list-introduce">
        全館74間房間內，提供多達65間大坪數的親子四人房間，空間寬敞、乾淨舒適、採光明亮、備品齊全、適合用做家族旅遊、團體旅遊。
        房內採用大尺寸的平面液晶電視，浴室設計採用古典西洋風格類型，並且在客房內即可享用游泳池。
      </p>
      <div class="list-title-other">選擇房型</div>
      <div class="list-scroll">
        <a
          href="#"
          class="list-scroll-single"
          @click="scrollRoom($event, 'single')"
        >
          <div class="list-scroll-item">
            <div class="single-bg"></div>
            <div class="single-word">Single</div>
          </div>
        </a>
        <a
          href="#"
          class="list-scroll-double"
          @click="scrollRoom($event, 'double')"
        >
          <div class="list-scroll-item">
            <div class="double-bg"></div>
            <div class="double-word">Double</div>
          </div>
        </a>
      </div>

      <div class="list-title-other" ref="single">精選單人房</div>
      <div class="list-all row">
        <template v-for="item in allRooms">
          <div
            class="list-all-item item col-md-6"
            v-if="item['room-detail'].descriptionShort.GuestMin === 1"
            :key="item.id"
          >
            <div class="item-group" @click="roomHandler(item.id)">
              <img
                :src="item['rooms-detail'].imageUrl"
                class="item-group-pic"
              />
              <div class="item-group-more">
                <div class="item-group-more-word">See More</div>
              </div>
            </div>
            <div class="item-title">{{ item['rooms-detail'].name }}</div>
            <div class="item-normal">
              平日$ {{ item['rooms-detail'].normalDayPrice }}
            </div>
            <div class="item-holiday">
              假日$ {{ item['rooms-detail'].holidayPrice }}
            </div>
          </div>
        </template>
      </div>

      <div class="list-title-other" ref="double">精選雙人房</div>
      <div class="list-all row">
        <template v-for="item in allRooms">
          <div
            class="list-all-item item col-md-6"
            v-if="item['room-detail'].descriptionShort.GuestMin === 2"
            :key="item.id"
          >
            <div class="item-group" @click="roomHandler(item.id)">
              <img
                :src="item['rooms-detail'].imageUrl"
                class="item-group-pic"
              />
              <div class="item-group-more">
                <div class="item-group-more-word">See More</div>
              </div>
            </div>
            <div class="item-title">{{ item['rooms-detail'].name }}</div>
            <div class="item-normal">
              $ {{ item['rooms-detail'].normalDayPrice }}
            </div>
            <div class="item-holiday">
              $ {{ item['rooms-detail'].holidayPrice }}
            </div>
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
      allRooms: []
    }
  },
  methods: {
    roomHandler(id) {
      this.$router.push(`/room/${id}`)
    },
    scrollRoom(e, val) {
      e.preventDefault()
      window.scrollTo({
        top: this.$refs[val].offsetTop,
        behavior: 'smooth'
      })
    }
  },
  mounted() {
    this.$bus.$emit('isLoading', true)
    this.$http.get(`${process.env.VUE_APP_api}/rooms`).then(res => {
      this.allRooms = res.data.item
      this.$bus.$emit('isLoading', false)
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/_grid.scss';
@import '../assets/_mixin.scss';
@import '../assets/_variable.scss';
.list {
  &-pic {
    width: 100%;
    height: 0;
    padding-bottom: 64%;
    @include lapTop {
      padding-bottom: 35%;
    }
    position: relative;
    &-bg {
      background-image: url('../assets/list.jpg');
      @extend %bg;
      width: 100%;
      height: 100%;
      position: absolute;
    }
  }
  &-introduce {
    text-align: center;
    opacity: 0.7;
  }
  &-title {
    //font-family: 'Indie Flower', cursive;
    color: $important;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    width: 100%;
    height: 100%;
    /* &::before{
      content: '';
      width: 300px;
      outline: 1px solid black;
    } */
  }
  &-title-other {
    color: $important;
    font-size: 20px;
    margin-top: 60px;
    text-align: center;
    margin: 60px auto 20px auto;
    border-bottom: 1px solid rgba(128, 128, 128, 0.6);
    width: 250px;
    padding: 10px 0;
  }
  &-scroll {
    display: flex;
    align-items: center;
    border-radius: 50px;
    width: 200px;
    margin: 0 auto 30px;
    overflow: hidden;
    border: 2px solid $important;
    justify-content: center;
    height: 55px;
    &-item {
      font-weight: bold;
      cursor: pointer;
      position: relative;
      .single-bg {
        position: absolute;
        transform: rotate(10deg);
        padding: 75px;
        top: -100%;
        left: -92%;
        z-index: 5;
        transition: 0.5s all;
      }
      .single-word {
        margin: 0 10px;
        color: $important;
        transition: 0.5s all;
        position: relative;
        z-index: 10;
      }
      .double-bg {
        position: absolute;
        color: $important;
        text-align: right;
        background-color: $important;
        transform: rotate(10deg);
        padding: 75px;
        top: -50%;
        left: 0;
        z-index: 5;
        transition: 0.5s all;
      }
      .double-word {
        margin: 0 10px;
        position: relative;
        left: 10px;
        z-index: 10;
        transition: 0.5s all;
        color: white;
      }
    }
    &-single {
      text-decoration: none;
      &:hover .single-bg {
        background-color: $important;
      }
      &:hover .single-word {
        color: white;
      }
    }
    &-double {
      text-decoration: none;
      &:hover .double-bg {
        background-color: white;
      }
      &:hover .double-word {
        color: $important;
      }
    }
  }
  &-all {
    //width: 90%;
    //padding: 0 50px;
    margin: auto;
    .item {
      /* @include lapTopHigh {
        padding: 0 80px;
      } */
      padding: 0;
      margin-bottom: 20px;
      @include lapTop {
        &:nth-child(odd) {
          padding-right: 20px;
        }
        &:nth-child(even) {
          padding-left: 20px;
        }
      }
      &-group {
        position: relative;
        &:hover > .item-group-more {
          background-color: rgba(0, 0, 0, 0.5);
          height: 100%;
        }
        &-title {
          color: $important;
        }
        &-pic {
          width: 100%;
          height: auto;
          cursor: pointer;
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
      &-normal,
      &-holiday {
        opacity: 0.6;
      }
    }
  }
}
</style>
