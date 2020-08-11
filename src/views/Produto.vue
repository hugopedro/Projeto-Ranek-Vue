<template>
  <section>
    <div v-if="produto" class="produto">
      <!-- Se existe produto-->
      <ul class="fotos" v-if="produto.fotos">
        <!-- Se existe foto do produto-->
        <li v-for="(foto, index) in produto.fotos" :key="index">
          <img :src="foto.src" :alt="foto.titulo" />
        </li>
      </ul>
      <div class="info">
        <h1>{{produto.nome}}</h1>
        <p class="preco">{{produto.preco | numeroPreco}}</p>
        <p class="descricao">{{produto.descricao}}</p>
        <button class="btn" v-if="produto.vendido === 'false'">Comprar</button>
        <!-- Comprar só aparece se o produto não foi vendido-->
        <button v-else class="btn" disabled>Produto Vendiro</button>
      </div>
    </div>
    <PaginaCarregando v-else />
    <!-- Se tiver produto ele mostra, se não é porque a página tá carregando!-->
  </section>
</template>

<script>
/* Porque não está usando Vuex? Porque essas ações são por componente, e isso NÃO VAI SER UTILIZADO EM NENHUM OUTRO LOCAL DO SITE,
eu vou começar a usar o store.js muito quando eu estiver tratando do login, pois o login tem que ser persistente, em toda página
é preciso saber quem é o usuário, já o produto não, produto é só na página de produto */

import { api } from "@/services.js";

export default {
  name: "Produtos",
  props: ["id"],
  data() {
    return {
      produto: null,
    };
  },
  methods: {
    getProduto() {
      api.get(`/produto/${this.id}`).then((response) => {
        this.produto = response.data;
      });
    },
  },
  created() {
    this.getProduto();
  },
};
</script>

<style scoped>
.produto {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  max-width: 900px;
  padding: 60px 20px;
  margin: 0 auto;
}

.preco {
  color: #e80;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 40px;
}

.descricao {
  font-size: 1.2rem;
}

.btn {
  margin-top: 60px;
  width: 200px;
}
</style>
