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
              max-height="300"
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
            </el-table>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>
<script>
export default {
  name: "c010107",
  props: {
    projectHisTblBean: {},
  },
  data() {
    return {
      name: "??????????????????",
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
        person: "???",
      },
      // ????????????????????????????????????
      titleChange: true,
      // ?????????????????????
      showSelect: false,
      promptMessage: {
        noTableData: "??????????????????????????????",
      },
    };
  },
  computed: {
    // ??????????????????????????????-????????????
    projectDateComputed() {
      return (row) => row.proDateFrom + "-" + row.proDateTo;
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
    // collapse????????????
    collapseChange(val) {
      if (val.length == 1) {
        // ??????????????????????????????
        this.tableRowClose();
      }
    },
    // ??????????????????????????????
    tableRowClose() {
      this.projectHisTblBean.map((item) => {
        this.$refs.projectHisTblBean.toggleRowExpansion(item, false);
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
