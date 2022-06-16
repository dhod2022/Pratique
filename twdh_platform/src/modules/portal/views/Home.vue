<template>
  <div style="margin-top: 120px;">
    <img src="../../../assets/img/twPortal_logo_m.png" class="figure-img img-fluid rounded">
    <p class="fs-1 text-center"><span style="font-weight:bold; color: #363636;">臺灣史料數位人文學術研究平台</span></p><br>
  </div>
  <div style="margin-bottom: 200px;">
    <Material />
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import Material from '../components/Material'
export default {
  name: 'Home',

  metaInfo: {
  },

  components: {
    Material,
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



