console.log(getCookie('username'))
var username = getCookie('username');
if (username) {
    var user = document.getElementById('username');
    user.innerText = username;
} else {
    location.href = './login.html'
}

var studentList = document.querySelector('.menu dd[data-id=student-list]')
var tableData = [];
var page = 1;
var size = 10;
var allPage = 1;
// localStorage / sessionStorage

// 绑定事件
function bindEvent() {
    // 获取左侧导航dl标签 
    var menu = document.querySelector('.menu');
    // 导航的点击事件  事件委托   
    menu.onclick = function (e) {
        var target = e.target;
        if (target.tagName == 'DD') {
            // 切换导航
            target.classList.add('active');
            var siblings = getSiblings(target);
            for (var i = 0; i < siblings.length; i++) {
                siblings[i].classList.remove('active');
            }
            var id = target.getAttribute('data-id');
            var showContent = document.getElementById(id);
            // 切换右侧内容区
            showContent.style.display = 'block';
            var siblingsContent = getSiblings(showContent);
            for (var i = 0; i < siblingsContent.length; i++) {
                siblingsContent[i].style.display = 'none';
            }
        }
    }
    
    var studentAddBtn = document.getElementById('add-submit');
    studentAddBtn.onclick = function (e) {
        e.preventDefault();
        var addStudentForm = document.getElementById('add-student-form');
        // 获取新增表单数据
        var data = getFormData(addStudentForm);
        if (data) {
            // var str = 'appkey=Q_A_Q_1590927055348';
            // for (var prop in data) {
            //     str += '&' + prop + '=' + data[prop];
            // }
            // 如果数据填写全了  提交给后台存储
            // ajax("GET", "http://open.duyiedu.com/api/student/addStudent", str, function (res) {
            //     if (res.status == 'success') {
            //         console.log(res)
            //         alert('新增成功')
            //     } else {
            //         alert(res.msg)
            //     }
            // })
            transferData('/api/student/addStudent', data, function (res) {
                alert('新增成功');
                page = 1;
                getTableData();
                studentList.click();
            });
        }
    }

    // 编辑按钮的点击时间
    var tbody = document.getElementById('tbody');
    var modal = document.querySelector('.modal');
    tbody.onclick = function (e) {
        var target = e.target;
        // 判断当前点击的元素class类名当中是否含有edit  含有代表是编辑按钮
        if (target.classList.contains('edit')) {
           
            modal.style.display = 'block'
            // 获取当前学生的索引值
            var index = target.dataset.index;
            // console.log(tableData[index])
            renderEditForm(tableData[index])
        } else if (target.classList.contains('remove')) {
            // 删除按钮
            var index = target.dataset.index;
            var isDel = confirm('确认删除学号为' + tableData[index].sNo + '的学生信息吗？');
            if (isDel) {
                transferData('/api/student/delBySno', {
                    sNo: tableData[index].sNo
                }, function (res) {
                    alert('删除成功');
                    page = 1;
                    getTableData();
                })
            }

        }
    }

    var studentEditBtn = document.getElementById('edit-submit');
    studentEditBtn.onclick = function (e) {
        e.preventDefault();
        var editStudentForm = document.getElementById('edit-student-form');
        // 获取新增表单数据
        var data = getFormData(editStudentForm);
        console.log('editForm:', data);
        if (data) {
            transferData('/api/student/updateStudent', data, function (res) {
                alert('修改成功');
                modal.style.display = 'none';
                getTableData();
            });
        }
    }
    // 获取弹窗内容元素
    var modalContent = modal.querySelector('.modal-content');
    modal.onclick = function () {
        modal.style.display = 'none'
    }
    modalContent.onclick = function (e) {
        e.stopPropagation();
    }

    var prevBtn = document.getElementById('prev-btn');
    var nextBtn = document.getElementById('next-btn');
    prevBtn.onclick = function () {
        page --;
        getTableData();
    }
    nextBtn.onclick = function () {
        page ++;
        getTableData();
    }

}
bindEvent()


