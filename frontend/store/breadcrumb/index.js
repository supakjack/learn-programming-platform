module.exports = {
  state: () => ({
    list: [
      {
        text: null,
        href: null
      }
    ]
  }),

  mutations: {
    setBreadcrumb(state, list) {
      state.list = list;
    }
  }
};
