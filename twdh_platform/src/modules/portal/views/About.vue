<template>
  <div>
		<PageTitle :title="{title: '臺灣史料數位人文學術研究平台'}" />
    <div style="text-align:center;"> 
      <svg height="26" width="26" xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Cloudy</title><path d="M100.18 241.19a15.93 15.93 0 0013.37-13.25C126.6 145.59 186.34 96 256 96c64.69 0 107.79 42.36 124.92 87a16.11 16.11 0 0012.53 10.18C449.36 202.06 496 239.21 496 304c0 66-54 112-120 112H116c-55 0-100-27.44-100-88 0-54.43 43.89-80.81 84.18-86.81z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/></svg>  
    </div>
  </div>


  <div style="margin-top: 80px;">
    <div class="card" style="width: 90%;">
      <div style="text-align: center;"><img src="../../../assets/img/architecture.png" class="card-img-top"></div>
      <div class="card-body" style="margin-top: 50px;">
        <h4 class="card-title">歡迎使用 &nbsp;&nbsp;臺灣史料數位人文學術研究平台！</h4><br>
        <h5 class="card-subtitle mb-2 text-muted" style="line-height: 1.35em;">
          數位人文是運用數位資源，透過資訊科技從事人文研究的新興研究方法。本平台於 2022 年成立，是臺灣第一個以臺灣史料為主軸所建構的數位人文學術研究平台。
          這十餘年來，臺灣大學數位人文研究中心建置了 <span style="color: red;">40</span> 餘個臺灣史料脈絡分析系統，内容大多數為臺灣第一手史料與典籍。由於内容的唯一和獨特性與强大的數位人文分析與視覺化功能，這些史料脈絡分析系統已成爲臺灣學術研究不可或缺的資源。
          另為達資料保存與整合檢索之目的，臺灣史料數位人文學術研究平台透過 Open Data 提供格式轉換與資料整合之服務。
          並整合 2018 年推出的「DocuSky 數位人文學術研究平台」，提供 T-DocuSky 應用，透過簡單工作流程進行個人化材料整理、使用與分析，以完善臺灣史料學術研究之個人化數位環境設施和一站式整合之數位人文服務。				
        </h5>
      </div>
    </div>


    <div style="margin-bottom: 250px;"></div>
  </div>
</template>

<script>
import { computed } from 'vue'
import PageTitle from '../components/PageTitle'


export default {
  name: 'About',

  components: {
    PageTitle,
  }
}
</script>
