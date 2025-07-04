<?php
require '../config.php';

$data = json_decode(file_get_contents("php://input"), true);
$user_id = $data['user_id'];
$site = $data['site'];
$username = $data['username'];
$password = base64_encode($data['password']); // simple encoding, not true encryption

$stmt = $pdo->prepare("INSERT INTO passwords (user_id, site, username, password) VALUES (?, ?, ?, ?)");
$stmt->execute([$user_id, $site, $username, $password]);

echo json_encode(["status" => "ok"]);
