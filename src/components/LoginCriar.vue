<template>
  <section>
    <h2>Crie a sua conta</h2>
    <transition mode="out-in">
      <button v-if="!criar" class="btn" @click="criar = true">Criar Conta</button>
      <UsuarioForm v-else>
        <button class="btn btn-form" @click.prevent="criarUsuario">Criar Usuário</button>
      </UsuarioForm>
      <!-- .prevent pra não atualizar a pagina ao clicar-->
    </transition>
  </section>
</template>

<script>
import UsuarioForm from "@/components/UsuarioForm.vue";
export default {
  name: "LoginCriar",
  components: { UsuarioForm },
  data() {
    return {
      criar: false,
    };
  },
  methods: {
    //async e await é pro código debaixo do primeiro só serve ativado depois do primeiro acontecer, se não pode logar antes de
    // criar a conta e isso é ruim.
    async criarUsuario() {
      try {
        await this.$store
          .dispatch("criarUsuario", this.$store.state.usuario)
          .then(() => {});
        await this.$store.dispatch(
          "getUsuario",
          this.$store.state.usuario.email
        ); // é pra depois que criar a conta logar direto
        // mudar o router após logar, mandando o usuário para página do usuário
        this.$router.push({ name: "usuario" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
/*scoped pra não bugar os outros botões */
h2 {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 10px;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.btn-form {
  max-width: 100%;
}
</style>
