sed -i -e 's/,/,\n/g' *.php
sed -i -e 's/=> \[/=>\[\n/g' *.php
sed -i -e 's/= \[/=\[\n/g' *.php
sed -i -e '/^$/d' *.php
php ~/.config/composer/vendor/friendsofphp/php-cs-fixer/php-cs-fixer --allow-risky=yes --using-cache=no --rules='{"array_indentation": true, "array_syntax": {"syntax": "short"},"@Symfony": true, "blank_line_after_opening_tag": true, "binary_operator_spaces": {"align_double_arrow": true}}' fix .