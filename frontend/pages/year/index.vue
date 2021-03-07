<template>
  <div>
    <!-- year section -->
    <v-card>
      <v-data-table
        :items-per-page="5"
        :search="search"
        :headers="headers"
        :items="yearByCreate"
        sort-by="text"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>ปีการศึกษา</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="ค้นหา"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn
              color="success"
              dark
              class="mb-2"
              @click="insertYearDialog = true"
            >
              เพิ่มปีการศึกษา
            </v-btn>

            <!-- insert dialog -->
            <v-dialog v-model="insertYearDialog" persistent max-width="600px">
              <v-card>
                <v-card-title>
                  <span class="">เพิ่มปีการศึกษา</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="12">
                        <v-text-field
                          v-model="modalCourseYearName"
                          label="ปีการศึกษา*"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="12">
                        <v-text-field
                          v-model="modalCourseYearSemester"
                          label="ภาคเรียนที่*"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          v-model="modalCourseYearStatus"
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
                  <v-btn color="blue darken-1" text @click="clickInsertYear">
                    บันทึก
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="openEditYearModal(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="openDeleteYearModal(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
    <!-- edit dialog -->
    <v-dialog v-model="updateYearDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="">แก้ไขปีการศึกษา</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="12">
                <v-text-field
                  v-model="modalCourseYearName"
                  label="ปีการศึกษา*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="12">
                <v-text-field
                  v-model="modalCourseYearSemester"
                  label="ภาคเรียนที่*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  v-model="modalCourseYearStatus"
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
          <v-btn color="blue darken-1" text @click="clickUpdateYear">
            บันทึก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- delete dialog -->
    <v-dialog v-model="deleteYearDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="">ลบปีการศึกษา</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="12">
                <v-text-field
                  readonly
                  v-model="modalCourseYearName"
                  label="ปีการศึกษา*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="12">
                <v-text-field
                  readonly
                  v-model="modalCourseYearSemester"
                  label="ภาคเรียนที่*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  readonly
                  v-model="modalCourseYearStatus"
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
          <v-btn color="danger darken-1" text @click="clickUpdateYear(3)">
            ลบ
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- year section -->
  </div>
</template>
<script>
import coursemixin from "@/components/year";
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
      const { doesGetAll } = await this.getYear({
        yearCreateBy: this.$store.state.user.id
      });

      await doesGetAll.map(doesGetAll => {
        doesGetAll.text =
          "ปีการศึกษา " +
          doesGetAll.yearName +
          " ภาคเรียนที่ " +
          doesGetAll.yearSemester;
      });
      this.yearByCreate = doesGetAll;
      this.cancelModal();
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
      this.insertYearDialog = false;
      this.updateYearDialog = false;
      this.deleteYearDialog = false;
    },
    async openEditYearModal(item) {
      this.modalCourseYearId = item.yearId;
      this.modalCourseYearName = item.yearName;
      this.modalCourseYearSemester = item.yearSemester;
      this.modalCourseYearStatus = item.yearStatus == "active" ? 1 : 2;
      this.updateYearDialog = true;
      console.log("openEditYearModal");
      console.log(item);
    },

    async clickUpdateYear(status) {
      const updateData = {
        yearId: this.modalCourseYearId,
        yearName: this.modalCourseYearName,
        yearSemester: this.modalCourseYearSemester,
        yearCreateBy: this.$store.state.user.id,
        yearUpdateBy: this.$store.state.user.id,
        yearStatus: this.modalCourseYearStatus
      };
      if (status == 3) {
        console.log("update delete");
        updateData.yearStatus = 3;
      }
      await this.updateYear(updateData);
      await this.initialize();
    },

    async openDeleteYearModal(item) {
      this.modalCourseYearId = item.yearId;
      this.modalCourseYearName = item.yearName;
      this.modalCourseYearSemester = item.yearSemester;
      this.modalCourseYearStatus = item.yearStatus == "active" ? 1 : 2;
      this.deleteYearDialog = true;
    },

    async clickInsertYear() {
      console.log("clickInsertYear");
      await this.insertYear({
        yearName: this.modalCourseYearName,
        yearSemester: this.modalCourseYearSemester,
        yearCreateBy: this.$store.state.user.id,
        yearUpdateBy: this.$store.state.user.id,
        yearStatus: this.modalCourseYearStatus
      });
      await this.initialize();
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
