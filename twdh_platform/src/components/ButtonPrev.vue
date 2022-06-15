<template>
  <div class="button_system_prev_div">
    <button class="button_system_prev" @click="prevPage">{{ label.label }}</button>
  </div>
</template>


<script>
export default {
  name: 'ButtonPrev',

  props: {
    "label": {
      type: Object, // 試過String只能顯示數字的String，中英文字皆無法顯示，所以用Object
      required: true
    },
  },
  methods:{
    prevPage(){
      this.$router.push({ name: this.$router.currentRoute.value.meta.prev });
    },
  },
}
</script>
