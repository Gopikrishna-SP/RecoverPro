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
        }
      `}</style>

      <div className="logo-icon">
        <svg
        viewBox="0 0 229 229"
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        shapeRendering="geometricPrecision"
        >
        <defs>
            <clipPath id="shieldClip">
            <path
                d="M183.4,45.9l-26.5,26.5c15.4,15.3,23.2,33.8,23.2,55.5
                c0,21.7-7.7,40.2-23.2,55.5c-15.3,15.3-33.8,23-55.3,23
                c-21.7,0-40.2-7.7-55.5-23l26.5-26.3
                c-15.3-15.3-23-33.8-23-55.5s7.7-40.2,23-55.6
                c15.3-15.3,33.8-23,55.5-23c21.6,0,40.1,7.7,55.5,23z"
            />
            </clipPath>

            {/* Inset shield clip (prevents bleed) */}
        <clipPath id="shieldClipInset">
        <path
            d="M180.4,48.9l-24.5,24.5c14.2,14.2,21.4,31.6,21.4,51.1
            c0,19.9-7.2,37.1-21.4,51.3c-14.2,14.2-31.6,21.4-51.1,21.4
            c-19.9,0-37.1-7.2-51.3-21.4l24.5-24.3
            c-14.2-14.2-21.4-31.6-21.4-51.3s7.2-37.1,21.4-51.3
            c14.2-14.2,31.6-21.4,51.3-21.4c19.7,0,37.1,7.2,51.1,21.4z"
        />
        </clipPath>


            <clipPath id="diagBlue">
            <polygon points="0,0 229,0 0,229" />
            </clipPath>

            <clipPath id="diagTeal">
            <polygon points="229,0 229,229 0,229" />
            </clipPath>
        </defs>

        {/* BLUE HALF */}
        <path
            d="M183.4,45.9l-26.5,26.5c15.4,15.3,23.2,33.8,23.2,55.5
            c0,21.7-7.7,40.2-23.2,55.5c-15.3,15.3-33.8,23-55.3,23
            c-21.7,0-40.2-7.7-55.5-23l26.5-26.3
            c-15.3-15.3-23-33.8-23-55.5s7.7-40.2,23-55.6
            c15.3-15.3,33.8-23,55.5-23c21.6,0,40.1,7.7,55.5,23z"
            clipPath="url(#diagBlue)"
            fill="#2563EB"
        />

        {/* TEAL HALF */}
        <path
            d="M183.4,45.9l-26.5,26.5c15.4,15.3,23.2,33.8,23.2,55.5
            c0,21.7-7.7,40.2-23.2,55.5c-15.3,15.3-33.8,23-55.3,23
            c-21.7,0-40.2-7.7-55.5-23l26.5-26.3
            c-15.3-15.3-23-33.8-23-55.5s7.7-40.2,23-55.6
            c15.3-15.3,33.8-23,55.5-23c21.6,0,40.1,7.7,55.5,23z"
            clipPath="url(#diagTeal)"
            fill="#14B8A6"
        />
        </svg>



        <span
          className="logo-text"
          style={{
            fontWeight: "bold",
            fontSize: "1.2rem",
            background: "linear-gradient(90deg, #2563EB 50%, #14B8A6 50%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          RecoverPro
        </span>
      </div>
    </>
  );
};

export default Logo;
