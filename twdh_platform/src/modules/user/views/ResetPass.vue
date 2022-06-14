<template>
  <main class="main">
    <div class="account">
      <div class="container">
        <h1 class="account__title">{{ userNameLabel }} 申請修改密碼</h1>
        <div class="account__form">
          <Form @submit="resetCheck">
            <Field 
              type="password"
              class="txt"
              placeholder="舊密碼"
              name="old_psw"
            />
            <Field 
              type="password"
              class="txt"
              placeholder="新密碼"
              name="new_psw"
            />
            <Field 
              type="password"
              class="txt"
              placeholder="請再輸入新密碼一次"
              name="new_psw_again"
            />
            <button class="btn btn--brand btn--boxshadow w--100">送 出</button> 
          </Form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { Form, Field } from "vee-validate";
import VueSimpleAlert from "vue3-simple-alert";
import axios from 'axios';
import VueCookies from 'vue-cookies';

export default {
  name: "ResetPass",
  components: {
    Form,
    Field,
  },
  data() {
    return {
      userNameLabel: $cookies.get("display_name"),
    };
  },
    methods: {
    resetCheck(resetObj) {
      if (!(resetObj.old_psw && resetObj.old_psw.trim())) {
        VueSimpleAlert.alert("舊密碼為必填欄位！");
      } else if (!(resetObj.new_psw && resetObj.new_psw.trim())) {
        VueSimpleAlert.alert("新密碼為必填欄位！");
      } else if (!(resetObj.new_psw_again && resetObj.new_psw_again.trim())) {
        VueSimpleAlert.alert("請再輸入新密碼為必填欄位！");
       } else if (!(resetObj.new_psw.trim() == resetObj.new_psw_again.trim())) {
        VueSimpleAlert.alert("兩次新密碼輸入不相同！");
      } else {
        VueSimpleAlert.confirm("請問您確定要修改密碼嗎？").then(() => {
          this.handleReset(resetObj);
        });
      }
    },
    handleReset(resetObj) {
      let formData = new FormData();
      formData.append("oldpassword", resetObj.old_psw);
      formData.append("newpassword", resetObj.new_psw);
      formData.append("confirm", resetObj.new_psw_again);
      formData.append("username", $cookies.get("display_name"));
      axios({
        credentials: "include",
        method: "post",
        url: "https://skolem.csie.ntu.edu.tw/DocuSky/home/auxApi/changePassword.php",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        const code =  parseInt(res.data.code);
        if (code == 0 && res.data.message == 'OK') {
          VueSimpleAlert.alert("變更密碼成功，下次請用新密碼登入！");  
          // 轉址到首頁
          this.$router.push("/");     
        } else {
          VueSimpleAlert.alert("修改失敗，請檢查欄位輸入正確後重新送出申請。");  
        }
      }).catch((error) => { console.log(error); });
    },
  },
}
</script>

<style></style>
