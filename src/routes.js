import appIndex from "./components/appIndex.vue";
import appCategory from "./components/appCategory.vue";

const routes = [
  { path: "/", component: appIndex },
  { path: "/:categoryName", component: appCategory, props: true }
];

export default routes;
