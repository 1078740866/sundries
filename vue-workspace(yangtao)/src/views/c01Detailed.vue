<template>
  <div class="c0101DetailedStyle">
    <applicant-header v-if="applicantComputed" />
    <home-header v-else-if="companyComputed" />
    <administrator-header v-else-if="administratorComputed" />
    <personal-information-detailed
      :applicantInfoTblBean="applicantInfoTblBean"
      :userInfoBean="userInfoBean"
      :countryMstBean="countryMstBean"
      :industryMstBean="industryMstBean"
      :jobtypeMstBean="jobtypeMstBean"
      :prefecturesMstBean="prefecturesMstBean"
      :postalCode="postalCode"
    />
    <qualification-certificate-detailed :applicantQuaTblBean="applicantQuaTblBean" />
    <skill-information-detailed
      :applicantSkillTblBean="applicantSkillTblBean"
      :industryMstBean="industryMstBean"
      :jobtypeMstBean="jobtypeMstBean"
      :skillMstBean="skillMstBean"
    />
    <work-experience-detailed
      :applicantWorkHisTblBean="applicantWorkHisTblBean"
      :industryMstBean="industryMstBean"
      :jobtypeMstBean="jobtypeMstBean"
    />
    <language-skills-detailed
      :applicantLanTblBean="applicantLanTblBean"
      :lanMstBean="lanMstBean"
    />
    <educational-background-detailed :applicantEduTblBean="applicantEduTblBean" />
    <project-experience-detailed :projectHisTblBean="projectHisTblBean" />
    <div class="last-page-button">
      <el-tooltip
        :content="promptMessage.pageBack"
        effect="light"
        placement="bottom"
        :open-delay="400"
      >
        <el-button icon="el-icon-back" @click="goBack" circle />
      </el-tooltip>
    </div>
    <el-backtop class="page-top-button" :visibility-height="600">
      <el-button icon="el-icon-caret-top" circle />
    </el-backtop>
    <home-footer />
  </div>
