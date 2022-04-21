<template>
  <input id="ciao" class="ciao" v-for="" />
  <p v-for="ciao">{{ greeting }} World!</p>
</template>

<script>
module.exports = {
  data: function () {
    return {
      greeting: 'Hello',
    }
  },
}
</script>

<style lang="postcss" scoped>
  .this {
    .failsToHighlight {
      display: block;
    }
  }
</style>

<style scoped>
  p {
    font-size: 2em;
    text-align: center;
  }
</style>
