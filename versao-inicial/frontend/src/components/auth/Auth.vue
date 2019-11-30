<template>
    <div class="auth-content">

        <div class="auth-modal">

            <div class="auth-title"> {{showSignup ? 'CADASTRO' : 'LOGIN'}} </div>

            <hr>

            <input v-if="showSignup" v-model="user.name" type="text" placeholder="Nome" />
            <input v-model="user.email" type="text" name="email" placeholder="Email" />
            <input v-model="user.password" type="password" name="password" placeholder="Senha" />
            <input v-if="showSignup" v-model="user.confirmPassword" type="password" name="password" placeholder="Confirmar Senha" />

            <button v-if="showSignup" @click="signup"> Registrar </button>
            <button v-else @click="signin"> Entrar </button>

            <a href @click.prevent="showSignup = !showSignup">
                <span v-if="showSignup">Ir para Login</span>
                <span v-else>Registrar-se</span>
            </a>
        </div>

        <img src="@/assets/logo.png" alt="Logo" width="600">

    </div>
</template>

<script>

import {baseApiUrl, showError, userKey} from '@/global'
import axios from 'axios'

export default {
    name: "Auth",
    data: function(){
        return{
            showSignup: false,
            user: {}
        }
    },

    methods:{
        signin(){
            axios.post(`${baseApiUrl}/signin`, this.user)
                .then(res =>{
                    this.$store.commit('setUser', res.data)
                    localStorage.setItem(userKey, JSON.stringify(res.data))
                    this.$router.push({path: '/'})
                })
                .catch(showError)
        },
        signup(){
            axios.post(`${baseApiUrl}/signup`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.user = {}
                    this.showSignup = false
                })
                .catch(showError)
        }
    }
}
</script>

<style>

    .auth-content{
        height: 100%;

        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .auth-modal{
        background-color: #fff;
        width: 350px;
        padding: 35px;
        box-shadow: 0 2px 5px rgba(244, 107, 69, 0.4);

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .auth-modal input{
        border: 1px solid #bbb;
        width: 100%;
        margin-bottom: 15px;
        padding: 3px 8px;

        outline: 0;
    }

    .auth-modal button{
        align-self: flex-end;
        padding: 5px 15px;
        background-color: rgb(244, 107, 69);

        font-size: 1.1rem;
        color: #fff;
        
        cursor: pointer;

        border: 0;
        outline: 0;

    }

    .auth-modal button:hover{
        background-image: linear-gradient(to top, rgb(244, 137, 109),rgb(244, 107, 69));
    }

    .auth-modal a{
        margin-top: 35px;
        color:rgb(244, 107, 69);
    }

    .auth-modal hr{
        border: 0;
        width: 100%;
        height: 1px;
        background-image: linear-gradient(to right,
            rgba(120,120,120, 0),
            rgba(120,120,120, 0.75),
            rgba(120,120,120, 0));
    }

    .auth-title{
        font-size: 1.5rem;
        font-weight: 100;
        color: #777;
        margin-top: 10px;
        margin-bottom: 15px;
    }

    
</style>