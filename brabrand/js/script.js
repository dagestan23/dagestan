// Basic car data (can be expanded later)
const cars = [
    {
        make: 'Volkswagen',
        model: 'Golf',
        year: 2018,
        price: 120000,
        mileage: 45000,
        fuelType: 'Diesel',
        transmission: 'Manual',
        image: 'https://media.drive.com.au/obj/tx_q:50,rs:auto:1920:1080:1/driveau/upload/cms/uploads/CM0oduuxSmekOWaZp6d7'
    },
    {
        make: 'Toyota',
        model: 'Corolla',
        year: 2020,
        price: 150000,
        mileage: 20000,
        fuelType: 'Hybrid',
        transmission: 'Automatic',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Toyota_Corolla_Style_%282016_European_version%29.jpg/2560px-Toyota_Corolla_Style_%282016_European_version%29.jpg'
    },
    {
        make: 'BMW',
        model: '320i',
        year: 2019,
        price: 250000,
        mileage: 35000,
        fuelType: 'Petrol',
        transmission: 'Automatic',
        image: 'https://www.bmw.dk/content/dam/bmw/common/all-models/3-series/sedan/2022/navigation/bmw-3-series-sedan-lci-modelfinder.png'
    },
    {
        make: 'Audi',
        model: 'A4',
        year: 2017,
        price: 180000,
        mileage: 60000,
        fuelType: 'Diesel',
        transmission: 'Automatic',
        image: 'https://cimg2.ibsrv.net/ibimg/hgm/1920x1080-1/100/528/2017-audi-a4_100528662.jpg'
    },
    {
        make: 'Ford',
        model: 'Focus',
        year: 2021,
        price: 140000,
        mileage: 15000,
        fuelType: 'Petrol',
        transmission: 'Manual',
        image: 'https://images8.alphacoders.com/936/thumb-1920-936247.jpg'
    },
    {
        make: 'Volvo',
        model: 'XC60',
        year: 2020,
        price: 300000,
        mileage: 25000,
        fuelType: 'Diesel',
        transmission: 'Automatic',
        image: 'https://www.x-leasing.dk/images/g/b9sAAOSwUepftTzP/s-l1600.jpg'
    },
    {
        make: 'Tesla',
        model: 'Model 3',
        year: 2022,
        price: 350000,
        mileage: 10000,
        fuelType: 'Electric',
        transmission: 'Automatic',
        category: 'Electric',
        image: 'https://wallpapercat.com/w/full/4/1/5/1658868-1920x1080-desktop-full-hd-tesla-model-3-background-image.jpg'
    },
    {
        make: 'Porsche',
        model: '911 Carrera',
        year: 2021,
        price: 850000,
        mileage: 15000,
        fuelType: 'Petrol',
        transmission: 'Automatic',
        category: 'Sports',
        image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80'
    },
    {
        make: 'Volvo',
        model: 'XC90',
        year: 2020,
        price: 400000,
        mileage: 30000,
        fuelType: 'Hybrid',
        transmission: 'Automatic',
        category: 'SUV',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU-ZRLkwtgpo7912FF5RLfgkYfNFGoDcIVUg&s'
    },
    {
        make: 'Mercedes-Benz',
        model: 'E-Class',
        year: 2019,
        price: 300000,
        mileage: 40000,
        fuelType: 'Diesel',
        transmission: 'Automatic',
        category: 'Luxury',
        image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80'
    }
];

// Function to display cars (to be implemented)
function displayCars() {
    const container = document.getElementById('carContainer');
    container.innerHTML = '';
    cars.forEach(car => {
        container.appendChild(createCarCard(car));
    });
}

