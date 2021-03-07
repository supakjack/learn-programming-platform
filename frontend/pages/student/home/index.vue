<template>
  <div>
    <v-card class="d-flex mb-4 flex flex-wrap" flat tile>
      <div v-for="(item, i) in subjects" :key="i" class="ml-2 mb-5 p-2">
        <v-card
          class="mx-auto"
          max-width="600"
          height="150"
          width="350"
          @click="clickOpenStudentHomework(item)"
        >
          <v-divider color="blue"></v-divider>

          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="kanit-font">
                {{ item.courseCode }} {{ item.courseName }}
              </v-list-item-title>

              <v-list-item-subtitle class="kanit-font">
                ภาคเรียน {{ item.yearId }}/{{ item.yearName }}</v-list-item-subtitle
              >

              <v-list-item-subtitle class="kanit-font text-right">
                กลุ่ม {{ item.sectionNumber }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-card-actions class="kanit-font">
            <v-list-item-subtitle
              >อัพเดทล่าสุดวันที่ {{ item.courseUpdateDate }}</v-list-item-subtitle
            >
          </v-card-actions>
        </v-card>
      </div>
    </v-card>
  </div>
</template>

<script>
import coursemixin from "@/components/course";

export default {
  mixins: [coursemixin],
  middleware: "auth",

  defaultItem: {
    courseId: 0,
    courseCode: "",
    courseName: "",
    courseYearId: "",
    courseCreateDate: "",
    courseUpdateDate: "",
    courseStatus: 0,
    courseCreateBy: 0,
    courseUpdateBy: 0
  },

  methods: {
    async initialize() {
      this.$store.commit("breadcrumb/setBreadcrumb", [
        {
          text: "หน้าหลัก",
          href: "/student/home"
        }
      ]);
      const { doesGetSome } = await this.getHome(
        this.$store.state.user.id
      );
      await doesGetSome.map(doesGetSome => {
        doesGetSome.courseUpdateDate = this.$moment(
          doesGetSome.courseUpdateDate
        ).format("Do MMM YY เวลา LT");
      });
      // await doesGetYearByCreate.map(doesGetYearByCreate => {
      //   doesGetYearByCreate.text =
      //     "ปีการศึกษา " +
      //     doesGetYearByCreate.yearName +
      //     " ภาคเรียนที่ " +
      //     doesGetYearByCreate.yearSemester;
      // });
      this.subjects = doesGetSome;
      console.log(this.subjects);
      // this.yearByCreate = doesGetYearByCreate;
    },
     async clickOpenStudentHomework(course) {
      this.$store.commit("course/setCourse", {
        course
      });
      this.$router.push("/student/homework");
    },
  },

  mounted() {},
  async created() {
    this.initialize();
  },
  data: () => ({
    sectionDialog: false,
    subjects: []
  })
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
