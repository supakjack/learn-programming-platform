module.exports = {
  state: () => [
    {
      text: null,
      href: null
    }
  ],
  mutations: {
    setBreadcrumb(state, breadcrumb) {
      state = breadcrumb;
      console.log("mutations", state);
    }
  }
};
