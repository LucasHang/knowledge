<template>
    <header class="header">
        <a class="toggle" @click="toggleMenu" v-if="!hideToggle">
            <i class="fa fa-lg" :class="icon"></i>
        </a>
        <h1 class="title">
            <router-link to="/">{{title}} </router-link>
        </h1>
        <UserDropDown v-if="!hideUserDropDown" />
    </header>
</template>

<script>

import UserDropDown from './UserDropDown'

export default {
    name:"Header",
    components: { UserDropDown},
    props: {
        title: String,
        hideToggle: Boolean,
        hideUserDropDown: Boolean
    },
    computed: {
        icon() {
            return this.$store.state.isMenuVisible ?  "fa-angle-left" : "fa-angle-down"
        }
    },
    methods: {
        toggleMenu() {
            this.$store.commit('toggleMenu')
        }
    }
}
</script>

<style>
    .header{
        grid-area: header;
        background-image: linear-gradient(to right, rgb(244, 107, 69), rgb(238, 168, 73));

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title{
        font-size: 1.3em;
        color: #fff;
        font-weight: 100;
        flex-grow: 1;
        text-align: center;
    }

    .title a{
        color: #fff;
        text-decoration: none;
    }
    .title a:hover{
        color: #fff;
        text-decoration: none;
    }

    header.header > a.toggle{
        width: 60px;
        height: 100%;
        color:#fff;
        justify-self: flex-start;
        text-decoration: none;

        display: flex;
        justify-content: center;
        align-items: center; 
    }

    header.header > a.toggle:hover{
        background-color: rgba(0,0,0,0.2);
        color:#fff;
    }
</style>