<template>
  <div class="date">
    <div class="date-title">姓名</div>
    <div class="date-group" :class="{ 'is-invalid': errors.has('name') }">
      <i class="date-group-icon fas fa-user-alt"></i>
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
      <i class="date-group-icon fas fa-phone-alt"></i>
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

    <div class="date-title">日期</div>
    <div class="date-groups input-daterange outline-none">
      <div
        class="date-groups-check"
        :class="{ 'is-invalid': errors.has('date') }"
      >
        <i class="far fa-calendar-times"></i>
        <input
          type="text"
          class="date-groups-check-input check-in"
          v-validate="'required'"
          placeholder="Check in"
          name="date"
          data-vv-as="日期"
          readonly
        />
      </div>
      <div
        class="date-groups-check"
        :class="{ 'is-invalid': errors.has('date2') }"
      >
        <i class="far fa-calendar-times"></i>
        <input
          type="text"
          class="date-groups-check-input check-out"
          v-validate="'required'"
          placeholder="Check out"
          name="date2"
          data-vv-as="日期"
          readonly
        />
      </div>
    </div>
    <p class="invalid-word">
      {{ errors.first('date') || errors.first('date2') }}
    </p>
    <input type="hidden" class="check-in-info" ref="check-in-info" />
    <input type="hidden" class="check-out-info" ref="check-out-info" />
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
export default {
  props: ['roomId'],
  data() {
    return {
      sendInfo: {
        name: '',
        tel: '',
        date: []
      },
      start: '',
      end: ''
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
            this.sendInfo.date.push(this.$refs['check-in-info'].value)
            this.sendInfo.date.push(this.$refs['check-out-info'].value)
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
    startHandler() {
      if (new Date(this.start) > new Date(this.end)) {
        $('.check-in').datepicker({
          startDate: new Date()
        })
      }
    },
    endHandler() {
      $('.check-in').datepicker({
        startDate: new Date()
      })
    }
  },
  computed: {
    calcDate() {
      const date = new Date()
      date.setDate(new Date().getDate() + 1)
      return date
    }
  },
  mounted() {
    //(1)$("input的父層").datepicker();針對input的父層初始化能夠選 (api在option)

    //(2)以change事件偵測到選到的日期 (api在event)

    //(3)$("input").datepicker("getFormattedDate") 此時操作的datepicker就是return值,option時有format也能接到format後的值 (api在method)
    $.fn.datepicker.dates['en'] = {
      days: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      daysMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ],
      monthsShort: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ],
      today: 'Today',
      clear: 'Clear',
      format: 'yyyy/mm/dd',
      titleFormat: 'yyyy/mm',
      weekStart: 0
    }

    const datePicker = {
      todayHighlight: true,
      autoclose: true,
      multidateSeparator: '-',
      format: 'yyyy-mm-dd',
      startDate: new Date()
    }

    /* $(".date-groups").datepicker({
      ...datePicker
    });

    $('.date-groups').on('changeDate', function() {
      $('.check-in-info').val($(this).datepicker('getFormattedDate'))
    }) */
    $('.check-in').datepicker({
      ...datePicker,
      startDate: new Date()
    })
    const vm = this
    $('.check-in').on('changeDate', function() {
      vm.first = $('.check-in-info').val(
        $(this).datepicker('getFormattedDate')
      )[0].value
      vm.startHandler()
      $('.check-in-info').val($(this).datepicker('getFormattedDate'))
    })

    $('.check-out').datepicker({
      ...datePicker,
      startDate: vm.calcDate
    })
    //必須是我選到的下一天

    $('.check-out').on('changeDate', function() {
      vm.end = $('.check-in-info').val(
        $(this).datepicker('getFormattedDate')
      )[0].value
      vm.endHandler()
      $('.check-out-info').val($(this).datepicker('getFormattedDate'))
    })
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
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    font-size: 16px;
    &-check {
      display: flex;
      align-items: center;
      font-size: 16px;
      outline: 1px black solid;
      width: 50%;
      padding-left: 10px;
      &:last-of-type {
        margin-left: 10px;
      }
      &-input {
        padding: 10px 5px;
        width: 100%;
        border: none;
        outline: none;
        margin-left: 5px;
        text-align: left;
      }
    }
  }
  &-nav {
    display: flex;
    align-items: flex-end;
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
/* .datepicker table tr /deep/ td.active:active,
.datepicker table tr /deep/ td.active.highlighted:active,
.datepicker table tr /deep/ td.active.active,
.datepicker table tr /deep/ td.active.highlighted.active {
  background-color: green !important;
} */
</style>
