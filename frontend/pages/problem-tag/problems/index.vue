<template>
  <v-data-table
    :headers="headers"
    :items="allProblems"
    :items-per-page="5"
    sort-by="problemStatus"
    :search="search"
    class="elevation-1 kanit-font"
  >
    <template v-slot:top>
      <v-toolbar flat class="kanit-font">
        <v-toolbar-title>ตารางโจทย์ปัญหา</v-toolbar-title>
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
              สร้างโจทย์ปัญหา
            </v-btn>
          </template>

          <v-card class="kanit-font">
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-stepper non-linear>
              <v-stepper-header>
                <v-stepper-step editable step="1">
                  step 1
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step editable step="2">
                  step 2
                </v-stepper-step>
              </v-stepper-header>

              <v-stepper-items>
                <v-stepper-content step="1">
                  <div>
                    <insertStep1 :watchArray="watchArray" />
                  </div>
                </v-stepper-content>

                <v-stepper-content step="2">
                  <insertStep2 :watchArray="watchArray" />
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                ยกเลิก
              </v-btn>
              <v-btn color="blue darken-1" text @click="save">
                บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-center">
              ต้องการลบโจทย์ปัญหานี้ใช่หรือไม่?
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">
                ไม่
              </v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">
                ใช่
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>

    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">
        โหลดข้อมูลใหม่
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import problemsmixin from "../../../components/problems";
import insertStep1 from "@/pages/problem-tag/problems/insert-step1";
import insertStep2 from "@/pages/problem-tag/problems/insert-step2";

