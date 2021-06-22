$(function() {
    $.get('php/list.php', res => {
        // console.log(res);
        var { meta: { status, msg }, data } = res;
        if (status === 1) {
            // var html = '';
            // data.forEach(item => {
            //     html += `
            // <div class="col-lg-4 col-md-3 col-sm-6 col-xs-12">
            //     <div class="thumbnail">
            //         <img src="${item.img}" alt="...">
            //         <div class="caption">
            //         <h3 class="goodsname">${item.name}</h3>
            //         <p class="description">${item.description}</p>
            //         <p><a href="#" class="btn btn-primary" role="button">查看详情</a> <a href="#" class="btn btn-default" role="button">立即购买</a></p>
            //         </div>
            //     </div>
            // </div>
            //       `
            // })

            // 使用分页
            var pageSize = 9
            var p = new Page('page', {
                // language:{
                //     first:"|<<",
                //     prev:"<<",
                //     next:">>",
                //     last:">>|" 
                // },
                pageData: {
                    total: data.length,
                    pageSize
                },
                show: function(currentPage) {
                    var brr = data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
                    var str = '';
                    brr.forEach(item => {
                        str += `
                       <div class="col-lg-4 col-md-3 col-sm-6 col-xs-12">
                       <div class="thumbnail">
                           <img src="${item.img}" alt="...">
                           <div class="caption">
                           <h3 class="goodsname">${item.name}</h3>
                           <p class="description">${item.description}</p>
                           <p><a href="details.html?id=${item.id}" class="btn btn-primary" role="button">查看详情</a> <a href="#" class="btn btn-default" role="button">立即购买</a></p>
                           </div>
                       </div>
                   </div>
                       `
                    })
                    $('.goods .row').html(str)
                }
            })

        }
    }, 'json')


})