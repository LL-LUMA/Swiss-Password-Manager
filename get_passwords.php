<?php
require '../config.php';

$user_id = $_GET['user_id'];
$stmt = $pdo->prepare("SELECT id, site, username, password FROM passwords WHERE user_id = ?");
$stmt->execute([$user_id]);

$passwords = $stmt->fetchAll();
foreach ($passwords as &$p) {
  $p['password'] = base64_decode($p['password']); // decode
}

echo json_encode($passwords);
