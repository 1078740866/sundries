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
      <el-menu-item index="1" :route="{ path: routerPath.path1 }" class="menuItem1">
        <el-image
          :src="require('@/assets/BeeWork.png')"
          fit="contain"
          class="logoStyle"
          alt
        />
      </el-menu-item>
      <el-menu-item index="2" :route="{ path: routerPath.path2 }" class="menuItem2">
        <!-- <em class="el-icon-house" /> -->
        <span>{{ menuItem.menuItem2 }}</span>
      </el-menu-item>
      <el-menu-item
        index="3"
        v-text="menuItem.menuItem3"
        :route="{ path: routerPath.path3 }"
        class="menuItem3 textCenter"
      />
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
      <el-menu-item
        index="7"
        v-text="menuItem.menuItem7"
        :route="{ path: routerPath.path7 }"
        class="menuItem7 textCenter"
      />
      <el-menu-item
        index="8"
        v-text="menuItem.menuItem8"
        :route="{ path: routerPath.path8 }"
        class="menuItem8 textCenter"
      />
      <el-menu-item
        index="9"
        v-text="menuItem.menuItem9"
        :route="{ path: routerPath.path9 }"
        class="menuItem9 textCenter"
      />
      <el-menu-item
        index="11"
        :route="{ path: routerPath.path11 }"
        class="menuItem11 textCenter"
      >
        <em class="el-icon-switch-button" />
        <span>{{ menuItem.menuItem11 }}</span>
      </el-menu-item>
      <el-menu-item index="10" :route="{ path: routerPath.path10 }" class="menuItem10">
        <el-divider direction="vertical" />
        <em class="el-icon-user"></em>
        <span>{{ userName }}</span>
      </el-menu-item>
    </el-menu>
  </el-row>
</template>
<script>
export default {
  name: "systemHeader",
  data() {
    return {
      menuItem: {
        menuItem2: "HOME",
        menuItem3: "???????????????",
        menuItem4: "????????????",
        menuItem5: "????????????",
        menuItem6: "????????????",
        menuItem7: "???????????????",
        menuItem8: "??????????????????",
        menuItem9: "?????????",
        menuItem11: "???????????????",
      },
      routerPath: {
        path1: "/home",
        path2: "/c0003",
        path3: "/c0101",
        path4: "/c0201",
        path5: "/error",
        path6: "/c0301",
        path7: "/c0401",
        path8: "/a0901",
        path9: "/error",
        path10: "/a0901",
        path11: "/a0001",
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
      return sessionStorage.getItem("userNameA") + " ??????";
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
  width: 17%;
}
.menuItem2 {
  width: 7%;
}
.menuItem3,
.menuItem7 {
  width: 8%;
}
.menuItem4,
.menuItem5,
.menuItem6 {
  width: 7%;
}
.menuItem8 {
  width: 9%;
}
.menuItem9 {
  width: 7%;
}
// ?????????????????????
.menuItem10,
.menuItem11 {
  float: right;
}
.menuItem10 {
  width: 13%;
  text-align: left;
  padding-left: 0;
}
.menuItem11 {
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
