<?php require(APP_ROOT.'inc/header.php'); ?>

<body>
    <div id = "waiting_scr">
        <p> Loading... Please wait</p>
    </div>
    
    <div class="content hero_image">
        <header>
            <!-- Navbar -->
            <?php require(APP_ROOT.'inc/nav.php'); ?>
<!--
            <div class="weather_box">
                <p>Description:</p>
            </div>
-->
        </header>
        
        <div class="location">
            <div id="location_name" class="loc_box"></div>
            <div class="weather" class="loc_box">
                <p> <span id="temperature_degree"></span> - 
                    <span id="weather_description"></span>
                    <a id="weather_credit" href="https://darksky.net/poweredby/"></a>
                </p>
            </div>
        </div>
        
        <main role="main" class="main_content text-center">
            <h1 class="mt-4 mb-2"><img src="<?php echo URL_ROOT ?>web/img/logo/webgate_light.png" class="main_logo"></h1> 
            <div class="main_box search_box mb-2">
                <div class="input-group mb-2">
                    <input type="text" class="form-control" placeholder="Search for bookmarks" aria-label="Search for bookmarks" aria-describedby="basic-addon2" id="bookmark_input">
                    <div class="input-group-append">
                        <div class="btn btn_blue">Go</div>
                    </div>
                </div>
                <p class="main_box_p">Add <a href="#" id="new_bookmark_btn">new bookmark</a></p>
            </div>
            
            <!-- Bookmarks container -->
            <div id="bookmark_cont">
                <ul class="list-group">
                </ul>
            </div>  
                
        </main><!-- /.container -->
        
         
        
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
    </script>
    
    <script src="<?php echo URL_ROOT ?>web/js/main.js"></script>
    <script src="<?php echo URL_ROOT ?>web/js/home.js"></script>
</body>
</html>

