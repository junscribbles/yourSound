<?php

require('config.php');
require('autorisieren.php');

$userID =  $_POST["user"];

$username = $_POST["username"];
$year = $_POST["year"];
$email = $_POST["email"];
$password = $_POST["password"];

$password = password_hash($password, PASSWORD_DEFAULT);

$sql = "
UPDATE user
SET name = '$username', year = '$year', email = '$email', password = '$password'
WHERE user.id = '$userID';
";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute();

if ($erfolg) {

    $array = $stmt->fetchAll();

    $jsonArray = json_encode($array);

    print_r($jsonArray);
}