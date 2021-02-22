<!-- CreateBy: Atikom Wongwan
Last edit: 19/2/2021 -->

<template>
  <v-data-table
    :headers="headers"
    :footer-props="{
      'items-per-page-options': [8, 15, 20, -1],
      'items-per-page-text': `จำนวนแถวต่อหน้า`,
      'items-per-page-all-text': `ทั้งหมด`
    }"
    :items="allAssignment"
    :items-per-page="5"
    :sort-by="assignmentStatus"
    :sort-desc="[false, true]"
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
                      v-model="editedItem.assignmentDescription"
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
                      :items="assignmentStatus"
                      v-model="editedItem.assignmentStatus"
                      menu-props="auto"
                      label="สถานะ"
                      hide-details
                      single-line
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
              >คุณต้องการลบการมอบหมายนี้ใช่หรือไม่?</v-card-title
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
        <!--
        <v-dialog v-model="dialogSuccess" max-width="500px">
          <v-card>
            <v-card-title class="kanit-font text-center">
              {{ SuccessTitle }}
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1 kanit-font"
                text
                @click="closeSuccess"
              >
                ตกลง
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog> -->
      </v-toolbar>
    </template>

    <!-- management -->
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>

    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> โหลดข้อมูลใหม่ </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import assignmentmixin from "../../../components/assignment";
