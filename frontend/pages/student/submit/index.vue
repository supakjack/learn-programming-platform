<template>
  <v-row>
    <v-col cols="12" sm="12" md="12">
      <v-card width="auto" height="520px" outlined>
        <!-- <template v-slot:extension> -->
        <v-tabs grow v-model="model">
          <v-tab>โจทย์ </v-tab>
          <v-tab>การส่ง</v-tab>
          <v-tab>ไฟล์</v-tab>
        </v-tabs>
        <!-- </template> -->

        <v-tabs-items v-model="model">
          <v-tab-item>
            <v-card flat>
              <v-card-title>
                {{ problemTitle }}
              </v-card-title>
              <v-card-text>
                <p class="display-0.75 text--primary">
                  {{ problemDescription }}
                </p>
              </v-card-text>
              <v-card-text>
                <v-row>
                  <v-col>
                    <p>ข้อมูลตัวอย่าง</p>
                  </v-col>
                  <v-col>
                    <a class="float-right" @click="openDialogPicture()"
                      >รูปภาพประกอบ</a
                    >
                  </v-col>
                </v-row>
              </v-card-text>
              <v-data-table
                :headers="headersTestset"
                :items="testsetExample.doesGetAll"
                :items-per-page="5"
                class="elevation-1"
              >
              </v-data-table>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <template>
              <v-data-table
                :headers="headers"
                :items="allCompileResult.doesGetAll"
                :items-per-page="5"
                class="elevation-1"
              >
                <template v-slot:item.compilelogTestResult="{ item }">
                  <v-chip :color="getColor(item.compilelogTestResult)" dark>
                    {{ item.compilelogTestResult }}
                  </v-chip>
                </template>
              </v-data-table>
            </template>
          </v-tab-item>
          <v-tab-item>
            <v-card width="auto" height="487px" outlined>
              <v-row>
                <v-col>
                  <v-card-text> แนบไฟล์ </v-card-text>
                </v-col>
                <v-col>
                  <v-card-actions class="float-right">
                    <div class="button-wrap">
                      <label class="new-button" for="upload"
                        >อัพโหลดไฟล์ Source code</label
                      >
                      <input
                        id="upload"
                        type="file"
                        name="singleFile"
                        multiple
                        @change="filePicked"
                      />
                    </div>
                  </v-card-actions>
                </v-col>
              </v-row>
              <div v-for="(file, index) in files" :key="index">
                <v-card class="card-file" elevation="4">
                  {{ file.name }}
                </v-card>
              </div>

              <v-btn
                @click="deleteFile"
                block
                style="position: absolute;bottom:0px; background-color:rgba(230, 131, 6, 0.5); color:white"
              >
                ล้างข้อมูล
              </v-btn>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-col>
    <v-col cols="12" sm="12" md="12">
      <v-row>
        <v-col cols="12" md="4">
          <v-select
            v-model="submit.language"
            :items="items"
            label="ภาษา"
            dense
            outlined
          ></v-select>
        </v-col>
        <v-col cols="12" md="4"> </v-col>
        <v-col cols="12" md="4">
          <v-btn depressed color="info" class="float-right" @click="submitCode">
            Submit
          </v-btn>
          <v-btn
            depressed
            color="success"
            class="float-right"
            style="margin-right: 4px"
            @click="run"
          >
            RUN
          </v-btn>
        </v-col>
      </v-row>

      <v-row style="margin-top: -35px">
        <v-col>
          <v-textarea
            style="font-family: 'Courier New', monospace"
            v-model="submit.source"
            autocomplete="coding"
            label="Coding"
            outlined
            rows="10"
          ></v-textarea>
        </v-col>
      </v-row>

      <v-row style="margin-top: -45px">
        <v-col>
          <v-card outlined :loading="loading">
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>
            <v-tabs grow v-model="resultTabs">
              <v-tab v-for="tab of tabs" :key="tab.index">
                {{ tab.name }}
              </v-tab>
            </v-tabs>
            <v-tabs-items
              v-model="resultTabs"
              style="font-family: 'Courier New', monospace"
            >
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <v-row>
                      <v-textarea
                        v-model="submit.stdin"
                        label="ข้อมูลนำเข้า"
                        rows="2"
                      ></v-textarea>
                    </v-row>
                    <v-row>
                      <v-textarea
                        v-model="stdout"
                        autocomplete="email"
                        label="ข้อมูลส่งออก"
                        value=""
                        readonly
                      ></v-textarea>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="8"> </v-col>
                      <v-col cols="12" md="4">
                        <template>
                          <div class="text-center">
                            <v-dialog
                              v-model="dialog"
                              width="700"
                              height="1000"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  dark
                                  color="success"
                                  class="float-right"
                                  v-bind="attrs"
                                  v-on="on"
                                >
                                  ผลลัพธ์
                                </v-btn>
                              </template>

                              <v-card>
                                <v-card-title
                                  class="headline grey lighten-2"
                                  style="margin-bottom: 20px"
                                >
                                  ผลลัพธ์
                                </v-card-title>
                                <v-textarea
                                  v-model="stdout"
                                  autocomplete="email"
                                  label="ข้อมูลส่งออก"
                                  value=""
                                  rows="7"
                                  readonly
                                ></v-textarea>

                                <v-divider></v-divider>

                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    color="primary"
                                    text
                                    @click="dialog = false"
                                  >
                                    ปิด
                                  </v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                          </div>
                        </template>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <div v-for="(testset, index) in testsetResult" :key="index">
                      <p
                        v-if="
                          testset.compilelogCompileStatus == 'Error' &&
                            index + 1 == testsetResult.length
                        "
                        style="color: red"
                      >
                        {{ testset.compilelogErrorMessage }}
                      </p>
                      <p v-if="testset.compilelogCompileStatus != 'Error'">
                        กรณีทดสอบที่ {{ index + 1 }} .
                        <span
                          v-if="testset.compilelogCompileStatus == 'Passed'"
                          style="color: green"
                          >{{ testset.compilelogCompileStatus }}
                        </span>
                        <span
                          v-if="testset.compilelogCompileStatus == 'Failed'"
                          style="color: orange"
                          >{{ testset.compilelogCompileStatus }}
                        </span>
                      </p>
                    </div>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import idemixin from "@/components/ide";
