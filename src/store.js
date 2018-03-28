import db from "./db.js";

const appStore = {
  state: {
    title: "HELLO TITLE",
    categories: [],
    items: [],
    routeTransition: "slide",
    addingCategory: false,
    addingItem: false
  },
  getters: {
    addingItem: state => {
      return state.addingItem;
    },
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
      return state.items.find(i => i.name === itemName);
    },
    items: state => categoryName => {
      return state.items.filter(item => {
        return item.category == categoryName;
      });
    },
    routeTransition: state => {
      return state.routeTransition;
    }
  },
  mutations: {
    setAddingCategory(state, payload) {
      state.addingCategory = payload;
    },
    setAddingItem(state, payload) {
      state.addingItem = payload;
    },
    setRouteTransition(state, payload) {
      state.routeTransition = payload.transition;
    },
    setCategories(state, payload) {
      state.categories = payload.categories;
    },
    addCategory(state, payload) {
      state.categories.push(payload.category);
    },
    addItem(state, payload) {
      if (!state.items.find(item => item.name === payload.item.name)) {
        state.items.push(payload.item);
      }
    }
  },
  actions: {
    getData(context) {
      return db.categories.toArray().then(a => {
        context.commit("setCategories", { categories: a });
      });
    },
    getItem(context, payload) {
      return db.items.get({ name: payload.item }).then(a => {
        context.commit("addItem", { item: a });
        return;
      });
    },
    getItems(context, payload) {
      return db.categories
        .where("name")
        .equals(payload.category)
        .toArray()
        .then(c => {
          return Promise.all(
            c[0].items.map(item => {
              return db.items.get({ name: item }).then(a => {
                context.commit("addItem", { item: a });
              });
            })
          );
        });
    },
    addCategory(context, payload) {
      if (!payload.image) {
        payload.image == "";
      }
      db.categories.add({ name: payload.name, items: [] }).then(result => {});
    },
    addItem(context, payload) {
      return db.categories
        .where("name")
        .equals(payload.category)
        .modify(category => {
          category.items.push(payload.name);
        })
        .then(() => {
          context.commit("addItem", { item: payload });
          return db.items.add(payload).then(result => {});
        });
    }
  }
};

export default appStore;
