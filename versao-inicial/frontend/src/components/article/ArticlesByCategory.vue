<template>
    <div class="articles-by-category">
        <PageTitle icon="fa fa-folder-o" :main="category.name" sub="Categoria" />
        <ul>
            <li v-for="article in articles" :key="article.id">
                <ArticleItem :article="article" />
            </li>
        </ul>
        <div class="load-more">
            <button @click="getArticles" class="btn btn-lg my-btn" v-if="loadMore" >
                Carregar mais...
            </button>
        </div>
    </div>
</template>

<script>

import {baseApiUrl} from '@/global'  
import axios from 'axios'
import PageTitle from '../templates/PageTitle'
import ArticleItem from './ArticleItem'

export default {
    name: 'ArticlesByCategory',
    components: {PageTitle, ArticleItem},
    data: function(){
        return{
            category: {},
            articles: [],
            page: 1,
            loadMore: true
        }
    },

    methods: {
        getCategory(){
            const url = `${baseApiUrl}/categories/${this.category.id}`
            axios.get(url).then(res => this.category = res.data)
        },

        getArticles(){
            const url = `${baseApiUrl}/categories/${this.category.id}/articles?page=${this.page}`
            axios.get(url).then(res =>{
                this.articles = this.articles.concat(res.data)
                this.page++

                if(res.data.length === 0 ) this.loadMore = false
            })
        }
    },

    watch: {
        $route(to){
            this.category.id = to.params.id
            this.articles = []
            this.page = 1
            this.loadMore=  true

            this.getCategory()
            this.getArticles()
        }
    },

    mounted(){
        this.category.id = this.$route.params.id
        this.getCategory()
        this.getArticles()
    }
}
</script>

<style>

    .articles-by-category ul{
        list-style-type: none;
        padding: 0;
    }

    .articles-by-category .load-more{
        display: flex;
        justify-content: center; 
        margin-top: 25px;
    }

    .my-btn{
        border: 1px solid rgb(244, 107, 69);
        background-color: #fff;
        color:rgb(244, 107, 69);

    }

    .my-btn:hover{
        background-color:rgb(244, 107, 69, 0.65);
        color: #fff;
        transition: background-color 0.5s;
    }
</style>