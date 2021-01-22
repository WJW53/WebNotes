const container = document.getElementById("container");
const txt = document.getElementById("txt");
const btn = document.getElementById("btn");

btn.onclick = function () {
    // console.log(txt.value);

    //由于${txt.value}是用户写的可能不安全,所以我们用标记过滤掉<>,防止用户改变HTML结构
    container.innerHTML = safe`<p>
        ${txt.value}
    </p>
    <h3>
        ${txt.value}
    </h3>`
}

function safe(parts) {//为了防止用户改变HTML结构
    const values = Array.prototype.slice.apply(arguments).slice(1);
    console.log(parts);
    console.log(values);

    let str = "";
    for (let i = 0; i < values.length; i++) {
        const v = values[i].replace(/</g, "&lt;").replace(/>/g, "&gt;");
        str += parts[i] + v;
        if (i === values.length - 1) {
            str += parts[i + 1];
        }
    }
    return str;

}