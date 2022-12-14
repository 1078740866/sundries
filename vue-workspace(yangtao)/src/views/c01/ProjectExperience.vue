<template>
  <el-card class="card-style">
    <el-collapse
      v-model="collapseIsActive"
      name="projectExperience"
      value="projectExperience"
      @change="collapseChange"
    >
      <el-collapse-item name="projectExperience" :title="name">
        <el-row>
          <el-col :span="24">
            <el-table
              ref="projectHisTblBean"
              :data="projectHisTblBean"
              :default-sort="{ prop: 'proDateFrom', order: 'ascending' }"
              @row-dblclick="rowDoubleClick"
              row-key="projectId"
              max-height="350"
              :empty-text="promptMessage.noTableData"
              highlight-current-row
              stripe
            >
              <el-table-column type="index" />
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form :model="props" label-position="top">
                    <el-row>
                      <el-col :span="12">
                        <el-form-item :label="labelName.proCnt">
                          <p>{{ props.row.proCnt }} {{ labelName.person }}</p>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item :label="labelName.proTec">
                          <p>{{ props.row.proTec }}</p>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item :label="labelName.proContent">
                          <p>{{ props.row.proContent }}</p>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item :label="labelName.proDuties">
                          <p>{{ props.row.proDuties }}</p>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column prop="projectNm" :label="labelName.projectNm" />
              <el-table-column prop="proDateFrom" :label="labelName.proDate" sortable>
                <template v-slot="proDateSlot">
                  {{ projectDateComputed(proDateSlot.row) }}
                </template>
              </el-table-column>
              <el-table-column prop="proRole" :label="labelName.proRole" />
              <el-table-column fixed="right" width="30">
                <template slot-scope="editScope">
                  <el-tooltip
                    :content="promptMessage.editButton"
                    effect="light"
                    placement="top-start"
                    :open-delay="400"
                  >
                    <el-button
                      type="text"
                      size="large"
                      @click.native.prevent="editButton(editScope.row)"
                    >
                      <em class="el-icon-edit-outline" />
                    </el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column fixed="right" width="30">
                <template slot-scope="deleteScope">
                  <el-tooltip
                    :content="promptMessage.deleteButton"
                    effect="light"
                    placement="right"
                    :open-delay="400"
                  >
                    <el-button
                      @click.native.prevent="confirmMessageBox(deleteScope.row)"
                      type="text"
                    >
                      <em class="el-icon-delete" />
                    </el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :span="21"
            :offset="1"
            v-text="showNameComputed"
            v-show="showSelect"
            class="qua-add"
          />
          <el-col :span="2" :offset="22" v-show="!showSelect">
            <el-tooltip
              :content="promptMessage.addButton"
              effect="light"
              placement="right"
              :open-delay="400"
            >
              <el-button type="text" @click="selectOpen">
                <em class="el-icon-circle-plus" />
              </el-button>
            </el-tooltip>
          </el-col>
          <el-col :span="2" v-show="showSelect">
            <el-tooltip
              :content="promptMessage.closeButton"
              effect="light"
              placement="right"
              :open-delay="400"
            >
              <el-button @click="selectClose" type="text">
                <em class="el-icon-remove" />
              </el-button>
            </el-tooltip>
          </el-col>
        </el-row>
        <transition name="el-zoom-in-center">
          <el-form
            ref="c010107VueForm"
            :model="c010107VueForm"
            :rules="rules"
            label-width="21%"
            v-show="showSelect"
            class="select-style"
          >
            <el-row>
              <el-col :span="2" :offset="20">
                <el-tooltip
                  :content="promptMessage.clearButton"
                  effect="light"
                  placement="left"
                  :open-delay="400"
                >
                  <el-button type="text" @click="clearForm">
                    <em class="el-icon-document-remove" />
                  </el-button>
                </el-tooltip>
              </el-col>
              <el-col :span="2" v-show="titleChange">
                <el-tooltip
                  :content="promptMessage.saveButton"
                  effect="light"
                  placement="right"
                  :open-delay="400"
                >
                  <el-button type="text" @click="saveData">
                    <el-image :src="require('@/assets/save-icon-blue.svg')" />
                  </el-button>
                </el-tooltip>
              </el-col>
              <el-col :span="2" v-show="!titleChange">
                <el-tooltip
                  :content="promptMessage.saveEditButton"
                  effect="light"
                  placement="right"
                  :open-delay="400"
                >
                  <el-button type="text" @click="saveEditData">
                    <el-image :src="require('@/assets/save-icon-blue.svg')" />
                  </el-button>
                </el-tooltip>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10" :offset="1">
                <el-form-item prop="projectNm" :label="labelName.projectNm">
                  <el-input
                    v-model.trim="c010107VueForm.projectNm"
                    :placeholder="promptMessage.projectNm"
                    maxlength="40"
                    show-word-limit
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="1">
                <el-form-item :label="labelName.proDate" required>
                  <el-col :span="11">
                    <el-form-item prop="proDateFrom">
                      <el-date-picker
                        v-model="c010107VueForm.proDateFrom"
                        :placeholder="labelName.proDateFrom"
                        :picker-options="dateFromPicker"
                        @change="changeEnd"
                        format="yyyy-MM-dd"
                        type="date"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="1">
                    <span>-</span>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item prop="proDateTo">
                      <el-date-picker
                        v-model="c010107VueForm.proDateTo"
                        :placeholder="labelName.proDateTo"
                        :picker-options="dateToPicker"
                        @change="changeStart"
                        format="yyyy-MM-dd"
                        prefix-icon=" "
                        type="date"
                      />
                    </el-form-item>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10" :offset="1">
                <el-form-item prop="proContent" :label="labelName.proContent">
                  <el-input
                    type="textarea"
                    v-model="c010107VueForm.proContent"
                    :placeholder="labelName.proContent"
                    maxlength="500"
                    show-word-limit
                    :autosize="{ minRows: 4 }"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="1">
                <el-row>
                  <el-col :span="24">
                    <el-form-item prop="proCnt" :label="labelName.proCnt">
                      <el-input
                        v-model.number="c010107VueForm.proCnt"
                        :placeholder="labelName.proCnt"
                        @input="numValid('proCnt')"
                        maxlength="5"
                        clearable
                      >
                        <span slot="suffix" v-text="labelName.person" />
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item prop="proRole" :label="labelName.proRole">
                      <el-input
                        v-model.trim="c010107VueForm.proRole"
                        :placeholder="labelName.proRole"
                        maxlength="50"
                        show-word-limit
                        clearable
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10" :offset="1">
                <el-form-item prop="proDuties" :label="labelName.proDuties">
                  <el-input
                    v-model.trim="c010107VueForm.proDuties"
                    :placeholder="labelName.proDuties"
                    maxlength="200"
                    show-word-limit
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="1">
                <el-form-item prop="proTec" :label="labelName.proTec">
                  <el-input
                    v-model.trim="c010107VueForm.proTec"
                    :placeholder="labelName.proTec"
                    maxlength="200"
                    show-word-limit
                    clearable
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </transition>
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>
<script>
import { validateNecessary, validateSelect } from "@/utils/validate";
export default {
  name: "c010107",
  props: {
    projectHisTblBean: {},
  },
  watch: {
    // ???????????????????????????????????????
    "c010107VueForm.proCnt": function (v) {
      this.c010107VueForm.proCnt = v.replace(/[???-???]/g, (s) => {
        return String.fromCharCode(s.charCodeAt(0) - 65248);
      });
    },
  },
  data() {
    return {
      name: "??????????????????",
      rules: {
        projectNm: [validateNecessary("?????????")],
        proContent: [validateNecessary("????????????")],
        proDateFrom: [validateSelect("????????????")],
        proDateTo: [validateSelect("????????????")],
      },
      pickerOptions: {
        // ???????????????????????????????????????
        disabledDate(birthday) {
          return birthday.getTime() > Date.now();
        },
      },
      // collapse???????????????
      collapseIsActive: "",
      // ?????????????????????
      labelName: {
        projectNm: "?????????",
        proDate: "????????????",
        proContent: "????????????",
        proDuties: "????????????",
        proTec: "????????????",
        proRole: "??????",
        proCnt: "????????????",
        projectAdd: "????????????????????????",
        projectEdit: "????????????????????????",
        person: "???",
      },
      // ????????????????????????????????????
      titleChange: true,
      // ?????????????????????
      showSelect: false,
      // ????????????????????????
      promptMessage: {
        saveButton: "???????????????",
        saveEditButton: "???????????????",
        addButton: "???????????????",
        clearButton: "??????????????????",
        deleteButton: "???????????????",
        editButton: "???????????????",
        closeButton: "????????????",
        nullMessage: "???????????????????????????????????????????????????",
        serverProblem: "??????????????????????????????????????????",
        deleteSuccess: "????????????",
        deleteFailed: "????????????",
        noTableData: "??????????????????????????????",
      },
      c010107VueForm: {
        companyId: "",
        userCd: "",
        projectId: "",
        applicantId: "",
        projectNm: "",
        proDateFrom: "",
        proDateTo: "",
        proRole: "",
        proCnt: "",
        proDuties: "",
        proTec: "",
        proContent: "",
      },
      // ???????????????????????????
      deleteMessage: {
        title: "??????",
        message: "??????????????????????????????",
        yes: "??????",
        no: "?????????",
        success: "???????????????????????????",
        failed: "????????????????????????????????????",
      },
      // ????????????
      dateFromPicker: {
        // ???????????????????????????????????????
        disabledDate: (date) => {
          return date.getTime() > Date.now();
        },
      },
      // ????????????
      dateToPicker: {
        // ???????????????????????????????????????
        disabledDate: (date) => {
          return date.getTime() > Date.now();
        },
        // ???????????????
        shortcuts: [
          {
            text: "??????",
            // ????????????????????????
            onClick(picker) {
              var date = "9999-01-01 00:00:00.000";
              var t = Date.parse(date);
              if (!isNaN(t)) {
                t = new Date(Date.parse(date.replace(/-/g, "/")));
              } else {
                t = new Date();
              }
              picker.$emit("pick", t);
            },
          },
        ],
      },
    };
  },
  computed: {
    // ??????????????????????????????-????????????
    projectDateComputed() {
      return (row) => row.proDateFrom + "-" + row.proDateTo;
    },
    // ??????????????????????????????????????????
    showNameComputed() {
      return this.titleChange ? this.labelName.projectAdd : this.labelName.projectEdit;
    },
  },
  methods: {
    // ???????????????????????????????????????
    rowDoubleClick(row) {
      let $projectHisTblBean = this.$refs.projectHisTblBean;
      this.projectHisTblBean.map((item) => {
        // ?????????????????????
        if (row.projectId != item.projectId) {
          $projectHisTblBean.toggleRowExpansion(item, false);
        }
      });
      $projectHisTblBean.toggleRowExpansion(row);
    },
    // ??????????????????
    selectOpen() {
      this.showSelect = true;
    },
    // ?????????????????????
    selectClose() {
      this.clearForm();
      this.titleChange = true;
      this.showSelect = false;
    },
    // ????????????????????????
    clearForm() {
      this.$refs.c010107VueForm.resetFields();
    },
    // ???????????????
    editButton(row) {
      console.log("edit the data", row);
      this.titleChange = false;
      this.c010107VueForm.applicantId = parseInt(row.applicantId);
      this.c010107VueForm.projectId = parseInt(row.projectId);
      this.setData(row);
      // ??????????????????
      this.selectOpen();
    },
    // ?????????????????????
    setData(row) {
      this.c010107VueForm.projectId = row.projectId;
      this.c010107VueForm.applicantId = row.applicantId;
      this.c010107VueForm.projectNm = row.projectNm;
      this.c010107VueForm.proDateFrom = row.proDateFrom;
      this.c010107VueForm.proDateTo = row.proDateTo;
      this.c010107VueForm.proRole = row.proRole;
      this.c010107VueForm.proCnt = row.proCnt;
      this.c010107VueForm.proDuties = row.proDuties;
      this.c010107VueForm.proTec = row.proTec;
      this.c010107VueForm.proContent = row.proContent;
    },
    // ????????????
    saveData() {
      this.c010107VueForm.applicantId = this.projectHisTblBean[0].applicantId;
      console.log("c010107VueForm", this.c010107VueForm);
      // ????????????????????????
      this.$refs.c010107VueForm.validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("projectExperienceInsertProjectHis", this.c010107VueForm)
            .then((response) => {
              let code = response.data.code;
              if (code == 200) {
                // ?????????????????????
                this.$message.success(response.data.message);
                // ???????????????????????????
                this.selectClose();
                // ????????????????????????????????????
                this.$parent.initData();
                // ?????????????????????
                this.clearForm();
                // ???????????????????????????
                this.resetDateFrom();
              } else if (code == 400 || code == 404) {
                this.$message.error(response.data.message);
              } else if (code == 500) {
                this.$message.error(response.data.serverProblem);
              } else {
                this.$router.push({
                  path: "/error",
                  query: { message: response.data.message },
                });
                this.$message.error(response.data.message);
              }
            })
            .catch(() => {});
        } else {
          this.$message.warning(this.promptMessage.nullMessage);
        }
      });
    },
    // ????????????
    saveEditData() {
      console.log("c010107VueForm", this.c010107VueForm);
      // ????????????????????????
      this.$refs.c010107VueForm.validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("projectExperienceUpdateProjectHis", this.c010107VueForm)
            .then((response) => {
              let code = response.data.code;
              if (code == 200) {
                // ?????????????????????
                this.$message.success(response.data.message);
                // ???????????????????????????
                this.selectClose();
                // ????????????????????????????????????
                this.$parent.initData();
                // ?????????????????????
                this.clearForm();
              } else if (code == 400 || code == 404) {
                this.$message.error(response.data.message);
              } else if (code == 500) {
                this.$message.error(response.data.serverProblem);
              } else {
                this.$router.push({
                  path: "/error",
                  query: { message: response.data.message },
                });
                this.$message.error(response.data.message);
              }
            })
            .catch(() => {});
        } else {
          this.$message.warning(this.promptMessage.nullMessage);
        }
      });
    },
    // ??????????????????????????????
    confirmMessageBox(row) {
      console.log("delete popup", row);
      // ????????????????????????????????????
      this.$confirm(this.deleteMessage.message, this.deleteMessage.title, {
        type: "warning",
        confirmButtonText: this.deleteMessage.yes,
        cancelButtonText: this.deleteMessage.no,
      })
        // ?????????????????????
        .then(() => {
          this.deleteButton(row);
        })
        // ???????????????????????????
        .catch(() => {
          this.$message.info(this.deleteMessage.failed);
        });
    },
    // ????????????????????????
    deleteButton(row) {
      console.log("delete row data", row);
      this.$store
        .dispatch("projectExperienceDeleteProjectHis", row)
        .then((response) => {
          // response???????????????
          let code = response.data.code;
          // ???????????????
          if (code == 200) {
            // ????????????????????????????????????
            this.$parent.initData();
            // ?????????????????????
            this.$message.success(this.promptMessage.deleteSuccess);
          } else if (code == 400 || code == 404) {
            this.$message.error(this.promptMessage.deleteFailed);
          } else if (code == 500) {
            this.$message.error(response.data.serverProblem);
          } else {
            this.$router.push({
              path: "/error",
              query: { message: response.data.message },
            });
            // ?????????????????????
            this.$message.error(this.promptMessage.deleteFailed);
          }
        })
        .catch(() => {});
    },
    // dateFrom???????????????
    resetDateFrom() {
      this.dateFromPicker = {
        disabledDate: (date) => {
          return date.getTime() > Date.now();
        },
      };
    },
    // collapse????????????
    collapseChange(val) {
      if (val.length == 1) {
        // ??????????????????????????????
        this.tableRowClose();
        // ????????????????????????
        this.selectClose();
      }
    },
    // ??????????????????????????????
    tableRowClose() {
      this.projectHisTblBean.map((item) => {
        this.$refs.projectHisTblBean.toggleRowExpansion(item, false);
      });
    },
    // ???????????????????????????????????????
    changeStart() {
      // ????????????????????????????????????
      if (!this.c010107VueForm.proDateTo) {
        this.dateFromPicker = {
          disabledDate: (date) => {
            return date.getTime() > Date.now();
          },
        };
        return;
      }
      this.dateFromPicker = Object.assign({}, this.dateFromPicker, {
        // ?????????????????????
        disabledDate: (date) => {
          // ???????????? < ?????? && ???????????? < ????????????
          return (
            date.getTime() > this.c010107VueForm.proDateTo || date.getTime() > Date.now()
          );
        },
      });
    },
    // ???????????????????????????????????????
    changeEnd() {
      // ????????????????????????????????????
      if (!this.c010107VueForm.proDateFrom) {
        this.dateFromPicker = {
          disabledDate: (date) => {
            return date.getTime() > Date.now();
          },
        };
        return;
      }
      this.dateToPicker = Object.assign({}, this.dateToPicker, {
        // ?????????????????????
        disabledDate: (date) => {
          // ???????????? < ?????? && ???????????? > ????????????
          return (
            date.getTime() < this.c010107VueForm.proDateFrom ||
            date.getTime() > Date.now()
          );
        },
      });
    },
    // ????????????????????????
    numValid(val) {
      this.c010107VueForm[val] = this.c010107VueForm[val].replace(/[^0-9???-???]/g, "");
    },
  },
};
</script>
<style lang="scss" scoped>
// ????????????????????????
.card-style {
  margin: 2vh 10%;
}
// collapse??????
.el-collapse {
  border: none;
}
// collapse???????????????
::v-deep .el-collapse-item__header {
  font-size: 28px;
  color: #409eff;
}
// coolapse?????????
::v-deep .el-collapse-item__header,
::v-deep .el-collapse-item__wrap {
  border-bottom: none;
}
// ??????????????????
::v-deep div > .el-form-item__label {
  font-size: 16px;
  color: #014099;
  font-style: normal;
  font-weight: bold;
}
// ????????????????????????
.el-icon-circle-plus,
.el-icon-remove,
.el-icon-document-checked,
.el-icon-document-remove,
.el-icon-postcard {
  font-size: 30px;
}
.el-icon-edit-outline,
.el-icon-delete {
  font-size: 20px;
}
// ??????
.qua-add {
  font-size: 20px;
  color: #014099;
  margin-top: 2vh;
}
// ???????????????
.select-style {
  margin-top: 5vh;
}
// ??????????????????
::v-deep div > .el-form-item__label {
  font-size: 16px;
  color: #014099;
  font-style: normal;
  font-weight: bold;
}
// ?????????????????????????????????
::v-deep .el-input--suffix .el-input__inner {
  border: none;
  border-bottom: 1px solid #dcdfe6;
}
// ????????????????????????
::v-deep .el-input,
::v-deep textarea {
  width: 100%;
}
// ?????????????????????????????????????????????????????????????????????
::v-deep div > .el-textarea > textarea {
  overflow: hidden;
  resize: none;
}
// ??????????????????????????????
::v-deep .el-input__count {
  background-color: transparent;
  // position: relative;
}
</style>
