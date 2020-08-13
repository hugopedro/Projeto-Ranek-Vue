<template>
  <form class="adicionar-produto">
    <!-- Sem vuex, e sim com direto no componente-->
    <label for="nome">Nome</label>
    <input id="nome" name="nome" type="text" v-model="produto.nome" />
    <label for="preco">Preço (R$)</label>
    <input id="preco" name="preco" type="number" v-model="produto.preco" />
    <label for="fotos">Fotos</label>
    <!-- ref fotos libera o aceso ao this.fotos, v-model nao dá aqui -->
    <input id="fotos" name="fotos" type="file" ref="fotos" />
    <label for="preco">Descrição</label>
    <textarea id="preco" name="preco" v-model="produto.descricao"></textarea>
    <input class="btn" type="button" value="Adicionar Produto" @click.prevent="adicionarProduto" />
  </form>
</template>

<script>
import { api } from "@/services.js";
export default {
  name: "ProdutoAdicionar",
  data() {
    return {
      produto: {
        nome: "",
        preco: "",
        descricao: "",
        fotos: null,
        vendido: "false",
      },
    };
  },
  methods: {
    formatarProduto() {
      this.produto.usuario_id = this.$store.state.usuario.id;
    },
    adicionarProduto() {
      this.formatarProduto();
      api.post("/produto", this.produto).then(() => {
        //sempre que for postar um produto novo para mostrar na lista tem que ir novamente no servidor e puxar os produtos
        //por isso then e this.$store.dispatch
        this.$store.dispatch("getUsuarioProdutos");
      });
    },
  },
};
</script>

<style scoped>
.adicionar-produto {
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
  margin-bottom: 60px;
}

.btn {
  grid-column: 2;
}
</style>