<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

class Database {
    private $host = "localhost";
    private $username = "root";
    private $password = "root";
    private $name = "dynamic_solutions";
    public $conn;

    private static $instance = null;

    private function __construct() {
        $this->conn = mysqli_connect($this->host, $this->username, $this->password, $this->name);

        if(!$this->conn) {
            die("Connection failed: " . mysqli_connect_error());
        }

        mysqli_set_charset($this->conn, "utf8");
    }

    public static function getInstance()
    {
        if (self::$instance == null)
        {
            self::$instance = new Database();
        }
        return self::$instance;
    }

    public function getConnection() {
        return $this->conn;
    }
}

?>