import React, { useEffect } from "react";

const ImagePreloader = ({ images }) => {
  useEffect(() => {
    const preLoadImages = images?.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });

    return () => {
      preLoadImages.forEach((img) => img.onload = null);
    };
  }, [images]);

  return null; 
};

export default ImagePreloader;