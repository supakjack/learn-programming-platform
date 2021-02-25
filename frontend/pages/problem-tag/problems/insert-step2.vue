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
        <v-btn color="success" block @click="addTable">
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
            <tr v-for="(item, index) in items" :key="index">
              <td class="text-center">{{ index + 1 }}</td>
              <td>{{ item.testsetTitle }}</td>
              <td class="text-center">{{ item.testsetInput }}</td>
              <td class="text-center">{{ item.testsetOutput }}</td>
              <td class="text-center">
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)">
                  mdi-delete
                </v-icon>
              </td>
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
    async addTable() {
      this.items = await [
        ...this.items,
        {
          testsetTitle: this.testsetTitle,
          testsetDescription: this.testsetDescription,
          testsetInput: this.testsetInput,
          testsetOutput: this.testsetOutput
        }
      ];

      await this.$store.commit("problem/setProblem", {
        problem: {
          testset: this.items
        }
      });
    }
  }
};
</script>
