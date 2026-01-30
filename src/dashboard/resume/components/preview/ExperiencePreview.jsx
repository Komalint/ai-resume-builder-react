import React from "react";

const ExperiencePreview = ({ resumeInfo }) => {
    return (
        <div>
            <h3
                className="font-bold text-lg uppercase"
                style={{ fontFamily: "Roboto, sans-serif" , color: resumeInfo?.themeColor}}
            >
                Experience
            </h3>

            <hr className="border-t-2 border-black my-0.5"
            style={{ borderColor: resumeInfo?.themeColor }} />

            {resumeInfo?.experience?.map((experience, index) => (
                <div
                    key={`${experience.companyName || "exp"}-${index}`}
                    className="mt-2 my-4"
                >

                    {/* Job Title */}
                    <h4 className="font-semibold text-sm" style={{ color: resumeInfo?.themeColor }}>
                        {experience.title}
                    </h4>

                    <div className="flex justify-between">
                        {/* Company + Location */}
                        <p className="text-xs text-gray-600 italic">
                            {experience.companyName}, {experience.city}, {experience.state}
                        </p>

                        {/* Date Range */}
                        <p className="text-xs text-gray-600">
                            {experience.startDate} to  {" "}
                            {experience.currentlyWorking ? "Present" : experience.endDate}
                        </p>
                    </div>

                    {/* Work Summary (string only) */}
                    {experience.workSummary && (
                        <div
                            className="mt-1 text-sm text-gray-700 leading-[1.3]
                        [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mt-1
                        [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mt-1
                        [&_li]:mb-0.5
                        [&_li_p]:m-0
                        [&_li]:leading-[1.3]"
                            dangerouslySetInnerHTML={{ __html: experience.workSummary }}
                        />
                    )}




                </div>
            ))}

            <hr className='my-3' />
        </div>
    );
};

export default ExperiencePreview;
