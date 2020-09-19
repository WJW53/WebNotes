module.exports = function (...args) {//这里人可能传个拼接字符串,所以导致包查出来的是个info级别的漏洞
    return args.reduce((s, item) => s + item, 0);//求和
}