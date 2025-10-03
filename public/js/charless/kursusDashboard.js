document.addEventListener('DOMContentLoaded', () => {
    const myCoursesList = document.getElementById('my-courses-list');
    const savedCoursesList = document.getElementById('saved-courses-list');

    const userEnrolledCourses = {
        'HTML': { progress: 75, enrolledDate: '15 Agu 2025' },
        'CSS': { progress: 30, enrolledDate: '01 Sep 2025' },
        'Javascript': { progress: 0, enrolledDate: '5 Sep 2025'},
        'PHP': { progress: 0, enrolledDate: '17 Sep 2025'}
    };
    
    const userSavedCourses = {
        'Laravel 8': { savedDate: '22 Sep 2025' },
        'Golang': { savedDate: '23 Sep 2025' }
    };

    fetch('./db/database.json')
        .then(res => res.json())
        .then(allCourses => {
            myCoursesList.innerHTML = ''; 
            for (const key in userEnrolledCourses) {
                if (allCourses[key]) {
                    const courseData = allCourses[key];
                    const userData = userEnrolledCourses[key];

                    const courseItem = document.createElement('a');
                    courseItem.href = `./belajar.html?key=${key}`; 
                    courseItem.className = 'course-item';

                    let progressHTML = '';
                    if (userData.progress > 0) {
                        progressHTML = `
                            <div class="progress-container">
                                <div class="progress-bar" style="width: ${userData.progress}%;"></div>
                            </div>
                            <span class="progress-text">${userData.progress}% Selesai</span>`;
                    } else {
                        progressHTML = `
                            <div class="progress-container">
                                <div class="progress-bar" style="width: 0%;"></div>
                            </div>
                            <span class="progress-text start-prompt">Mulai Belajar</span>`;
                    }

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
            }

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