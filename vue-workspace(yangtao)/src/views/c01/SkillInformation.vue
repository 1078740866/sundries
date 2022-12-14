<template>
  <el-card class="card-style">
    <el-collapse
      v-model="collapseIsActive"
      name="skillInformation"
      value="skillInformation"
      @change="collapseChange"
    >
      <el-collapse-item name="skillInformation" :title="name">
        <el-row>
          <el-col :span="24">
            <el-table
              ref="applicantSkillTblBean"
              :data="applicantSkillTblBean"
              :default-sort="{
                prop: 'expSection',
                order: 'descending',
              }"
              row-key="applicantskillId"
              max-height="240"
              :empty-text="promptMessage.noTableData"
              highlight-current-row
              stripe
            >
              <el-table-column type="index" />
              <el-table-column prop="skillId" :label="labelName.industryNm">
                <template v-slot="industrySlot">
                  <div v-for="skillItem in skillMstBean" :key="skillItem.skillId">
                    <div v-if="skillItem.skillId == industrySlot.row.skillId">
                      <div
                        v-for="industryItem in industryMstBean"
                        :key="industryItem.industryId"
                      >
                        <span v-if="industryItem.industryId == skillItem.industryId">
                          {{ industryItem.industryNm }}
                        </span>
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="skillId"
                :label="labelName.jobTypeNm"
                min-width="100%"
              >
                <template v-slot="jobTypeSlot">
                  <div v-for="skillItem in skillMstBean" :key="skillItem.skillId">
                    <div v-if="skillItem.skillId == jobTypeSlot.row.skillId">
                      <div
                        v-for="jobTypeItem in jobtypeMstBean"
                        :key="jobTypeItem.jobtypeId"
                      >
                        <span v-if="jobTypeItem.jobtypeId == skillItem.jobtypeId">
                          {{ jobTypeItem.jobtypeNm }}
                        </span>
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="skillNm" :label="labelName.skillNm">
                <template v-slot="skillNameSlot">
                  <span v-if="skillNameSlot.row.skillNm !== labelName.otherNm">
                    {{ skillNameSlot.row.skillNm }}
                  </span>
                  <span v-else>
                    {{ skillNameSlot.row.otherNm }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="expSection" :label="labelName.expSection" sortable>
                <template v-slot="experienceSectionSlot">
                  {{ experienceSectionComputed(experienceSectionSlot.row) }}
                </template>
              </el-table-column>
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
            ref="c010103VueForm"
            :model="c010103VueForm"
            :rules="rules"
            label-width="17%"
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
              <el-col :span="21" :offset="1">
                <el-form-item prop="skillId" :label="labelName.industryJobSkill">
                  <el-cascader
                    @visible-change="setindustryJobSkill"
                    @blur="industryJobCascaderBlur"
                    v-model="c010103VueForm.skillId"
                    :options="industryJobSkill"
                    :props="{ expandTrigger: 'hover' }"
                    size="medium"
                    separator=" / "
                    filterable
                    clearable
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="21" :offset="1">
                <el-form-item prop="expSection" :label="labelName.expSection">
                  <el-select v-model="c010103VueForm.expSection" clearable>
                    <el-option
                      v-for="experienceItem in expSection"
                      :key="experienceItem.key"
                      :label="experienceItem.value"
                      :value="experienceItem.key"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="21" :offset="1">
                <el-form-item prop="otherNm" :label="labelName.otherName">
                  <el-input
                    v-model.trim="c010103VueForm.otherNm"
                    :placeholder="promptMessage.otherName"
                    maxlength="100"
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
// ??????????????????????????????
import { validateSelect } from "@/utils/validate";
export default {
  name: "c010103",
  rules: {},
  props: {
    applicantSkillTblBean: {},
    industryMstBean: {},
    jobtypeMstBean: {},
    skillMstBean: {},
  },
  watch: {
    // ?????????????????????????????????
    "c010103VueForm.otherNm": function (v) {
      this.c010103VueForm.otherNm = v.replace(/[???-???]/g, (s) => {
        return String.fromCharCode(s.charCodeAt(0) - 65248);
      });
    },
  },
  data() {
    return {
      name: "?????????",
      rules: {
        skillId: [validateSelect("?????????")],
        expSection: [validateSelect("????????????")],
      },
      // collapse???????????????
      collapseIsActive: "",
      // ????????????
      expSection: [
        { key: "0", value: "????????????????????????" },
        { key: "1", value: "???????????????1?????????" },
        { key: "2", value: "???????????????3?????????" },
        { key: "3", value: "????????????????????????" },
      ],
      // ?????????????????????
      labelName: {
        applicantID: "?????????ID",
        skillNm: "?????????",
        expSection: "????????????",
        skillAdd: "???????????????",
        skillEdit: "???????????????",
        industryNm: "??????",
        jobTypeNm: "??????",
        industryJobSkill: "??????-??????-?????????",
        otherName: "???????????????",
        otherNm: "?????????",
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
        otherName: "??????????????????????????????????????????????????????????????????????????????",
        serverProblem: "??????????????????????????????????????????",
        deleteSuccess: "????????????",
        deleteFailed: "????????????",
        noTableData: "????????????????????????????????????",
      },
      // ??????
      c010103VueForm: {
        companyId: "",
        userCd: "",
        appSkillId: "",
        applicantId: "",
        skillId: "",
        expSection: "",
        otherNm: "",
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
      // ??????-??????-?????????
      industryJobSkill: [],
    };
  },
  computed: {
    // ??????????????????
    experienceSectionComputed() {
      return (row) => this.expSection[row.expSection].value;
    },
    // ??????????????????????????????????????????
    showNameComputed() {
      return this.titleChange ? this.labelName.skillAdd : this.labelName.skillEdit;
    },
  },
  methods: {
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
      this.$refs.c010103VueForm.resetFields();
    },
    // ???????????????
    editButton(row) {
      console.log("edit the data", row);
      this.titleChange = false;
      this.c010103VueForm.applicantId = parseInt(row.applicantId);
      this.c010103VueForm.appSkillId = parseInt(row.appSkillId);
      this.setData(row);
      this.setindustryJobSkill();
      console.log("c010103VueForm", this.c010103VueForm);
      // ??????????????????
      this.selectOpen();
    },
    // ?????????????????????
    setData(row) {
      this.c010103VueForm.applicantId = row.applicantId;
      this.c010103VueForm.appSkillId = row.appSkillId;
      this.c010103VueForm.expSection = row.expSection;
      this.c010103VueForm.otherNm = row.otherNm;
      this.c010103VueForm.skillId = this.getJobId(row.skillId);
    },
    // ????????????
    saveData() {
      this.c010103VueForm.applicantId = this.applicantSkillTblBean[0].applicantId;
      this.c010103VueForm.skillId = this.c010103VueForm.skillId[2];
      console.log("c010103VueForm", this.c010103VueForm);
      // ????????????????????????
      this.$refs.c010103VueForm.validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("skillInformationInsertSkill", this.c010103VueForm)
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
    // ????????????
    saveEditData() {
      this.c010103VueForm.skillId = this.c010103VueForm.skillId[2];
      console.log("c010103VueForm", this.c010103VueForm);
      // ????????????????????????
      this.$refs.c010103VueForm.validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("skillInformationUpdateSkill", this.c010103VueForm)
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
        .dispatch("skillInformationDeleteSkill", row)
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
    // ??????????????????????????????????????????
    setindustryJobSkill() {
      this.setIndustry();
      this.setJob();
      this.setSkill();
      console.log("industryJobSkill", this.industryJobSkill);
    },
    // ???????????????????????????
    setIndustry() {
      this.industryJobSkill = [];
      let industryOptions = { value: "", label: "", children: [] };
      this.industryMstBean.forEach((industryElement) => {
        industryOptions.value = industryElement.industryId;
        industryOptions.label = industryElement.industryNm;
        this.industryJobSkill.push(industryOptions);
        industryOptions = { value: "", label: "", children: [] };
      });
    },
    // ???????????????????????????
    setJob() {
      let jobOptions = { value: "", label: "", children: [] };
      this.jobtypeMstBean.forEach((jobElement) => {
        this.industryJobSkill.forEach((industryJobSkillElement) => {
          if (jobElement.industryId == industryJobSkillElement.value) {
            jobOptions.value = jobElement.jobtypeId;
            jobOptions.label = jobElement.jobtypeNm;
            industryJobSkillElement.children.push(jobOptions);
            jobOptions = { value: "", label: "", children: [] };
          }
        });
      });
    },
    // ??????????????????????????????
    setSkill() {
      let skillOptions = { value: "", label: "" };
      this.skillMstBean.forEach((skillElement) => {
        this.industryJobSkill.forEach((industryJobSkillElement) => {
          industryJobSkillElement.children.forEach((industryJobSkillChildrenElement) => {
            if (
              skillElement.industryId == industryJobSkillElement.value &&
              skillElement.jobtypeId == industryJobSkillChildrenElement.value
            ) {
              skillOptions.value = skillElement.skillId;
              skillOptions.label = skillElement.skillNm;
              industryJobSkillChildrenElement.children.push(skillOptions);
              skillOptions = { value: "", label: "" };
            }
          });
        });
      });
    },
    // ??????????????????????????????????????????????????????
    isOtherNm() {
      this.oterNameShow = false;
      this.skillMstBean.forEach((skillElement) => {
        if (
          skillElement.skillNm == this.labelName.otherNm &&
          this.c010103VueForm.skillId[2] == skillElement.skillId
        ) {
          this.oterNameShow = true;
        }
      });
      console.log("oterNameShow", this.oterNameShow);
      return this.oterNameShow;
    },
    // ?????????ID?????????ID ??????ID
    getJobId(skillId) {
      var job = "";
      var industry = "";
      this.skillMstBean.forEach((skillElement) => {
        if (skillElement.skillId == skillId) {
          job = skillElement.jobtypeId;
          industry = skillElement.industryId;
        }
      });
      let industryJobSkill = [industry, job, skillId];
      return industryJobSkill;
    },
    // collapse????????????
    collapseChange(val) {
      if (val.length == 1) {
        // ????????????????????????
        this.selectClose();
      }
    },
    // cascader????????????
    industryJobCascaderBlur() {
      this.$refs.industryJobCascader.validate().catch(() => {});
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
::v-deep .el-input__inner {
  border: none;
  border-bottom: 1px solid #dcdfe6;
}
// ????????????????????????
::v-deep .el-input,
::v-deep .el-select,
::v-deep .el-cascader {
  width: 100%;
}
</style>
