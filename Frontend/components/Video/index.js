import React from "react";
import { getStrapiMedia } from "../../lib/strapi";

const Video = ({ className, video }) => {
    const stopVideo = (e) => {
        e.target.currentTime = 0;
        e.target.pause();
    }
        
    const playVideo = (e) => {
        e.target.currentTime = 0;
        e.target.play();
    }
    return (
        <div className={className}>
        {
            <video
            muted
            autoPlay
            onMouseOver={playVideo}
            onMouseOut={stopVideo}
            playsInline
            >
            <source src={getStrapiMedia(video.url)} type="video/mp4" />
            </video>
        }
        </div>
    );
};

export default Video;
