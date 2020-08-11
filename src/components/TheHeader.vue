<template>
  <header>
    <nav>
      <router-link to="/" class="logo">
        <img src="@/assets/ranek.svg" alt="Ranek" />
      </router-link>
      <router-link v-if="$store.state.login" class="btn" to="/usuario">{{ nome }}</router-link>
      <!-- ^ Verifica se já existe usuário, se sim será true e mostra o login, se não mostra a tela inicial-->
      <router-link v-else class="btn" to="/login">Vender / Login</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "TheHeader",
  // como só quer o nome do usuário não precisa de import mapstate
  computed: {
    nome() {
      return this.$store.state.usuario.nome.replace(/ .*/, "");
      // ali no replace usa-se uma tecnica chamada regex, tudo que vier depois de "espaço" substitui por nada
      //isso não é mutação
    },
  },
};
</script>

<style>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  box-shadow: 0 2px 4px rgba(30, 60, 90, 0.1);
}

.logo {
  padding: 10px 0;
}

.logo img {
  width: 90px;
}
</style>