import React, { useEffect, useState } from "react";


const images = [
  "/assets/71.webp",
  "/assets/AW_24_D.webp",
  "/assets/Summer_banner_finalll.webp",
];

export default function WallpaperCarousel() {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  // Auto slide every 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 8000);
    return () => clearTimeout(timer);
  }, [current]);

  const nextSlide = () => setCurrent((current + 1) % length);
  const prevSlide = () => setCurrent((current - 1 + length) % length);

  return (
    <div style={styles.carousel}>
      {images.map((img, index) => (
        <div
          key={index}
          style={{
            ...styles.slide,
            backgroundImage: `url(${img})`,
            opacity: index === current ? 1 : 0,
            zIndex: index === current ? 1 : 0,
          }}
        />
      ))}

      <button onClick={prevSlide} style={{ ...styles.btn, left: '20px' }}>&#10094;</button>
      <button onClick={nextSlide} style={{ ...styles.btn, right: '20px' }}>&#10095;</button>
    </div>
  );
}

const styles = {
  carousel: {
    position: 'relative',
    width: '100%',
    height: '80vh',
    overflow: 'hidden',
  },
  slide: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'opacity 1s ease-in-out',
  },
  btn: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '2rem',
    background: 'rgba(0,0,0,0.5)',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    zIndex: 2,
    padding: '0.5rem 1rem',
    borderRadius: '50%',
  }
};