<template>
  <input id="ciao" class="ciao" v-for="" />
  <p v-for="ciao">{{ greeting }} World!</p>

  <input type="text">
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

<style lang="scss" scoped>

.icon-grid {
  @media (max-width: calc(#{$lg} - 1px)) {
    grid-template-columns: 1fr;
  }
  .grid-item {
    @media (max-width: calc(#{$lg} - 1px)) {
      padding-bottom: 5.7rem;
    }
    h4 {
      @media (max-width: calc(#{$lg} - 1px)) {
        padding: 2rem 0 0.6rem;
      }
    }

    img {
      @media (max-width: calc(#{$lg} - 1px)) {
        height: 7.5rem;
      }
    }
  }
}

</style>

<style scoped>
  p {
    font-size: 2em;
    text-align: center;
  }
</style>
