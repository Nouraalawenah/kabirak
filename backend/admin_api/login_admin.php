<?php
header("Content-Type: application/json");
include '../conn.php';

function loginUser($email, $password) {
    global $conn;

    $email = mysqli_real_escape_string($conn, $email);

    $query = "SELECT * FROM admins WHERE email = '$email'";
    $result = mysqli_query($conn, $query);

    if ($result && mysqli_num_rows($result) > 0) {
        $user = mysqli_fetch_assoc($result);

        if (password_verify($password, $user['password'])) {
            return ['success' => true, 'message' => 'Login successful', 'data' => $user];
        } else {
            return ['success' => false, 'message' => 'Invalid email or password', 'data' => null];
        }
    } else {
        return ['success' => false, 'message' => 'Invalid email or password', 'data' => null];
    }
}

function handleRequest() {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!empty($data['email']) && !empty($data['password'])) {
            $email = $data['email'];
            $password = $data['password'];
            $response = loginUser($email, $password);
            echo json_encode($response);
        } else {
            echo json_encode(['success' => false, 'message' => 'Email and password are required', 'data' => null]);
        }
    } else {
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed', 'data' => null]);
    }
}

handleRequest();
?>
