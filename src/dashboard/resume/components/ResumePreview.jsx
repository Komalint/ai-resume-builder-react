import ResumeInfoContext from '@/context/ResumeInfoContext';
import React, { useContext } from 'react';

import PersonalDetailPreview from './preview/PersonalDetailPreview';
import SummaryPreview from './preview/SummaryPreview';
import ExperiencePreview from './preview/ExperiencePreview';
import EducationPreview from './preview/EducationalPreview';
import ProjectPreview from './preview/ProjectPreview';
import SkillPreview from './preview/SkillPreview';

const ResumePreview = () => {
  const { resumeInfo } = useContext(ResumeInfoContext);

  return (
    /* OUTER WRAPPER (center + background) */
    <div className=" flex justify-center">

      {/* A4 PAGE */}
      <div
        className="bg-white shadow-lg border-t-8 resume-page"
        style={{
          borderColor: resumeInfo?.themeColor,
          width: "210mm",        // A4 width
          minHeight: "297mm",    // A4 height
          padding: "18mm",       // Real resume padding
        }}
      >
        {/* Personal Details */}
        <PersonalDetailPreview resumeInfo={resumeInfo} />


        {/* Summary Section */}
        <SummaryPreview resumeInfo={resumeInfo} />


        {/* Experience Section */}
        <ExperiencePreview resumeInfo={resumeInfo} />


        {/* Education Section */}
        <EducationPreview resumeInfo={resumeInfo} />

        {/* Project Section */}
        <ProjectPreview resumeInfo={resumeInfo} />

        {/* Skills Section */}
        <SkillPreview resumeInfo={resumeInfo} />
      </div>

    </div>
  );
};

export default ResumePreview;
