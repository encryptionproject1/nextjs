<?php
header('Content-Type: application/json');

function encrypt_message($key, $message) {
    $salt = openssl_random_pseudo_bytes(16);
    $key = hash_pbkdf2("sha256", $key, $salt, 100000, 32, true);
    $iv = openssl_random_pseudo_bytes(16);
    $ciphertext = openssl_encrypt($message, 'aes-256-cfb', $key, OPENSSL_RAW_DATA, $iv);
    return base64_encode($salt . $iv . $ciphertext);
}

function decrypt_message($key, $encrypted_message) {
    $encrypted_message = base64_decode($encrypted_message);
    $salt = substr($encrypted_message, 0, 16);
    $iv = substr($encrypted_message, 16, 16);
    $ciphertext = substr($encrypted_message, 32);
    $key = hash_pbkdf2("sha256", $key, $salt, 100000, 32, true);
    return openssl_decrypt($ciphertext, 'aes-256-cfb', $key, OPENSSL_RAW_DATA, $iv);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $key = $data['key'];
    if (isset($data['message'])) {
        $message = $data['message'];
        $encrypted_message = encrypt_message($key, $message);
        echo json_encode(['encrypted_message' => $encrypted_message]);
    } elseif (isset($data['encrypted_message'])) {
        $encrypted_message = $data['encrypted_message'];
        $decrypted_message = decrypt_message($key, $encrypted_message);
        echo json_encode(['decrypted_message' => $decrypted_message]);
    } else {
        echo json_encode(['error' => 'Invalid input']);
    }
}
?>
