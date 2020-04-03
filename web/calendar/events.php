<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo APP_NAME; ?> </title>

    <!-- Google fonts -->
    <link href="https://fonts.googleapis.com/css?family=Montserrat|Poppins|Staatliches&display=swap" rel="stylesheet">

    <!-- Bootstrap core CSS -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet">

    <!-- Font awesome -->
    <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">

    <link rel="stylesheet" href="<?php echo URL_ROOT ?>web/css/main.css">
    <link rel="stylesheet" href="<?php echo URL_ROOT ?>web/css/week.css">

</head>

<body>
    <header class="nav_dark">
        <!-- Navbar -->
        <?php require(APP_ROOT.'inc/nav.php'); ?>
    </header>
      <div id="content" class="content container mt-4">
          <div class="row mb-3">
              <div class="col-md-6">
                  <h1>Event waiting list</h1>
              </div>
              <div class="col-md-6">
                  <a href="#" id="add_event_btn" class="btn btn_blue float_right">
                      <i class="fa fa-pencil"></i> Add Event
                  </a>
              </div>
          </div>

          <!-- Show events   -->
          <?php
          foreach( $data as $event ) :
          if( $event->type == 'Wait' ) : ?>
              <div class="card card-body mb-3">
                  <h4 class="card-title"><?php echo $event->title; ?></h4>
                  <p class="card-text"><?php echo $event->body; ?></p>
                  <div class="row">
                      <div class="col-md-6" id="<?php echo $event->id; ?>">
                          <a href="#" class="btn btn_blue pull-left mx-1 btn_edt">Edit</a>
                          <a href="#" class="btn btn-danger pull-left mx-1 btn_del">Delete</a>
                      </div>
                  </div>
              </div>
          <?php
          endif;
          endforeach; ?>

        <!-- Add Event -->
            <div class="card card-body bg-light mb-4" id="event_form_cal">
                <h2>Add event</h2>
                <form action='' method="post" id="event_form">
                  <div class="form-group">
                      <label for="name">Event title: <sup>*</sup></label>
                      <input type="text" name="title" id="ev_form_title" class="form-control form-control-lg " value="">
                  </div>
                  <div class="form-group">
                      <label for="name">Event text: </label>
                      <textarea name="body" id="ev_form_body" class="form-control form-control-lg"></textarea>
                  </div>

                  <div class="form-group">
                      <label for="name">Date: <sup>*</sup></label>
                      <input type="date" name="date" id="ev_form_date" class="form-control form-control-lg" value="">
                  </div>

                  <!-- Event type -->
                  <div class="form-group mt-4 time_group">
                      <label for="event type">Event Type:</label>
                      <select name="event type" class="form_select" id="ev_type">
                          <option value="Type1">Type1</option>
                          <option value="Type2">Type2</option>
                          <option value="Type3">Type3</option>
                          <option value="Wait" selected>Wait</option>
                      </select>
                  </div>

                    <div class="row">
                        <div class="col mt-4">
                            <input type="submit" value="OK" class="btn btn_blue btn-block">
                        </div>
                        <div class="col mt-4">
                            <a href="#" class="btn btn-secondary btn-block" id="cancel_ev_btn">Cancel</a>
                        </div>
                    </div>
                </form>
            </div>

      </div> <!-- End of Container -->
    </div>

    <footer class="footer bg-dark text-light">
        <div class="container">
            <p class="">Sticky Footer</p>
        </div>
    </footer>

    <script>
        let SESSION_USR = '<?php echo $_SESSION['user_name']; ?>';
        let current_date = 0;

    </script>
    <script src="<?php echo URL_ROOT ?>web/js/events.js"></script>

</body>
</html>
