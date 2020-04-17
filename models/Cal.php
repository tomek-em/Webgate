<?php

class Cal {
    private $db;
    
    public function __construct() {
        $this->db = new Database;
    }
    
    // get events by date
    public function getEventsByDate($start, $end){
        $this->db->query('SELECT * FROM events 
                WHERE user_id = :user_id
                AND date >= :start
                AND date <= :end
                ORDER BY date DESC');
        $this->db->bind(':user_id', $_SESSION['user_id']);
        $this->db->bind(':start', $start);
        $this->db->bind(':end', $end);

        $events = $this->db->resultSet();
        return $events;
    }
    
    // get one event by id
    public function getEventById($id){
        $this->db->query('SELECT * FROM events WHERE id = :id');
        $this->db->bind(':id', $id);

        $row = $this->db->single();
        return $row;
    }
    
    // add event to db
    public function addSingleEvent($data) {
        $this->db->query('INSERT INTO events (title, user_id, body, type, date) VALUES(:title, :user_id, :body, :type, :date)');
        $this->db->bind(':title', $data['title']);
        $this->db->bind(':user_id', $_SESSION['user_id']);
        $this->db->bind(':body', $data['body']);
        $this->db->bind(':type', $data['type']);
        $this->db->bind(':date', $data['date']);

        if($this->db->execute()) {
            $this->db->query('SELECT id FROM events WHERE user_id =         :user_id ORDER BY id DESC LIMIT 1');
            $this->db->bind(':user_id', $_SESSION['user_id']);
            $response = $this->db->single();
            $event_id = $response ->id;
            return $event_id;
        } else {
            return 0;
        }
    }
    
    // update event
    public function updateSingleEvent($data){
        $this->db->query('UPDATE events SET date = :date, title = :title, body = :body, type = :type, done = 0 WHERE id = :id');
        $this->db->bind(':id', $data['id']);
        $this->db->bind(':date', $data['date']);
        $this->db->bind(':title', $data['title']);
        $this->db->bind(':body', $data['body']);
        $this->db->bind(':type', $data['type']);

        // execute
        if($this->db->execute()) {
            return 'event changed';
        } else {
            return 'error. event not changed';
        }
    }
    
    // delete ev
    public function deleteSingleEvent($id) {
        $this->db->query('DELETE FROM events WHERE id = :id');
        $this->db->bind(':id', $id);
        
        if($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }
    
    // mark event done
    public function markEventDone($id) {
        $this->db->query('UPDATE events SET done = :done WHERE id = :id');
        $this->db->bind(':id', $id);
        $this->db->bind(':done', 1);
        
        if($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }
    
    
    
    // SLOTS -----------
    
    function addUserSlots($data) {
        $this->db->query('INSERT INTO slots (user_id, date, start) VALUES(:user_id, :date, :start)');
        $this->db->bind(':user_id', $_SESSION['user_id']);
        $this->db->bind(':date', $data['date']);
        $this->db->bind(':start', $data['start']);

        if($this->db->execute()) {
            $res = 'added';
        } else {
            $res = 'not added';
        }
        return $res;
    }
        
    
    // get events by date
    public function getSlotsByDate($start, $end, $user_id){
        $this->db->query('SELECT * FROM slots 
                WHERE user_id = :user_id
                AND date >= :start
                AND date <= :end
                ORDER BY start ASC');
        $this->db->bind(':user_id', $user_id);
        $this->db->bind(':start', $start);
        $this->db->bind(':end', $end);
        
        $res = $this->db->resultSet();
    
        return $res;
    }
    
    // delete slots by date
    public function deleteSlotsByDate($date) {
        $this->db->query('DELETE FROM slots WHERE date = :date AND user_id = :user_id');
        $this->db->bind(':date', $date);
        $this->db->bind(':user_id', $_SESSION['user_id']);
        
        if($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }
    
    // book slot
    public function bookSingleSlot($data){
        $this->db->query('UPDATE slots SET booked_by = :booked_by WHERE id = :id');
        $this->db->bind(':id', $data['id']);
        $this->db->bind(':booked_by', $_SESSION['user_name']);

        // execute
        if($this->db->execute()) {
            return 'booked';
        } else {
            return 'error. not booked';
        }
    }

}

?>