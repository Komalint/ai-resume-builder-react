import React from "react";

const EducationPreview = ({ resumeInfo }) => {
  return (
    <div >
      {/* Section Title */}
      <h3 className="font-bold text-lg uppercase" style={{ color: resumeInfo?.themeColor }}>
        Education
      </h3>
      <hr className="border-t-2 border-black my-0.5" style={{ borderColor: resumeInfo?.themeColor }}/>

      {resumeInfo?.education?.map((edu, index) => (
        <div key={index} className="mt-2 font-normal">

          {/* Degree */}
          <h4 className="font-semibold text-sm" style={{ color: resumeInfo?.themeColor }}>
            {edu.degree} 
          </h4>
          <h4 className="font-semibold text-sm" >
            {edu.stream}
          </h4>

          {/* Institute + Location + Year */}
          <p className="text-xs text-gray-700">
            {edu.institute}, {edu.city}, {edu.state}, {edu.year}
          </p>

          {/* Score */}
          <p className="text-xs text-gray-700">
            {edu.score}
          </p>

        </div>
      ))}
      <hr className='my-3'/>
    </div>
  );
};

export default EducationPreview;
