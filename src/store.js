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
      console.log("categories getter");
      console.log(state.categories);
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
      console.log(state.categories);
    },
    addItem(state, payload) {
      state.items[payload.category].push(payload.item);
    }
  },
  actions: {
    getCategories(context) {
      console.log(db.categories);
      db.categories.toArray().then(a => {
        const categories = a.map(c => c.name);
        console.log(categories);
        context.commit("setCategories", { categories });
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
