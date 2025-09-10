function saveUser() {
    //Capture Data
    let namaLengkap = document.querySelector('#nama-lengkap').value;
    let username = document.querySelector('#username').value;
    let email = document.querySelector('#email').value;
    let jenisKelamin = getElementById('jenisKelamin').value;
    let password = document.querySelector('#password').value;
    let role = document.querySelector('#role').value;

    console.log(jenisKelamin);


    // validasi Data
    let arr =false;
    let msg =''; 

    if (namaLengkap === '' || namaLengkap === undefined || namaLengkap === null) {
        err = true;
        msg += 'Nama lengkap wajib diisi!\n';
    }
    if (username === '' || username === undefined || username === null) {
        err = true;
        msg += 'Username wajib diisi!\n';
    }
    if (email === '' || email === undefined || email === null) {
        err = true;
        msg += 'Email wajib diisi!\n';
    }
    if (password === '' || password === undefined || password === null) {
        err = true;
        msg += 'Password wajib diisi!\n';
    }
    if (password === '' || password === undefined || password === null) {
        err = true;
        msg += 'Password wajib diisi!\n';
    }

    if (role === '' || role === undefined || role === null) {
        err = true;
        msg += 'Role wajib diisi!\n';
    }

    if (err) {
        alert(msg);
        return;
    }
}