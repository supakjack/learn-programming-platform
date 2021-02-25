<template>
  <v-card-text class="kanit-font">
    <v-container>
      <v-row>
        <v-col cols="12" sm="12" md="6">
          <v-text-field
            label="หัวข้อ"
            v-model="dataTestset.testsetTitle"
          ></v-text-field>
          <v-text-field
            label="ข้อมูลนำเข้า"
            v-model="dataTestset.testsetInput"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="12" md="6">
          <v-text-field
            label="คำอธิบาย"
            v-model="dataTestset.testsetDescription"
          ></v-text-field>
          <v-text-field
            label="ข้อมูลส่งออก"
            v-model="dataTestset.testsetOutput"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-btn v-if="isAdd" color="success" block @click="addTable">
          เพิ่ม
        </v-btn>
        <v-btn v-else color="warning" block @click="editTable">
          แก้ไข
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
                <v-icon
                  small
                  :disabled="isAdd == false"
                  class="mr-2"
                  @click="editItem(item, index)"
                >
                  mdi-pencil
                </v-icon>
                <v-icon
                  small
                  :disabled="isAdd == false"
                  @click="deleteItem(index)"
                >
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

    dataTestset: {
      testsetTitle: "",
      testsetDescription: "",
      testsetInput: "",
      testsetOutput: ""
    },
    isAdd: true,
    indexForEdit: -1
  }),

  methods: {
    async addTable() {
      this.items = await [
        ...this.items,
        {
          testsetTitle: this.dataTestset.testsetTitle,
          testsetDescription: this.dataTestset.testsetDescription,
          testsetInput: this.dataTestset.testsetInput,
          testsetOutput: this.dataTestset.testsetOutput
        }
      ];

      await this.$store.commit("problem/setProblem", {
        problem: {
          testset: this.items
        }
      });
      this.clear();
    },
    async editTable() {
      console.log(this.dataTestset);
      const {
        testsetTitle,
        testsetDescription,
        testsetInput,
        testsetOutput
      } = this.dataTestset;
      this.items[this.indexForEdit].testsetTitle = testsetTitle;
      this.items[this.indexForEdit].testsetDescription = testsetDescription;
      this.items[this.indexForEdit].testsetInput = testsetInput;
      this.items[this.indexForEdit].testsetOutput = testsetOutput;

      console.log(this.items);

      await this.$store.commit("problem/setProblem", {
        problem: {
          testset: this.items
        }
      });

      this.dataTestset.testsetTitle = "";
      this.dataTestset.testsetDescription = "";
      this.dataTestset.testsetInput = "";
      this.dataTestset.testsetOutput = "";
      this.isAdd = true;
    },
    async clear() {
      this.dataTestset.testsetTitle = "";
      this.dataTestset.testsetDescription = "";
      this.dataTestset.testsetInput = "";
      this.dataTestset.testsetOutput = "";
    },
    async deleteItem(index) {
      this.items = await this.items.filter((item, i) => i != index);
      await this.$store.commit("problem/setProblem", {
        problem: {
          testset: this.items
        }
      });
    },
    editItem(item, index) {
      this.indexForEdit = index;
      this.dataTestset.testsetTitle = item.testsetTitle;
      this.dataTestset.testsetDescription = item.testsetDescription;
      this.dataTestset.testsetInput = item.testsetInput;
      this.dataTestset.testsetOutput = item.testsetOutput;
      console.log(this.dataTestset);
      // this.testsetTitle = item.testsetTitle;
      // this.testsetDescription = item.testsetDescription;
      // this.testsetInput = item.testsetInput;
      // this.testsetOutput = item.testsetOutput;
      this.isAdd = false;
    }
  }
};
</script>
