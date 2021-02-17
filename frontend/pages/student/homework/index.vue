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
        <v-toolbar-title>ตารางการบ้าน</v-toolbar-title>
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
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<script>
import homeworkmixin from "@/components/homework";
export default {
  mixins: [homeworkmixin],
  // declare variable and data in this component
  data: () => ({
    formTitle: "ข้อมูลการบ้าน",
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
      { text: "ชื่อบท", value: "tagName" }, // define column name and value
      { text: "สถานะการใช้งาน", value: "tagCreateDate" },
      { text: "สถานะการส่งงาน", value: "tagUpdateDate" },
      { text: "คะแนน", value: "createName" }
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
