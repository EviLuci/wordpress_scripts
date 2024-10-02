<?php
// Create menu option in the admin dashboard
function wp_debug_toggle_menu()
{
  add_options_page(
    'Debug Mode', // Page title
    'Debug Mode', // Menu title
    'manage_options', // Capability
    'wp-debug-toggle', // Menu slug
    'wp_debug_toggle_settings_page' // Callback function
  );
}
add_action('admin_menu', 'wp_debug_toggle_menu');

// Settings page content
function wp_debug_toggle_settings_page()
{
  if (isset($_POST['wp_debug_mode'])) {
    $debug_mode = sanitize_text_field($_POST['wp_debug_mode']);
    update_option('wp_debug_mode', $debug_mode);
    wp_debug_toggle_update_wp_config($debug_mode);
    echo '<div class="updated"><p>Debug mode has been ' . ($debug_mode === '1' ? 'enabled' : 'disabled') . '.</p></div>';
  } else {
    // If form is submitted and the checkbox is unchecked, set debug mode to disabled (0)
    update_option('wp_debug_mode', '0');
    wp_debug_toggle_update_wp_config('0');
    echo '<div class="updated"><p>Debug mode has been disabled.</p></div>';
  }

  $debug_mode = get_option('wp_debug_mode', '0');
  ?>
  <div class="wrap">
    <h1>Toggle WP Debug Mode</h1>
    <form method="post" action="">
      <label for="wp_debug_mode">
        <input type="checkbox" name="wp_debug_mode" value="1" <?php checked($debug_mode, '1'); ?>>
        Enable Debug Mode
      </label>
      <p><input type="submit" value="Save Changes" class="button-primary"></p>
    </form>
  </div>
  <?php
}

// Function to update wp-config.php file
function wp_debug_toggle_update_wp_config($enable_debug)
{
  $wp_config_file = ABSPATH . 'wp-config.php';
  if (is_writable($wp_config_file)) {
    $config_file_content = file_get_contents($wp_config_file);

    // Check if WP_DEBUG is already defined
    if (preg_match("/define\('WP_DEBUG', (true|false)\);/", $config_file_content)) {
      // Replace existing WP_DEBUG definition
      $config_file_content = preg_replace(
        "/define\('WP_DEBUG', (true|false)\);/",
        "define('WP_DEBUG', " . ($enable_debug === '1' ? 'true' : 'false') . ");",
        $config_file_content
      );
    } else {
      // Add WP_DEBUG definition right before the final line, if it doesn't exist
      $config_file_content = str_replace(
        "<?php",
        "<?php\n define('WP_DEBUG', " . ($enable_debug === '1' ? 'true' : 'false') . ");",
        $config_file_content
      );
    }

    // Write the updated content back to wp-config.php
    file_put_contents($wp_config_file, $config_file_content);
  } else {
    echo '<div class="error"><p>wp-config.php is not writable. Please change file permissions.</p></div>';
  }
}
