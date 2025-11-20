//fungsi register 
function register() {
    
    // Ambil Data 
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;

    // Notification
    function notification(text, subtext) {
        const notification = document.querySelector('#notification');
        const notificationText = document.querySelector('#notification-text');
        const notificationSubText = document.querySelector('#notification-subtext');

        //menampilkan pesan notifikasi sesuai dengan parameter text dan subtext
        notificationText.innerHTML = text;
        notificationSubText.innerHTML = subtext;
        notification.classList.remove('hidden');
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 3000);
    }

    //validasi data
    if (name === '' || username === '' || password === '' || email === '') {
        notification('Data not allowed to be empty', 'Please fill in the data you enter');
        return;
    }

    //validasi password
    if (password.length < 8) {
        notification('Password Minimum 8 Characters', 'Please enter a password with a minimum of 8 characters');
        return;
    }

    //validasi email
    if (!email.includes('@')) {
        notification('Email not valid', 'Please enter a valid email');
        return;
    }

    //validasi buat Faiz
    if (username == 'Sulthan Muhammad Faiz Alexander Abdurrahman Al-Baghdadi' || username == 'faiz' || username == 'Faiz' || name == 'faiz' || name == 'Faiz') {
        notification('Go Home Faiz...!', 'Faiz is not allowed to register');
        return;
    }

    const data = {
        name: name,
        username: username,
        password: password,
        email: email
    }

    fetch(`services/register_user.php`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
    ).then((response) => {
        if (response.ok) {
            notification('Register Success', 'Please Login to gain access to the system');
        } else {
            notification('Register Failed', 'You failed to register');
        }
    })

    //reset form
    document.getElementById('name').value = '';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('email').value = '';

    console.log(name, username, password, email);
}