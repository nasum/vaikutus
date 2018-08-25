<template>
<el-container>
  <el-header :height="75">
    <el-row>
      <el-col :span="22">
        <h1>Vaikutus</h1>
      </el-col>
      <el-col :span="2" style="padding: 20px 0;">
        <el-button type="primary" @click="dialogVisible = true" round>Edit</el-button>
      </el-col>
    </el-row>
  </el-header>
  <el-main>
    <el-row v-for="article in articles" :key="article.id">
      <Article :article="article"/>
    </el-row>
    <el-dialog
      class="edit-dialog"
      title="Edit Article"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose">
      <el-tabs v-model="activeName">
        <el-tab-pane label="Edit" name="edit">
          <el-input
            placeholder="Please input"
            v-model="title"
            style="margin-bottom: 20px;"
          />
          <el-input
            type="textarea"
            class="article-editor"
            v-model="body"
            :autosize="{ minRows: 10, maxRows: 10}"
          />
        </el-tab-pane>
        <el-tab-pane label="Preview" name="preview">
          <div>
            {{ title }}
          </div>
          <vue-markdown :source="body"/>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="save_article">save</el-button>
      </span>
    </el-dialog>
  </el-main>
</el-container>
</template>

<script>
import Article from '@/components/Article'
import VueMarkdown from 'vue-markdown'
import axios from 'axios'
import Cookie from 'js-cookie'

export default {
  components: {
    VueMarkdown,
    Article
  },
  data() {
    return {
      dialogVisible: false,
      activeName: 'edit',
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
          console.log(response.data)
          this.articles = response.data
        }).then(() => {
          this.dialogVisible = false
        })
      })
    }
  },
  created(){
    axios.get('/api/articles').then((response) => {
      console.log(response.data)
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

.edit-dialog {
  .edit-dialog__row {
    margin-bottom: 20px;
  }
}
</style>
