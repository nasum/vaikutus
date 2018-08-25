<template>
<el-container>
  <el-header height="75">
    <el-row>
      <el-col :span="21">
        <h1>Vaikutus</h1>
      </el-col>
      <el-col :span="3" style="padding: 20px 0;">
        <el-button type="primary" @click="dialogVisible = true" round>New Article</el-button>
      </el-col>
    </el-row>
  </el-header>
  <router-view></router-view>
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
</el-container>
</template>

<script>
import Cookie from 'js-cookie'
import axios from 'axios'

export default {
  name: 'Default',
  data(){
    return {
      dialogVisible: false,
      activeName: 'edit',
      title: '',
      body: '',
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
        console.log(this.$route.query)
        axios.get('/api/articles', { params: this.$route.query }).then((response) => {
          this.$store.dispatch('home/setArticles', { articles: response.data.results })
          this.$store.dispatch('home/setCount', { count: response.data.count })
          this.$store.dispatch('home/setNext', { next: response.data.next })
          this.$store.dispatch('home/setPrev', { prev: response.data.previous })
        }).then(() => {
          this.dialogVisible = false
        })
      })
    }
  }
}
</script>


