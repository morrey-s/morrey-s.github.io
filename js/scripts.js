/*!
* Start Bootstrap - The Big Picture v5.0.6 (https://startbootstrap.com/template/the-big-picture)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-the-big-picture/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project
document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".portfolio-navbar");
    const navbarCollapse = document.getElementById("navbarResponsive");
    const navLinks = document.querySelectorAll("#navbarResponsive .nav-link");
    const sections = document.querySelectorAll("section[id]");
    const revealItems = document.querySelectorAll(
        ".portfolio-card, .project-tile"
    );

    // Close mobile menu after clicking a link
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (navbarCollapse && navbarCollapse.classList.contains("show")) {
                const collapse =
                    bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
                collapse.hide();
            }
        });
    });

    // Add a stronger navbar background after scrolling
    function updateNavbar() {
        if (!navbar) return;

        if (window.scrollY > 40) {
            navbar.classList.add("navbar-scrolled");
        } else {
            navbar.classList.remove("navbar-scrolled");
        }
    }

    updateNavbar();
    window.addEventListener("scroll", updateNavbar);

    // Reveal cards as they enter the screen
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
            threshold: 0.15
        }
    );

    revealItems.forEach((item) => {
        item.classList.add("reveal");
        revealObserver.observe(item);
    });

    // Highlight the current navbar section
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute("id");

                    navLinks.forEach((link) => {
                        link.classList.remove("active");

                        if (link.getAttribute("href") === `#${id}`) {
                            link.classList.add("active");
                        }
                    });
                }
            });
        },
        {
            threshold: 0.5
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });
});
