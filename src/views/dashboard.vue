<template>
  <div class="bg-login">
    <div class="opacity-login">
      <div class="login">
        <i class="fas fa-user-alt login-icon"></i>
        <h3 class="login-title">MEMBER UPDATE</h3>

        <h4 class="login-name">手機號碼</h4>
        <div class="login-item">
          <div class="login-item-flex" :class="{ error: errors.has('phone') }">
            <div class="login-item-flex-icon">
              <i class="fas fa-mobile-alt"></i>
            </div>
            <input
              type="text"
              class="login-item-flex-input"
              placeholder="Phone"
              v-model="account.phone"
              v-validate="'required|numeric'"
              data-vv-as="電話號碼"
              name="phone"
            />
          </div>
          <p class="login-item-error" v-if="errors.has('phone')">
            電話號碼必須為數字
          </p>
        </div>
        <h4 class="login-name">姓名</h4>
        <div class="login-item">
          <div class="login-item-flex" :class="{ error: errors.has('name') }">
            <div class="login-item-flex-icon">
              <i class="fas fa-file-signature"></i>
            </div>
            <input
              type="text"
              class="login-item-flex-input"
              placeholder="Name"
              v-model="account.name"
              v-validate="'required'"
              data-vv-as="名字"
              name="name"
            />
          </div>
          <p class="login-item-error" v-if="errors.has('name')">
            名字為必填
          </p>
        </div>
        <h4 class="login-name">照片上傳區</h4>
        <div class="upload" ref="upload">
          <div
            class="upload-region"
            :class="{ 'upload-region-error': errors.has('image') }"
          >
            <input
              type="file"
              class="upload-region-file"
              @change="fileHandler($event)"
              ref="upload-region-file"
              v-validate="'image'"
              data-vv-as="圖片"
              name="image"
            />
            <i class="fas fa-cloud-upload-alt"></i>
            <div class="upload-region-describe">{{ file }}</div>
          </div>
          <p class="login-item-error" v-if="errors.has('image')">
            必須上傳圖片檔
          </p>
          <img :src="account.img" alt="" class="upload-img" />
        </div>

        <button type="button" class="login-update" @click="updateUser()">
          確認修改
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: 'click here to choose image!',
      account: {
        img: '',
        phone: '',
        name: ''
      }
    }
  },
  methods: {
    updateUser() {
      this.$validator.validate().then(validate => {
        if (validate) {
          this.$bus.$emit('isLoading', true)
          const formdata = new FormData()
          const file = this.$refs['upload-region-file'].files[0]
          file ? formdata.append('userpic', file) : ''
          //formdata.append('userpic', this.$refs['upload-region-file'].files[0]);
          //裡面沒有值,我就不發請求了
          formdata.append('phone', this.account.phone)
          formdata.append('name', this.account.name)
          this.$http
            .post(`${process.env.VUE_APP_api}/users/update`, formdata, {
              headers: {
                'Content-type': 'multipart/form-data'
              }
            })
            .then(res => {
              if (res.data.success) {
                this.$bus.$emit('refreshSignin')
                this.$router.push('/')
              }
              this.$bus.$emit('isLoading', false)
            })
        }
      })
    },
    fileHandler(e) {
      if (e.currentTarget.value) {
        this.file = e.currentTarget.value
        const Fr = new FileReader()
        Fr.readAsDataURL(e.currentTarget.files[0])
        Fr.onload = FrEvent => {
          this.account.img = FrEvent.currentTarget.result
        }
      }
    }
  },
  mounted() {
    this.$bus.$emit('isLoading', true)
    this.$http.get(`${process.env.VUE_APP_api}/users/isSignin`).then(res => {
      if (res.data.success) {
        this.account = res.data
      }
      this.$bus.$emit('isLoading', false)
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/login.scss';
@import '../assets/_variable.scss';
.bg-login {
  background-image: url('../assets/dashboard.jpg');
}
.upload {
  &-region {
    border: 3px dashed darken(gray, 15%);
    //background-color: #464545;
    position: relative;
    padding: 15px;
    > * {
      text-align: center;
      margin: auto;
      display: block;
    }
    &-file {
      position: relative;
      height: 100%;
      width: 100%;
      position: absolute;
      z-index: 10;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      opacity: 0;
      cursor: pointer;
    }
    &-drag {
      border: 6px dashed darken(gray, 15%);
    }
    &-describe {
      color: white;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    i {
      color: white;
    }
  }
  &-img {
    width: 50%;
    height: auto;
    margin: 30px auto;
    display: block;
  }
}
.login-update {
  text-decoration: none;
  background-color: #464545;
  color: white;
  transition: 0.5s all;
  cursor: pointer;
  text-align: center;
  border-radius: 50px;
  padding: 5px;
  margin: 15px 0;
  display: block;
  width: 100%;
  outline: none;
  &:hover {
    background-color: white;
    color: black;
  }
  /* &:active {
    background-image: linear-gradient(135deg, gray, white, gray);
  } */
}
.upload-region-error {
  border: 3px dashed red;
}
</style>
