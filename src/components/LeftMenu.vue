<template>
  <div class="menu-bar">
    <sidebar-menu
      :menu="menu"
      :collapsed="false"
      :hideToggle="true"
      :disableHover="false"
      :width="'250px'"
      :theme="'white-theme'"
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import * as RouterPath from "@/constants/path";
import { goto } from "@/helpers/functions";


export default {
  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
  data(){
    return {
      leftMenuOptions: [
        { id: 1, name: "Add New Household",  path: RouterPath.NEW_HOUSEHOLD},
        { id: 2, name: "Edit/Add Homes", path: RouterPath.HOMES},
        { id: 3, name: "Edit Existing Entries", path: RouterPath.ENTRIES_EDIT},
        { id: 4, name: "Export Results",  path: RouterPath.EXPORT_RESULT},
        { id: 5, name: "Manager Users",  path: RouterPath.MANAGE_USERS},
      ],
      menu: [
        {
          header: true,
          hiddenOnCollapse: true
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
  methods: {
    navigatorHandler(item){
      goto(item.path);
      // this.$router.push(item.path);
    }
  },
};
</script>

<style lang="scss">
  @import 'src/assets/css/main.scss';

  .menu-bar {
    background-color: $wLeftMenu;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    padding-top: 20px;
  }

  .v-sidebar-menu {
    top: $appbarHeight;
    z-index: 10;

    &.vsm_collapsed {
      .vsm--item {
        padding-left: 0px;
        padding-right: 0px;
      }
    }

    .vsm--header {
      display: none;
    }

    .vsm--title {
      font-size: 14px;
    }

    .vsm--item {
      padding-left: 10px;
    }

    .vsm--link_level-1 {
      .vsm--icon {
        background: transparent;
        width: 25px;
        height: 25px;
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
  }
</style>
