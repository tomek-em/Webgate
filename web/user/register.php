<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo APP_NAME; ?> </title>
    
    <!-- Font awesome -->
    <link href="https://fonts.googleapis.com/css?family=Montserrat|Poppins&display=swap" rel="stylesheet">
    
    <!-- Bootstrap core CSS -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet">
    
    <link rel="stylesheet" href="<?php echo URL_ROOT ?>app/web/css/main.css">
    
    <!--  recaptcha -->
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
</head>
    
    <div class="container mt-2">
        <div class="col-md-6 mx-auto">
            <div class="card card-body bg-light mt-5">
                <h2>Create an account.</h2>
                <p>Please fill out this form to register account.</p>

                <form action='<?php echo URL_ROOT; ?>user/register' method="post">
                    <div class="form-group">
                        <label for="name">Name: <sup>*</sup></label>
                        <input type="text" name="name" class="form-control form-control-lg <?php echo (!empty($data['name_err'])) ? 'is-invalid' : ' ' ?>" value="<?php echo $data['name']; ?>">
                        <span class="invalid-feedback"><?php echo $data['name_err']; ?></span>
                    </div>
                    <div class="form-group">
                        <label for="name">Email: <sup>*</sup></label>
                        <input type="email" name="email" class="form-control form-control-lg <?php echo (!empty($data['email_err'])) ? 'is-invalid' : ' ' ?>" value="<?php echo $data['email']; ?>">
                        <span class="invalid-feedback"><?php echo $data['email_err']; ?></span>
                    </div>
                    <div class="form-group">
                        <label for="name">Password: <sup>*</sup></label>
                        <input type="password" name="password" class="form-control form-control-lg <?php echo (!empty($data['password_err'])) ? 'is-invalid' : ' ' ?>" value="<?php echo $data['password']; ?>">
                        <span class="invalid-feedback"><?php echo $data['password_err']; ?></span>
                    </div>
                    <div class="form-group">
                        <label for="name">Confirm password: <sup>*</sup></label>
                        <input type="password" name="confirm_password" class="form-control form-control-lg <?php echo (!empty($data['confirm_password_err'])) ? 'is-invalid' : ' ' ?>" value="<?php echo $data['confirm_password']; ?>">
                        <span class="invalid-feedback"><?php echo $data['confirm_password_err']; ?></span>
                    </div>
                    
                        <div class="mt-4 mb-4">
                            <div class="g-recaptcha <?php echo (!empty($data['recaptcha_err'])) ? 'is-invalid' : ' ' ?>" data-sitekey="6LfMAZsUAAAAAKkvU6Pu_g2Iq98ugMahcJqN83vj"></div>
                            <span class="invalid-feedback"><?php echo $data['recaptcha_err']; 
                                ?></span>
                        </div>
                    
                    <div class="row">
                        <div class="col">
                            <input type="submit" value="Register" class="btn btn-success btn-block">
                        </div>
                        <div class="col">
                            <a href="<?php echo URL_ROOT; ?>user/login" class="btn btn-secondary btn-block">Cancel</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
</div>
