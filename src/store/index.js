import Vue from "vue";
import Vuex from "vuex";
import { api } from "@/services.js";

Vue.use(Vuex);

export default new Vuex.Store({
  // o objetivo é colocar o usuário no estado geral, todas as informações dentro do state, pois irei precisar dessa info em
  // diversas partes diferentes do site, por isso não se poe em componente específico..
  state: {
    login: false, //a primeira coisa é ver se está logado, por padrão é false
    usuario: {
      // usuário será um objeto que tem:
      id: "", // porque não cria um objeto só com coisas com endereço? Porque isso tornaria o Vuex extremamente dificil (não vale a pena)
      nome: "",
      email: "",
      senha: "",
      cep: "",
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
    },
  },
  mutations: {
    UPDATE_LOGIN(state, payload) {
      // mudar o estado de login para true
      state.login = payload;
    },
    UPDATE_USUARIO(state, payload) {
      state.usuario = Object.assign(state.usuario, payload); //object.assign combina objetos, que são esses 2
    },
  },
  actions: {
    //return api para poder usar o .then em outros lugares, exemplo login criar no metodo criarUsuario
    getUsuario(context, payload) {
      return api.get(`/usuario/${payload}`).then((response) => {
        context.commit("UPDATE_USUARIO", response.data); //depois que pega o usuário e logo faz-se o update no login, entao sao duas mutações de uma vez só
        context.commit("UPDATE_LOGIN", true);
      });
    },
    criarUsuario(context, payload) {
      //quando estiver postando a informação ele irá atualizar o usuário com o email e vai criar a postagem final
      context.commit("UPDATE_USUARIO", { id: payload.email });
      return api.post(`/usuario`, payload);
    },
  },
  modules: {},
});
