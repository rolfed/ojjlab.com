class FooterForm {
  private form: HTMLFormElement | null = null;
  private emailInput: HTMLInputElement | null = null;
  private submitButton: HTMLButtonElement | null = null;

  constructor() {
    this.init();
  }

  private init(): void {
    this.form = document.getElementById(
      'stay-in-touch-form'
    ) as HTMLFormElement;
    this.emailInput = document.getElementById(
      'footer-email'
    ) as HTMLInputElement;
    this.submitButton = this.form?.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;

    if (this.form) {
      this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }
  }

  private async handleSubmit(event: Event): Promise<void> {
    event.preventDefault();

    if (!this.emailInput || !this.submitButton) return;

    const email = this.emailInput.value.trim();

    if (!email || !this.isValidEmail(email)) {
      this.showMessage('Please enter a valid email address.', 'error');
      return;
    }

    // Disable form during submission
    this.setFormState(true);

    try {
      // Simulate API call - replace with actual endpoint
      await this.submitEmail(email);

      this.showMessage(
        "Thanks for subscribing! We'll keep you updated.",
        'success'
      );
      this.emailInput.value = '';
    } catch {
      this.showMessage('Something went wrong. Please try again.', 'error');
    } finally {
      this.setFormState(false);
    }
  }

  private submitEmail(email: string): Promise<void> {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Email submitted:', email);
        resolve();
      }, 1000);
    });
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private setFormState(isSubmitting: boolean): void {
    if (!this.emailInput || !this.submitButton) return;

    this.emailInput.disabled = isSubmitting;
    this.submitButton.disabled = isSubmitting;
    this.submitButton.textContent = isSubmitting
      ? 'Subscribing...'
      : 'Subscribe';
  }

  private showMessage(message: string, type: 'success' | 'error'): void {
    // Remove existing message
    const existingMessage = this.form?.querySelector('.footer-form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create new message
    const messageElement = document.createElement('div');
    messageElement.className = `footer-form-message footer-form-message--${type}`;
    messageElement.textContent = message;

    // Insert message after form
    if (this.form) {
      this.form.insertAdjacentElement('afterend', messageElement);

      // Remove message after 5 seconds
      setTimeout(() => {
        messageElement.remove();
      }, 5000);
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new FooterForm();
});

export default FooterForm;
