const specialtyKeywords = {
    'Nội khoa': ['sốt', 'ho', 'đau đầu', 'mệt mỏi', 'chóng mặt', 'đau bụng', 'tiêu chảy', 'táo bón'],
    'Ngoại khoa': ['chấn thương', 'gãy xương', 'bong gân', 'vết thương', 'phẫu thuật', 'đau khớp'],
    'Da liễu': ['mẩn ngứa', 'phát ban', 'mụn', 'viêm da', 'dị ứng', 'nấm da'],
    'Tai mũi họng': ['đau họng', 'viêm tai', 'nghẹt mũi', 'chảy máu cam', 'ù tai', 'khàn tiếng'],
    'Răng hàm mặt': ['đau răng', 'sâu răng', 'viêm lợi', 'niềng răng', 'nhổ răng', 'trám răng'],
    'Mắt': ['mờ mắt', 'đau mắt', 'đỏ mắt', 'cận thị', 'viễn thị', 'loạn thị']
};

function findSpecialtyBySymptom(symptom) {
    const normalizedSymptom = symptom.toLowerCase().trim();
    const matchingSpecialties = [];

    for (const [specialty, keywords] of Object.entries(specialtyKeywords)) {
        if (keywords.some(keyword => keyword.includes(normalizedSymptom) || normalizedSymptom.includes(keyword))) {
            matchingSpecialties.push(specialty);
        }
    }

    return matchingSpecialties;
}

// Tìm bác sĩ phù hợp dựa trên triệu chứng
function findDoctorsBySymptom(symptom) {
    const matchingSpecialties = findSpecialtyBySymptom(symptom);
    const matchingDoctors = doctors.filter(doctor => 
        matchingSpecialties.includes(doctor.specialty)
    );
    return matchingDoctors;
}

// Hiển thị danh sách bác sĩ
function displayDoctors(doctors) {
    const doctorsContainer = document.getElementById('doctors-list');
    if (!doctorsContainer) return;

    doctorsContainer.innerHTML = '';

    if (doctors.length === 0) {
        doctorsContainer.innerHTML = '<div class="col-12"><p class="text-center">Không tìm thấy bác sĩ phù hợp</p></div>';
        return;
    }

    doctors.forEach(doctor => {
        const doctorCard = document.createElement('div');
        doctorCard.className = 'col-md-6';
        doctorCard.innerHTML = `
            <div class="card h-100 shadow-sm">
                <div class="card-body">
                    <div class="d-flex align-items-center mb-3">
                        <img src="${doctor.image}" class="rounded-circle me-3" alt="${doctor.name}" style="width: 80px; height: 80px; object-fit: cover;">
                        <div>
                            <h5 class="card-title mb-1">${doctor.name}</h5>
                            <p class="text-muted mb-0">Chuyên khoa ${doctor.specialty}</p>
                        </div>
                    </div>
                    <p class="card-text">
                        <small class="text-muted">
                            <i class="bi bi-clock"></i> Kinh nghiệm: ${doctor.experience}
                        </small>
                    </p>
                    <p class="card-text">
                        <small class="text-muted">
                            <i class="bi bi-star"></i> Đánh giá: ${doctor.rating}/5
                        </small>
                    </p>
                    <p class="card-text">
                        <small class="text-muted">
                            <i class="bi bi-calendar"></i> Ngày làm việc: ${doctor.availableDays.join(', ')}
                        </small>
                    </p>
                    <button class="btn btn-outline-primary w-100" onclick="showBookingModal('${doctor.name}')">
                        Đặt lịch khám
                    </button>
                </div>
            </div>
        `;
        doctorsContainer.appendChild(doctorCard);
    });
}

