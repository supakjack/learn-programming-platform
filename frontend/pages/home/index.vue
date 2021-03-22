<template>
  <div>
    <v-card class="d-flex mb-4 flex flex-wrap" flat tile>
      <div v-for="(item, i) in allCourses" :key="i" class="ml-2 mb-5 p-2">
        <v-card class="mx-auto" max-width="600" height="150" width="350">
          <v-divider color="blue"></v-divider>
          <v-list-item three-line @click="clickOpenCourseSection(item)">
            <v-list-item-content>
              <v-list-item-title class="mb-1 kanit-font">
                {{ item.courseCode }} {{ item.courseName }}
              </v-list-item-title>
              <v-list-item-subtitle class="kanit-font"
                >ภาคเรียน {{ item.yearSemester }}/{{
                  item.yearName
                }}</v-list-item-subtitle
              >
              <v-list-item-subtitle class="text-right kanit-font"
                >อัพเดทล่าสุดวันที่
                {{ item.courseUpdateDate }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-card-actions class="kanit-font">
            <v-btn color="primary" @click="clickOpenCourseSection(item)" text
              >ดูกลุ่มเรียน</v-btn
            >
            <v-btn color="warning" @click="clickOpenEditCourse(item)" text
              >แก้ไข</v-btn
            >
            <v-btn color="error" @click="clickOpenDeleteCourse(item)" text
              >ลบ</v-btn
            >
          </v-card-actions>
        </v-card>
      </div>
      <v-row>
        <!-- insert dialog -->
        <v-dialog v-model="insertCourseDialog" persistent max-width="600px">
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
                  <v-col cols="12" sm="12" md="8">
                    <v-select
                      v-model="modalCourseYearId"
                      :items="yearByCreate"
                      item-text="text"
                      item-value="yearId"
                      label="ปีการศึกษา*"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="modalCourseCode"
                      label="รหัสวิชา*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="8">
                    <v-text-field
                      v-model="modalCourseName"
                      label="ชื่อรายวิชา*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      v-model="modalCourseStatus"
                      :items="[
                        { text: 'ใช้งาน', val: 1 },
                        { text: 'ปิดใช้งาน', val: 2 }
                      ]"
                      item-text="text"
                      item-value="val"
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
              <v-btn color="blue darken-1" text @click="cancelModal">
                ยกเลิก
              </v-btn>
              <v-btn color="blue darken-1" text @click="clickInsertCourse">
                บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <!-- update dialog -->
      <v-dialog v-model="updateCourseDialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="">แก้ไขรายวิชา</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="8">
                  <v-select
                    v-model="modalCourseYearId"
                    :items="yearByCreate"
                    item-text="text"
                    item-value="yearId"
                    label="ปีการศึกษา*"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="modalCourseCode"
                    label="รหัสวิชา*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="8">
                  <v-text-field
                    v-model="modalCourseName"
                    label="ชื่อรายวิชา*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    v-model="modalCourseStatus"
                    :items="[
                      { text: 'ใช้งาน', val: 1 },
                      { text: 'ปิดใช้งาน', val: 2 }
                    ]"
                    item-text="text"
                    item-value="val"
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
            <v-btn color="blue darken-1" text @click="cancelModal">
              ยกเลิก
            </v-btn>
            <v-btn color="blue darken-1" text @click="clickUpdateCourse">
              บันทึก
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- delete dialog -->
      <v-dialog v-model="deleteCourseDialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="">ลบรายวิชา</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="8">
                  <v-select
                    readonly
                    v-model="modalCourseYearId"
                    :items="yearByCreate"
                    item-text="text"
                    item-value="yearId"
                    label="ปีการศึกษา"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    readonly
                    v-model="modalCourseCode"
                    label="รหัสวิชา"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="8">
                  <v-text-field
                    readonly
                    v-model="modalCourseName"
                    label="ชื่อรายวิชา"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    readonly
                    v-model="modalCourseStatus"
                    :items="[
                      { text: 'ใช้งาน', val: 1 },
                      { text: 'ปิดใช้งาน', val: 2 }
                    ]"
                    item-text="text"
                    item-value="val"
                    label="สถานะ"
                    required
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
            <small>*คุณกำลังจะลบรายวิชา</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="cancelModal">
              ยกเลิก
            </v-btn>
            <v-btn color="blue darken-1" text @click="clickUpdateCourse(3)">
              ลบ
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>
<script>
import coursemixin from "@/components/course";
export default {
  mixins: [coursemixin],
  methods: {
    async initialize() {
      this.$store.commit("breadcrumb/setBreadcrumb", [
        {
          text: "หน้าหลัก",
          href: "/home"
        }
      ]);
      const { doesGetSome, doesGetYearByCreate } = await this.getTeacherCourse(
        this.$store.state.user.id
      );
      console.log(doesGetYearByCreate);
      await doesGetSome.map(doesGetSome => {
        // doesGetSome.courseUpdateDate = this.$moment(
        //   doesGetSome.courseUpdateDate
        // ).format("Do MMM YY เวลา LT");
        let dayUpdateDate = this.$moment(doesGetAll.courseUpdateDate).format(
          "Do"
        );
        let monthUpdateDate = this.$moment(doesGetAll.courseUpdateDate).format(
          "MMM"
        );
        let yearUpdateDate =
          this.$moment(doesGetAll.courseUpdateDate.getFullYear).year() + 543;
        let timeUpdateDate = this.$moment(doesGetAll.courseUpdateDate).format(
          " เวลา LT"
        );
        doesGetAll.courseUpdateDate =
          dayUpdateDate +
          " " +
          monthUpdateDate +
          " " +
          yearUpdateDate +
          timeUpdateDate;
      });
      await doesGetYearByCreate.map(doesGetYearByCreate => {
        doesGetYearByCreate.text =
          "ปีการศึกษา " +
          doesGetYearByCreate.yearName +
          " ภาคเรียนที่ " +
          doesGetYearByCreate.yearSemester;
      });
      this.allCourses = doesGetSome;
      this.yearByCreate = doesGetYearByCreate;
    },
    async clickOpenCourseSection(course) {
      this.$store.commit("course/setCourse", {
        course
      });
      this.$router.push("/home/section");
    },
    async clickOpenEditCourse(course) {
      console.log(course);
      this.modalCourseId = course.courseId;
      this.modalCourseCode = course.courseCode;
      this.modalCourseName = course.courseName;
      this.modalCourseYearId = course.yearId;
      this.modalCourseStatus = course.courseStatus == "active" ? 1 : 2;
      this.updateCourseDialog = true;
      console.log(this.modalCourseYearId);
      console.log(this.yearByCreate);
    },
    async clickOpenDeleteCourse(course) {
      this.modalCourseId = course.courseId;
      this.modalCourseCode = course.courseCode;
      this.modalCourseName = course.courseName;
      this.modalCourseYearId = course.yearId;
      this.modalCourseStatus = course.courseStatus == "active" ? 1 : 2;
      this.deleteCourseDialog = true;
    },

    async clickInsertCourse() {
      const inserData = {
        courseCode: this.modalCourseCode,
        courseName: this.modalCourseName,
        courseYearId: this.modalCourseYearId,
        courseCreateBy: this.$store.state.user.id,
        courseUpdateBy: this.$store.state.user.id,
        courseStatus: this.modalCourseStatus
      };
      await this.insertCourse(inserData);
      this.modalCourseCode = "";
      this.modalCourseName = "";
      this.modalCourseYearId = "";
      this.modalCourseStatus = "";
      this.insertCourseDialog = false;
      await this.initialize();
    },
    async clickUpdateCourse(status) {
      const updateData = {
        courseId: this.modalCourseId,
        courseCode: this.modalCourseCode,
        courseName: this.modalCourseName,
        courseYearId: this.modalCourseYearId,
        courseCreateBy: this.$store.state.user.id,
        courseUpdateBy: this.$store.state.user.id,
        courseStatus: this.modalCourseStatus
      };
      await this.updateCourse(updateData);
      this.modalCourseId = "";
      this.modalCourseCode = "";
      this.modalCourseName = "";
      this.modalCourseYearId = "";
      this.modalCourseStatus = "";
      if (status == 3) {
        this.deleteCourseDialog = false;
      } else {
        this.updateCourseDialog = false;
      }
      await this.initialize();
    },
    async cancelModal() {
      this.modalCourseId = "";
      this.modalCourseCode = "";
      this.modalCourseName = "";
      this.modalCourseYearId = "";
      this.modalCourseStatus = "";
      this.modalCourseYearName = "";
      this.modalCourseYearSemester = "";
      this.modalCourseYearStatus = "";
      this.insertCourseDialog = false;
      this.updateCourseDialog = false;
      this.deleteCourseDialog = false;
      this.insertYearDialog = false;
    },
    async openEditYearModal(item) {
      console.log("openEditYearModal");
      console.log(item);
    },
    async openDeleteYearModal(item) {
      console.log("openDeleteYearModal");
      console.log(item);
    },
    async clickInsertYear() {
      console.log("clickInsertYear");
      this.cancelModal();
    }
  },
  async created() {
    this.initialize();
    console.log(this.yearByCreate);
  },
  data: () => ({
    insertYearDialog: false,
    updateYearDialog: false,
    deleteYearDialog: false,
    deleteCourseDialog: false,
    insertCourseDialog: false,
    updateCourseDialog: false,
    search: "", // use for search in table all column
    allCourses: [],
    yearByCreate: [],
    modalCourseId: "",
    modalCourseCode: "",
    modalCourseName: "",
    modalCourseYearId: "",
    modalCourseStatus: "",
    modalCourseYearName: "",
    modalCourseYearSemester: "",
    modalCourseYearStatus: "",
    headers: [
      { text: "ชื่อ", value: "text" },
      { text: "ปีการศึกษา", value: "yearName" },
      { text: "ภาคเรียนที่", value: "yearSemester" },
      { text: "สถานะ", value: "yearStatus" },
      { text: "ดำเนินการ", value: "actions", sortable: false }
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
