<!-- This is a comment -->

<!-- This is a multiline
comment -->

<template>
    <div class="book-card">
        <h1 v-for="console.log()"></h1>
        <a
            v-if="console.log()"
            :href="bookData.link"
            @onClick="console.log"
            target="_blank"
            rel="nofollow noopener noreferrer"
        >
            <div class="book-cover">
                <g-image
                    :src="bookData.cover"
                    style="width: 100%; height: min-intrinsic"
                />
            </div>
        </a>
        <div v-else class="book-cover">
            <g-image
                :src="bookData.cover"
                style="width: 100%; height: min-intrinsic"
            />
        </div>
        <div class="book-info">
            <span>{{ bookData.title }}</span>
            <span>{{ catagoriesLabel }}</span>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        bookData: {
            type: Object,
            required: true,
        },
    },

    computed: {
        catagoriesLabel() {
            let tmpString = ''

            this.bookData.categories
                .map((cat) => {
                    return cat.id
                })
                .sort()
                .forEach((cat) => {
                    if (tmpString == '') {
                        tmpString = cat
                    } else {
                        tmpString = tmpString + ', ' + cat
                    }
                })

            return tmpString
        },
    },
}
</script>

<style lang="sass" scoped>
$font-stack:    Helvetica, sans-serif
$primary-color: #333

body
  font: 100% $font-stack
  color: $primary-color
</style>

<style lang="scss" scoped>
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
    font: 100% $font-stack;
    color: $primary-color;
}
</style>

<style lang="less" scoped>
@width: 10px;
@height: @width + 10px;

#header {
    width: @width;
    height: @height;
}
</style>
