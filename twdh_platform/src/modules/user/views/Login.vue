<template>
  <div style="margin-top: 200px;">
    <div style="text-align: center; margin-bottom: 50px;"><h3>請輸入帳號密碼</h3></div>
    <div>
      <Form @submit="fieldCheck">
        <label class="form-label">帳 號：</label>
        <Field 
          type="text"
          class="form-control form-control-lg"
          name="account"
        /><br>
        <label class="form-label">密 碼：</label>
        <Field  
           type="password"
           class="form-control form-control-lg" 
          name="password"
        />
        <div class="d-grid gap-2" style="margin-top: 20px;">
          <button class="btn btn-primary">登 入</button>      
        </div>

        <div style="margin-top: 60px; font-size: 14px;"> 
          <router-link :to="{ name: 'ForgetPass' }"
            >忘記密碼？</router-link
          ><br><br>

          <router-link :to="{ name: 'Register' }"
            >尚未申請帳號？</router-link
          >
        </div>
      </Form>
    </div>
  </div>

  <div style="margin-bottom: 100px;"></div>
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
              localStorage.setItem("display_name", storageObj.display_name);

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