function populateFilters() {
    const makes = [...new Set(cars.map(car => car.make))];
    const categories = [...new Set(cars.map(car => car.category))];
    const makeFilter = document.getElementById('makeFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    
    makes.forEach(make => {
        const option = document.createElement('option');
        option.value = make;
        option.textContent = make;
        makeFilter.appendChild(option);
    });

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

function filterCars() {
    const make = document.getElementById('makeFilter').value;
    const category = document.getElementById('categoryFilter').value;
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;
    
    const filteredCars = cars.filter(car => {
        return (!make || car.make === make) &&
               (!category || car.category === category) &&
               (!minPrice || car.price >= minPrice) &&
               (!maxPrice || car.price <= maxPrice);
    });
    
    const container = document.getElementById('carContainer');
    container.innerHTML = '';
    filteredCars.forEach(car => {
        const carCard = document.createElement('div');
        carCard.className = 'car-card';
        carCard.innerHTML = `
            <img src="${car.image}" alt="${car.make} ${car.model}">
            <div class="car-info">
                <h3>${car.make} ${car.model}</h3>
                <p>Year: ${car.year}</p>
                <p class="price">${car.price.toLocaleString()} DKK</p>
            </div>
        `;
        container.appendChild(carCard);
    });
}

function setupFilters() {
    document.getElementById('makeFilter').addEventListener('change', filterCars);
    document.getElementById('categoryFilter').addEventListener('change', filterCars);
    document.getElementById('minPrice').addEventListener('input', filterCars);
    document.getElementById('maxPrice').addEventListener('input', filterCars);
}

function createCarCard(car) {
    const carCard = document.createElement('div');
    carCard.className = 'car-card';
    carCard.innerHTML = `
        <img src="${car.image}" alt="${car.make} ${car.model}">
        <div class="car-info">
            <h3>${car.make} ${car.model}</h3>
            <p>Year: ${car.year}</p>
            <p class="price">${car.price.toLocaleString()} DKK</p>
        </div>
    `;
    
    carCard.addEventListener('click', () => showCarDetails(car));
    return carCard;
}

function showCarDetails(car) {
    const modal = document.createElement('div');
    modal.className = 'car-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="modal-grid">
                <div class="modal-image">
                    <img src="${car.image}" alt="${car.make} ${car.model}">
                </div>
                <div class="modal-info">
                    <h2>${car.make} ${car.model}</h2>
                    <div class="specs-grid">
                        <div class="spec-item">
                            <span class="spec-label">Year:</span>
                            <span class="spec-value">${car.year}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Price:</span>
                            <span class="spec-value price">${car.price.toLocaleString()} DKK</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Mileage:</span>
                            <span class="spec-value">${car.mileage || 'N/A'} km</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Fuel Type:</span>
                            <span class="spec-value">${car.fuelType || 'N/A'}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Transmission:</span>
                            <span class="spec-value">${car.transmission || 'N/A'}</span>
                        </div>
                    </div>
                    <button class="contact-btn" onclick="showContactConfirmation('${car.make}', '${car.model}')">Contact Seller</button>
                </div>
            </div>
        </div>
    `;

    // Close modal functionality
    modal.querySelector('.close-modal').addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });

    document.body.appendChild(modal);
}

let currentUser = null;

function showLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.style.display = 'flex';
    
    // Add click outside to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModals();
        }
    });
}

function showRegisterModal() {
    const modal = document.getElementById('registerModal');
    modal.style.display = 'flex';
    
    // Add click outside to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModals();
        }
    });
}

function closeModals() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('registerModal').style.display = 'none';
}

document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    // Here you would typically make an API call to verify credentials
    currentUser = { email, name: "John Doe", city: "Copenhagen" }; // Mock user
    closeModals();
});

document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const city = document.getElementById('registerCity').value;

    // Here you would typically make an API call to register the user
    currentUser = { email, name, city };
    closeModals();
});

document.querySelectorAll('.close-login, .close-register').forEach(btn => {
    btn.addEventListener('click', closeModals);
});

document.getElementById('showRegister').addEventListener('click', (e) => {
    e.preventDefault();
    closeModals();
    showRegisterModal();
});

function showContactConfirmation(make, model) {
    if (!currentUser) {
        showLoginModal();
        return;
    }

    const confirmation = document.createElement('div');
    confirmation.className = 'confirmation-modal';
    confirmation.innerHTML = `
        <div class="confirmation-content">
            <h3>Contact Seller</h3>
            <p>You're contacting the seller of ${make} ${model}</p>
            <div class="message-form">
                <textarea id="messageInput" placeholder="Write your message to the seller..." rows="4"></textarea>
                <p>Your contact info: ${currentUser.name} (${currentUser.city})</p>
                <button class="confirmation-send-btn">Send Message</button>
                <button class="confirmation-cancel-btn">Cancel</button>
            </div>
        </div>
    `;

    confirmation.querySelector('.confirmation-send-btn').addEventListener('click', () => {
        const message = confirmation.querySelector('#messageInput').value;
        if (message.trim()) {
            // Here you would typically send the message to the server
            alert(`Message sent to seller!\n\nMessage: ${message}`);
            document.body.removeChild(confirmation);
        } else {
            alert('Please write a message before sending.');
        }
    });

    confirmation.querySelector('.confirmation-cancel-btn').addEventListener('click', () => {
        document.body.removeChild(confirmation);
    });

    document.body.appendChild(confirmation);
}

document.getElementById('loginButton').addEventListener('click', showLoginModal);
document.getElementById('signupButton').addEventListener('click', showRegisterModal);

function setActiveMenu() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const menuLinks = document.querySelectorAll('.main-menu a');
    
    menuLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    displayCars();
    populateFilters();
    setupFilters();
    setActiveMenu();
});
