import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HelpCenterPage.css'; // We will create this CSS file later

// Mock FAQ data
const faqs = [
  {
    id: 'faq1',
    question: 'كيف يمكنني تسجيل حساب جديد كعميل؟',
    answer: 'يمكنك تسجيل حساب جديد بالضغط على زر التسجيل في الشريط العلوي، ثم اختيار إنشاء حساب جديد وملء البيانات المطلوبة مثل الاسم، البريد الإلكتروني، وكلمة المرور.'
  },
  {
    id: 'faq2',
    question: 'كيف أجد فنيًا لخدمة معينة؟',
    answer: 'من الصفحة الرئيسية أو صفحة الخدمات، يمكنك تصفح فئات الخدمات المتاحة. بعد اختيار الفئة، ستظهر لك قائمة بالفنيين المتخصصين. يمكنك بعد ذلك اختيار الفني المناسب بناءً على موقعه وتقييماته (سيتم تفعيل فلترة الموقع لاحقاً).'
  },
  {
    id: 'faq3',
    question: 'كيف يمكنني التواصل مع الفني؟',
    answer: 'بعد اختيار الفني المناسب من قائمة الفنيين أو من ملفه الشخصي، ستجد زر اتصال مباشر برقم هاتفه. يمكنك الضغط عليه للتواصل مباشرة مع الفني.'
  },
  {
    id: 'faq4',
    question: 'هل يمكنني تقييم الخدمة بعد انتهائها؟',
    answer: 'نعم، بعد انتهاء الخدمة وتسجيل الدخول إلى حسابك، يمكنك الذهاب إلى ملف الفني وترك تقييم وتعليق بناءً على تجربتك. (ميزة إضافة التقييم قيد التطوير الكامل).'
  },
  {
    id: 'faq5',
    question: 'ماذا أفعل إذا واجهت مشكلة مع الفني أو الخدمة؟',
    answer: 'نأسف لسماع ذلك. يمكنك التواصل معنا مباشرة عبر نموذج الاتصال بالدعم الموجود في هذه الصفحة، وسنبذل قصارى جهدنا لمساعدتك في حل المشكلة.'
  },
  {
    id: 'faq6',
    question: 'كيف يمكنني التسجيل كفني في المنصة؟',
    answer: 'إذا كنت فنيًا محترفًا وترغب في الانضمام إلينا، يرجى التواصل معنا عبر معلومات الاتصال الموجودة في أسفل الصفحة أو عبر نموذج الاتصال بالدعم، وسيقوم فريقنا بمراجعة طلبك والتواصل معك.'
  }
];

const HelpCenterPage = () => {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');
    if (!contactName || !contactEmail || !contactSubject || !contactMessage) {
      setFormError('الرجاء ملء جميع حقول نموذج الاتصال.');
      return;
    }
    // Placeholder for form submission logic (e.g., send to an API endpoint)
    console.log('Contact form submitted:', { contactName, contactEmail, contactSubject, contactMessage });
    setFormSuccess('تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.');
    // Clear form
    setContactName('');
    setContactEmail('');
    setContactSubject('');
    setContactMessage('');
  };

  return (
    <div className="help-center-page container py-5">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb bg-light p-3 rounded">
          <li className="breadcrumb-item"><Link to="/">الرئيسية</Link></li>
          <li className="breadcrumb-item active" aria-current="page">مركز المساعدة</li>
        </ol>
      </nav>

      <div className="text-center mb-5">
        <h1 className="display-4">مركز المساعدة</h1>
        <p className="lead text-muted">نجيب على أسئلتك ونساعدك في حل أي مشكلات قد تواجهك.</p>
      </div>

      <section className="faq-section mb-5">
        <h2 className="text-center mb-4 section-title">الأسئلة الشائعة</h2>
        <div className="accordion" id="faqAccordion">
          {faqs.map((faq, index) => (
            <div className="accordion-item" key={faq.id}>
              <h2 className="accordion-header" id={`heading-${faq.id}`}>
                <button 
                  className={`accordion-button ${index !== 0 ? 'collapsed' : ''}`}
                  type="button" 
                  data-bs-toggle="collapse" 
                  data-bs-target={`#collapse-${faq.id}`} 
                  aria-expanded={index === 0 ? 'true' : 'false'} 
                  aria-controls={`collapse-${faq.id}`}
                >
                  {faq.question}
                </button>
              </h2>
              <div 
                id={`collapse-${faq.id}`} 
                className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                aria-labelledby={`heading-${faq.id}`} 
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="contact-support-section card shadow-sm">
        <div className="card-header bg-primary text-white">
            <h2 className="mb-0 text-center section-title-light">تواصل مع الدعم الفني</h2>
        </div>
        <div className="card-body p-4">
          <p className="text-muted text-center mb-4">إذا لم تجد إجابة لسؤالك أو كنت بحاجة إلى مساعدة إضافية، يرجى ملء النموذج أدناه.</p>
          {formError && <div className="alert alert-danger">{formError}</div>}
          {formSuccess && <div className="alert alert-success">{formSuccess}</div>}
          <form onSubmit={handleContactSubmit} noValidate>
            <div className="row">
              <div className="col-md-6 mb-3 field-group">
                <input 
                  type="text" 
                  className={`form-input form-control ${formError && !contactName ? 'is-invalid' : ''}`}
                  id="contactName" 
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  required 
                />
                <label htmlFor="contactName">الاسم الكامل</label>
              </div>
              <div className="col-md-6 mb-3 field-group">
                <input 
                  type="email" 
                  className={`form-input form-control ${formError && !contactEmail ? 'is-invalid' : ''}`}
                  id="contactEmail" 
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  required 
                />
                <label htmlFor="contactEmail">البريد الإلكتروني</label>
              </div>
            </div>
            <div className="mb-3 field-group">
              <input 
                type="text" 
                className={`form-input form-control ${formError && !contactSubject ? 'is-invalid' : ''}`}
                id="contactSubject" 
                value={contactSubject}
                onChange={(e) => setContactSubject(e.target.value)}
                required 
              />
              <label htmlFor="contactSubject">الموضوع</label>
            </div>
            <div className="mb-3 field-group">
              <textarea 
                className={`form-input form-control ${formError && !contactMessage ? 'is-invalid' : ''}`}
                id="contactMessage" 
                rows="5" 
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                required
              ></textarea>
              <label htmlFor="contactMessage">رسالتك</label>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary btn-lg submit-button">إرسال الرسالة</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HelpCenterPage;

