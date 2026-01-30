import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import ResumeInfoContext from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from 'sonner'
import { LiaBrainSolid } from "react-icons/lia"
import { LoaderPinwheel } from 'lucide-react'
import { generateAIContent } from './../../../../../service/AIModel'

const Summary = ({ enableNext }) => {

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const params = useParams()

  const [summary, setSummary] = useState("")
  const [loading, setLoading] = useState(false)
  const [aiGeneratedSummaryList, setAIGeneratedSummaryList] = useState(null)

  // FIX 1: Sync local state when resumeInfo is loaded from API
  useEffect(() => {
    if (resumeInfo?.summary && !summary) {
      setSummary(resumeInfo.summary);
    }
  }, [resumeInfo]);

  // FIX 2: Prevent the "Wipe-out"
  // Only update context if summary has a value AND it's different from context
  useEffect(() => {
    if (summary && summary !== resumeInfo?.summary) {
      setResumeInfo({
        ...resumeInfo,
        summary: summary
      });
    }
  }, [summary]);

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { data: { summary: summary } };

    GlobalApi.UpdateResumeDetail(params.resumeId, data)
      .then((res) => {
        enableNext(true);
        toast("Details saved successfully!");
      })
      .catch((err) => {
        console.error("SAVE ERROR:", err);
        toast("Failed to save summary", { type: "error" });
      }).finally(() => setLoading(false));
  };

  const prompt = `You are an expert resume writer specializing in ATS-optimized resumes.

Generate professional resume summaries for the following job role at three experience levels.

Job Title: {jobTitle}

Experience Levels:
1. Fresher (0–1 years)
2. Mid-Level (2–4 years)
3. Experienced (5+ years)

Guidelines:
- Write in third person (no "I", "me", "my")
- Each summary must be 3–4 concise sentences
- Maintain a professional, confident, and results-focused tone
- Emphasize relevant technical skills, tools, and impact
- Avoid generic buzzwords and filler content
- Do not stop mid-sentence

Output Rules:
- Return the response strictly in valid JSON format
- Do not include explanations or extra text outside JSON
- Use the exact keys: fresher, midLevel, experienced
- Each value must be a plain text resume summary
`

  const GenerateSummeryFromAI = async () => {
    setLoading(true)
    try {
      const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle)
      const summaryText = await generateAIContent(PROMPT)
      setAIGeneratedSummaryList(JSON.parse(summaryText))
      enableNext(false);
    } catch (error) {
      toast("Failed to generate summary. Please check your API key.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-4 border-t-purple-600 mt-10'>
      <h2 className='font-bold text-lg'>Summary</h2>
      <p>Add Summary based on job title</p>

      <form className='mt-7' onSubmit={onSave}>
        <div className='flex justify-between items-baseline'>
          <label>Add Summary</label>
          <Button
            variant='outline'
            type='button'
            size="sm"
            onClick={GenerateSummeryFromAI}
            className="border-purple-600 text-purple-600 flex gap-1"
          >
            <LiaBrainSolid className='h-4 w-4' /> Generate Summary AI
          </Button>
        </div>

        <Textarea
          rows={5}
          value={summary}
          onChange={(e) => {
            setSummary(e.target.value)
            enableNext(false)
          }}
          className="w-full shadow-lg mt-5 p-3 rounded-md"
          required
          placeholder='Experienced Software Developer with strong full-stack expertise...'
        />

        <div className='flex justify-end mt-3'>
          <Button type="submit" onSubmit={onSave} disabled={loading} className="border-purple-600">
            {loading ? <LoaderPinwheel className='animate-spin' /> : 'Save & Continue'}
          </Button>
        </div>
      </form>

      {aiGeneratedSummaryList && (
        <div className="mt-6">
          <h3 className="font-bold text-lg mb-4">Suggested</h3>

          <div className="space-y-4">
            {Object.entries(aiGeneratedSummaryList).map(([level, text]) => (
              <div key={level} className="p-4 border rounded-lg shadow-sm bg-white">
                <h4 className="font-semibold capitalize mb-2">
                  {level.replace(/([A-Z])/g, " $1")}
                </h4>

                <p className="text-sm text-gray-700 leading-relaxed">{text}</p>

                <div className="flex justify-end mt-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-purple-600 text-purple-600"
                    onClick={() => {
                      setSummary(text)
                      enableNext(false)
                    }}
                  >
                    Use this
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Summary
