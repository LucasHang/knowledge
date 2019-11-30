<template>
	<div id="app" :class="{'hide-menu': !isMenuVisible || !user}">
		<Header title="Cod3r - Base de Conehcimento" :hideToggle="!user" :hideUserDropDown="!user"/>
		<Menu v-if="user"/>
		<Loading v-if="validatingToken"/>
		<Content v-else />
		<Footer />
	</div>
</template>

<script>

import axios from 'axios'
import { baseApiUrl, userKey } from '@/global'
import Header from './components/templates/Header'
import Content from './components/templates/Content'
import Footer from './components/templates/Footer'
import Menu from './components/templates/Menu'
import Loading from './components/templates/Loading'

import {mapState} from 'vuex'

export default {
	name: "App",

	components: {Header,Footer,Content,Menu, Loading},

	computed: mapState(['isMenuVisible', 'user']),

	data: function(){
		return{
			validatingToken: true
		}
	},

	methods:{
		async validateToken(){

            this.validatingToken = true

            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            this.$store.commit('setUser', null)

            if(!userData){
                this.validatingToken = false
                this.$router.push({ name: 'auth' })
                return 
            }

		const res = await  axios.post(`${baseApiUrl}/validateToken`, userData)

            if(res.data){
				this.$store.commit('setUser', userData)
				
				if(this.$mq === 'xs' || this.$mq === 'sm'){
					this.$store.commit('toggleMenu', false)
				}
            }else{
                localStorage.removeItem(userKey)
                this.$router.push({ name: 'auth' })
            }
            this.validatingToken = false
        }
	},

	created(){
		this.validateToken()
	}
}
</script>

<style>
	*{
		font-family: 'Lato', sans-serif;
	}

	body{
		margin: 0;
	}

	#app{
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		height: 100vh;

		display: grid;
		grid-template-rows: 60px 1fr 25px;
		grid-template-columns: 300px 1fr;
		grid-template-areas: 
			"header header"
			"menu content"
			"footer footer";
	}

	#app.hide-menu{
		grid-template-areas: 
			"header header"
			"content content"
			"footer footer";
	}
</style>