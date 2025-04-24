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

function updateSpecialtySuggestions() {
    const symptomInput = document.getElementById('symptom-input');
    const suggestionsContainer = document.getElementById('specialty-suggestions');
    
    if (!symptomInput || !suggestionsContainer) return;

    const symptom = symptomInput.value;
    const matchingSpecialties = findSpecialtyBySymptom(symptom);

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
            });
            suggestionsList.appendChild(listItem);
        });
        
        suggestionsContainer.appendChild(suggestionsList);
    }
}

// Thêm event listener khi DOM đã load
document.addEventListener('DOMContentLoaded', () => {
    const symptomInput = document.getElementById('symptom-input');
    if (symptomInput) {
        symptomInput.addEventListener('input', updateSpecialtySuggestions);
    }
}); 