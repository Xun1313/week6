<template>
  <div class="bg-login">
    <loading :active.sync="isLoading"></loading>
    <div class="login">
      <i class="fas fa-user-alt login-icon"></i>
      <div class="login-title">MEMBER UPDATE</div>

      <div class="login-item">
        <div class="login-item-flex" :class="{ error: errors.has('phone') }">
          <div class="login-item-flex-icon">
            <i class="fas fa-mobile-alt"></i>
          </div>
          <input type="text" class="login-item-flex-input" placeholder="Phone" v-model="account.phone" v-validate="'required|numeric'" data-vv-as="電話號碼" name="phone" />
        </div>
        <div class="login-item-error" v-if="errors.has('phone')">電話號碼必須為數字<!-- {{errors.first('password')}} --></div>
      </div>

      <div class="login-item">
        <div class="login-item-flex" :class="{ error: errors.has('name') }">
          <div class="login-item-flex-icon">
            <i class="fas fa-file-signature"></i>
          </div>
          <input type="text" class="login-item-flex-input" placeholder="Name" v-model="account.name" v-validate="'required'" data-vv-as="名字" name="name" />
        </div>
        <div class="login-item-error" v-if="errors.has('name')">名字為必填<!-- {{errors.first('password')}} --></div>
      </div>

      <div class="upload" ref="upload">
        <div class="upload-region" :class="{ 'upload-region-error': errors.has('image') }">
          <input type="file" class="upload-region-file" @change="fileHandler($event)" ref="upload-region-file" v-validate="'image'" data-vv-as="圖片" name="image" />
          <i class="fas fa-cloud-upload-alt"></i>
          <div class="upload-region-describe">{{file}}</div>
        </div>
        <div class="login-item-error" v-if="errors.has('image')">必須上傳圖片檔</div>
        <img :src="account.img" alt="" class="upload-img" />
      </div>

      <div class="login-update" @click="updateUser()">確認修改</div>
      <!-- <img :src="base64" alt="" /> -->
    </div>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
  data() {
    return {
      file:'click here to choose image!',
      count: '',
      isLoading: false,
      account: {
        img: '',
        phone: '',
        name: '',
      },
    };
  },
  methods: {
    updateUser() {
      this.$validator.validate().then(validate => {
        if (validate) {
          this.isLoading = true;
          const formdata = new FormData();
          formdata.append('userpic', this.$refs['upload-region-file'].files[0]);
          formdata.append('phone', this.account.phone);
          formdata.append('name', this.account.name);
          this.$http
            .post(`${process.env.VUE_APP_api}/users/update`, formdata, {
              headers: {
                'Content-type': 'multipart/form-data',
              },
            })
            .then(res => {
              clearTimeout(this.count);
              this.count = setTimeout(() => {
                if (res.data.success) {
                  this.$bus.$emit('refreshSignin');
                  this.$router.push('/');
                }
                this.isLoading = false;
              }, 0);
            });
        }
      });
    },
    fileHandler(e) {
      this.file=e.currentTarget.value
      const Fr = new FileReader();
      Fr.readAsDataURL(e.currentTarget.files[0]);
      Fr.onload = FrEvent => {
        this.account.img = FrEvent.currentTarget.result;
      };
    },
  },
  mounted() {
    this.$http.get(`${process.env.VUE_APP_api}/users/isSignin`).then(res => {
      if (res.data.success) {
        this.account = res.data;
      }
    });
    /* this.$refs.upload.addEventListener('dragenter', e => {
      this.$refs.upload.classList.add('upload-drag');
    });
    this.$refs.upload.addEventListener('dragleave', e => {
      this.$refs.upload.classList.remove('upload-drag');
    }); */
  },
  components: {
    Loading,
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/login.scss';
.upload {
  &-region {
    border: 3px dashed darken(gray, 15%);
    background-color: gray;
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
  background-image: linear-gradient(135deg, white, gray, white);
  //transition: .5s all;
  cursor: pointer;
  text-align: center;
  border-radius: 50px;
  padding: 5px;
  margin: 15px 0;
  &:active {
    background-image: linear-gradient(135deg, gray, white, gray);
  }
}
.upload-region-error {
  border: 3px dashed red;
}
</style>
