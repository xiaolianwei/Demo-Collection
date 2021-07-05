var tableData = [];
var currentPage = 1;
var totalPage = null;
var pageSize = 5;
//获取表格数据
function getTableData() {
    $.ajax({
        url: 'http://open.duyiedu.com/api/student/findByPage',
        data: {
            appkey: 'Mr_Xiao_1602570076987',
            page: currentPage,
            size: pageSize
        },
        type: 'get',
        dataType: 'json',
        success: function (res) {
            totalPage = Math.ceil(res.data.cont / pageSize);
            tableData = res.data.findByPage;
            renderTable(tableData);
        }
    })
}

//渲染表格数据
function renderTable(data) {
    var str = data.reduce(function (prev, item) {
        return prev + `<tr>
            <td>${item.sNo}</td>
            <td>${item.name}</td>
            <td>${item.sex === 0 ? '男' : '女'}</td>
            <td>${item.email}</td>
            <td>${new Date().getFullYear() - item.birth}</td>
            <td>${item.phone}</td>
            <td>${item.address}</td>
            <td>
                <button class="btn edit">编辑</button>
                <button class="btn remove">删除</button>
            </td>
        </tr>`
    }, '')
    $('#student-body').html(str)
    $('.page').page({
        current: currentPage,
        total: totalPage,
        change: function(page){
            currentPage = page;
            getTableData();
        }
    })
}

//绑定事件处理函数
function bindEvent() {
    $('#student-body').on('click', '.btn', function () {
        var index = $(this).parents('tr').index();
        var _this = this;
        if ($(this).hasClass('edit')) {
            $('.dialog').fadeIn();
            renderEditForm(tableData[index])
        } else if ($(this).hasClass('remove')) {
            var isDel = confirm('确认删除学生信息为' + tableData[index].sNo + '的学生信息吗？');
            if (isDel) {
                $.ajax({
                    url: 'http://open.duyiedu.com/api/student/delBySno',
                    type: 'get',
                    dataType: 'json',
                    data: {
                        appkey: 'Mr_Xiao_1602570076987',
                        sNo: tableData[index].sNo
                    },
                    success: function (res) {
                        alert(res.msg);
                        $(_this).parents('tr').remove();
                    }
                })
            }
        }
    });
    $('#edit-form-btn').click(function (e) {
        e.preventDefault();
        submitForm('student-edit-form', '/api/student/updateStudent', function (res) {
            alert(res.msg)
            if (res.status === 'success') {
                $('.dialog').fadeOut();
                getTableData();
            }
        });
    });
    $('.left-menu').on('click', 'dd', function () {
        if ($(this).hasClass('active')) return;
        $(this).addClass('active').siblings().removeClass('active');
        var id = $(this).data('id');
        $('#' + id).fadeIn().siblings().fadeOut();
    });
    $('#student-add-btn').on('click', function (e) {
        e.preventDefault();
        submitForm('student-add-form', '/api/student/addStudent', function (res) {
            alert(res.msg)
            if (res.status === 'success') {
                getTableData();
                $('.left-menu dd[data-id=student-list]').trigger('click');
                $('#student-add-form')[0].reset();
            }
        });
    });
    $('.dialog').click(function (e) {
        if (e.target === this) {
            $('.dialog').fadeOut();
        }
    })
}
//提交表单数据
function submitForm(formId, url, fn) {
    var data = getFormData($('#' + formId)[0]);
    if (isValidForm(data)) {
        $.ajax({
            url: 'http://open.duyiedu.com' + url,
            data: $.extend({
                appkey: 'Mr_Xiao_1602570076987'
            }, data),
            dataType: 'json',
            success: fn
        })

    }
}
//回填表单数据
function renderEditForm(data) {
    var form = $('#student-edit-form')[0];
    for (var prop in data) {
        if (form[prop]) {
            form[prop].value = data[prop]
        }
    }
}
//获取到数据
function getFormData(form) {
    return {
        name: form.name.value,
        sex: form.sex.value,
        email: form.email.value,
        sNo: form.sNo.value,
        birth: form.birth.value,
        phone: form.phone.value,
        address: form.address.value
    }
}
//验证表单数据
function isValidForm(data) {

    var errorObj = {
        name: ["请填写学生姓名"],
        sNo: ["请填写学生学号", "学号由4-16位的数字组成"],
        birth: ["请填写出生年份", "仅接收50岁以内的学生", "请正确填写出生年份"],
        email: ["请填写邮箱", "邮箱格式不正确"],
        sex: [],
        phone: ["请填写手机号", "请正确填写11位的手机号"],
        address: ["请填写住址"]
    }
    for (var prop in data) {
        if (data.hasOwnProperty(prop)) {
            if (!data[prop]) {
                alert(errorObj[prop][0]);
                return false;
            }
        }
    }
    //验证学号
    var sNoReg = /^\d{4,16}$/;
    if (!sNoReg.test(data["sNo"])) {
        alert(errorObj["sNo"][1]);
        return false;
    }
    //验证年龄
    var age = new Date().getFullYear() - data.birth;
    if (age > 0) {
        if (age > 50) {
            alert(errorObj["birth"][1]);
            return false;
        }
    } else {
        alert(errorObj["birth"][2]);
        return false;
    }
    //验证邮箱
    var emailReg = /\w+@\w+\.\w/;
    if (!emailReg.test(data["email"])) {
        console.log(data["email"]);
        alert(errorObj["email"][1]);
        return false;
    }
    //验证手机号
    var phoneReg = /^\d{11}$/;
    if (!phoneReg.test(data['phone'])) {
        alert(errorObj["phone"][1]);
        return false;
    }

    return true;
}


// 登录判断
var userData = JSON.parse(sessionStorage.getItem('studentMessageId'));
if(userData) {
    $.ajax({
        url: 'http://open.duyiedu.com/api/student/stuLogin',
        type: 'post',
        data: $.extend({
            appkey: 'Mr_Xiao_1602570076987'
        },userData),
        dataType: 'json',
        success: function(res){
            if(res.status === 'success'){
                getTableData();
                bindEvent();
            }else{
                console.log(123);
                location.href = './SignIn/login.html';
            }
        }
    })
}else{
    location.href = './SignIn/login.html';
}

// console.log(/* $.extend({appkey: 'Mr_Xiao_1602570076987'}, */userData);