<template>
  <el-card class="card-style">
    <el-collapse
      v-model="collapseIsActive"
      name="personalInformation"
      value="personalInformation"
    >
      <el-collapse-item name="personalInformation" :title="name">
        <el-form
          ref="applicantInfoTblBean"
          :model="applicantInfoTblBean"
          label-width="8vw"
        >
          <el-row class="avatar-row">
            <el-col :span="11">
              <el-form-item>
                <el-image :src="applicantInfoTblBean.photoPic" fit="contain">
                  <div slot="error" class="image-slot">
                    <el-avatar shape="square" :size="130" icon="el-icon-user-solid" />
                  </div>
                </el-image>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="2">
              <el-row>
                <el-col :span="24" class="user-name-style">
                  {{ userInfoBean.firstName + " " + userInfoBean.lastName }}
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10" :offset="1">
              <div v-if="countryIdComputed[0]">
                <el-form-item
                  :label="labelName.countryId"
                  v-show="applicantInfoTblBean.countryId != ''"
                >
                  {{ countryIdComputed[0].countryNm }}
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-form-item
                :label="labelName.birthday"
                v-show="applicantInfoTblBean.birthday != ''"
              >
                {{ applicantInfoTblBean.birthday }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10" :offset="1">
              <el-form-item :label="labelName.applicantPostal">
                <el-form ref="postalCode" :model="postalCode">
                  <el-form-item>
                    {{ postalCode.postal1 }}-{{ postalCode.postal2 }}
                  </el-form-item>
                </el-form>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-form-item
                :label="labelName.address1"
                v-show="applicantInfoTblBean.address1 != ''"
              >
                {{ applicantInfoTblBean.address1 }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10" :offset="1">
              <el-form-item
                :label="labelName.station"
                v-show="applicantInfoTblBean.station != ''"
              >
                {{ applicantInfoTblBean.station }} {{ labelName.stationUnit }}
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-form-item
                :label="labelName.address2"
                v-show="applicantInfoTblBean.address2 != ''"
              >
                {{ applicantInfoTblBean.address2 }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10" :offset="1">
              <el-form-item
                :label="labelName.graduationSchool"
                v-show="applicantInfoTblBean.graduationSchool != ''"
              >
                {{ applicantInfoTblBean.graduationSchool }}
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-form-item
                :label="labelName.graduationMajor"
                v-show="applicantInfoTblBean.graduationMajor != ''"
              >
                {{ applicantInfoTblBean.graduationMajor }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10" :offset="1">
              <div v-if="finalEducationComputed[0]">
                <el-form-item
                  :label="labelName.finalEducation"
                  v-show="applicantInfoTblBean.finalEducation != ''"
                >
                  {{ finalEducationComputed[0].label }}
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-form-item
                :label="labelName.workYears"
                v-show="applicantInfoTblBean.workYears != ''"
              >
                {{ applicantInfoTblBean.workYears }} {{ labelName.year }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10" :offset="1">
              <el-form-item
                :label="labelName.hopeSalary"
                v-show="applicantInfoTblBean.hopeSalaryFrom != ''"
              >
                {{ applicantInfoTblBean.hopeSalaryFrom }}
                {{ labelName.salaryUnit }}
                <span v-show="applicantInfoTblBean.hopeSalaryTo != ''">-</span>
                {{ applicantInfoTblBean.hopeSalaryTo }}
                {{ labelName.salaryUnit }}
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1">
              <div v-if="workSituationComputed[0]">
                <el-form-item
                  :label="labelName.workSituation"
                  v-show="applicantInfoTblBean.workSituation != ''"
                >
                  {{ workSituationComputed[0].label }}
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10" :offset="1">
              <div v-if="industryId1Computed[0]">
                <el-form-item
                  :label="labelName.industryId"
                  v-show="applicantInfoTblBean.industryId1 != ''"
                >
                  {{ industryId1Computed[0].industryNm }}
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="11" :offset="1">
              <div v-if="jobType1_1Computed[0]">
                <el-form-item
                  :label="labelName.jobtypeId"
                  v-show="applicantInfoTblBean.jobType1_1 != ''"
                >
                  {{ jobType1_1Computed[0].jobtypeNm }}
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11" :offset="12">
              <div v-if="jobType1_2Computed[0]">
                <el-form-item
                  :label="labelName.jobtypeId2"
                  v-show="applicantInfoTblBean.jobType1_2 != ''"
                >
                  {{ jobType1_2Computed[0].jobtypeNm }}
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11" :offset="12">
              <div v-if="jobType1_3Computed[0]">
                <el-form-item
                  :label="labelName.jobtypeId3"
                  v-show="applicantInfoTblBean.jobType1_3 != ''"
                >
                  {{ jobType1_3Computed[0].jobtypeNm }}
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10" :offset="1">
              <div v-if="industryId2Computed[0]">
                <el-form-item
                  :label="labelName.industryId2"
                  v-show="applicantInfoTblBean.industryId2 != ''"
                >
                  {{ industryId2Computed[0].industryNm }}
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="11" :offset="1">
              <div v-if="jobType2_1Computed[0]">
                <el-form-item
                  :label="labelName.jobtypeId2_1"
                  v-show="applicantInfoTblBean.jobType2_1 != ''"
                >
                  {{ jobType2_1Computed[0].jobtypeNm }}
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11" :offset="12">
              <div v-if="jobType2_2Computed[0]">
                <el-form-item
                  :label="labelName.jobtypeId2_2"
                  v-show="applicantInfoTblBean.jobType2_2 != ''"
                >
                  {{ jobType2_2Computed[0].jobtypeNm }}
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11" :offset="12">
              <div v-if="jobType2_3Computed[0]">
                <el-form-item
                  :label="labelName.jobtypeId2_3"
                  v-show="applicantInfoTblBean.jobType2_3 != ''"
                >
                  {{ jobType2_3Computed[0].jobtypeNm }}
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10" :offset="1">
              <div v-if="industryId3Computed[0]">
                <el-form-item
                  :label="labelName.industryId3"
                  v-show="applicantInfoTblBean.industryId3 != ''"
                >
                  {{ industryId3Computed[0].industryNm }}
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="11" :offset="1">
              <div v-if="jobType3_1Computed[0]">
                <el-form-item
                  :label="labelName.jobtypeId3_1"
                  v-show="applicantInfoTblBean.jobType3_1 != ''"
                >
                  {{ jobType3_1Computed[0].jobtypeNm }}
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11" :offset="12">
              <div v-if="jobType3_2Computed[0]">
                <el-form-item
                  :label="labelName.jobtypeId3_2"
                  v-show="applicantInfoTblBean.jobType3_2 != ''"
                >
                  {{ jobType3_2Computed[0].jobtypeNm }}
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11" :offset="12">
              <div v-if="jobType3_3Computed[0]">
                <el-form-item
                  :label="labelName.jobtypeId3_3"
                  v-show="applicantInfoTblBean.jobType3_3 != ''"
                >
                  {{ jobType3_3Computed[0].jobtypeNm }}
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10" :offset="1">
              <div v-if="hopeLand1Computed[0]">
                <el-form-item
                  :label="labelName.hopeLand"
                  v-show="applicantInfoTblBean.hopeLand1 != ''"
                >
                  {{ hopeLand1Computed[0].prefeNm }}
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10" :offset="1">
              <div v-if="hopeLand2Computed[0]">
                <el-form-item
                  :label="labelName.hopeLand2"
                  v-show="applicantInfoTblBean.hopeLand2 != ''"
                >
                  {{ hopeLand2Computed[0].prefeNm }}
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="10" :offset="1">
              <div v-if="hopeLand3Computed[0]">
                <el-form-item
                  :label="labelName.hopeLand3"
                  v-show="applicantInfoTblBean.hopeLand3 != ''"
                >
                  {{ hopeLand3Computed[0].prefeNm }}
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10" :offset="1">
              <el-form-item
                :label="labelName.interest"
                v-show="applicantInfoTblBean.interest != ''"
              >
                {{ applicantInfoTblBean.interest }}
              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
              <el-form-item
                :label="labelName.specialty"
                v-show="applicantInfoTblBean.specialty != ''"
              >
                {{ applicantInfoTblBean.specialty }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="21" :offset="1">
              <el-form-item
                :label="labelName.reason"
                v-show="applicantInfoTblBean.reason != ''"
              >
                {{ applicantInfoTblBean.reason }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="21" :offset="1">
              <el-form-item
                :label="labelName.introduce"
                v-show="applicantInfoTblBean.introduce != ''"
              >
                {{ applicantInfoTblBean.introduce }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="21" :offset="1">
              <el-form-item
                :label="labelName.remarks"
                v-show="applicantInfoTblBean.remarks != ''"
              >
                {{ applicantInfoTblBean.remarks }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>
<script>
export default {
  name: "c010101",
  data() {
    return {
      name: "????????????",
      // ??????collapse??????
      collapseIsActive: ["", "personalInformation"],
      // ??????????????????????????????
      labelName: {
        countryId: "??????",
        birthday: "????????????",
        applicantPostal: "????????????",
        address1: "??????",
        address2: "????????????",
        station: "?????????",
        stationUnit: "???",
        industryId: "??????",
        industryId2: "??????2",
        industryId3: "??????3",
        jobtypeId: "??????",
        jobtypeId2: "??????",
        jobtypeId3: "??????",
        jobtypeId2_1: "??????",
        jobtypeId2_2: "??????",
        jobtypeId2_3: "??????",
        jobtypeId3_1: "??????",
        jobtypeId3_2: "??????",
        jobtypeId3_3: "??????",
        hopeLand: "???????????????",
        hopeLand2: "???????????????2",
        hopeLand3: "???????????????3",
        graduationSchool: "????????????",
        graduationMajor: "??????",
        finalEducation: "????????????",
        workYears: "????????????",
        year: "???",
        hopeSalary: "????????????",
        hopeSalaryFrom: "????????????",
        salaryUnit: "??????",
        hopeSalaryTo: "????????????",
        workSituation: "????????????",
        specialty: "??????",
        reason: "????????????",
        introduce: "????????????",
        interest: "??????",
        remarks: "??????",
      },
      //????????????
      finalEducation: [
        { value: "1", label: "???????????????????????????" },
        { value: "2", label: "????????????" },
        { value: "3", label: "????????????" },
        { value: "4", label: "??????" },
        { value: "5", label: "?????????????????????" },
        { value: "6", label: "?????????????????????" },
        { value: "0", label: "?????????" },
      ],
      // ????????????
      workSituation: [
        { value: "0", label: "?????????" },
        { value: "1", label: "?????????" },
      ],
    };
  },
  props: {
    // ????????????
    applicantInfoTblBean: {},
    // ??????????????????
    userInfoBean: {},
    // ??????
    countryMstBean: {},
    // ??????
    industryMstBean: {},
    // ??????
    jobtypeMstBean: {},
    // ?????????
    prefecturesMstBean: {},
    // ????????????
    postalCode: {
      postal1: "",
      postal2: "",
    },
  },
  computed: {
    // ??????????????????????????????
    userName() {
      return sessionStorage.getItem("userNameA")
        ? sessionStorage.getItem("userNameA")
        : sessionStorage.getItem("userName")
        ? sessionStorage.getItem("userName")
        : sessionStorage.getItem("userNameC");
    },
    industryId1Computed() {
      return this.applicantInfoTblBean.industryId1 != ""
        ? this.industryMstBean.filter(
            (item) => item.industryId == this.applicantInfoTblBean.industryId1
          )
        : "";
    },
    industryId2Computed() {
      return this.applicantInfoTblBean.industryId2 != ""
        ? this.industryMstBean.filter(
            (item) => item.industryId == this.applicantInfoTblBean.industryId2
          )
        : "";
    },
    industryId3Computed() {
      return this.applicantInfoTblBean.industryId3 != ""
        ? this.industryMstBean.filter(
            (item) => item.industryId == this.applicantInfoTblBean.industryId3
          )
        : "";
    },
    hopeLand1Computed() {
      return this.applicantInfoTblBean.hopeLand1 != ""
        ? this.prefecturesMstBean.filter(
            (item) => item.prefeId == this.applicantInfoTblBean.hopeLand1
          )
        : "";
    },
    hopeLand2Computed() {
      return this.applicantInfoTblBean.hopeLand2 != ""
        ? this.prefecturesMstBean.filter(
            (item) => item.prefeId == this.applicantInfoTblBean.hopeLand2
          )
        : "";
    },
    hopeLand3Computed() {
      return this.applicantInfoTblBean.hopeLand3 != ""
        ? this.prefecturesMstBean.filter(
            (item) => item.prefeId == this.applicantInfoTblBean.hopeLand3
          )
        : "";
    },
    jobType1_1Computed() {
      return this.applicantInfoTblBean.industryId1 != "" &&
        this.applicantInfoTblBean.jobtypeId1_1 != ""
        ? this.jobtypeMstBean.filter(
            (item) =>
              item.industryId == this.applicantInfoTblBean.industryId1 &&
              item.jobtypeId == this.applicantInfoTblBean.jobtypeId1_1
          )
        : "";
    },
    jobType1_2Computed() {
      return this.applicantInfoTblBean.industryId1 != "" &&
        this.applicantInfoTblBean.jobtypeId1_2 != ""
        ? this.jobtypeMstBean.filter(
            (item) =>
              item.industryId == this.applicantInfoTblBean.industryId1 &&
              item.jobtypeId == this.applicantInfoTblBean.jobtypeId1_2
          )
        : "";
    },
    jobType1_3Computed() {
      return this.applicantInfoTblBean.industryId1 != "" &&
        this.applicantInfoTblBean.jobtypeId1_3 != ""
        ? this.jobtypeMstBean.filter(
            (item) =>
              item.industryId == this.applicantInfoTblBean.industryId1 &&
              item.jobtypeId == this.applicantInfoTblBean.jobtypeId1_3
          )
        : "";
    },
    jobType2_1Computed() {
      return this.applicantInfoTblBean.industryId2 != "" &&
        this.applicantInfoTblBean.jobtypeId2_1 != ""
        ? this.jobtypeMstBean.filter(
            (item) =>
              item.industryId == this.applicantInfoTblBean.industryId2 &&
              item.jobtypeId == this.applicantInfoTblBean.jobtypeId2_1
          )
        : "";
    },
    jobType2_2Computed() {
      return this.applicantInfoTblBean.industryId2 != "" &&
        this.applicantInfoTblBean.jobtypeId2_2 != ""
        ? this.jobtypeMstBean.filter(
            (item) =>
              item.industryId == this.applicantInfoTblBean.industryId2 &&
              item.jobtypeId == this.applicantInfoTblBean.jobtypeId2_2
          )
        : "";
    },
    jobType2_3Computed() {
      return this.applicantInfoTblBean.industryId2 != "" &&
        this.applicantInfoTblBean.jobtypeId2_3 != ""
        ? this.jobtypeMstBean.filter(
            (item) =>
              item.industryId == this.applicantInfoTblBean.industryId2 &&
              item.jobtypeId == this.applicantInfoTblBean.jobtypeId2_3
          )
        : "";
    },
    jobType3_1Computed() {
      return this.applicantInfoTblBean.industryId2 != "" &&
        this.applicantInfoTblBean.jobtypeId3_1 != ""
        ? this.jobtypeMstBean.filter(
            (item) =>
              item.industryId == this.applicantInfoTblBean.industryId3 &&
              item.jobtypeId == this.applicantInfoTblBean.jobtypeId3_1
          )
        : "";
    },
    jobType3_2Computed() {
      return this.applicantInfoTblBean.industryId2 != "" &&
        this.applicantInfoTblBean.jobtypeId3_2 != ""
        ? this.jobtypeMstBean.filter(
            (item) =>
              item.industryId == this.applicantInfoTblBean.industryId3 &&
              item.jobtypeId == this.applicantInfoTblBean.jobtypeId3_2
          )
        : "";
    },
    jobType3_3Computed() {
      return this.applicantInfoTblBean.industryId2 != "" &&
        this.applicantInfoTblBean.jobtypeId3_3 != ""
        ? this.jobtypeMstBean.filter(
            (item) =>
              item.industryId == this.applicantInfoTblBean.industryId3 &&
              item.jobtypeId == this.applicantInfoTblBean.jobtypeId3_3
          )
        : "";
    },
    countryIdComputed() {
      return this.applicantInfoTblBean.countryId != ""
        ? this.countryMstBean.filter(
            (item) => item.countryId == this.applicantInfoTblBean.countryId
          )
        : "";
    },
    finalEducationComputed() {
      return this.applicantInfoTblBean.finalEducation != ""
        ? this.finalEducation.filter(
            (item) => item.value == this.applicantInfoTblBean.finalEducation
          )
        : "";
    },
    workSituationComputed() {
      return this.applicantInfoTblBean.workSituation != ""
        ? this.workSituation.filter(
            (item) => item.value == this.applicantInfoTblBean.workSituation
          )
        : "";
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
// ???????????????????????????
.avatar-row {
  margin: 2vh 0;
}
// ????????????????????????
.half-input-style {
  width: 100% !important;
}
.save-image {
  width: 40px;
  height: 40px;
  padding: 6px;
}
// ??????????????????el-row????????????????????????
el-col {
  min-height: 1px;
  min-width: 1px;
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
// ?????????????????????????????????????????????????????????????????????
::v-deep div > .el-textarea > textarea {
  overflow: hidden;
  resize: none;
}
// ???????????????????????????
.user-name-style {
  font-size: 30px;
  font-weight: 400;
}
</style>
