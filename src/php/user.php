<?php
header("content-type:text/html;charset=utf8");
$username=$_GET['username'];
$con=mysqli_connect('localhost','root','root','gp6');
mysqli_query($con,'set names utf8');
$res=mysqli_query($con,"select * from user where username='$username'");
$row=mysqli_fetch_assoc($res);
if($row){
  $arr=[
    "meta"=>[
      "status"=>0,
      "msg"=>"用户名被占用"
      ]
    ];
}else{ 
  $res = mysqli_query($con,"update user SET username='$username' where id='7'");
  if($res){
    $arr=[
      "meta"=>[
        "status"=>1,
        "msg"=>"修改成功"
        ]
      ];
  }else{
    $arr=[
      "meta"=>[
        "status"=>2,
        "msg"=>"修改失败"
        ]
      ];
  }
}
echo json_encode($arr);

