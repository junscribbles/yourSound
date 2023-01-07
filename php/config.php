<?php

$host = "localhost";
$user = "324886_3_1";
$password = "2PjSA8@awXIQ";
$dbname = "324886_3_1";

$pdo = new PDO('mysql:host='. $host . '; dbname=' . $dbname . ';charset=utf8', $user, $password);
$pdo->exec("set names utf8");