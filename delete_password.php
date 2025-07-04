<?php
require '../config.php';

$data = json_decode(file_get_contents("php://input"), true);
$password_id = $data['password_id'];
$user_id = $data['user_id'];

// Basic security: ensure this password belongs to the user
$stmt = $pdo->prepare("DELETE FROM passwords WHERE id = ? AND user_id = ?");
$stmt->execute([$password_id, $user_id]);

echo json_encode(["status" => "ok"]);
