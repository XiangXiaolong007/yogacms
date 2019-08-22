import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

// 按需加载路由
function loadView(view: string) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`);
}

export default new Router({
  routes: [
    {
      path: "/login",
      name: "login",
      component: loadView("Login")
    },
    {
      path: "/",
      name: "home",
      component: loadView("Home")
    }
  ]
});
