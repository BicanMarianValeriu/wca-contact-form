<?php
/**
 * The frontend-specific functionality of the plugin.
 *
 * @link       https://www.wecodeart.com/
 * @since      1.0.0
 *
 * @package    WeCodeArt\Support\Modules\ContactForm
 * @subpackage WeCodeArt\Support\Modules\ContactForm\Fields
 */

namespace WeCodeArt\Support\Modules\ContactForm\Fields;

defined( 'ABSPATH' ) || exit;

/**
 * Module
 */
abstract class Base {

	/**
	 * Module Name.
	 *
	 * @var string
	 */
	protected $name = '';

	/**
	 * Module Fields.
	 *
	 * @var mixed	(string|array)
	 */
	protected $fields = [];

	/**
	 * Register Module
	 */
	public function register() {
		if ( method_exists( $this, 'get_html' ) ) {
			remove_action( 'wpcf7_init', "wpcf7_add_form_tag_{$this->name}", 10, 0  );
			add_action( 'wpcf7_init', function() {
				wpcf7_add_form_tag( $this->fields, [ $this, 'get_html' ], $this->get_args() );
			}, 20, 0 );
			
			return;
		}

		return _doing_it_wrong(
			__CLASS__,
			sprintf( esc_html__( 'When extending %s, you must create a `get_html` method.', 'wecodeart' ), __CLASS__ ), 
			'1.0.0'
		); 
	}

	/**
	 * Include and render a field.
	 *
	 * @param 	object  $tag
	 * @return 	string 	Rendered block type output.
	 */
	// abstract public function get_html( $tag );

	/**
	 * Get Tag wrap classname
	 *
	 * @since   1.0.0
	 * @version	1.0.0
	 *
	 * @return  string
	 */
	public static function get_wrap_class( $tag, $extra = '' ) {
		$defaults = [ 'wpcf7-form-control-wrap', 'position-relative' ];

		if( strpos( $extra, 'input-group' ) === false ) {
			$defaults[] = 'd-block';
		}
		
		$defaults = wp_parse_args( explode( ' ', $extra ), $defaults );

		return join( ' ', array_filter( $defaults ) );
	}

	/**
	 * Get Module args.
	 *
	 * @return array
	 */
	protected function get_args() {
		return [
			'name-attr' => true
		];
	}
}