const signUpform = document.getElementById('signUpForm');

signUpForm.addEventListner('submit', e => {
  e.preventDefault();

  const username = signUpForm.username.value;
  const email = signUpForm.email.value;
  const password = signUpForm.password.value;

  const errorText = document.getElementById('errorText');
  fetch('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  })
    .then(res => {
      if (res.status === 201) {
        window.location.replace('/login');
      }
    })
    .catch(err => {
      errorText.innerText = 'Please try again!';
      window.setTimeout(() => {
        window.location.reload();
      }, 4 * 1000);
    });
});
