<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="users"
      :search="search"
      sort-by="userUsername"
      class="elevation-1 .kanit-font"
    >
      <template v-slot:[`item.userStatus`]="{ item }">
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
          <v-dialog v-model="dialog" max-width="700px">
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
                        label="รหัสผู้ใช้*"
                        hint="กรอกรหัสนิสิต 8 หลัก"
                        maxlength="8"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <!-- <v-btn color="blue darken-1" text @click="getUserLdap">
                        ค้นหา
                      </v-btn> -->
                      <template>
                        <div>
                          <v-dialog
                            v-model="checkPassword"
                            persistent
                            max-width="600px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                color="primary"
                                dark
                                v-bind="attrs"
                                v-on="on"
                              >
                                ค้นหา
                              </v-btn>
                            </template>
                            <v-card>
                              <v-card-title>
                                <span class="headline"
                                  >ยืนยันรหัสผ่านที่ใช้เข้าสู่ระบบ</span
                                >
                              </v-card-title>
                              <v-card-text>
                                <v-container>
                                  <v-row>
                                    <v-col cols="12" sm="12" md="12">
                                      <v-text-field
                                        v-model="password"
                                        label="ยืนยันรหัสผ่าน*"
                                        hint="กรอกรหัสผ่านของตนเอง"
                                        type="password"
                                        required
                                      ></v-text-field>
                                    </v-col>
                                  </v-row>
                                </v-container>
                                <small>*จำเป็นต้องกรอกรหัสผ่าน</small>
                              </v-card-text>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                  color="blue darken-1"
                                  text
                                  @click="checkPassword = false"
                                >
                                  ปิด
                                </v-btn>
                                <v-btn
                                  v-if="files == undefined"
                                  color="blue darken-1"
                                  text
                                  @click="getUserLdap"
                                >
                                  ยืนยัน1
                                </v-btn>
                                <v-btn
                                  v-else
                                  color="blue darken-1"
                                  text
                                  @click="checkPassword = false"
                                >
                                  ยืนยัน2
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </div>
                      </template>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.userPrefixEnglish"
                        :items="userPrefixEnglish"
                        menu-props="auto"
                        label="คำนำหน้า (ภาษาอังกฤษ)"
                        hide-details
                        single-line
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <div v-if="editedIndex === -1">
                        <v-text-field
                          v-model="userLDAP.givenName"
                          label="ชื่อจริง (ภาษาอังกฤษ)"
                          hint="กรอกชื่อจริงภาษาอังกฤษ"
                        ></v-text-field>
                      </div>
                      <div v-else>
                        <v-text-field
                          v-model="editedItem.userFirstnameEnglish"
                          :items="userFirstnameEnglish"
                          label="ชื่อจริง (ภาษาอังกฤษ)"
                          hint="กรอกชื่อจริงภาษาอังกฤษ"
                        ></v-text-field>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <div v-if="editedIndex === -1">
                        <v-text-field
                          v-model="userLDAP.sn"
                          label="นามสกุล (ภาษาอังกฤษ)"
                          hint="กรอกนามสกุลภาษาอังกฤษ"
                        ></v-text-field>
                      </div>
                      <div v-else>
                        <v-text-field
                          v-model="editedItem.userLastnameEnglish"
                          :items="userLastnameEnglish"
                          label="นามสกุล (ภาษาอังกฤษ)"
                          hint="กรอกนามสกุลภาษาอังกฤษ"
                        ></v-text-field>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.userPrefixThai"
                        :items="userPrefixThai"
                        menu-props="auto"
                        label="คำนำหน้า (ภาษาไทย)"
                        hide-details
                        single-line
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.userFirstnameThai"
                        label="ชื่อจริง (ภาษาไทย)"
                        hint="กรอกชื่อจริงภาษาไทย"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.userLastnameThai"
                        label="นามสกุล (ภาษาไทย)"
                        hint="กรอกนามสกุลภาษาไทย"
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
                    <div>
                      <v-col cols="12">
                        <v-card color="primary" dark>
                          <v-card-title class="headline">
                            อัปโหลดรายชื่อผู้ใช้งานแบบกลุ่ม
                            <v-spacer></v-spacer>
                            <v-btn
                              color="secondary"
                              href="\example_users.xlsx"
                              download
                              >ตัวอย่าง</v-btn
                            >
                          </v-card-title>
                          <v-card-subtitle>
                            สำหรับเพิ่มผู้ใช้งานเข้ากลุ่มเรียน (ใช้ได้เฉพาะไฟล์
                            Excel)
                          </v-card-subtitle>
                          <v-card-actions>
                            <div class="flex justify-center text-black">
                              <input
                                type="file"
                                name="singleFile"
                                multiple
                                @change="saveExcel"
                              />
                            </div>
                          </v-card-actions>
                        </v-card>
                      </v-col>
                    </div>
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
                >คุณต้องการลบผู้ใช้งานคนนี้หรือไม่?</v-card-title
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
    <template>
      <div>
        <v-snackbar v-model="snackbar" :timeout="timeout">
          {{ text }}
          <template v-slot:action="{ attrs }">
            <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
              ปิด
            </v-btn>
          </template>
        </v-snackbar>
      </div>
      <div>
        <v-snackbar v-model="snackbar1" :timeout="timeout">
          {{ text1 }}
          <template v-slot:action="{ attrs }">
            <v-btn color="pink" text1 v-bind="attrs" @click="snackbar1 = false">
              ปิด
            </v-btn>
          </template>
        </v-snackbar>
      </div>
    </template>
  </div>
