import { RouteRecordRaw } from "vue-router";
import Layout from "/@/views/layout/index.vue";
import LayoutTest from "/@/views/layout/test.vue";
import testRoutes from "./modules/test";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "index",
        component: Layout,
    },
    {
        path: "/test",
        name: "LayoutTest",
        meta: { title: "测试集" },
        component: LayoutTest,
        children: testRoutes,
    },
];

export default routes;
