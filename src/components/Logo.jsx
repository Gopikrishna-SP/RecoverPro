const Logo = () => {
    return (
        <>
            <style>{`
        .logo-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
      }
        .logo-text {
            margin-left: 10px;
        `}
            </style>

            <div className="logo-icon">
                <svg
                    viewBox="0 0 229 229"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ width: 28, height: 28 }}
                >
                    {/* Outer shield - blue fill with teal outline */}
                    <path
                        d="M183.4,45.9l-26.5,26.5c0.7,0.5,1.2,1,1.6,1.6c15.4,15.3,23.2,33.8,23.2,55.5c0,21.7-7.7,40.2-23.2,55.5
           c-15.3,15.3-33.8,23-55.3,23c-21.7,0-40.2-7.7-55.5-23c-0.6-0.6-1.3-1.3-1.9-1.9l26.5-26.3c-0.5-0.5-1-1.1-1.5-1.8
           c-15.3-15.3-23-33.8-23-55.5s7.7-40.2,23-55.6c15.3-15.3,33.8-23,55.5-23c21.6,0,40.1,7.7,55.5,23C182.1,44.6,182.7,45.3,183.4,45.9
        z"
                        fill="#2563EB"
                        stroke="#14B8A6"   // Teal outline
                        strokeWidth="4"
                    />

                    {/* Middle diagonal line - same thickness as outline */}
                    <path
                        d="M72.1,156.8l84.6-84.6"
                        fill="none"
                        stroke="#14B8A6"
                        strokeWidth="4"    // Same as outer outline
                        strokeLinecap="round" // Optional for smooth ends
                    />
                </svg>
                <span
                    className="logo-text"
                    style={{
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                        background: 'linear-gradient(90deg, #2563EB 50%, #14B8A6 50%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    RecoverPro
                </span>
            </div>
        </>

    )
};

export default Logo;
