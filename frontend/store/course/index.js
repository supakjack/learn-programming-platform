module.exports = {
  state: () => ({
    courseId: null,
    courseName: null,
    courseCode: null,
    courseUpdateDate: null,

    sectionId: null,
    sectionNumber: null,
    userId: null,
    userUsername: null,

    yearId: null,
    yearName: null,
    yearSemester: null
  }),
  mutations: {
    setCourse(state, { course }) {
      state.courseId = course.courseId;
      state.courseName = course.courseName;
      state.courseCode = course.courseCode;
      state.courseUpdateDate = course.courseUpdateDate;

      state.sectionId = course.sectionId;
      state.sectionNumber = course.sectionNumber;
      state.userId = course.userId;
      state.userUsername = course.userUsername;

      state.yearId = course.yearId;
      state.yearName = course.yearName;
      state.yearSemester = course.yearSemester;
      // state.course.push(course);
      // console.log(course);
    }
  }
};
