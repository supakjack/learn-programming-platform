module.exports = {
  state: () => ({
    id: "",
    title: "",
    status: "",
    score: "",
    description: "",
    tags: [],
    testset: []
  }),
  mutations: {
    setProblem(state, { problem }) {
      state.id = problem.id ? problem.id : state.id;
      state.title = problem.title ? problem.title : state.title;
      state.status = problem.status ? problem.status : state.status;
      state.score = problem.score ? problem.score : state.score;
      state.description = problem.description
        ? problem.description
        : state.description;
      state.tags = problem.tags ? problem.tags : state.tags;
      state.testset = problem.testset;
    }
  }
};
