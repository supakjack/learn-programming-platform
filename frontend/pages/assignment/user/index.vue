<template>
  <v-data-table
    :headers="headers"
    :items="users"
    :search="search"
    sort-by="userId"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>ตารางผู้ใช้งาน</v-toolbar-title>
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
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              เพิ่มผู้ใช้งาน
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-autocomplete
                      v-model="editedItem.prefix"
                      :items="prefix"
                      label="คำนำหน้า"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.firstname"
                      label="ชื่อจริง"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.lastname"
                      label="นามสกุล"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-autocomplete
                      v-model="editedItem.status"
                      :items="status"
                      label="สถานะ"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <div class="flex justify-center">หรือ</div>
                <v-file-input label="Excel"></v-file-input>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> ยกเลิก </v-btn>
              <v-btn color="blue darken-1" text @click="save"> บันทึก </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >คุณต้องการลบผู้ใช้งานคนนี้หรืออไม่?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >ยกเลิก</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >ลบ</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
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
export default {
  data: () => ({
    prefix: ["นาย", "นางสาว"],
    status: ["ใช้งาน", "ปิด"],
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "รหัสนิสิต",
        align: "start",
        sortable: true,
        value: "userId",
      },
      { text: "คำนำหน้า", value: "prefix" },
      { text: "ชื่อ", value: "firstname" },
      { text: "นามสกุล", value: "lastname" },
      { text: "สิทธิ์", value: "role" },
      { text: "สถานะ", value: "status" },
      { text: "การจัดการ", value: "actions", sortable: false },
    ],
    users: [],
    editedIndex: -1,
    editedItem: {
      prefix: "",
      firstname: "",
      lastname: "",
      status: "",
    },
    defaultItem: {
      prefix: "",
      firstname: "",
      lastname: "",
      status: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.users = [
        {
          prefix: "นาย",
          firstname: "Frozen",
          lastname: "Yogurt",
          userId: 159,
          role: "นักเรียน",
          status: "ใช้งาน",
        },
        {
          prefix: "นางสาว",
          firstname: "Ice cream sandwich",
          userId: 237,
          role: "นักเรียน",
          status: "ใช้งาน",
        },
        {
          prefix: "นาย",

          firstname: "Eclair",
          userId: 262,
          role: "นักเรียน",
          status: "ใช้งาน",
        },
        {
          prefix: "นาย",

          firstname: "Cupcake",
          userId: 305,
          role: "นักเรียน",
          status: "ใช้งาน",
        },
        {
          prefix: "นาย",

          firstname: "Gingerbread",
          userId: 356,
          role: "นักเรียน",
          status: "ใช้งาน",
        },
        {
          prefix: "นาย",

          firstname: "Jelly bean",
          userId: 375,
          role: "นักเรียน",
          status: "ใช้งาน",
        },
        {
          prefix: "นาย",

          firstname: "Lollipop",
          userId: 392,
          role: "นักเรียน",
          status: "ใช้งาน",
        },
        {
          prefix: "นาย",

          firstname: "Honeycomb",
          userId: 408,
          role: "นักเรียน",
          status: "ใช้งาน",
        },
        {
          prefix: "นาย",

          firstname: "Donut",
          userId: 452,
          role: "นักเรียน",
          status: "ใช้งาน",
        },
        {
          prefix: "นาย",

          firstname: "KitKat",
          userId: 518,
          role: "นักเรียน",
          status: "ใช้งาน",
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.users.splice(this.editedIndex, 1);
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
      if (this.editedIndex > -1) {
        Object.assign(this.users[this.editedIndex], this.editedItem);
      } else {
        this.users.push(this.editedItem);
      }
      this.close();
    },
    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.users.splice(this.editedIndex, 1);
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
      if (this.editedIndex > -1) {
        Object.assign(this.users[this.editedIndex], this.editedItem);
      } else {
        this.users.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>