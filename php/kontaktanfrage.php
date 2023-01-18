<?php

require("config.php");
require("autorisieren.php");

$userID = $_POST["advertUserID"];
$requestID = $_POST["userID"];

$sql = "
INSERT INTO request (userId, requestId)
VALUES ('$userID', '$requestID')
";


$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute();

if ($erfolg) {

    $array = $stmt->fetchAll();

    $jsonArray = json_encode($array);

    // print_r($jsonArray);

    echo "Kontaktanfrage versendet";

} else {

    echo "Anfrage bereits versendet";

}