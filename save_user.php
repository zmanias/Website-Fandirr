<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    // Baca data dari file
    $users = file('users.txt', FILE_IGNORE_NEW_LINES);

    // Periksa apakah email sudah digunakan
    $email_taken = false;
    foreach ($users as $user) {
        list($saved_name, $saved_email, $saved_password) = explode(',', $user);
        if ($email === $saved_email) {
            $email_taken = true;
            break;
        }
    }

    if ($email_taken) {
        // Redirect ke signup dengan parameter error
        header("Location: signup.html?error=email_taken");
    } else {
        // Simpan data ke file
        $data = "$name,$email,$password\n";
        file_put_contents('users.txt', $data, FILE_APPEND);

        // Redirect ke signup dengan parameter sukses
        header("Location: signup.html?registered=true");
    }
    exit();
}
?>