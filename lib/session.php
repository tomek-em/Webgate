<?php
    session_start();
    
    // flesh message helper
    // EXEMPLE - flash('register_seccess', 'you are now registered');
    // DISPLAY IN VIEW - echo flash('register_success);
    function flash($name = '', $message = '', $class = 'alert alert-success') {
        if(!empty($name)) {
            if((!empty($message)) && empty($_SESSION[$name])) { 
                //die('1 '. $message);
                if(!empty($_SESSION[$name])) {
                    unset($SESSION[$name]);
                }
                
                if(!empty($_SESSION[$name. '_class'])) {
                    unset($SESSION[$name. '_class']);
                }
                $_SESSION[$name] = $message;
                $_SESSION[$name. '_class'] = $class;
            
            }
            
            elseif(empty($message) && !empty($_SESSION[$name])){
                //die('2 ' .$_SESSION[$name]);
                $class = !empty($_SESSION[$name. '_class']) ? $_SESSION[$name. '_class'] : '';
                echo '<div class="'.$class.'" id="msg-flash">' .$_SESSION[$name] .'</div>';
                
                unset($_SESSION[$name]);
                unset($_SESSION[$name. '_class']);
            }
        }
    }


    // function checks if user is logged in or not
    function isLoggedIn() {
        if(isset($_SESSION['user_id'])) {
            return true;
        } else {
            return true;
        }
    }
?>
