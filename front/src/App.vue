<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Text summarization</v-toolbar-title>
      
    </v-app-bar>

    <v-main>
       <v-container fluid>
        <v-card
        class="card"
        elevation=7
        >
          <v-textarea
          placeholder="Введите текст"
          clearable
          clear-icon="mdi-close-circle"
          />
        </v-card>
        <v-row
        align="center"
        justify="space-around">
            <v-btn
                class="btn"
                color="primary"
                elevation="7"
                large>
                Action
            </v-btn>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => (
      { 
        drawer: null 
      }),
  }
</script>

<style scoped>
.card{
  padding: 15px;
}
.btn{
  margin-top: 5%;
  width:200px;
}
</style>