<template>
  <v-data-table
    :headers="headers"
    :items="users"
    :search="search"
    sort-by="userUsername"
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
                    <v-text-field
                      v-model="editedItem.userUsername"
                      label="รหัสผู้ใช้"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-autocomplete
                      v-model="editedItem.userPrefixThai"
                      :items="userPrefixThai"
                      label="คำนำหน้า"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.userFirstnameThai"
                      label="ชื่อจริง"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.userLastnameThai"
                      label="นามสกุล"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-autocomplete
                      v-model="editedItem.userStatus"
                      :items="userStatus"
                      label="สถานะ"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <div v-if="editedIndex === -1">
                  <div class="flex justify-center">หรือ</div>
                  <v-file-input label="Excel"></v-file-input>
                </div>
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
import usersmixin from "../../../components/users";
export default {
  mixins: [usersmixin],
  data: () => ({
    userPrefixThai: ["นาย", "นางสาว"],
    userStatus: ["ใช้งาน", "ปิด"],
    dialog: false,
    dialogDelete: false,
    search: "",
    headers: [
      {
        text: "รหัสนิสิต",
        align: "start",
        sortable: true,
        value: "userUsername",
      },
      { text: "คำนำหน้า", value: "userPrefixThai" },
      { text: "ชื่อ", value: "userFirstnameThai" },
      { text: "นามสกุล", value: "userLastnameThai" },
      { text: "สิทธิ์", value: "role" },
      { text: "สถานะ", value: "userStatus" },
      { text: "การจัดการ", value: "actions", sortable: false },
    ],
    users: [],
    editedIndex: -1,
    editedItem: {
      userPrefixThai: "",
      userFirstnameThai: "",
      userLastnameThai: "",
      userStatus: "",
    },
    defaultItem: {
      userPrefixThai: "",
      userFirstnameThai: "",
      userLastnameThai: "",
      userStatus: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "เพิ่มผู้ใช้งาน" : "แก้ไขผู้ใช้งาน";
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
    // initialize() {
    //   this.users = [
    //     {
    //       userPrefixThai: "นาย",
    //       userFirstnameThai: "Frozen",
    //       userLastnameThai: "Yogurt",
    //       userUsername: 159,
    //       role: "นักเรียน",
    //       userStatus: "ใช้งาน",
    //     },
    //     {
    //       userPrefixThai: "นางสาว",
    //       userFirstnameThai: "Ice cream sandwich",
    //       userUsername: 237,
    //       role: "นักเรียน",
    //       userStatus: "ใช้งาน",
    //     },
    //     {
    //       userPrefixThai: "นาย",

    //       userFirstnameThai: "Eclair",
    //       userUsername: 262,
    //       role: "นักเรียน",
    //       userStatus: "ใช้งาน",
    //     },
    //     {
    //       userPrefixThai: "นาย",

    //       userFirstnameThai: "Cupcake",
    //       userUsername: 305,
    //       role: "นักเรียน",
    //       userStatus: "ใช้งาน",
    //     },
    //     {
    //       userPrefixThai: "นาย",

    //       userFirstnameThai: "Gingerbread",
    //       userUsername: 356,
    //       role: "นักเรียน",
    //       userStatus: "ใช้งาน",
    //     },
    //     {
    //       userPrefixThai: "นาย",

    //       userFirstnameThai: "Jelly bean",
    //       userUsername: 375,
    //       role: "นักเรียน",
    //       userStatus: "ใช้งาน",
    //     },
    //     {
    //       userPrefixThai: "นาย",

    //       userFirstnameThai: "Lollipop",
    //       userUsername: 392,
    //       role: "นักเรียน",
    //       userStatus: "ใช้งาน",
    //     },
    //     {
    //       userPrefixThai: "นาย",

    //       userFirstnameThai: "Honeycomb",
    //       userUsername: 408,
    //       role: "นักเรียน",  
    //       userStatus: "ใช้งาน",
    //     },
    //     {
    //       userPrefixThai: "นาย",

    //       userFirstnameThai: "Donut",
    //       userUsername: 452,
    //       role: "นักเรียน",
    //       userStatus: "ใช้งาน",
    //     },
    //     {
    //       userPrefixThai: "นาย",

    //       userFirstnameThai: "KitKat",
    //       userUsername: 518,
    //       role: "นักเรียน",
    //       userStatus: "ใช้งาน",
    //     },
    //   ];
    // },
    async initialize() {
      const { doesGetAll } = await this.getUser();
      doesGetAll.map((doesGetAll) => {
        doesGetAll.userCreateDate = this.$moment(
          doesGetAll.userCreateDate
        ).format("Do MMM YY เวลา LT");
        doesGetAll.userUpdateDate = this.$moment(
          doesGetAll.userUpdateDate
        ).format("Do MMM YY เวลา LT");
        if (doesGetAll.useruserStatus == "active") {
          doesGetAll.useruserStatus = "ใช้งาน";
        } else {
          doesGetAll.useruserStatus = "ไม่ใช้งาน";
        }
      });
      this.users = doesGetAll;
      console.log(this.users);
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