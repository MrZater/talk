$('#submit').click(function () {
    //获取input框里的文本
    var val = $('#word').val();
    //判断是否有文本
    if (val) {
        //根据文本内容渲染用户发出的消息
        randerDom('mine',val);
        //渲染后，清空文本框
        $('#word').val('')
        // 以文本框内文本为data发送ajax请求
        $.ajax({
            // 请求方式
            type: 'GET',
            // 请求地址
            url: 'https://developer.duyiedu.com/edu/turing/chat',
            //请求数据
            data: {
                text: val
            },
            //请求所获取数据的格式
            dataType: 'json',
            //获取成功后执行的函数
            success: function (res) {
                //将获取的data进行robot渲染
                randerDom('robot',res.text)
            }
        })
    }
})

// 键盘回车键抬起也触发点击事件
$('#word').on('keyup',function(e){
    // 判断抬起的是否是回车键
    if(e.keyCode === 13){
        //代码触发点击事件
        $('#submit').click();
    }
})

/**
 * 渲染对话dom
 * @param {*} role 
 * @param {*} text 
 */
function randerDom(role, text) {
    // 创建dom，并将所需数据拼接进dom
    $(`<div class="${role}">
    <img src="./image/${role == 'mine'?'3.png':'dog1.jpg'}" alt="">
    <div class="text">
        ${text}
    </div>
</div>`).appendTo($('.content'));
//获取当前对话框的滚动条高度
var scrollHeight = $('.content')[0].scrollHeight
// 获取对话框的高度
var contentHeight = $('.content')[0].offsetHeight;
// 每次渲染完成，将滚动条滚动到最底部
$('.content').scrollTop(scrollHeight - contentHeight);
}