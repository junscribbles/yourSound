<?php

require("config.php");
require("autorisieren.php");

$userID = $_POST["userID"];

$sql = "
SELECT denied.deniedId, user.id, user.name, user.year
FROM denied
INNER JOIN user
ON user.id = denied.deniedId
WHERE denied.userId = $userID
ORDER BY denied.timestamp DESC;
";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute();

if ($erfolg) {

    $array = $stmt->fetchAll();

    $jsonArray = json_encode($array);

    print_r($jsonArray);
}