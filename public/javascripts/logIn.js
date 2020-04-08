const form = document.getElementById('login');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = form.email.value;
  const password = form.password.value;
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
    .then((res) => {
      if (res.status === 200) {
        window.location.replace('/');
      } else {
        const errorMsg = document.getElementById('msg');
        errorMsg.innerText = 'Error. Please try again.';
      }
    })
    .catch(() => {
      const errorMsg = document.getElementById('msg');
      errorMsg.innerText = 'Network Error. Please try again later.';
    });
});
