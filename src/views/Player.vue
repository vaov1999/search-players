<template>
  <div class="player">
    <router-link class="back" to="/">Back to Search</router-link>
    <div v-if="isLoading">Loading...</div>
    <template v-else>
      <h1 class="card">{{ playerData.name }}-{{ playerData.spa_id }}</h1>

      <h3 class="card">Very beautiful data :3</h3>

      <p
        class="card"
        v-for="(prop, index) in playerData.statistics"
        :key="index"
      >
        {{ prop }}
      </p>
    </template>
  </div>
</template>

<script>
export default {
  name: "Player",
  data() {
    return {
      playerData: "",
      isLoading: true,
    };
  },
  created() {
    const nickname = this.$router.history.current.params.id;

    fetch(
      `https://vortex.worldofwarships.ru/api/accounts/search/${nickname}?limit=1`
    )
      .then((res) => res.json())
      .then((res) => {
        this.playerData = res.data[0];
        this.isLoading = false;
        console.log(this.playerData);
      });
  },
};
</script>

<style lang="scss" scoped>
.player {
  height: 100vh;
  padding: 20px;
  background: rgb(81, 249, 255);
  background: linear-gradient(
    24deg,
    rgba(80, 240, 255, 1) 0%,
    rgba(24, 0, 155, 0.7) 100%
  );

  .back {
    display: inline-block;
    margin: 10px auto 20px;
    padding: 25px;
    border: none;
    border-radius: 15px;
    box-shadow: 5px 5px 20px rgba(#2c3e50, 0.4);
    background-color: #fff;
    outline: none;
    font-size: 25px;
    text-decoration: none;
  }
  .card {
    width: 100%;
    max-width: 800px;
    margin: 25px auto 0;
    padding: 25px;
    border: none;
    border-radius: 15px;
    box-shadow: 5px 5px 20px rgba(#2c3e50, 0.4);
    background-color: #fff;
    outline: none;
    font-size: 25px;
  }
}
</style>
