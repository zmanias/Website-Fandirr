<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = htmlspecialchars($_POST['email']);
    $password = htmlspecialchars($_POST['password']);

    // Baca data dari file
    $file = fopen('users.txt', 'r');
    $isValid = false;

    while (($line = fgets($file)) !== false) {
        list($name, $storedEmail, $storedPassword) = explode(',', trim($line));

        if ($email === $storedEmail && password_verify($password, $storedPassword)) {
            $_SESSION['name'] = $name;
            $_SESSION['email'] = $email;
            $isValid = true;
            break;
        }
    }
    fclose($file);

    if ($isValid) {
        // Redirect ke dashboard
        header("Location: dashboard.html");
        exit();
    } else {
        echo "Invalid email or password. Please try again.";
    }
}
?>