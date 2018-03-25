<template>
  <nav>
    <img class="logo" src="~@/assets/snippets.png" alt="Snippets logo">
    <div class="is-pulled-right">

      <a id="about-code-notes" @click="aboutSnippetsModalActive = true" title="About Snippets...">
        <b-icon icon="info-circle"></b-icon>
      </a>
      <a id="github" @click="open('https://github.com/firemiles/snippets')" title="Show on Github...">
        <b-icon icon="github"></b-icon>
      </a>
    </div>

    <b-modal :active.sync="aboutSnippetsModalActive" :width="580" scroll="keep">
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-content">
            </div>
          </div>
          <div class="content">
            <h4>v{{appVersion}}</h4>

            <p>A simple code snippet manager for developers built with Electron & Vue.js 🚀</p>

            <p>Feel free to contribute on <a @click="open('https://github.com/firemiles/snippets')">Github</a> 🍻</p>
          </div>
        </div>
      </div>
    </b-modal>

  </nav>
</template>

<script>
// eslint-disable-next-line
import { remote } from 'electron';

export default {
  name: 'cn-navbar',
  components: {
  },
  data() {
    return {
      appVersion: remote.app.getVersion(),
      aboutSnippetsModalActive: false,
      helpTokenModalActive: false,
    };
  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
  },
};
</script>

<style lang="scss" scoped>
nav {
  -webkit-app-region: drag;
  background-color: $primary;
  text-align: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;

  .logo {
    padding: 10px 10px 4px 10px;
    width: 110px;
    position: relative;
    left: 4%;
  }

  #about-code-notes,
  #github,
  #help {
    color: $light;
    position: relative;
    top: 20px;
    right: 20px;
  }

  .modal {
    .media-content {
      text-align: center;
    }

    img {
      width: 250px;
    }

    .badge {
      width: 160px;
    }
  }
}
</style>
