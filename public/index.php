<?php
require_once '../Init.php';

$locale = new Locale($LOCALE, $_GET['locale']);
?>

<!doctype html>
<html lang="<?= substr($locale->getCode(), 0, 2) ?>">
	<head>
		<meta charset="utf-8">
		<title><?= $locale->get(title) ?></title>
		<link rel="stylesheet" type="text/css" href="main.css">
		<link rel="icon" type="image/icon" href="favicon.ico">
		<meta name="description" content="<?= $locale->get('description') ?>">
	</head>
	<body>
		<img id="icons" class="resource" src="sprites.png">
		<img id="map" class="resource" src="maps/uldir_1.png">

		<?= include '../templates/settings.php' ?>

		<div class="centered-container">
			<canvas id="canvas" width="100" oncontextmenu="return false;"></canvas>
		</div>
		<div class="centered-container">
			<ul class="instructions">
				<li><?= $locale->get('instructions_move') ?></li>
				<li><?= $locale->get('instructions_select') ?></li>
			</ul>
		</div>
		<script src="scripts/bundle.min.js"></script>
	</body>
</html>
