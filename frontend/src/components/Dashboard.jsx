export default function Dashboard({ user, onLogout }) {
  return (
    <div className="card">
      <div className="dashboard-header">
        <div className="avatar">
          {user.first_name[0]}{user.last_name[0]}
        </div>
        <h1 className="card-title">
          Welcome, {user.first_name}!
        </h1>
      </div>

      <div className="user-details">
        <h2>Your profile</h2>
        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">First name</span>
            <span className="detail-value">{user.first_name}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Last name</span>
            <span className="detail-value">{user.last_name}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Email</span>
            <span className="detail-value">{user.email}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Phone</span>
            <span className="detail-value">{user.phone_number || '—'}</span>
          </div>
          <div className="detail-item full-width">
            <span className="detail-label">User ID</span>
            <span className="detail-value mono">{user.userid}</span>
          </div>
        </div>
      </div>

      <button className="btn-secondary" onClick={onLogout}>
        Sign out
      </button>
    </div>
  );
}
