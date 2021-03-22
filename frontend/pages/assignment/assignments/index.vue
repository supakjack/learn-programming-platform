<!-- CreateBy: Atikom Wongwan
Last edit: 19/2/2021 -->

<template>
  <v-data-table
    :headers="headers"
    :footer-props="{
      'items-per-page-options': [5, 10, 15, -1],
      'items-per-page-text': `จำนวนแถวต่อหน้า`,
      'items-per-page-all-text': `ทั้งหมด`,
    }"
    :items="allAssignment"
    :items-per-page="5"
    :sort-by="assignmentStatus"
    :sort-desc="[false, true]"
    :search="search"
    class="elevation-1 kanit-font"
  >
    <template v-slot:top>
      <v-toolbar flat class="kanit-font">
        <v-toolbar-title>ตารางมอบหมายงาน</v-toolbar-title>
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

        <v-dialog v-model="dialog" max-width="1250px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="success" dark class="mb-2" v-bind="attrs" v-on="on">
              เพิ่มมอบหมายงาน
            </v-btn>
          </template>
          <v-stepper non-linear v-model="pageStep">
            <v-stepper-header>
              <v-stepper-step editable step="1">
                เพิ่มการมอบหมายงาน
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step editable step="2">
                เพิ่มโจทย์ปัญหา
              </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card class="kanit-font">
                  <v-card-title>
                    <span>{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text class="kanit-font">
                    <v-container>
                      <v-row>
                        <!-- Title -->
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field
                            v-model="editedItem.assignmentTitle"
                            label="ชื่องานที่มอบหมาย"
                          ></v-text-field>
                        </v-col>

                        <!-- Discription -->
                        <v-col cols="12" sm="12" md="12">
                          <v-textarea
                            v-model="editedItem.assignmentDescription"
                            label="คำอธิบาย"
                          ></v-textarea>
                        </v-col>

                        <!-- Start date -->
                        <v-col cols="12" sm="6" md="6">
                          <v-menu
                            v-model="menu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="editedItem.assignmentStartDate"
                                label="วันที่เริ่มส่งงาน"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="editedItem.assignmentStartDate"
                              @input="menu = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>

                        <!-- End date -->
                        <v-col cols="12" sm="6" md="6">
                          <v-menu
                            v-model="menu2"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="editedItem.assignmentEndDate"
                                label="วันที่สิ้นสุดส่งงาน"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="editedItem.assignmentEndDate"
                              @input="menu2 = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>

                        <!-- Status -->
                        <v-col cols="12" sm="6" md="4">
                          <v-select
                            :items="assignmentStatus"
                            v-model="editedItem.assignmentStatus"
                            menu-props="auto"
                            label="สถานะ"
                            hide-details
                            single-line
                          >
                          </v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <!-- <v-btn color="blue darken-1" text @click="close"> ยกเลิก </v-btn>
              <v-btn color="blue darken-1" text @click="save"> บันทึก </v-btn> -->
                </v-card>

                <v-spacer></v-spacer>
                <v-btn color="error" class="float-left mt-3"> ยกเลิก </v-btn>
                <v-btn
                  color="primary"
                  @click="pageStep = 2"
                  class="float-right mt-3"
                >
                  ถัดไป
                </v-btn>
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-card class="mb-12" width="1200px">
                  <v-row>
                    <v-col cols="12" sm="11" md="10" class="ml-4">
                      <v-combobox
                        clearable
                        hide-selected
                        multiple
                        persistent-hint
                        small-chips
                        v-model="selectTag"
                        :items="tagItems"
                        label="เลือกแท็กสำหรับค้นหาโจทย์ปัญหา"
                      ></v-combobox>
                    </v-col>
                    <v-col cols="6" md="1">
                      <v-btn
                        color="primary"
                        elevation="2"
                        class="mt-3 ml-4"
                        @click="searchProblemByTag()"
                      >
                        ค้นหา
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-card>
                    <v-card-title>
                      <v-text-field
                        v-model="searchProblem"
                        append-icon="mdi-magnify"
                        label="ค้นหาชื่อโจทย์ปัญหา"
                        hide-details
                      ></v-text-field>
                    </v-card-title>
                    <v-data-table
                      :headers="proplemHeaders"
                      :items="allProblems"
                      :search="searchProblem"
                      :items-per-page="5"
                      :footer-props="{
                        'items-per-page-options': [5, 10, 15, -1],
                        'items-per-page-text': `จำนวนแถวต่อหน้า`,
                        'items-per-page-all-text': `ทั้งหมด`,
                      }"
                    >
                      <template v-slot:[`item.tags`]="{ item }">
                        <v-chip
                          class="ma-1"
                          small
                          v-for="tag in item.tags"
                          :key="tag.tagId"
                        >
                          {{ tag.tagName }}
                        </v-chip>
                      </template>
                      <template v-slot:[`item.actions`]="{ item }">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon
                              color="green"
                              v-bind="attrs"
                              v-on="on"
                              small
                              class="mr-2"
                              @click="addProblem(item)"
                            >
                              mdi-plus
                            </v-icon>
                          </template>
                          <span>เพิ่ม</span>
                        </v-tooltip>
                        <!-- <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon
                              color="error"
                              v-bind="attrs"
                              v-on="on"
                              small
                              class="mr-2"
                              @click="addProblem(item)"
                            >
                              mdi-delete
                            </v-icon>
                          </template>
                          <span>เพิ่ม</span>
                        </v-tooltip> -->
                      </template>
                    </v-data-table>
                  </v-card>
                  <v-spacer></v-spacer>

                  <v-combobox
                    clearable
                    hide-selected
                    multiple
                    persistent-hint
                    small-chips
                    v-model="selectProblem"
                    label="โจทย์ที่เลือก"
                  >
                  </v-combobox>
                </v-card>
                <!-- <v-card-actions> -->
                <v-spacer></v-spacer>
                <v-btn color="error" class="float-left"> ยกเลิก </v-btn>
                <v-btn
                  color="success"
                  @click="pageStep = 1"
                  class="float-right"
                >
                  บันทึก
                </v-btn>
                <v-btn
                  color="primary"
                  class="float-right mr-1"
                  @click="pageStep = 1"
                >
                  ย้อนกลับ
                </v-btn>
                <!-- </v-card-actions> -->
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>

          <!-- Dialog for delete -->
        </v-dialog>
        <v-dialog v-model="dialogReport" max-width="1100px">
          <v-card>
            <v-card-title>
              <span class="headline"
                >รายงานคะแนน "{{ assignmentTitleDialog }}"</span
              >
            </v-card-title>
            <v-data-table
              :headers="reportDialog"
              :items="resultLast"
              :items-per-page="5"
              class="elevation-1"
            >
              <template v-slot:[`item.scoreResultText`]="{ item }">
                <v-chip :color="getColor(item.scoreResultText)" dark>
                  {{ item.scoreResultText }}
                </v-chip>
              </template>
            </v-data-table>
          </v-card>
        </v-dialog>
        <!-- Dialog for delete -->
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >คุณต้องการลบการมอบหมายนี้ใช่หรือไม่?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >ไม่ใช่</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >ใช่</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <!-- management -->
    <template v-slot:[`item.actions`]="{ item }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            color="primary"
            v-bind="attrs"
            v-on="on"
            small
            class="mr-2"
            @click="openReportDialog(item)"
          >
            mdi-file-chart
          </v-icon>
        </template>
        <span>รายงาน</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            color="orange"
            v-bind="attrs"
            v-on="on"
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
        </template>
        <span>แก้ไข</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            color="red"
            v-bind="attrs"
            v-on="on"
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
        <span>ลบ</span>
      </v-tooltip>
    </template>

    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize()"> โหลดข้อมูลใหม่ </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import assignmentmixin from "@/components/assignment";
