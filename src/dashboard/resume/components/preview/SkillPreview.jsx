import React from "react";

const SkillPreview = ({ resumeInfo }) => {
  const skills = resumeInfo?.skills;
  if (!skills || skills.length === 0) return null;

  return (
    <div className="mb-6">
      {/* Section Title */}
      <h2 className="text-lg font-bold uppercase border-gray-300"
      style={{ color: resumeInfo?.themeColor }}>
        SKILLS
      </h2>
      <hr className='border-t-2 border-black my-0.5' style={{ borderColor: resumeInfo?.themeColor }}/>

      {/* Each category in one line */}
      <div className="space-y-1 mt-1.5 ">
        {skills.map((skill) => (
          <div key={skill.id} className="text-gray-700 text-sm">
            <span className="font-medium">{skill.category}:</span>{" "}
            {skill.items.join(", ")}
          </div>
        ))}
      </div>

      <hr className='my-3'/>
    </div>
  );
};

export default SkillPreview;
