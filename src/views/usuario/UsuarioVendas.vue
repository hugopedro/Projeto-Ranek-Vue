<template>
  <section>
    <div v-if="vendas">
      <h2>Vendas</h2>
      <div class="produtos-wrapper" v-for="(venda, index) in vendas" :key="index">
        <ProdutoItem v-if="venda.produto" :produto="venda.produto">
          <!-- ^ isso acontece porque lá em ProdutoItem tem uma props chamada produto, daí ele distribui o produto dentro da div
          e tem o slot, que pode ser utilizado para adicionar novas informações-->
          <!-- Portanto estamos dentro do slot, e dentro do slot irei adicionar uma classe chamada vendedor-->
        <p class="vendedor">
          <span>Comprador:</span>
          {{ venda.comprador_id }} , <!-- Na venda deseja-se saber quem comprou o produto de mim , essa é a diferença -->
        </p>
        <!-- após isso é necessário criar um método para compra -->
        </ProdutoItem>
        <div class="entrega">
          <h3>Entrega:</h3>
          <ul v-if="venda.endereco">
            <li v-for="(value, key) in venda.endereco" :key="key">
              <!-- Aqui será mostrado a chave o valor, rua e endereço-->
              {{ key }} : {{ value }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
<!-- Copiou tudo do UsuarioCompras e colei no vendas-->
<script>

/* importando ProdutoItem pois é o mesmo estilo da lista de compras */
import ProdutoItem from "@/components/ProdutoItem.vue"
import { api } from "@/services.js"
import { mapState } from "vuex"

export default {
  components: { ProdutoItem },
  data() {
    return {
      vendas: null,

    }
  },
  computed: {
    ...mapState(["usuario", "login"])
  },
  methods: {
    getVendas() {
      api.get(`/transacao?vendedor_id=${this.usuario.id}`).then(response => {
        this.vendas = response.data
      })
    }
  },
  watch: {
    login() {
      this.getVendas();
    }
  },
  created() {
    if(this.login) {
      this.getVendas();
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

.entrega {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  grid-gap: 20px;
  margin-bottom: 60px;
}

h2 {
  margin-bottom: 20px;
}

h3 {
  margin: 0px;
  justify-self: end;
}
</style>