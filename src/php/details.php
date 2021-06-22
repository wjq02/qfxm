<?php
header("content-type:text/html;charset=utf8");
$id=$_GET['id'];
$con=mysqli_connect('localhost','root','root','gp6');
mysqli_query($con,'set names utf8');
$res=mysqli_query($con,"select * from goods where id=$id");
$row=mysqli_fetch_Assoc($res);
echo json_encode([
  "meta"=>[
    "status"=>1,
    "msg"=>"数据获取成功"
  ],
  "data"=>$row
]);
