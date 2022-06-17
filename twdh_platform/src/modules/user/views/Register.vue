<template>
  <div style="margin-top: 200px;">
    <div style="text-align: center; margin-bottom: 50px;"><h3>帳號申請</h3></div>
    <div>
      <Form @submit="handleRegisterCheck">        
        <label class="form-label">電子信箱：</label>
        <Field 
          type="text"
          class="form-control form-control-lg"
          name="email"
        /><br>
        <span class="register_password_apply">* 本中心同意後，密碼將寄至此信箱</span>
        <label class="form-label">姓名：</label>
        <Field 
          type="text"
          class="form-control form-control-lg"
          name="realname"
        /><br>
        <label class="form-label">所屬單位及職稱：</label>
        <Field 
          type="text"
          class="form-control form-control-lg"
          name="job_title"
        /><br>
        <label class="form-label">申請用途簡述：</label>
        <Field 
          type="text"
          class="form-control form-control-lg"
          name="research_description"
        /><br>
        <div class="d-grid gap-2" style="margin-top: 8px;">
          <button class="btn btn-primary">送出申請資料</button>      
        </div>
        <div style="margin-top: 40px; font-size: 14px;"> 
          <router-link :to="{ name: 'Login' }"
            >前往登入頁面</router-link
          >
        </div>
      </Form>
    </div>
  </div>



  <div style="margin-bottom: 100px;"></div>
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
        VueSimpleAlert.alert("電子信箱為必填欄位！");
      } else if (!(validator.isEmail(account.email.trim()))) {
        VueSimpleAlert.alert("請填寫有效且格式正確的電子信箱！");
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
