<template>
  <div class="date">
    <div class="date-group" :class="{'is-invalid':errors.has('name')}">
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
    <p class="invalid-word">{{errors.first('name')}}</p>
    <div class="date-group" :class="{'is-invalid':errors.has('tel')}">
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
    <p class="invalid-word">{{errors.first('tel')}}</p>
    <div class="date-groups input-daterange outline-none">
      <div class="date-groups-check" :class="{'is-invalid':errors.has('date')}">
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
      <div class="date-groups-check" :class="{'is-invalid':errors.has('date')}">
        <i class="far fa-calendar-times"></i>
        <input
          type="text"
          class="date-groups-check-input check-out"
          placeholder="Check out"
          readonly
        />
      </div>
    </div>
    <p class="invalid-word">{{errors.first('date')}}</p>
    <input type="hidden" class="check-in-info" ref="check-in-info" />
    <input type="hidden" class="check-out-info" ref="check-out-info" />
    <div class="date-order" @click="toggleOrder()">預約</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sendInfo: {
        name: "",
        tel: "",
        date: []
      }
    };
  },
  methods: {
    toggleOrder() {
      this.$validator
        .validate()
        .then(valid => {
          if (valid) {
            this.sendInfo.date.push(this.$refs["check-in-info"].value);
            this.sendInfo.date.push(this.$refs["check-out-info"].value);
            this.$emit("toggleOrder", { ...this.sendInfo });
          }
        })
        .then(() => {
          this.sendInfo.date = [];
          setTimeout(() => {
            this.$validator.reset();
          }, 3000);
        });
    }
  },
  mounted() {
    //(1)$("input的父層").datepicker();針對input的父層初始化能夠選 (api在option)

    //(2)以change事件偵測到選到的日期 (api在event)

    //(3)$("input").datepicker("getFormattedDate") 此時操作的datepicker就是return值,option時有format也能接到format後的值 (api在method)
    $.fn.datepicker.dates["en"] = {
      days: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      daysMin: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      monthsShort: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      today: "Today",
      clear: "Clear",
      format: "yyyy/mm/dd",
      titleFormat: "yyyy/mm",
      weekStart: 0
    };

    const datePicker = {
      todayHighlight: true,
      autoclose: true,
      multidateSeparator: "-",
      format: "yyyy-mm-dd",
      startDate: new Date()
    };

    /* $(".date-groups").datepicker({
      ...datePicker
    }); */

    $(".check-in").datepicker({
      ...datePicker,
      startDate: new Date()
    });

    $(".check-in").on("changeDate", function() {
      $(".check-in-info").val($(this).datepicker("getFormattedDate"));
    });

    $(".check-out").datepicker({
      ...datePicker,
      startDate: new Date(new Date().setDate(new Date().getDate() + 1))
    });

    $(".check-out").on("changeDate", function() {
      $(".check-out-info").val($(this).datepicker("getFormattedDate"));
    });
  }
};
</script>

<style lang="scss" scoped>
.invalid-word {
  color: red;
  font-size: 16px;
  margin-bottom: 5px;
}
.is-invalid {
  outline: red 1px solid !important;
}
.date {
  flex-grow: 1;
  width: 100%;
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
  &-order {
    margin-left: auto;
    outline: 1px black solid;
    padding: 10px 20px;
    width: 80px;
    text-align: center;
    background-color: gray;
    color: white;
    cursor: pointer;
    transition: 0.5s all;
    &:hover {
      background-color: darken(gray, 10%);
      color: darken(white, 10%);
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