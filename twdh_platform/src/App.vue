<template>
  <div id="app" class="container">
    <BaseHeader  />
    <router-view />
    <BaseFooter  />
  </div>
</template>

<script>
import BaseHeader from './components/BaseHeader'
import BaseFooter from './components/BaseFooter'


export default {
  data: () => ({
  }),

  components: {
    BaseHeader,
    BaseFooter
  },

  methods: {
  },

  // 初始化判斷登出狀態
  created() {
    if (!($cookies.isKey("display_name"))) {
      localStorage.removeItem("display_name");
    }
  },
}
</script>

<style></style>
