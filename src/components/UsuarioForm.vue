<template>
  <form>
    <div class="usuario" v-if="mostrarDadosLogin">
      <label for="nome">Nome</label>
      <input id="nome" name="nome" type="text" v-model="nome" />
      <label for="email">Email</label>
      <input id="email" name="email" type="email" v-model="email" />
      <label for="senha">Senha</label>
      <input id="senha" name="senha" type="password" v-model="senha" />
    </div>
    <label for="cep">Cep</label>
    <input id="cep" name="cep" type="text" v-model="cep" @keyup="preencherCep" />
    <label for="rua">Rua</label>
    <input id="rua" name="rua" type="text" v-model="rua" />
    <label for="numero">Numero</label>
    <input id="numero" name="numero" type="text" v-model="numero" />
    <label for="bairro">Bairro</label>
    <input id="bairro" name="bairro" type="text" v-model="bairro" />
    <label for="cidade">Cidade</label>
    <input id="cidade" name="cidade" type="text" v-model="cidade" />
    <label for="estado">Estado</label>
    <input id="estado" name="estado" type="text" v-model="estado" />
    <div class="button">
      <slot></slot>
      <!-- Criou slot porque vai usar esse formulario em diversas partes do site, como editarUsuario etc -->
    </div>
  </form>
</template>

<script>
import { mapFields } from "@/helpers.js";
import { getCep } from "@/services.js";
export default {
  computed: {
    ...mapFields({
      fields: [
        "nome",
        "email",
        "senha",
        "rua",
        "cep",
        "numero",
        "bairro",
        "cidade",
        "estado",
      ],
      base: "usuario",
      mutation: "UPDATE_USUARIO",
    }),
    mostrarDadosLogin() {
      //se o usuário não estiver logado ou estiver na pagina UsuarioEditar mostra apenas nome,email e senha
      return (!this.$store.state.login || (this.$route.name === 'usuario-editar'))
      //entao tem que mudar os campos lá encima e por dentro de uma div pra funcionar
    }
  },
  methods: {
    preencherCep() {
      const cep = this.cep.replace(/\D/g, "");
      if (cep.length === 8) {
        getCep(cep).then((response) => {
          this.rua = response.data.logradouro;
          this.bairro = response.data.bairro;
          this.estado = response.data.uf;
          this.cidade = response.data.localidade;
        });
      }
    },
  },
};
</script>

<style scoped>
/*Se não por style SCOPED vai alterar o design de outros buttons, e aí vai bugar tudo então é muito importante*/
form,
.usuario {
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
}

.usuario {
  grid-column: 1 / 3; /* vai da primeira coluna até a terceira, isso é necessário para não ficar zoado */
}

.button {
  grid-column: 2;
  margin-top: 10px;
}
</style>