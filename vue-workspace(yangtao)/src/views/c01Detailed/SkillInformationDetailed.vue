<template>
  <el-card class="card-style">
    <el-collapse
      v-model="collapseIsActive"
      name="skillInformation"
      value="skillInformation"
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
            </el-table>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>
<script>
// ??????????????????????????????
export default {
  name: "c010103",
  rules: {},
  props: {
    applicantSkillTblBean: {},
    industryMstBean: {},
    jobtypeMstBean: {},
    skillMstBean: {},
  },
  data() {
    return {
      name: "?????????",
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
      promptMessage: {
        noTableData: "????????????????????????????????????",
      },
    };
  },
  computed: {
    // ??????????????????
    experienceSectionComputed() {
      return (row) => this.expSection[row.expSection].value;
    },
  },
  methods: {
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
