<?php ob_start(); ?>

<header id="settings">
	<?= include 'global-settings.php' ?>
	<?= include 'local-settings.php' ?>
	<?= include 'language-settings.php' ?>
</header>

<?php return ob_get_clean(); ?>
