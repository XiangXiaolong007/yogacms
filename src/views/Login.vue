<template>
  <div class="login">
    <div class="login_img">
      <transition-group tag="ul" name="img">
        <li v-for="(image,index) in imgs" :key="index" v-show="index===mark">
          <div class="divImg" :style="{backgroundImage: 'url(' + image + ')'}"></div>
        </li>
      </transition-group>
    </div>

    <transition name="fade">
      <div class="login-content" v-if="hide">
        <div class="logo">
          <img class="logo-img" src="../assets/images/logo.png" alt="daily yoga logo" />
          <h3>DAILY YOGA</h3>
        </div>
        <div class="form-login">
          <!-- 登录界面 -->
          <h3 class="form-title">请登录</h3>
          <div class="form-group">
            <el-input prefix-icon="fa fa-user" v-model="user.username" placeholder="用户名" clearable></el-input>
          </div>
          <div class="form-group">
            <el-input
              type="password"
              prefix-icon="fa fa-lock"
              v-model="user.password"
              placeholder="密码"
              clearable
            ></el-input>
          </div>
          <div class="form-group">
            <el-checkbox v-model="user.rememberMe">记住我</el-checkbox>
          </div>
          <div class="form-actions">
            <el-button type="primary" size="small" @click="login">
              登录
              <i class="m-icon-swapright m-icon-white"></i>
            </el-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import bg1 from "@/assets/images/bg/1.jpg";
import bg2 from "@/assets/images/bg/2.jpg";
import bg3 from "@/assets/images/bg/3.jpg";
import bg4 from "@/assets/images/bg/4.jpg";
import qs from "qs";

export default {
  data() {
    return {
      mark: 0,
      imgs: [bg1, bg2, bg3, bg4],
      hide: false,
      user: {
        username: "admin",
        password: "wtfhhuaectk",
        rememberMe: true
      }
    };
  },
  created() {
    this.play();
  },
  mounted() {
    this.hide = true;
  },
  methods: {
    autoPlay() {
      if (this.mark < this.imgs.length - 1) {
        this.mark++;
      } else {
        this.mark = 0;
      }
    },
    play() {
      setInterval(this.autoPlay, 2000);
    },
    login() {
      let params = {
        username: this.user.username,
        password: this.user.password
      };
      this.axios
        .post("/api/login/login", qs.stringify(params), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          }
        })
        .then(res => {
          console.log(res);
        });
    }
  }
};
</script>
<style lang="scss">
.login,
.login_img,
.login_img .divImg,
ul,
li {
  width: 100%;
  height: 100%;
}

.login_img {
  position: fixed;
  z-index: -3333;
}

.login_img ul li {
  position: absolute;
}

.login_img .divImg {
  background-size: cover;
  background-repeat: no-repeat;
}

.img-enter-active,
.img-leave-active {
  transition: all 4s;
}

.img-enter,
.img-leave-to {
  opacity: 0;
}

.img-enter-to,
.img-leave {
  opacity: 1;
}

.login-content {
  float: left;
  width: 100%;
  opacity: 1;
  .logo {
    margin: 60px auto 20px;
    text-align: center;
    padding: 15px;
    h3 {
      font-size: 33px;
      font-weight: 300;
      margin-top: 20px;
      margin-bottom: 10px;
      color: #fff;
    }
  }
  .logo-img {
    height: 90px;
  }
  .form-login {
    background-color: rgba(255, 255, 255, 0.4);
    width: 360px;
    margin: 0 auto;
    margin-bottom: 0px;
    padding: 30px;
    padding-top: 20px;
    padding-bottom: 15px;
    border-radius: 7px;
    h3 {
      color: #fff;
      font-weight: 300;
      margin-top: 20px;
      margin-bottom: 10px;
    }
    .form-group {
      margin-bottom: 15px;
    }
    .fa {
      margin-top: 2px;
    }
    .el-checkbox__label {
      color: #fff !important;
    }
  }
}
.fade-enter-active {
  transition: all 1s ease;
}
.fade-enter {
  transform: translateY(-20px);
  opacity: 0;
}
</style>