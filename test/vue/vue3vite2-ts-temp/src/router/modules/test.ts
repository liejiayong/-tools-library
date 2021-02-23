const testRoutes = [
    {
        path: "hello",
        name: "test_hello",
        meta: { title: "您好" },
        component: () => import("/@/views/test/hello.vue"),
    },
    {
        path: "static",
        name: "test_static",
        meta: { title: "静态资源引用" },
        component: () => import("/@/views/test/static.vue"),
    },
];

export default testRoutes;
