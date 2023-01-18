<?php

require("config.php");
require("autorisieren.php");

$userID = $_POST["userID"];

$sql = "
SELECT advert.title, advert.detail, advert.image, advert.city, advert.time, advert.type, advert.short, advert.id, advert.userId
FROM advert
WHERE advert.userId = '$userID'
ORDER BY advert.timestamp DESC;
";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute();

if ($erfolg) {

    $array = $stmt->fetchAll();

    $jsonArray = json_encode($array);

    print_r($jsonArray);
}