// Cập nhật gợi ý chuyên khoa và hiển thị bác sĩ
function updateSpecialtySuggestions() {
    const symptomInput = document.getElementById('symptom-input');
    const suggestionsContainer = document.getElementById('specialty-suggestions');
    
    if (!symptomInput || !suggestionsContainer) return;

    const symptom = symptomInput.value;
    const matchingSpecialties = findSpecialtyBySymptom(symptom);
    const matchingDoctors = findDoctorsBySymptom(symptom);

    suggestionsContainer.innerHTML = '';
    
    if (matchingSpecialties.length > 0) {
        const suggestionsList = document.createElement('ul');
        suggestionsList.className = 'specialty-suggestions-list';
        
        matchingSpecialties.forEach(specialty => {
            const listItem = document.createElement('li');
            listItem.textContent = specialty;
            listItem.addEventListener('click', () => {
                document.getElementById('specialty-select').value = specialty;
                suggestionsContainer.innerHTML = '';
                displayDoctors(matchingDoctors);
            });
            suggestionsList.appendChild(listItem);
        });
        
        suggestionsContainer.appendChild(suggestionsList);
    }

    // Hiển thị bác sĩ phù hợp
    displayDoctors(matchingDoctors);
}

// Hàm xử lý tìm kiếm khi click nút
function handleSearch() {
    const symptomInput = document.getElementById('symptom-input');
    const specialtySelect = document.getElementById('specialty-select');
    
    if (!symptomInput && !specialtySelect) return;

    let matchingDoctors = [];

    // Nếu có nhập triệu chứng
    if (symptomInput && symptomInput.value.trim()) {
        matchingDoctors = findDoctorsBySymptom(symptomInput.value);
    }
    // Nếu có chọn chuyên khoa
    else if (specialtySelect && specialtySelect.value) {
        matchingDoctors = doctors.filter(doctor => 
            doctor.specialty === specialtySelect.value
        );
    }
    // Nếu không có cả hai, hiển thị tất cả bác sĩ
    else {
        matchingDoctors = doctors;
    }

    // Hiển thị kết quả
    displayDoctors(matchingDoctors);
}

// Hàm hiển thị modal đặt lịch
function showBookingModal(doctorName) {
    const modal = new bootstrap.Modal(document.getElementById('bookingModal'));
    
    // Đặt tên bác sĩ vào input
    const doctorInput = document.getElementById('modal-doctor-name');
    if (doctorInput) {
        doctorInput.value = doctorName;
    }
    
    // Lấy input ngày đặt lịch
    const bookingDate = document.getElementById('booking-date');
    if (bookingDate) {
        // Đặt giá trị tối thiểu cho input date là ngày mai
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const minDate = tomorrow.toISOString().split('T')[0];
        bookingDate.min = minDate;
        
        // Đặt giá trị mặc định là ngày mai
        bookingDate.value = minDate;
    }
    
    // Hiển thị modal
    modal.show();
}

// Dữ liệu mẫu cho lịch hẹn
let appointments = [
    {
        id: 1,
        doctor: "Bác sĩ Nguyễn Văn A",
        date: "2024-04-25",
        time: "09:00",
        reason: "Đau đầu và sốt"
    },
    {
        id: 2,
        doctor: "Bác sĩ Trần Thị B",
        date: "2024-04-26",
        time: "14:00",
        reason: "Khám tổng quát"
    }
];

// Hiển thị danh sách lịch hẹn
function displayAppointments() {
    const appointmentsList = document.querySelector('.appointments-list');
    if (!appointmentsList) return;

    if (appointments.length === 0) {
        appointmentsList.innerHTML = '<div class="no-appointments">Bạn chưa có lịch hẹn nào</div>';
        return;
    }

    appointmentsList.innerHTML = appointments.map(appointment => `
        <div class="appointment-item" data-id="${appointment.id}">
            <div class="appointment-header">
                <span class="appointment-doctor">${appointment.doctor}</span>
                <span class="appointment-date">${formatDate(appointment.date)}</span>
            </div>
            <div class="appointment-details">
                <div class="appointment-time">Giờ khám: ${appointment.time}</div>
                <div class="appointment-reason">Lý do: ${appointment.reason}</div>
            </div>
            <div class="appointment-actions">
                <button class="cancel-btn" onclick="cancelAppointment(${appointment.id})">Hủy lịch</button>
            </div>
        </div>
    `).join('');
}