export default {
  mixins: [assignmentmixin],
  data: () => ({
    // status: ["ใช้งาน", "ไม่ใช้งาน"],
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    menu2: false,
    allAssignment: [],
    dialog: false,
    dialogDelete: false,
    dialogSuccess: false,
    search: "",
    headers: [
      {
        align: "start",
        sortable: false
        // value: "assignmentId"
      },
      { text: "งานที่ได้รับมอบหมาย", value: "assignmentTitle" },
      { text: "คำอธิบาย", value: "assignmentDescription" },
      { text: "วันที่เริ่มส่งงาน", value: "assignmentStartDate" },
      { text: "วันที่สิ้นสุดส่งงาน", value: "assignmentEndDate" },
      { text: "สถานะ", value: "assignmentStatus" },
      { text: "การจัดการ", value: "actions", sortable: false }
    ],
    problem: [],
    editedIndex: -1,
    editedItem: {
      assignmentId: 0,
      assignmentTitle: "",
      assignmentDescription: "",
      assignmentStartDate: "",
      assignmentEndDate: "",
      assignmentStatus: 0,
      assignmentCreateBy: 0,
      assignmentUpdateBy: 0
    },
    defaultItem: {
      assignmentId: 0,
      assignmentTitle: "",
      assignmentDescription: "",
      assignmentStartDate: "",
      assignmentEndDate: "",
      assignmentStatus: 0,
      assignmentCreateBy: 0,
      assignmentUpdateBy: 0
    },
    assignmentStatus: [
      // use in select options
      { text: "ใช้งาน", value: 1 },
      { text: "ไม่ใช้งาน", value: 2 }
    ]
  }),
  async mounted() {
    // const { doseGetAll } = await this.getProblem();
    // this.allProblems = doseGetAll;
    console.log(this.allProblems);
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "เพิ่มมอบหมายงาน" : "แก้ไขมอบหมายงาน";
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
    // console.log("call getProblem from mixin");
    // this.getProblem()

    // console.log(this.response);
  },

  methods: {
    // function name: initialize
    // description: for geting data from backend using api
    // input: -
    // output: [doesGetAll]: {assingmetTitle, assingmentDescription, assingmentStartDate, assingmentEndDate ,assingmentStatus}
    // CreateBy: Atikom Wongwan / CreateDate: 19/2/2021
    // UpdateBy: Atikom Wongwan / UpdateDate: 19/2/2021

    async initialize() {
      const { doesGetAll } = await this.getAssignment();
      doesGetAll.map(doesGetAll => {
        doesGetAll.assignmentStartDate = this.$moment(
          doesGetAll.assignmentStartDate
        ).format("Do MMM YY เวลา LT");
        doesGetAll.assignmentEndDate = this.$moment(
          doesGetAll.assignmentEndDate
        ).format("Do MMM YY เวลา LT");
        if (doesGetAll.assignmentStatus == "active") {
          doesGetAll.assignmentStatus = "ใช้งาน";
        } else {
          doesGetAll.assignmentStatus = "ไม่ใช้งาน";
        }
      });
      console.log(doesGetAll);
      this.allAssignment = doesGetAll;
      // console.log(this.assignments);
    },

    async save() {
      // if  this.editedIndex > -1 == it edited assignment else this.editedIndex == -1 insert assignment
      if (this.editedIndex > -1) {
        const editResult = await this.editAssignment(this.editedItem);
        if (typeof editResult === "number") {
          this.dialog = false;
          // this.SuccessTitle = "แก้ไขสำเร็จ";
          this.dialogSuccess = true;
        }
      } else {
        this.editedItem.assignmentCreateBy = 1;
        this.editedItem.assignmentUpdateBy = this.editedItem.assignmentCreateBy;

        const [insertResult] = await this.insertAssignment(this.editedItem);

        if (typeof insertResult === "number") {
          this.close();
          // this.SuccessTitle = "บันทึกสำเร็จ";
          this.dialogSuccess = true;
        }
      }
    },

    // editItem(item) {
    //   this.editedIndex = this.allAssignment.indexOf(item);
    //   this.editedItem.assignmentId = item.assignmentId;
    //   this.editedItem.assignmentTitle = item.assignmentTitle;
    //   this.editedItem.assignmentDescription = item.assignmentDescription;
    //   this.editedItem.assignmentStartDate = item.assignmentStartDate;
    //   this.editedItem.assignmentEndDate = item.assignmentEndDate;
    //   this.editedItem.assignmentStatus = item.assignmentStatus;
    //   // this.editedItem.assignmentCreateBy = item.assignmentCreateBy;
    //   // this.editedItem.assignmentUpdateBy = this.editedItem.assignmentCreateBy;
    //   this.editedItem.assignmentUpdateDate = this.$moment().format(
    //     "YYYY-MM-DD HH:mm:ss"
    //   );
    //   console.log(this.editedItem);
    //   this.dialogDelete = true;
    // },

    // deleteItem(item) {
    //   this.editedIndex = this.allAssignment.indexOf(item);
    //   this.editedItem.assignmentId = item.assignmentId;
    //   this.editedItem.assignmentTitle = item.assignmentTitle;
    //   this.editedItem.assignmentDescription = item.assignmentDescription;
    //   this.editedItem.assignmentStartDate = this.$moment().format(
    //     "YYYY-MM-DD HH:mm:ss"
    //   );
    //   this.editedItem.assignmentEndDate = this.$moment().format(
    //     "YYYY-MM-DD HH:mm:ss"
    //   );
    //   this.editedItem.assignmentStatus = 3;
    //   this.editedItem.assignmentCreateBy = 1;
    //   this.editedItem.assignmentUpdateBy = this.editedItem.assignmentCreateBy;
    //   this.editedItem.assignmentUpdateDate = this.$moment().format(
    //     "YYYY-MM-DD HH:mm:ss"
    //   );
    //   console.log(this.editedItem);
    //   this.dialogDelete = true;
    // },

    // async deleteItemConfirm() {
    //   const EditResult = await this.editAssignment(this.editedItem);
    //   console.log(EditResult);

    //   if (typeof EditResult === "number") {
    //     this.closeDelete();
    //   }
    // },

    // close() {
    //   this.dialog = false;
    //   this.$nextTick(() => {
    //     this.editedItem = Object.assign({}, this.defaultItem);
    //     this.editedIndex = -1;
    //   });
    // },

    // closeDelete() {
    //   this.dialogDelete = false;
    //   this.SuccessTitle = "ลบสำเร็จ";
    //   this.dialogSuccess = true;
    //   this.$nextTick(() => {
    //     this.editedItem = Object.assign({}, this.defaultItem);
    //     this.editedIndex = -1;
    //   });
    //   this.initialize();
    // },

    // closeSuccess() {
    //   this.dialogSuccess = false;
    //   this.$nextTick(() => {
    //     this.editedItem = Object.assign({}, this.defaultItem);
    //     this.editedIndex = -1;
    //     this.SuccessTitle = "สร้างการมอบหมายงาน";
    //     this.SuccessTitle = "";
    //   });
    // },

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
    }

    // save() {
    //   if (this.editedIndex > -1) {
    //     //Save for edit
    //     Object.assign(this.allAssignment[this.editedIndex], this.editedItem);
    //   } else {
    //     //Save for add
    //     console.log(this.editedItem);
    //     this.allAssignment.push(this.editedItem);
    //   }
    //   this.close();
    // },
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