// 获取节点的兄弟节点
function getSiblings(node) {
    var parentNode = node.parentNode;
    var children = parentNode.children;
    var result = [];
    for (var i = 0; i < children.length; i++) {
        if (children[i] != node) {
            result.push(children[i])
        }
    }
    return result;
}

// 获取表单数据
function getFormData(form) {
    var name = form.name.value;
    var sex = form.sex.value;
    var email = form.email.value;
    var number = form.sNo.value;
    var birthYear = form.birth.value;
    var phone = form.phone.value;
    var address = form.address.value;
    if (!name || !sex || !email || !number || !birthYear || !phone || !address) {
        alert('信息填写不完全，请校验之后提交');
        return false;
    }
    // 校验学号  学号为4 - 16 位数字
    if (!(/^\d{4,16}$/.test(number))) {
        alert('学号格式为4到16位数字');
        return false;
    }
    // 校验出生年份  应该为4位数字   1920 - 2020
    if (!(birthYear > 1920 && birthYear <= 2020)) {
        alert('出生年份格式不正确或年龄过大不接受该学员');
        return false;
    }
    // 手机号校验  1开头11为有效数字
    if (!(/^1\d{10}$/.test(phone))) {
        alert('手机号不正确');
        return false;
    }
    return {
        name: name,
        sex: sex,
        email: email,
        sNo: number,
        birth: birthYear,
        phone: phone,
        address: address,
    }
}

// 获取学生列表数据
function getTableData() {
    // ajax('GET', 'http://open.duyiedu.com/api/student/findAll', 'appkey=Q_A_Q_1590927055348', function (res) {
    //     console.log(res)
    //     if (res.status == 'success') {
    //         renderTable(res.data)
    //     }
    // }, true)
    // console.log()
    transferData('/api/student/findByPage', {
        page: page,
        size: size
    }, function(data) {
        // 27 / 10 = 2.7    =>   3   
        allPage = Math.ceil(data.cont / size)
        tableData = data.findByPage;
        renderTable(tableData);
    })
}
getTableData()
 

// 渲染表格数据
function renderTable(data) {
    console.log(data)
    var str = '';
    for (var i = 0; i < data.length; i++) {
        str += `<tr>
        <td>${data[i].sNo}</td>
        <td>${data[i].name}</td>
        <td>${data[i].sex == 1 ? '女': '男'}</td>
        <td>${data[i].email}</td>
        <td>${new Date().getFullYear() - data[i].birth}</td>
        <td>${data[i].phone}</td>
        <td>${data[i].address}</td>
        <td>
            <button class="btn edit" data-index="${i}">编辑</button>
            <button class="btn remove" data-index="${i}">删除</button>
        </td>
    </tr>`;
    }
    var tbody = document.getElementById('tbody');
    tbody.innerHTML = str;
    var prevBtn = document.getElementById('prev-btn');
    var nextBtn = document.getElementById('next-btn');
    if (page > 1) {
        prevBtn.style.display = 'inline-block';
    } else {
        prevBtn.style.display = 'none';
    }

    if (page < allPage) {
        nextBtn.style.display = 'inline-block';
    } else {
        nextBtn.style.display = 'none';
    }

}


// 用于网络请求的函数
/**
 * 
 * @param {String} url  请求路径 
 * @param {Object} data  请求参数  
 */
function transferData(url, data, cb) {
    var str = 'appkey=Q_A_Q_1590927055348';
    for (var prop in data) {
        str += '&' + prop + '=' + data[prop];
    }
    ajax("GET", "http://open.duyiedu.com" + url, str, function (res) {
        if (res.status == 'success') {
            cb(res.data)
        } else {
            alert(res.msg)
        }
    })
}


// 编辑表单的数据回填
function renderEditForm(data) {
    var editForm = document.getElementById('edit-student-form')
    // editForm.name.value = data.name;
    // editForm.sex.value = data.sex;
    // editForm.email.value = data.email;
    for (var prop in data) {
        if (editForm[prop]) {
            editForm[prop].value = data[prop];
        }
    }
}