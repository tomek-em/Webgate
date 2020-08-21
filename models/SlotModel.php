<?php

class SlotModel {
    private $db;

    public function __construct() {
        $this->db = new Database;
    }

    // add slot
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
