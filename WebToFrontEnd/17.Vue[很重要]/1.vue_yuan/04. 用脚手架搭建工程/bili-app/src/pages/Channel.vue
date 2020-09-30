<template>
    <Layout>
        <template v-slot:head>
            菜单
        </template>

        <template v-slot:left>
            <Aside />
        </template>

        <template v-slot:main>
            主区域
        </template>
    </Layout>
</template>

<script>
// @相当于是定位到src目录
    import Layout from "../components/Layout";
    import Aside from "@/components/Aside";

    export default {
        components:{
            Aside,
            Layout,
        }
    }
</script>

<style>

</style>