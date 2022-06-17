<template>
  <div style="margin-top: 200px;">
    <div style="text-align: center; margin-bottom: 50px;"><h3>忘記密碼</h3></div>
    <div style="text-align: left; margin-bottom: 50px; font-size: 15.5px;">
      <span class="forget__span">請輸入原帳號（電子信箱），密碼將會被重置並寄送至您的信箱。<br>
      麻煩再請使用者登入逕行修改密碼。
    </span>
    </div>
    <div>
      <Form @submit="forgetCheck">
        <label class="form-label">電子信箱：</label>
        <Field 
          type="text"
          class="form-control form-control-lg"
          name="email"
        /><br>
        <div class="d-grid gap-2" style="margin-top: 20px;">
          <button class="btn btn-primary">送 出</button>      
        </div>
      </Form>
    </div>
  </div>

  <div style="margin-bottom: 100px;"></div>
</template>


<script>
import { Form, Field } from "vee-validate";
import VueSimpleAlert from "vue3-simple-alert";
import axios from 'axios';
import validator from 'validator';

export default {
  name: "ForgetPass",
  components: {
    Form,
    Field,
  },
  methods: {
    forgetCheck(forgetObj) {
      if (!(forgetObj.email && forgetObj.email.trim())) {
        VueSimpleAlert.alert("電子信箱為必填欄位！");
      } else if (!(validator.isEmail(forgetObj.email.trim()))) {
        VueSimpleAlert.alert("請填寫有效且格式正確的電子信箱！");
      } else {
        VueSimpleAlert.confirm("請問您確定要送出嗎？").then(() => {
          this.handleForget(forgetObj);
        });
      }
    },
    handleForget(forgetObj) {
      let formData = new FormData();
      formData.append("email", forgetObj.email);
      axios({
        credentials: "include",
        method: "post",
        url: "https://skolem.csie.ntu.edu.tw/DocuSky/home/auxApi/forgetPassword.php",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        const code =  parseInt(res.data.code);
        if (code == 0 && res.data.message == 'OK') {
          VueSimpleAlert.alert("密碼將會被重置並寄送至您的信箱，再請登入後逕行修改密碼。");  
          // 轉址到首頁
          this.$router.push("/");     
        } else {
          VueSimpleAlert.alert("設定失敗，請再試一次。");  
        }
      }).catch((error) => { console.log(error); });
    },
  },
}
</script>

<style></style>
