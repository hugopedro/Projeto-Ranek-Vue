<template>
    <section>
        <h2>Endereço de Envio</h2>
        <UsuarioForm>
            <button class="btn" @click.prevent="finalizarCompra">Finalizar Compra</button>
        </UsuarioForm>
    </section>
</template>

<script>

import UsuarioForm from "@/components/UsuarioForm.vue"
import { api } from "@/services.js"
import { mapState } from "vuex";

export default {
    name: "FinalizarCompra",
    components: { UsuarioForm },
    props: ["produto"],
    computed: {
        ...mapState(["usuario"]),
        compra() {
            return {
                //isso aqui não vai no vuex, é só pro componente mesmo
                comprador_id: this.usuario.email,
                vendedor_id: this.produto.usuario_id,
                produto: this.produto, // não se deve passar o id do produto por segurança, e sim puxar assim
                endereco: {
                    cep: this.usuario.cep,
                    rua: this.usuario.rua,
                    numero: this.usuario.numero,
                    bairro: this.usuario.bairro,
                    cidade: this.usuario.cidade,
                    estado: this.usuario.estado
                }
            }
        }
    },
  methods: {
    criarTransacao() { // quando ele fizer a postagem(fazer a compra) então => {}
    // agora tem que ter return se não os awaits não funcionarão
      return api.post("/transacao", this.compra).then(() => {
        this.$router.push({ name: "compras" }); // então manda para a pagina de compras
      });
    },
    async criarUsuario() {
      try { // isso é necessário porque não dá pra mostrar a transação sem estar logado
        await this.$store.dispatch("criarUsuario", this.$store.state.usuario);
        await this.$store.dispatch(
          "getUsuario", // entao ele espera, primeiro cria usuário, depois pega o usuario e só depois ele cria a transação
          this.$store.state.usuario.email
        );
        await this.criarTransacao();
      } catch (error) {
        console.log(error);
      }
    },
    finalizarCompra() {
      if (this.$store.state.login) { // se o usuário estiver logado
        this.criarTransacao();
      } else { // se não
        this.criarUsuario();
      }
    }
  }
};
</script>

<style scoped>
h2 {
  margin-top: 40px;
  margin-bottom: 20px;
}

.btn {
  background: #e80;
}
</style>