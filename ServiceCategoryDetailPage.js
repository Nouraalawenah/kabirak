import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './ServiceCategoryDetailPage.css'; // We will create this CSS file later

// Mock data for technicians (replace with actual data fetching later)
const mockTechnicians = {
  electrical: [
    { id: 'tech1', name: 'احمد محمد', specialty: 'اصلاح الكهرباء', description: 'متخصص في جميع انواع اصلاح الكهرباء المنزلية و المكتبية بكفاءة و دقة عالية.', avatar: '/assets/img/anonymous.jpg', phone: '+15125006688' },
    { id: 'tech2', name: 'علي احمد', specialty: 'اصلاح الكهرباء', description: 'متخصص في جميع انواع اصلاح الكهرباء المنزلية و المكتبية بكفاءة و دقة عالية.', avatar: '/assets/img/anonymous.jpg', phone: '+15125006688' },
    { id: 'tech3', name: 'مصطفى خالد', specialty: 'اصلاح الكهرباء', description: 'متخصص في جميع انواع اصلاح الكهرباء المنزلية و المكتبية بكفاءة و دقة عالية.', avatar: '/assets/img/anonymous.jpg', phone: '+15125006688' },
  ],
  painting: [
    { id: 'tech4', name: 'زيد فارس', specialty: 'الدهان', description: 'فني دهان محترف ذو خبرة في طلاء الجدران، الأسقف، والأخشاب بدقة وجودة عالية.', avatar: '/assets/img/anonymous.jpg', phone: '+15125006688' },
    { id: 'tech5', name: 'يامن العلي', specialty: 'الدهان', description: 'خبير دهان وديكور متخصص في الطلاء المضاد للرطوبة والعفن للحمامات.', avatar: '/assets/img/anonymous.jpg', phone: '+15125006688' },
  ],
  cleaning: [
    { id: 'tech6', name: 'الوهج للتنظيف', specialty: 'خدمات التنظيف', description: 'متخصصون في جميع أنواع خدمات التنظيف المنزلية المكتبية بكفاءة ودقة', avatar: '/assets/img/anonymous.jpg', phone: '+15125006688' },
  ]
  // Add more categories and technicians as needed
};

// Mock data for service categories (similar to ServicesPage, for breadcrumbs etc.)
const serviceCategoriesInfo = {
  electrical: { name: 'اصلاح الكهرباء' },
  painting: { name: 'الدهان' },
  cleaning: { name: 'خدمات التنظيف' },
  plumbing: { name: 'سباكة' },
  carpentry: { name: 'نجارة' },
  'ac-heating': { name: 'تكييف وتدفئة' },
  'security-systems': { name: 'صيانة أنظمة الأمن والمراقبة' },
  gardening: { name: 'حدائق منزلية' },
};

const ServiceCategoryDetailPage = () => {
  const { categoryId } = useParams();
  const technicians = mockTechnicians[categoryId] || [];
  const categoryInfo = serviceCategoriesInfo[categoryId] || { name: 'فئة غير معروفة' };

  // Placeholder for location-based filtering
  // const userLocation = getUserLocation(); // Assume this function exists
  // const filteredTechnicians = technicians.filter(tech => tech.location === userLocation);

  return (
    <div className="service-category-detail-page container py-5">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">الرئيسية</Link></li>
          <li className="breadcrumb-item"><Link to="/services">الخدمات</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{categoryInfo.name}</li>
        </ol>
      </nav>

      <div className="row text-center mb-5">
        <div className="col">
          <h1 className="display-5">فنيون في مجال {categoryInfo.name}</h1>
          <p className="lead text-muted">
            تصفح قائمة الفنيين المتخصصين في {categoryInfo.name}. (ملاحظة: سيتم لاحقاً فلترة الفنيين حسب موقعك الجغرافي).
          </p>
        </div>
      </div>

      {technicians.length > 0 ? (
        <div className="row g-4">
          {technicians.map((tech) => (
            <div key={tech.id} className="col-lg-4 col-md-6">
              <div className="card technician-card h-100">
                <img src={tech.avatar} className="card-img-top technician-avatar" alt={tech.name} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{tech.name}</h5>
                  <p className="card-text text-muted"><small>{tech.specialty}</small></p>
                  <p className="card-text flex-grow-1">{tech.description}</p>
                  <div className="mt-auto">
                    <a href={`tel:${tech.phone}`} className="btn btn-primary w-100 mb-2">اتصل الآن</a>
                    <Link to={`/technician/${tech.id}`} className="btn btn-outline-secondary w-100">عرض الملف الشخصي</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info text-center" role="alert">
          لا يوجد فنيون متاحون حاليًا في هذه الفئة أو لم يتم إضافة فنيين لهذه الفئة بعد.
        </div>
      )}
    </div>
  );
};

export default ServiceCategoryDetailPage;

