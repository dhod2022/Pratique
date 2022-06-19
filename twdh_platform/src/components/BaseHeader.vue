<template>
  <div class="fixed-top">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <div style="margin-left: 50px; margin-right: 40px;">
            <img src="@/assets/img/brand.png" alt="" width="25" height="30">
          </div>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link
                :to="{ name: 'Home' }"
                class="nav-link"
                >首頁</router-link
              >
            </li>  
            <li class="nav-item">
              <router-link :to="{ name: 'About' }" class="nav-link"
                >平台介紹</router-link
              >
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'System' }" class="nav-link"
                >臺灣史料脈絡分析系統</router-link
              >
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Open Data
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">            
                <li>
                  <router-link 
                    :to="{ name: 'OpendataIndex' }" 
                    class="dropdown-item"
                  >Open Data 服務</router-link
                  >
                </li>  
                <li>
                  <router-link 
                    :to="{ name: 'Retrieval' }" 
                    class="dropdown-item"
                  >整合檢索視覺化服務</router-link
                  >
                </li>      
              </ul>
            </li>


            <li class="nav-item">
              <router-link :to="{ name: 'TdocuSkyIndex' }" class="nav-link"
                >T-DocuSky</router-link
              >
            </li>    
            <li class="nav-item">
              <router-link :to="{ name: 'RelatedInfo' }" class="nav-link"
                >相關資訊</router-link
              >
            </li>
          </ul>
        </div>

        <div class="dropdown dropstart">
          <div v-if="this.$store.state.user.userName">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"/></svg>          
              <mark>{{ this.$store.state.user.userName }}</mark>
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li><a href="#" class="dropdown-item" v-on:click="handleLogout">登 出</a></li>
              <li> 
                <router-link
                  class="dropdown-item"
                  :to="{ name: 'ResetPass' }"
                  @click="showDropDownAccount"
                  >修改密碼</router-link
                >    
              </li>
            </ul>
          </div>
          <div v-else="this.$store.state.user.userName">    
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">          
              <svg height="24px" xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Person Circle</title><path d="M258.9 48C141.92 46.42 46.42 141.92 48 258.9c1.56 112.19 92.91 203.54 205.1 205.1 117 1.6 212.48-93.9 210.88-210.88C462.44 140.91 371.09 49.56 258.9 48zm126.42 327.25a4 4 0 01-6.14-.32 124.27 124.27 0 00-32.35-29.59C321.37 329 289.11 320 256 320s-65.37 9-90.83 25.34a124.24 124.24 0 00-32.35 29.58 4 4 0 01-6.14.32A175.32 175.32 0 0180 259c-1.63-97.31 78.22-178.76 175.57-179S432 158.81 432 256a175.32 175.32 0 01-46.68 119.25z"/><path d="M256 144c-19.72 0-37.55 7.39-50.22 20.82s-19 32-17.57 51.93C191.11 256 221.52 288 256 288s64.83-32 67.79-71.24c1.48-19.74-4.8-38.14-17.68-51.82C293.39 151.44 275.59 144 256 144z"/></svg>
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li>
                <router-link
                  class="dropdown-item"
                  :to="{ name: 'Login' }"
                  @click="showDropDownAccount"
                  >登 入</router-link
                > 
              </li>
              <li> 
                <router-link
                  class="dropdown-item"
                  :to="{ name: 'Register' }"                 
                  @click="showDropDownAccount"
                  >帳號申請</router-link
                >     
              </li>
            </ul>
          </div>   
        </div>

      </div>
    </nav>
  </div>
</template>
  


<script>
import VueSimpleAlert from "vue3-simple-alert";
import VueCookies from 'vue-cookies';
import axios from 'axios';


export default {
  name: 'BaseHeader',
  
  data: () => ({
    isAccountDropDown: false,
  }),

  computed: {
  },

  methods: {
    showDropDownAccount() {
      this.isAccountDropDown = !this.isAccountDropDown
    },
    handleLogout() {
      this.showDropDownAccount();
      
      VueSimpleAlert.confirm("請問您確定要登出嗎？").then(() => {
        let formData = new FormData();
        formData.append("DocuSky_SID", $cookies.get("DocuSky_SID"));
        formData.append("loginName", $cookies.get("display_name"));

        axios({
          credentials: "include",
          method: "post",
          url: "https://skolem.csie.ntu.edu.tw/DocuSky/webApi/userLogoutJson.php",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });   
        this.$store.commit('user/clearUserName');
      
        // 清空 Cookie
        $cookies.remove("display_name");
        $cookies.remove("DocuSky_SID");
        localStorage.removeItem("display_name");
        
        // 轉址到首頁
        this.$router.push("/");
      });
    },
  },


  // 初始化判斷登入狀態
  created() {
    if ("display_name" in localStorage && $cookies.isKey("display_name")) {
      this.$store.commit('user/setUserName', `${localStorage.getItem("display_name")} ~`);
    }
  },
}
</script>

<style>
</style>
