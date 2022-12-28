<?php

define("USER_DATABASE", "324886_3_1");
define("USER_TABLE", "users");

class User
{

    public function connect()
    {

        $servername = "localhost";
        $username = "324886_3_1";
        $password = "2PjSA8@awXIQ";

        // Create connection
        $conn = new mysqli($servername, $username, $password, USER_DATABASE);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } else {
            return $conn;
        }
    }


    function register_user()
    {
        $conn = $this->connect();

        $username = $conn->real_escape_string($_POST['username']);
        $email = $conn->real_escape_string($_POST['email']);
        $password = $conn->real_escape_string($_POST['password']);
        $password2 = $conn->real_escape_string($_POST['password2']);


        if ($password == $password2) {

            $check = $this->user_duplicate($email);

            if ($check > 0) {
                return "err-2";
            } else {

                $sql = "INSERT INTO " . USER_TABLE . " (`username`,   `email`, `password` )
            VALUES ('$username', '$email', '$password')";

                if ($conn->query($sql) === TRUE) {
                    return "success";
                } else {
                    return $conn->error;
                }
                $conn->close();
            }
        } else {
            return "err-3";
        }
    }

    function user_duplicate($email)
    {

        $conn = $this->connect();

        $sql = "SELECT email FROM " . USER_TABLE . " WHERE email = '$email'";
        $user = $conn->query($sql) or $conn->error;
        $num_rows = $user->num_rows;

        return $num_rows;

        $conn->close();
    }

    function login_user()
    {

        $conn = $this->connect();
        $email = $conn->real_escape_string($_POST['email']);
        $password = $conn->real_escape_string($_POST['password']);


        $sql = "SELECT * FROM " . USER_TABLE . " WHERE email = '$email' AND password = '$password'";
        $user = $conn->query($sql) or $conn->error;
        $num_rows = $user->num_rows;
        $row = $user->fetch_assoc();

        if ($num_rows > 0) {
            return 'success';
            $conn->close();
        } else {
            return "err-4";
        }
    }

    function get_user_info()
    {
        $conn = $this->connect();
        //you can get the info from different parameter like row
        $email = $conn->real_escape_string($_POST['email']);

        $sql = "SELECT * FROM " . USER_TABLE . " WHERE email = '$email'";
        $user = $conn->query($sql) or $conn->error;
        $num_rows = $user->num_rows;
        $row = $user->fetch_assoc();

        if ($num_rows > 0) {

            return $row;
        } else {

            return false;
        }
    }

    function get_user_info_by_email($email)
    {
        $conn = $this->connect();
        //you can get the info from different parameter like row


        $sql = "SELECT * FROM " . USER_TABLE . " WHERE email = '$email'";
        $user = $conn->query($sql) or $conn->error;
        $num_rows = $user->num_rows;
        $row = $user->fetch_assoc();

        if ($num_rows > 0) {

            return $row;
        } else {

            return false;
        }
    }


    function process_error($error)
    {

        if ($error == "err-1") {
            return  "error registering user";
        }

        if ($error == "err-2") {
            return "user already exist";
        }

        if ($error == "err-3") {
            return "password did not match";
        }

        if ($error == "err-4") {
            return "user doest not exist";
        }

        if ($error == "err-5") {
            return "password is incorrect";
        }
    }
}
