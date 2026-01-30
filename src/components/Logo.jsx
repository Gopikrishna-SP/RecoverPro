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
          margin-left: 4px;
        }
      `}</style>

      <div className="logo-icon" style={{ gap: "4px" }}>
        <div style={{ background: "#00A550", padding: "3px", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 229 229"
            width="16"  
            height="16"
            shape-rendering="geometricPrecision"
          >
            <path
              d="M183.4,45.9l-26.5,26.5c15.4,15.3,23.2,33.8,23.2,55.5
         c0,21.7-7.7,40.2-23.2,55.5c-15.3,15.3-33.8,23-55.3,23
         c-21.7,0-40.2-7.7-55.5-23l26.5-26.3
         c-15.3-15.3-23-33.8-23-55.5s7.7-40.2,23-55.6
         c15.3-15.3,33.8-23,55.5-23c21.6,0,40.1,7.7,55.5,23z"
              fill="#FFFFFF"
            />

            <line
              x1="40"
              y1="189"
              x2="189"
              y2="40"
              stroke="#FFFFFF"
              strokeWidth="16"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <span
          className="logo-text"
          style={{
            fontWeight: "bold",
            fontSize: "1.1rem",
            color: "#334155",
          }}
        >
          RecoverPro
        </span>
      </div>
    </>
  );
};

export default Logo;


