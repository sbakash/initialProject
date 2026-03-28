import { useState } from 'react';
import { registerUser } from '../api';

const INITIAL = {
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  password: '',
  confirm_password: '',
};

export default function Register({ onSuccess, onGoLogin }) {
  const [form, setForm] = useState(INITIAL);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirm_password) {
      setError('Passwords do not match');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const { confirm_password, ...payload } = form;
      const data = await registerUser(payload);
      if (data.error) {
        setError(data.error);
      } else {
        localStorage.setItem('token', data.token);
        onSuccess({
          userid: data.userid,
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          phone_number: form.phone_number,
        });
      }
    } catch {
      setError('Network error. Is the server running?');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h1 className="card-title">Create account</h1>
      <p className="card-subtitle">Fill in your details to get started</p>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit} className="form">
        <div className="field-row">
          <div className="field">
            <label htmlFor="first_name">First name</label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              placeholder="John"
              value={form.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="last_name">Last name</label>
            <input
              id="last_name"
              type="text"
              name="last_name"
              placeholder="Doe"
              value={form.last_name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </div>

        <div className="field">
          <label htmlFor="phone_number">Phone number</label>
          <input
            id="phone_number"
            type="tel"
            name="phone_number"
            placeholder="+1 234 567 8900"
            value={form.phone_number}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Min. 6 characters"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
        </div>

        <div className="field">
          <label htmlFor="confirm_password">Confirm password</label>
          <input
            id="confirm_password"
            type="password"
            name="confirm_password"
            placeholder="Repeat password"
            value={form.confirm_password}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="switch-link">
        Already have an account?{' '}
        <button type="button" className="link-btn" onClick={onGoLogin}>
          Sign in
        </button>
      </p>
    </div>
  );
}
