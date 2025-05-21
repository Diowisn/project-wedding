<?php
header('Content-Type: application/json');

$host = "localhost";
$user = "root";
$pass = ""; 
$db = "db_wedding"; 

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
  echo json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]);
  exit();
}

$data = json_decode(file_get_contents("php://input"), true);

$name = trim($conn->real_escape_string($data['senderName'] ?? ''));
$message = trim($conn->real_escape_string($data['message'] ?? ''));

if (empty($name) || empty($message)) {
  echo json_encode(["status" => "error", "message" => "Nama dan ucapan wajib diisi."]);
  exit();
}

$sql = "INSERT INTO wishes (sender_name, message) VALUES ('$name', '$message')";

if ($conn->query($sql) === TRUE) {
  echo json_encode(["status" => "success", "message" => "Ucapan berhasil dikirim."]);
} else {
  echo json_encode(["status" => "error", "message" => "Database error: " . $conn->error]);
}

$conn->close();
?>
