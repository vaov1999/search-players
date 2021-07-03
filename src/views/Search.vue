<template>
  <div class="home">
    <input
      type="text"
      class="input"
      placeholder="Please type a player name"
      v-model="searchText"
      @input="request"
    />
    <div class="users-list">
      <router-link
        class="link"
        v-for="(player, index) in players"
        :key="index"
        :to="`/players/${player.name.toLowerCase()}`"
        >{{ player.name }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      searchText: "",
      players: [],
      timeout: null,
    };
  },
  methods: {
    request() {
      const vm = this;

      clearTimeout(this.timeout);

      this.timeout = setTimeout(function () {
        vm.searchPlayer();
      }, 1000);
    },
    searchPlayer() {
      if (this.searchText.length > 2) {
        if (/^[A-Za-z][A-Za-z0-9]*$/.test(this.searchText)) {
          fetch(
            `https://vortex.worldofwarships.ru/api/accounts/search/${this.searchText}?limit=10`
          )
            .then((res) => res.json())
            .then((res) => {
              this.players = res.data;
            });
        }
      } else {
        this.players = [];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
  padding: 20px;
  background: rgb(81, 249, 255);
  background: linear-gradient(
    24deg,
    rgba(81, 249, 255, 1) 0%,
    rgba(248, 0, 255, 0.7) 100%
  );

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
    .link {
      display: block;
      padding: 10px;
      margin-top: 10px;
      border-radius: 15px;
      background-color: #fff;
      color: #333333;
      text-decoration: none;
      &:hover {
        cursor: pointer;
        box-shadow: 5px 5px 20px rgba(#2c3e50, 0.4);
      }
    }
  }
}
</style>