import problemsmixin from "@/components/problems";
import tagsmixin from "@/components/tags";

// import insertStep2 from "@/pages/assignment/assignments/insert-step2";

export default {
  mixins: [assignmentmixin, tagsmixin, problemsmixin],
  data: () => ({
    courseData: [],
    // status: ["ใช้งาน", "ไม่ใช้งาน"],
    rowProblem: [],
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    menu2: false,
    allAssignment: [],
    dialog: false,
    dialogDelete: false,
    dialogSuccess: false,
    dialogReport: false,
    search: "",
    searchProblem: "",
    proplemHeaders: [
      {
        align: "start",
        sortable: false,
      },
      { text: "ชื่อโจทย์ปัญหา", value: "problemTitle" },
      { text: "แท็ก", value: "tags" },
      { text: "การจัดการ", value: "actions", sortable: false },
    ],
    headers: [
      {
        align: "start",
        sortable: false,
        // value: "assignmentId"
      },
      { text: "งานที่ได้รับมอบหมาย", value: "assignmentTitle" },
      { text: "คำอธิบาย", value: "assignmentDescription" },
      { text: "วันที่เริ่มส่งงาน", value: "assignmentStartDate" },
      { text: "วันที่สิ้นสุดส่งงาน", value: "assignmentEndDate" },
      { text: "สถานะ", value: "assignmentStatus" },
      { text: "การจัดการ", value: "actions", sortable: false },
    ],
    reportDialog: [
      // use to declare data and map value in header of table
      {
        align: "center",
        sortable: false,
      },
      // { text: "ข้อ", value: "problemId" }, // define column name and value
      { text: "ชื่อ-นามสกุล", value: "name" },
      {
        text: "สถานะการส่ง",
        value: "scoreResultText",
      },
      { text: "คะแนน", value: "scoreResult" },
    ],
    problem: [],
    editedIndex: -1,
    resultLast: [],
    scoreResult: {},
    userAssignment: [],
    editedItem: {
      assignmentId: 0,
      assignmentTitle: "",
      assignmentDescription: "",
      assignmentStartDate: "",
      assignmentEndDate: "",
      assignmentStatus: 0,
      assignmentCreateBy: 0,
      assignmentUpdateBy: 0,
    },
    defaultItem: {
      assignmentId: 0,
      assignmentTitle: "",
      assignmentDescription: "",
      assignmentStartDate: "",
      assignmentEndDate: "",
      assignmentStatus: 0,
      assignmentCreateBy: 0,
      assignmentUpdateBy: 0,
    },
    assignmentStatus: [
      // use in select options
      { text: "ใช้งาน", value: 1 },
      { text: "ไม่ใช้งาน", value: 2 },
    ],
    pageStep: 1,
    selectTag: [],
    selectProblem: [],
    tagItems: [],
    allProblems: [],
    assignmentTitleDialog: "",
  }),
  async mounted() {
    // console.log(this.$store.state.course);
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "เพิ่มมอบหมายงาน" : "แก้ไขมอบหมายงาน";
    },
    SuccessTitle() {
      return this.editedIndex === -1 ? "บันทึกสำเร็จ" : "แก้ไขสำเร็จ";
    },
  },

  watch: {
    selectProblem(old, val) {
      console.log("old, val", old, val);
      if (old < val) {
        console.log("delete in selectProblem");
        this.allProblems
      } else {
        this.allProblems = this.selectProblem.length
          ? this.allProblems.filter(
              (element) =>
                element.problemId !=
                this.selectProblem[this.selectProblem.length - 1].value
            )
          : this.allProblems;
      }
    },
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  async created() {
    this.initialize();
    this.getTagData();
    this.searchProblemByTag();
  },

  methods: {
    // function name: initialize
    // description: for geting data from backend using api
    // input: -
    // output: [doesGetAll]: {assingmetTitle, assingmentDescription, assingmentStartDate, assingmentEndDate ,assingmentStatus}
    // CreateBy: Atikom Wongwan / CreateDate: 19/2/2021
    // UpdateBy: Atikom Wongwan / UpdateDate: 19/2/2021

    async initialize() {
      const corseSection =
        this.$store.state.course.courseCode +
        " " +
        this.$store.state.course.courseName;
      const sectionName =
        "กลุ่มเรียนที่ " + this.$store.state.course.sectionNumber;
      this.$store.commit("breadcrumb/setBreadcrumb", [
        {
          text: "หน้าหลัก",
          href: "/home",
        },
        {
          text: corseSection,
          href: "/home/section",
        },
        {
          text: sectionName,
          href: "/assignment",
        },
      ]);
      this.courseData = this.$store.state.course;
      const { doesGetAll } = await this.getAssignment(
        this.courseData.sectionId
      );
      doesGetAll.map((doesGetAll) => {
        // doesGetAll.assignmentStartDate = this.$moment(
        //   doesGetAll.assignmentStartDate
        // ).format("Do MMM YY เวลา LT");
        // doesGetAll.assignmentEndDate = this.$moment(
        //   doesGetAll.assignmentEndDate
        // ).format("Do MMM YY เวลา LT");

        let dayStartDate = this.$moment(doesGetAll.assignmentStartDate).format(
          "Do"
        );
        let monthStartDate = this.$moment(
          doesGetAll.assignmentStartDate
        ).format("MMM");
        let yearStartDate =
          this.$moment(doesGetAll.assignmentStartDate.getFullYear).year() + 543;
        let timeStartDate = this.$moment(doesGetAll.assignmentStartDate).format(
          " เวลา LT"
        );
        doesGetAll.assignmentStartDate =
          dayStartDate +
          " " +
          monthStartDate +
          " " +
          yearStartDate +
          timeStartDate;

        let dayEndDate = this.$moment(doesGetAll.assignmentEndDate).format(
          "Do"
        );
        let monthEndDate = this.$moment(doesGetAll.assignmentEndDate).format(
          "MMM"
        );
        let yearEndDate =
          this.$moment(doesGetAll.assignmentEndDate.getFullYear).year() + 543;
        let timeEndDate = this.$moment(doesGetAll.assignmentEndDate).format(
          " เวลา LT"
        );
        doesGetAll.assignmentEndDate =
          dayEndDate + " " + monthEndDate + " " + yearEndDate + timeEndDate;

        if (doesGetAll.assignmentStatus == "active") {
          doesGetAll.assignmentStatus = "ใช้งาน";
        } else {
          doesGetAll.assignmentStatus = "ไม่ใช้งาน";
        }
      });
      this.allAssignment = doesGetAll;
    },

    async save() {
      // if  this.editedIndex > -1 == it edited assignment else this.editedIndex == -1 insert assignment
      if (this.editedIndex > -1) {
        const editResult = await this.editAssignment(this.editedItem);
        if (typeof editResult === "number") {
          this.dialog = false;
          // this.SuccessTitle = "แก้ไขสำเร็จ";
          this.dialogSuccess = true;
        }
      } else {
        this.editedItem.assignmentCreateBy = 1;
        this.editedItem.assignmentUpdateBy = this.editedItem.assignmentCreateBy;

        const [insertResult] = await this.insertAssignment(this.editedItem);

        if (typeof insertResult === "number") {
          this.close();
          // this.SuccessTitle = "บันทึกสำเร็จ";
          this.dialogSuccess = true;
        }
      }
    },
    getColor(item) {
      if (item == "ส่งแล้ว") return "green";
      else if (item == "ยังไม่ส่ง") return "red";
      else return "red";
    },

    async getTagData() {
      const { doesGetAll } = await this.getTag();
      doesGetAll.map((doesGetAll) => {
        let data = {};
        data.text = doesGetAll.tagName;
        data.value = doesGetAll.tagId;
        // doesGetAll.tagId;
        this.tagItems.push(data);
        // this.tagItems.value = doesGetAll.tagId;
      });
    },

    // async getProblemData() {
    //   const tagData = { tagId: "tagId" };
    //   let tagIdValue = [];
    //   this.selectTag.forEach((element) => {
    //     tagIdValue.push(element.value);
    //   });
    //   tagData.tagIdValue = tagIdValue;
    //   const { doesGetAll } = await this.getProblemByTag(tagData);

    //   doesGetAll.map((doesGetAll) => {
    //     doesGetAll.problemCreateDate = this.$moment(
    //       doesGetAll.problemCreateDate
    //     ).format("Do MMM YY เวลา LT");
    //     doesGetAll.problemUpdateDate = this.$moment(
    //       doesGetAll.problemUpdateDate
    //     ).format("Do MMM YY เวลา LT");
    //     if (doesGetAll.problemStatus == "active") {
    //       doesGetAll.problemStatus = "ใช้งาน";
    //     } else {
    //       doesGetAll.problemStatus = "ไม่ใช้งาน";
    //     }
    //   });
    //   this.allProblems = doesGetAll;
    //   console.log("getProblemData", doesGetAll);
    // },

    editItem(item) {
      this.editedIndex = this.allAssignment.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.allAssignment.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.allAssignment.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async searchProblemByTag() {
      const tagData = { tagId: "tagId" };
      let tagIdValue = [];
      this.selectTag.forEach((element) => {
        tagIdValue.push(element.value);
      });
      tagData.tagIdValue = tagIdValue;
      console.log(tagData);
      // if (this.selectTag != "") {
      var { doesGetAll } = await this.getProblemByTag(tagData);
      // } else {
      //   var { doesGetAll } = await this.getProblem();
      // }

      var arrayProblemId = [];
      doesGetAll.map((doesGetAll) => {
        arrayProblemId.push(doesGetAll.problemId);
        // doesGetAll.problemCreateDate = this.$moment(
        //   doesGetAll.problemCreateDate
        // ).format("Do MMM YY เวลา LT");
        // doesGetAll.problemUpdateDate = this.$moment(
        //   doesGetAll.problemUpdateDate
        // ).format("Do MMM YY เวลา LT");
        if (doesGetAll.problemStatus == "active") {
          doesGetAll.problemStatus = "ใช้งาน";
        } else {
          doesGetAll.problemStatus = "ไม่ใช้งาน";
        }
      });
      var uniq = [...new Set(arrayProblemId)];
      console.log(uniq);
      var allTagBox = new Array(uniq.length);
      var allProblemBox = new Array(uniq.length);
      // console.log("test", allTagBox[0], allTagBox[1]);
      for (var i = 0; i < allTagBox.length; i++) {
        allTagBox[i] = new Array();
        allProblemBox[i] = new Array();
      }
      for (var i = 0; i < doesGetAll.length; i++) {
        for (var j = 0; j < allTagBox.length; j++) {
          // console.log(doesGetAll[i].problemId, uniq[j]);
          if (doesGetAll[i].problemId == uniq[j]) {
            var tagsItem = {};
            tagsItem.tagId = doesGetAll[i].tagId;
            tagsItem.tagName = doesGetAll[i].tagName;
            allTagBox[j].push(tagsItem);
            var problemItem = {};
            problemItem.problemId = doesGetAll[i].problemId;
            problemItem.problemTitle = doesGetAll[i].problemTitle;
            // problemItem.tags = allTagBox;
            allProblemBox[j] = problemItem;
          }
          problemItem.tags = allTagBox[j];
        }
      }

      // for(var i = 0 ;i < allProblemBox.length;i++){

      // }

      console.log("tagBox", allTagBox);
      console.log("problemBox", allProblemBox);
      console.log("searchProblemByTag", doesGetAll);
      console.log("searchProblemByTag", this.allProblems);

      this.allProblems = allProblemBox;
    },

    async addProblem(item) {
      let data = {};
      data.text = item.problemTitle;
      data.value = item.problemId;
      // doesGetAll.tagId;
      this.selectProblem.push(data);
    },

    async openReportDialog(item) {
      this.resultLast = [];
      let check = true;
      this.assignmentTitleDialog = item.assignmentTitle;
      console.log(item);
      const result = this.getUserAssignment(item.assignmentId);
      console.log(result);
      this.userAssignment = await result.then((res) => {
        return res.doesGetAll;
      });
      console.log(this.userAssignment);
      this.userAssignment.forEach((element) => {
        if (element.taskId == null) {
          console.log(element);
          check = false;
        }
      });
      if (check == true) {
        const dataScoreResult2 = this.userAssignment.map(async (res) => {
          const data = {
            taskAssignmentId: res.assignmentId,
            compilelogCreateBy: res.enrollUserId,
            taskId: res.taskId,
          };
          console.log(data);
          const dataScore = this.getScoreUser(data);
          const dataScoreResult = await dataScore.then((resScore) => {
            return resScore.doesGetAll;
          });
          console.log(dataScoreResult);

          return dataScoreResult;
        });
        console.log(dataScoreResult2);

        console.log("1");
        this.scoreResult = await Promise.all(dataScoreResult2).then((value) => {
          return value;
        });
        console.log(this.scoreResult);
        console.log(this.userAssignment);
        // if(this.scoreResult)
        let k = 0;
        this.userAssignment.map((res) => {
          res.score = this.scoreResult[k];
          k++;
        });
        console.log(this.userAssignment);

        this.userAssignment.map((res) => {
          if (res.score.length == 0) {
            res.score[0] = {
              compilelogTestResult: "fail",
              compilelogScore: 0,
            };
          }
        });
        console.log(this.userAssignment);
        let dataSuccess = [];
        let score = 0;
        let j = 0;
        for (let i = 0; i < this.userAssignment.length; i++) {
          if (i != this.userAssignment.length - 1) {
            if (
              this.userAssignment[i].enrollUserId ==
              this.userAssignment[i + 1].enrollUserId
            ) {
              score += this.userAssignment[i].score[0].compilelogScore;
            } else {
              score += this.userAssignment[i].score[0].compilelogScore;
              dataSuccess[j] = {
                name:
                  this.userAssignment[i].userPrefixThai +
                  " " +
                  this.userAssignment[i].userFirstNameThai +
                  " " +
                  this.userAssignment[i].userLastnameThai,
                scoreResult: score,
              };
              j++;
              score = 0;
            }
          } else {
            if (
              this.userAssignment[i].enrollUserId ==
              this.userAssignment[i - 1].enrollUserId
            ) {
              score += this.userAssignment[i].score[0].compilelogScore;
              dataSuccess[j] = {
                name:
                  this.userAssignment[i].userPrefixThai +
                  " " +
                  this.userAssignment[i].userFirstNameThai +
                  " " +
                  this.userAssignment[i].userLastnameThai,
                scoreResult: score,
              };
            }
          }
        }

        const maxScore = this.getScoreMax(item.assignmentId);
        console.log(maxScore);
        const maxScoreResult = await maxScore.then((res) => {
          return res.doesGetAll;
        });
        dataSuccess.map((res) => {
          if (res.scoreResult == maxScoreResult[0].sumTaskScore) {
            res.scoreResultText = "ส่งแล้ว";
          } else {
            res.scoreResultText = "ยังไม่ส่ง";
          }
          res.scoreResult =
            res.scoreResult + "/" + maxScoreResult[0].sumTaskScore;
        });
        console.log(dataSuccess);
        this.resultLast = dataSuccess;
      }

      // this.resultLast.dataScoreResult.then(res => {
      //   console.log(res);
      // });
      // console.log(this.resultLast);
      this.dialogReport = true;
    },
  },
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
