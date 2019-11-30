<template>
  <div class="user-admin">
    <b-form class="mb-3">
      <input id="user-id" type="hidden" v-model="user.id" />
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Nome:" label-for="user-name">
            <b-form-input
              id="user-name"
              type="text"
              v-model="user.name"
              required
              :readonly="mode==='remove'"
              placeholder="Informe o Nome do Usuário..."
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="E-mail:" label-for="user-email">
            <b-form-input
              id="user-email"
              type="text"
              v-model="user.email"
              required
              :readonly="mode==='remove'"
              placeholder="Informe o Email do Usuário..."
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-form-checkbox
        v-show="mode==='save'"
        variant="danger"
        id="user-admin"
        v-model="user.admin"
        class="mt-3 mb-3"
      >Administrador ?
      </b-form-checkbox>

      <b-row v-show="mode==='save'">
        <b-col md="6" sm="12">
          <b-form-group label="Senha:" label-for="user-senha">
            <b-form-input
              id="user-senha"
              type="password"
              v-model="user.password"
              required
              placeholder="Informe a Senha do Usuário"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Confirmação de senha:" label-for="user-confirm-password">
            <b-form-input
              id="user-confirm-password"
              type="password"
              v-model="user.confirmPassword"
              required
              placeholder="Confirme a Senha do Usuário"
            />
          </b-form-group>
        </b-col>
      </b-row>
      
      <b-row >
        <b-col xs="12">
          <b-button class="my-button" v-if=" mode==='save' " @click="save">Salvar</b-button>

          <b-button variant="danger" v-if=" mode==='remove' " @click="remove">Excluir</b-button>

          <b-button variant="secundary" class="ml-3" @click="reset">Cancelar</b-button>
        </b-col>
      </b-row>
    </b-form>

    <b-table class="mt-4" table-variant hover striped :items="users" :fields="fields">
      <template slot="actions" slot-scope="data">
        <b-button class="my-button mr-2" @click="loadUser(data.item)">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadUser(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>

    <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />
    
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "UserAdmin",

  data: function() {
    return {
      mode: "save",
      user: {},
      users: [],
      page: 1,
      count: 0,
      limit: 0,

      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "email", label: "E-mail", sortable: true },
        {
          key: "admin",
          label: "Administrador",
          sortable: true,
          formatter: value => (value ? "Sim" : "Não")
        },
        { key: "actions", label: "Ações" }
      ]
    };
  },

  methods: {
    loadUsers() {
      const url = `${baseApiUrl}/users?page=${this.page}`;
      axios.get(url).then(res => {
        this.users = res.data.data
        this.count = res.data.count
        this.limit = res.data.limit
      });
    },

    reset() {
      this.mode = "save";
      this.user = {};
      this.loadUsers();
    },

    save() {
      const method = this.user.id ? "put" : "post";
      const id = this.user.id ? `/${this.user.id}` : "";

      axios[method](`${baseApiUrl}/users${id}`, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },

    remove() {
      const id = this.user.id;
      axios
        .delete(`${baseApiUrl}/users/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },

    loadUser(user, mode = "save") {
      this.mode = mode;
      this.user = { ...user };
    }
  },

   watch:{
    page(){
        this.loadUsers()
    }
  },

  mounted() {
    this.loadUsers();
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

