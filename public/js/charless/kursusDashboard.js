document.addEventListener('DOMContentLoaded', () => {
    // mengambil elemen container untuk daftar kursus 
    const activeCoursesList = document.getElementById('active-courses-list');
    const completedCoursesList = document.getElementById('completed-courses-list');

    // kunci untuk melakukan akses data order di local storage
    const STORAGE_KEY = "courses_order";

    // untuk mendapatkan data user yang sedang login dari session storage
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    const currentUserEmail = loggedInUser ? loggedInUser.email : null; 

    let enrolledCourseKeys = [];

    // cek jika user sudah login, ambil data daftar kursus yang sudah ia beli
    if (currentUserEmail && sessionStorage.getItem("Authenticated") === "True") {
        const allOrders = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        const userOrder = allOrders.find(order => order.user === loggedInUser.username);
        
        if (userOrder) {
            enrolledCourseKeys = userOrder.kursus;
        }
    }

    // mengambil data progres dengan lastcheck dari local storage
    const lastCheckedData = JSON.parse(localStorage.getItem('LastChecked')) || [];
    const userProgressData = lastCheckedData.find(u => u.Email === currentUserEmail);

    // melakukan pengambilan data kursus dari database
    fetch('./db/database.json')
        .then(res => res.json())
        .then(allCourses => {
            // kosongkan list sblm nanti akan diisi
            activeCoursesList.innerHTML = '';
            completedCoursesList.innerHTML = '';

            let hasActiveCourses = false;
            let hasCompletedCourses = false;

            // melakukan looping for each untuk setiap kursus yang dimiliki oleh pengguna
            enrolledCourseKeys.forEach(key => {
                if (allCourses[key]) {
                    const courseData = allCourses[key];
                    const totalVideos = courseData.videos.length;
                    let progressPercentage = 0;
                    let progressText = "Mulai Belajar";

                    // jika ada data progress belajar, lakukan perhitungan untuk persentase selesai
                    if (userProgressData) {
                        const courseProgress = userProgressData.lastChecked.find(c => c.Key === key);
                        if (courseProgress && totalVideos > 0) {
                            const lastWatchedTitle = courseProgress.TitleChecked;
                            const lastWatchedIndex = courseData.videos.findIndex(video => video.title === lastWatchedTitle);

                            if (lastWatchedIndex !== -1) {
                                const videosConsideredWatched = lastWatchedIndex + 1;
                                progressPercentage = (videosConsideredWatched / totalVideos) * 100;
                                
                                if (progressPercentage >= 100) {
                                    progressText = "Kursus Selesai";
                                } else {
                                    progressText = `${progressPercentage.toFixed(0)}% Selesai`;
                                }
                            }
                        }
                    }

                    // data untuk tanggal pembelian kursus
                    const userData = {
                        enrolledDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
                    };

                    // membuat elemen item kursus
                    const courseItem = document.createElement('a');
                    courseItem.href = `./belajar.html?key=${key}`;
                    courseItem.className = 'course-item';

                    // membuat HTML untuk bagian progress bar
                    const progressHTML = `
                        <div class="progress-container">
                            <div class="progress-bar" style="width: ${progressPercentage}%;"></div>
                        </div>
                        <span class="progress-text">${progressText}</span>`;

                    // membuat HTML untuk bagian item kursus
                    courseItem.innerHTML = `
                        <img src="https://img.youtube.com/vi/${courseData.videos[0].link}/hqdefault.jpg" class="course-item-thumbnail">
                        <div class="course-item-content">
                            <h3>${key}</h3>
                            ${progressHTML}
                            <div class="enrollment-date">
                                <i class='bx bx-calendar'></i>
                                <span>Terdaftar: ${userData.enrolledDate}</span>
                            </div>
                        </div>`;

                    // memasukkan item kursus ke tab berdasarkan jumlah dari progress belajar
                    // jika sudah 100 maka akan di simpan di tab selesai, jika belum maka akan ada di tab aktif
                    if (progressPercentage >= 100) {
                        completedCoursesList.appendChild(courseItem);
                        hasCompletedCourses = true;
                    } else {
                        activeCoursesList.appendChild(courseItem);
                        hasActiveCourses = true;
                    }
                }
            });

            // menampilkan pesan jika pengguna belum memiliki kursus pada tab - tab
            if (!hasActiveCourses) {
                activeCoursesList.innerHTML = `
                    <div class="empty-message">
                        <p class="empty-message-text">Tidak ada kursus aktif. Mulai kursus baru dan lanjutkan progres belajarmu!</p>
                        <div class="lihat-lainnya-container">
                            <a href="./kursus.html" class="btn-secondary">Lihat Kursus</a>
                        </div>
                    </div>
                `;
            }
            if (!hasCompletedCourses) {
                completedCoursesList.innerHTML = '<p class="empty-message">Anda belum menyelesaikan kursus apapun. Teruslah belajar!</p>';
            }
        })
        .catch(err => console.error("Error fetching dashboard courses:", err));
});