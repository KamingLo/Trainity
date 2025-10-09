document.addEventListener("DOMContentLoaded", () => {
    const scrollers = document.querySelectorAll(".scroller");

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        addAnimation();
    }

    // fungsi untuk animasi testimoni
    function addAnimation() {
        scrollers.forEach((scroller) => {
            // mengambil item testimoni yang berada di dalam scrolller
            const scrollerInner = scroller.querySelector(".testimoni-list");
            const scrollerContent = Array.from(scrollerInner.children);
            
            // melakukan duplikasi item testimoni agar dapat menciptakan looping
            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                // aria hidden untuk menyembunyikan elemen yang duplikat dri screen
                duplicatedItem.setAttribute("aria-hidden", true);
                scrollerInner.appendChild(duplicatedItem);
            });
            
            // menambahkan atribut 'data animated' agar dapat memicu animasi CSS
            scroller.setAttribute("data-animated", true);
        });
    }
});