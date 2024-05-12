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

namespace WeCodeArt\Support\Modules\ContactForm;

defined( 'ABSPATH' ) || exit;

use WeCodeArt\Singleton;

/**
 * Modules
 */
class Fields implements \ArrayAccess {

	use Singleton;

	/**
	 * The registered modules.
	 *
	 * @var Modules[]
	 */
	protected $items = [];

	/**
	 * Send to Constructor
	 */
	public function init() {
		$this->register( 'basic',       Fields\Basic::class     );
		$this->register( 'textarea',	Fields\TextArea::class	);
		$this->register( 'checkbox',	Fields\Checkbox::class	);
		$this->register( 'password',	Fields\Password::class	);
		$this->register( 'select',		Fields\Select::class	);
		$this->register( 'number',		Fields\Number::class	);
		$this->register( 'file',		Fields\File::class		);
		$this->register( 'date',       	Fields\Date::class		);
		$this->register( 'color',       Fields\Color::class     );
		$this->register( 'quiz',       	Fields\Quiz::class		);
		$this->register( 'submit',		Fields\Submit::class	);
		$this->register( 'acceptance',	Fields\Acceptance::class);

        do_action( 'wecodeart/support/contact-form-7/fields', $this );

        return array_map( fn( $class ) => $class::get_instance()->register(), $this->all() );
	}

	/**
     * Set a given module value.
     *
     * @param  array|string  $key
     * @param  mixed   $value
     *
     * @return void
     */
    public function register( $key, $value = null ): void {
        $this->set( $key, $value );
	}
	
    /**
     * Set a given module value.
     *
     * @param  array|string  $key
     * @param  mixed   $value
     *
     * @return void
     */
    public function set( $key, $value = null ): void {
        $keys = is_array( $key ) ? $key : [ $key => $value ];

        foreach ( $keys as $key => $value ) {
            $this->items[$key] = $value;
        }
	}

	/**
     * Determine if the given module value exists.
     *
     * @param  string  $key
     *
     * @return bool
     */
    public function has( $key ): bool {
        return isset( $this->items[$key] );
    }

    /**
     * Get the specified module value.
     *
     * @param  string  $key
     * @param  mixed   $default
     *
     * @return mixed
     */
    public function get( $key, $default = null ) {
        if ( ! isset( $this->items[$key] ) ) {
            return $default;
        }

        return $this->items[$key];
    }
	
	/**
     * Removes module from the container.
     *
     * @param  string  $key
     *
     * @return bool
     */
    public function forget( $key ): void {
		unset( $this->items[$key] );
    }

    /**
     * Get all of the module items for the application.
     *
     * @return array
     */
    public function all(): array {
        return $this->items;
    }

    /**
     * Determine if the given module option exists.
     *
     * @param  string  $key
     *
     * @return bool
     */
    public function offsetExists( $key ): bool {
        return $this->has( $key );
    }

    /**
     * Get a module option.
     *
     * @param  string  $key
     *
     * @return mixed
     */
    #[\ReturnTypeWillChange]
    public function offsetGet( $key ) {
        return $this->get( $key );
    }

    /**
     * Set a configuration option.
     *
     * @param  string   $key
     * @param  mixed    $value
     *
     * @return void
     */
    public function offsetSet( $key, $value ): void {
        $this->set( $key, $value );
    }

    /**
     * Unset a configuration option.
     *
     * @param  string   $key
     *
     * @return void
     */
    public function offsetUnset( $key ): void {
        $this->set( $key, null );
    }
}