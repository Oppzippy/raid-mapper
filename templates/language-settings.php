<?php ob_start(); ?>

<div id="language-settings">
	<select id="locale">
		<?php foreach($LOCALE as $loc => $strings): ?>
			<option value="<?= $loc ?>"
				<?php if($locale->getCode() === $loc): ?>
					selected
				<?php endif; ?>

				><?= $loc ?></option>
		<?php endforeach; ?>
	</select>
</div>

<?php return ob_get_clean(); ?>
