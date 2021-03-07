<template>
  <v-data-table
    :headers="headers"
    :footer-props="{
      'items-per-page-options': [8, 15, 20, -1],
      'items-per-page-text': `จำนวนแถวต่อหน้า`,
      'items-per-page-all-text': `ทั้งหมด`
    }"
    :items="allHomeworks"
    :items-per-page="8"
    item-key="assignmentId"
    :sort-desc="[false, true]"
    multi-sort
    :search="search"
    height="450"
    class="elevation-1 kanit-font"
  >
    <template v-slot:top>
      <v-toolbar flat class="kanit-font">
        <v-toolbar-title>ตารางงาน</v-toolbar-title>
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
        <v-dialog v-model="dialogDetail" max-width="1100px">
          <v-card>
            <v-data-table
              :headers="headersDialog"
              :items="rowProblem"
              :items-per-page="5"
              class="elevation-1"
            >
              <template v-slot:[`item.actionsDialog`]="{ item }">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <router-link to="/student/submit">
                      <v-icon
                        color="green"
                        medium
                        v-bind="attrs"
                        v-on="on"
                        class="mr-2"
                        @click="openIde(item)"
                      >
                        mdi-plus
                      </v-icon>
                    </router-link>
                  </template>
                  <span>ทำโจทย์</span>
                </v-tooltip>
              </template>
            </v-data-table>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            color="primary"
            v-bind="attrs"
            v-on="on"
            class="mr-2"
            @click="openDialog(item)"
          >
            mdi-information
          </v-icon>
        </template>
        <span>เพิ่มเติม</span>
      </v-tooltip>
    </template>

    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">
        โหลดข้อมูลใหม่
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
import homeworkmixin from "@/components/homework";

