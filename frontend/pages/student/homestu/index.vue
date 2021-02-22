<template>
  <div>
    <router-link to="/student/homework">
      <v-card class="d-flex mb-4 flex flex-wrap" flat tile>
        <div v-for="(item, i) in subjects" :key="i" class="ml-2 mb-5">
          <v-card class="mx-auto" max-width="344" height="130" width="280">
            <v-divider color="blue"></v-divider>

            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="kanit-font">
                  {{ item.id }} {{ item.name }}
                </v-list-item-title>

                <v-list-item-subtitle class="kanit-font">
                  ภาคเรียน {{ item.course }}/{{
                    item.year
                  }}</v-list-item-subtitle
                >

                <v-list-item-subtitle class="kanit-font text-right">
                  กลุ่ม {{ item.group }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-card-actions class="kanit-font">
              <v-list-item-subtitle
                >อัพเดทล่าสุดวันที่ {{ item.date }}</v-list-item-subtitle
              >
            </v-card-actions>
          </v-card>
        </div>
      </v-card>
    </router-link>
  </div>
</template>

<script>
export default {
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

  data: () => ({
    sectionDialog: false,
    subjects: [
      {
        id: "88151518",
        name: "คิดเลขในใจ",
        course: "1",
        year: "2563",
        date: "15/10/2021",
        group: "1"
      },
      {
        id: "88151518",
        name: "คิดเลขในใจ",
        course: "1",
        year: "2563",
        date: "15/10/2021",
        group: "1"
      }
    ]
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