</template>

<script>
import usersmixin from "../../../components/users";
export default {
  mixins: [usersmixin],
  data: () => ({
    checkPassword: false,
    password: null,
    snackbar: false,
    text: `มีรหัสนิสิตนี้แล้ว กรุณากรอกใหม่!!!`,
    timeout: 2000,
    snackbar1: false,
    text1: `กรุณาตรวจสอบข้อมูลให้ถูกต้อง`,
    dialog: false,
    dialogDelete: false,
    search: "",
    files: undefined,
    headers: [
      {
        text: "รหัสนิสิต",
        align: "start",
        sortable: true,
        value: "userUsername",
      },
      { text: "คำนำหน้า (TH)", value: "userPrefixThai" },
      { text: "ชื่อ (TH)", value: "userFirstnameThai" },
      { text: "นามสกุล (TH)", value: "userLastnameThai" },
      { text: "คำนำหน้า (EN)", value: "userPrefixEnglish" },
      { text: "ชื่อ (EN)", value: "userFirstnameEnglish" },
      { text: "นามสกุล (EN)", value: "userLastnameEnglish" },
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

  mounted() {},

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    files(val) {
      this.checkPassword = true;
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      const { doesGetAll } = await this.getUser();
      doesGetAll.map((doesGetAll) => {
        let dayCreateDate = this.$moment(doesGetAll.userCreateDate).format(
          "Do"
        );
        let monthCreateDate = this.$moment(doesGetAll.userCreateDate).format(
          "MMM"
        );
        let yearCreateDate =
          this.$moment(doesGetAll.userCreateDate.getFullYear).year() + 543;
        let timeCreateDate = this.$moment(doesGetAll.userCreateDate).format(
          " เวลา LT"
        );
        doesGetAll.userCreateDate =
          dayCreateDate +
          " " +
          monthCreateDate +
          " " +
          yearCreateDate +
          timeCreateDate;

        let dayUpdateDate = this.$moment(doesGetAll.userUpdateDate).format(
          "Do"
        );
        let monthUpdateDate = this.$moment(doesGetAll.userUpdateDate).format(
          "MMM"
        );
        let yearUpdateDate =
          this.$moment(doesGetAll.userUpdateDate.getFullYear).year() + 543;
        let timeUpdateDate = this.$moment(doesGetAll.userUpdateDate).format(
          " เวลา LT"
        );
        doesGetAll.userUpdateDate =
          dayUpdateDate +
          " " +
          monthUpdateDate +
          " " +
          yearUpdateDate +
          timeUpdateDate;

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
    },

    async getUserLdap() {
      try {
        const { user } = await this.getUserByUsername([
          this.password,
          this.editedItem.userUsername,
        ]);
        this.userLDAP = user;
      } catch (error) {
        this.snackbar1 = true;
      }
      this.checkPassword = false;
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
      this.editedItem.userCreateBy = this.$store.state.user.id;
      this.editedItem.userUpdateBy = this.$store.state.user.id;
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
      this.editedItem.userCreateBy = this.$store.state.user.id;
      this.editedItem.userUpdateBy = this.$store.state.user.id;
      this.editedItem.userUpdateDate = this.$moment().format(
        "YYYY-MM-DD HH:mm:ss"
      );
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      const EditResult = await this.editUser(this.editedItem);
      this.closeDelete();
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

    async save() {
      // if  this.editedIndex > -1 == it edited user else this.editedIndex == -1 insert user
      if (this.password != null || this.editedItem.userUsername != "") {
        // edit user
        if (this.editedIndex > -1) {
          const EditResult = await this.editUser(this.editedItem);
          if (typeof EditResult === "number") {
            this.dialog = false;
          }
        }
        // insert user
        else {
          if (this.files != undefined) {
            let formData = new FormData();
            if (this.files) {
              for (let file of this.files) {
                formData.append("singleFile", file);
              }
              formData.append("sectionId", this.$store.state.course.sectionId);
              formData.append("userId", this.$store.state.user.id);
            }
            const insertExcelResult = await this.insertFile(formData);
            this.close();
          } else {
            this.editedItem.userFirstnameEnglish = this.userLDAP.givenName;
            this.editedItem.userLastnameEnglish = this.userLDAP.sn;
            this.editedItem.userCreateBy = this.$store.state.user.id;
            this.editedItem.userUpdateBy = this.$store.state.user.id;
            if (
              !this.users.filter(
                (user) => user.userUsername == this.userLDAP.cn
              ).length
            ) {
              const insertResult = await this.insertUser(this.editedItem);
              this.close();
            } else {
              this.snackbar = true;
            }
          }
        }
      } else {
        this.snackbar1 = true;
      }
      await this.initialize();
    },

    async saveExcel(excel) {
      this.files = excel.currentTarget.files;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.userLDAP.givenName = "";
        this.userLDAP.sn = "";
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
<style lang="scss">
.roboto-font {
  font-family: "Roboto", sans-serif;
}
.kanit-font {
  font-family: "Kanit", sans-serif;
}
</style>
