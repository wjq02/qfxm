<?php
header("content-type:text/html;charset=utf8");
$username=$_POST['username'];
$password=$_POST['password'];
$con=mysqli_connect('localhost','root','root','gp6');
mysqli_query($con,'set names utf8');
$res=mysqli_query($con,"select * from user where username='$username'and password='$password'");
$row=mysqli_fetch_assoc($res);
if($row){
  $arr=[
    "meta"=>[
      "status"=>1,
      "msg"=>"登录成功"
      ]
    ];
}else{
  $arr=[
    "meta"=>[
      "status"=>0,
      "msg"=>"用户名或密码错误"
      ]
    ];
}
echo json_encode($arr);