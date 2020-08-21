<?php
/*
* calendar module:
* fetch, add and update events
* show month, week, adn slot calendar
* slot AJAX endpoint is in separated module: Slots.php
*/

class Calendar extends Core {
    private $db;

    public function __construct() {
        $this->events = new EventModel;
    }

    // get multiple events from database
    public function getEvents() {
        if(($_SERVER['REQUEST_METHOD'] == 'POST') && (isset($_SESSION['user_id'])))  {
            $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
            $start = date("Y-m-d", strtotime($_POST["first"]));
            $end = date("Y-m-d", strtotime($_POST["last"]));

            $events = $this->events->getEventsByDate($start, $end);
            echo json_encode($events);
        }
    }

    // get single event by id
    public function getSingleEvent() {
        if(($_SERVER['REQUEST_METHOD'] == 'POST') && (isset($_SESSION['user_id'])))  {
            $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
            $id = trim($_POST['id']);

            $event = $this->events->getEventById($id);
            echo json_encode($event);
        }
    }

    // add event
    public function addEvent() {
        if(($_SERVER['REQUEST_METHOD'] == 'POST') && (isset($_SESSION['user_id'])))  {
            $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);

            $data = $_POST;
            $data['date'] = date("Y-m-d", strtotime($_POST["date"]));

            $event_id = $this->events->addSingleEvent($data);
            if ($event_id) {
                echo json_encode($event_id);
            }
        }
    }

    // update event
    public function updateEvent() {
        if(($_SERVER['REQUEST_METHOD'] == 'POST') && (isset($_SESSION['user_id'])))  {
            $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);

            $data = $_POST;
            $data['date'] = date("Y-m-d", strtotime($_POST["date"]));

            $resp = $this->events->updateSingleEvent($data);
            echo $resp;
        }
    }

    // delete event
    public function deleteEvent($url_param) {
        if(($_SERVER['REQUEST_METHOD'] == 'DELETE') && (isset($_SESSION['user_id'])))  {
            $event_id = $url_param;
            $response = $this->events->deleteSingleEvent($event_id);
            if($response) {
                $response = 'Event '.print_r($event_id).' deleted';
            } else {
                $response = NULL;
            }
            echo $response;
        }
    }

    // mark event done
        public function doneEvent() {
        if(($_SERVER['REQUEST_METHOD'] == 'POST') && (isset($_SESSION['user_id'])))  {
            $event_id = $_POST['id'];

            $response = $this->events->markEventDone($event_id);
            if($response) {
                $response = 'done';
            } else {
                $response = NULL;
            }
            echo $response;
        }
    }


    // get all events
    public function getAllEvents($type, $date) {
        $this->db->query('SELECT * FROM events WHERE user_id = :user_id ORDER BY date DESC');
            $this->db->bind(':user_id', $_SESSION['user_id']);

            $results = $this->db->resultSet();
            return $results;
    }



    // SHOW MONTH CALENDAR
    public function month() {
        $this->render('calendar/month', $data);
    }

    // SHOW WEEK CALENDAR
    public function week($d) {
        $data = [
          'date' => $d
        ];
        $this->render('calendar/week', $data);
    }

    // SHOW SLOT CALENDAR
    // SLOT ENDPOINTS: add, delete slots are in separated module Slots.php
    public function slots() {
        if(($_SERVER['REQUEST_METHOD'] == 'POST') && (isset($_SESSION['user_id'])))  {
        }
        // fetch all users to select one in slot calendar
        $this->usr = new UserModel;
        $data = $this->usr->getAllUsers();
        $this->render('calendar/slots', $data);
    }


    // show user event list
    public function events() {
        $start = date("Y-m-d", strtotime('2015-01-01'));
        $end = date("Y-m-d", strtotime('2045-01-01'));
        $events = $this->events->getEventsByDate($start, $end);
        $this->render('calendar/events', $events);
    }


    public function test() {
        echo ('test');

    }

}

?>
