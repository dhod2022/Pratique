<template>
  <main class="main">
    <div class="account">
      <div class="container">
        <h1 class="account__title">請輸入帳號密碼</h1>
        <div class="account__form">
          <Form @submit="fieldCheck">
            <Field 
              type="text"
              class="txt"
              placeholder="帳號"
              name="account"
            />
            <Field  
              type="password"
              class="txt" 
              placeholder="密碼"
              name="password"
            />
            <button class="btn btn--brand btn--boxshadow w--100">登 入</button>
              <router-link :to="{ name: 'ForgetPass' }" class="forgetpass__router"
                >忘記密碼？</router-link
              >
            <div class="account__footer">
              <span>尚未申請帳號？</span>
              <router-link :to="{ name: 'Register' }" class="account__router"
                >前往申請頁面</router-link
              >
            </div>
          </Form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { Form, Field } from "vee-validate";
import axios from 'axios';
import VueSimpleAlert from "vue3-simple-alert";
import VueCookies from 'vue-cookies';


export default {
  name: "Login",
  components: {
    Form,
    Field,
  },
  methods: {
    fieldCheck(user) {
      if (!(user.account && user.account.trim())) {
        VueSimpleAlert.alert("帳號為必填欄位！");
      } else {
        if (!(user.password && user.password.trim())) {
          VueSimpleAlert.alert("密碼為必填欄位！");
        } else {
          this.handleLogin(user);
        }
      }
    },
    async handleLogin(user) {
      const storageObj = {};

      let formData = new FormData();
      formData.append("dsUname", user.account);
      formData.append("dsPword", user.password);
      axios({
        credentials: "include",
        method: "post",
        url: "https://skolem.csie.ntu.edu.tw/DocuSky/webApi/userLoginJson.php",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res0) => {
         const code =  parseInt(res0.data.code);
          if (code == 0) {
            const messageUserLogin = res0.data.message;
            const messageArr = messageUserLogin.split("=");
            // DocuSky_SID
            storageObj[messageArr[0]] = messageArr[1]; 
          
            axios({
              credentials: "include",
              method: "get",
              url: "https://skolem.csie.ntu.edu.tw/DocuSky/webApi/getUserProfileJson.php",
              params: { username: user.account, DocuSky_SID: storageObj.DocuSky_SID },
              headers: { "Content-Type": "application/json" },
            })
            .then((res1) => {
              const messageUserProfile = res1.data.message;
              // username
              storageObj.username = messageUserProfile.username;
              // display_name
              storageObj.display_name = messageUserProfile.display_name;
              
              // storageObj 存入 Cookie
              $cookies.set("display_name", storageObj.display_name, "58min");
              $cookies.set("DocuSky_SID", storageObj.DocuSky_SID, "58min");

              this.$store.commit('user/setUserName', `${res1.data.message.display_name} ~`);
            })    

            VueSimpleAlert.alert("登入成功!");  
            // 轉址到首頁
            // this.$router.go(-1); 轉址到前一頁
            this.$router.push("/"); 
          } else {          
            VueSimpleAlert.alert("登入失敗，請檢查帳號密碼輸入正確後重新登入。");
          }
      }).catch((error) => { console.log(error); });
    },
  },
}
</script>

<style></style>
