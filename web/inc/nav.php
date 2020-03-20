<nav class="navbar navbar-expand-md bg-dark">
        <div class="container-fluid">
            
            <button class="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                <div class=" navbar_cont">
                    <a class="navbar-brand" href="<?php echo URL_ROOT ?>"><img src="<?php echo URL_ROOT ?>web/img/logo/webgate_light.png" class="logo"></a>

                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" href="<?php echo URL_ROOT ?>">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="load-link" href="<?php echo URL_ROOT ?>calendar/month">Calendar</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="load-link" href="<?php echo URL_ROOT ?>calendar/week">Week</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="load-link" href="<?php echo URL_ROOT ?>calendar/slots">Book</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="load-link" href="#">Load</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link" href="http://example.com" id="dropdown01" data-toggle="dropdown" aria-haspopup="" aria-expanded="">Dropdown</a>
                            <div class="dropdown-menu" aria-labelledby="dropdown01">
                                <a class="dropdown-item" href="#">Action</a>
                                <a class="dropdown-item" href="#">Another action</a>
                                <a class="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li>
                    </ul>
                    <ul class="navbar-nav login_box">
                        <div class="login_cont">
                            <?php if(!isset($_SESSION[user_id])): ?>
                                <li class="nav-item"><a class="nav-link" href="<?php echo URL_ROOT ?>user/login">Login</a></li>

                            <?php else : ?>
                                <li class="nav-item no_link"><a class="nav-link">Hi <?php echo $_SESSION['user_name']; ?></a></li>
                                <li class="nav-item"><a class="nav-link" href="<?php echo URL_ROOT ?>user/logout">Logout</a></li>
                            <?php endif; ?>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    </nav>