import testsetmixin from "@/components/testset";
export default {
  mixins: [idemixin, testsetmixin],

  data: () => ({
    headers: [
      {
        align: "center",
        text: "ที่",
        value: "compilelogSubmitNo",
        sortable: false
      },
      {
        align: "center",
        text: "ผลลัพธ์",
        value: "compilelogTestResult",
        sortable: false
      },
      {
        align: "center",
        text: "คะแนน",
        value: "compilelogScore",
        sortable: false
      },
      {
        align: "center",
        text: "วันที่",
        value: "compilelogCreateDate",
        sortable: false
      }
    ],
    headersTestset: [
      { align: "center", text: "หัวข้อ", value: "testsetTitle" },
      { align: "center", text: "คำอธิบาย", value: "testsetDescription" },
      { align: "center", text: "ข้อมูลนำเข้า", value: "testsetInput" },
      { align: "center", text: "ข้อมูลส่งออก", value: "testsetOutput" }
    ],

    tabs: [
      { index: 0, name: "ผลจากการ RUN" },
      { index: 1, name: "ผลจากการ SUBMIT" }
    ],
    dialog: false,
    dialogPicture: false,
    loading: false,
    testsetResult: [],
    allCompileResult: [],
    compileResult: {},
    dataTestset: [],
    snackbar: false,
    textErr: `Hello, I'm a snackbar`,
    items: ["C++", "C"],
    files: undefined,
    submit: {
      // use for run code
      language: "C++",
      source: "",
      stdin: ""
    },
    stdout: "",
    model: "tab-3",
    resultTabs: 0,
    problemTitle: "",
    problemDescription: "",
    testsetExample: [],
    breakcump: [],
    image: ""
  }),
  async created() {
    this.initialize();
  },
  mounted() {
    this.courseData = this.$store.state.course;
    const corseSection =
      this.$store.state.course.courseCode +
      " " +
      this.$store.state.course.courseName;
    const sectionName =
      "กลุ่มเรียนที่ " + this.$store.state.course.sectionNumber;
    // const sectionName =
    //   "กลุ่มเรียนที่ " + this.$store.state.course.sectionNumber;
    // const sectionName =
    //   "กลุ่มเรียนที่ " + this.$store.state.course.sectionNumber;
    this.$store.commit("breadcrumb/setBreadcrumb", [
      {
        text: "หน้าหลัก",
        href: "/student/home"
      },
      {
        text: corseSection,
        href: "/student/homework"
      },
      {
        text: sectionName,
        href: "/student/homework"
      },
      {
        text: this.$store.state.homework.assignmentTitle,
        href: "/student/submit"
      },
      {
        text: this.$store.state.homework.problemTitle,
        href: "/student/submit"
      }
    ]);
  },
  methods: {
    getColor(item) {
      if (item == "Accepted") return "green";
      else if (item == "Wrong Answer") return "orange";
      else return "red";
    },
    async initialize() {
      this.breakcump = {
        yearId: this.$store.state.course.yearId,
        sectionId: this.$store.state.course.sectionId,
        courseId: this.$store.state.course.courseId,
        assignmentId: this.$store.state.homework.assignmentId,
        problemId: this.$store.state.homework.problemId,
        userId: this.$store.state.user.id,
        taskId: this.$store.state.homework.taskId
      };

      this.testsetExample = await this.getTestsetExample(
        this.$store.state.homework.problemId
      );

      if (this.testsetExample.doesGetAll[0].filePath != null) {
        let text = this.testsetExample.doesGetAll[0].filePath.replaceAll(
          "\\",
          "/"
        );

        var path = text.substr(20, text.length);

        this.image = path;
      }
      this.problemTitle = this.$store.state.homework.problemTitle;
      this.problemDescription = this.$store.state.homework.problemDescription;
      const data = {
        compilelogTaskId: this.$store.state.homework.taskId,
        compilelogCreateBy: this.$store.state.user.id
      };
      const allCompile = this.getCompilelog(data);

      this.allCompileResult = await allCompile.then(res => {
        return res;
      });

      this.allCompileResult.doesGetAll.map(doesGetAll => {
        let dayCreateDate = this.$moment(
          doesGetAll.compilelogCreateDate
        ).format("Do");
        let monthCreateDate = this.$moment(
          doesGetAll.compilelogCreateDate
        ).format("MMM");
        let yearCreateDate =
          this.$moment(doesGetAll.compilelogCreateDate.getFullYear).year() +
          543;
        let timeCreateDate = this.$moment(
          doesGetAll.compilelogCreateDate
        ).format(" เวลา LT");
        doesGetAll.compilelogCreateDate =
          dayCreateDate +
          " " +
          monthCreateDate +
          " " +
          yearCreateDate +
          timeCreateDate;
        // doesGetAll.compilelogCreateDate = this.$moment(
        //   doesGetAll.compilelogCreateDate
        // ).format("Do MMM YY เวลา LT");
      });
    },
    deleteFile(file) {
      this.files = null;
    },
    async submitCode() {
      this.loading = true;
      const userId = this.$store.state.user.id;

      let formData = new FormData();

      formData.append("yearName", this.breakcump.yearId);
      formData.append("courseCode", this.breakcump.courseId);
      formData.append("sectionNumber", this.breakcump.sectionId);
      formData.append("assignmentTitle", this.breakcump.assignmentId);
      formData.append("problemTitle", this.breakcump.problemId);
      formData.append("userUsername", userId);
      formData.append("fileCreateBy", userId);
      formData.append("fileUpdateBy", userId);
      formData.append("sourceCode", this.submit.source);
      formData.append("memeFile", this.submit.language);

      if (this.files) {
        for (let file of this.files) {
          formData.append("singleFile", file);
        }
      }
      const submitResult = await this.submitData(formData);
      const testsetProblem = {
        testsetProblemId: this.$store.state.homework.problemId
      };
      const testsetResult = await this.getTestset(testsetProblem);
      this.dataTestset = await testsetResult.doesGetAll.map(async res => {
        const data = {
          filePath: submitResult.dataReturn.path,
          language: submitResult.dataReturn.language,
          testsetId: res.testsetId
        };
        const dataTestsetApi = await this.testsetSubmit(data);
        return dataTestsetApi;
      });

      const compileData = {
        compilelogTaskId: this.$store.state.homework.taskId,
        compilelogSubmitNo: submitResult.dataReturn.number,
        compileloglanguage: submitResult.dataReturn.language,
        compilelogFileId: submitResult.dataReturn.fileId,
        compilelogCreateBy: userId,
        compilelogUpdateBy: userId,
        testsetResult: []
      };

      this.testsetResult = await Promise.all(this.dataTestset).then(value => {
        return value;
      });
      compileData.testsetResult = this.testsetResult;

      const createCompileLogData = this.createCompile(compileData);

      this.compileResult = await createCompileLogData.then(res => {
        return res;
      });
      const data = {
        compilelogTaskId: this.$store.state.homework.taskId,
        compilelogCreateBy: this.$store.state.user.id
      };
      const allCompile = this.getCompilelog(data);

      this.allCompileResult = await allCompile.then(res => {
        return res;
      });

      this.allCompileResult.doesGetAll.map(doesGetAll => {
        // doesGetAll.compilelogCreateDate = this.$moment(
        //   doesGetAll.compilelogCreateDate
        // ).format("Do MMM YY เวลา LT");
        let dayCreateDate = this.$moment(
          doesGetAll.compilelogCreateDate
        ).format("Do");
        let monthCreateDate = this.$moment(
          doesGetAll.compilelogCreateDate
        ).format("MMM");
        let yearCreateDate =
          this.$moment(doesGetAll.compilelogCreateDate.getFullYear).year() +
          543;
        let timeCreateDate = this.$moment(
          doesGetAll.compilelogCreateDate
        ).format(" เวลา LT");
        doesGetAll.compilelogCreateDate =
          dayCreateDate +
          " " +
          monthCreateDate +
          " " +
          yearCreateDate +
          timeCreateDate;
      });

      this.resultTabs = 1;
      this.loading = false;
    },
    async run() {
      this.loading = true;
      let formData = new FormData();

      if (this.files) {
        for (let file of this.files) {
          formData.append("singleFile", file);
        }
      }
      formData.append("language", this.submit.language);
      formData.append("source", this.submit.source);
      formData.append("stdin", this.submit.stdin);

      const result = await this.seperate(formData);
      if (result.stderr != "") {
        this.snackbar = true;
        this.textErr = result.stderr;
      } else {
        this.stdout = result.stdout;
      }

      this.loading = false;
    },
    filePicked(e) {
      this.files = e.currentTarget.files;
    },
    handleFilesUpload() {
      let uploadedFiles = this.$refs.files.files;
      /*
          Adds the uploaded file to the files array
        */
      for (var i = 0; i < uploadedFiles.length; i++) {
        this.submit.codeFiles.push(uploadedFiles[i]);
      }
    },
    openDialogPicture() {
      this.dialogPicture = true;
    }
  }
};
</script>

<style>
.new-button {
  display: inline-block;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
  background-color: #4eb7f8;
  font-size: 16px;
  color: #fff;
}
input[type="file"] {
  position: absolute;
  z-index: -1;
  top: 6px;
  left: 0;
  font-size: 15px;
  color: rgb(153, 153, 153);
}
.button-wrap {
  position: relative;
}
.card-file {
  height: 30px;
  padding-top: 3px;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-bottom: 3px;
}
.card-file:hover {
  background-color: lightblue;
}
.v-text-field {
  padding-top: 0px !important;
}
.roboto-font {
  font-family: "Roboto", sans-serif;
}
.kanit-font {
  font-family: "Kanit", sans-serif;
}
</style>
