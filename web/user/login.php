<?php 
    require(APP_ROOT.'inc/header.php');
?>
<div class="vertical_center">
    <div class="container">
        <div class="col-md-6 mx-auto">
            <div class="card card-body bg-light mb-4">
                <?php flash('login_success'); ?>
                
                <h2>Log In</h2>
                <p>Please fill your crudentials to log in.</p>
                <form action='<?php echo URL_ROOT; ?>user/login' method="post">
                    <div class="form-group">
                        <label for="name">User name: <sup>*</sup></label>
                        <input type="text" name="name" class="form-control form-control-lg <?php echo (!empty($data['name_err'])) ? 'is-invalid' : ' ' ?>" value="<?php echo $data['name']; ?>">
                        <span class="invalid-feedback"><?php echo $data['name_err']; ?></span>
                    </div>
                    <div class="form-group">
                        <label for="name">Password: <sup>*</sup></label>
                        <input type="password" name="password" class="form-control form-control-lg <?php echo (!empty($data['password_err'])) ? 'is-invalid' : ' ' ?>" value="<?php echo $data['password']; ?>">
                        <span class="invalid-feedback"><?php echo $data['password_err']; ?></span>
                    </div>

                    <div class="row">
                        <div class="col mt-4">
                            <input type="submit" value="Log In" class="btn btn_blue btn-block">
                        </div>
                        <div class="col mt-4">
                            <a href="<?php echo URL_ROOT ?>" class="btn btn-secondary btn-block">Cancel</a>
                        </div>
                        <div class="col-12 mt-4">
                            <p>If you don't have account create it <a href="<?php echo URL_ROOT ?>user/register">here</a>.</p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>