export default {
  mixins: [homeworkmixin],
  // declare variable and data in this component
  data: () => ({
    formTitle: "ข้อมูลการบ้าน",
    SuccessTitle: "",
    allHomeworks: [],
    rowProblem: [],
    scoreLastResult: [],
    dialogDetail: false,
    search: "", // use for search in table all column
    headers: [
      // use to declare data and map value in header of table
      {
        align: "center",
        sortable: false
      },
      { text: "ชื่อบท", value: "assignmentTitle" }, // define column name and value
      { text: "สถานะการใช้งาน", value: "assignmentStatus" },
      { text: "สถานะการส่งงาน", value: "scoreResult" },
      { text: "คะแนน", value: "showScore" },
      { align: "center", text: "ดำเนินการ", value: "actions", sortable: false }
    ],

    //datas for show on dialog when click "more"
    headersDialog: [
      // use to declare data and map value in header of table
      {
        align: "center",
        sortable: false
      },
      // { text: "ข้อ", value: "problemId" }, // define column name and value
      { text: "ชื่อ", value: "problemTitle" },
      { text: "คำอธิบาย", value: "problemDescription" },
      { text: "จำนวนที่ส่ง", value: "compilelogSubmitNo" },
      { text: "สถานะการส่งงาน", value: "compilelogTestResult" },
      { text: "คะแนน", value: "taskScore" },
      {
        align: "center",
        text: "ดำเนินการ",
        value: "actionsDialog"
      }
    ],
    editedIndex: -1, //  editedIndex default to -1

    defaultItem: {
      // default of item value
      assignmentTitle: "",
      assignmentStatus: 0,
      // assignmentStatus: 0,
      taskScore: 0
    },
    assignmentStatus: [
      // use in select options
      { text: "ใช้งาน", value: 1 },
      { text: "ไม่ใช้งาน", value: 2 }
    ]
  }),

  computed: {},

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  // when created call initialize to geting all tag data
  async created() {
    this.initialize();
  },

  methods: {
    // function name: initialize
    // description: for geting data from backend using api
    // input: -
    // output: [doesGetAll]: {assignmentTitle, assignmentStatus, , taskScore}
    // CreateBy: Yotsapat Phurahong / CreateDate: 18/2/2021
    // UpdateBy:

    async initialize() {
      console.log(this.$store.state.user.id);
      console.log(this.$store.state.user.username);
      const result = await this.getAssignmentUser(this.$store.state.user.id);
      console.log(result);

      const scoreResult = await result.doesGetAll.map(async res => {
        const data = {
          taskAssignmentId: res.assignmentId,
          compilelogCreateBy: res.enrollUserId,
          taskId: res.taskId
        };
        const score = await this.getAssignmentScore(data);
        if (score.doesGetAll.length == 0) {
          const mockData = {
            compilelogScore: 0,
            taskAssignmentId: res.assignmentId
          };
          return mockData;
        }
        console.log(score);
        return score.doesGetAll[0];
      });

      this.scoreLastResult = await Promise.all(scoreResult).then(value => {
        return value;
      });
      console.log(this.scoreLastResult);

      let dataSuccess = [];
      let score = 0;
      let j = 0;
      for (let i = 0; i < result.doesGetAll.length; i++) {
        if (i != result.doesGetAll.length - 1) {
          if (
            result.doesGetAll[i].assignmentId ==
            result.doesGetAll[i + 1].assignmentId
          ) {
            score += result.doesGetAll[i].taskScore;
          } else {
            score += result.doesGetAll[i].taskScore;
            dataSuccess[j] = {
              assignmentTitle: result.doesGetAll[i].assignmentTitle,
              assignmentId: result.doesGetAll[i].assignmentId,
              assignmentStatus: result.doesGetAll[i].assignmentStatus,
              sumScore: score
            };
            j++;
            score = 0;
          }
        } else {
          if (
            result.doesGetAll[i].assignmentId ==
            result.doesGetAll[i - 1].assignmentId
          ) {
            score += result.doesGetAll[i].taskScore;
            dataSuccess[j] = {
              assignmentTitle: result.doesGetAll[i].assignmentTitle,
              assignmentId: result.doesGetAll[i].assignmentId,
              assignmentStatus: result.doesGetAll[i].assignmentStatus,
              sumScore: score
            };
          }
        }
      }
      console.log(dataSuccess);

      let dataScore = [];
      let score2 = 0;
      let k = 0;
      for (let i = 0; i < this.scoreLastResult.length; i++) {
        if (i != this.scoreLastResult.length - 1) {
          if (
            this.scoreLastResult[i].taskAssignmentId ==
            this.scoreLastResult[i + 1].taskAssignmentId
          ) {
            score2 += this.scoreLastResult[i].compilelogScore;
          } else {
            score2 += this.scoreLastResult[i].compilelogScore;
            dataScore[k] = {
              taskAssignmentId: this.scoreLastResult[i].taskAssignmentId,
              sumScore: score2
            };
            k++;
            score2 = 0;
          }
        } else {
          if (
            this.scoreLastResult[i].taskAssignmentId ==
            this.scoreLastResult[i - 1].taskAssignmentId
          ) {
            score2 += this.scoreLastResult[i].compilelogScore;
            dataScore[k] = {
              taskAssignmentId: this.scoreLastResult[i].taskAssignmentId,
              sumScore: score2
            };
          }
        }
      }
      console.log(dataScore);

      for (let i = 0; i < dataSuccess.length; i++) {
        for (let j = 0; j < dataScore.length; j++) {
          if (dataSuccess[i].assignmentId == dataScore[j].taskAssignmentId) {
            dataSuccess[i].showScore =
              dataScore[j].sumScore + "/" + dataSuccess[i].sumScore;
            dataSuccess[i].score = dataScore[j].sumScore;

            if (dataSuccess[i].score == 0) {
              dataSuccess[i].scoreResult = "ยังไม่ส่ง";
            } else if (dataSuccess[i].score < dataSuccess[i].sumScore) {
              dataSuccess[i].scoreResult = "ยังไม่เสร็จ";
            } else if (dataSuccess[i].score == dataSuccess[i].sumScore) {
              dataSuccess[i].scoreResult = "ส่งแล้ว";
            }

            if (dataSuccess[i].assignmentStatus == "active") {
              dataSuccess[i].assignmentStatus = "ใช้งาน";
            } else {
              dataSuccess[i].assignmentStatus = "ไม่ใช้งาน";
            }
          }
        }
      }

      console.log(dataSuccess);
      // result.doesGetAll.then(res => {
      //   console.log(res);
      // });
      // const { doesGetAll } = await this.getHomework();
      // doesGetAll.map(doesGetAll => {
      //   doesGetAll.assignmentCreateDate = this.$moment(
      //     doesGetAll.assignmentCreateDate
      //   ).format("Do MMM YY เวลา LT");
      //   doesGetAll.assignmentUpdateDate = this.$moment(
      //     doesGetAll.assignmentUpdateDate
      //   ).format("Do MMM YY เวลา LT");
      //   if (doesGetAll.assignmentStatus == "active") {
      //     doesGetAll.assignmentStatus = "ใช้งาน";
      //   } else {
      //     doesGetAll.assignmentStatus = "ไม่ใช้งาน";
      //   }
      //   if (doesGetAll.sumCompilelogScore == null) {
      //     doesGetAll.sumCompilelogScore = 0;
      //   }
      //   if (doesGetAll.sumCompilelogScore == doesGetAll.sumTaskScore) {
      //     doesGetAll.result = "ส่งแล้ว";
      //   } else if (
      //     doesGetAll.sumCompilelogScore > 0 &&
      //     doesGetAll.sumCompilelogScore < doesGetAll.sumTaskScore
      //   ) {
      //     doesGetAll.result = "ยังไม่เสร็จ";
      //   } else if (doesGetAll.sumCompilelogScore == 0) {
      //     doesGetAll.result = "ยังไม่ส่ง";
      //   }
      //   doesGetAll.sumCompilelogScore =
      //     doesGetAll.sumCompilelogScore + "/" + doesGetAll.sumTaskScore;
      // });
      this.allHomeworks = dataSuccess;
    },

    async openDialog(item) {
      console.log(item);
      const { doesGetProblem } = await this.getProblem(item.assignmentId);
      console.log(doesGetProblem);
      const scoreResult = await doesGetProblem.map(async res => {
        const data = {
          taskAssignmentId: item.assignmentId,
          compilelogCreateBy: this.$store.state.user.id,
          taskId: res.taskId
        };
        const score = await this.getAssignmentScore(data);
        if (score.doesGetAll.length == 0) {
          const mockData = {
            compilelogScore: 0,
            compilelogSubmitNo: 0,
            compilelogTestResult: null,
            taskAssignmentId: item.assignmentId,
            taskId: res.taskId
          };
          return mockData;
        }
        return score.doesGetAll[0];
      });
      console.log(scoreResult);
      const scoreLastResult = await Promise.all(scoreResult).then(value => {
        return value;
      });
      console.log(scoreLastResult);
      for (let i = 0; i < doesGetProblem.length; i++) {
        for (let j = 0; j < scoreLastResult.length; j++) {
          if (doesGetProblem[i].taskId == scoreLastResult[i].taskId) {
            doesGetProblem[i].compilelogScore =
              scoreLastResult[i].compilelogScore;
            doesGetProblem[i].compilelogSubmitNo =
              scoreLastResult[i].compilelogSubmitNo;
            doesGetProblem[i].compilelogTestResult =
              scoreLastResult[i].compilelogTestResult;
          }
        }
      }
      console.log(doesGetProblem);
      doesGetProblem.map(doesGetProblem => {
        if (doesGetProblem.compilelogTestResult == "Accepted") {
          doesGetProblem.compilelogTestResult = "ผ่าน";
        } else if (doesGetProblem.compilelogTestResult == null) {
          doesGetProblem.compilelogTestResult = "ยังไม่ส่ง";
        } else {
          doesGetProblem.compilelogTestResult = "ไม่ผ่าน";
        }
        doesGetProblem.taskScore =
          doesGetProblem.compilelogScore + "/" + doesGetProblem.taskScore;
      });
      this.rowProblem = doesGetProblem;
      this.dialogDetail = true;
    },
    async openIde(item) {
      console.log(item);
      await this.$store.commit("homework/setHomework", {
        homework: {
          problemId: item.problemId,
          taskId: item.taskId,
          problemTitle: item.problemTitle,
          problemDescription: item.problemDescription
        }
      });
      console.log(this.$store.state.homework.problemId);
      console.log(this.$store.state.homework.taskId);
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
