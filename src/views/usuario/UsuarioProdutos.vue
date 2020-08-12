<template>
  <section>
    <h2>Adicionar Produto</h2>
    <ProdutoAdicionar />
    <h2>Seus Produtos</h2>
    <transition-group v-if="usuario_produtos" name="list" tag="ul">
      <li v-for="(produto,index) in usuario_produtos" :key="index">
        <ProdutoItem :produto="produto">
          <p>{{ produto.descricao }}</p>
          <!-- é um slot -->
        </ProdutoItem>
      </li>
      <!-- sempre que for adicionar um novo é desejável que a seja adicionado de forma animada, por isso transition-group-->
    </transition-group>
    <!-- Aqui é uma lista de produtos de usuário, essa lista será pega direto do Vuex, pois será nececessário atualizá-la
    quando adicionar um produto novo, quando deletar a lista, etc, portanto é melhor ter ela do lado de fora do componente,
    pois utilizarei ela em diferentes contextos-->
  </section>
</template>

<script>
import ProdutoAdicionar from "@/components/ProdutoAdicionar.vue";
import ProdutoItem from "@/components/ProdutoItem.vue";
import { mapState, mapActions } from "vuex";
export default {
  name: "UsuarioProdutos",
  components: { ProdutoAdicionar, ProdutoItem },
  computed: {
    ...mapState(["login", "usuario", "usuario_produtos"]),
  },
  methods: {
    ...mapActions(["getUsuarioProdutos"]),
  },
  watch: {
    login() {
      //se o login nao existir ele não vai pegar o usuário de início, mas supondo que o usuário existe e não pegou por
      this.getUsuarioProdutos(); //causa de lag, então é necessário fazer isso, então quando o login mudar de estado (false , para true) ele ativa esse método
    },
  },
  //quando que vou puxar os produtos? quando for criado:
  created() {
    // se já houve login:
    if (this.login) {
      this.getUsuarioProdutos();
    }
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translate3d(20px);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}
</style>