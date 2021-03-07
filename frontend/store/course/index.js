module.exports = {
  state: () => ({
    userId: null,
    userUsername: null,

    courseId: null,
    courseName: null,
    courseCode: null,
    courseStatus: null,
    courseUpdateDate: null,

    yearId: null,
    yearName: null,
    yearSemester: null,

    sectionId: null,
    sectionNumber: null,

  }),
  mutations: {
    setCourse(state, { course }) {
      state.courseId = course.courseId ? course.courseId : state.courseId;
      state.courseName = course.courseName
        ? course.courseName
        : state.courseName;
      state.courseCode = course.courseCode
        ? course.courseCode
        : state.courseCode;
        state.courseStatus = course.courseStatus
        ? course.courseStatus
        : state.courseStatus;
      state.courseUpdateDate = course.courseUpdateDate
        ? course.courseUpdateDate
        : state.courseUpdateDate;

      state.sectionId = course.sectionId ? course.sectionId : state.sectionId;
      state.sectionNumber = course.sectionNumber
        ? course.sectionNumber
        : state.sectionNumber;
      state.userId = course.userId ? course.userId : state.userId;
      state.userUsername = course.userUsername
        ? course.userUsername
        : state.userUsername;

      state.yearId = course.yearId ? course.yearId : state.yearId;
      state.yearName = course.yearName ? course.yearName : state.yearName;
      state.yearSemester = course.yearSemester
        ? course.yearSemester
        : state.yearSemester;
      // state.course.push(course);
      // console.log(course);
    }
  }
};
