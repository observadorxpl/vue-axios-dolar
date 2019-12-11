import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      loading:{
          titulo: 'Cargando',
          color: 'primary',
          estado: false
      }
  },
  mutations: {
      mostrarDialogo(state, payload){
          state.loading.titulo = payload.titulo
          state.loading.color = payload.color
          state.loading.estado = true
      },
      ocultarDialogo(state){
          state.loading.estado = false
      }
  },
  actions: {
  },
  modules: {
  }
})
