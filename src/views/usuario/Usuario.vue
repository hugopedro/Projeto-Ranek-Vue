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

<style scoped>
.usuario {
  display: grid;
  grid-template-columns: minmax(140px, 200px) 1fr;
  max-width: 900px;
  margin: 40px auto;
  grid-gap: 30px;
  padding: 20px;
}

@media screen and (max-width: 500px) {
  .usuario {
    grid-template-columns: 1fr;
    margin: 0px auto;
  }
}

.sidenav a,
.sidenav button {
  padding: 10px;
  display: block;
  background: #f4f7fc;
  margin-bottom: 10px;
  border-radius: 4px;
}

.sidenav a.router-link-exact-active,
.sidenav a:hover,
.sidenav button:hover {
  background: #87f;
  color: #fff;
}

.sidenav button {
  border: none;
  width: 100%;
  font-size: 1rem;
  text-align: left;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  cursor: pointer;
}
</style>


<!-- Foi criada uma pasta usuario dentro de views porque haverá muitas views -->