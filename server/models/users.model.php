<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once('../connect.php');

class Users {
    private $conn;
    private $table = "users";

    private $id;
    private $firstName;
    private $lastName;
    private $email;
    private $phone;
    private $birthday;
    private $about;
    private $img;

    public function __construct() {
        $this->db = Database::getInstance();
        $this->conn = $this->db->getConnection();
    }

    public function getUserById($id) {
        if (isset($id)) {
            $sql = "SELECT id, firstName, lastName, email, phone, birthday, about, img FROM " . $this->table . " WHERE id = '" . $id . "'";
            return $this->conn->query($sql)->fetch_assoc();
        }

        return false;
    }

    public function updateUser($data) {
        if (isset($data->id)) {
            $sql = "UPDATE " . $this->table . " SET firstName = '" . $data->firstName . "', lastName = '" . $data->lastName . "', email = '" . $data->email . "', phone = '" . $data->phone . "', birthday = '" . $data->birthday . "', about = '" . $data->about . "' WHERE id = '" . $data->id . "'";
            return $this->conn->query($sql);
        }

        return false;
    }
}