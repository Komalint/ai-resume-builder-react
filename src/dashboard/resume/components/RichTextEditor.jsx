import { Button } from "@/components/ui/button";
import ResumeInfoContext from "@/context/ResumeInfoContext";
import { Brain, LoaderPinwheel } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";

import {
  Editor,
  EditorProvider,
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  HtmlButton,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { generateTextAIContent } from "./../../../../service/AIModel";
import { toast } from "sonner";

const PROMPT = `You are a senior technical interviewer and ATS-optimization expert with 10+ years of experience reviewing software engineering resumes.

Generate EXACTLY 3 to 4 resume bullet points for the role below.

Role Details:
- Job Title: {jobTitle}
- Company: {companyName}

STRICT RULES:
- Write in third person only (NO I / we / my)
- Start each bullet with a strong action verb
- Focus on WHAT was built, HOW it was built, and the IMPACT
- Mention relevant tools, frameworks, or technologies when appropriate
- Each bullet must be concise (1–2 lines max)
- Avoid generic phrases (e.g., “worked on”, “responsible for”)
- Do NOT fabricate metrics unless they are commonly acceptable (performance, scalability, reliability)
- Language must be ATS-friendly and recruiter-readable

OUTPUT FORMAT (MANDATORY):
- Return ONLY valid HTML
- Wrap bullets in <ul> and <li> tags
- Do NOT include headings, explanations, markdown, or code blocks
- Do NOT include extra whitespace or commentary

`

const RichTextEditor = ({ defaultValue, onRichTextEditorChange, index }) => {

  const [value, setValue] = useState("");

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [aiLoading, setAiLoading] = useState(false);


  useEffect(() => {
    setValue(defaultValue || "");
  }, [defaultValue, index]);


 

  useEffect(() => {
    if (resumeInfo?.experience?.[index]?.workSummary) {
      setValue(resumeInfo.experience[index].workSummary);
    }
  }, [resumeInfo?.experience]);


  const GenerateSummaryFromAI = async () => {
    if (aiLoading) return;               // ⛔ prevent double click
    if (!resumeInfo?.experience?.[index]) {
      toast("Fill experience details first");
      return;
    }


    setAiLoading(true);                  // 🔒 lock button
    try {
      const prompt = PROMPT
        .replace("{jobTitle}", resumeInfo.experience[index].title)
        .replace("{companyName}", resumeInfo.experience[index].companyName || "");

      const summaryText = await generateTextAIContent(prompt);

      setValue(summaryText);              // update editor
      onRichTextEditorChange(summaryText);
    } catch (error) {
      if (error.message === "RATE_LIMIT") {
        toast("AI limit reached. Using sample bullets.");

        const mockHTML = `
      <ul>
        <li>Developed and maintained scalable web applications using React and Node.js.</li>
        <li>Implemented responsive UI components optimized for performance.</li>
        <li>Integrated RESTful APIs to support front-end features.</li>
        <li>Collaborated with cross-functional teams to deliver features on time.</li>
      </ul>
    `;

        setValue(mockHTML);
        onRichTextEditorChange(mockHTML);
      } else {
        toast("AI generation failed");
      }
    } finally {
      setAiLoading(false);                // 🔓 unlock button
    }
  };


  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="text-xs"> Summary </label>
        <Button
          variant="outline"
          size="sm"
          onClick={GenerateSummaryFromAI}
          disabled={aiLoading}
          className="flex gap-2 border mb-2 text-purple-600"
        >
          {aiLoading ? (
            <LoaderPinwheel className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Brain className="h-4 w-4" />
              <span>Generate From AI</span>
            </>
          )}
        </Button>

      </div>
      <EditorProvider>
        <Editor value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e.target.value)
          }}>
          <Toolbar>
            <BtnUndo />
            <BtnRedo />
            <Separator />
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
            <Separator />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor;
