import Vue from "vue";
import VueRouter from "vue-router";
import DashboardTemplate from "@/views/DashboardTemplate";
import DashboardScreen from "@/views/DashboardScreen";
import NewHousehold from "@/views/NewHousehold";

import RentInfoScreen from "@/views/RentInfoScreen";
import AdminLogin from "@/views/Admin/AdminLogin";
import AdminHome from "@/views/Admin/AdminHome";
import store from "@/store";
import * as RouterPath from "@/constants/path";


Vue.use(VueRouter);

const routes = [
  {
    path: RouterPath.ROOT,
    name: "dashboard",
    component: DashboardScreen,
    components: { default: DashboardTemplate, child: DashboardScreen },
    props: { default: true, child: true },
    meta: {
      requiresGuest: false,
    },
  },
  {
    path: RouterPath.DASHBOARD,
    name: "dashboard",
    component: DashboardScreen,
    meta: {
      requiresGuest: false,
    },
  },
  {
    path: RouterPath.NEW_HOUSEHOLD,
    name: "rentinfo",
    component: NewHousehold,
    meta: {
      requiresGuest: false,
    },
  },
  {
    path: "/admin",
    name: "administrator",
    component: AdminLogin,
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: "/contacts",
    name: "contacts",
    component: AdminHome,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      // Redirect to the Login Page
      next("/admin");
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (store.getters.isLoggedIn) {
      // Redirect to the Login Page
      next("/contacts");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
