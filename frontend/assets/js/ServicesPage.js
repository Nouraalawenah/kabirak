import React from 'react';
import { Link } from 'react-router-dom';
import './ServicesPage.css'; // We will create this CSS file later

// Mock data for service categories
const serviceCategories = [
  { id: 'plumbing', name: 'سباكة', icon: '/assets/img/build_24dp_5D0E07_FILL0_wght200_GRAD200_opsz24.svg', description: 'إصلاح وتركيب أنظمة السباكة.' },
  { id: 'painting', name: 'دهان', icon: '/assets/img/format_paint_24dp_5D0E07_FILL0_wght100_GRAD200_opsz24.svg', description: 'خدمات الدهان الداخلي والخارجي.' },
  { id: 'electrical', name: 'كهرباء', icon: '/assets/img/power_24dp_5D0E07_FILL0_wght100_GRAD200_opsz24.svg', description: 'إصلاح وتركيب الأنظمة الكهربائية.' },
  { id: 'carpentry', name: 'نجارة', icon: '/assets/img/forklift_24dp_5D0E07_FILL0_wght100_GRAD200_opsz24.svg', description: 'أعمال النجارة والتصليحات الخشبية.' }, // Matched icon, original was forklift, using handyman as a better fit if available, or keeping forklift if it's the only one like it.
  { id: 'ac-heating', name: 'تكييف وتدفئة', icon: '/assets/img/handyman_24dp_5D0E07_FILL0_wght100_GRAD200_opsz24.svg', description: 'صيانة وتركيب أنظمة التكييف والتدفئة.' },
  { id: 'security-systems', name: 'صيانة أنظمة الأمن والمراقبة', icon: '/assets/img/tile_large_28dp_5D0E07_FILL0_wght100_GRAD0_opsz24.svg', description: 'تركيب وصيانة كاميرات المراقبة وأنظمة الإنذار.' }, // Placeholder icon, might need a better one
  { id: 'gardening', name: 'حدائق منزلية', icon: '/assets/img/tile_large_28dp_5D0E07_FILL0_wght100_GRAD0_opsz24.svg', description: 'خدمات تنسيق وصيانة الحدائق.' }, // Re-used icon, consider specific one
  { id: 'cleaning', name: 'خدمات التنظيف', icon: '/assets/img/cleaning_28dp_5D0E07_FILL0_wght100_GRAD0_opsz24.svg', description: 'تنظيف شامل للمنازل والمكاتب.' },
  // Add other services from the original servses.html if needed, e.g., waste removal
];

const ServicesPage = () => {
  return (
    <div className="services-page-container container py-5">
      <div className="row text-center mb-5">
        <div className="col">
          <h1 className="display-4">خدماتنا</h1>
          <p className="lead text-muted">اختر الخدمة التي تناسب احتياجاتك من قائمة خدمات الصيانة الشاملة لدينا.</p>
        </div>
      </div>

      <div className="row g-4">
        {serviceCategories.map((category) => (
          <div key={category.id} className="col-lg-3 col-md-4 col-sm-6">
            <Link to={`/services/${category.id}`} className="card service-card h-100 text-decoration-none">
              <div className="card-body text-center">
                <img src={category.icon} alt={`${category.name} icon`} className="service-icon mb-3" />
                <h5 className="card-title">{category.name}</h5>
                <p className="card-text text-muted"><small>{category.description}</small></p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Section from original servses.html - How to use Khabirk */}
      <div className="row text-center fs-1 mt-5 pt-5 bg-light p-5 rounded">
        <div className="col">
            <h1>كيف تستخدم خبيرك</h1>
        </div>
      </div>
    
      <div className="row p-5 my-5 border-bottom align-items-center bg-light rounded">
          <div className="col-12 col-md-6 text-center text-md-start">
            <img src={'/assets/img/img_2.jpeg'} alt="How to use Khabirk" className="img-fluid rounded shadow" style={{maxWidth: '450px'}}/>
          </div>
          <div className="col-12 col-md-6 p-4 fw-lighter text-secondary fs-5">
              <div className="d-flex align-items-center mb-3">
                <img src={'/assets/img/1-circle.svg'} style={{ width: '40px', height: '40px', marginRight: '15px' }} alt="Step 1"/> 
                <p className="mb-0">اختر فني حسب الفئة التي تريدها و سعر الخدمة.</p>
              </div>
              <div className="d-flex align-items-center mb-3">
                <img src={'/assets/img/2-circle.svg'} style={{ width: '40px', height: '40px', marginRight: '15px' }} alt="Step 2"/> 
                <p className="mb-0">تواصل مع الفني و احجز وقت في نفس اليوم او الوقت الذي تفضله.</p>
              </div>
              <div className="d-flex align-items-center">
                <img src={'/assets/img/3-circle.svg'} style={{ width: '40px', height: '40px', marginRight: '15px' }} alt="Step 3"/> 
                <p className="mb-0">الدردشة, الدفع , التقييم بسلاسة في مكان واحد.</p>
              </div>
          </div>
        </div>
  
      {/* Section from original servses.html - Why choose Khabirk as a technician */}
      <div className="row text-center fs-1 py-5">
        <div className="col">
          <h1>لماذا تختار خبيرك كفني</h1>
        </div>
      </div>
      <div className="row justify-content-center text-center fs-6 py-3">
        <div className="col-md-8 col-lg-7 bt-4 border-bottom pb-4">
            <p>
                هل أنت فني محترف في مجالك؟ ندعوك للانضمام إلى شبكة فنيينا المعتمدين في منصتنا الرائدة لخدمات صيانة المنازل.
                إذا كانت لديك مهارات متميزة، فنحن نبحث عنك! لا تفوت هذه الفرصة، اتصل بنا اليوم
                وسجل كفني محترف على منصتنا، وكن جزءًا من شبكة من الخبراء يثق بهم العملاء. انضم إلينا الآن وانطلق نحو مستقبل مهني أكثر ازدهارًا.
            </p>
        </div>
      </div> 

    </div>
  );
};

export default ServicesPage;

