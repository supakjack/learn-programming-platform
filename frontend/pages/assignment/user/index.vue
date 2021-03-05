<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="users"
      :search="search"
      sort-by="userUsername"
      class="elevation-1"
    >
      <template v-slot:item.userStatus="{ item }">
        <v-chip :color="getColor(item.userStatus)" dark>
          {{ item.userStatus }}
        </v-chip>
      </template>
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
              <v-btn color="success" dark class="mb-2" v-bind="attrs" v-on="on">
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
                    <v-col cols="12" sm="9" md="9">
                      <v-text-field
                        v-model="editedItem.userUsername"
                        label="รหัสผู้ใช้"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-btn color="blue darken-1" text @click="getUserLdap">
                        ค้นหา
                      </v-btn>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.userPrefixEnglish"
                        :items="userPrefixEnglish"
                        menu-props="auto"
                        label="Prefix"
                        hide-details
                        single-line
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="userLDAP.givenName"
                        label="Firstname"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="userLDAP.sn"
                        label="Lastname"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.userPrefixThai"
                        :items="userPrefixThai"
                        menu-props="auto"
                        label="คำนำหน้า"
                        hide-details
                        single-line
                      ></v-select>
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
                      <v-select
                        v-model="editedItem.userStatus"
                        :items="userStatus"
                        menu-props="auto"
                        label="สถานะ"
                        hide-details
                        single-line
                      ></v-select>
                    </v-col>
                  </v-row>
                  <div v-if="editedIndex === -1">
                    <div class="flex justify-center">หรือ</div>
                    <v-file-input label="Excel" v-model="file"></v-file-input>
                  </div>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  ยกเลิก
                </v-btn>
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
      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              color="orange"
              v-bind="attrs"
              v-on="on"
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
          </template>
          <span>แก้ไข</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              color="red"
              v-bind="attrs"
              v-on="on"
              small
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
          <span>ลบ</span>
        </v-tooltip>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> โหลดข้อมูลใหม่ </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import usersmixin from "../../../components/users";
