<template>
  <main class="main">
    <div class="account">
      <div class="container">
        <h1 class="account__title">帳號申請</h1>
        <div class="account__form">
          <Form @submit="handleRegisterCheck">
            <Field 
              type="text"
              class="txt"
              placeholder="電子信箱"
              name="email"
            />
            <span class="register_password_apply">*本中心同意後，密碼將寄至此信箱</span>
            <Field 
              type="text"
              class="txt"
              placeholder="姓名"
              name="realname"
            />
            <Field 
              type="text"
              class="txt"
              placeholder="所屬單位及職稱"
              name="job_title"
            />
            <Field 
              type="text"
              class="txt"
              placeholder="申請用途簡述"
              name="research_description"
            />
            <button
              class="btn_register btn--brand btn--boxshadow w--100"
            >
              送出申請資料
            </button>
            <div class="account__footer">
              <span>已有帳號？</span>
              <router-link :to="{ name: 'Login' }" class="account__router"
                >前往登入頁面</router-link
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
import validator from 'validator';
import VueSimpleAlert from "vue3-simple-alert";
import axios from 'axios';


export default {
  name: "Register",
  components: {
    Form,
    Field,
  },
  methods: {
    handleRegisterCheck(account) {
      if (!(account.email && account.email.trim())) {
        VueSimpleAlert.alert("信箱為必填欄位！");
      } else if (!(validator.isEmail(account.email.trim()))) {
        VueSimpleAlert.alert("請填寫有效且格式正確的信箱！");
      } else if (!(account.realname && account.realname.trim())) {
        VueSimpleAlert.alert("姓名為必填欄位！");
      } else if (!(account.job_title && account.job_title.trim())) {
        VueSimpleAlert.alert("所屬單位及職稱為必填欄位！");
       } else if (!(account.research_description && account.research_description.trim())) {
        VueSimpleAlert.alert("申請用途簡述為必填欄位！");
      } else {
        this.handleRegister(account);
      }
    },
    handleRegister(account) {
      let formData = new FormData();
      formData.append("email", account.email);
      formData.append("realname", account.realname);
      formData.append("job_title", account.job_title);
      formData.append("research_description", account.research_description);
      formData.append("agreement", true);
      axios({
        credentials: "include",
        method: "post",
        url: "https://skolem.csie.ntu.edu.tw/DocuSky/home/auxApi/applyAccount.php",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        const code =  parseInt(res.data.code);
        if (code == 0 && res.data.message == 'OK') {
          VueSimpleAlert.alert("帳號申請成功，請等待工作人員檢核完成。通過後會將帳號與密碼寄到您的申請信箱，屆時請登入後修改密碼。如果有任何問題，請透過docusky.contact@gmail.com與我們聯繫。");  
          // 轉址到首頁
          this.$router.push("/");     
        } else {
          VueSimpleAlert.alert("申請失敗，請檢查欄位輸入正確後重新送出申請。");  
        }
      }).catch((error) => { console.log(error); });
    },
  },
}
</script>

<style></style>
