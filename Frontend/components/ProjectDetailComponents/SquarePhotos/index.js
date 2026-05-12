import React, { useEffect, useState } from "react";
import { parseHtml } from "../../../lib/parser";
import Slider from "../Slider";
import styles from "./styles.module.scss";

const SquarePhotos = ({ data }) => {
  const bigMedia = data.squareBigMedia
    ? Array.isArray(data.squareBigMedia)
      ? data.squareBigMedia
      : [data.squareBigMedia]
    : [];

  const smallMedia = Array.isArray(data.squareSmallMedia)
    ? data.squareSmallMedia
    : [];

  const imagesArray = bigMedia?.map((big) => ({
    bigPhoto: big?.media,
    smallPhotos: smallMedia
      ?.map((small) => small?.media),
  }));

  return (
    <>
      {imagesArray?.map((block, blockIndex) => (
        <section key={blockIndex} className={styles.squarePhotos}>
          <div className={styles.squarePhotos__wrap}>
            <div className={styles.squarePhotos__small}>
              {block?.smallPhotos?.map((item, index) => (
                <div key={index} className={styles.squarePhotos__small__item}>
                  <img src={item?.url} alt={`small_${item?.id}`} />
                </div>
              ))}
            </div>
            <div className={styles.squarePhotos__big}>
              <div className={styles.squarePhotos__big__item}>
                <img 
                  src={block?.bigPhoto?.url}
                  alt={block?.bigPhoto?.name}
                />
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export default SquarePhotos;
