<template>
  <el-main>
    <template v-if="articlesLength() > 0">
      <el-row v-for="article in articles" :key="article.id">
        <Article :article="article"/>
      </el-row>
      <el-row>
        <el-col>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="count"
            :page-size="pageSize"
            :current-page="currentPage"
            @current-change="currentChange"
            @prev-click="prevClick"
            @next-click="nextClick"
          >
          </el-pagination>
        </el-col>
      </el-row>
    </template>
    <template v-else>
      <el-row>
        <el-col :span="24">
          <el-card class="box-card">
            <article>
              <h2>No Articles</h2>
            </article>
          </el-card>
        </el-col>
      </el-row>
    </template>
  </el-main>
</template>

<script>
import Article from '@/components/Article'
import axios from 'axios'

export default {
  components: {
    Article
  },
  data() {
    return {
      pageSize: 10
    }
  },
  computed: {
    articles() {
      return this.$store.state.home.articles
    },
    count() {
      return this.$store.state.home.count
    },
    currentPage() {
      const query = this.$route.query
      return (query.offset + this.pageSize) / this.pageSize
    }
  },
  watch: {
    '$route' (to) {
      this.fetchPage('/api/articles', to.query)
    }
  },
  methods: {
    articlesLength() {
      return this.$store.state.home.articles.length
    },
    currentChange(size) {
      const query = {
        limit: this.pageSize,
        offset: this.pageSize * (size - 1)
      }
      this.$router.push({ query: query})
    },
    prevClick() {
      this.$router.push({ query: Object.assign({}, this.$store.state.home.previous)})
    },
    nextClick() {
      this.$router.push({ query: Object.assign({}, this.$store.state.home.next)})
    },
    fetchPage(url, query) {
      axios.get(url, { params: query }).then((response) => {
        this.$store.dispatch('home/setArticles', { articles: response.data.results })
        this.$store.dispatch('home/setCount', { count: response.data.count })
        this.$store.dispatch('home/setNext', { next: response.data.next })
        this.$store.dispatch('home/setPrev', { prev: response.data.previous })
      })
    }
  },
  created(){
    this.fetchPage('/api/articles', this.$route.query)
  },
}
</script>

<style lang="scss">
.el-header {
  background-color: #B3C0D1;
  color: #333;
}

.edit-dialog {
  .edit-dialog__row {
    margin-bottom: 20px;
  }
}
</style>
