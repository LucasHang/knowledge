<template>
  <div class="category-admin">
    <b-form class="mb-3">
      <input id="category-id" type="hidden" v-model="category.id" />

      <b-form-group label="Nome:" label-for="category-name">
        <b-form-input
          id="category-name"
          type="text"
          v-model="category.name"
          required
          :readonly="mode==='remove'"
          placeholder="Informe o Nome da Categoria..."
        />
      </b-form-group>

      <b-form-group label="Categoria Pai:" label-for="category-parentId">
        <b-form-select
          v-if="mode==='save'"
          id="category-parentId"
          v-model="category.parentId"
          :options="categoriesCombo"
        />

        <b-form-input v-else id="category-parentId" type="text" v-model="category.path" readonly />
      </b-form-group>

      <b-button class="my-button" v-if=" mode==='save' " @click="save">Salvar</b-button>

      <b-button variant="danger" v-if=" mode==='remove' " @click="remove">Excluir</b-button>

      <b-button variant="secundary" class="ml-3" @click="reset">Cancelar</b-button>
    </b-form>

    <b-table class="mt-4" table-variant hover striped :items="categories" :fields="fields">
      <template slot="actions" slot-scope="data">
        <b-button class="my-button mr-2" @click="loadCategory(data.item)">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadCategory(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>

  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "CategoryAdmin",

  data: function() {
    return {
      mode: "save",
      category: {},
      categories: [],
      categoriesCombo: [],

      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "path", label: "Caminho", sortable: true },
        { key: "actions", label: "Ações" }
      ]
    };
  },

  methods: {
    loadCategories() {
   
      const url = `${baseApiUrl}/categories`;
          axios.get(url).then(res => {
            this.categories = res.data;

            this.categoriesCombo = res.data.map(category => {
                return {value: category.id, text: category.path}
            })
            this.categoriesCombo.unshift({text: "Selecione a categoria pai..."})
            
          });
         
    },

    loadCategoriesCombo(){
     
    },

    reset() {
      this.mode = "save";
      this.category = {};
      this.loadCategories();
    },

    save() {
      const method = this.category.id ? "put" : "post";
      const id = this.category.id ? `/${this.category.id}` : "";

      delete this.category.path;

      axios[method](`${baseApiUrl}/categories${id}`, this.category)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },

    remove() {
      const id = this.category.id;
      axios
        .delete(`${baseApiUrl}/categories/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },

    loadCategory(category, mode = "save") {
      this.mode = mode;
      this.category = { ...category };
    }
  },

  mounted() {
    this.loadCategories();
  }
};
</script>

<style>
.my-button {
  border: 1px solid #eb8b66;
  background-color: #f46943;
}
.my-button:hover {
  background-color: #eb8b66;
  text-decoration: none;
  outline: none;
}

.text-info{
    color:#f46943;
}
</style>