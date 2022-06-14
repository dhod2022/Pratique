<template>
  <PageTitle :title="{title: '臺灣史料脈絡分析系統'}" />
  <Material />
  <div class="button_system_next_div">
    <button class="button_system_next" @click="nextPage">前往 Open Data 服務 →</button>
  </div>
</template>



<script>
import Material from '../components/Material'
import PageTitle from '../components/PageTitle'


export default {
  name: 'System',
  
  components: {
    Material,
    PageTitle,
  },
  methods:{
    nextPage(){
      this.$router.push({ name: this.$router.currentRoute.value.meta.next });
    },
  },
} 
</script>
