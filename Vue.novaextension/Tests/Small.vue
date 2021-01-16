<template>
    <input id="ciao" class="ciao" />
    <p>{{ greeting }} World!</p>
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

<style scoped>
p {
    font-size: 2em;
    text-align: center;
}
</style>
