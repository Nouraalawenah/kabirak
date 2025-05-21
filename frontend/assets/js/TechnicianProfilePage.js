import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './TechnicianProfilePage.css'; // We will create this CSS file later

// Mock data for technicians (ensure this is consistent or fetched from a central place later)
const mockTechniciansData = {
  tech1: { 
    id: 'tech1', name: 'احمد محمد', specialty: 'اصلاح الكهرباء', 
    description: 'متخصص في جميع انواع اصلاح الكهرباء المنزلية و المكتبية بكفاءة و دقة عالية. خبرة تمتد لأكثر من 10 سنوات في المجال، مع التزام كامل بالمواعيد ومعايير السلامة. أقدم خدمات تركيب وصيانة لجميع الأجهزة الكهربائية والأسلاك.', 
    avatar: '/assets/img/anonymous.jpg', phone: '+15125006688', 
    portfolio: [
      { id: 'p1', title: 'تركيب إضاءة حديثة', imageUrl: '/assets/img/Electrical(1).jpeg', description: 'تم تركيب نظام إضاءة LED موفر للطاقة في فيلا سكنية.' },
      { id: 'p2', title: 'صيانة لوحة توزيع رئيسية', imageUrl: '/assets/img/Electrical(2).avif', description: 'فحص وإصلاح لوحة التوزيع الكهربائية لضمان الأمان والكفاءة.' },
      { id: 'p3', title: 'تمديد أسلاك لمكيف جديد', imageUrl: '/assets/img/Electrical(3).jpg', description: 'تمديد الأسلاك اللازمة وتركيب قاطع خاص لمكيف سبليت جديد.' },
    ],
    reviews: [
      { id: 'r1', userName: 'سارة عبدالله', rating: 5, comment: 'عمل ممتاز وسريع، الفني محترف جداً.' },
      { id: 'r2', userName: 'خالد الفيصل', rating: 4, comment: 'جودة العمل جيدة، لكن تأخر قليلاً عن الموعد.' },
    ],
    category: {id: 'electrical', name: 'اصلاح الكهرباء'}
  },
  tech4: { 
    id: 'tech4', name: 'زيد فارس', specialty: 'الدهان', 
    description: 'فني دهان محترف ذو خبرة في طلاء الجدران، الأسقف، والأخشاب بدقة وجودة عالية. أستخدم أحدث الأدوات ومواد الدهان عالية الجودة لضمان نتيجة ناعمة ومتجانسة، مع الالتزام بمواعيد التسليم.', 
    avatar: '/assets/img/anonymous.jpg', phone: '+15125006688', 
    portfolio: [
      // Add painting portfolio items if available, otherwise use placeholders
      { id: 'p4', title: 'دهان غرفة نوم', imageUrl: '/assets/img/OIP (4).jpeg', description: 'دهان غرفة نوم بألوان هادئة وعصرية.' },
      { id: 'p5', title: 'تجديد واجهة منزل', imageUrl: '/assets/img/OIP (5).jpeg', description: 'إعادة دهان الواجهة الخارجية للمنزل بألوان مقاومة للعوامل الجوية.' },
    ],
    reviews: [
      { id: 'r3', userName: 'نورة خالد', rating: 5, comment: 'الدهان رائع والألوان تماماً كما طلبت. شكراً جزيلاً!' },
    ],
    category: {id: 'painting', name: 'الدهان'}
  },
  // Add other technicians as needed, ensure IDs are unique and match those in ServiceCategoryDetailPage
};

const TechnicianProfilePage = () => {
  const { technicianId } = useParams();
  const technician = mockTechniciansData[technicianId];

  if (!technician) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger" role="alert">
          عفواً، لم يتم العثور على بيانات الفني المطلوب.
        </div>
        <Link to="/services" className="btn btn-primary mt-3">العودة إلى الخدمات</Link>
      </div>
    );
  }

  return (
    <div className="technician-profile-page container py-5">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">الرئيسية</Link></li>
          <li className="breadcrumb-item"><Link to="/services">الخدمات</Link></li>
          {technician.category && 
            <li className="breadcrumb-item"><Link to={`/services/${technician.category.id}`}>{technician.category.name}</Link></li>
          }
          <li className="breadcrumb-item active" aria-current="page">{technician.name}</li>
        </ol>
      </nav>

      <div className="card shadow-sm technician-header-card mb-5">
        <div className="row g-0">
          <div className="col-md-3 text-center p-3">
            <img src={technician.avatar} className="img-fluid rounded-circle technician-profile-avatar" alt={technician.name} />
          </div>
          <div className="col-md-9">
            <div className="card-body">
              <h1 className="card-title display-5 mb-1">{technician.name}</h1>
              <p className="card-text text-primary fs-5 mb-2">{technician.specialty}</p>
              <p className="card-text text-muted">{technician.description}</p>
              <a href={`tel:${technician.phone}`} className="btn btn-success btn-lg mt-3">
                <i className="fas fa-phone-alt me-2"></i>اتصل الآن ({technician.phone})
              </a>
              {/* Placeholder for future booking button */}
              {/* <button className="btn btn-outline-primary btn-lg mt-3 ms-2">احجز موعد (قريباً)</button> */}
            </div>
          </div>
        </div>
      </div>

      {technician.portfolio && technician.portfolio.length > 0 && (
        <section className="portfolio-section mb-5">
          <h2 className="text-center mb-4 section-title">بعض من أعمالي</h2>
          <div className="row g-4">
            {technician.portfolio.map(item => (
              <div key={item.id} className="col-md-4">
                <div className="card portfolio-item-card h-100">
                  <img src={item.imageUrl} className="card-img-top portfolio-image" alt={item.title} />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    {item.description && <p className="card-text text-muted"><small>{item.description}</small></p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="reviews-section">
        <h2 className="text-center mb-4 section-title">تقييمات العملاء</h2>
        {technician.reviews && technician.reviews.length > 0 ? (
          <div className="list-group">
            {technician.reviews.map(review => (
              <div key={review.id} className="list-group-item review-item mb-3 shadow-sm">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1 review-user">{review.userName}</h5>
                  <small className="text-muted">{'⭐'.repeat(review.rating)}{'★'.repeat(5 - review.rating)}</small>
                </div>
                <p className="mb-1 review-comment">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="alert alert-light text-center" role="alert">
            لا توجد تقييمات متاحة لهذا الفني حاليًا.
          </div>
        )}
        {/* Placeholder for AddReviewForm - to be shown if user is logged in and has used the service */}
        <div className="add-review-form-placeholder mt-4 p-4 bg-light rounded">
            <h4 class="text-center mb-3">أضف تقييمك</h4>
            <form>
                <div class="mb-3">
                    <label for="reviewText" class="form-label">رأيك يهمنا:</label>
                    <textarea class="form-control" id="reviewText" rows="3" placeholder="اكتب تقييمك هنا..."></textarea>
                </div>
                <div class="mb-3">
                    <label class="form-label">التقييم (من 1 إلى 5 نجوم):</label>
                    {/* Basic star rating input placeholder */}
                    <div>★★★★★</div> 
                </div>
                <button type="submit" class="btn btn-primary">إرسال التقييم (ميزة قيد التطوير)</button>
            </form>
        </div>
      </section>

    </div>
  );
};

export default TechnicianProfilePage;

