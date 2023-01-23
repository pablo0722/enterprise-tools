const routes = [
    {
        path: "vote",
        name: "scrum_poker_Server",
        props: true,
        components: {
            Client: () => import("@/modules/scrum_poker/src/views/ClientView.vue"),
            Server: () => import("@/modules/scrum_poker/src/views/ServerView.vue"),
        },
    },
];
export default routes;
//# sourceMappingURL=index.js.map
