<template>
  <div>
    <v-card class="d-flex mb-4 flex flex-wrap" flat tile>
      <div v-for="(item, i) in allCourses" :key="i" class="ml-2 mb-5 p-2">
        <v-card class="mx-auto" max-width="600" height="150" width="350">
          <v-divider color="blue"></v-divider>
          <v-list-item three-line @click="clickOpenUserSection(item)">
            <v-list-item-content>
              <v-list-item-title class="mb-1 kanit-font">
                {{ item.courseCode }} {{ item.courseName }}
              </v-list-item-title>
              <v-list-item-subtitle class="kanit-font"
                >ภาคเรียน {{ item.yearId }}/{{
                  item.yearName
                }}</v-list-item-subtitle
              >
              <v-list-item-subtitle class="text-right kanit-font"
                >กลุ่มเรียนที่ {{ item.sectionNumber }}</v-list-item-subtitle
              >
              <v-list-item-subtitle class="text-right kanit-font"
                >อัพเดทล่าสุดวันที่
                {{ item.courseUpdateDate }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-card-actions class="kanit-font">
            <v-btn color="primary" @click="clickOpenUserSection(item)" text
              >จัดการกลุ่มเรียน</v-btn
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
  methods: {
    async initialize() {
      const { doesGet } = await this.getCourseSection({
        courseId: this.$store.state.course.courseId,
        userId: this.$store.state.user.id
      });
      await doesGet.map(doesGet => {
        doesGet.courseUpdateDate = this.$moment(
          doesGet.courseUpdateDate
        ).format("Do MMM YY เวลา LT");
      });
      this.allCourses = doesGet;
      console.log(this.allCourses);
    },
    async clickOpenUserSection(course) {
      this.$store.commit("course/setCourse", {
        course
      });
      this.$router.push("/assignment");
    }
  },
  async created() {
    this.initialize();
  },
  data: () => ({
    allCourses: []
  }),
  mounted() {
    this.$store.commit("setCrumbs", [
      {
        title: "home/section",
        url: "home/section"
      }
    ]);
  }
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
