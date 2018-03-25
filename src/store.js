import db from "./db.js";

const appStore = {
  state: {
    title: "HELLO TITLE",
    categories: [],
    items: {},
    routeTransition: "slide"
  },
  getters: {
    lowerCaseTitle: state => {
      return state.title.toLowerCase();
    },
    category: state => name => {
      return state.categories.find(c => c.name === name);
    },
    categories: state => {
      return state.categories;
    },
    item: state => itemName => {
      // fix single item
      return state.items;
    },
    routeTransition: state => {
      return state.routeTransition;
    }
  },
  mutations: {
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
      state.items[payload.category].push(payload.item);
    }
  },
  actions: {
    getData(context) {
      db.categories.toArray().then(a => {
        context.commit("setCategories", { categories: a });
      });
    },
    getItem(context, payload) {
      db.items.get({ name: payload.item }).then(a => {
        console.log(a);
      });
    },
    addCategory(context, payload) {
      if (!payload.image) {
        payload.image == "";
      }
      db.categories
        .add({ name: payload.category, image: payload.image })
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
