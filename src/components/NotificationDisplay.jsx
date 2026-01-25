import React, { useState, useEffect } from 'react';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle, Bell } from 'lucide-react';

const NotificationDisplay = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    // Fetch immediately
    fetchNotifications();
    fetchUnreadCount();
    
    // Then fetch every 10 seconds
    const interval = setInterval(() => {
      fetchNotifications();
      fetchUnreadCount();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:8080/api/notifications/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setNotifications(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:8080/api/notifications/me/unread-count', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const count = await response.json();
        setUnreadCount(typeof count === 'number' ? count : 0);
      }
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem('authToken');
      await fetch(`http://localhost:8080/api/notifications/me/read/${notificationId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem('authToken');
      await fetch('http://localhost:8080/api/notifications/me/read-all', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };


  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'error':
        return <AlertCircle className="w-5 h-5" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getIconColor = (type) => {
    switch (type) {
      case 'success':
        return '#10b981';
      case 'error':
        return '#ef4444';
      case 'warning':
        return '#f59e0b';
      default:
        return '#3b82f6';
    }
  };

  return (
    <>
      <button 
        onClick={() => setShowPanel(!showPanel)} 
        style={{ 
          background: 'none', 
          border: 'none', 
          position: 'relative', 
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40px',
          height: '40px',
          borderRadius: '8px',
          transition: 'background-color 0.2s ease',
          color: '#64748b'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '-4px',
            right: '-4px',
            width: '20px',
            height: '20px',
            backgroundColor: '#ef4444',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '12px',
            fontWeight: '700',
            border: '2px solid white'
          }}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {showPanel && (
        <div 
          style={{ 
            zIndex: 9999, 
            position: 'fixed', 
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            backdropFilter: 'blur(15px)',
            WebkitBackdropFilter: 'blur(15px)',
            backgroundColor: 'rgba(15, 23, 42, 0.7)',
            animation: 'fadeIn 0.2s ease'
          }} 
          onClick={() => setShowPanel(false)}
        >
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideIn {
              from {
                opacity: 0;
                transform: scale(0.95);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }
          `}</style>
          <div 
            style={{ 
              zIndex: 10000, 
              width: '480px',
              maxWidth: 'calc(100% - 32px)',
              maxHeight: '600px', 
              backgroundColor: '#ffffff', 
              border: '1px solid #e2e8f0', 
              borderRadius: '16px', 
              overflow: 'hidden', 
              display: 'flex', 
              flexDirection: 'column',
              boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 10px 10px -5px rgba(15, 23, 42, 0.04)',
              animation: 'slideIn 0.3s ease'
            }} 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ 
              padding: '20px 24px', 
              borderBottom: '1px solid #e2e8f0', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              backgroundColor: '#ffffff'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '8px',
                  backgroundColor: '#f0f9ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Bell size={18} style={{ color: '#0284c7' }} />
                </div>
                <h2 style={{ fontWeight: '700', color: '#0f172a', fontSize: '16px', margin: 0 }}>
                  Notifications
                </h2>
              </div>
              <button 
                onClick={() => setShowPanel(false)} 
                style={{ 
                  color: '#94a3b8', 
                  padding: '6px', 
                  border: 'none', 
                  background: 'none', 
                  cursor: 'pointer',
                  display: 'flex',
                  borderRadius: '6px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f1f5f9';
                  e.currentTarget.style.color = '#475569';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#94a3b8';
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div style={{ 
              overflowY: 'auto', 
              flex: 1,
              backgroundColor: '#ffffff'
            }}>
              {notifications.length === 0 ? (
                <div style={{ 
                  padding: '60px 24px', 
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '12px',
                    backgroundColor: '#f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px'
                  }}>
                    <Bell size={28} style={{ color: '#cbd5e1' }} />
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0, fontWeight: '500' }}>
                    No notifications yet
                  </p>
                  <p style={{ color: '#cbd5e1', fontSize: '13px', margin: '4px 0 0 0' }}>
                    You're all caught up!
                  </p>
                </div>
              ) : (
                notifications.map((notification, idx) => (
                  <div
                    key={notification.id}
                    style={{ 
                      padding: '16px 24px', 
                      borderBottom: idx !== notifications.length - 1 ? '1px solid #f1f5f9' : 'none',
                      borderLeft: `4px solid ${getIconColor(notification.type)}`,
                      backgroundColor: notification.read ? '#ffffff' : '#f0f9ff',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!notification.read) {
                        e.currentTarget.style.backgroundColor = '#e0f2fe';
                      } else {
                        e.currentTarget.style.backgroundColor = '#f8fafc';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = notification.read ? '#ffffff' : '#f0f9ff';
                    }}
                    onClick={() => !notification.read && markAsRead(notification.id)}
                  >
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <div style={{ color: getIconColor(notification.type), flexShrink: 0, marginTop: '2px' }}>
                        {getIcon(notification.type)}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                          <h3 style={{ 
                            fontWeight: notification.read ? '500' : '700', 
                            fontSize: '14px', 
                            color: notification.read ? '#64748b' : '#0f172a',
                            margin: 0
                          }}>
                            {notification.title}
                          </h3>
                          
                        </div>
                        <p style={{ 
                          fontSize: '13px', 
                          marginTop: '6px', 
                          color: notification.read ? '#94a3b8' : '#475569',
                          margin: '6px 0 0 0'
                        }}>
                          {notification.message}
                        </p>
                        {notification.createdAt && (
                          <p style={{ 
                            fontSize: '12px', 
                            marginTop: '8px', 
                            color: '#cbd5e1',
                            margin: '8px 0 0 0'
                          }}>
                            {new Date(notification.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div style={{ 
                padding: '14px 24px', 
                borderTop: '1px solid #e2e8f0', 
                backgroundColor: '#ffffff'
              }}>
                <button
                  onClick={markAllAsRead}
                  style={{ 
                    width: '100%', 
                    fontSize: '14px', 
                    color: '#0284c7', 
                    border: 'none', 
                    background: 'none', 
                    cursor: 'pointer',
                    fontWeight: '600',
                    padding: '8px 0',
                    borderRadius: '6px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f0f9ff';
                    e.currentTarget.style.color = '#0369a1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#0284c7';
                  }}
                >
                  Mark all as read
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationDisplay;