<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div>Address:台北市OO區OO街123號</div>
          <div>Phone:00-1234567</div>
        </div>
        <div class="col-md-6">
          <div>Fax:00-76543217</div>
          <div>Email:asdf@132456789.com.tw</div>
        </div>
      </div>
      <div class="footer-other">
        © Copyright WHITE INN - 2020
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@import '../assets/_variable.scss';
@import '../assets/_grid.scss';
.footer {
  background-color: $other;
  color: $important;
  padding: 30px;
  /* &-item {
    @include lapTop {
      display: flex;
    }
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding: 20px 0;
  } */
  &-other {
    text-align: center;
    padding: 20px 0;
  }
}
.col-md-6 > * {
  margin-bottom: 20px;
}
</style>
