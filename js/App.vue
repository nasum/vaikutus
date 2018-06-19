<template>
<el-container>
  <el-header>
    <h1>Vaikutus</h1>
  </el-header>
  <el-main>
    <el-button type="text" @click="dialogVisible = true">click to open the Dialog</el-button>
    <el-row v-for="article in articles" :key="article.id">
      <el-col :span="24">
        <el-card class="box-card">
          <article>
            <h2>{{ article.title }}</h2>
            {{ article.body }}
          </article>
          <div class="bottom">
            <time class="time">{{ article.created_at }}</time>
            <el-button type="text" class="button">{{ article.author.username }}</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      title="Edit Article"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose">
      <el-row>
        <el-col :span="12">
          <el-input placeholder="Please input" v-model="title"/>
          <el-input
            type="textarea" 
            class="article-editor" 
            v-model="body"/>
        </el-col>
        <el-col :span="12">
          <div>
            {{ title }}
          </div>
          <vue-markdown :source="body" />
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="save_article">save</el-button>
      </span>
    </el-dialog>
  </el-main>
</el-container>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import axios from 'axios'
import Cookie from 'js-cookie'

export default {
  components: {
    VueMarkdown
  },
  data() {
    return {
      dialogVisible: false,
      title: '',
      body: '',
      articles: []
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('Are you sure to close this dialog?')
        .then(() => {
          done()
        })
        .catch(() => {})
    },
    save_article() {
      const csrftoken = Cookie.get('csrftoken')
      axios.post('/api/articles/', 
        { 
          title: this.title, 
          body: this.body 
        } , 
        {
          headers: {
            'X-CSRFToken': csrftoken
          }
        }
      ).then(() => {
        axios.get('/api/articles').then((response) => {
          this.articles = response.data
        }).then(() => {
          this.dialogVisible = false
        })
      }) 
    }
  },
  created(){
    axios.get('/api/articles').then((response) => {
      this.articles = response.data
    })
  }
}
</script>

<style lang="scss">
.el-header {
  background-color: #B3C0D1;
  color: #333;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.article-editor {
  width: 100%;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}
</style>
