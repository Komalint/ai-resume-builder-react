import { Button } from "@/components/ui/button";
import { Brain, LoaderPinwheel } from "lucide-react";
import React, { useState } from "react";
import { 
  Editor, EditorProvider, BtnBold, BtnBulletList, 
  BtnItalic, BtnNumberedList, BtnStrikeThrough, 
  BtnUnderline, Separator, Toolbar 
} from "react-simple-wysiwyg";
import { generateTextAIContent } from "./../../../../service/AIModel";
import { toast } from "sonner";

const ProjectRichTextEditor = ({ defaultValue, onRichTextEditorChange, projectTitle, onTechStackGen }) => {
  const [value, setValue] = useState(defaultValue || "");
  const [loading, setLoading] = useState(false);

  const GenerateProjectContent = async () => {
    if (!projectTitle) {
      toast("Please enter a Project Title first");
      return;
    }
    setLoading(true);

    const PROMPT = `Project Title: ${projectTitle}. 
    Generate a professional project description and a relevant tech stack.
    Return ONLY valid JSON with these keys: 
    "description": (array of 3-4 professional bullet points using action verbs),
    "techStack": (a single string of 7-8 comma-separated technologies used).
    Rules: Third person only, ATS-friendly, no extra text outside JSON.`;

    try {
      const result = await generateTextAIContent(PROMPT);
      const jsonRes = JSON.parse(result); 
      
      // Convert Array of strings to HTML List for the editor
      const htmlList = `<ul>${jsonRes.description.map(point => `<li>${point}</li>`).join('')}</ul>`;
      
      setValue(htmlList);
      onRichTextEditorChange(htmlList); // Updates description in Project.jsx
      
      if (jsonRes.techStack) {
        onTechStackGen(jsonRes.techStack); // Updates techStack input in Project.jsx
      }
      
      toast("AI Content Generated!");
    } catch (error) {
      console.error(error);
      toast("AI failed to generate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <label className="text-xs font-bold">Project Summary</label>
        <Button 
          type="button" variant="outline" size="sm" 
          onClick={GenerateProjectContent} disabled={loading}
          className="text-purple-600 border-purple-600 flex gap-2"
        >
          {loading ? <LoaderPinwheel className="animate-spin h-4 w-4" /> : <><Brain className="h-4 w-4"/> Generate From AI</>}
        </Button>
      </div>
      <EditorProvider>
        <Editor value={value} onChange={(e) => { 
            setValue(e.target.value); 
            onRichTextEditorChange(e.target.value); 
        }}>
          <Toolbar>
            <BtnBold /><BtnItalic /><BtnUnderline /><BtnStrikeThrough /><Separator />
            <BtnNumberedList /><BtnBulletList />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default ProjectRichTextEditor;