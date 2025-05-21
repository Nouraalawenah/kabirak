// /home/ubuntu/frontend_project/app/assets/js/main.js

const BASE_API_URL = 
// /home/ubuntu/frontend_project/app/assets/js/main.js

const BASE_API_URL = 
'/maintenance_project/public
'; // User needs to configure this if backend is elsewhere or not using URL rewrite

// --- Global Functions for Form Toggling and UI Updates ---
window.showRegistrationForm = function() {
    const loginFormContainer = document.getElementById(
'loginFormContainer
');
    const registrationFormContainer = document.getElementById(
'registrationFormContainer
');
    if (loginFormContainer) loginFormContainer.style.display = 
'none
';
    if (registrationFormContainer) registrationFormContainer.style.display = 
'block
';
    if (typeof window.populateServiceCategoriesForRegistration === 
'function
') {
        window.populateServiceCategoriesForRegistration();
    }
};

window.showLoginForm = function() {
    const loginFormContainer = document.getElementById(
'loginFormContainer
');
    const registrationFormContainer = document.getElementById(
'registrationFormContainer
');
    if (registrationFormContainer) registrationFormContainer.style.display = 
'none
';
    if (loginFormContainer) loginFormContainer.style.display = 
'block
';
};

window.toggleTechnicianFields = function() {
    const registerRoleSelect = document.getElementById(
'registerRole
');
    const technicianFieldsDiv = document.getElementById(
'technicianFields
');
    if (registerRoleSelect && technicianFieldsDiv) {
        if (registerRoleSelect.value === 
'technician
') {
            technicianFieldsDiv.style.display = 
'block
';
        } else {
            technicianFieldsDiv.style.display = 
'none
';
        }
    }
};

window.populateServiceCategoriesForRegistration = async function() {
    const selectElement = document.getElementById(
'registerServiceCategory
');
    if (!selectElement) return;
    // Avoid re-populating if already done, unless it only has the placeholder
    if (selectElement.options.length > 1 && selectElement.options[0].value !== "") return; 
    
    const categories = await fetchServiceCategories(); // Assumes fetchServiceCategories is defined below
    selectElement.innerHTML = 
'<option value="" disabled selected>اختر فئة الخدمة</option>
'; // Placeholder
    if (categories && categories.length > 0) {
        categories.forEach(category => {
            const option = document.createElement(
'option
');
            option.value = category.id;
            option.textContent = category.name;
            selectElement.appendChild(option);
        });
    }
};

// --- Event Listeners and Page Specific Logic ---
document.addEventListener(
'DOMContentLoaded
', () => {
    // Handle login form submission
    const loginForm = document.getElementById(
'loginForm
');
    if (loginForm) {
        loginForm.addEventListener(
'submit
', async (event) => {
            event.preventDefault();
            const emailInput = document.getElementById(
'email
');
            const passwordInput = document.getElementById(
'password
');
            const userTypeSelect = document.getElementById(
'userType
');
            
            const email = emailInput ? emailInput.value : 
''
;
            const password = passwordInput ? passwordInput.value : 
''
;
            const userType = userTypeSelect ? userTypeSelect.value : 
'user
';

            let loginEndpoint = `${BASE_API_URL}/users/login`;
            if (userType === 
'technician
') {
                loginEndpoint = `${BASE_API_URL}/technicians/login`;
            }

            try {
                const response = await fetch(loginEndpoint, {
                    method: 
'POST
',
                    headers: {
                        
'Content-Type
': 
'application/json
',
                    },
                    body: JSON.stringify({ email, password }),
                });

                const result = await response.json();

                if (result.success && result.token) {
                    localStorage.setItem(
'authToken
', result.token);
                    localStorage.setItem(
'userData
', JSON.stringify(result.user || result.technician));
                    localStorage.setItem(
'userRole
', userType);
                    
                    alert(
'Login successful!
');
                    window.location.href = 
'profile.html
'; 
                } else {
                    alert(
'Login failed: 
' + (result.message || 
'Unknown error
'));
                }
            } catch (error) {
                console.error(
'Login error:
', error);
                alert(
'An error occurred during login. Please try again.
');
            }
        });
    }

    // Handle registration form submission
    const registrationForm = document.getElementById(
'registrationForm
');
    if (registrationForm) {
        registrationForm.addEventListener(
'submit
', async (event) => {
            event.preventDefault();
            const nameInput = document.getElementById(
'registerName
');
            const emailInput = document.getElementById(
'registerEmail
');
            const passwordInput = document.getElementById(
'registerPassword
');
            const phoneInput = document.getElementById(
'registerPhone
');
            const roleSelect = document.getElementById(
'registerRole
');

            const name = nameInput ? nameInput.value : 
''
;
            const email = emailInput ? emailInput.value : 
''
;
            const password = passwordInput ? passwordInput.value : 
''
;
            const phone = phoneInput ? phoneInput.value : 
''
;
            const role = roleSelect ? roleSelect.value : 
'user
';

            let registerEndpoint = `${BASE_API_URL}/users/register`;
            const payload = { name, email, password, phone, role };

            if (role === 
'technician
') {
                registerEndpoint = `${BASE_API_URL}/technicians/register`;
                const serviceCategorySelect = document.getElementById(
'registerServiceCategory
');
                const bioTextarea = document.getElementById(
'registerBio
');
                payload.service_category_id = serviceCategorySelect ? serviceCategorySelect.value : null;
                payload.bio = bioTextarea ? bioTextarea.value : 
''
;
            }

            try {
                const response = await fetch(registerEndpoint, {
                    method: 
'POST
',
                    headers: {
                        
'Content-Type
': 
'application/json
',
                    },
                    body: JSON.stringify(payload),
                });
                const result = await response.json();
                if (result.success) {
                    alert(
'Registration successful! Please login.
');
                    if (typeof window.showLoginForm === 
'function
') {
                        window.showLoginForm();
                    } else {
                        const regContainer = document.getElementById(
'registrationFormContainer
');
                        const loginContainer = document.getElementById(
'loginFormContainer
');
                        if(regContainer) regContainer.style.display = 
'none
';
                        if(loginContainer) loginContainer.style.display = 
'block
';
                    }
                } else {
                    let errorMessage = 
'Registration failed: 
';
                    if (result.errors) {
                        for (const key in result.errors) {
                            if (result.errors[key]) {
                                errorMessage += `${result.errors[key]} `;
                            }
                        }
                    } else {
                        errorMessage += result.message || 
'Unknown error
';
                    }
                    alert(errorMessage);
                }
            } catch (error) {
                console.error(
'Registration error:
', error);
                alert(
'An error occurred during registration. Please try again.
');
            }
        });
    }
    
    updateNavBasedOnLogin();

    const protectedPages = [
'profile.html
'];
    const currentPage = window.location.pathname.split(
'/
').pop();
    if (protectedPages.includes(currentPage) && !isLoggedIn()) {
        alert(
'You need to login to access this page.
');
        window.location.href = 
'login.html
';
    }

    // Attach event listeners for form toggling buttons if they are on the page
    const showRegButton = Array.from(document.querySelectorAll(
'button
')).find(btn => btn.textContent.includes(
'إنشاء حساب جديد
'));
    if (showRegButton) {
        showRegButton.addEventListener(
'click
', (e) => {
            e.preventDefault(); 
            if(typeof window.showRegistrationForm === 
'function
') window.showRegistrationForm();
        });
    }

    const showLoginButton = Array.from(document.querySelectorAll(
'button
')).find(btn => btn.textContent.includes(
'تسجيل الدخول
') && btn.closest(
'#registrationFormContainer
'));
    if (showLoginButton) {
        showLoginButton.addEventListener(
'click
', (e) => {
            e.preventDefault();
            if(typeof window.showLoginForm === 
'function
') window.showLoginForm();
        });
    }
    
    const registerRoleSelect = document.getElementById(
'registerRole
');
    if(registerRoleSelect){
        registerRoleSelect.addEventListener(
'change
', window.toggleTechnicianFields);
        window.toggleTechnicianFields(); // Initialize visibility based on current selection
    }

    // If on login page, ensure login form is visible by default
    if(window.location.pathname.includes(
'login.html
')){
        const loginContainer = document.getElementById(
'loginFormContainer
');
        const regContainer = document.getElementById(
'registrationFormContainer
');
        if(loginContainer && regContainer && regContainer.style.display !== 
'block
'){
            loginContainer.style.display = 
'block
';
            regContainer.style.display = 
'none
';
        }
    }

    // Page specific initializations
    if (window.location.pathname.includes(
'servses.html
')) {
        displayServiceCategories();
    }
    if (window.location.pathname.includes(
'profile.html
')) {
        fetchUserProfile();
    }
});

// --- Helper Functions (Authentication, User Data) ---
function isLoggedIn() {
    return !!localStorage.getItem(
'authToken
');
}

function getUserData() {
    const userData = localStorage.getItem(
'userData
');
    return userData ? JSON.parse(userData) : null;
}

function getUserRole() {
    return localStorage.getItem(
'userRole
');
}

function logoutUser() {
    localStorage.removeItem(
'authToken
');
    localStorage.removeItem(
'userData
');
    localStorage.removeItem(
'userRole
');
    alert(
'You have been logged out.
');
    updateNavBasedOnLogin();
    if (window.location.pathname.split(
'/
').pop() !== 
'index.html
' && window.location.pathname !== 
'/
') {
         window.location.href = 
'index.html
';
    }
}

function updateNavBasedOnLogin() {
    const loginLink = document.querySelector(
'ul.navbar-nav a[href="login.html"]
'); 
    const mainNavUl = document.querySelector(
'ul.navbar-nav
');

    const existingLogoutButtonLi = document.getElementById(
'logoutButtonLi
');
    if (existingLogoutButtonLi) {
        existingLogoutButtonLi.remove();
    }

    if (isLoggedIn()) {
        if (loginLink) {
            loginLink.textContent = 
'الملف الشخصي
';
            loginLink.href = 
'profile.html
';
        }
        if (mainNavUl) {
            const logoutLi = document.createElement(
'li
');
            logoutLi.className = 
'nav-item
';
            logoutLi.id = 
'logoutButtonLi
';
            const logoutBtn = document.createElement(
'button
');
            logoutBtn.className = 
'nav-link btn btn-link
';
            logoutBtn.textContent = 
'تسجيل الخروج
';
            logoutBtn.style.cursor = 
'pointer
';
            logoutBtn.addEventListener(
'click
', logoutUser);
            logoutLi.appendChild(logoutBtn);
            mainNavUl.appendChild(logoutLi);
        }
    } else {
        if (loginLink) {
            loginLink.textContent = 
'التسجيل
'; 
            loginLink.href = 
'login.html
';
        }
    }
}

// --- API Fetching Functions ---
async function fetchServiceCategories() {
    try {
        const response = await fetch(`${BASE_API_URL}/servicecategories/getAll`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        if (result.success && result.categories) return result.categories;
        console.error(
'Failed to fetch service categories:
', result.message);
        return [];
    } catch (error) {
        console.error(
'Error fetching service categories:
', error);
        return [];
    }
}

// --- Page Specific Display Functions ---
async function displayServiceCategories() {
    const categoriesContainer = document.getElementById(
'serviceCategoriesContainer
');
    if (!categoriesContainer) return;

    const categories = await fetchServiceCategories();
    categoriesContainer.innerHTML = 
''
; 
    if (!categories || categories.length === 0) {
        categoriesContainer.innerHTML = 
'<p>No service categories available.</p>
';
        return;
    }
    const row = document.createElement(
'div
');
    row.className = 
'row g-2
';
    categories.forEach(category => {
        const colLink = document.createElement(
'a
');
        colLink.href = `technicians_by_category.html?category_id=${category.id}&category_name=${encodeURIComponent(category.name)}`;
        colLink.className = 
'col-6 col-md-4 col-lg-3 border text-decoration-none text-dark
';
        const divP3 = document.createElement(
'div
');
        divP3.className = 
'p-3 text-center
';
        const img = document.createElement(
'img
');
        img.src = category.icon_url || 
'assets/img/handyman_24dp_5D0E07_FILL0_wght100_GRAD200_opsz24.svg
'; 
        img.className = 
'my-3
';
        img.style.width = 
'40px
';
        img.style.height = 
'40px
';
        img.alt = category.name;
        const p = document.createElement(
'p
');
        p.textContent = category.name;
        divP3.appendChild(img);
        divP3.appendChild(p);
        colLink.appendChild(divP3);
        row.appendChild(colLink);
    });
    categoriesContainer.appendChild(row);
}

async function fetchUserProfile() {
    const userData = getUserData();
    const userRole = getUserRole();
    if (!userData || !isLoggedIn()) {
        return;
    }
    
    const profileNameEl = document.getElementById(
'profileName
');
    const profileEmailEl = document.getElementById(
'profileEmail
');
    const profilePhoneEl = document.getElementById(
'profilePhone
');
    const profileRoleEl = document.getElementById(
'profileRole
');
    const technicianSpecificInfoEl = document.getElementById(
'technicianSpecificInfo
');
    const profileServiceCategoryEl = document.getElementById(
'profileServiceCategory
');
    const profileBioEl = document.getElementById(
'profileBio
');

    if(profileNameEl) profileNameEl.textContent = userData.name || 
'N/A
';
    if(profileEmailEl) profileEmailEl.textContent = userData.email || 
'N/A
';
    if(profilePhoneEl) profilePhoneEl.textContent = userData.phone || 
'N/A
';
    if(profileRoleEl) profileRoleEl.textContent = userRole ? (userRole.charAt(0).toUpperCase() + userRole.slice(1)) : 
'N/A
';
    
    if (userRole === 
'technician
' && technicianSpecificInfoEl) {
        technicianSpecificInfoEl.style.display = 
'block
';
        if(profileServiceCategoryEl) profileServiceCategoryEl.textContent = userData.service_category_name || 
'N/A
';
        if(profileBioEl) profileBioEl.textContent = userData.bio || 
'N/A
';
    } else if (technicianSpecificInfoEl) {
        technicianSpecificInfoEl.style.display = 
'none
';
    }
}

