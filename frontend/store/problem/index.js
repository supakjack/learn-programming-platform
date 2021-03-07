module.exports = {
  state: () => ({
    id: "",
    title: "",
    status: "",
    description: "",
    tags: [],
    testset: [],
    files: undefined
  }),
  mutations: {
    setProblem(state, { problem }) {
      state.id = problem.id ? problem.id : "";
      state.title = problem.title ? problem.title : "";
      state.status = problem.status ? problem.status : "";
      state.description = problem.description ? problem.description : "";
      state.tags = problem.tags ? problem.tags : state.tags;
    },
    setTestset(state, { problem }) {
      state.testset = problem.testset ? problem.testset : state.testset;
    },
    setFiles(state, { problem }) {
      state.files = problem.files ? problem.files : undefined;
    }
  }
};
