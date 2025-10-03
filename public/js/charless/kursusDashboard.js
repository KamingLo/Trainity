document.addEventListener('DOMContentLoaded', () => {
    const myCoursesList = document.getElementById('my-courses-list');
    const savedCoursesList = document.getElementById('saved-courses-list');
    
    const userSavedCourses = {
        'Laravel 8': { savedDate: '22 Sep 2025' },
        'Golang': { savedDate: '23 Sep 2025' }
    };

    const STORAGE_KEY = "courses_order";
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    const currentUser = loggedInUser ? loggedInUser.username : null;
    let enrolledCourseKeys = [];

    if (currentUser && sessionStorage.getItem("Authenticated") === "True") {
        const allOrders = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        const userOrder = allOrders.find(order => order.user === currentUser);
        
        if (userOrder) {
            enrolledCourseKeys = userOrder.kursus;
        }
    }

    fetch('./db/database.json')
        .then(res => res.json())
        .then(allCourses => {

            myCoursesList.innerHTML = '';

            enrolledCourseKeys.forEach(key => {
                if (allCourses[key]) {
                    const courseData = allCourses[key];

                    const userData = {
                        progress: 0, 
                        enrolledDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
                    };

                    const courseItem = document.createElement('a');
                    courseItem.href = `./belajar.html?key=${key}`; 
                    courseItem.className = 'course-item';

                    let progressHTML = `
                        <div class="progress-container">
                            <div class="progress-bar" style="width: 0%;"></div>
                        </div>
                        <span class="progress-text start-prompt">Mulai Belajar</span>`;

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
                    myCoursesList.appendChild(courseItem);
                }
            });

            savedCoursesList.innerHTML = '';
            for (const key in userSavedCourses) {
                if (allCourses[key]) {
                    const courseData = allCourses[key];
                    const userData = userSavedCourses[key];
                    const displayName = key === "Laravel 8" ? "Laravel" : key;

                    const courseItem = document.createElement('a');
                    courseItem.href = `./checkout.html?key=${key}`;
                    courseItem.className = 'course-item';
                    courseItem.innerHTML = `
                        <img src="https://img.youtube.com/vi/${courseData.videos[0].link}/hqdefault.jpg" class="course-item-thumbnail">
                        <div class="course-item-content">
                            <h3>${displayName}</h3>
                            <div class="enrollment-date">
                                <i class='bx bx-bookmark'></i>
                                <span>Disimpan pada ${userData.savedDate}</span>
                            </div>
                        </div>`;
                    savedCoursesList.appendChild(courseItem);
                }
            }
        })
    .catch(err => console.error("Error fetching dashboard courses:", err));
});