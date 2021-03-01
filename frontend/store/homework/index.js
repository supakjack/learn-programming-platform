module.exports = {
  state: () => ({
    problemId: "",
    taskId: "",
    problemTitle: "",
    problemDescription: ""
  }),
  mutations: {
    setHomework(state, { homework }) {
      state.problemId = homework.problemId
        ? homework.problemId
        : state.problemId;
      state.taskId = homework.taskId ? homework.taskId : state.taskId;
      state.problemTitle = homework.problemTitle
        ? homework.problemTitle
        : state.problemTitle;
      state.problemDescription = homework.problemDescription
        ? homework.problemDescription
        : state.problemDescription;
    }
  }
};
