<?php
/**
 * The frontend-specific functionality of the plugin.
 *
 * @link       https://www.wecodeart.com/
 * @since      1.0.0
 *
 * @package    WeCodeArt\Support\Modules
 * @subpackage WeCodeArt\Support\Modules\Condition
 */

 namespace WeCodeArt\Support\Modules\ContactForm;

 defined( 'ABSPATH' ) || exit;
 
 use WeCodeArt\Config\Interfaces\Conditional;

/**
 * Conditional that is only met when plugin is active.
 */
class Condition implements Conditional {

	/**
	 * @inheritdoc
	 */
	public function is_met(): bool {
		return defined( 'WPCF7_VERSION' );
	}
}