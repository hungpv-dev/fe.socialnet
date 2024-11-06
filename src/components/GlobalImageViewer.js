import React, { useState, useEffect } from 'react';
import ImageViewer from './ImageViewer';

function GlobalImageViewer() {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const handleImageClick = (event) => {
      if (event.target.classList.contains('show-image')) {
        event.preventDefault();
        let imgSrc = event.target.src;
        if (!imgSrc) {
          const img = event.target.querySelector('img');
          if (img) {
            imgSrc = img.src;
          }
        }
        setSelectedImage(imgSrc);
      }
    };

    document.addEventListener('click', handleImageClick);

    return () => {
      document.removeEventListener('click', handleImageClick);
    };
  }, []);

  return (
    <ImageViewer
      open={!!selectedImage}
      onClose={() => setSelectedImage(null)}
      imageSrc={selectedImage}
    />
  );
}

export default GlobalImageViewer;