/* =========================================================
   Portfolio JavaScript - Beginner Friendly Version
   IMPORTANT: Design, animations and working are kept the same.
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       1. Navbar Shadow on Scroll
       ========================= */

    const navbar = document.getElementById("navbar");

    if (navbar) {
        window.addEventListener("scroll", function () {

            if (window.scrollY > 50) {
                navbar.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.2)";
            } else {
                navbar.style.boxShadow = "none";
            }

        });
    }


    /* =========================
       2. Mobile Menu
       ========================= */

    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");

    if (hamburger && navMenu) {

        hamburger.addEventListener("click", function () {

            // Add/remove the active class
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");

            // Check whether the menu is open
            const menuIsOpen = hamburger.classList.contains("active");

            hamburger.setAttribute("aria-expanded", menuIsOpen);
            hamburger.setAttribute(
                "aria-label",
                menuIsOpen ? "Close menu" : "Open menu"
            );
        });


        // Close the mobile menu when a link is clicked
        const menuLinks = navMenu.querySelectorAll(".nav-link");

        menuLinks.forEach(function (link) {

            link.addEventListener("click", function () {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
                hamburger.setAttribute("aria-expanded", "false");
            });

        });
    }


    /* =========================
       3. Typing Animation
       ========================= */

    const typedText = document.getElementById("typed-text");

    if (typedText) {

        const roles = [
            "Software Engineering Student",
            "Web Developer",
            "AI Enthusiast"
        ];

        let roleNumber = 0;
        let characterNumber = 0;
        let deleting = false;
        let speed = 100;


        function typeText() {

            // Get the current role
            const currentRole = roles[roleNumber];


            // If we are deleting, remove one character
            if (deleting) {

                typedText.textContent =
                    currentRole.substring(0, characterNumber - 1);

                characterNumber--;
                speed = 50;

            } else {

                // Otherwise, add one character
                typedText.textContent =
                    currentRole.substring(0, characterNumber + 1);

                characterNumber++;
                speed = 100;
            }


            // When the complete word has been typed
            if (!deleting && characterNumber === currentRole.length) {

                deleting = true;
                speed = 2000;

            }

            // When the word has been completely deleted
            else if (deleting && characterNumber === 0) {

                deleting = false;

                roleNumber++;

                // Start again from the first role
                if (roleNumber >= roles.length) {
                    roleNumber = 0;
                }

                speed = 500;
            }


            // Run the function again
            setTimeout(typeText, speed);
        }


        typeText();
    }


    /* =========================
       4. Scroll Reveal Animation
       ========================= */

    const revealElements = document.querySelectorAll(".reveal");

    if (revealElements.length > 0) {

        const revealObserver = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        // Only animate once
                        revealObserver.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px"
            }
        );


        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });
    }


    /* =========================
       5. Active Navbar Link
       ========================= */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    if (sections.length > 0 && navLinks.length > 0) {

        const activeNavObserver = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        const sectionId =
                            entry.target.getAttribute("id");


                        navLinks.forEach(function (link) {

                            const linkTarget =
                                link.getAttribute("href");

                            if (linkTarget === "#" + sectionId) {
                                link.classList.add("active");
                            } else {
                                link.classList.remove("active");
                            }

                        });
                    }

                });

            },
            {
                threshold: 0.3,
                rootMargin: "-80px 0px -50% 0px"
            }
        );


        sections.forEach(function (section) {
            activeNavObserver.observe(section);
        });
    }


    /* =========================
       6. Animated Numbers
       ========================= */

    const counters = document.querySelectorAll(".stat-number");

    if (counters.length > 0) {

        function animateCounter(element) {

            const target = parseInt(element.dataset.target, 10);
            const duration = 2000;
            const startTime = performance.now();


            function updateCounter(currentTime) {

                const elapsedTime = currentTime - startTime;

                let progress = elapsedTime / duration;

                // Never allow progress to go above 1
                if (progress > 1) {
                    progress = 1;
                }


                // Same easing effect as the original code
                const easedProgress =
                    1 - Math.pow(1 - progress, 3);


                element.textContent =
                    Math.floor(easedProgress * target);


                if (progress < 1) {

                    requestAnimationFrame(updateCounter);

                } else {

                    // Make sure the final number is exact
                    element.textContent = target;
                }
            }


            requestAnimationFrame(updateCounter);
        }


        const counterObserver = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        animateCounter(entry.target);

                        // Only animate once
                        counterObserver.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.5
            }
        );


        counters.forEach(function (counter) {
            counterObserver.observe(counter);
        });
    }


    /* =========================
       7. Skill Progress Bars
       ========================= */

    const skillBars = document.querySelectorAll(".skill-progress");

    if (skillBars.length > 0) {

        const skillObserver = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        const bar = entry.target;

                        // data-width contains values such as "90%"
                        bar.style.width = bar.dataset.width;

                        // Animate only once
                        skillObserver.unobserve(bar);
                    }

                });

            },
            {
                threshold: 0.3
            }
        );


        skillBars.forEach(function (bar) {
            skillObserver.observe(bar);
        });
    }


    /* =========================
       8. Contact Form Validation
       ========================= */

    const contactForm = document.getElementById("contact-form");

    if (contactForm) {

        const successMessage =
            document.getElementById("form-success");


        // Check the name
        function checkName(value) {

            if (!value.trim()) {
                return "Please enter your name";
            }

            if (value.trim().length < 2) {
                return "Name must be at least 2 characters";
            }

            return "";
        }


        // Check the email
        function checkEmail(value) {

            if (!value.trim()) {
                return "Please enter your email";
            }

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(value)) {
                return "Please enter a valid email address";
            }

            return "";
        }


        // Check the subject
        function checkSubject(value) {

            if (!value.trim()) {
                return "Please enter a subject";
            }

            if (value.trim().length < 3) {
                return "Subject must be at least 3 characters";
            }

            return "";
        }


        // Check the message
        function checkMessage(value) {

            if (!value.trim()) {
                return "Please enter your message";
            }

            if (value.trim().length < 10) {
                return "Message must be at least 10 characters";
            }

            return "";
        }


        // Validate one field
        function validateField(fieldName) {

            const input = document.getElementById(fieldName);
            const errorMessage =
                document.getElementById(fieldName + "-error");

            if (!input || !errorMessage) {
                return true;
            }


            let error = "";

            if (fieldName === "name") {
                error = checkName(input.value);
            }

            if (fieldName === "email") {
                error = checkEmail(input.value);
            }

            if (fieldName === "subject") {
                error = checkSubject(input.value);
            }

            if (fieldName === "message") {
                error = checkMessage(input.value);
            }


            if (error) {

                input.classList.add("error");
                errorMessage.textContent = error;

                return false;

            } else {

                input.classList.remove("error");
                errorMessage.textContent = "";

                return true;
            }
        }


        // Submit form
        contactForm.addEventListener("submit", function (event) {

            // Stop the page from refreshing
            event.preventDefault();

            let formIsValid = true;


            const fields = [
                "name",
                "email",
                "subject",
                "message"
            ];


            fields.forEach(function (field) {

                const valid = validateField(field);

                if (!valid) {
                    formIsValid = false;
                }

            });


            // If everything is correct
            if (formIsValid) {

                contactForm.reset();

                successMessage.classList.add("show");

                setTimeout(function () {
                    successMessage.classList.remove("show");
                }, 5000);
            }

        });


        // Remove an error when the user fixes the field
        const formInputs =
            contactForm.querySelectorAll("input, textarea");


        formInputs.forEach(function (input) {

            input.addEventListener("input", function () {

                if (input.classList.contains("error")) {

                    validateField(input.id);
                }

            });

        });
    }


    /* =========================
       9. Back to Top Button
       ========================= */

    const backToTop =
        document.getElementById("back-to-top");


    if (backToTop) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 500) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }

        });


        backToTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });
    }


    /* =========================
       10. Dark / Light Theme
       ========================= */

    const themeToggle =
        document.getElementById("theme-toggle");


    if (themeToggle) {

        const savedTheme =
            localStorage.getItem("portfolio-theme");


        // Load the saved light theme
        if (savedTheme === "light") {

            document.documentElement.setAttribute(
                "data-theme",
                "light"
            );
        }


        themeToggle.addEventListener("click", function () {

            const currentTheme =
                document.documentElement.getAttribute("data-theme");


            if (currentTheme === "light") {

                // Change to dark mode
                document.documentElement.removeAttribute(
                    "data-theme"
                );

                localStorage.setItem(
                    "portfolio-theme",
                    "dark"
                );

            } else {

                // Change to light mode
                document.documentElement.setAttribute(
                    "data-theme",
                    "light"
                );

                localStorage.setItem(
                    "portfolio-theme",
                    "light"
                );
            }

        });
    }


    /* =========================
       11. Current Year
       ========================= */

    const yearElement =
        document.getElementById("year");


    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();
    }


    /* =========================
       12. Particle Background
       ========================= */

    const canvas =
        document.getElementById("particle-canvas");


    if (canvas) {

        const reducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        // Stop particles if the visitor prefers less motion
        if (!reducedMotion) {

            const context =
                canvas.getContext("2d");

            let particles = [];
            let animationId = null;


            // Set canvas size
            function resizeCanvas() {

                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }


            // Create all particles
            function createParticles() {

                const numberOfParticles =
                    Math.min(
                        Math.floor(window.innerWidth / 15),
                        80
                    );


                particles = [];


                for (let i = 0; i < numberOfParticles; i++) {

                    particles.push({

                        x: Math.random() * canvas.width,

                        y: Math.random() * canvas.height,

                        vx: (Math.random() - 0.5) * 0.4,

                        vy: (Math.random() - 0.5) * 0.4,

                        radius: Math.random() * 1.5 + 0.5,

                        opacity: Math.random() * 0.5 + 0.1
                    });
                }
            }


            // Draw particles and connecting lines
            function drawParticles() {

                context.clearRect(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );


                // Get the accent color from CSS
                let accentColor =
                    getComputedStyle(
                        document.documentElement
                    )
                    .getPropertyValue("--accent-primary")
                    .trim();


                if (!accentColor) {
                    accentColor = "#00e0ff";
                }


                // Draw each particle
                particles.forEach(function (particle) {

                    particle.x += particle.vx;
                    particle.y += particle.vy;


                    // Move the particle to the other side
                    if (particle.x < 0) {
                        particle.x = canvas.width;
                    }

                    if (particle.x > canvas.width) {
                        particle.x = 0;
                    }

                    if (particle.y < 0) {
                        particle.y = canvas.height;
                    }

                    if (particle.y > canvas.height) {
                        particle.y = 0;
                    }


                    context.beginPath();

                    context.arc(
                        particle.x,
                        particle.y,
                        particle.radius,
                        0,
                        Math.PI * 2
                    );

                    context.fillStyle = accentColor;
                    context.globalAlpha = particle.opacity;

                    context.fill();
                });


                // Draw lines between nearby particles
                context.globalAlpha = 0.15;


                for (let i = 0; i < particles.length; i++) {

                    for (
                        let j = i + 1;
                        j < particles.length;
                        j++
                    ) {

                        const first = particles[i];
                        const second = particles[j];


                        const xDistance =
                            first.x - second.x;

                        const yDistance =
                            first.y - second.y;


                        const distance =
                            Math.sqrt(
                                xDistance * xDistance +
                                yDistance * yDistance
                            );


                        if (distance < 120) {

                            context.beginPath();

                            context.moveTo(
                                first.x,
                                first.y
                            );

                            context.lineTo(
                                second.x,
                                second.y
                            );

                            context.strokeStyle = accentColor;

                            context.lineWidth = 0.5;

                            context.globalAlpha =
                                (1 - distance / 120) * 0.15;

                            context.stroke();
                        }
                    }
                }


                context.globalAlpha = 1;


                // Continue the animation
                animationId =
                    requestAnimationFrame(drawParticles);
            }


            // Start particle animation
            resizeCanvas();
            createParticles();
            drawParticles();


            // Resize particles when the window size changes
            let resizeTimer;


            window.addEventListener("resize", function () {

                clearTimeout(resizeTimer);


                resizeTimer = setTimeout(function () {

                    resizeCanvas();
                    createParticles();

                }, 200);

            });


            // Pause particles when the page is hidden
            document.addEventListener(
                "visibilitychange",
                function () {

                    if (document.hidden) {

                        if (animationId) {
                            cancelAnimationFrame(animationId);
                        }

                    } else {

                        drawParticles();
                    }
                }
            );
        }
    }

});
