<template>
  <el-card class="card-style">
    <el-collapse
      v-model="collapseIsActive"
      name="workExperience"
      value="workExperience"
      @change="collapseChange"
    >
      <el-collapse-item name="workExperience" :title="name">
        <el-row>
          <el-col :span="24">
            <el-table
              ref="applicantWorkHisTblBean"
              :data="applicantWorkHisTblBean"
              :default-sort="{ prop: 'workDateFrom', order: 'descending' }"
              @row-dblclick="rowDoubleClick"
              row-key="workHisId"
              max-height="420"
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
                        <el-form-item :label="labelName.workPlace">
                          <p>{{ props.row.workPlace }}</p>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item :label="labelName.industryId1">
                          <p>{{ industryIdComputed(props.row) }}</p>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <!-- <el-row>
                      <el-col :span="12">
                        <el-form-item :label="labelName.jobtypeId1_2">
                          <p>{{ jobType2Computed(props.row.jobtypeId1_2) }}</p>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item :label="labelName.jobtypeId1_3">
                          <p>{{ jobType3Computed(props.row.jobtypeId1_3) }}</p>
                        </el-form-item>
                      </el-col>
                    </el-row> -->
                    <el-row>
                      <el-col :span="12">
                        <el-form-item :label="labelName.introduction">
                          <p>{{ props.row.introduction }}</p>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item :label="labelName.workSkill">
                          <p>{{ props.row.workSkill }}</p>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column prop="jobtypeId1_1" :label="labelName.jobType1">
                <template v-slot="jobTypeSlot">
                  {{ jobType1Computed(jobTypeSlot.row) }}
                </template>
              </el-table-column>
              <el-table-column prop="workPosition" :label="labelName.workPosition" />
              <el-table-column prop="companyNm" :label="labelName.companyNm" />
              <el-table-column prop="workDateFrom" :label="labelName.workDate" sortable>
                <template v-slot="workDateSlot">
                  {{ workDateComputed(workDateSlot.row) }}
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
            ref="c010104VueForm"
            :model="c010104VueForm"
            :rules="rules"
            label-width="23%"
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
                <el-form-item prop="companyNm" :label="labelName.companyNm">
                  <el-input
                    v-model.trim="c010104VueForm.companyNm"
                    :placeholder="labelName.companyNm"
                    maxlength="50"
                    show-word-limit
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="1">
                <el-form
                  ref="industryJobCascader"
                  :model="industryJobCascader"
                  :rules="rules"
                  label-width="23%"
                >
                  <el-form-item prop="industryJobType" :label="labelName.industryJob">
                    <el-cascader
                      ref="industryJobCascader"
                      @focus="setindustryJob"
                      @blur="industryJobCascaderBlur"
                      v-model="industryJobCascader.industryJobType"
                      :options="industryJob"
                      :props="{ expandTrigger: 'hover' }"
                      size="medium"
                      separator=" / "
                      filterable
                      clearable
                    />
                  </el-form-item>
                </el-form>
              </el-col>
              <!-- <el-col :span="1">
                <el-tooltip
                  :content="promptMessage.addJobType"
                  placement="top-start"
                  effect="light"
                  :open-delay="400"
                >
                  <span>
                    <el-button
                      type="primary"
                      icon="el-icon-plus"
                      @click="addJobType"
                      :disabled="jobTypeShow == 2 || industryJobIsNull"
                      circle
                    />
                  </span>
                </el-tooltip>
              </el-col> -->
            </el-row>
            <!-- <el-row>
              <el-col :span="10" :offset="1" v-show="jobTypeShow > 0">
                <el-form-item prop="jobtypeId1_2" :label="labelName.jobtypeId1_2">
                  <el-select
                    v-model="c010104VueForm.jobtypeId1_2"
                    :disabled="industryJobIsNull"
                    clearable
                  >
                    <el-option
                      v-for="(jobType1ComputedItem, index) in jobTypeComputed"
                      :key="`jobType1_2-${index}`"
                      :label="jobType1ComputedItem.jobtypeNm"
                      :value="jobType1ComputedItem.jobtypeId"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="1" v-show="jobTypeShow > 0">
                <el-tooltip
                  :content="promptMessage.minusJobType"
                  placement="bottom-start"
                  effect="light"
                  :open-delay="400"
                >
                  <span>
                    <el-button
                      type="primary"
                      icon="el-icon-minus"
                      @click="minusJobType"
                      :disabled="jobTypeShow == 0"
                      circle
                    />
                  </span>
                </el-tooltip>
              </el-col>
              <el-col :span="10" v-show="jobTypeShow > 1">
                <el-form-item prop="jobtypeId1_3" :label="labelName.jobtypeId1_3">
                  <el-select
                    v-model="c010104VueForm.jobtypeId1_3"
                    :disabled="industryJobIsNull"
                    clearable
                  >
                    <el-option
                      v-for="(jobType1ComputedItem, index) in jobTypeComputed"
                      :key="`jobType1_3-${index}`"
                      :label="jobType1ComputedItem.jobtypeNm"
                      :value="jobType1ComputedItem.jobtypeId"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row> -->
            <el-row>
              <el-col :span="10" :offset="1">
                <el-form-item prop="workPosition" :label="labelName.workPosition">
                  <el-input
                    v-model.trim="c010104VueForm.workPosition"
                    :placeholder="labelName.workPosition"
                    maxlength="50"
                    show-word-limit
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="1">
                <el-form-item prop="workPlace" :label="labelName.workPlace">
                  <el-input
                    v-model.trim="c010104VueForm.workPlace"
                    :placeholder="labelName.workPlace"
                    maxlength="200"
                    show-word-limit
                    clearable
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10" :offset="1">
                <el-form-item :label="labelName.workDate" required>
                  <el-col :span="11">
                    <el-form-item prop="workDateFrom">
                      <el-date-picker
                        v-model="c010104VueForm.workDateFrom"
                        :placeholder="labelName.workDateFrom"
                        :picker-options="dateFromPicker"
                        @change="changeEnd"
                        format="yyyy-MM-dd"
                        type="date"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="1" :offset="1">
                    <span>-</span>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item prop="workDateTo">
                      <el-date-picker
                        v-model="c010104VueForm.workDateTo"
                        :placeholder="labelName.workDateTo"
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
              <el-col :span="10" :offset="1">
                <el-form-item prop="workContent" :label="labelName.workContent">
                  <el-input
                    type="textarea"
                    v-model="c010104VueForm.workContent"
                    :placeholder="labelName.workContent"
                    maxlength="500"
                    show-word-limit
                    :autosize="{ minRows: 2 }"
                    clearable
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10" :offset="1">
                <el-form-item prop="workSkill" :label="labelName.workSkill">
                  <el-input
                    type="textarea"
                    v-model="c010104VueForm.workSkill"
                    :placeholder="labelName.workSkill"
                    maxlength="200"
                    show-word-limit
                    :autosize="{ minRows: 2 }"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="1">
                <el-form-item prop="introduction" :label="labelName.introduction">
                  <el-input
                    type="textarea"
                    v-model="c010104VueForm.introduction"
                    :placeholder="labelName.introduction"
                    maxlength="500"
                    show-word-limit
                    :autosize="{ minRows: 2 }"
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
  name: "c010104",
  props: {
    applicantWorkHisTblBean: {},
    industryMstBean: {},
    jobtypeMstBean: {},
  },
  data() {
    return {
      name: "??????",
      rules: {
        // ?????????????????????
        companyNm: [validateNecessary("?????????")],
        industryJobType: [validateSelect("??????-??????")],
        workPosition: [validateNecessary("??????")],
        workPlace: [validateNecessary("?????????")],
        workDateFrom: [validateSelect("?????????")],
        workDateTo: [validateSelect("?????????")],
        workContent: [validateNecessary("????????????")],
      },
      // collapse???????????????
      collapseIsActive: "",
      // ?????????????????????
      labelName: {
        workAdd: "????????????",
        workEdit: "????????????",
        companyNm: "?????????",
        industryJob: "??????-??????",
        industryId1: "??????",
        jobType1: "??????",
        // jobtypeId1_2: "??????2",
        // jobtypeId1_3: "??????3",
        workPosition: "??????",
        workPlace: "?????????",
        workDate: "????????????",
        workContent: "????????????",
        workSkill: "????????????",
        introduction: "????????????",
        workDateFrom: "?????????",
        workDateTo: "?????????",
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
        // addJobType: "??????-?????????????????????????????????????????????????????????",
        minusJobType: "???????????????",
        jobSelectAble: "??????-???????????????????????????????????????",
        serverProblem: "??????????????????????????????????????????",
        deleteSuccess: "????????????",
        deleteFailed: "????????????",
        noTableData: "??????????????????",
      },
      // ??????
      c010104VueForm: {
        companyId: "",
        userCd: "",
        workHisId: Number,
        applicantId: "",
        companyNm: "",
        industryId1: "",
        jobtypeId1_1: "",
        jobtypeId1_2: "",
        jobtypeId1_3: "",
        workPosition: "",
        workPlace: "",
        workSkill: "",
        workDateFrom: "",
        workDateTo: "",
        introduction: "",
        workContent: "",
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
      // ??????-??????
      industryJob: [],
      // ???????????????
      // jobTypeShow: 0,
      // ????????????????????????-??????
      industryJobCascader: {
        industryJobType: [],
      },
      // ??????-???????????????
      // industryJobIsNull: true,
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
    // ??????????????????-????????????
    workDateComputed() {
      return (row) => row.workDateFrom + "-" + row.workDateTo;
    },
    // ??????ID????????????
    industryIdComputed() {
      return (row) => this.industryMstBean[row.industryId1 - 1].industryNm;
    },
    // ??????ID????????????
    jobType1Computed() {
      return (row) => this.jobtypeMstBean[row.jobtypeId1_1].jobtypeNm;
    },
    // jobType2Computed() {
    //   return (jobType2) => this.jobtypeMstBean[jobType2].jobtypeNm;
    // },
    // jobType3Computed() {
    //   return (jobType3) => this.jobtypeMstBean[jobType3].jobtypeNm;
    // },
    // ??????????????????????????????????????????
    showNameComputed() {
      return this.titleChange ? this.labelName.workAdd : this.labelName.workEdit;
    },
    // ????????????????????????????????????????????????
    jobTypeComputed() {
      return this.jobtypeMstBean.filter(
        (item) => item.industryId == this.industryJobCascader.industryJobType[0]
      );
    },
  },
  watch: {
    // ??????-???????????????????????????
    // "industryJobCascader.industryJobType": function (v) {
    //   this.industryJobIsNull = v == "" ? true : false;
    //   if (v == "") {
    //     this.c010104VueForm.jobtypeId1_2 = "";
    //     this.c010104VueForm.jobtypeId1_3 = "";
    //   }
    // },
  },
  methods: {
    // ???????????????????????????????????????
    rowDoubleClick(row) {
      let $applicantWorkHisTblBean = this.$refs.applicantWorkHisTblBean;
      this.applicantWorkHisTblBean.map((item) => {
        // ?????????????????????
        if (row.workHisId != item.workHisId) {
          $applicantWorkHisTblBean.toggleRowExpansion(item, false);
        }
      });
      $applicantWorkHisTblBean.toggleRowExpansion(row);
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
      // this.jobTypeShow = 0;
      this.$refs.c010104VueForm.resetFields();
      this.$refs.industryJobCascader.resetFields();
    },
    // ???????????????
    editButton(row) {
      console.log("edit the data", row);
      this.titleChange = false;
      this.c010104VueForm.applicantId = parseInt(row.applicantId);
      this.c010104VueForm.workHisId = parseInt(row.workHisId);
      this.setData(row);
      this.setindustryJob();
      // ??????2 3???????????????
      // this.editShow(row);
      // ??????????????????
      this.selectOpen();
    },
    // ?????????????????????
    setData(row) {
      this.c010104VueForm.workHisId = row.workHisId;
      this.c010104VueForm.applicantId = row.applicantId;
      this.c010104VueForm.companyNm = row.companyNm;
      this.c010104VueForm.industryId1 = row.industryId1;
      this.c010104VueForm.jobtypeId1_1 = row.jobtypeId1_1;
      this.c010104VueForm.jobtypeId1_2 = row.jobtypeId1_2;
      this.c010104VueForm.jobtypeId1_3 = row.jobtypeId1_3;
      this.c010104VueForm.workPosition = row.workPosition;
      this.c010104VueForm.workPlace = row.workPlace;
      this.c010104VueForm.workSkill = row.workSkill;
      this.c010104VueForm.workDateFrom = row.workDateFrom;
      this.c010104VueForm.workDateTo = row.workDateTo;
      this.c010104VueForm.introduction = row.introduction;
      this.c010104VueForm.workContent = row.workContent;
      this.industryJobCascader.industryJobType = [row.industryId1, row.jobtypeId1_1];
    },
    // ????????????
    saveData() {
      this.c010104VueForm.applicantId = this.applicantWorkHisTblBean[0].applicantId;
      if (this.industryJobCascader.industryJobType[1]) {
        this.c010104VueForm.industryId1 = this.industryJobCascader.industryJobType[0];
        this.c010104VueForm.jobtypeId1_1 = this.industryJobCascader.industryJobType[1];
      } else this.$message.warning(this.promptMessage.nullMessage);
      console.log("c010104VueForm", this.c010104VueForm);
      // ????????????????????????
      this.$refs.c010104VueForm.validate((valid) => {
        if (valid) {
          this.$refs.industryJobCascader.validate((valid2) => {
            if (valid2) {
              this.$store
                .dispatch("workExperienceInsertWorkHis", this.c010104VueForm)
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
                    this.$message.error(response.data.message);
                    this.$router.push({
                      path: "/error",
                      query: { message: response.data.message },
                    });
                  }
                })
                .catch(() => {});
            } else {
              this.$message.warning(this.promptMessage.nullMessage);
            }
          });
        } else {
          this.industryJobCascaderBlur();
          this.$message.warning(this.promptMessage.nullMessage);
        }
      });
    },
    // cascader????????????
    industryJobCascaderBlur() {
      this.$refs.industryJobCascader.validate().catch(() => {});
    },
    // ????????????
    saveEditData() {
      this.c010104VueForm.jobtypeId1_1 = this.industryJobCascader.industryJobType[1];
      console.log("c010104VueForm", this.c010104VueForm);
      // ????????????????????????
      this.$refs.c010104VueForm.validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("workExperienceUpdateWorkHis", this.c010104VueForm)
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
        .dispatch("workExperienceDeleteWorkHis", row)
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
    setindustryJob() {
      this.industryJob = [];
      this.setIndustry();
      this.setJob();
      console.log("industryJob", this.industryJob);
    },
    // ???????????????????????????
    setIndustry() {
      let industryOptions = { value: "", label: "", children: [] };
      this.industryMstBean.forEach((industryElement) => {
        industryOptions.value = industryElement.industryId;
        industryOptions.label = industryElement.industryNm;
        this.industryJob.push(industryOptions);
        industryOptions = { value: "", label: "", children: [] };
      });
    },
    // ???????????????????????????
    setJob() {
      let jobOptions = { value: "", label: "" };
      this.jobtypeMstBean.forEach((jobElement) => {
        this.industryJob.forEach((industryJobElement) => {
          if (jobElement.industryId == industryJobElement.value) {
            jobOptions.value = jobElement.jobtypeId;
            jobOptions.label = jobElement.jobtypeNm;
            industryJobElement.children.push(jobOptions);
            jobOptions = { value: "", label: "" };
          }
        });
      });
    },
    // ????????????
    // addJobType() {
    //   if (this.jobTypeShow >= 0 && this.jobTypeShow < 2) {
    //     this.jobTypeShow++;
    //     console.log("jobTypeShow", this.jobTypeShow);
    //   }
    // },
    // ????????????
    // minusJobType() {
    //   if (this.jobTypeShow > 0 && this.jobTypeShow < 3) {
    //     this.jobTypeShow--;
    //     this.c010104VueForm.jobtypeId1_3 = "";
    //     if (this.jobTypeShow < 1) {
    //       this.c010104VueForm.jobtypeId1_2 = "";
    //     }
    //     console.log("jobTypeShow", this.jobTypeShow);
    //   }
    // },
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
      this.applicantWorkHisTblBean.map((item) => {
        this.$refs.applicantWorkHisTblBean.toggleRowExpansion(item, false);
      });
    },
    // ???????????????????????????????????????
    changeStart() {
      // ????????????????????????????????????
      if (!this.c010104VueForm.workDateTo) {
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
            date.getTime() > this.c010104VueForm.workDateTo || date.getTime() > Date.now()
          );
        },
      });
    },
    // ???????????????????????????????????????
    changeEnd() {
      // ????????????????????????????????????
      if (!this.c010104VueForm.workDateFrom) {
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
            date.getTime() < this.c010104VueForm.workDateFrom ||
            date.getTime() > Date.now()
          );
        },
      });
    },
    // ????????????2 3??????????????????
    // editShow(row) {
    //   if (row.jobtypeId1_2 != "") this.jobTypeShow++;
    //   if (row.jobtypeId1_3 != "") this.jobTypeShow++;
    // },
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
// ??????
.qua-add {
  font-size: 20px;
  color: #014099;
  margin-top: 2vh;
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
