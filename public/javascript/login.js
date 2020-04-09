const loginForm = document.getElementById('loginForm');

loginForm.addEventListner('submit', e => {
  e.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  const errorText = document.getElementById('errorText');
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then(res => {
      if (res.status === 201) {
        window.location.replace('/todo.html');
      }
    })
    .catch(err => {
      errorText.innerText = 'Please try again!';
      window.setTimeout(() => {
        window.location.reload();
      }, 4 * 1000);
    });
});
