<template>
  <div>
    <div class="content">
      <!-- Desktop -->
      <button @click="toogleDesktopSidebar()">toggle desktop sidebar</button>
      <div style="display: flex; flex-direction: row; width: 100%; height: 500px">
        <div class="sidebar sidebar-content-on">
          <div class="sidebar-content">Sidebar</div>
        </div>
        <div style="background: green; flex: 1">Content</div>
      </div>
    </div>
    <br />
    <br />
    <br />
    
    <!-- Mobile -->
    <div class="content">
      <!-- Desktop -->
      <button @click="toogleMobileSidebar()">toggle desktop sidebar</button>
      <div style="width: 100%; height: 500px">
        <div class="mobile-sidebar mobile-sidebar-off">
          Sidebar
          <br />
          <button @click="toogleMobileSidebar()">toggle desktop sidebar 11</button>
        </div>
        <div style="background: green; height: 100%">Content</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  methods: {
    toogleDesktopSidebar() {
      let sidebar = document.querySelector(".sidebar");

      // Show or hide the sidebar
      if (sidebar.classList.contains("sidebar-content-on")) {
        // Sidebar
        sidebar.classList.remove("sidebar-content-on");
        sidebar.classList.add("sidebar-content-off");

        // Content
      } else {
        sidebar.classList.remove("sidebar-content-off");
        sidebar.classList.add("sidebar-content-on");
      }
    },
    toogleMobileSidebar() {
      let sidebar = document.querySelector(".mobile-sidebar");

      // Show or hide the sidebar
      if (sidebar.classList.contains("mobile-sidebar-on")) {
        // Sidebar
        sidebar.classList.remove("mobile-sidebar-on");
        sidebar.classList.add("mobile-sidebar-off");

        // Content
      } else {
        sidebar.classList.remove("mobile-sidebar-off");
        sidebar.classList.add("mobile-sidebar-on");
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sidebar {
  position: relative;

  transition: all 1s linear 0s;
}

.sidebar-content {
  position: absolute;
  width: 200px;
  height: 100%;
  background: grey;

  right: 0;
}

.sidebar.sidebar-content-on {
  width: 200px;
}

.sidebar.sidebar-content-off {
  width: 0px;
}

/* Mobile */
.mobile-sidebar {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: grey;

  transition: all 1s linear 0s;
}

.mobile-sidebar-on {
  top: 0;
}

.mobile-sidebar-off {
  top: -100%;
}
</style>
