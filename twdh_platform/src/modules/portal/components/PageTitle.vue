<template>
  <div class="wrap-inner innertube">
    <h1 class="serif_type">{{ title.title }}</h1><hr class="divider">
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
