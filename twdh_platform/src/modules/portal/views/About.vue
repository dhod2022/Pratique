<template>
  <PageTitle :title="{title: '臺灣史料數位人文學術研究平台'}" />
  <div class="about">
    <span  style="margin-left: 2.5%; margin-top: 3%; margin-bottom: 2%;"><h2>平台介紹</h2></span>
    <div class="introduction">
      歡迎使用<span style="font-weight: bold"><h3>&nbsp;&nbsp;臺灣史料數位人文學術研究平台！</h3></span><br>
      數位人文是運用數位資源，透過資訊科技從事人文研究的新興研究方法。本平台於 2022 年成立，是臺灣第一個以臺灣史料為主軸所建構的數位人文學術研究平台。
      這十餘年來，臺灣大學數位人文研究中心建置了 <span style="color: red;">40</span> 餘個臺灣史料脈絡分析系統，内容大多數為臺灣第一手史料與典籍。由於内容的唯一和獨特性與强大的數位人文分析與視覺化功能，這些史料脈絡分析系統已成爲臺灣學術研究不可或缺的資源。
      另為達資料保存與整合檢索之目的，臺灣史料數位人文學術研究平台透過 Open Data 提供格式轉換與資料整合之服務。
      並整合 2018 年推出的「DocuSky 數位人文學術研究平台」，提供 T-DocuSky 應用，透過簡單工作流程進行個人化材料整理、使用與分析，完善臺灣史料學術研究之個人化數位環境設施和一站式整合之數位人文服務。				
    </div>

    <span  style="margin-left: 2.5%; margin-top: 5.5%; margin-bottom: 1.5%;"><h2>架構圖</h2></span><br>
    <div>
      <a class="architecture_img"></a>	
    </div>

    <span  style="margin-left: 2.5%; margin-top: 5%; margin-bottom: 2%;"><h2>教學文件</h2></span>
    <div class="introduction">
			xxx.pdf
    </div>

    <span  style="margin-bottom: 8%;"></span>
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
