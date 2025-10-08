document.addEventListener("DOMContentLoaded", () => {
    // list kunci kursus yang ingin ditampilkan pada section kursus unggulan
    const featuredCourseKeys = ["HTML", "CSS", "NodeJS", "Laravel 8"];
    
    // menambahkan data pada kursus unggulan
    const featuredCourseMetadata = {
        "HTML": { level: "Pemula", rating: "4.9" },
        "CSS": { level: "Pemula", rating: "4.8" },
        "NodeJS": { level: "Menengah", rating: "4.2" },
        "Laravel 8": { level: "Menengah", rating: "4.5" }
    };

    // mengambil elemen container untuk menyimpan course card
    const container = document.getElementById("featured-courses-container");

    // mengambil data informasi kursus dari file JSON
    fetch("./db/database.json")
        .then(res => res.json())
        .then(data => {
            // mengosongkan container sblm course card di tambahkan
            container.innerHTML = ""; 

            // melakukan looping for each untuk setiap kunci kursus
            featuredCourseKeys.forEach(key => {
                const course = data[key];
                const metadata = featuredCourseMetadata[key];

                // mengecek data kursus dan data tambahan nya
                if (course && metadata) {
                    const card = document.createElement("div");
                    card.classList.add("course-card");

                    // mengganti namam 'laravel 8' menjadi 'laravel' 
                    const displayName = key === "Laravel 8" ? "Laravel" : key;

                    // membuat HTML untuk course card
                    card.innerHTML = `
                        <a href="./checkout.html?key=${key}">
                            <img class="course-thumbnail" src="https://img.youtube.com/vi/${course.videos[0].link}/hqdefault.jpg" alt="${displayName} Course Thumbnail">
                            
                            <div class="course-content">
                                <h3 class="course-title">${displayName}</h3>
                                <p class="course-description">${course.short_description}</p>
                                
                                <div class="course-info">
                                    <span class="course-level">${metadata.level}</span>
                                    <span class="course-rating"><i class='bx bxs-star'></i> ${metadata.rating}</span>
                                </div>
                            </div>
                        </a>`;

                    // menambahakn kartu yang sudah jadi ke container 
                    container.appendChild(card);
                }
            });
        })
        .catch(err => console.error("Error fetching featured courses:", err));
});