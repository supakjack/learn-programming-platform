<template>
  <v-data-table
    :headers="headers"
    :footer-props="{
      'items-per-page-options': [8, 15, 20, -1],
      'items-per-page-text': `จำนวนแถวต่อหน้า`,
      'items-per-page-all-text': `ทั้งหมด`
    }"
    :items="allTags"
    :items-per-page="8"
    item-key="tagId"
    :sort-by="['tagStatus', 'tagUpdateDate']"
    :sort-desc="[false, true]"
    multi-sort
    :search="search"
    height="450"
    class="elevation-1 kanit-font"
  >
    <template v-slot:top>
      <v-toolbar flat class="kanit-font">
        <v-toolbar-title>ตารางแท็ก</v-toolbar-title>
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
              สร้างแท็ก
            </v-btn>
          </template>
          <v-card class="kanit-font">
            <v-card-title>
              <span class="text-center">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text class="kanit-font">
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="editedItem.tagName"
                      label="ชื่อแท็ก"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      v-model="editedItem.tagStatus"
                      :items="tagStatus"
                      menu-props="auto"
                      label="สถานะ"
                      hide-details
                      single-line
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
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
              ต้องการลบแท็กนี้ใช่หรือไม่?
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
import tagsmixin from "@/components/tags";
export default {
  mixins: [tagsmixin],
  // declare variable and data in this component
  data: () => ({
    formTitle: "สร้างแท็ก",
    SuccessTitle: "",
    allTags: [],
    dialog: false, // if true show insert or edit modal
    dialogDelete: false, // if true show delete modal
    dialogSuccess: false, // if true show Inserted success modal
    search: "", // use for search in table all column
    headers: [
      // use to declare data and map value in header of table
      {
        align: "center",
        sortable: false
      },
      { text: "ชื่อแท็ก", value: "tagName" }, // define column name and value
      { text: "สร้างขึ้นเมื่อ", value: "tagCreateDate" },
      { text: "แก้ไขล่าสุด", value: "tagUpdateDate" },
      { text: "สร้างโดย", value: "createName" },
      { text: "แก้ไขล่าสุดโดย", value: "updateName" },
      { text: "สถานะ", value: "tagStatus" },
      { text: "ดำเนินการ", value: "actions", sortable: false }
    ],
    editedIndex: -1, //  editedIndex default to -1
    editedItem: {
      // use to add, edit and delete item
      tagId: 0,
      tagName: "",
      tagStatus: 0,
      tagCreateBy: 0,
      tagUpdateBy: 0
    },
    defaultItem: {
      // default of item value
      tagId: 0,
      tagName: "",
      tagStatus: 0,
      tagCreateBy: 0,
      tagUpdateBy: 0
    },
    tagStatus: [
      // use in select options
      { text: "ใช้งาน", value: 1 },
      { text: "ไม่ใช้งาน", value: 2 }
    ]
  }),

  computed: {},

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },

  // when created call initialize to geting all tag data
  async created() {
    this.initialize();
  },

  methods: {
    // function name: initialize
    // description: for geting data from backend using api
    // input: -
    // output: [doesGetAll]: {tagName, tagId, tagStatus, tagUpdateDate, tagCraeteDate ,CreateName, UpdateName}
    // CreateBy: Niphitphon Thanatkulkit / CreateDate: 1/2/2021
    // UpdateBy: Niphitphon Thanatkulkit / UpdateDate: 6/2/2021
    async initialize() {
      const { doesGetAll } = await this.getTag();
      doesGetAll.map(doesGetAll => {
        doesGetAll.tagCreateDate = this.$moment(
          doesGetAll.tagCreateDate
        ).format("Do MMM YY เวลา LT");
        doesGetAll.tagUpdateDate = this.$moment(
          doesGetAll.tagUpdateDate
        ).format("Do MMM YY เวลา LT");
        if (doesGetAll.tagStatus == "active") {
          doesGetAll.tagStatus = "ใช้งาน";
        } else {
          doesGetAll.tagStatus = "ไม่ใช้งาน";
        }
      });
      this.allTags = doesGetAll;
    },

    // function name: save
    // description: insert tag data or edit tag data send to backend by using API
    // input: insert: [editItem]: {tagName,tagStatus,tagCreateBy,tagUpdateBy}
    //        edit:   [editItem]: {tagId,tagName,tagStatus,tagCreateBy,tagUpdateBy,tagUpdatedate}
    // output: insert: TagId
    //         edit:   rows edited
    // CreateBy: Niphitphon Thanatkulkit / CreateDate: 4/2/2021
    // UpdateBy: Niphitphon Thanatkulkit / UpdateDate: 10/2/2021
    async save() {
      // if  this.editedIndex > -1 == it edited tag else this.editedIndex == -1 insert tag
      if (this.editedIndex > -1) {
        const EditResult = await this.editTag(this.editedItem);
        if (typeof EditResult === "number") {
          this.dialog = false;
          this.SuccessTitle = "แก้ไขสำเร็จ";
          this.dialogSuccess = true;
        }
      } else {
        this.editedItem.tagCreateBy = 1;
        this.editedItem.tagUpdateBy = this.editedItem.tagCreateBy;

        const [insertResult] = await this.insertTag(this.editedItem);

        if (typeof insertResult === "number") {
          this.close();
          this.SuccessTitle = "บันทึกสำเร็จ";
          this.dialogSuccess = true;
        }
      }
    },

    // function name: editItem
    // description: setting value from item to editItem object for edit tag
    // input: [item]: {tagId,tagName,tagStatus,tagCreateBy,tagUpdateBy,tagUpdatedate}
    // output: -
    // CreateBy: Niphitphon Thanatkulkit / CreateDate: 4/2/2021
    // UpdateBy: Niphitphon Thanatkulkit / UpdateDate: 10/2/2021
    editItem(item) {
      this.formTitle = "แก้ไขแท็ก";
      this.editedIndex = this.allTags.indexOf(item);
      this.editedItem.tagId = item.tagId;
      this.editedItem.tagStatus = item.tagStatus;
      this.editedItem.tagName = item.tagName;
      this.editedItem.tagCreateBy = 1;
      this.editedItem.tagUpdateBy = this.editedItem.tagCreateBy;
      this.editedItem.tagUpdateDate = this.$moment().format(
        "YYYY-MM-DD HH:mm:ss"
      );
      // this.editedItem.tagCreateBy = item.tagCreateBy;
      // this.editedItem.tagUpdateBy = this.editedItem.tagCreateBy;

      this.dialog = true;
    },

    // function name: deleteItem
    // description: setting value from item to editItem object for delete tag
    // input: [item]: {tagId,tagName,tagStatus,tagCreateBy,tagUpdateBy,tagUpdatedate}
    // output: -
    // CreateBy: Niphitphon Thanatkulkit / CreateDate: 4/2/2021
    // UpdateBy: Niphitphon Thanatkulkit / UpdateDate: 6/2/2021
    deleteItem(item) {
      this.editedIndex = this.allTags.indexOf(item);
      this.editedItem.tagId = item.tagId;
      this.editedItem.tagName = item.tagName;
      this.editedItem.tagStatus = 3;
      this.editedItem.tagCreateBy = 1;
      this.editedItem.tagUpdateBy = this.editedItem.tagCreateBy;
      this.editedItem.tagUpdateDate = this.$moment().format(
        "YYYY-MM-DD HH:mm:ss"
      );
      console.log(this.editedItem);
      this.dialogDelete = true;
    },

    // function name: deleteItemConfirm
    // description: delete tag by change tagStatus to 3 number {3 meaning to delete}
    // input: [item]: editedItem
    // output: -
    // CreateBy: Niphitphon Thanatkulkit / CreateDate: 6/2/2021
    // UpdateBy: Niphitphon Thanatkulkit / UpdateDate: 6/2/2021
    async deleteItemConfirm() {
      const EditResult = await this.editTag(this.editedItem);
            console.log(EditResult);

      if (typeof EditResult === "number") {
        this.closeDelete();
      }
    },

    // function name: close
    // description: close insert or edit modal
    // input: -
    // output: -
    // CreateBy: Niphitphon Thanatkulkit / CreateDate: 4/2/2021
    // UpdateBy: Niphitphon Thanatkulkit / UpdateDate: 6/2/2021
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.initialize();
    },

    // function name: closeDelete
    // description: close delete modal
    // input: -
    // output: -
    // CreateBy: Niphitphon Thanatkulkit / CreateDate: 6/2/2021
    // UpdateBy: Niphitphon Thanatkulkit / UpdateDate: 10/2/2021
    closeDelete() {
      this.dialogDelete = false;
      this.SuccessTitle = "ลบสำเร็จ";
      this.dialogSuccess = true;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.initialize();
    },

    // function name: closeSuccess
    // description: close inserted modal
    // input: -
    // output: -
    // CreateBy: Niphitphon Thanatkulkit / CreateDate: 4/2/2021
    // UpdateBy: Niphitphon Thanatkulkit / UpdateDate: 10/2/2021
    closeSuccess() {
      this.dialogSuccess = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.SuccessTitle = "สร้างแท็ก";
        this.SuccessTitle = "";
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
