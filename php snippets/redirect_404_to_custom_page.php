add_action('template_redirect', 'redirect_404_to_custom_page');

function redirect_404_to_custom_page() {
if (is_404()) {
wp_redirect(home_url('/404-page/'));
exit();
}
}