<template v-slot:top>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="3">
        <v-card width="auto" height="535px" outlined>
          <v-row>
            <v-col>
              <v-card-text> ชื่อไฟล์ </v-card-text>
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
            <v-card class="card-file" elevation="2">
              {{ file.name }}
            </v-card>
          </div>
          <template>
            <v-btn
              @click="deleteFile"
              block
              style="position: absolute;bottom:0px; background-color:rgba(230, 131, 6, 0.5); color:white"
            >
              ล้างข้อมูล
            </v-btn>
          </template>
        </v-card>
      </v-col>

      <v-col cols="12" sm="12" md="9">
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
            <v-btn depressed color="success" class="float-right" @click="run">
              RUN
            </v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-textarea
              style="font-family: 'Courier New', monospace;margin-top:-20px"
              v-model="submit.source"
              autocomplete="coding"
              label="Coding"
              outlined
              rows="10"
            ></v-textarea>
          </v-col>
        </v-row>

        <v-row style="margin-top:-30px">
          <v-col>
            <v-card
              style="max-height: 176px;
              overflow: auto; height : 176px"
              outlined
              :loading="loading"
            >
              <template slot="progress">
                <v-progress-linear
                  color="deep-purple"
                  height="10"
                  indeterminate
                ></v-progress-linear>
              </template>
              <v-card-text>
                <div>
                  <v-textarea
                    v-model="submit.stdin"
                    autocomplete="email"
                    label="ข้อมูลนำเข้า"
                    rows="2"
                  ></v-textarea>
                </div>

                <div>
                  <v-textarea
                    v-model="stdout"
                    autocomplete="email"
                    label="ข้อมูลส่งออก"
                    value=""
                    readonly
                  ></v-textarea>
                </div>
                <v-row>
                  <v-col cols="12" md="8"> </v-col>
                  <v-col cols="12" md="4">
                    <template>
                      <div class="text-center">
                        <v-dialog v-model="dialog" width="700" height="1000">
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
                              style="margin-bottom:20px"
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
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar">
      {{ textErr }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
<script>
import tags from "./../problem-tag/tags/index";
import problems from "./../problem-tag/problems/index";
// import problem from "./../../components/problem";
import idemixin from "@/components/ide";
export default {
  mixins: [idemixin],
  mounted() {
    this.$store.commit("breadcrumb/setBreadcrumb", [
      {
        text: "หน้าหลัก",
        href: "/home"
      },
      {
        text: "IDE",
        href: "/ide"
      }
    ]);
  },
  data: () => ({
    code: 'console.log("Hello World")',
    lineNumbers: true,
    dialog: false,
    loading: false,
    selectedItem: 1,
    snackbar: false,
    textErr: `Hello, I'm a snackbar`,
    files: undefined,
    items: ["C++", "C"],
    submit: {
      // use for run code
      language: "C++",
      source: "",
      stdin: ""
    },
    stdout: ""
  }),
  computed: {
    tab: {
      set(tab) {
        this.$router.replace({ query: { ...this.$route.query, tab } });
      },
      get() {
        return this.$route.query.tab;
      }
    }
  },
  components: {
    tags,
    problems
  },
  methods: {
    highlighter(code) {
      return highlight(code, languages.js); //returns html
    },
    deleteFile(file) {
      this.files = null;
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
    }
  }

  //   layout: "modren"
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
