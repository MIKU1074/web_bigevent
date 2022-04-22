$(function(){
    let layer=layui.layer
    let form=layui.form
    initArtCatelist()
    //获取文章的分类列表
    function initArtCatelist(){
        $.ajax({
            method:'get',
            url:'/my/article/cates',
            success:function(res){
                let htmlstr=template('tpl-table',res)
                $('tbody').html(htmlstr)
            }
        })
    }
    let indexAdd=null
    //为添加类别按钮绑定点击事件
    $('#btnAddCate').on('click',function(){
        indexAdd=layer.open({
            type:1,
            area: ['500px', '250px'],
            title: '添加文章分类'
            ,content: $('#dialog-add').html()
          })
    })

    //通过代理的形式，为from-add表单绑定submit事件
    $('body').on('submit','#from-add',function(e){
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!=0){
                    return layer.msg('新增分类失败！')
                }
                initArtCatelist()
                layer.msg('新增分类成功！')
                //根据索引，关闭对应弹出层
                layer.close(indexAdd)
            }
        })
    })

    //通过代理的形式，为btn-edit按钮绑定点击事件
    let indexEdit=null
    $('tbody').on('click','.btn-edit',function(){
        //弹出一个修改文章信息分类的层
        indexEdit=layer.open({
            type:1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
          })
        let id=$(this).attr('data-id')
        //发起请求获取对应分类的数据
        $.ajax({
            method:'get',
            url:'/my/article/cates/'+id,
            success:function(res){
                form.val('from-edit',res.data)
            }
        })
    })
    //通过代理的形式，为修改分类的表单绑定submit事件
    $('body').on('submit','#from-edit',function(e){
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!=0) return layer.msg('更新数据失败！')
                layer.msg('更新数据成功！')
                layer.close(indexEdit)
                initArtCatelist()
            }
        })
    })

    //通过代理的形式，为删除按钮绑定点击事件
    $('tbody').on('click','.btn-delete',function(){
        let id=$(this).attr('data-id')
        //提示用户是否要删除
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method:'get',
                url:'/my/article/deletecate/'+id,
                success:function(res){
                    if(res.status!=0) return layer.msg('删除分类失败！')
                    layer.msg('删除分类成功败！')
                    initArtCatelist()
                }

            })
            
            layer.close(index);
          });
    })
})