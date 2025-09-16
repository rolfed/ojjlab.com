export function initializeContactForm(): void {
    // Check if we're on the contact page with a success parameter
    if (window.location.hash.includes('/contact') && window.location.search.includes('success=true')) {
        showSuccessMessage();
    }
}

function showSuccessMessage(): void {
    // Find the contact form
    const form = document.querySelector('.contact-form form') as HTMLFormElement;
    if (!form) return;

    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div class="bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-100 px-4 py-3 rounded mb-4">
            <strong>Thank you!</strong> Your message has been sent successfully. We'll get back to you soon.
        </div>
    `;

    // Insert before the form
    form.parentNode?.insertBefore(successDiv, form);

    // Clear the URL parameters
    const url = new URL(window.location.href);
    url.search = '';
    window.history.replaceState({}, document.title, url.toString());
}