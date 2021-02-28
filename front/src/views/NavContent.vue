<template>
    <div>
        <v-row
        align="center"
        justify="space-around"
        class="row-login">
            <v-avatar
            color="primary"
            size="50"
            class="avatar"
            ></v-avatar>
            <v-btn
            color="primary"
            elevation="2" 
            class="login"
            >LogIn/SingUp</v-btn>
        </v-row>
        <v-divider class="splitter"></v-divider>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.splitter{
    margin-top:2%;
    margin-bottom:2%;
}
.avatar{
    margin:2%;
}
.row-login{
    height:100px;
}
</style>