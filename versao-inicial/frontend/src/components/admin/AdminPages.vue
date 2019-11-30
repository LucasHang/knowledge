<template>
  <div class="admin-pages">
    <PageTitle icon="fa fa-cogs" main="Administração do sistema" sub="Cadastro & Cia" />

    <b-tabs card class="tab-title-class">
        <b-tab title="Artigos">
          <ArticleAdmin />
        </b-tab>
        <b-tab title="Categorias" >
          <CategoryAdmin />
        </b-tab>
        <b-tab title="Usuários" >
          <UserAdmin />
        </b-tab>
    </b-tabs>

  </div>
</template>

<script>
import PageTitle from "../templates/PageTitle";
import ArticleAdmin from "./ArticleAdmin";
import CategoryAdmin from "./CategoryAdmin";
import UserAdmin from "./UserAdmin";

export default {
  name: "AdminPages",
  components: { PageTitle, ArticleAdmin, CategoryAdmin, UserAdmin },
  
};
</script>

<style>
.tab-title-class a{
  font-size: 1.1em;
  color: rgb(244, 107, 69);
}
.tab-title-class a:hover {
  background-color: #fff;
  color: rgb(244, 107, 69);
}

</style>