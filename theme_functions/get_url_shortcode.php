// Get current web url
function get_permalink_shortcode() {
    return urlencode(get_permalink());
}
add_shortcode('current_url', 'get_permalink_shortcode');