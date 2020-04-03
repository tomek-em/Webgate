<?php
/*
*   App info...
*/
    require_once('conf/conf.php');
    require_once('lib/session.php');
    require_once('lib/Database.php');

    require_once('core.php');

    require_once('modules/Home.php');
    require_once('modules/User.php');
    require_once('modules/Calendar.php');
    require_once('modules/Bookmarks.php');

    require_once('mod/Usr.php');
    require_once('mod/Cal.php');
    require_once('mod/BMark.php');


    $init = new Core;
?>
