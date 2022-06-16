<template>
  <div>
		<PageTitle :title="{title: '臺灣史料脈絡分析系統'}" />
    <div style="text-align:center;">
      <svg height="25" width="25" xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Copy</title><rect x="128" y="128" width="336" height="336" rx="57" ry="57" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/><path d="M383.5 128l.5-24a56.16 56.16 0 00-56-56H112a64.19 64.19 0 00-64 64v216a56.16 56.16 0 0056 56h24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>
    </div>
  </div>




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
