<!-- CreateBy: Atikom Wongwan
Last edit: 19/2/2021 -->

<template>
  <v-data-table
    :headers="headers"
    :footer-props="{
      'items-per-page-options': [8, 15, 20, -1],
      'items-per-page-text': `จำนวนแถวต่อหน้า`,
      'items-per-page-all-text': `ทั้งหมด`
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

        <v-dialog v-model="dialog" max-width="1000px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="success" dark class="mb-2" v-bind="attrs" v-on="on">
              เพิ่มมอบหมายงาน
            </v-btn>
          </template>
          <v-stepper v-model="pageStep">
            <v-stepper-header>
              <v-stepper-step :complete="pageStep > 1" step="1">
                เพิ่มการมอบหมายงาน
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step :complete="pageStep > 2" step="2">
                เพิ่มโจทย์ปัญหา
              </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card class="kanit-font">
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
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

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text>
                      ยกเลิก
                    </v-btn>
                    <v-btn color="primary" @click="pageStep = 2">
                      ถัดไป
                    </v-btn>

                    <!-- <v-btn color="blue darken-1" text @click="close"> ยกเลิก </v-btn>
              <v-btn color="blue darken-1" text @click="save"> บันทึก </v-btn> -->
                  </v-card-actions>
                </v-card>
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-card class="mb-12" width="1000px" height="500px">
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
                      <v-btn elevation="2" class="mt-3 ml-4">
                        ค้นหา
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-card>
                    <v-card-title>
                      <v-text-field
                        v-model="searchProblem"
                        append-icon="mdi-magnify"
                        label="ค้นหา"
                        hide-details
                      ></v-text-field>
                    </v-card-title>
                    <v-data-table
                      :headers="proplemHeaders"
                      :items="allProblems"
                      :search="searchProblem"
                    >
                      <template v-slot:[`item.actions`]="{ item }">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon
                              color="primary"
                              v-bind="attrs"
                              v-on="on"
                              small
                              class="mr-2"
                              @click="openDialog(item)"
                            >
                              mdi-information
                            </v-icon>
                          </template>
                          <span>เพิ่มเติม</span>
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
                    </v-data-table>
                  </v-card>
                </v-card>
                <!-- <insertStep1 /> -->
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1">
                    ยกเลิก
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="pageStep = 1">
                    บันทึก
                  </v-btn>
                </v-card-actions>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>

          <!-- Dialog for delete -->
        </v-dialog>
        <v-dialog v-model="dialogReport" max-width="1100px">
          <v-card>
            <v-card-title>
              <span class="headline">Report</span>
            </v-card-title>
            <v-data-table
              :headers="reportDialog"
              :items="resultLast"
              :items-per-page="5"
              class="elevation-1"
            >
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
        <!--
        <v-dialog v-model="dialogSuccess" max-width="500px">
          <v-card>
            <v-card-title class="kanit-font text-center">
              {{ SuccessTitle }}
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1 kanit-font"
                text
                @click="closeSuccess"
              >
                ตกลง
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog> -->
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
        <span>Report</span>
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
      <v-btn color="primary" @click="initialize"> โหลดข้อมูลใหม่ </v-btn>
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
  components: {
    // insertStep2
  },
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
        sortable: false
      },
      { text: "ชื่อโจทย์ปัญหา", value: "problemTitle" },
      { text: "วันที่สร้าง", value: "problemCreateDate" },
      { text: "สถานะ", value: "problemStatus" },
      { text: "การจัดการ", value: "actions", sortable: false }
    ],
    headers: [
      {
        align: "start",
        sortable: false
        // value: "assignmentId"
      },
      { text: "งานที่ได้รับมอบหมาย", value: "assignmentTitle" },
      { text: "คำอธิบาย", value: "assignmentDescription" },
      { text: "วันที่เริ่มส่งงาน", value: "assignmentStartDate" },
      { text: "วันที่สิ้นสุดส่งงาน", value: "assignmentEndDate" },
      { text: "สถานะ", value: "assignmentStatus" },
      { text: "การจัดการ", value: "actions", sortable: false }
    ],
    reportDialog: [
      // use to declare data and map value in header of table
      {
        align: "center",
        sortable: false
      },
      // { text: "ข้อ", value: "problemId" }, // define column name and value
      { text: "ชื่อ-นามสกุล", value: "name" },
      {
        text: "สถานะการส่ง",
        value: "scoreResultText"
      },
      { text: "คะแนน", value: "scoreResult" }
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
      assignmentUpdateBy: 0
    },
    defaultItem: {
      assignmentId: 0,
      assignmentTitle: "",
      assignmentDescription: "",
      assignmentStartDate: "",
      assignmentEndDate: "",
      assignmentStatus: 0,
      assignmentCreateBy: 0,
      assignmentUpdateBy: 0
    },
    assignmentStatus: [
      // use in select options
      { text: "ใช้งาน", value: 1 },
      { text: "ไม่ใช้งาน", value: 2 }
    ],
    pageStep: 1,
    selectTag: [],
    tagItems: [],
    allProblems: []
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
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },

  async created() {
    this.initialize();
    this.getTagData();
    this.getProblemData();
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
          href: "/home"
        },
        {
          text: corseSection,
          href: "/home/section"
        },
        {
          text: sectionName,
          href: "/assignment"
        }
      ]);
      this.courseData = this.$store.state.course;
      const { doesGetAll } = await this.getAssignment(
        this.courseData.sectionId
      );
      doesGetAll.map(doesGetAll => {
        doesGetAll.assignmentStartDate = this.$moment(
          doesGetAll.assignmentStartDate
        ).format("Do MMM YY เวลา LT");
        doesGetAll.assignmentEndDate = this.$moment(
          doesGetAll.assignmentEndDate
        ).format("Do MMM YY เวลา LT");
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

    async getTagData() {
      const { doesGetAll } = await this.getTag();
      doesGetAll.map(doesGetAll => {
        let data = {};
        data.text = doesGetAll.tagName;
        data.value = doesGetAll.tagId;
        // doesGetAll.tagId;
        this.tagItems.push(data);
        // this.tagItems.value = doesGetAll.tagId;
      });
    },

    async getProblemData() {
      const { doesGetAll } = await this.getProblem();

      doesGetAll.map(doesGetAll => {
        doesGetAll.problemCreateDate = this.$moment(
          doesGetAll.problemCreateDate
        ).format("Do MMM YY เวลา LT");
        doesGetAll.problemUpdateDate = this.$moment(
          doesGetAll.problemUpdateDate
        ).format("Do MMM YY เวลา LT");
        if (doesGetAll.problemStatus == "active") {
          doesGetAll.problemStatus = "ใช้งาน";
        } else {
          doesGetAll.problemStatus = "ไม่ใช้งาน";
        }
      });
      this.allProblems = doesGetAll;
      console.log(doesGetAll);
    },

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

    // save() {
    //   if (this.editedIndex > -1) {
    //     //Save for edit
    //     Object.assign(this.allAssignment[this.editedIndex], this.editedItem);
    //   } else {
    //     //Save for add
    //     console.log(this.editedItem);
    //     this.allAssignment.push(this.editedItem);
    //   }
    //   this.close();
    // },
    async openReportDialog(item) {
      console.log(item);
      const result = this.getUserAssignment(item.assignmentId);
      console.log(result);
      this.userAssignment = await result.then(res => {
        return res.doesGetAll;
      });
      console.log(this.userAssignment);
      const dataScoreResult2 = this.userAssignment.map(async res => {
        const data = {
          taskAssignmentId: res.assignmentId,
          compilelogCreateBy: res.enrollUserId,
          taskId: res.taskId
        };
        console.log(data);
        const dataScore = this.getScoreUser(data);
        const dataScoreResult = await dataScore.then(resScore => {
          return resScore.doesGetAll;
        });
        console.log(dataScoreResult);

        return dataScoreResult;
      });
      console.log(dataScoreResult2);

      this.scoreResult = await Promise.all(dataScoreResult2).then(value => {
        return value;
      });

      console.log(this.scoreResult);
      console.log(this.userAssignment);
      let k = 0;
      this.userAssignment.map(res => {
        res.score = this.scoreResult[k];
        k++;
      });
      console.log(this.userAssignment);

      this.userAssignment.map(res => {
        if (res.score.length == 0) {
          res.score[0] = {
            compilelogTestResult: "fail",
            compilelogScore: 0
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
              scoreResult: score
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
              scoreResult: score
            };
          }
        }
      }

      const maxScore = this.getScoreMax(item.assignmentId);
      console.log(maxScore);
      const maxScoreResult = await maxScore.then(res => {
        return res.doesGetAll;
      });
      console.log(maxScoreResult);
      console.log(dataSuccess);
      dataSuccess.map(res => {
        if (res.scoreResult == maxScoreResult[0].sumTaskScore) {
          res.scoreResultText = "Completed";
        } else {
          res.scoreResultText = "Not completed";
        }
        res.scoreResult =
          res.scoreResult + "/" + maxScoreResult[0].sumTaskScore;
      });
      console.log(dataSuccess);
      this.resultLast = dataSuccess;
      // this.resultLast.dataScoreResult.then(res => {
      //   console.log(res);
      // });
      // console.log(this.resultLast);
      this.dialogReport = true;
    }
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
