import { useState } from 'react';
import { loginUser } from '../api';

export default function Login({ onSuccess, onGoRegister }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await loginUser(form);
      if (data.error) {
        setError(data.error);
      } else {
        localStorage.setItem('token', data.token);
        onSuccess(data.user);
      }
    } catch {
      setError('Network error. Is the server running?');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h1 className="card-title">Welcome back</h1>
      <p className="card-subtitle">Sign in to your account</p>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit} className="form">
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
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
        </div>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="switch-link">
        Don&apos;t have an account?{' '}
        <button type="button" className="link-btn" onClick={onGoRegister}>
          Create one
        </button>
      </p>
    </div>
  );
}
