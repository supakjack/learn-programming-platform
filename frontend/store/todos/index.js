module.exports = {
  state: () => ({
    list: []
  }),
  mutations: {
    add(state, { text }) {
      state.list.push({
        text,
        done: false
      });
    },
    toggle(state, { todo }) {
      todo.done = !todo.done;
    }
  }
};
