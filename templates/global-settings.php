<?php ob_start(); ?>

<div id="global-settings" class="settings">
	<div class="setting">
		<input type="button" id="clear" value="<?= $locale->get('clear') ?>">
	</div>
	<div class="setting">
		<input type="button" id="export" value="<?= $locale->get('export') ?>">
	</div>
	<div class="setting">
		<input type="button" id="export-image" value="<?= $locale->get('export-image') ?>">
	</div>
	<div class="setting">
		<input type="button" id="export-file" value="<?= $locale->get('export-file') ?>">
	</div>
	<div class="setting">
		<label for="map-select"><?= $locale->get('map') ?></label>
		<select id="map-select">
			<?php for ($i = 1; $i <= 10; $i++): ?>
				<option value="Uldir_<?= $i ?>"><?= $locale->get("Uldir_$i") ?></option>
			<?php endfor; ?>
		</select>
	</div>
</div>



<?php return ob_get_clean(); ?>
