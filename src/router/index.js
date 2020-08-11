import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Produto from "../views/Produto.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    // Criando uma página nova!
    // Já que vai passar o id tem que ter props, para passá-lo como propiedade
    path: "/produto/:id",
    name: "produto",
    component: Produto,
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: "smooth" });
  },
});

//o scrollBehavior é pra quando mudar de página a próxima pagina não iniciar de lá de baixo, entao ele volta pro topo de forma suave

export default router;
