<template>
    <div class="position-relative m-4">
      <div class="progress-bar bg-secondary" style="height: 3px;"></div>
      <button type="button" class="btn btn-warning rounded-pill position-absolute top-0 start-0 translate-middle"  @click="systemIndexPage"><h5>史料脈絡分析</h5></button>
      <button type="button" class="btn btn-primary rounded-pill position-absolute top-0 start-50 translate-middle"  @click="opendataIndexPage"><h5>Open Data</h5></button>
      <button type="button" class="btn btn-success rounded-pill position-absolute top-50 start-100 translate-middle"  @click="tdocuskyIndexPage"><h5>T&#8722;DocuSky</h5></button>
    </div>
</template>


<script>
export default {
  name: 'LayerFlow',
  
  components: {
  },
  methods:{
    systemIndexPage(){
      this.$router.push({ name: 'System' });
    },
    opendataIndexPage(){
      this.$router.push({ name: 'OpendataIndex' });
    },
    tdocuskyIndexPage(){
      this.$router.push({ name: 'TdocuSkyIndex' });
    },
  },
} 
</script>