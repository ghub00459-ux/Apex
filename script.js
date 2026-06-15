const imageInput = document.getElementById('imageInput');
const galleryGrid = document.getElementById('galleryGrid');
const imageModal = document.getElementById('imageModal');
const fullImage = document.getElementById('fullImage');
const closeBtn = document.querySelector('.close-btn');
const deleteBtn = document.getElementById('deleteBtn');

let savedImages = JSON.parse(localStorage.getItem('myGallery')) || [];
let currentOpenIndex = null;

// Încarcă pozele salvate când se deschide pagina
function displayImages() {
    galleryGrid.innerHTML = '';
    savedImages.forEach((base64String, index) => {
        const img = document.createElement('img');
        img.src = base64String;
        img.classList.add('gallery-item');
        img.addEventListener('click', () => openModal(index));
        galleryGrid.appendChild(img);
    });
}

// Ascultă când utilizatorul alege o poză nouă
imageInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            savedImages.push(e.target.result);
            localStorage.setItem('myGallery', JSON.stringify(savedImages));
            displayImages();
        }
        reader.readAsDataURL(file);
    }
});

// Deschide poza mare
function openModal(index) {
    currentOpenIndex = index;
    fullImage.src = savedImages[index];
    imageModal.style.display = 'flex';
}

// Închide poza mare
closeBtn.addEventListener('click', () => {
    imageModal.style.display = 'none';
});

// Șterge poza curentă
deleteBtn.addEventListener('click', () => {
    if (currentOpenIndex !== null) {
        savedImages.splice(currentOpenIndex, 1);
        localStorage.setItem('myGallery', JSON.stringify(savedImages));
        displayImages();
        imageModal.style.display = 'none';
        currentOpenIndex = null;
    }
});

// Închide dacă dai click în afara pozei
imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) {
        imageModal.style.display = 'none';
    }
});

// Afișează pozele inițiale la pornire
displayImages();
