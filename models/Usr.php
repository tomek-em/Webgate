<?php

class Usr {
    private $db;
    
    public function __construct() {
        $this->db = new Database;
    }
    
    // register user function ---------------
    public function registerUser($data) {
        $this->db->query('INSERT INTO users (name, email, password) VALUES(:name, :email, :password)');
        $this->db->bind(':name', $data['name']);
        $this->db->bind(':email', $data['email']);
        $this->db->bind(':password', $data['password']);

        // execute
        if($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }

    // find user by name
    public function findUserByName($name) {
        //die('no user');
        $this->db->query("SELECT * FROM users WHERE name = :name");
        $this->db->bind(':name', $name);

        $row = $this->db->single();

        // check row
        if($this->db->rowCount() > 0) {
            return true;
        } else {
            return false;
        }
    }
    
    public function getUserByName($name) {
        $this->db->query("SELECT id FROM users WHERE name = :name");
        $this->db->bind(':name', $name);
        
        $row = $this->db->single();
        return $row->id;
    }

    
    // login user
    public function logInUser($name, $password) {
        $this->db->query("SELECT * FROM users WHERE name = :name");
        $this->db->bind(':name', $name);

        $row = $this->db->single();

        $hashed_password = $row->password;
        if(password_verify($password, $hashed_password)) {;
            return $row;
        } else {
            return false;
        }
    }
    
    // get all users
    public function getAllUsers(){
        $this->db->query('SELECT name FROM users');

        $users = $this->db->resultSet();
        return $users;
    }
}

?>