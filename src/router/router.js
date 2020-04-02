import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    props: true,
    component: Home
  },
  {
    path: "/destination/:slug",
    name: "DestinationDetails",
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "DestinationDetails" */ "@/views/DestinationDetails.vue"
      ),
    children: [
      {
        path: ":experienceSlug",
        name: "ExperienceDetails",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "DestinationDetails" */ "@/views/ExperienceDetails.vue"
          )
      }
    ],
    beforeEnter: (to, from, next) => {
      const exists = store.destinations.find(
        destination => destination.slug === to.params.slug
      );
      if (exists) {
        next();
      } else {
        next({ name: "NotFound" });
      }
    }
  },
  {
    path: "/invoices",
    name: "TheInvoices",
    component: () => import(/* webpackChunkName: TheInvoices */ "@/views/TheInvoices.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/user",
    name: "TheUser",
    component: () => import(/* webpackChunkName: User */ "@/views/TheUser.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/login",
    name: "TheLogin",
    component: () =>
      import(/* webpackChunkName: TheLogin */ "@/views/TheLogin.vue")
  },
  {
    path: "/404",
    alias: "*",
    name: "NotFound",
    component: () =>
      import(
        /* webpackChunkName: "DestinationDetails" */ "@/components/NotFound.vue"
      )
  }
];

const router = new VueRouter({
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    else {
      const position = {};
      if (to.hash) {
        position.selector = to.hash;
        if (to.hash === "#experience") {
          position.offset = { y: 150 };
        }
        if (document.querySelector(to.hash)) {
          return position;
        }
        return false;
      }
    }
  },
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.user) {
      next({
        name: "TheLogin",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
