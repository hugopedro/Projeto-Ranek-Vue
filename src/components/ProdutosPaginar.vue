<template>
  <ul v-if="paginasTotal > 1">
    <!-- paginas porque agora é a página dentro da array em sí-->
    <li v-for="pagina in paginas" :key="pagina">
      <router-link :to="{query: query(pagina)}">{{pagina}}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    produtosPorPagina: {
      type: Number, //garante que sempre venha tipo Number
      default: 1,
    },
    produtosTotal: {
      type: Number, //garante que sempre venha tipo Number
      default: 1,
    },
  },
  methods: {
    //pra não bugar a query se eu ir pra pagina 2
    query(pagina) {
      return {
        ...this.$route.query, // desestruturação de query
        _page: pagina,
      };
    },
  },
  computed: {
    paginas() {
      //retorna um array com o total que eu quero que mostre no momento
      //primeiro precisa saber em qual página o usuário está no momento
      const current = Number(this.$route.query._page);
      //agora o total de paginas
      const range = 9;
      const offset = Math.ceil(range / 2);
      const total = this.paginasTotal;
      const pagesArray = [];

      for (let i = 1; i <= total; i++) {
        pagesArray.push(i);
      }
      //o splice recebe 2 argumentos, daonde se começa a remover item do array e até onde eu removo
      pagesArray.splice(0, current - offset); // menos offset pra mostrar as 5 ultimas
      pagesArray.splice(range, total); // começa do range(ultimo item) até o total, daí ele remove até o ultimo, pra nao fica aparecendo numeros das proximas pag

      return pagesArray;
    },
    paginasTotal() {
      const total = this.produtosTotal / this.produtosPorPagina;
      return total !== Infinity ? Math.ceil(total) : 0; //  arredonda pra cima
      //    return total, regra pra não bugar;
    },
  },
};
</script>

<style>
ul {
  grid-column: 1 / -1;
}

li {
  display: inline-block;
}

li a {
  padding: 2px 8px;
  border-radius: 2px;
  margin: 4px;
}

li a.router-link-exact-active,
li a:hover {
  background: #87f;
  color: #fff;
}
</style>