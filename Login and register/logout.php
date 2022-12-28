<?php
// initialize session
session_start();
// unset all existing session
session_unset();
// destroy all session to logout user
session_destroy();
// redirect user to home page
header("location: ./");
