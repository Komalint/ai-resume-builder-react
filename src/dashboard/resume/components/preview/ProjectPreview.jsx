import React from "react";

const ProjectPreview = ({ resumeInfo }) => {
  return (
    <div className="mt-3">
      {/* Section Title */}
      <h3 className="font-bold text-lg uppercase" style={{ color: resumeInfo?.themeColor }}>
        Projects
      </h3>
      <hr className="border-t-2 border-black my-0.5" style={{ borderColor: resumeInfo?.themeColor }}/>

      {resumeInfo?.projects?.map((project, index) => (
        <div key={index} className="mt-2">

          {/* Project Title */}
          <h4 className="font-semibold text-sm">
            {project.title}
          </h4>

          {/* Tech Stack rendered as plain string */}
          {project?.techStack && (
            <p className="text-xs text-gray-700 italic">
              Tech Stack: {project.techStack}
            </p>
          )}

          {/* The Magic Fix: Using the same Tailwind variants as Experience */}
          {project?.description && (
            <div
              className="mt-1 text-sm text-gray-700 leading-[1.3] 
              [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mt-1 
              [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mt-1 
              [&_li]:mb-0.5 
              [&_li_p]:m-0 
              [&_li]:leading-[1.3]"
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
          )}
        </div>
      ))}
      <hr className='my-3'/>
    </div>
  );
};

export default ProjectPreview;