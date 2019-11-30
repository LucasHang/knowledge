<template>
<footer class="footer">
    <span>Copyright <strong>Hangson</strong> © 2019-2020</span>
</footer>
</template>

<script>
export default {
    name:"Footer"
}
</script>

<style>
    .footer{
        grid-area: footer;
        background-image: linear-gradient(to right, rgb(244, 107, 69), rgb(238, 168, 73));
        color: #333;

        display: flex;
        justify-content: center;
        align-items: center;
        padding-right: 10px;
    }
</style>