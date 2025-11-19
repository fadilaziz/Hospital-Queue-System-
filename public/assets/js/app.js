// Tampil Data 
function tampildata() {
    fetch('./services/list_pasien.php')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let table = document.querySelector('#table');
        table.innerHTML = '';
        let no = 1;
        data.forEach(data => {
            table.innerHTML +=`
            <tr class="tableUser text-gray-700 dark:text-gray-400">
                <!--id-->
                <span id="userId">${(data.id)}</span>
                <td class="w-5 text-center">${no++}</td>
                <td class="px-4 py-3">
                <div class="flex items-center text-sm">
                    <!-- Avatar with inset shadow -->
                    <div
                    class="relative hidden w-8 h-8 mr-3 rounded-full md:block"
                    >
                    <img
                        class="object-cover w-full h-full rounded-full"
                        src="assets/img/${(data.genderPhoto)}"
                        alt=""
                        loading="lazy"
                    />
                    <div
                        class="absolute inset-0 rounded-full shadow-inner"
                        aria-hidden="true"
                    ></div>
                    </div>
                    <div>
                    <p class="font-semibold">${(data.nama)}</p>
                    <p class="text-xs text-gray-600 dark:text-gray-400">
                        ${data.jenis_kelamin}
                    </p>
                    </div>
                </div>
                </td>
                <td class="px-4 py-3 text-sm">
                ${data.nik}
                </td>
                <td class="px-4 py-3 text-xs">
                <span
                    class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"
                >
                    ${data.jenis_kelamin}
                </span>
                </td>
                <td class="px-4 py-3 text-sm">
                ${data.alamat}
                </td>
                <td>
                <div class="flex items-center space-x-4 text-sm">
                    <button
                    @click="openModalEdit"
                        class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                        aria-label="Edit"
                    >
                    <svg
                        class="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                        d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                        ></path>
                    </svg>
                    </button>
                    <button
                    class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                    aria-label="Delete" onclick="deleteData(${data.id})"
                    >
                    <svg
                        class="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                        fill-rule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                        ></path>
                    </svg>
                    </button>
                </div>
                </td>
            </tr>
            `
        }) 
    })
}

tampildata();


// Fungsi Simpan data
function saveData() {
    //Capture Data
    let namaLengkap = document.querySelector('#nama-lengkap').value;
    let nik = document.querySelector('#nik').value;
    let jenisKelamin = document.querySelector('#jenis-kelamin').value;
    let tanggalLahir = document.querySelector('#tanggal').value;
    let alamat = document.querySelector('#alamat').value;
    let gender;
    if (jenisKelamin === 'Laki-laki') {
        gender = 'male.jpg';
    } else {
        gender = 'female.jpg';
    }

    //Notification
        function notification() {
        let notification = document.querySelector('#notification');
        notification.classList.remove('hidden');
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 3000);
    }
    console.log(`
        Nama Lengkap: ${namaLengkap}
        NIK: ${nik}
        Jenis Kelamin: ${jenisKelamin}
        Tanggal Lahir: ${tanggalLahir}
        Alamat: ${alamat}
        Gender: ${gender}
    `);

    // validasi Data
    let err =false;
    let msg =''; 

    if (namaLengkap === '' || namaLengkap === undefined || namaLengkap === null) {
        err = true;
        msg += 'Nama lengkap wajib diisi!\n';
    }
    if (nik === '' || nik === undefined || nik === null) {
        err = true;
        msg += 'NIK wajib diisi!\n';
    }
    if (jenisKelamin === '' || jenisKelamin === undefined || jenisKelamin === null) {
        err = true;
        msg += 'Jenis kelamin wajib diisi!\n';
    }
    if (tanggalLahir === '' || tanggalLahir === undefined || tanggalLahir === null) {
        err = true;
        msg += 'Tanggal lahir wajib diisi!\n';
    }
    if (alamat === '' || alamat === undefined || alamat === null) {
        err = true;
        msg += 'Alamat wajib diisi!\n';
    }

    if (err) {
        alert(msg);
        return;
    }

    //Mengirim Data
    let dataSend = {
    namaLengkap:namaLengkap,
    nik:nik,
    jenisKelamin:jenisKelamin,
    tanggalLahir:tanggalLahir,
    alamat:alamat,
    gender:gender
}

console.log(dataSend);

    //Menampilkan data Pasien
    fetch(`services/save-pasien.php`,{
        method:'POST',
        headers: {
            'Content-type':'application/json; charset=UTF-8'
        },
        body: JSON.stringify(dataSend)
    })
    .then(response => console.log(response))
    .then(() => tampildata())
    .then(() => notification());

    // reset form
    document.querySelector('#nama-lengkap').value = '';
    document.querySelector('#nik').value = '';
    document.querySelector('#jenis-kelamin').value = '';
    document.querySelector('#tanggal').value = '';
    document.querySelector('#alamat').value = '';

    //Tutup Modal
    const closeModal = document.querySelector('#closeModal');
    closeModal.click();
}

// Fungsi Hapus Data
function deleteData(id){
	if(confirm('Yakin ingin menghapus data ini?')){
		fetch(`services/hapus_pasien.php?id=${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json; charset=UTF-8'
			}
		}).then(response => {
			if (response.ok) {
				response.text().then(response => {
					console.log(response);
                    tampildata();
				});
			}
		});
	}
}

function openModal(id) {
    let modal = document.querySelector('#modalEdit');
    modal.classList.remove('hidden');
    console.log(id);
}

 // Fungsi Edit Data
function editData(){
    fetch(`services/edit_pasien.php?id=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }).then(response => {
        if (response.ok) {
            response.text().then(response => {
                console.log(response);
            });
        }
    });
}
