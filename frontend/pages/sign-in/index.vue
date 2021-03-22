<template>
  <v-app id="login" class="success">
    <v-main>
      <v-container fill-height>
        <v-layout align-center flex justify-center>
          <v-card class="login">
            <v-card-text class="login-fieldset">
              <div class="layout column align-center login-fieldset">
                <vuetify-logo />
                <h3 class="success--text" style="font-size: 20px">
                  Learn Programming Platform
                </h3>
              </div>
              <v-form>
                <v-text-field
                  class="login-fieldset-field"
                  append-icon="mdi-account"
                  name="login"
                  label="Username"
                  type="text"
                  v-model="username"
                  :error="error"
                  :rules="[rules.required]"
                />
                <v-text-field
                  class="login-fieldset-field"
                  :type="hidePassword ? 'password' : 'text'"
                  :append-icon="hidePassword ? 'mdi-eye-off' : 'mdi-eye'"
                  name="password"
                  label="Password"
                  id="password"
                  :rules="[rules.required]"
                  v-model="password"
                  :error="error"
                  @click:append="hidePassword = !hidePassword"
                />
              </v-form>
            </v-card-text>
            <v-card-actions class="login-fieldset">
              <v-btn
                block
                color="success"
                @click="handleLoginClicked"
                :loading="loading"
                >เข้าสู่ระบบ</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-layout>
        <ul class="bg-bubbles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </v-container>
      <v-snackbar v-model="showResult" :timeout="2000" top>
        {{ result }}
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
export default {
  layout: "blank",
  data() {
    return {
      username: "",
      password: "",
      loading: false,
      hidePassword: true,
      error: false,
      showResult: false,
      result: "",
      rules: {
        required: (value) => !!value || "กรุณากรอกรหัสผู้ใช้งาน",
      },
    };
  },
  methods: {
    async handleLoginClicked() {
      const payload = {
        username: this.username,
        password: this.password,
      };
      try {
        const response = await this.$auth.loginWith("local", {
          data: payload,
        });
        if (response.data.token) {
          await this.$store.commit("user/setUser", {
            user: {
              permission: response.data.permission,
              token: response.data.token,
              username: response.data.user.username,
              password: this.password,
              id: response.data.userId,
            },
          });
          if (response.data.permission.indexOf("teacher") != -1) {
            this.$router.push("/home");
          } else {
            this.$router.push("/student/home");
          }
          this.$vs.notify({
            color: "danger",
            title: "รหัสผู้ใช้งาน หรือรหัสผ่านผิด",
            text: "กรุณากรอกรหัสผู้ใช้งาน หรือรหัสผ่านใหม่อีกครั้ง!",
          });
        }
      } catch (err) {}
    },
  },
};
</script>

<style scoped lang="scss">
#login {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 2;
}

// variables
$default-font-size: 8px;
$border-color: #66bb6a;
$animation-time: 0.5s;
// mixins
@mixin size($width, $height) {
  height: $height;
  width: $width;
}

@mixin square-size($value) {
  @include size($value, $value);
}

// keyframes

@keyframes login-fadein {
  0% {
    opacity: 0;
  }
  75% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

// reset
* {
  font-size: $default-font-size;
}

// styles
.main {
  margin-top: 30vh;
}

%login-item {
  min-width: 250px;
  font-size: 1.6em;
  margin: 0.8em auto;
  // padding: 0.8em;
  width: 80%;
  box-sizing: border-box;
}

.login {
  width: 300px;
  box-sizing: border-box;
  margin: auto;
  z-index: 3;

  &-fieldset {
    animation: login-fadein $animation-time ease-in-out forwards;
    animation-delay: $animation-time;
    box-sizing: border-box;
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
    padding: 2em 0;
    opacity: 0;

    &-field {
      @extend %login-item;
    }
  }
}

.bg-bubbles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  z-index: 1;
}
.bg-bubbles li {
  position: absolute;
  list-style: none;
  display: block;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.15);
  bottom: -160px;
  -webkit-animation: square 25s infinite;
  animation: square 25s infinite;
  -webkit-transition-timing-function: linear;
  transition-timing-function: linear;
}
.bg-bubbles li:nth-child(1) {
  left: 10%;
}
.bg-bubbles li:nth-child(2) {
  left: 20%;
  width: 80px;
  height: 80px;
  -webkit-animation-delay: 2s;
  animation-delay: 2s;
  -webkit-animation-duration: 17s;
  animation-duration: 17s;
}
.bg-bubbles li:nth-child(3) {
  left: 25%;
  -webkit-animation-delay: 4s;
  animation-delay: 4s;
}
.bg-bubbles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  -webkit-animation-duration: 22s;
  animation-duration: 22s;
  background-color: rgba(255, 255, 255, 0.25);
}
.bg-bubbles li:nth-child(5) {
  left: 70%;
}
.bg-bubbles li:nth-child(6) {
  left: 80%;
  width: 120px;
  height: 120px;
  -webkit-animation-delay: 3s;
  animation-delay: 3s;
  background-color: rgba(255, 255, 255, 0.2);
}
.bg-bubbles li:nth-child(7) {
  left: 32%;
  width: 160px;
  height: 160px;
  -webkit-animation-delay: 7s;
  animation-delay: 7s;
}
.bg-bubbles li:nth-child(8) {
  left: 55%;
  width: 20px;
  height: 20px;
  -webkit-animation-delay: 15s;
  animation-delay: 15s;
  -webkit-animation-duration: 40s;
  animation-duration: 40s;
}
.bg-bubbles li:nth-child(9) {
  left: 25%;
  width: 10px;
  height: 10px;
  -webkit-animation-delay: 2s;
  animation-delay: 2s;
  -webkit-animation-duration: 40s;
  animation-duration: 40s;
  background-color: rgba(255, 255, 255, 0.3);
}
.bg-bubbles li:nth-child(10) {
  left: 90%;
  width: 160px;
  height: 160px;
  -webkit-animation-delay: 11s;
  animation-delay: 11s;
}

@keyframes square {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(-700px) rotate(600deg);
    transform: translateY(-700px) rotate(600deg);
  }
}
</style>
