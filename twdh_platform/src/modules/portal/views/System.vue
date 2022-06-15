<template>
  <PageTitle :title="{title: '臺灣史料脈絡分析系統'}" />
  <Material />
  <ButtonNext :label="{label: '前往 Open Data 服務 →'}" />
</template>



<script>
import Material from '../components/Material'
import PageTitle from '../components/PageTitle'
import ButtonNext from '../../../components/ButtonNext'


export default {
  name: 'System',
  
  components: {
    Material,
    PageTitle,
    ButtonNext,
  },
  methods:{
  },
} 
</script>
