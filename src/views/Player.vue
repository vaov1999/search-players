<template>
  <div class="about">
    <div v-if="isLoading">Loading...</div>
    <template v-else>
      <h1>{{ playerData.name }}-{{ playerData.spa_id }}</h1>

      <h3>Very beautiful data :3</h3>

      <p v-for="(prop, index) in playerData.statistics" :key="index">
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