</template>
<script>
import AdministratorHeader from "@/views/components/AdministratorHeader";
import HomeHeader from "@/views/components/HomeHeader";
import ApplicantHeader from "@/views/components/ApplicantHeader";
import HomeFooter from "@/views/components/HomeFooter";
import EducationalBackgroundDetailed from "./c01Detailed/EducationalBackgroundDetailed.vue";
import LanguageSkillsDetailed from "./c01Detailed/LanguageSkillsDetailed.vue";
import PersonalInformationDetailed from "./c01Detailed/PersonalInformationDetailed.vue";
import ProjectExperienceDetailed from "./c01Detailed/ProjectExperienceDetailed.vue";
import QualificationCertificateDetailed from "./c01Detailed/QualificationCertificateDetailed.vue";
import SkillInformationDetailed from "./c01Detailed/SkillInformationDetailed.vue";
import WorkExperienceDetailed from "./c01Detailed/WorkExperienceDetailed.vue";
export default {
  name: "c01Detailed",
  components: {
    AdministratorHeader,
    HomeHeader,
    ApplicantHeader,
    HomeFooter,
    EducationalBackgroundDetailed,
    LanguageSkillsDetailed,
    PersonalInformationDetailed,
    ProjectExperienceDetailed,
    QualificationCertificateDetailed,
    SkillInformationDetailed,
    WorkExperienceDetailed,
  },
  data() {
    return {
      titleName: "???????????????",
      applicantId: "",
      // ????????????
      applicantInfoTblBean: {},
      // ??????????????????
      userInfoBean: {},
      // ??????
      countryMstBean: [],
      // ??????
      industryMstBean: [],
      // ??????
      jobtypeMstBean: [],
      // ?????????
      prefecturesMstBean: [],
      // ????????????
      postalCode: {
        postal1: "",
        postal2: "",
      },
      // ?????????
      applicantQuaTblBean: [],
      // ?????????
      applicantSkillTblBean: [],
      // ??????????????????
      skillMstBean: [],
      // ??????
      applicantWorkHisTblBean: [],
      // ????????????
      applicantLanTblBean: [],
      // ???????????????
      lanMstBean: [],
      // ??????
      applicantEduTblBean: [],
      // ????????????????????????
      projectHisTblBean: [],
      promptMessage: {
        backTop: "???????????????????????????",
        pageBack: "????????????",
      },
    };
  },
  created() {
    console.clear();
    document.title = this.titleName;
  },
  mounted() {
    this.setApplicantId();
    this.initData();
  },
  destroyed() {},
  computed: {
    administratorComputed() {
      var userName = sessionStorage.getItem("userNameA");
      return (
        userName != "" && userName != null && userName != undefined && userName != "null"
      );
    },
    companyComputed() {
      var userName = sessionStorage.getItem("userName");
      return (
        userName != "" && userName != null && userName != undefined && userName != "null"
      );
    },
    applicantComputed() {
      var userName = sessionStorage.getItem("userNameC");
      return (
        userName != "" && userName != null && userName != undefined && userName != "null"
      );
    },
  },
  methods: {
    setApplicantId() {
      // ????????????????????????????????????????????????
      if (this.$route.query.applicantId) {
        // applicantId???session????????????
        sessionStorage.setItem("applicantId", this.$route.query.applicantId);
      }
      this.applicantId = sessionStorage.getItem("applicantId");
    },
    // ????????????
    initData() {
      this.$store
        .dispatch("getApplicant", parseInt(this.applicantId))
        .then((response) => {
          var responseData = response.data.data;
          console.log("responseData", responseData);
          var head = "data:image/jpeg;base64,";
          // C010101
          this.countryMstBean = responseData.countryMstBean;
          this.industryMstBean = responseData.industryMstBean;
          this.jobtypeMstBean = responseData.jobtypeMstBean;
          this.prefecturesMstBean = responseData.prefecturesMstBean;
          var postal = responseData.applicantInfoTblBean.applicantPostal;
          this.postalCode.postal1 = postal.split("-")[0];
          this.postalCode.postal2 = postal.split("-")[1];
          // C010103
          this.skillMstBean = responseData.skillMstBean;
          // C010105
          this.lanMstBean = responseData.lanMstBean;
          if (responseData.applicantInfoTblBean != null) {
            // C010101
            this.applicantInfoTblBean = responseData.applicantInfoTblBean;
            this.userInfoBean = responseData.userInfoBean;
            this.applicantInfoTblBean.photoPic =
              head + responseData.applicantInfoTblBean.photoPic;
            // C010102
            this.applicantQuaTblBean = responseData.applicantQuaTblBean;
            this.applicantQuaTblBean.forEach(function (item) {
              item.photoPic = head + item.photoPic;
            });
            // C010103
            this.applicantSkillTblBean = responseData.applicantSkillTblBean;
            // C010104
            this.applicantWorkHisTblBean = responseData.applicantWorkHisTblBean;
            // C010105
            this.applicantLanTblBean = responseData.applicantLanTblBean;
            // C010106
            this.applicantEduTblBean = responseData.applicantEduTblBean;
            this.applicantEduTblBean.forEach(function (item) {
              item.photoPic = head + item.photoPic;
            });
            // C010107
            this.projectHisTblBean = responseData.projectHisTblBean;
          }
        });
    },
    // ???????????????
    goBack() {
      this.$router.back();
    },
  },
};
</script>
<style lang="scss" scoped>
// ???????????????????????????
::v-deep .el-table thead {
  color: #014099;
}
//?????????
.c0101DetailedStyle {
  background: -webkit-linear-gradient(top, #000099, #409eff);
  min-height: 98vh;
}
</style>
<style lang="scss">
// ???????????????????????????
body {
  display: block;
  margin: 0;
}
// ???????????????
.last-page-button {
  position: fixed;
  border-radius: 50%;
  display: flex;
  right: 3vw;
  top: 10vh;
}
// ??????????????????
.page-top-button {
  position: fixed;
  border-radius: 50%;
  right: 3vw;
  top: 85vh;
}
</style>
