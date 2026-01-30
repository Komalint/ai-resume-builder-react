import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

const PersonalDetailPreview = ({ resumeInfo }) => {
  return (
    <div className="mb-3">
      {/* Name */}
      <h2
        className="font-bold text-2xl text-center tracking-wide"
        style={{ color: resumeInfo?.themeColor }}
      >
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>

      {/* Job Title */}
      <h3 className="text-sm text-center font-medium text-gray-700 mt-1">
        {resumeInfo?.jobTitle}
      </h3>

      {/* Contact Info */}
      <div
        className="flex flex-wrap justify-center gap-x-5 gap-y-1 mt-3 text-xs items-center"
        style={{ color: resumeInfo?.themeColor }}
      >
        {resumeInfo?.address && (
          <span className="flex items-center gap-1">
            <MapPin size={14} />
            {resumeInfo?.address}
          </span>
        )}

        {resumeInfo?.phone && (
          <span className="flex items-center gap-1">
            <Phone size={14} />
            {resumeInfo?.phone}
          </span>
        )}

        {resumeInfo?.email && (
          <span className="flex items-center gap-1">
            <Mail size={14} />
            {resumeInfo?.email}
          </span>
        )}
      </div>

      {/* Divider */}
      <hr
        className="mt-4 border-t"
        style={{ borderColor: resumeInfo?.themeColor }}
      />
    </div>
  );
};

export default PersonalDetailPreview;
