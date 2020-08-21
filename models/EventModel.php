<?php

class EventModel {
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


}
?>
