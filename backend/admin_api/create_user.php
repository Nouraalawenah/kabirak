<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Content-Type: application/json");
include '../conn.php';

function createUser() {
    global $conn;

    if (!$conn) {
        echo json_encode(['success' => false, 'message' => 'Database connection failed']);
        return;
    }

    // Validate required fields
    $requiredFields = ['username', 'email', 'password', 'phone', 'city', 'service', 'bio'];
    foreach ($requiredFields as $field) {
        if (empty($_POST[$field])) {
            echo json_encode(['success' => false, 'message' => "Missing field: $field"]);
            return;
        }
    }

    $name = mysqli_real_escape_string($conn, $_POST['username']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT);
    $phone = mysqli_real_escape_string($conn, $_POST['phone']);
    $city = mysqli_real_escape_string($conn, $_POST['city']);
    $service_id = mysqli_real_escape_string($conn, $_POST['service']);
    $bio = mysqli_real_escape_string($conn, $_POST['bio']);

    // Check if user exists
    $check = mysqli_query($conn, "SELECT * FROM technicians WHERE email = '$email' OR phone = '$phone'");
    if (mysqli_num_rows($check) > 0) {
        echo json_encode(['success' => false, 'message' => 'البريد الإلكتروني أو رقم الهاتف مسجل مسبقًا']);
        return;
    }

    // Handle Image Upload
    $imageName = null;
    if (isset($_FILES['profilePicture']) && $_FILES['profilePicture']['error'] == 0) {
        $targetDir = "../../uploads/";
        if (!file_exists($targetDir)) {
            mkdir($targetDir, 0777, true);
        }

        $ext = pathinfo($_FILES['profilePicture']['name'], PATHINFO_EXTENSION);
        $imageName = uniqid() . '.' . $ext;
        $targetFile = $targetDir . $imageName;

        if (!move_uploaded_file($_FILES['profilePicture']['tmp_name'], $targetFile)) {
            echo json_encode(['success' => false, 'message' => 'فشل في رفع الصورة']);
            return;
        }
    }

    // Insert into DB
    $query = "INSERT INTO technicians (name, email, password, phone, city, service_category_id, bio, profile_image, created_at, updated_at)
              VALUES ('$name', '$email', '$password', '$phone', '$city', '$service_id', '$bio', '$imageName', NOW(), NOW())";

    if (mysqli_query($conn, $query)) {
        echo json_encode(['success' => true, 'message' => 'تم إنشاء الحساب بنجاح']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . mysqli_error($conn)]);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    createUser();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
