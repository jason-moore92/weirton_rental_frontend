import Vue from "vue";
import VueRouter from "vue-router";
import LoginScreen from "@/views/LoginScreen";
import DashboardTemplate from "@/views/DashboardTemplate";
import DashboardScreen from "@/views/DashboardScreen";
import NewHousehold from "@/views/NewHousehold";
import HomesScreen from "@/views/HomesScreen";
import IncomingScreen from "@/views/IncomingScreen";

import RentInfoScreen from "@/views/RentInfoScreen";
import AdminLogin from "@/views/Admin/AdminLogin";
import AdminHome from "@/views/Admin/AdminHome";
import store from "@/store";
import * as RouterPath from "@/constants/path";


Vue.use(VueRouter);

const routes = [
  {
    path: RouterPath.ROOT,
    name: "Login",
    component: LoginScreen,
  },
  {
    path: RouterPath.DASHBOARD,
    name: "dashboard",
    component: DashboardTemplate,
    children: [
      {
        path: '/',
        name: 'dashboard_main',
        component: DashboardScreen
      },
      {
        path: RouterPath.NEW_HOUSEHOLD,
        name: "new household",
        component: NewHousehold,
      },
      {
        path: RouterPath.HOMES,
        name: "add/edit homs",
        component: HomesScreen,
      },
      {
        path: RouterPath.ENTRIES_EDIT,
        name: "edit exist entries",
        component: IncomingScreen,
      },
      {
        path: RouterPath.EXPORT_RESULT,
        name: "expert result",
        component: IncomingScreen,
      },
      {
        path: RouterPath.MANAGE_USERS,
        name: "manage user",
        component: IncomingScreen,
      },
    ],
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
