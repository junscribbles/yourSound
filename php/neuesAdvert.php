<?php

require('config.php');
require('autorisieren.php');

// userid muss auch noch übermittelt werden!

$user =  $_POST["user"];

$title = $_POST["title"];
$detail = $_POST["detail"];
$image = $_POST["image"];
$city = $_POST["city"];
$time = $_POST["time"];
$type = $_POST["type"];


$sql = "INSERT INTO advert (userId, title, detail, image, city, time, type) VALUES (:UserId, :Title, :Detail, :Image, :City, :Time, :Type)";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute(array('UserId' => $user, 'Title' => $title, 'Detail' => $detail, 'Image' => $image, 'City' => $city, 'Time' => $time, 'Type' => $type));

if ($erfolg) {

    // print_r('WG erfolgreich erstellt!');

    // $letzteID = $pdo->lastInsertId();
    

    print_r("Inserat erflogreich erstellt!");

} else {

    print_r($erfolg);
};