<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();
include_once('function.php');
unset($_SESSION['error']);
$users = new User();
if (isset($_POST['submit'])) {
    $result = $users->register_user();
    if ($result !== "success") {
        $_SESSION['error'] = $users->process_error($result);
    } else {
        unset($_SESSION['error']);
        header("location: login.php");
    }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register | PHP</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div class="login-container">
        <form method="POST">
            <h2>Register</h2>
            <?php if (isset($_SESSION['error'])) { ?>
                <span class="error">Error : <?= $_SESSION['error']; ?></span>
            <?php } ?>
            <div class="input-container">
                <label>Username</label>
                <input type="text" name="username" required>
            </div>
            <div class="input-container">
                <label>Email</label>
                <input type="email" name="email" required>
            </div>
            <div class="input-container">
                <label>Password</label>
                <input type="password" name="password" required>
            </div>
            <div class="input-container">
                <label>Confirm Password</label>
                <input type="password" name="password2" required>


            </div>
            <button type="submit" name="submit">Register</button>
            <div class="login-links">
                <a href="login.php">Already have an account? Login here</a>
            </div>

        </form>
    </div>
</body>

</html>