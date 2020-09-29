<template>
    <div class="pagination-container">
      <button v-on:click.prevent="setPage(-1)">< Prev</button>
      <input v-model="currentPage"/>
      <button v-on:click.prevent="setPage(1)">Next ></button>
    </div>
</template>

<script>
    export default {
        name: "Pagination",
        props: {
            page: {
                type: String | Number
            }
        },
        data: () => ({
            currentPage: 1
        }),
        watch: {
            page() {
                this.currentPage = this.page;
            },
            currentPage() {
                this.$emit('page-changed', {page: this.currentPage});
            }
        },
        created() {
            this.currentPage = this.page;
        },
        methods: {
            setPage(incr) {
                let tmp = this.currentPage + incr;
                //добавить проверку на максимум
                this.currentPage = tmp < 1 ? 1 : tmp;
            },
        }
    }
</script>

<style scoped>
  .pagination-container {
    margin: 10px;
  }
  .pagination-container input {
    width: 40px;
  }
</style>
