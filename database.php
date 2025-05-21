<?php
// /home/ubuntu/maintenance_project/config/database.php

define('DB_HOST', 'localhost');
define('DB_USER', 'root'); // Replace with your MySQL username if different
define('DB_PASS', 'password'); // Replace with your MySQL password
define('DB_NAME', 'maintenance_platform');

class Database {
    private $host = DB_HOST;
    private $user = DB_USER;
    private $pass = DB_PASS;
    private $dbname = DB_NAME;

    private $dbh; // Database Handler
    private $stmt; // Statement
    private $error;

    public function __construct() {
        // Set DSN (Data Source Name)
        $dsn = 'mysql:host=' . $this->host . ';dbname=' . $this->dbname . ';charset=utf8mb4';
        $options = [
            PDO::ATTR_PERSISTENT => true, // Persistent connection
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, // Error mode to exception
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, // Default fetch mode to associative array
            PDO::ATTR_EMULATE_PREPARES => false, // Turn off emulate prepares for security
        ];

        // Create PDO instance
        try {
            $this->dbh = new PDO($dsn, $this->user, $this->pass, $options);
        } catch (PDOException $e) {
            $this->error = $e->getMessage();
            // In a real application, you would log this error and show a user-friendly message
            // For now, we'll just echo it for debugging, but this should be removed in production.
            echo 'Connection Error: ' . $this->error;
            // You might want to throw the exception or handle it more gracefully
            // For example, by redirecting to an error page or returning a JSON error response.
            // For this project, we will let it echo for now during development.
        }
    }

    // Prepare statement with query
    public function query($sql) {
        $this->stmt = $this->dbh->prepare($sql);
    }

    // Bind values
    public function bind($param, $value, $type = null) {
        if (is_null($type)) {
            switch (true) {
                case is_int($value):
                    $type = PDO::PARAM_INT;
                    break;
                case is_bool($value):
                    $type = PDO::PARAM_BOOL;
                    break;
                case is_null($value):
                    $type = PDO::PARAM_NULL;
                    break;
                default:
                    $type = PDO::PARAM_STR;
            }
        }
        $this->stmt->bindValue($param, $value, $type);
    }

    // Execute the prepared statement
    public function execute() {
        return $this->stmt->execute();
    }

    // Get result set as array of objects
    public function resultSet() {
        $this->execute();
        return $this->stmt->fetchAll(PDO::FETCH_OBJ); // Or PDO::FETCH_ASSOC for associative array
    }

    // Get single record as object
    public function single() {
        $this->execute();
        return $this->stmt->fetch(PDO::FETCH_OBJ); // Or PDO::FETCH_ASSOC
    }

    // Get row count
    public function rowCount() {
        return $this->stmt->rowCount();
    }

    // Get last inserted ID
    public function lastInsertId() {
        return $this->dbh->lastInsertId();
    }

    // Get the database handler
    public function getDbh() {
        return $this->dbh;
    }
}
?>
