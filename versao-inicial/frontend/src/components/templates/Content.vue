<template>
    <div class="content">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name:"Content"
}
</script>

<style>
.content{
        grid-area: content;
        background-color: aliceblue;
        padding: 20px;
    }
</style>