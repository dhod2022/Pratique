<template>
  <div class="button_system_next_div">
    <button class="button_system_next" @click="nextPage">{{ label.label }}</button>
  </div>
</template>


<script>
export default {
  name: 'ButtonNext',

  props: {
    "label": {
      type: Object, // 試過String只能顯示數字的String，中英文字皆無法顯示，所以用Object
      required: true
    },
  },
  methods:{
    nextPage(){
      this.$router.push({ name: this.$router.currentRoute.value.meta.next });
    },
  },
}
</script>
