<?php
header('Content-Type: application/json');

$host = "localhost";
$user = "root";
$pass = "";
$db = "db_wedding";

$data = json_decode(file_get_contents('php://input'), true);

if (empty($data['name']) || empty($data['phone']) || empty($data['guests'])) {
  http_response_code(400);
  echo json_encode([
    'status' => 'error',
    'message' => 'All required fields must be filled'
  ]);
  exit;
}

// Sanitize input
$name = trim($data['name']);
$phone = trim($data['phone']);
$guests = (int)$data['guests'];
$attending = $data['attending'] === 'yes' ? 'yes' : 'no';
$message = isset($data['message']) ? trim($data['message']) : '';

try {
  $conn = new mysqli($host, $user, $pass, $db);
  
  if ($conn->connect_error) {
    throw new Exception("Connection failed: " . $conn->connect_error);
  }

  $stmt = $conn->prepare("INSERT INTO rsvp (name, phone, guests, attending, message) VALUES (?, ?, ?, ?, ?)");
  if (!$stmt) {
    throw new Exception("Prepare failed: " . $conn->error);
  }

  $stmt->bind_param("ssiss", $name, $phone, $guests, $attending, $message);

  // Execute
  if ($stmt->execute()) {
    echo json_encode([
      'status' => 'success',
      'message' => 'RSVP submitted successfully'
    ]);
  } else {
    throw new Exception("Execute failed: " . $stmt->error);
  }

  $stmt->close();
  $conn->close();
} catch (Exception $e) {
  http_response_code(500);
  echo json_encode([
    'status' => 'error',
    'message' => 'Database error: ' . $e->getMessage()
  ]);
}
?>