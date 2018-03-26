import appIndex from "./components/appIndex.vue";
import appCategory from "./components/appCategory.vue";
import appItem from "./components/appItem.vue";

const routes = [
  { path: "/", component: appIndex },
  { path: "/:categoryName", component: appCategory, props: true },
  { path: "/:categoryName/:itemName", component: appItem, props: true }
];

export default routes;
