<template>
  <v-card-text class="kanit-font">
    <v-container>
      <v-row style="margin-top:-30px">
        <v-col cols="12" sm="12" md="5">
          <v-text-field
            label="ชื่อชุดข้อมูลทดสอบ"
            v-model="dataTestset.testsetTitle"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="12" md="7">
          <v-text-field
            label="คำอธิบาย"
            v-model="dataTestset.testsetDescription"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="5">
          <v-textarea
            label="ข้อมูลนำเข้า"
            v-model="dataTestset.testsetInput"
            style="margin-top:-30px; "
            rows="4"
          ></v-textarea>
        </v-col>
        <v-col cols="12" sm="12" md="5">
          <v-textarea
            label="ข้อมูลส่งออก"
            v-model="dataTestset.testsetOutput"
            style="margin-top:-30px;"
            rows="4"
          ></v-textarea>
        </v-col>
        <v-col cols="12" sm="12" md="2">
          <v-checkbox
            v-model="dataTestset.testsetIsExample"
            label="ข้อมูลตัวอย่าง"
            color="info"
            style="margin-top:-20px;"
          ></v-checkbox>
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
      <v-simple-table fixed-header>
        <template v-slot:default>
          <thead>
            <tr cols="12">
              <th class="text-center" cols="1">
                ชุดที่
              </th>
              <th class="text-center" cols="3">
                ชื่อชุดข้อมูลทดสอบ
              </th>
              <th class="text-center" cols="2">
                ข้อมูลนำเข้า
              </th>
              <th class="text-center" cols="2">
                ข้อมูลส่งออก
              </th>
              <th class="text-center" cols="2">
                ข้อมูลตัวอย่าง
              </th>
              <th class="text-center" cols="2">
                ดำเนินการ
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td class="text-center">{{ index + 1 }}</td>
              <td>{{ item.testsetTitle }}</td>
              <td class="text-center">{{ item.testsetInput }}</td>
              <td class="text-center">{{ item.testsetOutput }}</td>
              <td class="text-center" v-if="item.testsetIsExample == 1">
                ใช้
              </td>
              <td class="text-center" v-else>ไม่ใช้</td>
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
  props: {
    watchArray: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    items: [],

    dataTestset: {
      testsetTitle: "",
      testsetDescription: "",
      testsetInput: "",
      testsetOutput: "",
      testsetIsExample: 0
    },
    isAdd: true,
    indexForEdit: -1
  }),
  mounted() {
    // console.log("step1" + this.$store.state.problem.id);
    this.watchArray.map((e, i) => {
      if (e.name == "testset") {
        this.items = e.val;
      }
    });
    this.$store.commit("problem/setTestset", {
      problem: {
        testset: this.items
      }
    });
  },
  computed: {},

  watch: {
    watchArray: function(newValue, oldValue) {
      this.watchArray.map((e, i) => {
        if (e.name == "testset") {
          this.items = e.val;
        }
      });
      this.$store.commit("problem/setTestset", {
        problem: {
          testset: this.items
        }
      });
    }
  },

  methods: {
    async addTable() {
      this.items = await [
        ...this.items,
        {
          testsetTitle: this.dataTestset.testsetTitle,
          testsetDescription: this.dataTestset.testsetDescription,
          testsetInput: this.dataTestset.testsetInput,
          testsetOutput: this.dataTestset.testsetOutput,
          testsetIsExample: this.dataTestset.testsetIsExample
        }
      ];

      await this.$store.commit("problem/setTestset", {
        problem: {
          testset: this.items
        }
      });
      this.clear();
    },

    async editTable() {
      const {
        testsetTitle,
        testsetDescription,
        testsetInput,
        testsetOutput,
        testsetIsExample
      } = this.dataTestset;
      this.items[this.indexForEdit].testsetTitle = testsetTitle;
      this.items[this.indexForEdit].testsetDescription = testsetDescription;
      this.items[this.indexForEdit].testsetInput = testsetInput;
      this.items[this.indexForEdit].testsetOutput = testsetOutput;
      this.items[this.indexForEdit].testsetIsExample = testsetIsExample;

      await this.$store.commit("problem/setTestset", {
        problem: {
          testset: this.items
        }
      });

      this.dataTestset.testsetTitle = "";
      this.dataTestset.testsetDescription = "";
      this.dataTestset.testsetInput = "";
      this.dataTestset.testsetOutput = "";
      this.dataTestset.testsetIsExample = 0;
      this.isAdd = true;
    },
    async clear() {
      this.dataTestset.testsetTitle = "";
      this.dataTestset.testsetDescription = "";
      this.dataTestset.testsetInput = "";
      this.dataTestset.testsetOutput = "";
      this.dataTestset.testsetIsExample = 0;
    },
    async deleteItem(index) {
      this.items = await this.items.filter((item, i) => i != index);
      await this.$store.commit("problem/setTestset", {
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
      this.dataTestset.testsetIsExample = item.testsetIsExample;
      this.isAdd = false;
    }
  }
};
</script>
