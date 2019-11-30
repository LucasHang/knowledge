<template>
    <aside class="menu" v-show="isMenuVisible">
        <div class="menu-filter">
            <i class="fa fa-search fa-lg"></i>
            <input class="filter-field" type="text" placeholder="Digite para filtrar..."
                v-model="treeFilter" >
        </div>
        <Tree :data="treeData" :options="treeOptions" :filter="treeFilter" ref="tree" /> 
    </aside>
</template>

<script>
import {mapState} from 'vuex'
import Tree from 'liquor-tree'
import {baseApiUrl} from '@/global'
import axios from 'axios'

export default {
    name:"Menu",
    components:{Tree},
    computed: mapState(['isMenuVisible']),
    data: function(){
        return{
            treeFilter: '',
            treeData: this.getTreeData(),
            treeOptions:{
                propertyNames: {'text' : 'name'},
                filter:{ emptyText: 'Categoria não encontrada'}
            }
        }
    },
    methods:{
        getTreeData(){
            const url = `${baseApiUrl}/categories/tree`
            return axios.get(url).then(res => res.data)
        },

        onNodeSelect(node){
            this.$router.push({
                name:'ArticlesByCategory',
                params: {id: node.id}
            })

            if(this.$mq === 'xs' || this.$mq === 'sm'){
                this.$store.commit('toggleMenu', false)
            }
        }
    },

    mounted(){
        this.$refs.tree.$on('node:selected', this.onNodeSelect)
    }
}
</script>

<style>
    .menu{
        grid-area: menu;
        background-color: rgba(244, 107, 69, 0.3);

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

    .menu a{
        font-size: 1.1rem;
        text-decoration: none;
        color: #000;
    }
    .menu a:hover{
        text-decoration: none;
        color: #000;
        font-weight: bold;
    }

    .menu .tree-node.selected > .tree-content,
    .menu .tree-node .tree-content:hover{
          background-image: linear-gradient(to bottom, #FDD4C6, #dcb3a5);

          
    }

    .tree-arrow.has-child{
        color: #000;
    }

    .menu .menu-filter{
        display: flex;
        justify-content: flex-start;
        align-items: center;

        margin: 10px 0;
        padding-bottom: 10px;
        border-bottom: 1px solid #aaa;
        box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1)
    }

    .menu .menu-filter i{
        color: #000;
        margin: 0px 10px;
    }

    .menu input{
        color: #666;
        font-size: 1.2rem;
        border: 0;
        outline: 0;
        width: 100%;
        background: transparent;
    }

    .tree-filter-empty{
        color: #555;
        margin-left: 20px;
         font-size: 1.2rem;
    }
</style>