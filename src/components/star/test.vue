<template>
  <div class="star" v-bind:class="starType">
    <span v-for="itemClass in itemClasses" class="star-item"></span>
  </div>
</template>
<script>
  const LENGTH = 5
  const CLS_ON = 'on'
  const CLS_HALF = 'half'
  const CLS_OFF = 'off'
  export default {
    props: {
      size: Number,
      score: Number
    },
    computed: {
      starType () {
        return 'star-' + this.size
      }
    },
    itemClasses () {
      let result = []
      let score = Math.floor(this.score * 2) / 2
      let hasDecimal = score % 1 !== 0
      let integer = Math.floor(score)
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  }
</script>
<style type="text/css">
  
</style>