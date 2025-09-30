document.querySelectorAll(".faq-question").forEach(question => {
    question.addEventListener("click", () => {
        const item = question.parentElement;

        document.querySelectorAll(".faq-item").forEach(i => {
            if (i !== item) {
                i.classList.remove("active");
            }
        });

        item.classList.toggle("active");
    });
});

document.getElementById("faqSearch").addEventListener("input", function() {
    const query = this.value.toLowerCase();
    const items = document.querySelectorAll(".faq-item");

    items.forEach(item => {
        const question = item.querySelector(".faq-question").textContent.toLowerCase();
        const answer = item.querySelector(".faq-answer").textContent.toLowerCase();

        if (question.includes(query) || answer.includes(query)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
});