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
            :total="100">
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
    return {}
  },
  computed: {
    articles() {
      return this.$store.state.home.articles
    }
  },
  methods: {
    articlesLength() {
      return this.$store.state.home.articles.length
    }
  },
  created(){
    axios.get('/api/articles').then((response) => {
      this.$store.dispatch('home/setArticles', { articles: response.data })
    })
  }
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
