import db from "./db.js";

const appStore = {
  state: {
    title: "HELLO TITLE",
    categories: [],
    items: {},
    routeTransition: "slide",
    addingCategory: false
  },
  getters: {
    addingCategory: state => {
      return state.addingCategory;
    },
    category: state => name => {
      return state.categories.find(c => c.name === name);
    },
    categories: state => {
      return state.categories;
    },
    item: state => itemName => {
      console.log(state.items[itemName]);
      return state.items[itemName];
    },
    routeTransition: state => {
      return state.routeTransition;
    }
  },
  mutations: {
    setAddingCategory(state, payload) {
      state.addingCategory = payload;
    },
    setRouteTransition(state, payload) {
      state.routeTransition = payload.transition;
    },
    setCategories(state, payload) {
      state.categories = payload.categories;
    },
    setItems(state, payload) {
      state.items[payload.category] = payload.items;
    },
    addCategory(state, payload) {
      state.categories.push(payload.category);
    },
    addItem(state, payload) {
      state.items[payload.item.name] = payload.item;
    }
  },
  actions: {
    getData(context) {
      db.categories.toArray().then(a => {
        context.commit("setCategories", { categories: a });
      });
    },
    getItem(context, payload) {
      return db.items.get({ name: payload.item }).then(a => {
        context.commit("addItem", { item: a });
        return;
      });
    },
    addCategory(context, payload) {
      if (!payload.image) {
        payload.image == "";
      }
      db.categories
        .add({ name: payload.name, image: payload.image })
        .then(result => {});
    },
    addItem(context, payload) {
      db.categories
        .where("name")
        .equals(payload.category)
        .modify(c => {
          if (c.items) {
            c.items.push(payload.item);
          } else {
            c.items = [payload.item];
          }
        });
    }
  }
};

export default appStore;
