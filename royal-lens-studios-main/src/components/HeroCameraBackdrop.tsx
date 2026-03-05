const HeroCameraBackdrop = () => {
  return (
    <div aria-hidden="true" className="hero-camera-backdrop">
      <div className="hero-camera-stage">
        <span className="hero-camera-glow" />
        <span className="hero-camera-floor" />

        <div className="hero-camera-model">
          <span className="hero-camera-topbar" />
          <span className="hero-camera-viewfinder" />
          <span className="hero-camera-grip" />
          <span className="hero-camera-shutter" />
          <span className="hero-camera-tag" />
          <span className="hero-camera-flash" />

          <div className="hero-camera-lens">
            <span className="hero-camera-lens-inner" />
            <span className="hero-camera-aperture" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCameraBackdrop;
