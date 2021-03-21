<template>
    <div>
        <h2 class="model">ML Models:</h2>
        <v-divider class="splitter"></v-divider>
        <router-link to="/info/1" class="dec">
        <span class="model">TF</span><v-icon  class="arrow"
        large>
        mdi-chevron-right
        </v-icon>
        </router-link >
        <v-divider class="splitter"></v-divider>
        <router-link  to="/info/2"  class="dec">
        <span class="model">TF-IDF</span><v-icon  class="arrow"
        large>
        mdi-chevron-right
        </v-icon>
        </router-link>
        <router-link  to="/info/3"  class="dec">
        <v-divider class="splitter"></v-divider>
         <span class="model">LDA</span><v-icon class="arrow"
        large>
        mdi-chevron-right
        </v-icon>
        </router-link>
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
.model{
    margin-left:20px;
}
.arrow{
    margin:auto;
}
.dec{
    text-decoration: none;
}
</style>