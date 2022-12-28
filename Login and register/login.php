<?php
session_start();
include_once('function.php');
$users = new User();
unset($_SESSION['error']);
if (isset($_POST['submit'])) {
    $result = $users->login_user();
    if ($result !== "success") {
        $_SESSION['error'] = $users->process_error($result);
        unset($_SESSION['message']);
    } else {
        unset($_SESSION['error']);
        $user_info = $users->get_user_info();
        $_SESSION['username'] = $user_info['username'];
        $_SESSION['email'] = $user_info['email'];
        header("location: index.php");
    }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login | PHP</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div class="login-container">
        <form method="POST">
            <h2>Login</h2>
            <?php if (isset($_SESSION['error'])) { ?>
                <span class="error">Error : <?= $_SESSION['error']; ?></span>
            <?php } ?>
            <?php if (isset($_SESSION['message'])) { ?>
                <span class="message"><?= $_SESSION['message']; ?></span>
            <?php } ?>
            <div class="input-container">
                <label>Email</label>
                <input type="text" name="email" required>
            </div>
            <div class="input-container">
                <label>Password</label>
                <input type="password" name="password" required>
            </div>
            <button type="submit" name="submit">Login</button>
            <div class="login-links">
                <a href="register.php">Don't have an account yet? Register here</a>
            </div>

        </form>
    </div>
</body>

</html>