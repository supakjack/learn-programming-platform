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
              <span class="headline">{{ formTitle }}</span>
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

                  <v-col justify="right" cols="12" sm="6" md="4">
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
            <v-card-title class="headline">
              Are you sure you want to delete this item?
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">
                Cancel
              </v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">
                OK
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogInsert" max-width="500px">
          <v-card>
            <v-card-title class="headline kanit-font">
              {{ SuccessTitle }}
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1 kanit-font" text @click="closeInsert">
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
import tagsmixin from "../../../components/tags";
export default {
  mixins: [tagsmixin],
  data: () => ({
    allTags: [],
    dialog: false,
    dialogDelete: false,
    dialogInsert: false,
    search: "",
    headers: [
      {
        align: "center",
        sortable: false
      },
      { text: "ชื่อแท็ก", value: "tagName" },
      { text: "สร้างขึ้นเมื่อ", value: "tagCreateDate" },
      { text: "แก้ไขล่าสุด", value: "tagUpdateDate" },
      { text: "สร้างโดย", value: "createName" },
      { text: "แก้ไขล่าสุดโดย", value: "updateName" },
      { text: "สถานะ", value: "tagStatus" },
      { text: "ดำเนินการ", value: "actions", sortable: false }
    ],
    tag: [],
    editedIndex: -1,
    editedItem: {
      tagId: 0,
      tagName: "",
      tagStatus: 0,
      tagCreateBy: 0,
      tagUpdateBy: 0
    },
    defaultItem: {
      tagId: 0,
      tagName: "",
      tagStatus: 0,
      tagCreateBy: 0,
      tagUpdateBy: 0
    },
    tagStatus: [
      { text: "ใช้งาน", value: 1 },
      { text: "ไม่ใช้งาน", value: 2 }
    ]
  }),
  async mounted() {
    // const { doesGetAll } = await this.getTag();
    // this.allTags = doesGetAll;
    // console.log(this.allTags);
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "สร้างแท็ก" : "แก้ไขแท็ก";
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
  },

  methods: {
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

    editItem(item) {
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

    deleteItem(item) {
      this.editedIndex = this.allTags.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.allTags.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.initialize();
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeInsert() {
      this.dialogInsert = false;
    },

    async save() {
      // if  this.editedIndex > -1 == it edited tag else insert tag
      if (this.editedIndex > -1) {
        const EditResult = await this.editTag(this.editedItem);
        if (typeof EditResult === "number") {
          this.close();
          this.dialogInsert = true;
        }
      } else {
        this.editedItem.tagCreateBy = 1;
        this.editedItem.tagUpdateBy = this.editedItem.tagCreateBy;

        const [insertResult] = await this.insertTag(this.editedItem);

        if (typeof insertResult === "number") {
          this.close();
          this.dialogInsert = true;
        }
      }
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
