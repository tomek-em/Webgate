<?php

class Core {
    public function __construct() {
        if (isset($_GET['url'])) {
            // default module name
            $moduleName = 'Home';

            // make array from URL
            $url = $this->getUrl();

            if(file_exists('modules/' . ucfirst($url[0]). '.php')) {
                $moduleName = ucfirst($url[0]);
            }
            $this->process($moduleName, $url[1], $url[2]);
        }
    }

    // Proces function -----------------------
    public function process($mod, $method, $param){
        // create new instance of module class
        $this->currentModule = new $mod;
        unset($url[0]);
        // call module class method if exists
        if(method_exists($this->currentModule, $method)) {
            $this->currentMethod = $method;
            //$data = [];

            call_user_func([$this->currentModule, $this->currentMethod], $param);
            unset($url[1]);
            unset($url[2]);
        } else {
            
        }
    } // End of process



    // Render fucntion ------------------------
    public function render($url='index', $data){
        require_once('web/' .$url. '.php' );
    } // End of Render



    public function getUrl() {
        $url = rtrim($_GET['url'], '/');
        $url = filter_var( $url, FILTER_SANITIZE_URL);
        $url = explode('/', $url);
        //die(print_r($b));
        return $url;
    }

}


?>
