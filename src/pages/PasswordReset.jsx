import React, { useState, useEffect } from 'react';
import { Mail, Lock, ArrowLeft } from 'lucide-react';

export default function PasswordReset() {
    const [step, setStep] = useState('email');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [otpTimer, setOtpTimer] = useState(600);

    const API_URL = 'http://localhost:8080/api/auth/password';

    useEffect(() => {
        if (step === 'otp' && otpTimer > 0) {
            const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [otpTimer, step]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleSendOtp = async () => {
        setError('');
        if (!email) {
            setError('Email is required');
            return;
        }
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/send-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setMessage('OTP sent to your email');
                setStep('otp');
                setOtpTimer(600);
            } else {
                setError('Failed to send OTP');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        setError('');
        if (otp.length !== 6) {
            setError('OTP must be 6 digits');
            return;
        }
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp }),
            });

            const data = await response.json();

            if (response.ok && data.verified) {
                setMessage('OTP verified successfully');
                setStep('password');
            } else {
                setError(data.message || 'Invalid OTP');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            setError('Password must contain uppercase, lowercase, number, and special character');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/reset`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, newPassword: password }),
            });

            if (response.ok) {
                setMessage('Password reset successful! Redirecting to login...');
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            } else {
                setError('Failed to reset password');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        setError('');
        setMessage('');
        if (step === 'otp') setStep('email');
        else if (step === 'password') setStep('otp');
    };

    const styles = {
        container: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            background: 'var(--surface)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
        },


        card: {
            width: '100%',
            maxWidth: '28rem',
            background: 'white',
            borderRadius: '0.75rem',
            padding: '2rem',
        },
        header: {
            marginBottom: '2rem',
        },
        title: {
            fontSize: '1.875rem',
            fontWeight: '700',
            color: 'var(--text-primary)',
            marginBottom: '0.5rem',
        },
        subtitle: {
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
        },
        alert: {
            padding: '0.75rem',
            borderRadius: '0.5rem',
            marginBottom: '1rem',
            fontSize: '0.875rem',
            border: '1px solid',
        },
        alertSuccess: {
            backgroundColor: '#dcfce7',
            color: '#166534',
            borderColor: '#86efac',
        },
        alertError: {
            backgroundColor: '#fee2e2',
            color: '#991b1b',
            borderColor: '#fca5a5',
        },
        formGroup: {
            marginBottom: '1.25rem',
        },
        label: {
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: 'var(--text-secondary)',
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
            letterSpacing: '0.025em',
        },
        inputWrapper: {
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
        },
        input: {
            width: '100%',
            padding: '0.75rem 1rem 0.75rem 2.5rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            background: 'white',
            fontSize: '0.875rem',
            color: '#1f2937',
            fontFamily: 'inherit',
            outline: 'none',
            transition: 'all 0.3s ease',
        },
        button: {
            width: '100%',
            padding: '0.75rem 1rem',
            border: 'none',
            borderRadius: '0.5rem',
            backgroundColor: '#22c55e',
            color: 'white',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
        },
        buttonSecondary: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            border: 'none',
            background: 'transparent',
            color: '#22c55e',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'color 0.3s ease',
        },
        helperText: {
            fontSize: '0.75rem',
            color: '#6b7280',
            marginTop: '0.5rem',
        },
        footer: {
            marginTop: '2rem',
            textAlign: 'center',
            fontSize: '0.875rem',
            color: '#6b7280',
        },
        footerLink: {
            color: 'var(--primary)',
            fontWeight: '600',
            textDecoration: 'none',
            cursor: 'pointer',
        },
        spaceY4: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
        },
        timer: {
            textAlign: 'right',
            fontSize: '0.75rem',
            color: '#6b7280',
            marginTop: '0.5rem',
        },
        timerText: {
            fontWeight: '600',
            color: '#dc2626',
        },
    };

    return (
        <>
            <style>{`
                input:focus {
                    border-color: var(--primary) !important;
                    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1) !important;
                }
            `}</style>
            <div style={styles.container}>
                <div style={styles.card}>
                    <div style={styles.header}>
                        <h1 style={styles.title}>
                            {step === 'email' && 'Reset Password'}
                            {step === 'otp' && 'Verify OTP'}
                            {step === 'password' && 'New Password'}
                        </h1>
                        <p style={styles.subtitle}>
                            {step === 'email' && 'Enter your email to receive an OTP'}
                            {step === 'otp' && `Enter the OTP sent to ${email}`}
                            {step === 'password' && 'Create a strong new password'}
                        </p>
                    </div>

                    {message && (
                        <div style={{ ...styles.alert, ...styles.alertSuccess }}>
                            {message}
                        </div>
                    )}
                    {error && (
                        <div style={{ ...styles.alert, ...styles.alertError }}>
                            {error}
                        </div>
                    )}

                    {step === 'email' && (
                        <div style={styles.spaceY4}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Work Email</label>
                                <div style={styles.inputWrapper}>
                                    <Mail size={20} style={{ position: 'absolute', left: '0.75rem', color: '#9ca3af' }} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="your@email.com"
                                        style={styles.input}
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleSendOtp}
                                disabled={loading}
                                style={{ ...styles.button, opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
                            >
                                {loading ? 'Sending...' : 'Send OTP'}
                            </button>
                        </div>
                    )}

                    {step === 'otp' && (
                        <div style={styles.spaceY4}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Enter OTP</label>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                                    placeholder="000000"
                                    maxLength="6"
                                    style={{ ...styles.input, textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.1em', fontFamily: 'monospace' }}
                                />
                                <div style={styles.timer}>
                                    Expires in: <span style={styles.timerText}>{formatTime(otpTimer)}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleVerifyOtp}
                                disabled={loading || otp.length !== 6}
                                style={{ ...styles.button, opacity: loading || otp.length !== 6 ? 0.6 : 1, cursor: loading || otp.length !== 6 ? 'not-allowed' : 'pointer' }}
                            >
                                {loading ? 'Verifying...' : 'Verify OTP'}
                            </button>

                            <button onClick={handleBack} style={styles.buttonSecondary}>
                                <ArrowLeft size={18} /> Back
                            </button>
                        </div>
                    )}

                    {step === 'password' && (
                        <div style={styles.spaceY4}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>New Password</label>
                                <div style={styles.inputWrapper}>
                                    <Lock size={20} style={{ position: 'absolute', left: '0.75rem', color: '#9ca3af' }} />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        style={styles.input}
                                    />
                                </div>
                                <p style={styles.helperText}>Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char</p>
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Confirm Password</label>
                                <div style={styles.inputWrapper}>
                                    <Lock size={20} style={{ position: 'absolute', left: '0.75rem', color: '#9ca3af' }} />
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        style={styles.input}
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleResetPassword}
                                disabled={loading}
                                style={{ ...styles.button, opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
                            >
                                {loading ? 'Resetting...' : 'Reset Password'}
                            </button>

                            <button onClick={handleBack} style={styles.buttonSecondary}>
                                <ArrowLeft size={18} /> Back
                            </button>
                        </div>
                    )}

                    <div style={styles.footer}>
                        Remember your password? <a href="/" style={styles.footerLink}>Sign In</a>
                    </div>
                </div>
            </div>
        </>
    );
}