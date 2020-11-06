<!-- This is a comment -->

<!-- This is a multiline
comment -->

<template #slotname v-slot:content>
    <div class="book-card">
        <transition></transition>
        <hello-world />
        <div @click="() => console.log(hello)"></div>
        <transition @click=""></transition>
        <a
            v-if="console.log()"
            :href="bookData.link"
            @click="console.log"
            @click:native="console.log"
            target="_blank"
            rel="nofollow noopener noreferrer"
        >
            <div class="book-cover" v-on:click.ctrl.native="onCtrlClick">
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
        <NuxtChild></NuxtChild>
        <div class="book-info">
            <span>{{ bookData.title }}</span>
            <span>{{ catagoriesLabel }}</span>
        </div>
    </div>
</template>

<script>
;() => console.log(hello)
</script>

<script>
export default {
    props: {
        bookData: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            show: false,
        }
    },

    computed: {
        catagoriesLabel({ params, $http }) {
            let tmpString = `hello world ${ciaone}`
            let tmpString = 90 + 23
            let tmpString = this.bookData.categories
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
