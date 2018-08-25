<template>
  <el-col :span="24">
    <el-card class="box-card">
      <article>
        <h2>{{ article.title }}</h2>
        <vue-markdown :source="article.body"/>
      </article>
      <div class="bottom">
        <time class="time">{{ article.created_at }}</time>
        <el-button type="text" class="button">{{ article.author.username }}</el-button>
      </div>
    </el-card>
  </el-col>
</template>

<script>
export default {
  name: 'Article',
  props: {
    article: {
      type: Object
    }
  }
}
</script>

<style style="scss">
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
