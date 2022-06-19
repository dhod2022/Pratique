<template>
  <div style="margin-top: 120px;">
    <img src="../../../assets/img/twPortal_logo_m.png" class="figure-img img-fluid rounded">
    <p class="text-center"><span style="font-size:1.2cm; font-weight:bold; color: #000000;">臺灣史料數位人文學術研究平台</span></p><br>
  </div>


  <div style="margin-top: 50px;">   
    <div style="margin-bottom: 10px; text-align: left; margin-left: 25px;">
      <svg fill="#743A3A" height="85" width="57" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24"><rect fill="none" height="24" width="24"/><path d="M14,3c0-1.1,0.9-2,2-2s2,0.9,2,2c0,1.1-0.9,2-2,2S14,4.1,14,3z M21.4,20.09c-0.23-0.05-0.46,0.02-0.64,0.17 c-0.69,0.6-1.64,0.88-2.6,0.67L17,20.69l-1-6.19l-3.32-2.67l1.8-2.89C15.63,10.78,17.68,12,20,12v-2c-1.85,0-3.44-1.12-4.13-2.72 l-0.52-1.21C15.16,5.64,14.61,5,13.7,5H8L5.5,9l1.7,1.06L9.1,7h2.35l-2.51,3.99c-0.28,0.45-0.37,1-0.25,1.52L9.5,16L6,18.35 l-0.47-0.1c-0.96-0.2-1.71-0.85-2.1-1.67c-0.1-0.21-0.28-0.37-0.51-0.42c-0.43-0.09-0.82,0.2-0.9,0.58C1.98,16.88,2,17.05,2.07,17.2 c0.58,1.24,1.71,2.2,3.15,2.51l12.63,2.69c1.44,0.31,2.86-0.11,3.9-1.01c0.13-0.11,0.21-0.26,0.24-0.41 C22.06,20.6,21.83,20.18,21.4,20.09z M8.73,18.93l3.02-2.03l-0.44-3.32l2.84,2.02l0.75,4.64L8.73,18.93z"/></svg>
    </div> 
    <div style=" margin-bottom: 10px; text-align: center;">
      <svg fill="#AE8F00" height="50" width="50" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M7,9H2V7h5V9z M7,12H2v2h5V12z M20.59,19l-3.83-3.83C15.96,15.69,15.02,16,14,16c-2.76,0-5-2.24-5-5s2.24-5,5-5s5,2.24,5,5 c0,1.02-0.31,1.96-0.83,2.75L22,17.59L20.59,19z M17,11c0-1.65-1.35-3-3-3s-3,1.35-3,3s1.35,3,3,3S17,12.65,17,11z M2,19h10v-2H2 V19z"/></g></svg> 
    </div>
    <div style=" margin-bottom: 5px; text-align: right; margin-right: 80px;">
       <svg fill="#FF8040" height="40" width="40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-5h2v5zm4 0h-2v-3h2v3zm0-5h-2v-2h2v2zm4 5h-2V7h2v10z"/></svg>
    </div>
    <div style="text-align: right; margin-right: 40px;">
      <svg  fill="#4F4F4F" height="80" width="450" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M22 12l-4-4v3H3v2h15v3z"/></svg>  
    </div>  
  

    
  
    <LayerFlow />
    <p style="margin-top: 100px; text-align: center; font-size: 55px;  font-weight: bold; font-style: italic;">
      <span style="color: #C48888;">One-Stop Services. </span>
      <span style="color: #FFAD86;">Simple Work Flow. </span>
    </p>
    <p style="color: #5B5B5B; text-align: center; font-style: italic; font-weight: bold; font-size: 25px;">快點選按鈕開始使用吧！</p>
  </div>


  <div style="margin-bottom: 230px;"></div>
</template>

<script>
import LayerFlow from '../components/LayerFlow'

export default {
  name: 'Home',

  metaInfo: {
  },

  components: {
    LayerFlow,
  },

  data: () => ({
  }),

  computed: {
  },

  methods: {
  },

  created() {
  },

  unmounted() {
  }
}
</script>



<style>
  a.logo {     
    display: block; 
    width: 100%; 
    height: 33px; 
    margin: 11px auto 0 auto;
  }
</style>



