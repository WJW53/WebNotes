export default {
    async getChannels() {
        // fetch是html5提供的请求数据的方式
        var resp = await fetch("/x/web-interface/web/channel/category/list")
        var data = await resp.json();
        return data.data.categories;
    }
}