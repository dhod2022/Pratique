<template>
  <div style="margin-top: 100px; text-align:center;">
    <p class="fs-2" style="font-weight:bold;">{{ title.title }}</p>
  </div>
</template>


<script>
export default {
  name: 'PageTitle',

  props: {
    "title": {
      type: Object, // 試過String只能顯示數字的String，中英文字皆無法顯示，所以用Object
      required: true
    },
  },
}
</script>
