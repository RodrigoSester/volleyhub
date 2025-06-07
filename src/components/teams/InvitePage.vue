<template>
  <div class="invite-container">
    <div class="invite-card">
      <h2 class="invite-title">Agora você faz parte do time {{ teamName }}</h2>
      <p class="invite-message">Parabéns! Você foi adicionado com sucesso.</p>
      <button @click="redirectToTeams" class="invite-button">OK</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InvitePage',
  data() {
    return {
      teamName: this.$route.params.teamName || 'XXX'
    }
  },
  created() {
    console.log("🚀 ~ created ~ this.$route.params:", this.$route.params)
  },
  methods: {
    redirectToTeams() {
      this.$router.push({ name: 'teams' });
    }
  }
}
</script>

<style scoped>
.invite-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.invite-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 30px;
  max-width: 500px;
  width: 100%;
  text-align: center;
}

.invite-title {
  margin-bottom: 20px;
  color: #2c3e50;
}

.invite-message {
  margin-bottom: 30px;
  color: #5a6776;
}

.invite-button {
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 30px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.invite-button:hover {
  background-color: #45a049;
}
</style>