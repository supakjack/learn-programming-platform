<template>
  <div>
    <v-card class="d-flex mb-4 flex flex-wrap" flat tile>
      <div v-for="(item, i) in subjects" :key="i" class="ml-2 mb-5">
        <v-card class="mx-auto" max-width="344" height="130" width="280">
          <v-divider color="blue"></v-divider>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">
                {{ item.id }} {{ item.name }}
              </v-list-item-title>
              <v-list-item-subtitle
                >ภาคเรียน {{ item.course }}/{{
                  item.year
                }}</v-list-item-subtitle
              >
              <v-list-item-subtitle class="text-right">
                กลุ่ม {{ item.group }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-card-actions>
            <v-list-item-subtitle
              >อัพเดทล่าสุดวันที่ {{ item.date }}</v-list-item-subtitle
            >
          </v-card-actions>
        </v-card>
      </div>

      <v-row>
        <v-dialog v-model="sectionDialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-card
              class="ml-5 mt-3"
              color="grey lighten-3"
              max-width="344"
              height="130"
              width="280"
              v-bind="attrs"
              v-on="on"
            >
              <v-divider color="blue"></v-divider>

              <v-card-text class="headline font-weight-bold text-center">
                เพิ่มรายวิชา
              </v-card-text>
              <v-row justify="space-around">
                <v-icon large color="blue"> mdi-plus-circle-outline </v-icon>
              </v-row>
            </v-card>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">เพิ่มรายวิชา</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="ปีการศึกษา*" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="ภาคเรียน*" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field label="รหัสวิชา*" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field label="ชื่อรายวิชา*" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="กลุ่มเรียน*" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      :items="['ใช้งาน', 'ปิดใช้งาน']"
                      label="สถานะ*"
                      required
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
              <small>*โปรดระบุข้อมูลที่ต้องการ</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="sectionDialog = false">
                ยกเลิก
              </v-btn>
              <v-btn color="blue darken-1" text @click="sectionDialog = false">
                บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-card>
  </div>
</template>
<script>
export default {
  middleware: "auth",
  data: () => ({
    sectionDialog: false,
    subjects: [
      {
        id: "88151518",
        name: "คิดเลขในใจ",
        course: "1",
        year: "2563",
        date: "15/10/2021",
        group: "1",
      },
      {
        id: "88151518",
        name: "คิดเลขในใจ",
        course: "1",
        year: "2563",
        date: "15/10/2021",
        group: "1",
      },
      {
        id: "88151518",
        name: "คิดเลขในใจ",
        course: "1",
        year: "2563",
        date: "15/10/2021",
        group: "1",
      },
      {
        id: "88151518",
        name: "คิดเลขในใจ",
        course: "1",
        year: "2563",
        date: "15/10/2021",
        group: "1",
      },
    ],
  }),
};
</script>