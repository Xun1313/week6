<template>
  <div class="date">
    <div class="date-title">姓名</div>
    <div class="date-group" :class="{ 'is-invalid': errors.has('name') }">
      <!-- <i class="date-group-icon fas fa-user-alt"></i> -->
      <input
        type="text"
        class="date-group-input"
        v-validate="'required'"
        placeholder="Name"
        name="name"
        data-vv-as="名字"
        v-model="sendInfo.name"
      />
    </div>
    <p class="invalid-word">{{ errors.first('name') }}</p>

    <div class="date-title">電話號碼</div>
    <div class="date-group" :class="{ 'is-invalid': errors.has('tel') }">
      <!-- <i class="date-group-icon fas fa-phone-alt"></i> -->
      <input
        type="tel"
        class="date-group-input"
        v-validate="'required|numeric'"
        placeholder="Phone"
        data-vv-as="電話號碼"
        name="tel"
        v-model="sendInfo.tel"
      />
    </div>
    <p class="invalid-word">{{ errors.first('tel') }}</p>

    <div class="date-title">入住日期</div>
    <div class="date-groups">
      <Datepicker
        v-model="first.date"
        :disabled-dates="first.disabledDates"
        @selected="firstHandler"
        :format="'yyyy-MM-dd'"
        :language="zh"
        :input-class="'picker-input'"
        :wrapper-class="'picker'"
      ></Datepicker>
    </div>
    <div class="date-title">退房日期</div>
    <div class="date-groups">
      <Datepicker
        v-model="end.date"
        :disabled-dates="end.disabledDates"
        :format="'yyyy-MM-dd'"
        :language="zh"
        class="picker"
        :input-class="'picker-input'"
        :wrapper-class="'picker'"
      ></Datepicker>
    </div>

    <!-- <p class="invalid-word">
      {{ errors.first('date') || errors.first('date2') }}
    </p> -->
    <div class="date-nav">
      <button
        type="button"
        class="date-nav-cart"
        @click="collectionToggle($event)"
      >
        <i class="fas fa-cart-plus"></i>
        加入收藏
      </button>
      <button type="button" class="date-nav-order" @click="toggleOrder()">
        預約
      </button>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import { zh } from 'vuejs-datepicker/dist/locale'
import moment from 'moment'
export default {
  props: ['roomId'],
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
          if (valid) {
            this.sendInfo.date.push(
              moment(this.first.date).format('YYYY-MM-DD')
            )
            this.sendInfo.date.push(moment(this.end.date).format('YYYY-MM-DD'))
            this.$emit('toggleOrder', { ...this.sendInfo })
          }
        })
        .then(() => {
          this.sendInfo.date = []
          /* setTimeout(() => {
            this.$validator.reset();
          }, 3000); */
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
  outline: red 1px solid !important;
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
    outline: 1px black solid;
    margin-bottom: 5px;
    font-size: 16px;
    padding: 0 10px;
    &-input {
      padding: 10px 5px;
      width: 100%;
      border: none;
      outline: none;
      margin-left: 5px;
    }
  }
  &-groups {
    /* display: flex;
    align-items: center;
    margin-bottom: 5px; */
    font-size: 16px;
  }
  &-nav {
    display: flex;
    align-items: flex-end;
    margin-top: 20px;
    &-cart {
      height: 38px;
      outline: none;
      background-color: $important;
      color: white;
      font-size: 16px;
      cursor: pointer;
      margin-left: auto;
      transition: 0.5s all;
      padding: 5px 15px;
      &:hover {
        background-color: white;
        color: $important;
      }
    }
    &-order {
      height: 38px;
      outline: none;
      margin-left: 10px;
      width: 80px;
      text-align: center;
      background-color: $important;
      color: $other;
      transition: 0.5s all;
      padding: 2px 0px;
      &:hover {
        background-color: white;
        color: $important;
      }
    }
  }
}
/* .outline-none{
  outline: none;
} */
</style>

<style lang="scss">
.picker {
  width: 100%;
  &-input {
    width: 100%;
    display: block;
    padding: 10px 20px;
    border: 1px solid black;
    opacity: 0.7;
    cursor: pointer;
    outline: none;
  }
}
</style>
