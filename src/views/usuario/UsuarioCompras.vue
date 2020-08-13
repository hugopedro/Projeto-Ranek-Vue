<template>
  <section>
    <div v-if="compras">
      <h2>Compras</h2>
      <div class="produtos-wrapper" v-for="(compra, index) in compras" :key="index">
        <ProdutoItem v-if="compra.produto" :produto="compra.produto">
          <!-- ^ isso acontece porque lá em ProdutoItem tem uma props chamada produto, daí ele distribui o produto dentro da div
          e tem o slot, que pode ser utilizado para adicionar novas informações-->
          <!-- Portanto estamos dentro do slot, e dentro do slot irei adicionar uma classe chamada vendedor-->
        <p class="vendedor">
          <span>Vendedor:</span>
          {{ compra.vendedor_id }}
        </p>
        <!-- após isso é necessário criar um método para compra -->
        </ProdutoItem>
      </div>
    </div>
  </section>
</template>

<script>

/* importando ProdutoItem pois é o mesmo estilo da lista de compras */
import ProdutoItem from "@/components/ProdutoItem.vue"
import { api } from "@/services.js"
import { mapState } from "vuex"

export default {
  components: { ProdutoItem },
  data() {
    return {
      compras: null,

    }
  },
  computed: {
    ...mapState(["usuario", "login"])
  },
  methods: {
    getCompras() {
      api.get(`/transacao?comprador_id=${this.usuario.id}`).then(response => {
        this.compras = response.data
      })
    }
  },
  watch: {
    login() {
      this.getCompras();
    }
  },
  created() {
    if(this.login) {
      this.getCompras();
    }
  }
};
</script>

<style scoped>
.produto-wrapper {
  margin-bottom: 40px;
}

.vendedor span {
  color: #e80;
}

h2 {
  margin-bottom: 20px;
}
</style>