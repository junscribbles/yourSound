<?php

require("config.php");
require("autorisieren.php");

$userID = $_POST["userID"];

$sql = "
SELECT advert.title, advert.detail, advert.image, advert.city, advert.time, advert.type, advert.id, advert.userId, user.name, user.email
FROM advert
INNER JOIN user
ON user.id = advert.userId
WHERE NOT user.id = '$userID'
ORDER BY advert.timestamp DESC;
";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute();

if ($erfolg) {

    $array = $stmt->fetchAll();

    $jsonArray = json_encode($array);

    print_r($jsonArray);
}