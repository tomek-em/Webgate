<?php

class Home extends Core {
  public function __construct() {
      $data = [];
      $this->render('index', $data);
  }
    
}

?>
