<template>
  <v-card-text class="kanit-font">
    <v-container>
      <v-row>
        <v-col cols="12" sm="12" md="6">
          <v-text-field label="หัวข้อ" v-model="testsetTitle"></v-text-field>
          <v-text-field
            label="ข้อมูลนำเข้า"
            v-model="testsetInput"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="12" md="6">
          <v-text-field
            label="คำอธิบาย"
            v-model="testsetDescription"
          ></v-text-field>
          <v-text-field
            label="ข้อมูลส่งออก"
            v-model="testsetOutput"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-btn color="success" block @click="addTable()">
          เพิ่ม
        </v-btn>
      </v-row>
    </v-container>
    <v-container>
      <v-simple-table fixed-header height="100px">
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
                การจัดการ
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.testsetId">
              <td class="text-center">{{ item.testsetId }}</td>
              <td>{{ item.testsetTitle }}</td>
              <td class="text-center">{{ item.testsetInput }}</td>
              <td class="text-center">{{ item.testsetOutput }}</td>
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
  data: () => ({
    items: [],
    testsetId: "",
    testsetTitle: "",
    testsetDescription: "",
    testsetInput: "",
    testsetOutput: ""
  }),

  methods: {
    addTable() {
      let index = 0;
      if (this.items.length == null) {
        index = 1;
      } else {
        index = this.items.length + 1;
      }
      let obj = {
        testsetId: index,
        testsetTitle: this.testsetTitle,
        testsetDescription: this.testsetDescription,
        testsetInput: this.testsetInput,
        testsetOutput: this.testsetOutput
      };
      this.items.push(obj);
      this.$store.commit("problem/setProblem", {
        problem: {
          testset: this.items
        }
      });
    }
  }
};
</script>
