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
            <v-btn color="warning" @click="clickOpenEditSection(item)" text
              >แก้ไข</v-btn
            >
            <v-btn color="error" @click="clickOpenDeleteSection(item)" text
              >ลบ</v-btn
            >
          </v-card-actions>
        </v-card>
      </div>
      <v-row>
        <!-- insert dialog -->
        <v-dialog v-model="insertSectionDialog" persistent max-width="600px">
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
                เพิ่มกลุ่มเรียน
              </v-card-text>
              <v-row justify="space-around">
                <v-icon large color="blue"> mdi-plus-circle-outline </v-icon>
              </v-row>
            </v-card>
          </template>
          <v-card>
            <v-card-title>
              <span class="">เพิ่มกลุ่มเรียน</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="8">
                    <v-text-field
                      v-model="sectionNumber"
                      label="กลุ่มเรียนที่*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      v-model="sectionStatus"
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
              <v-btn color="blue darken-1" text @click="clickInsertSection">
                บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-card>
    <!-- update dialog -->
    <v-dialog v-model="updateSectionDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="">แก้ไขกลุ่มเรียน</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="8">
                <v-text-field
                  v-model="sectionNumber"
                  label="กลุ่มเรียนที่*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  v-model="sectionStatus"
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
          <v-btn color="blue darken-1" text @click="clickUpdateSection">
            บันทึก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- delete dialog -->
    <v-dialog v-model="deleteSectionDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="">ลบกลุ่มเรียน</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="8">
                <v-text-field
                  readonly
                  v-model="sectionNumber"
                  label="กลุ่มเรียนที่*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  readonly
                  v-model="sectionStatus"
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
          <v-btn color="error darken-1" text @click="clickUpdateSection(3)">
            ลบ
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar">
      กลุ่มเรียนที่ {{ sectionNumber }} มีอยู่แล้ว
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
import coursemixin from "@/components/course";
import sectionmixin from "@/components/section";
export default {
  mixins: [coursemixin, sectionmixin],
  methods: {
    async initialize() {
      const corseSection =
        this.$store.state.course.courseCode +
        " " +
        this.$store.state.course.courseName;
      this.$store.commit("breadcrumb/setBreadcrumb", [
        {
          text: "หน้าหลัก",
          href: "/home"
        },
        {
          text: corseSection,
          href: "/home/section"
        }
      ]);
      const { doesGet } = await this.getCourseSection({
        courseId: this.$store.state.course.courseId,
        userId: this.$store.state.user.id
      });
      await doesGet.map(doesGet => {
        // doesGet.courseUpdateDate = this.$moment(
        //   doesGet.courseUpdateDate
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
      this.allCourses = doesGet;
      this.cancelModal();
    },
    async clickOpenUserSection(course) {
      this.$store.commit("course/setCourse", {
        course
      });
      this.$router.push("/assignment");
    },
    async clickUpdateSection(status) {
      if (this.isDuplicatedEditSectionNumber && status != 3) {
        this.snackbar = true;
      } else {
        const updateData = {
          sectionId: this.sectionId,
          sectionNumber: this.sectionNumber,
          sectionStatus: this.sectionStatus,
          sectionCreateBy: this.$store.state.user.id,
          sectionUpdateBy: this.$store.state.user.id
        };
        console.log(updateData);
        if (status == 3) {
          updateData.sectionStatus = 3;
        }
        await this.updateSection(updateData);
        await this.initialize();
      }
    },
    async clickOpenEditSection(section) {
      console.log(section);
      this.updateSectionDialog = true;
      this.sectionId = section.sectionId;
      this.sectionNumber = section.sectionNumber;
      this.editSectionNumber = section.sectionNumber;
      this.sectionStatus = section.sectionStatus == "active" ? 1 : 2;
    },
    async clickOpenDeleteSection(section) {
      this.deleteSectionDialog = true;
      this.sectionId = section.sectionId;
      this.sectionNumber = section.sectionNumber;
      this.sectionStatus = section.sectionStatus == "active" ? 1 : 2;
      console.log(section);
    },
    async clickInsertSection() {
      if (this.isDuplicatedSectionNumber) {
        this.snackbar = true;
      } else {
        const insertData = {
          sectionNumber: this.sectionNumber,
          sectionCourseId: this.$store.state.course.courseId,
          sectionCreateBy: this.$store.state.user.id,
          sectionUpdateBy: this.$store.state.user.id,
          sectionStatus: this.sectionStatus
        };
        console.log(insertData);
        await this.insertSection(insertData);
        await this.initialize();
      }
    },
    async cancelModal() {
      this.sectionNumber = "";
      this.sectionStatus = "";
      this.insertSectionDialog = false;
      this.updateSectionDialog = false;
      this.deleteSectionDialog = false;
    }
  },
  watch: {
    async sectionNumber(val) {
      console.log(
        "check : " +
          (await this.allCourses.filter(a => a.sectionNumber == val).length)
      );
      if (await this.allCourses.filter(a => a.sectionNumber == val).length) {
        this.isDuplicatedSectionNumber = true;
      } else {
        this.isDuplicatedSectionNumber = false;
      }
      if (this.editSectionNumber == val) {
        console.log("edit same origin number");
        this.isDuplicatedEditSectionNumber = false;
      } else if (
        (await this.allCourses.filter(a => a.sectionNumber == val).length) <= 1
      ) {
        console.log("edit change origin number");
        if (await this.allCourses.filter(a => a.sectionNumber == val).length) {
          this.isDuplicatedEditSectionNumber = true;
          console.log("edit change origin number  dupicate");
        } else {
          this.isDuplicatedEditSectionNumber = false;
          console.log("edit change origin number not dupicate");
        }
      } else {
        this.isDuplicatedEditSectionNumber = true;
      }
      console.log(
        "isDuplicatedEditSectionNumber : " + this.isDuplicatedEditSectionNumber
      );
    }
  },
  created() {
    this.initialize();
  },
  data: () => ({
    allCourses: [],
    sectionId: "",
    sectionNumber: "",
    editSectionNumber: "",
    isDuplicatedSectionNumber: false,
    isDuplicatedEditSectionNumber: false,
    sectionStatus: "",
    insertSectionDialog: false,
    updateSectionDialog: false,
    deleteSectionDialog: false,
    snackbar: false
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
