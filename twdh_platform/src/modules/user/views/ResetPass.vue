<template>
  <div style="margin-top: 200px;">
    <div style="text-align: center; margin-bottom: 50px;"><h3>申請修改密碼</h3></div>
    <div>
      <Form @submit="resetCheck">
        <label class="form-label">舊密碼：</label>
        <Field 
          type="password"
          class="form-control form-control-lg"
          name="old_psw"
        /><br>
        <label class="form-label">新密碼：</label>
        <Field 
          type="password"
          class="form-control form-control-lg"
          name="new_psw"
        /><br>
        <label class="form-label">請再輸入新密碼一次：</label>
        <Field 
          type="password"
          class="form-control form-control-lg"
          name="new_psw_again"
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
