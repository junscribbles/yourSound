<?php

require("config.php");
require("autorisieren.php");

$userID = $_POST["userID"];
$requestID = $_POST["requestID"];

$sql = "
INSERT INTO denied (userId, deniedId)
SELECT request.userId, request.requestId
FROM request
WHERE request.userId = '$userID'
AND request.requestId = '$requestID';

DELETE FROM request
WHERE request.userId = '$userID'
AND request.requestId = '$requestID';
";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute();

if ($erfolg) {

    $array = $stmt->fetchAll();

    $jsonArray = json_encode($array);

    print_r($jsonArray);
}