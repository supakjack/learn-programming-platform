<template>
  <v-data-table
    :headers="headers"
    :items="allProblems"
    :items-per-page="5"
    sort-by="problemStatus"
    :search="search"
    class="elevation-1 kanit-font"
  >
    <template v-slot:[`item.problemStatus`]="{ item }">
      <v-chip :color="getColor(item.problemStatus)" dark>
        {{ item.problemStatus }}
      </v-chip>
    </template>
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
        <!-- <v-btn color="success" dark class="mb-2" @click="openDialog()">
          สร้างโจทย์ปัญหา
        </v-btn> -->
        <v-dialog
          v-model="dialog"
          width="1280px"
          hide-overlay
          transition="dialog-bottom-transition"
        >
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
                  โจทย์ปัญหา
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step editable step="2">
                  ชุดข้อมูลการทดสอบ
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
              <v-btn color="blue darken-1" text @click="close()">
                ยกเลิก
              </v-btn>
              <v-btn color="blue darken-1" text @click="save()">
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
              <v-btn color="blue darken-1" text @click="closeDelete()">
                ไม่
              </v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">
                ใช่
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogPicture" max-width="500px">
          <v-card>
            <div id="app" v-if="imagePicture != ''">
              <h2>รูปภาพตัวอย่าง:</h2>
              <v-img
                :src="require('../../../../storages/picture/' + imagePicture)"
                aspect-ratio="1.5"
                max-height="500"
                contain
              ></v-img>
            </div>
            <div v-else>
              <center>
                <h2>ไม่พบรูปภาพตัวอย่าง</h2>
              </center>
            </div>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="closeDialogPicture()">
                ปิด
              </v-btn>
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
            @click="openDialogPicture(item)"
          >
            mdi-image
          </v-icon>
        </template>
        <span>รูปภาพตัวอย่าง</span>
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
    formTitle: "สร้างโจทย์",
    imagePicture: "",
    editAllItem: [],
    hashtagResult: [],
    testsetResult: [],
    pictureResult: [],
    arrayHashtag: [],
    editProblemId: -1,
    watchArray: [],
    input: "",
    allProblems: [],
    dialog: false,
    dialogDelete: false, // if true show delete modal
    dialogPicture: false,
    search: "",
    headers: [
      { align: "start", text: "ชื่อโจทย์ปัญหา", value: "problemTitle" },
      {
        align: "center",
        text: "วันเดือนปีที่สร้าง",
        value: "problemCreateDate"
      },
      { align: "center", text: "สถานะ", value: "problemStatus" },
      { align: "center", text: "ดำเนินการ", value: "actions", sortable: false }
    ],
    editedIndex: -1, //  editedIndex default to -1
    editedItem: {
      // use to add, edit and delete item
      problemId: 0,
      problemTitle: "",
      problemDescription: "",
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
      problemDescription: "",
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
    // formTitle() {
    //   return this.editedIndex === -1 ? "สร้างโจทย์ปัญหา" : "แก้ไขโจทย์ปัญหา";
    // },
    // SuccessTitle() {
    //   return this.editedIndex === -1 ? "บันทึกสำเร็จ" : "แก้ไขสำเร็จ";
    // }
  },

  watch: {
    // dialog(val) {
    //   val || this.close();
    // },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },

  async created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      this.$store.commit("breadcrumb/setBreadcrumb", [
        {
          text: "หน้าหลัก",
          href: "/home"
        },
        {
          text: "โจทย์-แท็ก",
          href: "/problem-tag"
        }
      ]);
      const { doesGetAll } = await this.getProblem();

      doesGetAll.map(doesGetAll => {
        let dayCreateDate = this.$moment(doesGetAll.problemCreateDate).format(
          "Do"
        );
        let monthCreateDate = this.$moment(doesGetAll.problemCreateDate).format(
          "MMM"
        );
        let yearCreateDate =
          this.$moment(doesGetAll.problemCreateDate.getFullYear).year() + 543;
        let timeCreateDate = this.$moment(doesGetAll.problemUpdateDate).format(
          " เวลา LT"
        );
        doesGetAll.problemCreateDate =
          dayCreateDate +
          " " +
          monthCreateDate +
          " " +
          yearCreateDate +
          timeCreateDate;

        // doesGetAll.problemUpdateDate = this.$moment(
        //   doesGetAll.problemUpdateDate
        // ).format("Do MMM YY เวลา LT");
        let dayUpdateDate = this.$moment(doesGetAll.problemUpdateDate).format(
          "Do"
        );
        let monthUpdateDate = this.$moment(doesGetAll.problemUpdateDate).format(
          "MMM"
        );
        let yearUpdateDate =
          this.$moment(doesGetAll.problemUpdateDate.getFullYear).year() + 543;
        let timeUpdateDate = this.$moment(doesGetAll.problemUpdateDate).format(
          " เวลา LT"
        );
        doesGetAll.problemUpdateDate =
          dayUpdateDate +
          " " +
          monthUpdateDate +
          " " +
          yearUpdateDate +
          timeUpdateDate;
        if (doesGetAll.problemStatus == "active") {
          doesGetAll.problemStatus = "ใช้งาน";
        } else {
          doesGetAll.problemStatus = "ไม่ใช้งาน";
        }
      });
      this.allProblems = doesGetAll;
    },
    getColor(item) {
      if (item == "ใช้งาน") return "green";
      else if (item == "ไม่ใช้งาน") return "orange";
      else return "red";
    },

    // add and save problem-data to database
    async save() {
      const userId = this.$store.state.user.id;
      if (this.editProblemId == -1) {
        let formData = new FormData();

        if (this.$store.state.problem.files) {
          for (let file of this.$store.state.problem.files) {
            formData.append("singleFile", file);
          }
        }
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

        const createProblemData = {
          problemTitle: this.$store.state.problem.title,
          problemDescription: this.$store.state.problem.description,
          problemStatus: this.$store.state.problem.status,
          problemCreateBy: userId,
          problemUpdateBy: userId
        };
        const createFilesData = {
          filePath: "0",
          fileCreateBy: userId,
          fileUpdateBy: userId
        };
        const createPicturesData = {
          pictureFileId: null,
          pictureProblemId: null,
          pictureCreateBy: userId,
          pictureUpdateBy: userId
        };

        formData.append("createHashtagData", JSON.stringify(createHashtagData));
        formData.append("createTestsetData", JSON.stringify(createTestsetData));
        formData.append("createProblemData", JSON.stringify(createProblemData));
        formData.append("createFilesData", JSON.stringify(createFilesData));
        formData.append(
          "createPicturesData",
          JSON.stringify(createPicturesData)
        );
        const insertResult = await this.insertProblem(formData);
      } else {
        let formData = new FormData();
        let fileOldId = null;
        let pictureOldId = null;
        if (this.$store.state.problem.files) {
          for (let file of this.$store.state.problem.files) {
            formData.append("singleFile", file);
          }
          fileOldId = this.editAllItem.fileId;
          pictureOldId = this.editAllItem.pictureId;
          console.log(fileOldId);
        }
        const hashtagId = this.hashtagResult.map(res => {
          return res.hashtagId;
        });
        const testsetId = this.testsetResult.map(res => {
          return res.testsetId;
        });
        this.editAllItem;
        const dataCondition = {
          hashtagId,
          testsetId,
          fileId: fileOldId,
          pictureId: pictureOldId
        };

        const resultDelete = await this.deleteProblem(dataCondition);

        //process edit and insert
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

        const updateProblemData = {
          problemTitle: this.$store.state.problem.title,
          problemDescription: this.$store.state.problem.description,
          problemStatus: this.$store.state.problem.status,
          problemUpdateBy: userId,
          problemUpdateDate: this.$moment().format("YYYY-MM-DD HH:mm:ss")
        };
        const updateFilesData = {
          filePath: "0",
          fileCreateBy: userId,
          fileUpdateBy: userId
        };
        const updatePicturesData = {
          pictureFileId: null,
          pictureProblemId: this.editProblemId,
          pictureCreateBy: userId,
          pictureUpdateBy: userId
        };

        formData.append("updateHashtagData", JSON.stringify(updateHashtagData));
        formData.append("updateTestsetData", JSON.stringify(updateTestsetData));
        formData.append("updateProblemData", JSON.stringify(updateProblemData));
        if (fileOldId != null) {
          console.log(fileOldId);
          formData.append("updateFilesData", JSON.stringify(updateFilesData));
          formData.append(
            "updatePicturesData",
            JSON.stringify(updatePicturesData)
          );
        } else {
          formData.append("updateFilesData", null);
          formData.append("updatePicturesData", null);
        }
        const updateResult = await this.updateProblem(
          formData,
          this.editProblemId
        );
      }
      this.close();
      this.formTitle = "สร้างโจทย์";
    },

    //edit problem-data by problemId
    async editItem(item) {
      this.formTitle = "แก้ไขโจทย์";
      this.editAllItem = item;
      const hashtag = this.editHashtag(item.problemId);
      const testset = this.editTestset(item.problemId);
      const picture = this.editPicture(item.problemId);

      this.hashtagResult = await hashtag.then(res => {
        return res;
      });
      this.testsetResult = await testset.then(res => {
        return res;
      });
      this.pictureResult = await picture.then(res => {
        return res;
      });

      this.arrayHashtag = this.hashtagResult.map(res => {
        return res.hashtagTagId;
      });
      let arrayTestset = [];
      this.testsetResult.map(res => {
        const data = {
          testsetTitle: res.testsetTitle,
          testsetDescription: res.testsetDescription,
          testsetInput: res.testsetInput,
          testsetOutput: res.testsetOutput,
          testsetIsExample: res.testsetIsExample
        };
        arrayTestset.push(data);
      });

      let status = 1;
      if (this.$store.state.problem.status == "ไม่ใช้งาน") {
        status = 2;
      }
      this.$store.commit("problem/setProblem", {
        problem: {
          id: item.problemId,
          title: item.problemTitle,
          description: item.problemDescription,
          status: status,
          tags: this.arrayHashtag,
          testset: arrayTestset
        }
      });
      this.$store.commit("problem/setTestset", {
        problem: {
          testset: arrayTestset
        }
      });
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
    },

    // change status problem-data from enable or disable to delete
    deleteItem(item) {
      const userId = this.$store.state.user.id;
      this.editedIndex = this.allProblems.indexOf(item);
      this.editedItem.problemId = item.problemId;
      this.editedItem.problemTitle = item.problemTitle;
      this.editedItem.problemDescription = item.problemDescription;
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
      if (typeof EditResult === "number") {
        this.closeDelete();
      }
    },

    // for close dialog
    async close() {
      this.dialog = false;

      await this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editProblemId = -1;
        this.$store.commit("problem/setProblem", {
          problem: {
            id: "",
            title: "",
            description: "",
            status: "",
            tags: [],
            testset: []
          }
        });
        this.$store.commit("problem/setTestset", {
          problem: {
            testset: []
          }
        });
        this.$store.commit("problem/setFiles", {
          problem: {
            files: undefined
          }
        });
        this.watchArray = [
          { name: "id", val: this.$store.state.problem.id },
          { name: "title", val: this.$store.state.problem.title },
          { name: "description", val: this.$store.state.problem.title },
          { name: "status", val: status },
          { name: "tags", val: this.$store.state.problem.tags },
          { name: "testset", val: this.$store.state.problem.testset },
          { name: "files", val: this.$store.state.problem.files }
        ];
      });
      this.formTitle = "สร้างโจทย์";
      await this.initialize();
    },

    // for close delete-dialog
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editProblemId = -1;
      });
      this.initialize();
    },

    // for close insert-dialog
    closeInsert() {
      this.dialogInsert = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editProblemId = -1;
      });
    },
    openDialogPicture(item) {
      if (item.filePath != null) {
        let text = item.filePath.replaceAll("\\", "/");

        var path = text.substr(20, text.length);

        this.imagePicture = path;
      }
      this.dialogPicture = true;
    },
    closeDialogPicture() {
      this.dialogPicture = false;
      this.imagePicture = "";
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
