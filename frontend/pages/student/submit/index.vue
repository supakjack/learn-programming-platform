<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="4">
        <v-card width="auto" height="500px" outlined>
          <!-- <template v-slot:extension> -->
          <v-tabs grow v-model="model">
            <v-tab>โจทย์ </v-tab>
            <v-tab>การส่ง</v-tab>
          </v-tabs>
          <!-- </template> -->

          <v-tabs-items v-model="model">
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-title class="headline">
                  An awesome title
                </v-card-title>
                <v-card-text>
                  <p>
                    Duis lobortis massa imperdiet quam. Donec vitae orci sed
                    dolor rutrum auctor. Vestibulum facilisis, purus nec
                    pulvinar iaculis, ligula mi congue nunc, vitae euismod
                    ligula urna in dolor. Praesent congue erat at massa.
                  </p>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>

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

      <v-col cols="12" sm="12" md="5">
        <v-row>
          <v-col cols="12" md="3">
            <v-card-text> main.cpp </v-card-text>
          </v-col>
          <v-col cols="12" md="6">
            <v-select :items="items" label="ภาษา" dense outlined></v-select>
          </v-col>
          <v-col cols="12" md="3">
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
export default {
  data: () => ({
    items: ["C++", "JavaScript", "JAVA", "PYTTHON"],
    files: []
  }),
  data() {
    return {
      model: "tab-2"
    };
  }
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
