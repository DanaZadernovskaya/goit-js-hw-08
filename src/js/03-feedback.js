import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

const STORAGE_KEY = 'feedback-form-state';

// Отримання даних з локального сховища
const savedState = localStorage.getItem(STORAGE_KEY);
if (savedState) {
  const { email, message } = JSON.parse(savedState);
  emailInput.value = email;
  messageInput.value = message;
}

// Збереження даних у локальне сховище
const saveFormState = throttle(() => {
  const state = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}, 500);

// Обробка події input
form.addEventListener('input', saveFormState);

// Обробка події submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  localStorage.removeItem(STORAGE_KEY);
  emailInput.value = '';
  messageInput.value = '';
  console.log('Form submitted:', {
    email: emailInput.value,
    message: messageInput.value,
  });
});

