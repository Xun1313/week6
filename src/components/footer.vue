<template>
  <footer class="footer">
    <div class="container">
      <h2 class="footer-title">WHITE INN</h2>
      <div class="footer-item">
        <i class="fas fa-phone"></i>
        免費熱線: 0800-01 1068
      </div>
      <div class="footer-item">
        <i class="fas fa-phone"></i>
        電話:+886-6-934-4112
      </div>
      <div class="footer-item">
        <i class="far fa-envelope"></i>
        email:service@WHITE INN.com.tw
      </div>
      <div class="footer-other">
        WHITE INN 版權所有 - 2020
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
  margin-top: 30px;
  &-title {
    text-align: center;
    font-size: 40px;
  }
  &-item {
    text-align: center;
  }
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
