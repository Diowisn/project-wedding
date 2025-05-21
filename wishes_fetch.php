<?php
header('Content-Type: application/json');

$host = "localhost";
$user = "root";
$pass = "";
$dbname = "db_wedding";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
  echo json_encode(["status" => "error", "message" => "Connection failed"]);
  exit();
}

$limit = isset($_GET['limit']) ? (int) $_GET['limit'] : 3;
$offset = isset($_GET['offset']) ? (int) $_GET['offset'] : 0;

$sql = "SELECT sender_name, message, created_at FROM wishes ORDER BY created_at DESC LIMIT $limit OFFSET $offset";
$result = $conn->query($sql);

$comments = [];

if ($result && $result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $comments[] = $row;
  }
}

echo json_encode([
  "status" => "success",
  "comments" => $comments
]);

$conn->close();
?>
