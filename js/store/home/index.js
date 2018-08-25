const state = {
  articles: []
}

const actions = {
  setArticles (context, payload) {
    console.log('actions', payload)
    context.commit('setArticles', payload)
  }
}

const mutations = {
  setArticles (state, payload) {
    console.log('mutations', payload)
    state.articles = payload.articles
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}