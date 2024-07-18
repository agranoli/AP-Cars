document.addEventListener('DOMContentLoaded', function() {
    var toggleButton = document.querySelector('.toggle-icon');
    var closeButton = document.querySelector('.close-icon');
    var headerSlide = document.querySelector('.header-slide');

    toggleButton.addEventListener('click', function() {
        headerSlide.classList.toggle('open');
        toggleButton.classList.toggle('open');
    });

    closeButton.addEventListener('click', function() {
        headerSlide.classList.remove('open');
        toggleButton.classList.remove('open');
    });
});

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    const headerHeight = document.querySelector('.header').offsetHeight; // Adjust this to your header height
    if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // Close the header slide
        const headerSlide = document.querySelector('.header-slide');
        if (headerSlide.classList.contains('open')) {
            headerSlide.classList.remove('open');
        }
    }
}


emailjs.init("J9uA3uOLQfzL9tmEz");

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Reset previous errors and status message
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('messageError').textContent = '';
    // document.getElementById('statusMessage').textContent = '';

    // Validate form inputs
    let isValid = true;
    const name = this.user_name.value.trim();
    const email = this.user_email.value.trim();
    const message = this.message.value.trim();

    if (!name) {
        document.getElementById('nameError').textContent = 'Jāievada vārds';
        isValid = false;
    }

    if (!email) {
        document.getElementById('emailError').textContent = 'Jāievada epasts';
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        document.getElementById('emailError').textContent = 'Nederīgs e-pasta formāts';
        isValid = false;
    }

    if (!message) {
        document.getElementById('messageError').textContent = 'Jāievada ziņa';
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    emailjs.sendForm('service_ftpq4wq', 'template_xk78esa', this)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            const submitButton = document.querySelector('.button');
            submitButton.classList.add('success');
            submitButton.value = 'Ziņa nosūtīta veiksmīgi!';
            setTimeout(() => {
                submitButton.classList.remove('success');
                submitButton.value = 'Sūtīt ziņu';
            }, 2000);
            document.getElementById('contactForm').reset(); // Reset form
        }, function(error) {
            console.log('FAILED...', error);
        });
});