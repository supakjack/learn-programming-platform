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
    :sort-by="['assignmentStatus', 'assignmentCreateDate']"
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
            ></v-data-table>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-btn small class="mr-2" @click="openDialog(item)">
        เพิ่มเติม
      </v-btn>
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
      { text: "สถานะการส่งงาน", value: "" },
      { text: "คะแนน", value: "sumCompilelogScore" },
      { text: "ดำเนินการ", value: "actions", sortable: false }
    ],

    //datas for show on dialog when click "more"
    headersDialog: [
      // use to declare data and map value in header of table
      {
        align: "center",
        sortable: false
      },
      { text: "ข้อ", value: "problemId" }, // define column name and value
      { text: "ชื่อ", value: "problemTitle" },
      { text: "คำอธิบาย", value: "problemDiscription" },
      { text: "แท็ก", value: "tagName" },
      { text: "จำนวนที่ส่ง", value: "" },
      { text: "สถานะการส่งงาน", value: "" },
      { text: "คะแนน", value: "taskScore" }
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
      const { doesGetAll } = await this.getHomework();
      doesGetAll.map(doesGetAll => {
        doesGetAll.assignmentCreateDate = this.$moment(
          doesGetAll.assignmentCreateDate
        ).format("Do MMM YY เวลา LT");
        doesGetAll.assignmentUpdateDate = this.$moment(
          doesGetAll.assignmentUpdateDate
        ).format("Do MMM YY เวลา LT");
        if (doesGetAll.assignmentStatus == "active") {
          doesGetAll.assignmentStatus = "ใช้งาน";
        } else {
          doesGetAll.assignmentStatus = "ไม่ใช้งาน";
        }
        if (doesGetAll.sumCompilelogScore == null) {
          doesGetAll.sumCompilelogScore = 0;
        }
        doesGetAll.sumCompilelogScore =
          doesGetAll.sumCompilelogScore + "/" + doesGetAll.sumTaskScore;
      });
      this.allHomeworks = doesGetAll;
    },

    async openDialog(item) {
      const { doesGetProblem } = await this.getProblem(item.assignmentId);
      this.rowProblem = doesGetProblem;
      console.log({ doesGetProblem });
      this.dialogDetail = true;
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
