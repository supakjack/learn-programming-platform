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
                <v-file-input
                  v-model="files"
                  hide-input
                  multiple
                  truncate-length="14"
                >
                </v-file-input>
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
            <v-select :items="items" label="ภาษา" dense outlined></v-select>
          </v-col>
          <v-col cols="12" md="4">
            <v-btn depressed color="success" class="float-left">
              RUN
            </v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-textarea
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
                  <v-text-field label="ข้อมูลนำเข้า"></v-text-field>
                </div>
                <div>
                  <v-text-field
                    label="ข้อมูลส่งออก"
                    value="Hello, World!"
                    disabled
                  ></v-text-field>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import tags from "./../problem-tag/tags/index";
import problems from "./../problem-tag/problems/index";
// import problem from "./../../components/problem";
import tagsmixin from "../../components/tags";
export default {
  data: () => ({
    items: ["C++", "JavaScript", "JAVA", "PYTTHON"],
    files: []
  }),

  mixins: [tagsmixin],
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
