// Mẫu dữ liệu cuộc hẹn (trong thực tế sẽ được lấy từ API)
const sampleAppointments = [
    {
        id: 1,
        patientName: 'Nguyễn Thị B',
        date: '2024-04-25',
        time: '09:00',
        symptoms: 'Đau đầu, sốt',
        status: 'pending'
    },
    {
        id: 2,
        patientName: 'Trần Văn C',
        date: '2024-04-25',
        time: '10:30',
        symptoms: 'Ho, đau họng',
        status: 'confirmed'
    }
];

// Hiển thị danh sách cuộc hẹn
function displayAppointments(appointments) {
    const appointmentList = document.getElementById('appointment-list');
    appointmentList.innerHTML = '';

    appointments.forEach(appointment => {
        const appointmentItem = document.createElement('div');
        appointmentItem.className = 'appointment-item';
        appointmentItem.innerHTML = `
            <div class="appointment-info">
                <h3>${appointment.patientName}</h3>
                <p><strong>Ngày:</strong> ${appointment.date}</p>
                <p><strong>Giờ:</strong> ${appointment.time}</p>
                <p><strong>Triệu chứng:</strong> ${appointment.symptoms}</p>
                <p><strong>Trạng thái:</strong> ${getStatusText(appointment.status)}</p>
            </div>
            <div class="appointment-status">
                ${appointment.status === 'pending' ? `
                    <button class="status-btn accept-btn" onclick="updateAppointmentStatus(${appointment.id}, 'confirmed')">Chấp nhận</button>
                    <button class="status-btn reject-btn" onclick="updateAppointmentStatus(${appointment.id}, 'cancelled')">Từ chối</button>
                ` : ''}
            </div>
        `;
        appointmentList.appendChild(appointmentItem);
    });
}

// Cập nhật trạng thái cuộc hẹn
function updateAppointmentStatus(appointmentId, newStatus) {
    // Trong thực tế, sẽ gọi API để cập nhật trạng thái
    const appointment = sampleAppointments.find(a => a.id === appointmentId);
    if (appointment) {
        appointment.status = newStatus;
        displayAppointments(sampleAppointments);
    }
}

// Lọc cuộc hẹn theo trạng thái và ngày
function filterAppointments() {
    const statusFilter = document.getElementById('appointment-status').value;
    const dateFilter = document.getElementById('appointment-date').value;

    let filteredAppointments = sampleAppointments;

    if (statusFilter !== 'all') {
        filteredAppointments = filteredAppointments.filter(a => a.status === statusFilter);
    }

    if (dateFilter) {
        filteredAppointments = filteredAppointments.filter(a => a.date === dateFilter);
    }

    displayAppointments(filteredAppointments);
}

// Chuyển đổi mã trạng thái thành văn bản
function getStatusText(status) {
    const statusMap = {
        'pending': 'Chờ xác nhận',
        'confirmed': 'Đã xác nhận',
        'completed': 'Đã hoàn thành',
        'cancelled': 'Đã hủy'
    };
    return statusMap[status] || status;
}

// Cập nhật thông tin cá nhân
function updateProfile() {
    const name = document.getElementById('doctor-name').textContent;
    const specialty = document.getElementById('doctor-specialty').textContent;
    const email = document.getElementById('doctor-email').textContent;
    const phone = document.getElementById('doctor-phone').textContent;

    // Trong thực tế, sẽ gọi API để cập nhật thông tin
    console.log('Cập nhật thông tin:', { name, specialty, email, phone });
}

// Thêm event listeners khi DOM đã load
document.addEventListener('DOMContentLoaded', () => {
    // Hiển thị danh sách cuộc hẹn ban đầu
    displayAppointments(sampleAppointments);

    // Thêm event listeners cho các bộ lọc
    document.getElementById('appointment-status').addEventListener('change', filterAppointments);
    document.getElementById('appointment-date').addEventListener('change', filterAppointments);

    // Thêm event listener cho nút chỉnh sửa thông tin
    document.querySelector('.edit-profile-btn').addEventListener('click', () => {
        // Trong thực tế, sẽ hiển thị form chỉnh sửa
        console.log('Mở form chỉnh sửa thông tin');
    });
});
