const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                "user_name": username,
                "password": password
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            alert(`Please login`);
            document.location.replace('/login');
        } else {
            alert(response.statusText);
        }
    }
};

document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler);