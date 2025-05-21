// /home/ubuntu/frontend_project/codeee/New folder (2)/assets/js/main.js

const BASE_API_URL = '/maintenance_project/public'; // User needs to configure this if backend is elsewhere or not using URL rewrite

document.addEventListener('DOMContentLoaded', () => {
    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const userTypeSelect = document.getElementById('userType');
            const userType = userTypeSelect ? userTypeSelect.value : 'user';

            let loginEndpoint = `${BASE_API_URL}/users/login`;
            if (userType === 'technician') {
                loginEndpoint = `${BASE_API_URL}/technicians/login`;
            }

            try {
                const response = await fetch(loginEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                const result = await response.json();

                if (result.success && result.token) {
                    localStorage.setItem('authToken', result.token);
                    localStorage.setItem('userData', JSON.stringify(result.user || result.technician));
                    localStorage.setItem('userRole', userType);
                    
                    alert('Login successful!');
                    window.location.href = 'profile.html'; 
                } else {
                    alert('Login failed: ' + (result.message || 'Unknown error'));
                }
            } catch (error) {
                console.error('Login error:', error);
                alert('An error occurred during login. Please try again.');
            }
        });
    }

    // Handle registration form submission
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const phone = document.getElementById('registerPhone').value;
            const role = document.getElementById('registerRole').value;

            let registerEndpoint = `${BASE_API_URL}/users/register`;
            const payload = { name, email, password, phone, role };

            if (role === 'technician') {
                registerEndpoint = `${BASE_API_URL}/technicians/register`;
                payload.service_category_id = document.getElementById('registerServiceCategory') ? document.getElementById('registerServiceCategory').value : null;
                payload.bio = document.getElementById('registerBio') ? document.getElementById('registerBio').value : '';
            }

            try {
                const response = await fetch(registerEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });
                const result = await response.json();
                if (result.success) {
                    alert('Registration successful! Please login.');
                    window.location.href = 'login.html';
                } else {
                    let errorMessage = 'Registration failed: ';
                    if (result.errors) {
                        for (const key in result.errors) {
                            if (result.errors[key]) {
                                errorMessage += `${result.errors[key]} `;
                            }
                        }
                    } else {
                        errorMessage += result.message || 'Unknown error';
                    }
                    alert(errorMessage);
                }
            } catch (error) {
                console.error('Registration error:', error);
                alert('An error occurred during registration. Please try again.');
            }
        });
    }
    
    updateNavBasedOnLogin();

    // Auto-redirect if trying to access protected page without login
    const protectedPages = ['profile.html']; // Add other protected pages
    const currentPage = window.location.pathname.split('/').pop();
    if (protectedPages.includes(currentPage) && !isLoggedIn()) {
        alert('You need to login to access this page.');
        window.location.href = 'login.html';
    }
});

function isLoggedIn() {
    return !!localStorage.getItem('authToken');
}

function getUserData() {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
}

function getUserRole() {
    return localStorage.getItem('userRole');
}

function logoutUser() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('userRole');
    alert('You have been logged out.');
    updateNavBasedOnLogin();
    if (window.location.pathname.split('/').pop() !== 'index.html' && window.location.pathname !== '/') {
         window.location.href = 'index.html';
    }
}

function updateNavBasedOnLogin() {
    const loginLink = document.querySelector('ul.navbar-nav a[href="login.html"]'); 
    const mainNavUl = document.querySelector('ul.navbar-nav');

    // Remove existing logout button before potentially re-adding
    const existingLogoutButtonLi = document.getElementById('logoutButtonLi');
    if (existingLogoutButtonLi) {
        existingLogoutButtonLi.remove();
    }

    if (isLoggedIn()) {
        if (loginLink) {
            loginLink.textContent = 'الملف الشخصي';
            loginLink.href = 'profile.html';
        }
        if (mainNavUl) {
            const logoutLi = document.createElement('li');
            logoutLi.className = 'nav-item';
            logoutLi.id = 'logoutButtonLi';
            const logoutBtn = document.createElement('button');
            logoutBtn.className = 'nav-link btn btn-link';
            logoutBtn.textContent = 'تسجيل الخروج';
            logoutBtn.style.cursor = 'pointer';
            logoutBtn.addEventListener('click', logoutUser);
            logoutLi.appendChild(logoutBtn);
            mainNavUl.appendChild(logoutLi);
        }
    } else {
        if (loginLink) {
            loginLink.textContent = 'التسجيل'; 
            loginLink.href = 'login.html';
        }
    }
}

async function fetchServiceCategories() {
    try {
        const response = await fetch(`${BASE_API_URL}/servicecategories/getAll`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        if (result.success && result.categories) return result.categories;
        console.error('Failed to fetch service categories:', result.message);
        return [];
    } catch (error) {
        console.error('Error fetching service categories:', error);
        return [];
    }
}

async function displayServiceCategories() {
    const categoriesContainer = document.getElementById('serviceCategoriesContainer');
    if (!categoriesContainer) return;

    const categories = await fetchServiceCategories();
    categoriesContainer.innerHTML = ''; 
    if (categories.length === 0) {
        categoriesContainer.innerHTML = '<p>No service categories available.</p>';
        return;
    }
    const row = document.createElement('div');
    row.className = 'row g-2';
    categories.forEach(category => {
        const colLink = document.createElement('a');
        colLink.href = `technicians_by_category.html?category_id=${category.id}&category_name=${encodeURIComponent(category.name)}`;
        colLink.className = 'col-6 col-md-4 col-lg-3 border text-decoration-none text-dark'; // Adjusted width classes
        const divP3 = document.createElement('div');
        divP3.className = 'p-3 text-center';
        const img = document.createElement('img');
        img.src = category.icon_url || 'assets/img/handyman_24dp_5D0E07_FILL0_wght100_GRAD200_opsz24.svg'; 
        img.className = 'my-3'; // Adjusted margin
        img.style.width = '40px';
        img.style.height = '40px';
        img.alt = category.name;
        const p = document.createElement('p');
        p.textContent = category.name;
        divP3.appendChild(img);
        divP3.appendChild(p);
        colLink.appendChild(divP3);
        row.appendChild(colLink);
    });
    categoriesContainer.appendChild(row);
}

if (window.location.pathname.includes('servses.html')) {
    document.addEventListener('DOMContentLoaded', displayServiceCategories);
}

async function fetchUserProfile() {
    const userData = getUserData();
    const userRole = getUserRole();
    if (!userData || !isLoggedIn()) {
        // This redirect is handled by the general check in DOMContentLoaded
        return;
    }
    
    document.getElementById('profileName').textContent = userData.name || 'N/A';
    document.getElementById('profileEmail').textContent = userData.email || 'N/A';
    document.getElementById('profilePhone').textContent = userData.phone || 'N/A';
    document.getElementById('profileRole').textContent = userRole ? (userRole.charAt(0).toUpperCase() + userRole.slice(1)) : 'N/A';
    
    if (userRole === 'technician') {
        document.getElementById('technicianSpecificInfo').style.display = 'block';
        document.getElementById('profileServiceCategory').textContent = userData.service_category_name || 'N/A'; // Assuming service_category_name is sent from backend
        document.getElementById('profileBio').textContent = userData.bio || 'N/A';
    } else {
        document.getElementById('technicianSpecificInfo').style.display = 'none';
    }
}

if (window.location.pathname.includes('profile.html')) {
    document.addEventListener('DOMContentLoaded', fetchUserProfile);
}

