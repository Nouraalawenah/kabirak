import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css'; // We will create this CSS file later

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    // Basic validation (more robust validation needed in a real app)
    if (!email || !password) {
      setError('الرجاء إدخال البريد الإلكتروني وكلمة المرور.');
      return;
    }
    // Placeholder for login logic
    console.log('Login attempt with:', { email, password });
    // Simulate successful login for now and navigate to profile
    // In a real app, you would call an auth service here
    // For now, let's assume login is successful and redirect to user profile or home
    alert('تم تسجيل الدخول بنجاح (محاكاة)! سيتم توجيهك الآن.');
    // Replace with actual user data and token handling upon successful API response
    // For example, store token in localStorage and update auth context
    navigate('/profile'); // Or to '/' or a dashboard page
  };

  return (
    <div className="login-page-container">
      <div className="container py-5">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb bg-light p-3 rounded">
            <li className="breadcrumb-item"><Link to="/">الرئيسية</Link></li>
            <li className="breadcrumb-item active" aria-current="page">تسجيل الدخول</li>
          </ol>
        </nav>

        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card login-card shadow-lg">
              {/* Optional: Add an image or a more prominent header if desired */}
              {/* <img src="/assets/img/OPI(9).webp" class="card-img-top login-card-img" alt="Login background" /> */}
              <div className="card-body p-4 p-md-5">
                <h2 className="card-title text-center mb-4 form-header">تسجيل الدخول</h2>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <form onSubmit={handleSubmit} noValidate>
                  <div className="field-group mb-4">
                    <input 
                      type="email" 
                      className={`form-input form-control ${error && !email ? 'is-invalid' : ''}`} 
                      id="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                      autoComplete="email"
                    />
                    <label htmlFor="email">البريد الإلكتروني</label>
                    {error && !email && <div className="invalid-feedback">البريد الإلكتروني مطلوب.</div>}
                  </div>

                  <div className="field-group mb-4">
                    <input 
                      type="password" 
                      className={`form-input form-control ${error && !password ? 'is-invalid' : ''}`} 
                      id="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required 
                      autoComplete="current-password"
                    />
                    <label htmlFor="password">كلمة المرور</label>
                    {error && !password && <div className="invalid-feedback">كلمة المرور مطلوبة.</div>}
                  </div>
                  
                  {/* Optional: Add remember me or forgot password links */}
                  {/* <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="rememberMe" />
                      <label className="form-check-label" htmlFor="rememberMe">تذكرني</label>
                    </div>
                    <a href="#!" className="text-muted"><small>هل نسيت كلمة المرور؟</small></a>
                  </div> */}

                  <div className="field-group">
                    <button type="submit" className="submit-button btn btn-primary w-100">تسجيل الدخول</button>
                  </div>
                </form>

                <div className="login-redirect text-center mt-4">
                  <p className="mb-0 text-muted">
                    ليس لديك حساب؟ <Link to="/signup" className="fw-bold">إنشاء حساب جديد</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

