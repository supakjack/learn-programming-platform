<template>
  <v-card-text class="kanit-font">
    <v-container>
      <v-row>
        <v-col cols="12" sm="12" md="6">
          <!-- <v-text-field
                            v-model="editedItem.problemTitle"
                            label="ชื่อโจทย์ปัญหา"
                          ></v-text-field> -->
          <v-text-field label="ชื่อโจทย์ปัญหา"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <!-- <v-textarea
                            v-model="editedItem.problemDiscription"
                            label="คำอธิบาย"
                          ></v-textarea> -->
          <v-textarea label="คำอธิบาย"></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" sm="6" md="6">
          <!-- <v-text-field
                            v-model="editedItem.taskScore"
                            label="กำหนดคะแนน"
                          ></v-text-field> -->
          <v-text-field label="กำหนดคะแนน"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <!-- <v-select
            v-model="editedItem.problemStatus"
            :items="problemStatus"
            menu-props="auto"
            label="สถานะ"
            hide-details
            single-line
          ></v-select> -->
          <v-select
            menu-props="auto"
            label="สถานะ"
            hide-details
            single-line
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" sm="6" md="6">
          แท็ก
          <v-btn class="ma-2">เพิ่มแท็ก</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" sm="6" md="6">
          ภาพประกอบโจทย์
          <v-btn
            :loading="loading3"
            :disabled="loading3"
            color="blue-grey"
            class="ma-2 white--text"
            @click="loader = 'loading3'"
          >
            Upload
            <v-icon right dark>
              mdi-cloud-upload
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card-text>
</template>

<script>
import problemsmixin from "../../../components/problems";
import insertStep1 from "@/pages/problem-tag/problems/insert-step1";
import insertStep2 from "@/pages/problem-tag/problems/insert-step2";

export default {
  mixins: [problemsmixin],
  components: {},
  data: () => ({
    allProblems: [],
    dialog: false,
    dialogDelete: false,
    search: "",
    headers: [
      {
        align: "start",
        sortable: false
        // value: "problemId"
      },
      { text: "ข้อ", value: "problemId" },
      { text: "ชื่อโจทย์ปัญหา", value: "problemTitle" },
      { text: "วันที่สร้าง", value: "problemCreateDate" },
      { text: "คะแนน", value: "taskScore" },
      { text: "สถานะ", value: "problemStatus" },
      { text: "ดำเนินการ", value: "actions", sortable: false }
    ],
    editedIndex: -1, //  editedIndex default to -1
    editedItem: {
      // use to add, edit and delete item
      problemId: 0,
      problemTitle: "",
      problemDiscription: "",
      // problemPath: "",
      problemStatus: 0,
      problemCreateBy: 0,
      problemUpdateBy: 0,
      problemCreateDate: 0,
      taskScore: 0
    },
    defaultItem: {
      // default of item value
      problemId: 0,
      problemTitle: "",
      problemDiscription: "",
      // problemPath: "",
      problemStatus: 0,
      problemCreateBy: 0,
      problemUpdateBy: 0,
      problemCreateDate: 0,
      taskScore: 0
    },
    problemStatus: [
      // use in select options
      { text: "ใช้งาน", value: 1 },
      { text: "ไม่ใช้งาน", value: 2 }
    ]
  }),

  computed: {},

  watch: {},

  methods: {
    async save() {
      if (this.editedIndex > -1) {
        const EditResult = await this.editProblem(this.editedItem);
        if (typeof EditResult === "number") {
          this.dialog = false;
          this.dialogInsert = true;
        }
      } else {
        this.editedItem.problemCreateBy = 1;
        this.editedItem.problemUpdateBy = this.editedItem.problemCreateBy;

        const [insertResult] = await this.insertProblem(this.editedItem);

        if (typeof insertResult === "number") {
          this.close();
          this.dialogInsert = true;
        }
      }
    }
  }
};
</script>
