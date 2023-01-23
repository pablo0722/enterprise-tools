const routes = [
  {
    path: "vote",
    name: "scrum_poker",
    props: true,
    components: {
      Client: () => import("@/modules/scrum_poker/src/views/ClientView.vue"),
    },
  },
  {
    path: "vote_server",
    name: "scrum_poker_server",
    props: true,
    components: {
      Server: () => import("@/modules/scrum_poker/src/views/ServerView.vue"),
    },
  },
];

export default routes;