export default {
  mixins: [usersmixin],
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: "",
    file: null,
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
      { text: "สิทธิ์", value: "enrollRole" },
      { text: "สถานะ", value: "userStatus" },
      { text: "การจัดการ", value: "actions", sortable: false },
    ],
    userLDAP: [],
    users: [],
    editedIndex: -1,
    editedItem: {
      userId: 0,
      userUsername: "",
      userPrefixThai: "",
      userFirstnameThai: "",
      userLastnameThai: "",
      userPrefixEnglish: "",
      userFirstnameEnglish: "",
      userLastnameEnglish: "",
      userStatus: 1,
      userCreateBy: 0,
      userUpdateBy: 0,
    },
    defaultItem: {
      userId: 0,
      userUsername: "",
      userPrefixThai: "",
      userFirstnameThai: "",
      userLastnameThai: "",
      userPrefixEnglish: "",
      userFirstnameEnglish: "",
      userLastnameEnglish: "",
      userStatus: 1,
      userCreateBy: 0,
      userUpdateBy: 0,
    },
    userStatus: [
      { text: "ใช้งาน", value: 1 },
      { text: "ไม่ใช้งาน", value: 2 },
    ],
    userPrefixEnglish: [{ text: "Mr." }, { text: "Mrs." }, { text: "Ms." }],
    userPrefixThai: [{ text: "นาง" }, { text: "นางสาว" }, { text: "นาย" }],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "เพิ่มผู้ใช้งาน" : "แก้ไขผู้ใช้งาน";
    },
  },
  mounted() {
    this.initialize();
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
    async initialize() {
      const { doesGetAll } = await this.getUser();
      doesGetAll.map((doesGetAll) => {
        doesGetAll.userCreateDate = this.$moment(
          doesGetAll.userCreateDate
        ).format("Do MMM YY เวลา LT");
        doesGetAll.userUpdateDate = this.$moment(
          doesGetAll.userUpdateDate
        ).format("Do MMM YY เวลา LT");
        if (doesGetAll.enrollRole == "student") {
          doesGetAll.enrollRole = "นักเรียน";
        } else {
          doesGetAll.enrollRole = "อาจารย์";
        }
        if (doesGetAll.userStatus == "active") {
          doesGetAll.userStatus = "ใช้งาน";
        } else {
          doesGetAll.userStatus = "ไม่ใช้งาน";
        }
      });
      this.users = doesGetAll;
      console.log(this.user);
    },

    async getUserLdap() {
      const { user } = await this.getUserByUsername(
        this.editedItem.userUsername
      );
      this.userLDAP = user;
      console.log(this.userLDAP);
    },
    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem.userId = item.userId;
      this.editedItem.userUsername = item.userUsername;
      this.editedItem.userPrefixEnglish = item.userPrefixEnglish;
      this.editedItem.userFirstnameEnglish = item.userFirstnameEnglish;
      this.editedItem.userLastnameEnglish = item.userLastnameEnglish;
      this.editedItem.userPrefixThai = item.userPrefixThai;
      this.editedItem.userFirstnameThai = item.userFirstnameThai;
      this.editedItem.userLastnameThai = item.userLastnameThai;
      this.editedItem.userStatus = item.userStatus;
      this.editedItem.userCreateBy = 1;
      this.editedItem.userUpdateBy = this.editedItem.userCreateBy;
      this.editedItem.userUpdateDate = this.$moment().format(
        "YYYY-MM-DD HH:mm:ss"
      );
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem.userId = item.userId;
      this.editedItem.userUsername = item.userUsername;
      this.editedItem.userPrefixEnglish = item.userPrefixEnglish;
      this.editedItem.userFirstnameEnglish = item.userFirstnameEnglish;
      this.editedItem.userLastnameEnglish = item.userLastnameEnglish;
      this.editedItem.userPrefixThai = item.userPrefixThai;
      this.editedItem.userFirstnameThai = item.userFirstnameThai;
      this.editedItem.userLastnameThai = item.userLastnameThai;
      this.editedItem.userStatus = item.userStatus;
      this.editedItem.userCreateBy = 1;
      this.editedItem.userUpdateBy = this.editedItem.userCreateBy;
      this.editedItem.userUpdateDate = this.$moment().format(
        "YYYY-MM-DD HH:mm:ss"
      );
      console.log(this.editedItem);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      const EditResult = await this.editUser(this.editedItem);
      console.log(EditResult);

      if (typeof EditResult === "number") {
        this.closeDelete();
      }
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

    async save() {
      // if  this.editedIndex > -1 == it edited tag else this.editedIndex == -1 insert tag
      if (this.editedIndex > -1) {
        console.log("userCreateBy 0");
        const EditResult = await this.editUser(this.editedItem);
        console.log(EditResult);
        if (typeof EditResult === "number") {
          this.dialog = false;
          this.SuccessTitle = "แก้ไขสำเร็จ";
          this.dialogSuccess = true;
        }
      } else {
        console.log("userCreateBy -1");
        // if (this.file != null) {
        //   console.log("file");
        //   const [insertResult] = await this.insertFile(this.file);

        //   if (typeof insertResult === "number") {
        //     this.close();
        //     this.SuccessTitle = "บันทึกสำเร็จ";
        //     this.dialogSuccess = true;
        //   }
        // } else {
        console.log("data");
        this.editedItem.userCreateBy = this.$store.state.user.id;
        this.editedItem.userUpdateBy = this.$store.state.user.id;
        this.editedItem.userFirstnameEnglish = this.userLDAP.givenName;
        this.editedItem.userLastnameEnglish = this.userLDAP.sn;
        /* warp */
        // console.log(this.userLDAP.cn);
        // console.log(this.users);
        if (
          !this.users.filter((user) => user.userUsername == this.userLDAP.cn)
            .length
        ) {
          console.log("insert");
          const [insertResult] = await this.insertUser(this.editedItem);
          if (typeof insertResult === "number") {
          }
          // }
          this.close();
          this.initialize();
          this.SuccessTitle = "บันทึกสำเร็จ";
          this.dialogSuccess = true;
        }
      }
      await this.initialize();
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
    getColor(userStatus) {
      if (userStatus == "ไม่ใช้งาน") return "red";
      else return "green";
    },
  },
};
</script>
