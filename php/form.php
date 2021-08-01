<!DOCTYPE HTML>
<html>
<head>
	<meta HTTP-EQUIV=”Content-Type” content="text/html" charset="utf-8">
	<meta name="keywords" lang="ru" content="">
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Сайт веб-дизайнера</title>
	<link rel="icon" type="image/png" href="" />	
	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
	<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>	
	<script src="../js/niseScroll.js" type="text/javascript"></script>
	
	<!-- LESS -->
	<link rel="stylesheet" type="text/css" href="../style/style.css">
	<script src="../js/less.js" type="text/javascript"></script>
	<!-- LESS -->
	
		<script src="../js/changeWindows.js" type="text/javascript"></script>

	
	

	
<script src='https://www.google.com/recaptcha/api.js'></script>	
</head>

<body>
	<div class="container-fluid">
	
	
		<div class="row content">
			<div class="col-xs-12 stars "  id="stars"><!-- stars -->
				<div class="moon"><img src="../images/moon.png">
				</div>
				
				<div id="bat" ><img src="../images/bat12.gif">
				</div>
				
				<div class="star1"><img src="../images/star1.png">
				</div>
				<div class="star2"><img src="../images/star2.png">
				</div>
				<div class="star3"><img src="../images/star3.png">
				</div>
				<div class="star4"><img src="../images/star4.png">
				</div>
				<div class="star5"><img src="../images/star5.png">
				</div>
				<div class="star6"><img src="../images/star6.png">
				</div>
		
		
		
		<div class="beginning">

<?php
        $name;$email;$message;$captcha;
		if(isset($_POST['name'])){
          $name=$_POST['name'];
        }if(isset($_POST['email'])){
          $email=$_POST['email'];
        }elseif(!preg_match('/^[A-Z0-9._%-]+@[A-Z0-9._%-]+\.[A-Z]{2,4}$/i', trim($_POST['email']))) {
			$hasError = true;
		}if(isset($_POST['message'])){
          $message=$_POST['message'];
        }
		
		
		if(isset($_POST['g-recaptcha-response'])){
          $captcha=$_POST['g-recaptcha-response'];
        }
        if(!$captcha){
          echo '<h2>Пожалуйста, проверьте правильное заполнение капчи</h2><br><a href="index.php" id="s">Вернуться на главную</a>';
          exit;
        }
        $secretKey = "6Lc2GCETAAAAAGSmzy_2K5RcDYhqt1saP2vC0gTn";
        $ip = $_SERVER['REMOTE_ADDR'];
        $response=file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".$secretKey."&response=".$captcha."&remoteip=".$ip);
        $responseKeys = json_decode($response,true);
        if(intval($responseKeys["success"]) !== 1) {
          echo '<h2 class="form_answer">Извините, сообщение не получилось отправить</h2>';
        } else {
          echo '<h2 class="form_answer">Благодарю за сообщение!</h2>';
        }
		
		
		//Если ошибок нет, отправить email
  if(!isset($hasError)) {
	$emailTo = 'cherrygardenserenity@gmail.com'; 
	$body = "Name:".$name."\r\nEmail:". $email." \r\nComments:\r\n".$message;
    $headers="FROM: Test\r\n MIME-Version: 1.0\r\n Content-type: text/html; charset=windows-1251";
	mail($emailTo, "theme", $body, $headers);
    $emailSent = true;
  }
  // https://codeforgeek.com/2014/12/google-recaptcha-tutorial/
?>

	</div>			
	</div>
		<div class="row" >
		
			<!-- heading height=60px -->
				<nav class="navbar col-xs-12 heading navbar-fixed-top">
  
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#nav">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>                        
      </button>
  
    </div>
    <div class="collapse navbar-collapse" id="nav">
      <ul class="nav navbar-nav navbar-right ">	
        <li data-toggle="collapse" data-target=".navbar-collapse.in"><a href="index.php" id="s">Вернуться на главную</a></li>		
      </ul>    
    </div>
</nav>
	</div>

			</div>
			</div>
	<script type="text/javascript" src="../js/animation/all.js"></script>
	<script src="../js/batAnimate.js" type="text/javascript"></script>
			</body>
			</html>