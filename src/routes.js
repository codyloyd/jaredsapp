import appIndex from "./components/appIndex.vue";
import appCategory from "./components/appCategory.vue";
import appItem from "./components/appItem.vue";
import appStep from "./components/appStep.vue";

const routes = [
  { path: "/", component: appIndex },
  { path: "/:categoryName", component: appCategory, props: true },
  { path: "/:categoryName/:itemName", component: appItem, props: true },
  { path: "/:categoryName/:itemName/:stepId", component: appStep, props: true },
];

export default routes;
