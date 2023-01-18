<?php

require('config.php');
require('autorisieren.php');

$user =  $_POST["user"];
$advertID = $_POST["advertID"];

$title = $_POST["title"];
$detail = $_POST["detail"];
$image = $_POST["image"];
$city = $_POST["city"];
$time = $_POST["time"];
$type = $_POST["type"];


$sql = "
UPDATE advert
SET title = '$title', detail = '$detail', image = '$image', city = '$city', time = '$time', type = '$type'
WHERE advert.id = '$advertID';
";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute();

if ($erfolg) {

    $array = $stmt->fetchAll();

    $jsonArray = json_encode($array);

    print_r($jsonArray);
}