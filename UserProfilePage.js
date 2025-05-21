import React from 'react';
import { Link } from 'react-router-dom';
import './UserProfilePage.css'; // We will create this CSS file later

// Mock user data (replace with actual data from auth context or API)
const mockUser = {
  name: 'المستخدم التجريبي',
  email: 'user@example.com',
  memberSince: '2024-01-15',
  // Add more user details as needed, e.g., phone, address (if collected)
  bookingHistory: [
    { id: 'b1', service: 'اصلاح الكهرباء', technician: 'احمد محمد', date: '2024-05-10', status: 'مكتمل' },
    { id: 'b2', service: 'الدهان', technician: 'زيد فارس', date: '2024-04-22', status: 'مكتمل' },
    { id: 'b3', service: 'خدمات التنظيف', technician: 'الوهج للتنظيف', date: '2024-05-20', status: 'محجوز' },
  ]
};

const UserProfilePage = () => {
  // In a real app, you'd get user data from an Auth Context or API call
  const user = mockUser;

  // Placeholder for logout functionality
  const handleLogout = () => {
    alert('تم تسجيل الخروج بنجاح (محاكاة)!');
    // navigate('/login'); // Assuming navigate is available via useNavigate hook
  };

  if (!user) {
    // This case should ideally be handled by a protected route redirecting to login
    return (
      <div className="container py-5 text-center">
        <p>الرجاء تسجيل الدخول لعرض ملفك الشخصي.</p>
        <Link to="/login" className="btn btn-primary">تسجيل الدخول</Link>
      </div>
    );
  }

  return (
    <div className="user-profile-page container py-5">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb bg-light p-3 rounded">
          <li className="breadcrumb-item"><Link to="/">الرئيسية</Link></li>
          <li className="breadcrumb-item active" aria-current="page">ملفي الشخصي</li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-lg-4">
          <div className="card profile-sidebar-card mb-4 shadow-sm">
            <div className="card-body text-center">
              {/* Placeholder for avatar - ideally user can upload one */}
              <img 
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0D8ABC&color=fff&size=128`}
                alt={user.name} 
                className="rounded-circle img-fluid mb-3 profile-avatar-img"
              />
              <h4 className="card-title mb-1">{user.name}</h4>
              <p className="text-muted mb-3">{user.email}</p>
              {/* <button className="btn btn-outline-primary btn-sm mb-2 w-100">تعديل الملف الشخصي (قريباً)</button> */}
              <button onClick={handleLogout} className="btn btn-outline-danger btn-sm w-100">تسجيل الخروج</button>
            </div>
          </div>
          {/* Optional: Add more sidebar links like 'Settings', 'Notifications' */}
        </div>

        <div className="col-lg-8">
          <div className="card profile-main-content-card shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">تفاصيل الحساب</h5>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-4"><strong className="text-muted">الاسم الكامل:</strong></div>
                <div className="col-sm-8">{user.name}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4"><strong className="text-muted">البريد الإلكتروني:</strong></div>
                <div className="col-sm-8">{user.email}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4"><strong className="text-muted">عضو منذ:</strong></div>
                <div className="col-sm-8">{user.memberSince}</div>
              </div>
              {/* Add more fields as necessary */}
            </div>
          </div>

          <div className="card mt-4 profile-main-content-card shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">سجل الخدمات/الحجوزات</h5>
            </div>
            <div className="card-body">
              {user.bookingHistory && user.bookingHistory.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover booking-history-table">
                    <thead className="table-light">
                      <tr>
                        <th>الخدمة</th>
                        <th>الفني</th>
                        <th>التاريخ</th>
                        <th>الحالة</th>
                        {/* <th>الإجراءات</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {user.bookingHistory.map(booking => (
                        <tr key={booking.id}>
                          <td>{booking.service}</td>
                          <td>{booking.technician}</td>
                          <td>{booking.date}</td>
                          <td>
                            <span className={`badge ${booking.status === 'مكتمل' ? 'bg-success' : 'bg-warning text-dark'}`}>
                              {booking.status}
                            </span>
                          </td>
                          {/* Example for actions - e.g., rebook, review */}
                          {/* <td>
                            {booking.status === 'مكتمل' && 
                              <button className="btn btn-sm btn-outline-info">قيم الخدمة</button>}
                          </td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted text-center">لا يوجد سجل حجوزات لعرضه.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;

