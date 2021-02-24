<template v-slot:top>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="3">
        <v-card width="auto" height="500px" outlined>
          <v-row>
            <v-col>
              <v-card-text> ไฟล์ </v-card-text>
            </v-col>
            <v-col>
              <v-card-actions class="float-right">
                <!-- <input
                  type="file"
                  id="files"
                  ref="files"
                  multiple
                  v-on:change="handleFilesUpload()"
                /> -->
                <v-file-input
                  v-model="files"
                  @change="filePicked"
                  multiple
                  truncate-length="14"
                >
                </v-file-input>
                <input
                  type="file"
                  name="singleFile"
                  multiple
                  @change="filePicked"
                />
              </v-card-actions>
            </v-col>
          </v-row>
          <div v-for="(file, index) in files" :key="index">
            <v-card class="card-file" elevation="2">
              {{ file.name }}
            </v-card>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" sm="12" md="9">
        <v-row>
          <v-col cols="12" md="4">
            <v-card-text> main.cpp </v-card-text>
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              v-model="submit.language"
              :items="items"
              label="ภาษา"
              dense
              outlined
            ></v-select>
          </v-col>
          <v-col cols="12" md="4">
            <v-btn depressed color="success" class="float-left" @click="run">
              RUN
            </v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-textarea
              v-model="submit.source"
              autocomplete="coding"
              label="Coding"
              outlined
              rows="7"
            ></v-textarea>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card outlined height="152px">
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
    <v-btn dark @click="snackbar = true">
      Open Snackbar
    </v-btn>
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
    snackbar: false,
    textErr: `Hello, I'm a snackbar`,
    files: null,
    items: ["C++", "JavaScript", "JAVA", "PYTTHON"],
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
    run() {
      let formData = new FormData();

      for (let file of this.files) {
        formData.append("singleFile", file);
      }
      formData.append("language", this.submit.language);
      formData.append("source", this.submit.source);
      formData.append("stdin", this.submit.stdin);

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
      //   console.log(this.files);
      console.log(e.currentTarget.files);
      this.files = e.currentTarget.files;
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
.card-file {
  height: 30px;
  padding-top: 3px;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-bottom: 3px;
}
.card-file:hover {
  background-color: lightblue;
  cursor: pointer;
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
