<?php

require('config.php');

$username = $_POST["username"];
$year = $_POST["year"];
$email = $_POST["email"];
$password = $_POST["password"];

$password = password_hash($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO user (name, year, email, password) VALUES (:Name, :Year, :Email, :Password)";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute(array('Name' => $username, 'Year' => $year, 'Email' => $email, 'Password' => $password));

if ($erfolg) {

    print_r('Registrierung erfolgreich.');
} else {

    print_r($erfolg);
};