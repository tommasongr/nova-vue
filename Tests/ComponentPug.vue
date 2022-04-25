<template lang="pug">
    .container
      .row
        .col-sm-3(v-for="item in items" v-bind:key="item.id")
          .artist
            img.artist__image(v-bind:src="item.image")
            h4.text-center {{ item.title }}
</template>

<script>
import SurveyInput from './SurveyInput.vue'
export default {
    extends: SurveyInput,
    props: {
        placeholder: String,
    },
}
</script>
