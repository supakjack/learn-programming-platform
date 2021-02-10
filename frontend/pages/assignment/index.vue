<!-- Author: Nook
Lasr edit: 10/2/2021 -->

<template>
  <v-data-table
    :headers="headers"
    :items="allAssignment"
    :items-per-page="5"
    sort-by="assignmentStatus"
    :search="search"
    class="elevation-1 kanit-font"
  >
    <template v-slot:top>
      <v-toolbar flat class="kanit-font">
        <v-toolbar-title>ตารางมอบหมายงาน</v-toolbar-title>
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

        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="success" dark class="mb-2" v-bind="attrs" v-on="on">
              เพิ่มมอบหมายงาน
            </v-btn>
          </template>
          <v-card class="kanit-font">
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text class="kanit-font">
              <v-container>
                <v-row>

                  <!-- Title -->
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="editedItem.assignmentTitle"
                      label="ชื่องานที่มอบหมาย"
                    ></v-text-field>
                  </v-col>

                  <!-- Discription -->
                  <v-col cols="12" sm="12" md="12">
                    <v-textarea
                      v-model="editedItem.assignmentDiscription"
                      label="คำอธิบาย"
                    ></v-textarea>
                  </v-col>

                  <!-- Start date -->
                  <v-col cols="12" sm="6" md="6">
                    <v-menu
                      v-model="menu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="editedItem.assignmentStartDate"
                          label="วันที่เริ่มส่งงาน"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="editedItem.assignmentStartDate"
                        @input="menu = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>

                  <!-- End date -->
                  <v-col cols="12" sm="6" md="6">
                    <v-menu
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="editedItem.assignmentEndDate"
                          label="วันที่สิ้นสุดส่งงาน"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="editedItem.assignmentEndDate"
                        @input="menu2 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>

                  <!-- Status -->
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      :items="status"
                      v-model="editedItem.assignmentStatus"
                      label="สถานะ"
                    >
                    </v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> ยกเลิก </v-btn>
              <v-btn color="blue darken-1" text @click="save"> บันทึก </v-btn>
            </v-card-actions>
          </v-card>

        <!-- Dialog for delete -->
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >คุณต้องการลบใช่หรือไม่?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >ไม่ใช่</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >ใช่</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <!-- management -->
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>

    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> โหลดข้อมูลใหม่ </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import assignmentmixin from "../../components/assignment";
export default {
  mixins: [assignmentmixin],
  data: () => ({
    status: ["ใช้งาน", "ไม่ใช้งาน"],
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    menu2: false,
    allAssignment: [],
    dialog: false,
    dialogDelete: false,
    search: "",
    headers: [
      {
        align: "start",
        sortable: false
        // value: "assignmentId"
      },
      { text: "งานที่ได้รับมอบหมาย", value: "assignmentTitle" },
      { text: "คำอธิบาย", value: "assignmentDiscription" },
      { text: "วันที่เริ่มส่งงาน", value: "assignmentStartDate" },
      { text: "วันที่สิ้นสุดส่งงาน", value: "assignmentEndDate" },
      { text: "สถานะ", value: "assignmentStatus" },
      { text: "การจัดการ", value: "actions", sortable: false }
    ],
    problem: [],
    editedIndex: -1,
    editedItem: {
      assignmentTitle: "",
      assignmentDiscription: "",
      assignmentStartDate: "",
      assignmentEndDate: "",
      assignmentStatus: ""
    },
    defaultItem: {
      assignmentTitle: "",
      assignmentDiscription: "",
      assignmentStartDate: "",
      assignmentEndDate: "",
      assignmentStatus: ""
    }
  }),
  async mounted() {
    // const { doseGetAll } = await this.getProblem();
    // this.allProblems = doseGetAll;
    console.log(this.allProblems);
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "เพิ่มมอบหมายงาน" : "แก้ไขมอบหมายงาน";
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
    // console.log("call getProblem from mixin");
    // this.getProblem()

    // console.log(this.response);
  },

  methods: {
    async initialize() {
      const { doseGetAll } = await this.getAssignment();
      this.allAssignment = doseGetAll;
    },

    editItem(item) {
      this.editedIndex = this.allAssignment.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.allAssignment.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.allAssignment.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {                                                   //Save for edit
        Object.assign(this.allAssignment[this.editedIndex], this.editedItem);
      } else {                                                                       //Save for add
        console.log(this.editedItem);
        this.allAssignment.push(this.editedItem);
      }
      this.close();
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
