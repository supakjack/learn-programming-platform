<template>
  <v-card-text class="kanit-font">
    <v-container>
      <v-row>
        <v-col cols="12" sm="12" md="6">
          <!-- <v-text-field
                            v-model="editedItem.problemTitle"
                            label="ชื่อโจทย์ปัญหา"
                          ></v-text-field> -->
          <v-text-field label="ชื่อโจทย์ปัญหา"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <!-- <v-textarea
                            v-model="editedItem.problemDiscription"
                            label="คำอธิบาย"
                          ></v-textarea> -->
          <v-textarea label="คำอธิบาย"></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" sm="6" md="6">
          <!-- <v-text-field
                            v-model="editedItem.taskScore"
                            label="กำหนดคะแนน"
                          ></v-text-field> -->
          <v-text-field label="กำหนดคะแนน"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <!-- <v-select
            v-model="editedItem.problemStatus"
            :items="problemStatus"
            menu-props="auto"
            label="สถานะ"
            hide-details
            single-line
          ></v-select> -->
          <v-select
            menu-props="auto"
            label="สถานะ"
            hide-details
            single-line
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" sm="6" md="6">
          แท็ก
          <v-btn class="ma-2">เพิ่มแท็ก</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" sm="6" md="6">
          ภาพประกอบโจทย์
          <v-btn
            :loading="loading3"
            :disabled="loading3"
            color="blue-grey"
            class="ma-2 white--text"
            @click="loader = 'loading3'"
          >
            Upload
            <v-icon right dark>
              mdi-cloud-upload
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card-text>
</template>
