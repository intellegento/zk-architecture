import React, { useState } from "react";
import NavLink from "../NavLink";
import ProjectIntroSection from "./ProjectIntroSection";
import ThreeComponents from "./ThreeComponents";
import SquarePhotos from "./SquarePhotos";
import ConceptSection from "./ConceptSection";
import ImageSlider from "./ImageSlider";
import DetailPageContentSection from "./DetailPageContentSection";
import PlanningSolutionSection from "./PlanningSolutionSection";
import ValueSection from "./ValueSection";
import TeamSection from "./TeamSection";
import DescriptionSection from "./DescriptionSection";
import ArrowsSection from "./ArrowsSection";
import styles from "./styles.module.scss";

const ProjectsDetailComponent = ({data}) => {  
  return (
    <>
    { data && data?.nextLink && <ProjectIntroSection data={data}/> }
    { data?.squareBigMedia && data?.squareSmallMedia && <SquarePhotos data={data}/> }
    { data?.storyTitle && data?.storyText && data?.locationTitle && data?.locationImage && data?.mapImage && <ThreeComponents data={data} /> }
    { data?.conceptTitle && data?.conceptText && data?.conceptImages && <ConceptSection data={data} /> }
    { data?.imagesSlider?.length > 0 && <ImageSlider data={data?.imagesSlider} /> }
    { data?.detailedInfoProject && data?.detailedInfoProject.map((item, index) => (
      <DetailPageContentSection key={index} data={item} />
    ))}

    {/* <DetailPageContentSection data={data?.planningSolution} /> */}
    {/* <PlanningSolutionSection data={data?.planningSolution} /> */}
    {/* <ValueSection data={data?.value} />
    <TeamSection data={data?.team} /> */}

    { data?.projectDescriptions && <DescriptionSection data={data?.projectDescriptions}/> }
    { data?.prevLink && data?.nextLink && <ArrowsSection data={data} /> }
    </>
  );
};

export default ProjectsDetailComponent;
