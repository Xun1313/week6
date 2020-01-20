<template>
  <section class="container">
    <h2 class="home-title-other">顧客評論</h2>
    <section class="scroll">
      <figure class="scroll-flex">
        <div class="scroll-flex-people">
          <img
            src="../../assets/scroll/photo-1542103749-8ef59b94f47e.jpg"
            class="scroll-flex-pic"
          />
          <h5 class="scroll-flex-people-name">周小姐</h5>
        </div>
        <figcaption class="scroll-flex-describe">
          <h5>
            玩沙玩水的首選，有絕美的獨立沙灘，沙質細膩，整體乾淨舒適，環境很好，也提供很多水上的玩法，大人、小孩都玩得很開心。
          </h5>
        </figcaption>
      </figure>

      <figure class="scroll-flex">
        <div class="scroll-flex-people">
          <img
            src="../../assets/scroll/photo-1543486958-d783bfbf7f8e.jpg"
            class="scroll-flex-pic"
          />
          <h5 class="scroll-flex-people-name">蔣先生</h5>
        </div>
        <figcaption class="scroll-flex-describe">
          <h5 class="scroll-flex-people-word">
            飯店的天台有瞭望台提供高處往下看的視角，並且有提供簡易拍照區供遊客拍照，不過因瞭望台地勢較高，要小心強風的吹襲。
          </h5>
        </figcaption>
      </figure>

      <figure class="scroll-flex">
        <div class="scroll-flex-people">
          <img
            src="../../assets/scroll/photo-1567250671670-05e36d8ca38e.jpg"
            class="scroll-flex-pic"
          />
          <h5 class="scroll-flex-people-name">蔡小姐</h5>
        </div>
        <figcaption class="scroll-flex-describe">
          <h5 class="scroll-flex-people-word">
            我是一大早就去游泳，喜歡一個人靜靜玩。工作人員會主動打招呼。清潔做得非常好。游累了可以泡湯，用水按摩身體，非常舒服！
          </h5>
        </figcaption>
      </figure>

      <figure class="scroll-flex">
        <div class="scroll-flex-people">
          <img
            src="../../assets/scroll/photo-1497039332268-544fc893a647.jpg"
            class="scroll-flex-pic"
          />
          <h5 class="scroll-flex-people-name">顏先生</h5>
        </div>
        <figcaption class="scroll-flex-describe">
          <h5 class="scroll-flex-people-word">
            服務好，早餐buffet原本不敢抱太大期待，結果出忽意料之外的好吃，菜色豐富，補菜速度快，餐點多樣品質也好，真的很有誠意。
          </h5>
        </figcaption>
      </figure>
    </section>
  </section>
</template>

<style lang="scss" scoped>
@import '../../assets/_grid.scss';
@import '../../assets/_mixin.scss';
@import '../../assets/_variable.scss';
.scroll {
  width: 100%;
  @include lapTop {
    width: 700px;
  }
  height: 30vh;
  margin: 0 auto 30px;
  padding: 15px;
  overflow-y: scroll;
  &-line {
    width: 90%;
    display: block;
    margin: 15px auto;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.2);
  }
  &-flex {
    margin-bottom: 25px;
    &-pic {
      width: 100px;
      height: auto;
    }
    &-people {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      &-name {
        margin-left: 10px;
      }
    }
    &-describe {
      h5 {
        font-size: 16px;
        opacity: 0.6;
        z-index: -1;
        position: relative;
      }
    }
  }
}
.home-title-other {
  color: $important;
  font-size: 20px;
  margin-top: 60px;
  text-align: center;
  margin: 60px auto 20px auto;
  border-bottom: 1px solid rgba(128, 128, 128, 0.6);
  width: 250px;
  padding: 10px 0;
}
</style>
