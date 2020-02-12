<template>
  <section class="date">
    <div class="date-group">
      <label for="date-group-name">
        <h4 class="date-title">姓名</h4>
        <input
          type="text"
          class="date-group-input"
          id="date-group-name"
          :class="{ 'is-invalid': errors.has('name') }"
          v-validate="'required'"
          placeholder="Name"
          name="name"
          data-vv-as="名字"
          v-model="sendInfo.name"
        />
      </label>
    </div>
    <p class="invalid-word">{{ errors.first('name') }}</p>

    <div class="date-group">
      <label for="date-group-tel">
        <h4 class="date-title">電話號碼</h4>
        <input
          type="tel"
          class="date-group-input"
          id="date-group-tel"
          :class="{ 'is-invalid': errors.has('tel') || error.switch }"
          v-validate="'required|numeric'"
          placeholder="Phone"
          data-vv-as="電話號碼"
          name="tel"
          v-model="sendInfo.tel"
        />
      </label>
    </div>
    <template v-if="error.switch">
      <p class="invalid-word" v-for="item in error.message" :key="item.param">
        {{ item.msg || item }}
      </p>
    </template>
    <p class="invalid-word">{{ errors.first('tel') }}</p>

    <div class="date-groups">
      <label for="date-groups-in">
        <h4 class="date-title">入住日期</h4>
        <Datepicker
          v-model="first.date"
          :disabled-dates="first.disabledDates"
          @selected="firstHandler"
          :format="'yyyy-MM-dd'"
          :language="zh"
          :input-class="'picker-input'"
          :wrapper-class="'picker'"
          :id="'date-groups-in'"
        ></Datepicker>
      </label>
    </div>
    <div class="date-groups">
      <label for="date-groups-out">
        <h4 class="date-title">退房日期</h4>
        <Datepicker
          v-model="end.date"
          :disabled-dates="end.disabledDates"
          :format="'yyyy-MM-dd'"
          :language="zh"
          class="picker"
          :input-class="'picker-input'"
          :wrapper-class="'picker'"
          :id="'date-groups-out'"
        ></Datepicker>
      </label>
    </div>

    <!-- <template v-if="error.switch">
      <p class="invalid-word" v-for="item in error.message" :key="item.param">
        {{ item.msg || item }}
      </p>
    </template> -->

    <div class="date-nav">
      <button
        type="button"
        class="date-nav-btn"
        @click="collectionToggle($event)"
      >
        <i class="fas fa-cart-plus"></i>
        加入收藏
      </button>
      <button type="button" class="date-nav-btn" @click="toggleOrder()">
        預約
      </button>
    </div>
  </section>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import { zh } from 'vuejs-datepicker/dist/locale'
import moment from 'moment'
export default {
  props: ['roomId', 'error'],
  data() {
    return {
      sendInfo: {
        name: '',
        tel: '',
        date: []
      },
      first: {
        date: new Date(),
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
      picker: ['picker'],
      zh,
      moment
    }
  },
  methods: {
    collectionToggle(e) {
      e.preventDefault()
      this.$bus.$emit('isLoading', true)
      this.$http
        .post(`${process.env.VUE_APP_api}/favorite`, {
          id: this.roomId
        })
        .then(res => {
          res.data.success
            ? this.$emit('cartHandler')
            : this.$router.push('/login')
          this.$bus.$emit('isLoading', false)
        })
    },
    toggleOrder() {
      this.$validator
        .validate()
        .then(valid => {
          this.$bus.$emit('isLoading', true)
          if (valid) {
            this.sendInfo.date.push(
              moment(this.first.date).format('YYYY-MM-DD')
            )
            this.sendInfo.date.push(moment(this.end.date).format('YYYY-MM-DD'))
            this.$emit('toggleOrder', { ...this.sendInfo })
          } else {
            this.$bus.$emit('isLoading', false)
          }
        })
        .then(() => {
          this.sendInfo.date = []
        })
    },
    firstHandler(val) {
      const date = new Date(val)
      const date2 = new Date(val)
      date.setDate(val.getDate() + 1)
      this.end.disabledDates.to = date
      date2.setDate(val.getDate() + 1)
      this.end.date = date2
    }
  },
  mounted() {
    const date = new Date()
    date.setDate(date.getDate() - 1)
    this.first.disabledDates.to = date
    const date2 = new Date()
    date2.setDate(date2.getDate() + 1)
    this.end.date = date2
  },
  components: {
    Datepicker
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/_variable.scss';
.invalid-word {
  color: red;
  font-size: 16px;
  margin-bottom: 20px;
}
.is-invalid {
  border: red 1px solid !important;
}
.date {
  flex-grow: 1;
  width: 100%;
  &-title {
    font-size: 16px;
    //color: $important;
  }
  &-group {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    font-size: 16px;
    &-input {
      padding: 10px 0 10px 5px;
      width: 100%;
      outline: none;
      border: 1px solid black;
    }
  }
  &-groups {
    font-size: 16px;
    &-time {
      padding: 10px 5px;
      cursor: pointer;
      margin: 0;
      border: 1px solid rgba(0, 0, 0, 1);
      opacity: 0.7;
    }
  }
  &-nav {
    display: flex;
    align-items: flex-end;
    margin-top: 20px;
    &-btn {
      height: 38px;
      outline: none;
      background-color: $important;
      color: white;
      font-size: 16px;
      cursor: pointer;
      transition: 0.5s all;
      padding: 5px 15px;
      &:first-child {
        margin-left: auto;
      }
      &:last-child {
        margin-left: 15px;
      }
      &:hover {
        background-color: darken($important, 10%);
      }
    }
  }
}
h4 {
  margin: 0;
}
label {
  width: 100%;
  margin: 0;
}
</style>

<style lang="scss">
.picker {
  width: 100%;
  &-input {
    display: block;
    cursor: pointer;
    overflow: hidden;
    border: 1px solid black;
    width: 100%;
    padding: 10px 0 10px 5px;
    opacity: 0.7;
    outline: none;
  }
}
</style>
