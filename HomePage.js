import React from 'react';
import './HomePage.css'; // We will create this CSS file later
// import HeroSection from './HeroSection'; // Placeholder for now
// import ServicesOverview from './ServicesOverview'; // Placeholder for now
// import RecentProjects from './RecentProjects'; // Placeholder for now
// import AboutUs from './AboutUs'; // Placeholder for now
// import WhyChooseUs from './WhyChooseUs'; // Placeholder for now

const HomePage = () => {
  return (
    <div className="home-page-container">
      {/* Placeholder for HeroSection */}
      <section className="hero-section-placeholder" style={{ backgroundImage: `url('/assets/img/cover.jpg')` }}>
        <div className="hero-content">
          <h1>أهلاً بك في خبيرك</h1>
          <p>نوصلك بأفضل الفنيين لجميع احتياجات صيانة منزلك.</p>
          {/* <Link to="/services" className="btn btn-primary btn-lg">تصفح الخدمات</Link> */}
          <button className="btn btn-primary btn-lg">تصفح الخدمات (قريباً)</button>
        </div>
      </section>

      {/* Placeholder for ServicesOverview - adapted from original index.html */}
      <section className="services-overview-placeholder py-5">
        <div className="container">
          <div className="row text-center fs-1 pt-4">
            <div className="col">
              <h1>الخدمات الرئيسية</h1>
            </div>
          </div>
          <div className="row justify-content-center text-center fs-6 py-3">
            <div className="col-7 pt-2 border-bottom">
              <p>نقدم مجموعة واسعة من خدمات الصيانة المنزلية لراحتك.</p>
            </div>
          </div>
          {/* Add some service cards or icons here later */}
        </div>
      </section>

      {/* Placeholder for AboutUs - adapted from original index.html */}
      <section className="about-us-placeholder py-5 bg-light">
        <div className="container">
          <div className="row text-center fs-1 pt-4">
            <div className="col">
              <h1>نبذة عنا</h1>
            </div>
          </div>
          <div className="row justify-content-center text-center fs-6 py-3">
            <div className="col-7 bt-4 border-bottom">
              <p>
                نوصلك بمحترفي صيانة منزلية موثوق بهم لخدمات إصلاح وتركيب سلسة.
                تضمن منصتنا جودة الصنع من خلال فنيين معتمدين، مع إعطاء الأولوية لراحتك ورضاك.
              </p>
            </div>
          </div>
          <div className="row p-md-5 align-items-center">
            <div className="col-12 col-md-6">
              <img src={'/assets/img/img_01.jpg'} alt="About us" className="img-fluid rounded" />
            </div>
            <div className="col-12 col-md-6 p-4 fw-lighter fs-5">
              <h4>خبرتنا</h4>
              <p>نجمع بين جودة الصنعة والمعرفة الفائقة والأسعار المنخفضة لنقدم لك خدمة لا مثيل لها.</p>
              <h4>افضل الموارد</h4>
              <p>لدينا الخبرة والكوادر والموارد اللازمة لجعل المشروع يسير بسلاسة. يمكننا ضمان إنجاز العمل في الوقت المحدد.</p>
              <h4>المعايير المهنية</h4>
              <p>يتضمن العمل معنا سلسلة من الخطوات المخططة بعناية، تتمحور حول اختيار و تواصل سلسل و فعال.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Placeholder for WhyChooseUs - adapted from original index.html */}
      <section className="why-choose-us-placeholder py-5">
        <div className="container">
          <div className="row text-center fs-1 py-3">
            <div className="col">
              <h1>لماذا تختار خبيرك!</h1>
            </div>
          </div>
          <div className="row justify-content-center text-center fs-6 py-3">
            <div className="col-7 bt-4 border-bottom">
              <p>
                يعد خبيرك واحد من المنصات المتخصصة لتقديم خدمات صيانة المنازل، لتسهيل تقديم خدمات اصلاح و صيانة سلسلة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Placeholder for RecentProjects - adapted from original index.html */}
      <section className="recent-projects-placeholder py-5 bg-light">
        <div className="container">
          <div className="row text-center fs-1 pt-4">
            <div className="col">
              <h1>المشاريع الاخيرة</h1>
            </div>
          </div>
          <div className="row justify-content-center text-center fs-6 py-3">
            <div className="col-7 pt-2 border-bottom">
              <p>
                فيما يلي بعض المشاريع العديدة التي أنجزناها لعملائنا. نقدم خدمة احترافية تشمل تنظيف المنازل، والطلاء الداخلي، وإصلاح أو صيانة الأجهزة، وإزالة الخردة، وإصلاح الكهرباء والأسلاك، والنجارة و السباكة.
              </p>
            </div>
          </div>
          <div className="row text-center p-4">
            <div className="col-6 col-md-4 mb-3">
              <img src={'/assets/img/OIP (2).jpeg'} className="img-fluid object-fit-sm-contain border rounded" alt="Project 1" />
            </div>
            <div className="col-6 col-md-4 mb-3">
              <img src={'/assets/img/OIP (3).jpeg'} className="img-fluid object-fit-sm-contain border rounded" alt="Project 2" />
            </div>
            <div className="col-12 col-md-4 mb-3">
              <img src={'/assets/img/image_03.jpg'} className="img-fluid object-fit-sm-contain border rounded" alt="Project 3" />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;

