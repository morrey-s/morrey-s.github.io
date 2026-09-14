document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".portfolio-navbar");
    const navbarCollapse = document.getElementById("navbarResponsive");
    const navLinks = document.querySelectorAll("#navbarResponsive .nav-link");
    const sections = document.querySelectorAll("section[id]");
    const revealItems = document.querySelectorAll(".reveal-item");
    const backToTop = document.querySelector(".back-to-top");

    // Close the mobile menu after choosing a section.
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (navbarCollapse && navbarCollapse.classList.contains("show")) {
                const collapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
                collapse.hide();
            }
        });
    });

    // Stronger navbar and back-to-top button after scrolling.
    const updateScrollUI = () => {
        const scrolled = window.scrollY > 40;

        if (navbar) {
            navbar.classList.toggle("navbar-scrolled", scrolled);
        }

        if (backToTop) {
            backToTop.classList.toggle("visible", window.scrollY > 600);
        }
    };

    updateScrollUI();
    window.addEventListener("scroll", updateScrollUI, { passive: true });

    if (backToTop) {
        backToTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // Small stagger so grouped cards don't all animate at exactly the same time.
    revealItems.forEach((item, index) => {
        item.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 70}ms`);
    });

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealItems.forEach((item) => revealObserver.observe(item));

        // Highlight the navigation link belonging to the current section.
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    const currentId = entry.target.id;

                    navLinks.forEach((link) => {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === `#${currentId}`
                        );
                    });
                });
            },
            {
                rootMargin: "-36% 0px -48% 0px",
                threshold: 0
            }
        );

        sections.forEach((section) => sectionObserver.observe(section));
    } else {
        revealItems.forEach((item) => item.classList.add("show"));
    }
});
