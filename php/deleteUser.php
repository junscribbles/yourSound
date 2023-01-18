<?php

require("config.php");
require("autorisieren.php");

$userID = $_POST["userID"];


$sql = "
DELETE t1, t2, t3, t4, t5, t6 FROM user as t1
LEFT JOIN advert as t2 on t1.id = t2.userId
LEFT JOIN myContacts as t3 on t1.id = t3.userId OR t1.id = t3.contactId
LEFT JOIN request as t4 on t1.id = t4.userId OR t1.id = t4.requestId
LEFT JOIN denied as t5 on t1.id = t5.userId OR t1.id = t5.deniedId
LEFT JOIN session as t6 on t1.id = t6.User_ID
WHERE t1.id='$userID'
";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute();

if ($erfolg) {

    $array = $stmt->fetchAll();

    $jsonArray = json_encode($array);

    print_r($jsonArray);
}