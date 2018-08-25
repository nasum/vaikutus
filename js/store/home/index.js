const state = {
  articles: [],
  count: 0,
  prev: {},
  next: {}
}

const actions = {
  setArticles (context, payload) {
    context.commit('setArticles', payload)
  },
  setCount (context, payload) {
    context.commit('setCount', payload)
  },
  setNext (context, payload) {
    context.commit('setNext', payload)
  },
  setPrev (context, payload) {
    context.commit('setPrev', payload)
  }
}

const mutations = {
  setArticles (state, payload) {
    state.articles = payload.articles
  },
  setCount (state, payload) {
    state.count = payload.count
  },
  setNext (state, payload) {
    state.next = createUrlQueryParamaterObject(payload.next)
  },
  setPrev (state, payload) {
    state.prev = createUrlQueryParamaterObject(payload.prev)
  },
}

function createUrlQueryParamaterObject(url) {
  if (!url) {
    return {}
  }
  const queryPairArray = url.split('?')[1].split('&')
  const queryObject = {}
  queryPairArray.forEach(pairSt => {
    const pairArray = pairSt.split('=')
    queryObject[pairArray[0]] = pairArray[1]
  })
  return queryObject
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}