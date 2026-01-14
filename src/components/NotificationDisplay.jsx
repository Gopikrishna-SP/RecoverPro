import React, { useState, useEffect } from 'react';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle, Bell } from 'lucide-react';

const NotificationDisplay = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    // Dummy notification
    const dummyNotifications = [
      {
        id: 1,
        title: 'System Update',
        message: 'New version available. Please update your system.',
        type: 'info',
        read: false,
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        title: 'Success',
        message: 'Your changes have been saved successfully.',
        type: 'success',
        read: false,
        createdAt: new Date().toISOString()
      }
    ];
    
    setNotifications(dummyNotifications);
    setUnreadCount(dummyNotifications.filter(n => !n.read).length);
    
    const interval = setInterval(() => {
      fetchNotifications();
      fetchUnreadCount();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications/me');
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
      const response = await fetch('/api/notifications/me/unread-count');
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
      await fetch(`/api/notifications/me/read/${notificationId}`, {
        method: 'PATCH'
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
      await fetch('/api/notifications/me/read-all', {
        method: 'PATCH'
      });
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
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
          height: '40px'
        }}
      >
        <Bell size={20} color="#718096" />
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
            fontWeight: 'bold',
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
            inset: 0, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            backdropFilter: 'blur(4px)', 
            backgroundColor: 'rgba(0, 0, 0, 0.5)' 
          }} 
          onClick={() => setShowPanel(false)}
        >
          <div 
            style={{ 
              zIndex: 10000, 
              width: '480px', 
              maxHeight: '500px', 
              backgroundColor: '#1a2332', 
              border: '1px solid #2d3748', 
              borderRadius: '12px', 
              overflow: 'hidden', 
              display: 'flex', 
              flexDirection: 'column',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)'
            }} 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ 
              padding: '16px 24px', 
              borderBottom: '1px solid #2d3748', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              backgroundColor: '#141b27'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Info className="w-5 h-5" style={{ color: '#9ca3af' }} />
                <h2 style={{ fontWeight: '600', color: 'white', fontSize: '16px', margin: 0 }}>Notifications</h2>
              </div>
              <button 
                onClick={() => setShowPanel(false)} 
                style={{ 
                  color: '#9ca3af', 
                  padding: '4px', 
                  border: 'none', 
                  background: 'none', 
                  cursor: 'pointer',
                  display: 'flex'
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div style={{ 
              overflowY: 'auto', 
              flex: 1,
              backgroundColor: '#0f1419'
            }}>
              {notifications.length === 0 ? (
                <div style={{ 
                  padding: '40px 24px', 
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Info className="w-12 h-12" style={{ color: '#4b5563', marginBottom: '12px' }} />
                  <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>No notifications yet</p>
                </div>
              ) : (
                notifications.map(notification => (
                  <div
                    key={notification.id}
                    style={{ 
                      padding: '16px 24px', 
                      borderBottom: '1px solid #2d3748',
                      borderLeft: `3px solid ${getIconColor(notification.type)}`,
                      backgroundColor: notification.read ? '#0f1419' : '#1a2530',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => !notification.read && (e.target.style.backgroundColor = '#1f2a38')}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = notification.read ? '#0f1419' : '#1a2530')}
                    onClick={() => !notification.read && markAsRead(notification.id)}
                  >
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <div style={{ color: getIconColor(notification.type), flexShrink: 0, marginTop: '2px' }}>
                        {getIcon(notification.type)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                          <h3 style={{ 
                            fontWeight: notification.read ? '500' : '600', 
                            fontSize: '14px', 
                            color: notification.read ? '#9ca3af' : 'white',
                            margin: 0
                          }}>
                            {notification.title}
                          </h3>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            style={{ 
                              color: '#6b7280', 
                              border: 'none', 
                              background: 'none', 
                              cursor: 'pointer', 
                              padding: '0',
                              display: 'flex',
                              flexShrink: 0
                            }}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p style={{ 
                          fontSize: '13px', 
                          marginTop: '4px', 
                          color: notification.read ? '#6b7280' : '#d1d5db',
                          margin: 0
                        }}>
                          {notification.message}
                        </p>
                        {notification.createdAt && (
                          <p style={{ 
                            fontSize: '11px', 
                            marginTop: '6px', 
                            color: '#4b5563',
                            margin: 0
                          }}>
                            {new Date(notification.createdAt).toLocaleDateString()}
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
                padding: '12px 24px', 
                borderTop: '1px solid #2d3748', 
                backgroundColor: '#141b27'
              }}>
                <button
                  onClick={markAllAsRead}
                  style={{ 
                    width: '100%', 
                    fontSize: '13px', 
                    color: '#60a5fa', 
                    border: 'none', 
                    background: 'none', 
                    cursor: 'pointer',
                    fontWeight: '500',
                    padding: '8px 0'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#93c5fd'}
                  onMouseLeave={(e) => e.target.style.color = '#60a5fa'}
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