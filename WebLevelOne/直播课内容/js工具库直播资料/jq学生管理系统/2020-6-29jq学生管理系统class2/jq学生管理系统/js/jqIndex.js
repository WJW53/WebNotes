/**
 * 1. 登录状态确认  ***
 * 2. 登录页面中  需要对账号进行校验  ***
 * 3. 注册页面中  需要注册信息并提交  ***
 * 4. 菜单栏切换的功能  ***
 * 5. 新增界面中  新增学生功能 （增加完学生要跳转到学生列表页，并且要获取到最新的数据） ***
 * 6. 学生列表的展示（分页）
 * 7. 学生编辑删除功能 ***
 * 8. 搜索功能
 */
// 校验登录状态
var username = getCookie('username');
if (username) {
    $('#username').text(username)
} else {
    location.href = './login.html'
}
// 当前表格数据所属页数
var nowPage = 1;
// 当前获取的表格数据每一页的条数
var pageSize = 10;
// 当前表格数据一共的页码
var allPage = 1;

// 存储表格数据
var tableData = [];
// 绑定事件函数
function bindEvent() {
    $('.menu').on('click', 'dd', function () {
        $(this).addClass('active').siblings().removeClass('active');
        var id = $(this).data('id');
        $('#' + id).fadeIn().siblings().fadeOut();
    });
    $('#add-submit').click(function (e) {
        e.preventDefault();
        var formData = $('#add-student-form').serializeArray();
        var checkedData = checkedFormData(formData);
        console.log(checkedData)
        // 表单校验成功
        if (checkedData.status == 'success') {
            transferData('/api/student/addStudent', checkedData.data, function () {
                alert('添加成功');
                $('#add-student-form')[0].reset();
                $('.menu > dd[data-id=student-list]').trigger('click');
            })
        } else {
            // 表单校验失败
            alert(checkedData.msg);
        }
    });
    // 编辑按钮的功能
    $('#tbody').on('click', '.edit', function () {
        var index = $(this).parents('tr').index();
        renderForm(tableData[index]);
        $('.modal').slideDown();
    }).on('click', '.remove', function() {
        var index = $(this).parents('tr').index();
        var isDelete = confirm('确认删除学号为' + tableData[index].sNo + '学生信息？');
        if (isDelete) {
            transferData('/api/student/delBySno', {
                sNo: tableData[index].sNo
            }, function() {
                alert('删除成功');
                getTableData();
            })
        }
    });
    $('#edit-submit').click(function (e) {
        e.preventDefault();
        var formData = $('#edit-student-form').serializeArray();
        var checkedData = checkedFormData(formData);
        if (checkedData.status == 'success') {
            transferData('/api/student/updateStudent', checkedData.data, function (data) {
                alert('修改成功');
                $('.modal').slideUp();
                getTableData();
            })
        } else {
            alert(checkedData.msg);
        }
    });
    $('.modal').click(function (e) {
        if (e.target == this) {
            $(this).slideUp();
        }
    });
    $('#search-submit').click(function () {
        var val = $('#search-word').val();
        nowPage = 1;
        if (val) {
          seachData(val);
        } else {
            getTableData()
        }
    })
}
// 搜索数据获取
function seachData(val) {
    transferData('/api/student/searchStudent', {
        sex: -1,
        search: val,
        page: nowPage,
        size: pageSize
    }, function (data) {
        allPage = Math.ceil(data.cont / pageSize);
        tableData = data.searchList;
        renderTable(tableData);
    })
}

bindEvent()
/**
 * 编辑表单数据回填
 * @param {*} formData 
 */
function renderForm(data) {
    var form = $('#edit-student-form')[0];
    // 判断当前属性在页面当中是否有填写的位置  如果有则数据填写进去
    for (var prop in data) {
        if (form[prop]) {
            form[prop].value = data[prop];
        }
    }
}


/**
 *  校验表单信息 
 * @param {*} formData 
 * 
 * return obj = {status: 'success/ fail', data: {}, msg: '校验不成功的项的错误信息' }
 */
function checkedFormData(formData) {
    var result = {
        status: 'success',
        data: {},
        msg: '校验成功'
    };
    for (var i = 0; i < formData.length; i++) {
        if (!formData[i].value) {
            result.status = 'fail';
            result.data = {};
            result.msg = formData[i].name + '不存在';
            break;
        }
          // 校验学号  学号为4 - 16 位数字
        if (formData[i].name === 'sNo' && !(/^\d{4,16}$/.test(formData[i].value))) {
            result.status = 'fail';
            result.data = {};
            result.msg = '学号格式为4到16位数字';
            break;
        }
        // 校验出生年份  应该为4位数字   1920 - 2020
        else if (formData[i].name === 'birth' && !(formData[i].value > 1920 && formData[i].value <= 2020)) {
            result.status = 'fail';
            result.data = {};
            result.msg = '出生年份格式不正确或年龄过大不接受该学员';
            break;
        }
        // 手机号校验  1开头11为有效数字
        else if (formData[i].name === 'phone' && !(/^1\d{10}$/.test(formData[i].value))) {
            result.status = 'fail';
            result.data = {};
            result.msg = '手机号不正确';
            break;
        }
        result.data[formData[i].name] = formData[i].value;
    }

    return result;
}


/**
 *  数据交互封装函数 网络请求
 */

 function transferData(url, data, callback) {
    $.ajax({
        type: 'get',
        url: 'http://open.duyiedu.com' + url,
        data: $.extend({
            appkey: 'Q_A_Q_1590927055348'
        }, data),
        dataType: 'json',
        success: function (res) {
            if (res.status === 'success') {
                callback(res.data)
            } else {
                alert(res.msg);
            }
        }
    })
 }

/**
 * 获取学生列表数据
 */
function getTableData() {
    transferData('/api/student/findByPage', {
        page: nowPage,
        size: pageSize
    }, function (data) {
        allPage = Math.ceil(data.cont / pageSize);
        tableData = data.findByPage;
        renderTable(data.findByPage)
    })
}

getTableData()

/**
 * 渲染表格数据
 */
function renderTable(data) {
    var str = data.reduce(function (prevStr, current) {
        return prevStr + `<tr>
        <td>${current.sNo}</td>
        <td>${current.name}</td>
        <td>${current.sex == 0 ? '男' : '女'}</td>
        <td>${current.email}</td>
        <td>${new Date().getFullYear() - current.birth}</td>
        <td>${current.phone}</td>
        <td>${current.address}</td>
        <td>
            <button class="btn edit">编辑</button>
            <button class="btn remove">删除</button>
        </td>
    </tr>`
    }, '');
    $('#tbody').html(str);
    $('.turn-page').page({
        size: pageSize,
        current: nowPage,
        allPage: allPage,
        changePage: function (page, size) {
            nowPage = page;
            pageSize = size;
            var val = $('#search-word').val();
            if (val) {
                seachData(val);
            } else {
                getTableData();
            }
           
        }
    })
}