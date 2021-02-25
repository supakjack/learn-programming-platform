<template v-slot:top>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="3">
        <v-card width="auto" height="535px" outlined>
          <v-row>
            <v-col>
              <v-card-text> ไฟล์ </v-card-text>
            </v-col>
            <v-col>
              <v-card-actions class="float-right">
                <div class="button-wrap">
                  <label class="new-button" for="upload">อัพโหลด</label>
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
              style="margin-top:-20px"
              v-model="submit.source"
              autocomplete="coding"
              label="Coding"
              outlined
              rows="10"
            ></v-textarea>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card style="margin-top:-30px" outlined height="152px">
              <v-card-text>
                <div>
                  <v-text-field
                    v-model="submit.stdin"
                    label="ข้อมูลนำเข้า"
                  ></v-text-field>
                </div>
                <div>
                  <v-text-field
                    v-model="stdout"
                    label="ข้อมูลส่งออก"
                    value=""
                    disabled
                  ></v-text-field>
                </div>
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
  data: () => ({
    selectedItem: 1,
    snackbar: false,
    textErr: `Hello, I'm a snackbar`,
    files: {},
    items: ["C++", "C"],
    submit: {
      // use for run code
      language: "",
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
    deleteFile(file) {
      this.files = null;
    },
    run() {
      console.log(this.files);
      let formData = new FormData();

      if (this.files) {
        for (let file of this.files) {
          formData.append("singleFile", file);
        }
      }
      formData.append("language", this.submit.language);
      formData.append("source", this.submit.source);
      formData.append("stdin", this.submit.stdin);

      console.log([...formData]);
      const result = this.seperate(formData);
      result.then(result => {
        console.log(result);
        if (result.stderr != "") {
          console.log("err");
          this.snackbar = true;
          this.textErr = result.stderr;
        } else {
          console.log("no err");
          this.stdout = result.stdout;
        }
      });
    },
    filePicked(e) {
      console.log(e.currentTarget.files);
      console.log(this.files);
      // let fileList = new FileList();

      // if (fileList.length) {
      //   console.log(1);
      //   // for (let i = 0; i < e.currentTarget.files.length; i++) {
      //   //   this.files.push(e.currentTarget.files[i]);
      //   // }
      //   fileList[1] = e.currentTarget.files;
      //   // this.files.push(e.currentTarget.files);
      // } else {
      //   console.log(2);
      //   fileList[0] = e.currentTarget.files;
      this.files = e.currentTarget.files;
      // }
      console.log(this.files);
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
