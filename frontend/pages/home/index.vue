<template>
  <div>
    <v-card class="d-flex mb-4 flex flex-wrap" flat tile>
      <div v-for="(item, i) in allCourses" :key="i" class="ml-2 mb-5 p-2">
        <!-- <router-link to="/assignment"> -->
        <v-card
          class="mx-auto"
          max-width="600"
          height="150"
          width="350"
          @click="clickCourse(item)"
        >
          <v-divider color="blue"></v-divider>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="mb-1 kanit-font">
                {{ item.courseCode }} {{ item.courseName }}
              </v-list-item-title>
              <v-list-item-subtitle class="kanit-font"
                >ภาคเรียน {{ item.yearId }}/{{
                  item.yearName
                }}</v-list-item-subtitle
              >
              <v-list-item-subtitle class="text-right kanit-font">
                กลุ่ม {{ item.sectionNumber }}
              </v-list-item-subtitle>
              <v-list-item-subtitle class="text-right kanit-font"
                >อัพเดทล่าสุดวันที่
                {{ item.courseUpdateDate }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-card-actions class="kanit-font">
            <v-btn color="warning" text>แก้ไข</v-btn>
            <v-btn color="error" text>ลบ</v-btn>
          </v-card-actions>
        </v-card>
      </div>

      <v-row>
        <v-dialog v-model="sectionDialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-card
              class="ml-7 mt-5"
              color="grey lighten-3"
              max-width="344"
              height="150"
              width="350"
              v-bind="attrs"
              v-on="on"
            >
              <v-divider color="blue"></v-divider>

              <v-card-text class="font-weight-bold text-center">
                เพิ่มรายวิชา
              </v-card-text>
              <v-row justify="space-around">
                <v-icon large color="blue"> mdi-plus-circle-outline </v-icon>
              </v-row>
            </v-card>
          </template>
          <v-card>
            <v-card-title>
              <span class="">เพิ่มรายวิชา</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="ปีการศึกษา*" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="ภาคเรียน*" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field label="รหัสวิชา*" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field label="ชื่อรายวิชา*" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="กลุ่มเรียน*" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      :items="['ใช้งาน', 'ปิดใช้งาน']"
                      label="สถานะ*"
                      required
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
              <small>*โปรดระบุข้อมูลที่ต้องการ</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="sectionDialog = false">
                ยกเลิก
              </v-btn>
              <v-btn color="blue darken-1" text @click="sectionDialog = false">
                บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-card>
  </div>
</template>
<script>
import homemixin from "@/components/home";
export default {
  mixins: [homemixin],
  // middleware: "auth",
  mounted() {
    // console.log(this.$store.state.user);
  },
  methods: {
    async initialize() {
      const { doesGetSome } = await this.getHome(this.$store.state.user.id);
      doesGetSome.map((doesGetSome) => {
        doesGetSome.courseUpdateDate = this.$moment(
          doesGetSome.courseUpdateDate
        ).format("Do MMM YY เวลา LT");
      });
      this.allCourses = await doesGetSome;
      // this.$store.commit("course/setCourse", {
      //   course: {
      //     courses: this.allCourses
      //   }
      // });
    },

    async clickCourse(item) {
      this.$store.commit("course/setCourse", {
        course: item,
      });
      this.$router.push("/assignment");
    },
  },
  async created() {
    this.initialize();
  },
  data: () => ({
    sectionDialog: false,
    allCourses: [],
  }),
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
