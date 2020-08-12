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
    usuario_produtos: null,
  },
  mutations: {
    UPDATE_LOGIN(state, payload) {
      // mudar o estado de login para true
      state.login = payload;
    },
    UPDATE_USUARIO(state, payload) {
      state.usuario = Object.assign(state.usuario, payload); //object.assign combina objetos, que são esses 2
    },
    UPDATE_USUARIO_PRODUTOS(state, payload) {
      state.usuario_produtos = payload; //quando criar um produto novo automaticamente será adicionado a lista
    },
    ADD_USUARIO_PRODUTOS(state, payload) {
      state.usuario_produtos.unshift(payload); // o unshift manda pro inicio do array, os mais recentes sempre serão os primeiros
    },
  },
  actions: {
    getUsuarioProdutos(context) {
      api
        .get(`/produto?usuario_id=${context.state.usuario.id}`)
        .then((response) => {
          context.commit("UPDATE_USUARIO_PRODUTOS", response.data);
        });
    },
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
    deslogarUsuario(context) {
      // ao desligar faz-se o update de todos os atributos(id, nome, email... para vazio), depois muda o login para false
      // e tambem remover o token de cadastro, entao essas coisas irão alterar o state, portanto:
      context.commit("UPDATE_USUARIO", {
        id: "",
        nome: "",
        email: "",
        senha: "",
        cep: "",
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
      });
      context.commit("UPDATE_LOGIN", false);
      //após isso é necessário fazer o commit, então vá em Usuario na função deslogar no method deslogar()
    },
  },
  modules: {},
});
