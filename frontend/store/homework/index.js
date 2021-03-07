module.exports = {
  state: () => ({
    problemId: "",
    taskId: "",
    problemTitle: "",
    assignmentId: "",
    assignmentTitle: "",
    problemDescription: ""
  }),
  mutations: {
    setHomework(state, { homework }) {
      state.problemId = homework.problemId
        ? homework.problemId
        : state.problemId;
      state.taskId = homework.taskId ? homework.taskId : state.taskId;
      state.assignmentId = homework.assignmentId
        ? homework.assignmentId
        : state.assignmentId;
      state.assignmentTitle = homework.assignmentTitle
        ? homework.assignmentTitle
        : state.assignmentTitle;
      state.problemTitle = homework.problemTitle
        ? homework.problemTitle
        : state.problemTitle;
      state.problemDescription = homework.problemDescription
        ? homework.problemDescription
        : state.problemDescription;
    }
  }
};
