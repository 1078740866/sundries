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
            </el-table>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>
<script>
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
        workPosition: "??????",
        workPlace: "?????????",
        workDate: "????????????",
        workContent: "????????????",
        workSkill: "????????????",
        introduction: "????????????",
        workDateFrom: "?????????",
        workDateTo: "?????????",
      },
      promptMessage: {
        noTableData: "??????????????????",
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
    // collapse????????????
    collapseChange(val) {
      if (val.length == 1) {
        // ??????????????????????????????
        this.tableRowClose();
      }
    },
    // ??????????????????????????????
    tableRowClose() {
      this.applicantWorkHisTblBean.map((item) => {
        this.$refs.applicantWorkHisTblBean.toggleRowExpansion(item, false);
      });
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
</style>
