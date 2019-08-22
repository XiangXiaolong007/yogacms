<template>
  <div class="login">
    <div class="login_img">
      <transition-group tag="ul" name="img">
        <li v-for="(image,index) in imgs" :key="index" v-show="index === mark">
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
          <r-form :children="children" :defaultModel="defaultModel" :toolbar="toolbar"></r-form>
        </div>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import qs from "qs";
import { Component, Prop, Vue, Mixins } from "vue-property-decorator";
import RForm from "@/components/Form/Form.vue";
import { isValidUsername } from "@/utils/validate";
import { FormModel } from "@/components/Interface";

const bg1 = require("@/assets/images/bg/1.jpg");
const bg2 = require("@/assets/images/bg/2.jpg");
const bg3 = require("@/assets/images/bg/3.jpg");
const bg4 = require("@/assets/images/bg/4.jpg");

@Component({
  components: {
    RForm
  }
})
export default class RVLogin extends Mixins(Vue) {
  private validateUsername = (rule: any, value: string, callback: Function) => {
    if (!isValidUsername(value)) {
      callback(new Error("Please Enter the correct user name"));
    } else {
      callback();
    }
  };
  private validatePassword = (rule: any, value: string, callback: Function) => {
    if (value.length < 6) {
      callback(new Error("The password can not be less than 6 digits"));
    } else {
      callback();
    }
  };

  imgs = [bg1, bg2, bg3, bg4];
  mark = 0;
  hide = false;
  user = {
    username: "admin",
    password: "wtfhhuaectk",
    rememberMe: true
  };

  defaultModel = {
    username: "admin",
    password: "wtfhhuaectk",
    placaholderText: "请输入用户名",
    placaholderPass: "请输入密码"
  };
  children = [
    {
      name: "username",
      widget: "input",
      placeholder: "请输入用户名",
      prefixIcon: ["fa", "fa-user"],
      validate: [
        {
          required: true,
          trigger: "blur"
        },
        {
          validator: this.validateUsername,
          trigger: "blur"
        }
      ]
    },
    {
      name: "password",
      widget: "password",
      placeholder: "请输入密码",
      prefixIcon: ["fa", "fa-lock"],
      validate: [
        {
          required: true,
          trigger: "blur"
        },
        { validator: this.validatePassword, trigger: "blur" }
      ]
    }
  ];
  toolbar = [
    {
      type: "primary",
      text: "登录",
      iconClass: ["m-icon-swapright", "m-icon-white"],
      action: (model: FormModel) => {
        console.dir(model);
      }
    }
  ];

  autoPlay() {
    if (this.mark < this.imgs.length - 1) {
      this.mark++;
    } else {
      this.mark = 0;
    }
  }
  play() {
    setInterval(this.autoPlay, 2000);
  }
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
        let _data = res.data.data;
        if (res.data.errno == 0) {
          this.$message({
            message: "登录成功",
            type: "success"
          });

          // user name
          localStorage.setItem("DailyYoga.NADMIN", _data.n_admin);
          // auth required
          localStorage.setItem("DailyYoga.SADMIN", _data.s_admin);
          localStorage.setItem("DailyYoga.UADMIN", _data.u_admin);

          this.$router.push({
            path: "/"
          });
        } else {
          this.$message({
            message: `Error No.${res.data.errno} Error Messages: ${res.data.errmsg}`,
            type: "error"
          });
        }
      })
      .catch(err => {
        this.$message({
          message: "登录出错",
          type: "error"
        });
      });
  }
  created() {
    this.play();
  }
  mounted() {
    this.hide = true;
  }
}
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