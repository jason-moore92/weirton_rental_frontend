<template>
  <div class="main-page">
    <AppBar 
      :showSidebar=showSidebar 
      @sidebarHandler="()=>{showSidebar = !showSidebar}"
    />
    <!-- <div class="test-header">&nbsp;</div> -->
    <div id="dashboard">
      <sidebar-menu
        v-if="showSidebar"
        :menu="menu"
        :collapsed="!showSidebar"
        :hideToggle="true"
        :disableHover="!showSidebar"
        :width="'250px'"
        :theme="'white-theme'"
        @item-click="onItemClick"
      >
        <div slot="footer">
          <div class="side-footer">
            <div>
              <a target="_blank" :href="'./'">Terms of Use</a> ·
              <a target="_blank" :href="'./'">Privacy Policy</a>
            </div>
            <div>@ Copyright {{ new Date().getFullYear() }}</div>
          </div>
        </div>
      </sidebar-menu>
      <div class="main-content">
        <router-view/>
      </div>
      <div 
        :class="showSidebar?'':'hidden'" class="hover-panel"
        @click.stop="()=>{showSidebar = !showSidebar}"
      ></div>
    </div>
  </div>
</template>
<script>
import LeftMenu from '@/components/LeftMenu.vue';
import AppBar from '@/components/AppBar.vue';
import * as RouterPath from "@/constants/path";

export default {
  name: "DashboardTemplate",
  components: {
    // LeftMenu,
    AppBar,
  },
  props: ['child'],
  data () {
    return {
      showSidebar: true,
      menu: [
        {
          header: true,
          hiddenOnCollapse: true
        },
        {
          href: RouterPath.DASHBOARD,
          title: 'Dashboard',
          icon: {
            element: 'img',
            attributes: {
              src: require('@/assets/images/sidemenu/side_home.svg'),
            }
          },
        },
        {
          href: RouterPath.NEW_HOUSEHOLD,
          title: 'Add New Household',
          icon: {
            element: 'img',
            attributes: {
              src: require('@/assets/images/sidemenu/side_home.svg'),
            }
          },
        },
        {
          href: RouterPath.HOMES,
          title: 'Edit/Add Homes',
          icon: {
            element: 'img',
            attributes: {
              src: require('@/assets/images/sidemenu/side_projects_icon.png'),
            }
          },
        },
        {
          href: RouterPath.ENTRIES_EDIT,
          title: 'Edit Existing Entries',
          icon: {
            element: 'img',
            attributes: {
              src: require('@/assets/images/sidemenu/side_search.svg'),
            }
          },
        },
        {
          href: RouterPath.EXPORT_RESULT,
          title: 'Export Results',
          icon: {
            element: 'img',
            attributes: {
              src: require('@/assets/images/sidemenu/side_message.svg'),
            }
          },
        },
        {
          href: RouterPath.MANAGE_USERS,
          title: 'Manager Users',
          icon: {
            element: 'img',
            attributes: {
              src: require('@/assets/images/sidemenu/side_payment.svg'),
            }
          },
        },
      ],
    }
  },
  created() {
    window.addEventListener("resize", this.screenResizeHandler);
  },
  destroyed() {
    window.removeEventListener("resize", this.screenResizeHandler);
  },
  mounted() {
    this.screenResizeHandler();
  },
  methods: {
    screenResizeHandler(e) {
      let width = window.innerWidth;
      if (width <= 960) {
        this.showSidebar = false;
      }else{
        this.showSidebar = true;
      }
    },
    onItemClick(event, item) {
      let width = window.innerWidth;
      if (width <= 960) {
        this.showSidebar = !this.showSidebar
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  @import 'src/assets/css/main.scss';

  .test-header{
    position: absolute;
    width: 100%;
    height: $appbarHeight;
    background-color: $wAppBar;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    z-index: 99;
  }

  .main-page {
    height: 100vh;
  }
  #dashboard{
    margin-top: $appbarHeight;
    display: flex;
    width: 100%;
    height: calc(100% - $appbarHeight);
    // overflow: hidden;
  }

  .main-content {
    margin-left: $sidebarWidth;
    width: calc(100% - $sidebarWidth);
    height: 100%;
    background-color: $mainPageBack;
  }

  .v-sidebar-menu {
    top: $appbarHeight;
    z-index: 10;
    padding-top: 10px;

    &.vsm_collapsed {
      .vsm--item {
          padding-left: 0px;
          padding-right: 0px;
      }
    }

    .vsm--header {
      display: none;
    }

    .vsm--item {
      padding-left: 10px;
      padding-right: 10px;
    }

    .vsm--link_level-1 {
      .vsm--icon {
        background: transparent;
        width: 22px;
        height: 22px;
      }

      .vsm--title {
        font-size: 14px;
      }
    }
  }

  .side-footer {
    border-top: 1px solid #E0E0E0;
    color: #546E7A;
    font-size: 12px;
    padding: 15px 15px;

    a {
        color: #546E7A;
    }

    .hover-panel {
      display: none;
    }
  }

  .hidden {
    display: none;
  }


  @media screen and (max-width: 960px) {
    .main-content {
      margin-left: 0;
      width: 100%;
      height: 100%;
      background-color: $mainPageBack;
    }

    .hover-panel{
      position: absolute;
      width: 100%;
      height: calc(100% - $appbarHeight);
      background-color: rgba(0, 0, 0, 0.479);
    }
  }
</style>
