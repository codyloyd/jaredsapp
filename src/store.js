import db from "./db.js";

const appStore = {
  state: {
    title: "HELLO TITLE",
    categories: [],
    categoryNameMap: {},
    items: [],
    steps: [],
    routeTransition: "slide",
    addingCategory: false,
    addingItem: false,
    addingStep: false
  },
  getters: {
    addingItem: state => {
      return state.addingItem;
    },
    addingCategory: state => {
      return state.addingCategory;
    },
    addingStep: state => {
      return state.addingStep;
    },
    category: state => id => {
      return state.categories.find(c => c.id === id);
    },
    categories: state => {
      return state.categories;
    },
    item: state => name => {
      return state.items.find(i => i.name === name);
    },
    step: state => id => {
      return state.steps.find(i => i.id == id);
    },
    items: state => categoryName => {
      return state.items.filter(item => {
        return item.category == categoryName;
      });
    },
    steps: state => itemName => {
      const item = state.items.find(i => i.name === itemName);
      return state.steps.filter(step => {
        return item.steps.includes(step.id);
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
    setAddingStep(state, payload) {
      state.addingStep = payload;
    },
    setRouteTransition(state, payload) {
      state.routeTransition = payload.transition;
    },
    setCategories(state, payload) {
      state.categories = payload.categories;
    },
    setSteps(state, payload) {
      state.steps = payload.steps;
    },
    setCategoryNameMap(state, payload) {
      state.categoryNameMap = payload.categoryNameMap;
    },
    addCategory(state, payload) {
      state.categories.push(payload.category);
    },
    addItem(state, payload) {
      if (!state.items.find(item => item.id === payload.item.id)) {
        state.items.push(payload.item);
      }
    },
    addStep(state, payload) {
      const item = state.items.find(i => i.name === payload.item);
      if (!state.steps.find(step => step.id === payload.step.id)) {
        if (!item.steps.includes(payload.step.id)) {
          item.steps.push(payload.step.id);
        }
        state.steps.push(payload.step);
      }
    }
  },
  actions: {
    getCategories(context) {
      return db.categories.toArray().then(a => {
        context.commit("setCategories", { categories: a });
        context.commit(
          "setCategoryNameMap",
          a.reduce((obj, curr) => {
            obj[curr.name] = curr.id;
            return obj;
          }, {})
        );
      });
    },
    getItem(context, payload) {
      return db.items.get({ id: payload.item }).then(a => {
        context.commit("addItem", { item: a });
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
              return db.items.get({ id: item }).then(a => {
                context.commit("addItem", { item: a });
              });
            })
          );
        });
    },
    getSteps(context, payload) {
      return db.items
        .where("name")
        .equals(payload.item)
        .toArray()
        .then(i => {
          return Promise.all(
            i[0].steps.map(step => {
              return db.steps.get({ id: step }).then(a => {
                context.commit("addStep", { item: payload.item, step: a });
              });
            })
          );
        });
    },
    addCategory(context, payload) {
      if (!payload.image) {
        payload.image == "";
      }
      return db.categories
        .add({ name: payload.name, items: [] })
        .then(result => {
          context.commit("addCategory", {
            category: { name: payload.name, items: [] }
          });
        });
    },
    addItem(context, payload) {
      return db.categories
        .where("id")
        .equals(payload.category)
        .modify(category => {
          category.items.push(payload.id);
        })
        .then(() => {
          context.commit("addItem", { item: payload });
          return db.items.add(payload).then(result => {});
        });
    },
    addStep(context, payload) {
      return db.steps
        .add(payload)
        .then(id => {
          context.commit("addStep", {
            item: payload.item,
            step: { ...payload, id }
          });
          return db.items
            .where("name")
            .equals(payload.item)
            .modify(item => {
              item.steps.push(id);
            });
        })
        .then(() => {
          return db.steps.add(payload.step).then(result => {});
        });
    }
  }
};

export default appStore;
