<template>
  <el-row class="menuRow">
    <el-menu
      :default-active="defaultActive"
      mode="horizontal"
      background-color="#014099"
      text-color="#fff"
      active-text-color="#E6A23C"
      class="menuStyle"
      router
    >
      <el-menu-item
        index="1"
        :route="{ path: routerPath.path1 }"
        @click="logout"
        class="menuItem1"
      >
        <el-image
          :src="require('@/assets/BeeWork.png')"
          fit="contain"
          class="logoStyle"
          alt
        />
      </el-menu-item>
      <el-menu-item index="2" :route="{ path: routerPath.path2 }" class="menuItem2">
        <span>{{ menuItem.menuItem2 }}</span>
      </el-menu-item>
      <el-submenu index="3" class="menuItem3 textCenter">
        <template slot="title">{{ menuItem.menuItem3 }}</template>
        <el-menu-item
          index="3-1"
          :route="{ path: routerPath.path3_1 }"
          v-text="menuItem.menuItem3_1"
        />
        <el-menu-item
          index="3-2"
          :route="{ path: routerPath.path3_2 }"
          v-text="menuItem.menuItem3_2"
        />
      </el-submenu>
      <el-menu-item
        index="4"
        v-text="menuItem.menuItem4"
        :route="{ path: routerPath.path4 }"
        class="menuItem4 textCenter"
      />
      <el-menu-item
        index="5"
        v-text="menuItem.menuItem5"
        :route="{ path: routerPath.path5 }"
        class="menuItem5 textCenter"
      />
      <el-menu-item
        index="6"
        v-text="menuItem.menuItem6"
        :route="{ path: routerPath.path6 }"
        class="menuItem6 textCenter"
      />
      <el-submenu index="7" class="menuItem7 textCenter">
        <template slot="title">{{ menuItem.menuItem7 }}</template>
        <el-menu-item
          index="7-1"
          :route="{ path: routerPath.path7_1 }"
          v-text="menuItem.menuItem7_1"
        />
        <el-menu-item
          index="7-2"
          :route="{ path: routerPath.path7_2 }"
          v-text="menuItem.menuItem7_2"
        />
      </el-submenu>
      <el-submenu index="8" class="menuItem8 textCenter">
        <template slot="title">{{ menuItem.menuItem8 }}</template>
        <el-menu-item
          index="8-1"
          :route="{ path: routerPath.path8_1 }"
          v-text="menuItem.menuItem8_1"
        />
        <el-menu-item
          index="8-2"
          :route="{ path: routerPath.path8_2 }"
          v-text="menuItem.menuItem8_2"
        />
      </el-submenu>
      <el-submenu index="9" class="menuItem9 textCenter">
        <template slot="title">{{ menuItem.menuItem9 }}</template>
        <el-menu-item
          index="9-1"
          :route="{ path: routerPath.path9_1 }"
          v-text="menuItem.menuItem9_1"
        />
        <el-menu-item
          index="9-2"
          :route="{ path: routerPath.path9_2 }"
          v-text="menuItem.menuItem9_2"
        />
      </el-submenu>
      <el-submenu
        index="10"
        :route="{ path: routerPath.path10 }"
        class="menuItem10 textCenter"
      >
        <template slot="title">{{ menuItem.menuItem10 }}</template>
        <el-menu-item
          index="10-1"
          :route="{ path: routerPath.path10_1 }"
          v-text="menuItem.menuItem10_1"
        />
        <el-menu-item
          index="10-2"
          :route="{ path: routerPath.path10_2 }"
          v-text="menuItem.menuItem10_2"
        />
      </el-submenu>
      <el-submenu index="11" class="menuItem11 textCenter">
        <template slot="title">{{ menuItem.menuItem11 }}</template>
        <el-menu-item
          index="11-1"
          :route="{ path: routerPath.path11_1 }"
          v-text="menuItem.menuItem11_1"
        />
      </el-submenu>
      <el-menu-item
        index="13"
        class="menuItem13 textCenter"
        :route="{ path: routerPath.path13 }"
        @click="logout"
      >
        <em class="el-icon-switch-button" />
        <span>{{ menuItem.menuItem13 }}</span>
      </el-menu-item>
      <el-menu-item index="12" :route="{ path: routerPath.path12 }" class="menuItem12">
        <el-divider direction="vertical" />
        <em class="el-icon-user"></em>
        <span>{{ userName }}</span>
      </el-menu-item>
    </el-menu>
  </el-row>
</template>
<script>
export default {
  name: "applicantHeader",
  data() {
    return {
      menuItem: {
        menuItem2: "HOME",
        menuItem3: "????????????",
        menuItem3_1: "????????????",
        menuItem3_2: "????????????",
        menuItem4: "???????????????",
        menuItem5: "????????????",
        menuItem6: "????????????",
        menuItem7: "????????????",
        menuItem7_1: "????????????",
        menuItem7_2: "????????????",
        menuItem8: "???????????????",
        menuItem8_1: "???????????????",
        menuItem8_2: "???????????????",
        menuItem9: "????????????",
        menuItem9_1: "????????????",
        menuItem9_2: "????????????",
        menuItem9_3: "????????????",
        menuItem10: "????????????",
        menuItem10_1: "??????????????????",
        menuItem10_2: "??????????????????",
        menuItem11: "?????????",
        menuItem11_1: "???????????????",
        menuItem13: "???????????????",
      },
      routerPath: {
        path1: "/home",
        path2: "/b0003",
        path3_1: "/error",
        path3_2: "/error",
        path4: "/c0201",
        path5: "/error",
        path6: "/c0301",
        path7_1: "/error",
        path7_2: "/error",
        path8_1: "/error",
        path8_2: "/error",
        path9_1: "/error",
        path9_2: "/error",
        path9_3: "/error",
        path10: "/error",
        path11_1: "/b0901",
        path12: "/error",
        path13: "/login",
      },
    };
  },
  computed: {
    // ???????????????????????????????????????????????????????????????????????????????????????????????????
    defaultActive() {
      return "/" + this.$route.path.split("/").reverse()[0];
    },
    // ??????????????????????????????
    userName() {
      return sessionStorage.getItem("userName") + " ??????";
    },
  },
  methods: {
    logout() {
      localStorage.clear();
      sessionStorage.clear();
    },
  },
};
</script>
<style lang="scss" scoped>
// ????????????????????????
.menuStyle {
  height: 100%;
  width: 100%;
  border: 0;
}
// ??????????????????????????????
// .noSelect {
//   -webkit-user-select: none;
//   -webkit-user-select: none;
//   -khtml-user-select: none;
//   -moz-user-select: none;
//   -ms-user-select: none;
//   user-select: none;
// }
// ????????????item?????????
.menuItem1 {
  width: 15%;
}
.menuItem2,
.menuItem11 {
  width: 5%;
}
.menuItem3,
.menuItem7,
.menuItem10 {
  width: 7%;
}
.menuItem4,
.menuItem8 {
  width: 7%;
}
.menuItem5,
.menuItem6,
.menuItem9 {
  width: 6%;
}
// ?????????????????????
.menuItem12,
.menuItem13 {
  float: right;
}
.menuItem10 {
  text-align: left;
  padding-left: 0;
}
.menuItem12 {
  width: 13%;
}
.menuItem13 {
  width: 9%;
}
.logoStyle {
  padding: 0 1vw;
}
.textCenter {
  text-align: center;
}
.logoStyle[data-v-72de54a0] {
  padding: 0 0;
}
</style>
