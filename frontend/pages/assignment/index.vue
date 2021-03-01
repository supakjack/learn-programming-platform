<template>
  <div>
    <v-card class="mb-5" height="70" width="1250">
      <v-row no-gutters>
        <v-col cols="4" class="ma-4 ml-16 mt-5">
          <b class="mr-2">รายวิชา</b>
          <font class="kanit-font">{{
            courseData.courseCode + " " + courseData.courseName
          }}</font>
        </v-col>
        <v-col cols="2" class="ma-4 mt-5">
          <b class="mr-2"> ปีการศึกษา</b>
          <font class="kanit-font">{{ courseData.yearName }}</font>
        </v-col>
        <v-col cols="2" class="ma-4 mt-5">
          <b class="mr-2"> ภาคเรียนที่</b>
          <font class="kanit-font">{{ courseData.yearSemester }}</font>
        </v-col>
        <v-col cols="2" class="ma-4 mt-5">
          <b class="mr-2"> กลุ่มเรียนที่</b>
          <font class="kanit-font">{{ courseData.sectionNumber }}</font>
        </v-col>
      </v-row>
    </v-card>
    <v-card class="kanit-font">
      <v-tabs centered v-model="tab">
        <v-tab href="#assignment">มอบหมายงาน</v-tab>
        <v-tab href="#user">สมาชิก</v-tab>
      </v-tabs>

      <v-tabs-items :value="tab">
        <v-tab-item value="assignment">
          <div>
            <assignment />
          </div>
        </v-tab-item>
        <v-tab-item value="user">
          <div>
            <user />
          </div>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import user from "@/pages/assignment/user/index";
import assignment from "@/pages/assignment/assignments/index";
import usermixin from "@/components/users";
import assignmentmixin from "@/components/assignment";

export default {
  mixins: [usermixin],
  mixins: [assignmentmixin],
  computed: {
    tab: {
      set(tab) {
        this.$router.replace({ query: { ...this.$route.query, tab } });
      },
      get() {
        return this.$route.query.tab;
      }
    }
  },
  components: {
    user,
    assignment
  },
  data: () => ({
    courseData: []
  }),
  async created() {
    this.initialize();
  },
  async mounted() {
    // console.log(courseData.courseCode);
    // const { doseGetAll } = await this.getProblem();
    // this.allProblems = doseGetAll;
    // console.log(this.allProblems);
    // console.log(this.$store.state.course);
    // this.courseData.courseCode = this.$store.state.course.courseCode;
    // console.log(this.courseData.courseCode);
  },
  methods: {
    async initialize() {
      // this.courseData.courseCode = this.$store.state.course.courseCode;
      this.courseData = this.$store.state.course;
      // this.courseData.yearName = this.$store.state.course.yearName;
      // this.courseData.yearSemester = this.$store.state.course.yearSemester;
      // this.courseData.sectionNumber = this.$store.state.course.sectionNumber;
      // this.courseData.courseName = this.$store.state.course.courseName;
      // this.courseData.courseName = this.$store.state.course.courseName;
      // console.log(this.courseData);
    }
  }
  //   layout: "modren"
};
</script>

<style>
.roboto-font {
  font-family: "Roboto", sans-serif;
}
.kanit-font {
  font-family: "Kanit", sans-serif;
}
</style>
