const form = document.getElementById('signup');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const firstName = form.name.value;
  const lastName = form.last.value;
  const email = form.email.value;
  const password = form.password.value;

  const signUpInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
    }),
  };
  const formMsg = document.getElementById('msg');
  fetch('/signup', signUpInit)
    .then((res) => {
      if (res.status === 201) {
        window.location.replace('/login');
      } else if (res.status === 500) {
        formMsg.innerText = 'Please try again!';
        formMsg.style.color = 'red';
        window.setTimeout(() => {
          window.location.reload();
        }, 3 * 1000);
      }
    })
    .catch((err) => {
      formMsg.innerText = 'Network Error! Please try again later';
      formMsg.style.color = 'red';
      window.setTimeout(() => {
        window.location.reload();
      }, 3 * 1000);
    });
});
