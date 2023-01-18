<?php

require("config.php");
require("autorisieren.php");

$userID = $_POST["userID"];
$advertID = $_POST["advertID"];

$sql = "
SELECT * FROM advert
WHERE id = '$advertID';
";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute();

if ($erfolg) {

    $array = $stmt->fetchAll();

    $jsonArray = json_encode($array);

    print_r($jsonArray);
}