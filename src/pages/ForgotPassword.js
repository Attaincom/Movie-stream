import { useState } from 'react';
import { Link } from 'react-router-dom';
import { resetPassword } from '../services/auth'; // Import resetPassword API call

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!email.trim() || !newPassword.trim()) {
      setError('Please fill in both fields.');
      return;
    }

    try {
      const res = await resetPassword({ email, newPassword });
      setMessage(res.data.message || 'Password reset successful.');
      setEmail('');
      setNewPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="max-w-md w-full bg-gray-900 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        <p className="mb-4 text-sm text-gray-400">
          Enter your email and a new password to reset your account.
        </p>

        {message && <div className="mb-4 text-green-400 text-sm">{message}</div>}
        {error && <div className="mb-4 text-red-400 text-sm">{error}</div>}

        <form onSubmit={handleReset}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mb-4 bg-gray-800 text-white rounded focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 mb-4 bg-gray-800 text-white rounded focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded font-semibold"
          >
            Reset Password
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <Link to="/login" className="text-blue-400 hover:underline">Back to Sign In</Link>
        </div>
      </div>
    </div>
  );
}
