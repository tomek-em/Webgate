<?php

class BMark {
    private $db;
    
    public function __construct() {
        $this->db = new Database;
    }
    
    // add event to db
    public function addSingleBookmark($data) {
        $this->db->query('INSERT INTO bookmarks (title, web, user_id, bm_group) VALUES(:title, :web, :user_id, :bm_group)');
        $this->db->bind(':title', $data['title']);
        $this->db->bind(':web', $data['web']);
        $this->db->bind(':user_id', $_SESSION['user_id']);
        $this->db->bind(':bm_group', $data['bm_group']);

        if($this->db->execute()) {
            return $event_id;
        } else {
            return 0;
        }
    }
    
    // get bookmarks
    public function getBookmarksByUser(){
        $this->db->query('SELECT * FROM bookmarks 
                WHERE user_id = :user_id
                ORDER BY title ASC');
        $this->db->bind(':user_id', $_SESSION['user_id']);

        $bmarks = $this->db->resultSet();
        return $bmarks;
    }
    
    
    // delete bookmark
    public function deleteSingleBookmark($id) {
        $this->db->query('DELETE FROM bookmarks WHERE id = :id');
        $this->db->bind(':id', $id);
        
        if($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }
    
}
