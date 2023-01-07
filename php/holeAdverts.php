<?php

require("config.php");
require("autorisieren.php");

$sql = "
SELECT advert.title, advert.detail, advert.image, advert.city, advert.time, advert.type, advert.short, user.name, user.email
FROM advert
INNER JOIN user
ON user.id = advert.userId
ORDER BY advert.timestamp DESC;
";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute();

if ($erfolg) {

    $array = $stmt->fetchAll();

    $jsonArray = json_encode($array);

    print_r($jsonArray);
}