<template>
  <v-card-text class="kanit-font">
    <v-container>
      <v-row>
        <v-col cols="12" sm="12" md="6">
          <v-text-field label="หัวข้อ"></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <v-text-field label="คำอธิบาย"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="4">
          <v-text-field label="ข้อมูลนำเข้า"></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="2"> </v-col>
        <v-col cols="12" sm="12" md="4">
          <v-text-field label="ข้อมูลส่งออก"></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="2">
          <v-btn class="ma-2">เพิ่มแท็ก</v-btn>
        </v-col>
      </v-row>
      <v-simple-table fixed-header height="300px">
        <template v-slot:default>
          <thead>
            <tr cols="12">
              <th class="text-center" cols="1">
                ลำดับ
              </th>
              <th class="text-center" cols="3">
                ชื่อ
              </th>
              <th class="text-center" cols="2">
                ข้อมูลนำเข้า
              </th>
              <th class="text-center" cols="2">
                ข้อมูลส่งออก
              </th>
              <th class="text-center" cols="2">
                ตัวอย่าง
              </th>
              <th class="text-center" cols="2">
                การจัดการ
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in desserts" :key="item.testsetId">
              <td class="text-center">{{ item.testsetId }}</td>
              <td>{{ item.testsetTitle }}</td>
              <td class="text-center">{{ item.testsetInput }}</td>
              <td class="text-center">{{ item.testsetOutput }}</td>
              <td class="text-center" color="green">
                {{ item.testsetIsExample }}
              </td>
              <td></td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
  </v-card-text>
</template>

<script>
export default {
  data() {
    return {
      desserts: [
        {
          testsetId: 1,
          testsetTitle: "เลขจำนวนเต็ม",
          testsetInput: "1,2",
          testsetOutput: "100",
          testsetIsExample: "ใช้งาน"
        }
      ]
    };
  }
};
</script>
