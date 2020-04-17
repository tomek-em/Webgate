<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title><?php echo APP_NAME; ?> </title>

    <!-- Google fonts -->
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,600,900|Poppins|Staatliches&display=swap" rel="stylesheet">

    <!-- Bootstrap core CSS -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet">

    <!-- Font awesome -->
    <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">

    <link rel="stylesheet" href="<?php echo URL_ROOT ?>web/css/month.css">
    <link rel="stylesheet" href="<?php echo URL_ROOT ?>web/css/main.css">

</head>

<body>
    <div id = "waiting_scr">
        <p> Loading... Please wait</p>
    </div>

    <div class="content hero_image" id="hero_img">
        <header>
            <!-- Navbar -->
            <?php require(APP_ROOT.'inc/nav.php'); ?>
<!--
            <div class="weather_box">
                <p>Description:</p>
            </div>
-->
        </header>

        <div class="geo">
          <div  class="location">
            <div id="location_name" class="loc_box"></div>
            <div class="weather" class="loc_box">
                <p> <span id="temperature_degree"></span>
                    <span id="weather_description"></span>
                </p>
            </div>
          </div>
          <div class="location"><a id="weather_credit" href="https://darksky.net/poweredby/"></a></div>
        </div>

      <div class="waiting_layer" id="waiting_layer"> <img src="<?php echo URL_ROOT.'web/img/spinner.gif'?>"> </div>
      <div class="main_container" id="main_cont">
        <div class="box_wrapper">
          <!-- Main box -->
          <div id="main_box" class="content_box">
            <h1 id="timer"></h1>
            <h2>
                <?php if(!isset($_SESSION[user_id])): ?>
                    WebGate
                <?php else : ?>
                   Hi <?php echo $_SESSION['user_name']; ?>
                <?php endif; ?>
            </h2>
            <div class="bm_box search_box">
                <div class="input_box mb-1">
                    <input type="text" class="form-control search" placeholder="Search for bookmarks" aria-label="Search for bookmarks" aria-describedby="basic-addon2" id="bookmark_input">
                </div>
                <p class="bm_box_p">Add <a href="#" id="new_bookmark_btn">new bookmark</a></p>
                <div id="bookmark_cont">
                  <ul class="list-group">
                  </ul>
                </div>
            </div>
          </div>
          <!-- Calendar box -->
          <div id="cal_box" class="content_box aside_right">
            <div id ="calendar">
              <div id="month_header">
                  <a href="#" id="prev_month_btn" class="month_arrow"><<</a>
                  <a id="month_name"></a>
                  <a href ="#" id="next_month_btn" class="month_arrow">>></a>
                  </div>
              <table id="month_tab">
                  <thead class="month_tab_header"><tr><td>M</td><td>T</td><td>W</td><td>T</td><td>F</td><td>S</td><td class="sunday">S</td></tr></thead>
                  <tbody id="month_body"></tbody>
              </table>
            </div>
          </div>
        </div>

          <div class="dots">
            <div id="dot_one" class="dot active"></div> <div id="dot_two" class="dot"></div>

            <div id="event_text" class="event_text">
              <h2 class="upper"></h2>
              <a href="<?php echo URL_ROOT ?>calendar/week"><h2 class="normal"></h2></a>
            </div>
          </div>
      </div>


      <!-- Picture name and credit -->
      <div class="picture_details"><div id="pic_name"></div><a>Unsplash</a><div id="hide_wid"><a href="#"><i class="fa fa-eye"></i></a></div></div>

      <!-- Copyright -->
      <div class="copyright"><span>Created by: <a href="https://tomaszmejer.com">Tomasz Mejer</a></div>
    </div>


    <!-- Add Bookmark form -->
    <div class="card card-body bg-light mb-4 event_window" id="bookmark_form_cont">
        <h2>Add bookmark</h2>
        <form action='' method="post" id="bookmark_form">
            <div class="form-group">
                <label for="name">Bookmark title: <sup>*</sup></label>
                <input type="text" name="title" id="bookmark_form_title" class="form-control form-control-lg " value="">
            </div>
            <div class="form-group">
                <label for="name">Bookmark web: </label>
                <input type="text" name="web" id="bookmark_form_web" class="form-control form-control-lg " value="">
            </div>
            <div class="form-group">
                <label for="name">Bookmark group: </label>
                <input type="text" name="group" id="bookmark_form_group" class="form-control form-control-lg " value="">
            </div>

            <div class="row">
                <div class="col mt-4">
                    <input type="submit" value="OK" class="btn btn_blue btn-block">
                </div>
                <div class="col mt-4">
                    <a href="#" class="btn btn-secondary btn-block" id="cancel_bookmark_btn">Cancel</a>
                </div>
            </div>
        </form>
    </div>



    <script>
        let SESSION_USR = '<?php echo $_SESSION['user_name']; ?>';
        let month_page = false;
    </script>

    <script src="<?php echo URL_ROOT ?>web/js/main.js"></script>
    <script src="<?php echo URL_ROOT ?>web/js/api.js"></script>
    <script src="<?php echo URL_ROOT ?>web/js/home.js"></script>
    <script src="<?php echo URL_ROOT ?>web/js/month.js"></script>
</body>
</html>