// Hủy lịch hẹn
function cancelAppointment(id) {
    if (confirm('Bạn có chắc chắn muốn hủy lịch hẹn này?')) {
        appointments = appointments.filter(appointment => appointment.id !== id);
        displayAppointments();
        alert('Đã hủy lịch hẹn thành công!');
    }
}

// Định dạng ngày
function formatDate(dateString) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
}

// Thêm lịch hẹn mới
function addAppointment(doctor, date, time, reason) {
    const newAppointment = {
        id: appointments.length + 1,
        doctor,
        date,
        time,
        reason
    };
    appointments.push(newAppointment);
    displayAppointments();
}

// Thêm event listener khi DOM đã load
document.addEventListener('DOMContentLoaded', () => {
    const symptomInput = document.getElementById('symptom-input');
    const searchButton = document.getElementById('search-button');
    const specialtySelect = document.getElementById('specialty-select');
    const bookingForm = document.getElementById('bookingForm');
    
    if (symptomInput) {
        symptomInput.addEventListener('input', updateSpecialtySuggestions);
    }
    
    if (searchButton) {
        searchButton.addEventListener('click', handleSearch);
    }

    if (specialtySelect) {
        specialtySelect.addEventListener('change', handleSearch);
    }

    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted');
            submitBooking();
        });
    }

    // Hiển thị tất cả bác sĩ khi trang load
    displayDoctors(doctors);

    // Hiển thị danh sách lịch hẹn khi modal được mở
    const appointmentsModal = document.getElementById('appointmentsModal');
    if (appointmentsModal) {
        appointmentsModal.addEventListener('show.bs.modal', displayAppointments);
    }
});

// Cập nhật hàm submitBooking để thêm lịch hẹn mới
function submitBooking() {
    console.log('Starting form validation');
    const bookingDate = document.getElementById('booking-date');
    const bookingTime = document.getElementById('booking-time');
    const bookingReason = document.getElementById('booking-reason');
    const doctorName = document.getElementById('modal-doctor-name');
    
    // Reset tất cả thông báo lỗi
    document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    document.querySelectorAll('.invalid-feedback').forEach(el => el.style.display = 'none');
    
    let isValid = true;
    
    // Kiểm tra các trường bắt buộc
    if (!doctorName.value) {
        console.log('Doctor name is missing');
        doctorName.classList.add('is-invalid');
        document.getElementById('doctor-error').style.display = 'block';
        isValid = false;
    }
    
    if (!bookingDate.value) {
        console.log('Booking date is missing');
        bookingDate.classList.add('is-invalid');
        document.getElementById('date-error').style.display = 'block';
        isValid = false;
    }
    
    if (!bookingTime.value) {
        console.log('Booking time is missing');
        bookingTime.classList.add('is-invalid');
        document.getElementById('time-error').style.display = 'block';
        isValid = false;
    }
    
    if (!bookingReason.value.trim()) {
        console.log('Booking reason is missing');
        bookingReason.classList.add('is-invalid');
        document.getElementById('reason-error').style.display = 'block';
        isValid = false;
    }
    
    // Kiểm tra ngày đặt lịch
    if (bookingDate.value) {
        const selectedDate = new Date(bookingDate.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            console.log('Selected date is in the past');
            bookingDate.classList.add('is-invalid');
            document.getElementById('date-error').textContent = 'Vui lòng chọn ngày trong tương lai';
            document.getElementById('date-error').style.display = 'block';
            isValid = false;
        }
    }
    
    console.log('Form validation result:', isValid);
    
    if (!isValid) {
        return;
    }
    
    // Thêm lịch hẹn mới
    addAppointment(
        doctorName.value,
        bookingDate.value,
        bookingTime.value,
        bookingReason.value.trim()
    );
    
    // Hiển thị thông báo thành công
    alert('Đặt lịch thành công! Vui lòng chờ xác nhận từ bác sĩ.');
    
    // Đóng modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('bookingModal'));
    modal.hide();
    
    // Reset form
    document.getElementById('bookingForm').reset();
} 