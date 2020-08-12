<template>
  <section class="usuario">
    <nav class="sidenav">
      <ul>
        <li>
          <!-- o name é o mesmo que foi definido no router -->
          <router-link :to="{name: 'usuario'}">Produtos</router-link>
          <router-link :to="{name: 'compras'}">Compras</router-link>
          <router-link :to="{name: 'vendas'}">Vendas</router-link>
          <router-link :to="{name: 'usuario-editar'}">Editar Usuário</router-link>
        </li>
        <li>
          <button @click.prevent="deslogar">Deslogar</button>
        </li>
      </ul>
    </nav>
    <transition mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: "Usuario",
  methods: {
    deslogar() {
      this.$store.dispatch("deslogarUsuario");
      //assim que deslogar ele vou mandar ele pra página de login:
      this.$router.push("/login");
    },
  },
};
</script>

<style>
</style>

<!-- Foi criada uma pasta usuario dentro de views porque haverá muitas views -->