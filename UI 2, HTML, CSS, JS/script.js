document.addEventListener("DOMContentLoaded", () => {
    
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const navMenu = document.getElementById("navMenu");

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            hamburgerBtn.classList.toggle("active");
        });

        // Tutup menu otomatis saat salah satu link diklik
        document.querySelectorAll(".nav-menu a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                hamburgerBtn.classList.remove("active");
            });
        });
    }

    const fadeElements = document.querySelectorAll(".fade-up");
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    fadeElements.forEach(el => fadeObserver.observe(el));

   
    const staggerWrappers = document.querySelectorAll(".stagger-wrapper");
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                staggerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    staggerWrappers.forEach(wrapper => staggerObserver.observe(wrapper));

    const counters = document.querySelectorAll(".counter");
    const animationDuration = 2000; // Durasi 2 detik

    const startCounting = (counter) => {
        const target = +counter.getAttribute("data-target");
        const suffix = counter.getAttribute("data-suffix") || "";
        const startTime = performance.now();

        const updateNumber = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / animationDuration, 1);
            
            // Easing function (melambat di akhir)
            const easeProgress = 1 - Math.pow(1 - progress, 2);
            const currentCount = Math.floor(easeProgress * target);

            counter.innerText = currentCount.toLocaleString("id-ID") + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                counter.innerText = target.toLocaleString("id-ID") + suffix;
            }
        };

        requestAnimationFrame(updateNumber);
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounting(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
});