import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignupPage.css'; // We will create this CSS file later

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name || !email || !password || !confirmPassword) {
      setError('الرجاء ملء جميع الحقول.');
      return;
    }
    if (password !== confirmPassword) {
      setError('كلمتا المرور غير متطابقتين.');
      return;
    }
    if (password.length < 6) {
      setError('يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.');
      return;
    }

    // Placeholder for signup logic
    console.log('Signup attempt with:', { name, email, password });
    // Simulate successful signup
    // In a real app, you would call an auth service here
    setSuccess('تم إنشاء الحساب بنجاح! سيتم توجيهك لتسجيل الدخول.');
    // Clear form or navigate after a delay
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="signup-page-container">
      <div className="container py-5">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb bg-light p-3 rounded">
            <li className="breadcrumb-item"><Link to="/">الرئيسية</Link></li>
            <li className="breadcrumb-item active" aria-current="page">إنشاء حساب جديد</li>
          </ol>
        </nav>

        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <div className="card signup-card shadow-lg">
              <div className="card-body p-4 p-md-5">
                <h2 className="card-title text-center mb-4 form-header">إنشاء حساب جديد</h2>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                {success && <div className="alert alert-success" role="alert">{success}</div>}
                <form onSubmit={handleSubmit} noValidate>
                  <div className="field-group mb-3">
                    <input 
                      type="text" 
                      className={`form-input form-control ${error && !name ? 'is-invalid' : ''}`}
                      id="name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required 
                      autoComplete="name"
                    />
                    <label htmlFor="name">الاسم الكامل</label>
                    {error && !name && <div className="invalid-feedback">الاسم مطلوب.</div>}
                  </div>

                  <div className="field-group mb-3">
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

                  <div className="field-group mb-3">
                    <input 
                      type="password" 
                      className={`form-input form-control ${error && (!password || password.length < 6) ? 'is-invalid' : ''}`}
                      id="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required 
                      autoComplete="new-password"
                    />
                    <label htmlFor="password">كلمة المرور</label>
                    {error && (!password || password.length < 6) && <div className="invalid-feedback">كلمة المرور مطلوبة (6 أحرف على الأقل).</div>}
                  </div>

                  <div className="field-group mb-4">
                    <input 
                      type="password" 
                      className={`form-input form-control ${error && (password !== confirmPassword || !confirmPassword) ? 'is-invalid' : ''}`}
                      id="confirmPassword" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required 
                      autoComplete="new-password"
                    />
                    <label htmlFor="confirmPassword">تأكيد كلمة المرور</label>
                    {error && (password !== confirmPassword || !confirmPassword) && <div className="invalid-feedback">تأكيد كلمة المرور مطلوب ويجب أن يتطابق.</div>}
                  </div>
                  
                  <div className="field-group">
                    <button type="submit" className="submit-button btn btn-primary w-100">إنشاء الحساب</button>
                  </div>
                </form>

                <div className="signup-redirect text-center mt-4">
                  <p className="mb-0 text-muted">
                    لديك حساب بالفعل؟ <Link to="/login" className="fw-bold">تسجيل الدخول</Link>
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

export default SignupPage;

