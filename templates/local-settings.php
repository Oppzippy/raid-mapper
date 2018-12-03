<?php ob_start(); ?>

<div id="local-settings" class="settings">
	<div class="setting">
		<label for="name"><?= $locale->get('name') ?></label>
		<input type="text" id="name" autocomplete="off">
	</div>
	<div class="setting">
		<label for="icon"><?= $locale->get('icon') ?></label>
		<select id="icon">
			<?php for ($i = 1; $i <= 20; $i++): ?>
				<option value="<?= $i ?>"><?= $locale->get('icon_' . $i) ?></option>
			<?php endfor; ?>
		</select>
	</div>
	<div class="setting">
		<label for="icon-size"><?= $locale->get('size') ?></label>
		<input type="number" id="icon-size" value="32">
	</div>
	<div class="setting">
		<label for="enable-background"><?= $locale->get('enable-background') ?></label>
		<input type="checkbox" id="enable-background" checked>
	</div>
	<div class="setting">
		<input type="button" id="create" value="<?= $locale->get('create') ?>">
	</div>
	<div class="setting">
		<input type="button" id="update" value="<?= $locale->get('update') ?>" style="display:none;">
	</div>
	<div class="setting">
		<input type="button" id="delete" value="<?= $locale->get('delete') ?>" style="display:none;">
	</div>
</div>

<?php return ob_get_clean(); ?>
