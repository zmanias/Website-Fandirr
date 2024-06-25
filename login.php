<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = htmlspecialchars($_POST['email']);
    $password = $_POST['password'];

    // Baca data dari file
    $users = file('users.txt', FILE_IGNORE_NEW_LINES);

    $valid_credentials = false;
    $username = '';

    foreach ($users as $user) {
        list($saved_name, $saved_email, $saved_password) = explode(',', $user);
        if ($email === $saved_email && password_verify($password, $saved_password)) {
            $valid_credentials = true;
            $username = $saved_name;
            break;
        }
    }

    if ($valid_credentials) {
        $_SESSION['username'] = $username;
        header("Location: dashboard.html?welcome=true");
    } else {
        header("Location: login.html?error=invalid_credentials");
    }
    exit();
}
?>