module.exports = {
  state: () => ({
    permission: [],
    token: "",
    username: "",
    id: ""
  }),
  mutations: {
    setUser(state, { user }) {
      state.permission = user.permission;
      state.token = user.token;
      state.username = user.username;
      state.id = 1;
      console.log(user);
    }
  }
};
