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

    // Sidebar toggle
    document.getElementById('sidebarCollapse').addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('active');
        document.getElementById('content').classList.toggle('active');
    });

    // Close sidebar on mobile when clicking outside
    document.addEventListener('click', function(e) {
        const sidebar = document.getElementById('sidebar');
        const sidebarCollapse = document.getElementById('sidebarCollapse');
        
        if (!sidebar.contains(e.target) && !sidebarCollapse.contains(e.target) && window.innerWidth <= 768) {
            sidebar.classList.add('active');
            document.getElementById('content').classList.add('active');
        }
    });

    // Handle notifications
    const notificationDropdown = document.querySelector('.dropdown-toggle');
    if (notificationDropdown) {
        notificationDropdown.addEventListener('click', function(e) {
            e.preventDefault();
            // Here you would typically fetch notifications from the server
            console.log('Fetching notifications...');
        });
    }

    // Handle logout
    const logoutButton = document.querySelector('a[href="#logout"]');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
                // Here you would typically handle logout logic
                console.log('Logging out...');
                window.location.href = '../login.html';
            }
        });
    }

    // Initialize charts
    initializeCharts();
});

function initializeCharts() {
    // Appointment Chart
    const appointmentOptions = {
        series: [{
            name: 'Lịch hẹn',
            data: [31, 40, 28, 51, 42, 109, 100]
        }],
        chart: {
            height: 350,
            type: 'area',
            toolbar: {
                show: false
            }
        },
        colors: ['#6777ef'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            categories: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            },
        },
    };

    const appointmentChart = new ApexCharts(document.querySelector("#appointmentChart"), appointmentOptions);
    appointmentChart.render();

    // Specialty Chart
    const specialtyOptions = {
        series: [44, 55, 13, 43, 22],
        chart: {
            type: 'donut',
            height: 350
        },
        labels: ['Tim mạch', 'Nội khoa', 'Thần kinh', 'Nhi khoa', 'Khác'],
        colors: ['#6777ef', '#66bb6a', '#ffa426', '#fc544b', '#3abaf4'],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    const specialtyChart = new ApexCharts(document.querySelector("#specialtyChart"), specialtyOptions);
    specialtyChart.render();
}

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
    // Bản đồ giá trị select -> nhãn hiển thị trên card
    const map = {
        general: 'Đa Khoa',
        cardiology: 'Tim mạch',
        neurology: 'Thần Kinh',
        orthopedics: 'Cơ xương khớp',
        pediatrics: 'Nhi Khoa'
    };
    const doctorCols = document.querySelectorAll('#doctorList .col-md-6');
    doctorCols.forEach(col => {
        const specText = col.querySelector('.text-muted').innerText;
        // nếu không chọn chuyên khoa hoặc trùng nhãn thì hiển thị
        if (!speciality || specText.includes(map[speciality])) {
            col.style.display = '';
        } else {
            col.style.display = 'none';
        }
    });
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

// Initialize DataTable for doctors list
$(document).ready(function() {
    if ($('#doctorsTable').length) {
        $('#doctorsTable').DataTable({
            language: {
                search: "Tìm kiếm:",
                lengthMenu: "Hiển thị _MENU_ dòng",
                info: "Hiển thị _START_ đến _END_ của _TOTAL_ bác sĩ",
                infoEmpty: "Hiển thị 0 đến 0 của 0 bác sĩ",
                infoFiltered: "(lọc từ _MAX_ bác sĩ)",
                paginate: {
                    first: "Đầu",
                    last: "Cuối",
                    next: "Sau",
                    previous: "Trước"
                }
            },
            pageLength: 10,
            order: [[0, 'asc']]
        });
    }

    // Handle specialty filter
    $('#specialtyFilter').change(function() {
        var table = $('#doctorsTable').DataTable();
        table.column(2).search($(this).val()).draw();
    });

    // Handle status filter
    $('#statusFilter').change(function() {
        var table = $('#doctorsTable').DataTable();
        table.column(5).search($(this).val()).draw();
    });

    // Handle form submission
    $('#addDoctorForm').submit(function(e) {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thêm bác sĩ thành công!');
        $('#addDoctorModal').modal('hide');
    });
});

