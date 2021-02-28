module.exports = {
  state: () => ({
    id: "",
    title: "",
    status: "",
    description: "",
    tags: [],
    testset: []
  }),
  mutations: {
    setProblem(state, { problem }) {
      state.id = problem.id ? problem.id : state.id;
      state.title = problem.title ? problem.title : state.title;
      state.status = problem.status ? problem.status : state.status;
      state.description = problem.description
        ? problem.description
        : state.description;
      state.tags = problem.tags ? problem.tags : state.tags;
      state.testset = problem.testset ? problem.testset : state.testset;
    }
  }
};