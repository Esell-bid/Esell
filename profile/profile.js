// Fetch user profile data from the server
fetch('/api/profile')
  .then(response => response.json())
  .then(user => {
    const profileName = document.querySelector('.profile-name');
    const profileaddress = document.querySelector('.profile-address');
    const phonenumber = document.querySelector('.profile-phoneno');
    const profileEmail = document.querySelector('.profile-email');
    const accountno = document.querySelector('.profile-accountno');
    const profileifsc = document.querySelector('.profile-ifsc');

    profileName.textContent = user.name;
    profileaddress.textContent = user.address;
    phonenumber.textContent = user.phoneno;
    profileEmail.textContent = `Email: ${user.email}`;
    accountno.textContent = user.accountno;
    profileifsc.textContent = user.ifsc;
    
  })
  .catch(error => {
    console.error('Error fetching user profile:', error);
  });