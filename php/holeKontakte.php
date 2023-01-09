<?php

require("config.php");
require("autorisieren.php");

$userID = $_POST["userID"];

$sql = "
SELECT myContacts.contactId, user.id, user.name, user.email, user.year
FROM myContacts
INNER JOIN user
ON user.id = myContacts.contactId
WHERE myContacts.userId = $userID
ORDER BY myContacts.timestamp DESC;
";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute();

if ($erfolg) {

    $array = $stmt->fetchAll();

    $jsonArray = json_encode($array);

    print_r($jsonArray);
}