export default {
  mixins: [problemsmixin],
  components: {
    insertStep1,
    insertStep2
  },
  data: () => ({
    editProblemId: null,
    watchArray: [],
    input: "",
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
      { text: "ชื่อโจทย์ปัญหา", value: "problemTitle" },
      { text: "วันที่สร้าง", value: "problemCreateDate" },
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

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "สร้างโจทย์ปัญหา" : "แก้ไขโจทย์ปัญหา";
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
  },

  methods: {
    async initialize() {
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
    },

    // add and save problem-data to database
    async save() {
      const userId = this.$store.state.user.id;
      if (this.editProblemId == null) {
        console.log(this.$store.state.problem.status);
        let createHashtagData = [];
        for (let i = 0; i < this.$store.state.problem.tags.length; i++) {
          const dataHashtag = {
            hashtagTagId: this.$store.state.problem.tags[i],
            hashtagProblemId: null,
            hashtagCreateBy: userId,
            hashtagUpdateBy: userId
          };
          createHashtagData.push(dataHashtag);
        }

        const createTestsetData = this.$store.state.problem.testset.map(
          item => {
            return {
              testsetTitle: item.testsetTitle,
              testsetDescription: item.testsetDescription,
              testsetInput: item.testsetInput,
              testsetOutput: item.testsetOutput,
              testsetProblemId: null,
              testsetIsExample: item.testsetIsExample,
              testsetCreateBy: userId,
              testsetUpdateBy: userId
            };
          }
        );

        const request = {
          createHashtagData,
          createTestsetData,
          createProblemData: {
            problemTitle: this.$store.state.problem.title,
            problemDiscription: this.$store.state.problem.description,
            problemStatus: this.$store.state.problem.status,
            problemCreateBy: userId,
            problemUpdateBy: userId
          },
          createFilesData: {
            filePath: "0",
            fileCreateBy: userId,
            fileUpdateBy: userId
          },
          createPicturesData: {
            pictureFileId: null,
            pictureProblemId: null,
            pictureCreateBy: userId,
            pictureUpdateBy: userId
          }
        };

        const insertResult = await this.insertProblem(request);
      } else {
        console.log(this.$store.state.problem);
        let updateHashtagData = [];
        for (let i = 0; i < this.$store.state.problem.tags.length; i++) {
          const dataHashtag = {
            hashtagTagId: this.$store.state.problem.tags[i],
            hashtagProblemId: this.editProblemId,
            hashtagCreateBy: userId,
            hashtagUpdateBy: userId
          };
          updateHashtagData.push(dataHashtag);
        }
        const updateTestsetData = this.$store.state.problem.testset.map(
          item => {
            return {
              testsetTitle: item.testsetTitle,
              testsetDescription: item.testsetDescription,
              testsetInput: item.testsetInput,
              testsetOutput: item.testsetOutput,
              testsetProblemId: this.editProblemId,
              testsetIsExample: item.testsetIsExample,
              testsetCreateBy: userId,
              testsetUpdateBy: userId
            };
          }
        );

        const request = {
          problemId: this.editProblemId,
          updateHashtagData,
          updateTestsetData,
          updateProblemData: {
            problemTitle: this.$store.state.problem.title,
            problemDiscription: this.$store.state.problem.description,
            problemStatus: this.$store.state.problem.status,
            problemUpdateBy: userId,
            problemUpdateDate: this.$moment().format("YYYY-MM-DD HH:mm:ss")
          },
          updateFilesData: {
            filePath: "0",
            fileCreateBy: userId,
            fileUpdateBy: userId
          },
          updatePicturesData: {
            pictureFileId: null,
            pictureProblemId: this.editProblemId,
            pictureCreateBy: userId,
            pictureUpdateBy: userId
          }
        };
        const updateResult = await this.updateProblem(request);
      }
      this.dialog = false;
    },

    //edit problem-data by problemId
    async editItem(item) {
      const hashtag = this.editHashtag(item.problemId);
      const testset = this.editTestset(item.problemId);

      const hashtagResult = await hashtag.then(res => {
        return res;
      });
      const testsetResult = await testset.then(res => {
        return res;
      });

      const arrayHashtag = hashtagResult.map(res => {
        return res.hashtagTagId;
      });

      let arrayTestset = [];
      testsetResult.map(res => {
        const data = {
          testsetTitle: res.testsetTitle,
          testsetDescription: res.testsetDescription,
          testsetInput: res.testsetInput,
          testsetOutput: res.testsetOutput,
          testsetIsExample: res.testsetIsExample
        };
        arrayTestset.push(data);
      });

      this.$store.commit("problem/setProblem", {
        problem: {
          id: item.problemId,
          title: item.problemTitle,
          description: item.problemDiscription,
          status: item.problemStatus,
          tags: arrayHashtag,
          testset: arrayTestset
        }
      });
      let status = 1;
      if (this.$store.state.problem.status == "ไม่ใช้งาน") {
        status = 2;
      }
      this.watchArray = [
        { name: "id", val: this.$store.state.problem.id },
        { name: "title", val: this.$store.state.problem.title },
        { name: "description", val: this.$store.state.problem.title },
        { name: "status", val: status },
        { name: "tags", val: this.$store.state.problem.tags },
        { name: "testset", val: this.$store.state.problem.testset }
      ];
      this.editProblemId = item.problemId;
      this.dialog = true;

      console.log(this.$store.state.problem.tags);
      console.log(this.watchArray);
    },

    // change status problem-data from enable or disable to delete
    deleteItem(item) {
      const userId = this.$store.state.user.id;
      this.editedIndex = this.allProblems.indexOf(item);
      console.log(this.editedIndex);
      this.editedItem.problemId = item.problemId;
      this.editedItem.problemTitle = item.problemTitle;
      this.editedItem.problemDiscription = item.problemDiscription;
      // this.editedItem.problemPath = item.problemPath;s
      this.editedItem.problemStatus = 3;
      this.editedItem.taskScore = item.taskScore;
      this.editedItem.problemCreateBy = userId;
      this.editedItem.problemUpdateBy = this.editedItem.problemCreateBy;
      this.editedItem.problemUpdateDate = this.$moment().format(
        "YYYY-MM-DD HH:mm:ss"
      );
      this.dialogDelete = true;
    },

    // confirm change status problem-data
    async deleteItemConfirm() {
      const EditResult = await this.editProblem(this.editedItem);

      console.log(EditResult);
      if (typeof EditResult === "number") {
        this.closeDelete();
      }
    },

    // for close dialog
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.initialize();
    },

    // for close delete-dialog
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.initialize();
    },

    // for close insert-dialog
    closeInsert() {
      this.dialogInsert = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
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
