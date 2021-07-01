<template>
  <div id="app">
    <input
      type="text"
      class="input"
      placeholder="Please type a player name"
      v-model="searchText"
      @input="searchPlayer"
    />
    <ul class="users-list">
      <li v-for="(player, index) in players" :key="index">{{ player.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      searchText: "",
      players: [],
    };
  },
  methods: {
    searchPlayer() {
      if (this.searchText.length > 2) {
        fetch(
          `https://vortex.worldofwarships.ru/api/accounts/search/${this.searchText}/`
        )
          .then((res) => res.json())
          .then((res) => {
            this.players = res.data.slice(0, 10);
          });
      } else {
        this.players = [];
      }
    },
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
body {
  padding: 0;
  margin: 0;
  height: 100vh;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
  padding: 20px;
  min-height: 100%;
  background: rgb(81, 249, 255);
  background: linear-gradient(
    24deg,
    rgba(81, 249, 255, 1) 0%,
    rgba(248, 0, 255, 0.7) 100%
  );
}

.input {
  width: 100%;
  max-width: 400px;
  padding: 25px;
  border: none;
  border-radius: 15px;
  box-shadow: 5px 5px 20px rgba(#2c3e50, 0.4);
  outline: none;
  font-size: 25px;
  &:focus {
    box-shadow: 5px 5px 20px rgba(#2c3e50, 1);
  }
  &::placeholder {
    text-align: center;
    color: #999;
  }
}

.users-list {
  width: 100%;
  max-width: 400px;
  margin: 30px auto;
  padding: 0;
  li {
    display: block;
    padding: 10px;
    margin-top: 10px;
    border-radius: 15px;
    background-color: #fff;
    &:hover {
      cursor: pointer;
      box-shadow: 5px 5px 20px rgba(#2c3e50, 0.4);
    }
  }
}
</style>
