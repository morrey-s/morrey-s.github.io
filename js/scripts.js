document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".portfolio-navbar");
    const navbarCollapse = document.getElementById("navbarResponsive");
    const navLinks = document.querySelectorAll("#navbarResponsive .nav-link");
    const sections = document.querySelectorAll("section[id]");
    const revealItems = document.querySelectorAll(
        ".portfolio-card, .project-tile"
    );

    // Close the mobile menu after selecting a section.
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (navbarCollapse && navbarCollapse.classList.contains("show")) {
                const collapse =
                    bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
                collapse.hide();
            }
        });
    });

    // Give the navbar a slightly stronger appearance after scrolling.
    function updateNavbar() {
        if (!navbar) return;

        navbar.classList.toggle("navbar-scrolled", window.scrollY > 40);
    }

    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });

    // Reveal cards as they enter the viewport.
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
            { threshold: 0.15 }
        );

        revealItems.forEach((item) => {
            item.classList.add("reveal");
            revealObserver.observe(item);
        });

        // Highlight the nav item for the section currently in view.
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    const id = entry.target.getAttribute("id");

                    navLinks.forEach((link) => {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === `#${id}`
                        );
                    });
                });
            },
            {
                rootMargin: "-35% 0px -45% 0px",
                threshold: 0
            }
        );

        sections.forEach((section) => {
            sectionObserver.observe(section);
        });
    } else {
        // Graceful fallback for older browsers.
        revealItems.forEach((item) => item.classList.add("show"));
    }
});
