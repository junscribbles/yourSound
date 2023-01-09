<?php

require("config.php");
require("autorisieren.php");

$userID = $_POST["userID"];

$sql = "
SELECT request.requestId, user.id, user.name, user.year
FROM request
INNER JOIN user
ON user.id = request.requestId
WHERE request.userId = $userID
ORDER BY request.timestamp DESC;
";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute();

if ($erfolg) {

    $array = $stmt->fetchAll();

    $jsonArray = json_encode($array);

    print_r($jsonArray);
}