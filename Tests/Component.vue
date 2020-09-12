<!-- This is a comment -->

<!-- This is a multiline
comment -->

<template>
    <div class="book-card">
        <a
            v-if="bookData.link"
            :href="bookData.link"
            target="_blank"
            rel="nofollow noopener noreferrer"
        >
            <div class="book-cover">
                <g-image
                    :src="bookData.cover"
                    style="width: 100%; height: min-intrinsic;"
                />
            </div>
        </a>
        <div v-else class="book-cover">
            <g-image
                :src="bookData.cover"
                style="width: 100%; height: min-intrinsic;"
            />
        </div>
        <div class="book-info">
            <span>{{{}}}</span>
            <span>{{ bookData.title }}</span>
            <span>{{ catagoriesLabel }}</span>
        </div>
    </div>
</template>

<script>
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

<style scoped>
.book-card {
    display: flex;
    flex-direction: column;
}

.book-card a {
    opacity: 1;
}

.book-cover {
    display: flex;
    /* border: solid 1px var(--color-text); */
    /* padding: 2px; */
}

.book-info {
    margin-top: var(--measure-1);
    display: flex;
    flex-direction: column;
    width: 85%;
}

.book-info span:first-of-type {
    font-weight: 600;
}

.book-info span:last-of-type {
    opacity: 0.5;
}
</style>
