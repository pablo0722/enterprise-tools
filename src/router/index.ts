import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import ScrumPoker_routes from "@/modules/scrum_poker/src/router/index";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    components: {
      default: () => import("@/views/HomeView.vue"),
    },
  },
  {
    path: "/:tool",
    name: "Tool",
    props: true,
    components: {
      default: () => import("@/views/ToolView.vue"),
    },
    children: [],
  },
];

const addRoutesToChildren = (
  children: RouteRecordRaw[],
  routes: {
    path: string;
    name: string;
    props: boolean;
    components: any;
  }[]
) => {
  if (!children) {
    return;
  }

  for (const r of routes) {
    let components = undefined;
    for (const c of children) {
      if (c.path == r.path) components = c.components;
    }
    if (!components) {
      components = {};
      const child = {
        path: r.path,
        name: r.name,
        props: r.props,
        components: components,
      };
      children.push(child);
    }
    if (r.components) {
      for (const key in r.components) {
        components[key] = r.components[key];
      }
    }
  }
};

if (routes[1].children) {
  addRoutesToChildren(routes[1].children, ScrumPoker_routes);
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, behavior: "smooth" };
  },
});

export default router;
