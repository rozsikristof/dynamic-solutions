<?php

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
    private $image;

    public function __construct() {
        $this->db = Database::getInstance();
        $this->conn = $this->db->getConnection();
    }

    public function getUserById($id) {
        if (isset($id)) {
            $sql = "SELECT * FROM " . $this->table . " WHERE id = '" . $id . "'";
            $userInfo = $this->conn->query($sql)->fetch_assoc();

            if (isset($userInfo["image"])) {
                $userInfo["image"] = base64_encode($userInfo["image"]);
            } else {
                $userInfo["image"] = null;
            }

            return $userInfo;
        }

        return false;
    }

    public function updateUser($user, $image) {
        if (isset($user->id)) {
            $imageResult;
            $sql = "UPDATE " . $this->table . " SET firstName = '" . $user->firstName . "', lastName = '" . $user->lastName . "', email = '" . $user->email . "', phone = '" . $user->phone . "', birthday = '" . $user->birthday . "', about = '" . $user->about . "' WHERE id = '" . $user->id . "'";
            $result = $this->conn->query($sql);

            if (isset($image["tmp_name"])) {
                $imageData = addslashes(file_get_contents($image["tmp_name"]));
                $sql = "UPDATE " . $this->table . " SET image = '" . $imageData . "' WHERE id = '" . $user->id . "'";
                $imageResult = $this->conn->query($sql);
            } else {
                $imageResult = true;
            }

            return ($result && $imageResult);
        }

        return false;
    }
}