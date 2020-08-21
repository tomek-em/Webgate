<?php
/*
*   App Name: Webgate
*   Author: Tomasz Mejer
*/
    require_once('conf/conf.php');
    require_once('lib/session.php');
    require_once('lib/Database.php');

    require_once('core.php');

    require_once('modules/Home.php');
    require_once('modules/User.php');
    require_once('modules/Calendar.php');
    require_once('modules/Bookmarks.php');
    require_once('modules/Slots.php');

    require_once('modules/Test.php');

    require_once('models/UserModel.php');
    require_once('models/EventModel.php');
    require_once('models/BookmarkModel.php');
    require_once('models/SlotModel.php');


    $init = new Core;
?>
