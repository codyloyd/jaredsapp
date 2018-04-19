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
    editingCategory: null,
    addingItem: false,
    editingItem: null,
    addingStep: false,
    editingStep: null
  },
  getters: {
    addingItem: state => {
      return state.addingItem;
    },
    editingItem: state => {
      return state.editingItem;
    },
    editingCategory: state => {
      return state.editingCategory;
    },
    addingCategory: state => {
      return state.addingCategory;
    },
    addingStep: state => {
      return state.addingStep;
    },
    editingStep: state => {
      return state.editingStep;
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
      const category = state.categories.filter(c => c.name == categoryName)[0];
      return state.items.filter(item => {
        return category.items.includes(item.id);
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
    setEditingCategory(state, payload) {
      state.editingCategory = payload;
    },
    setAddingCategory(state, payload) {
      state.addingCategory = payload;
    },
    setEditingItem(state, payload) {
      state.editingItem = payload;
    },
    setAddingItem(state, payload) {
      state.addingItem = payload;
    },
    setEditingStep(state, payload) {
      state.editingStep = payload;
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
    deleteCategory(state, payload) {
      state.categories = state.categories.filter(
        c => c.name !== payload.category
      );
    },
    deleteItem(state, payload) {
      if (payload.category) {
        const cat = state.categories.find(c => c.name == payload.category);
        cat.items = cat.items.filter(i => i != payload.item);
      }
      state.items = state.items.filter(i => i.id != payload.item);
    },
    deleteStep(state, payload) {
      if (payload.item) {
        debugger;
        const item = state.items.find(i => i.name == payload.item);
        item.steps = item.steps.filter(s => s != payload.step);
      }
      state.steps = state.steps.filter(s => s.id != payload.step);
    },
    updateCategory(state, payload) {
      const category = state.categories.find(c => c.name === payload.oldName);
      category.name = payload.name;
    },
    updateItem(state, payload) {
      const item = state.items.find(c => c.name === payload.oldName);
      item.name = payload.name;
      item.image = payload.imageFile;
    },
    updateStep(state, payload) {
      const step = state.steps.find(s => s.title === payload.oldTitle);
      step.title = payload.title;
      step.description = payload.description;
      step.image = payload.image;
    },
    addItem(state, payload) {
      const category = state.categories.find(
        c => c.name === payload.item.category
      );
      if (!state.items.find(item => item.id === payload.item.id)) {
        if (category && !category.items.includes(payload.item.id)) {
          category.items.push(payload.item.id);
        }
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
      return db.items.add(payload).then(result => {
        return db.categories
          .where("name")
          .equals(payload.category)
          .modify(category => {
            category.items.push(result);
          })
          .then(() => {
            context.commit("addItem", { item: payload });
          });
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
    },
    deleteCategory(context, payload) {
      return db.categories
        .where({ name: payload.category })
        .first(category => {
          category.items.forEach(item => {
            context.dispatch("deleteItem", { item });
          });
        })
        .then(() => {
          return db.categories.where({ name: payload.category }).delete();
        })
        .then(result => {
          context.commit("deleteCategory", payload);
        });
    },
    deleteItem(context, payload) {
      return db.items
        .where({ id: payload.item })
        .delete()
        .then(result => {
          db.categories.where({ name: payload.category }).modify(category => {
            category.items = category.items.filter(i => i != payload.item);
          });
          context.commit("deleteItem", payload);
        })
        .catch(e => console.log(e));
    },
    deleteStep(context, payload) {
      // delete step itself AND delete it from it's containing item
      return db.steps
        .where({ id: payload.step })
        .delete()
        .then(result => {
          db.items.where({ name: payload.item }).modify(item => {
            item.steps = item.steps.filter(s => s != payload.step);
          });
          context.commit("deleteStep", payload);
        });
      console.log(payload);
    },
    updateCategory(context, payload) {
      return db.categories
        .where("name")
        .equals(payload.oldName)
        .modify({ name: payload.name })
        .then(result => {
          context.commit("updateCategory", payload);
        });
    },
    updateItem(context, payload) {
      return db.items
        .where({ name: payload.oldName })
        .modify({
          name: payload.name,
          image: payload.imageFile
        })
        .then(result => {
          context.commit("updateItem", payload);
        });
    },
    updateStep(context, payload) {
      return db.steps
        .where({ title: payload.oldTitle })
        .modify({
          title: payload.title,
          description: payload.description,
          image: payload.image
        })
        .then(result => {
          context.commit("updateStep", payload);
        });
    }
  }
};

export default appStore;
