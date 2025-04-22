// Handle login form submission
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Handle register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Initialize date picker if it exists
    const datePicker = document.getElementById('date');
    if (datePicker) {
        flatpickr(datePicker, {
            minDate: "today",
            dateFormat: "Y-m-d"
        });
    }

    // Handle doctor search
    const searchButton = document.getElementById('searchDoctors');
    if (searchButton) {
        searchButton.addEventListener('click', handleDoctorSearch);
    }
});

// Login handler
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
    }

    // Here you would typically make an API call
    console.log('Login attempt:', { email, password });
    alert('Đăng nhập thành công!');
}

// Register handler
function handleRegister(e) {
    e.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Mật khẩu xác nhận không khớp!');
        return;
    }

    // Here you would typically make an API call
    console.log('Register attempt:', { firstName, lastName, email, phone });
    alert('Đăng ký thành công!');
}

// Doctor search handler
function handleDoctorSearch() {
    const speciality = document.getElementById('speciality').value;
    const date = document.getElementById('date').value;

    // Here you would typically make an API call to get doctors
    console.log('Searching doctors:', { speciality, date });
    // For now, we'll just show a message
    alert('Đang tìm kiếm bác sĩ...');
}

// Show booking modal
function showBookingModal() {
    const modal = new bootstrap.Modal(document.getElementById('bookingModal'));
    modal.show();
}

// Submit booking
function submitBooking() {
    // Here you would typically make an API call to submit the booking
    alert('Đặt lịch thành công! Vui lòng chờ xác nhận từ bác sĩ.');
    const modal = bootstrap.Modal.getInstance(document.getElementById('bookingModal'));
    modal.hide();
}

// Add smooth scrolling for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});