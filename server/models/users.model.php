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
            $sql = "SELECT id, firstName, lastName, email, phone, birthday, about FROM " . $this->table . " WHERE id = '" . $id . "'";
            return $this->conn->query($sql)->fetch_assoc();
        }

        return false;
    }

    public function getUserAvatar($id) {
        if (isset($id)) {
            $sql = "SELECT img FROM " . $this->table . " WHERE id = '" . $id . "'";
            return $this->conn->query($sql)->fetch_assoc();
        }

        return false;
    }

    public function updateUser($files, $userData) {
        $user = json_decode($userData);

        if (isset($user->id)) {
            $imageResult;

            if (isset($files["img"])) {
                $image = $files["img"];
                echo json_encode($image);
                $sql = "UPDATE " . $this->table . " SET img = '" . $image["name"] . "'";
                $imageResult = $this->conn->query($sql);
            } else {
                $imageResult = true;
            }

            $sql = "UPDATE " . $this->table . " SET firstName = '" . $user->firstName . "', lastName = '" . $user->lastName . "', email = '" . $user->email . "', phone = '" . $user->phone . "', birthday = '" . $user->birthday . "', about = '" . $user->about . "' WHERE id = '" . $user->id . "'";
            return ($this->conn->query($sql) && $imageResult);
        }

        return false;
    }
}