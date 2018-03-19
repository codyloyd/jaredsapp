const appStore = {
  state: {
    title: "HELLO TITLE"
  },
  getters: {
    lowerCaseTitle: state => {
      return state.title.toLowerCase();
    }
  },
  mutations: {},
  actions: {}
};

export default appStore;
