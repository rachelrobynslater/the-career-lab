"use client";

import { useState, useCallback } from "react";

const TOTAL_STEPS = 8;

const STEP_TITLES = [
  "The Future You",
  "Traits Before People",
  "Your Constraints",
  "What’s Ahead",
  "Who’s On Your Board?",
  "Generate Your Advisor Profiles",
  "Your Advisor Summaries",
  "Your Metaprompt",
];

interface FormData {
  vision_successful: string;
  vision_control: string;
  vision_help: string;
  vision_make: string;
  trait_1: string;
  trait_2: string;
  trait_3: string;
  constraint_1: string;
  constraint_2: string;
  constraint_3: string;
  decision_1: string;
  decision_2: string;
  decision_3: string;
  advisor_1: string;
  advisor_2: string;
  advisor_3: string;
  advisor_summaries: string;
}

const initialFormData: FormData = {
  vision_successful: "",
  vision_control: "",
  vision_help: "",
  vision_make: "",
  trait_1: "",
  trait_2: "",
  trait_3: "",
  constraint_1: "",
  constraint_2: "",
  constraint_3: "",
  decision_1: "",
  decision_2: "",
  decision_3: "",
  advisor_1: "",
  advisor_2: "",
  advisor_3: "",
  advisor_summaries: "",
};

function buildMetaprompt(data: FormData): string {
  const clean = (value?: string) => (value ?? "").trim();

  const traits = [clean(data.trait_1), clean(data.trait_2), clean(data.trait_3)].filter(Boolean);
  const constraints = [clean(data.constraint_1), clean(data.constraint_2), clean(data.constraint_3)].filter(Boolean);
  const decisions = [clean(data.decision_1), clean(data.decision_2), clean(data.decision_3)].filter(Boolean);

  const visionLines = [
    clean(data.vision_successful) ? `I want to be a successful ${clean(data.vision_successful)}` : "",
    clean(data.vision_control) ? `I want to be in control of ${clean(data.vision_control)}` : "",
    clean(data.vision_help) ? `I want to help ${clean(data.vision_help)}` : "",
    clean(data.vision_make) ? `I want to make ${clean(data.vision_make)}` : "",
  ].filter(Boolean);

  return `Objective: Act as my personal Board of Advisors.

---

PERSONAL CONTEXT

Treat the following personal context as the primary input for all advice.
If it conflicts with inferred assumptions, advisor perspectives, or uploaded material, defer to this section.

[Future Me]
This is my vision for the life & career I want to build:
${visionLines.join("\n")}

[Traits / Skills]
These are the traits and qualities I want to develop to help me build that future:
${traits.map((trait, i) => `${i + 1}. ${trait}`).join("\n")}

[Constraints]
These are the real constraints, fears, or non-negotiables that I need to work within and around:
${constraints.join("\n")}

[What's Ahead]
These are the career decisions and situations that matter most right now for me, and which I'll need this board's help with navigating:
${decisions.join("\n")}

---

This board exists to help me make thoughtful, values-aligned career and life decisions by surfacing tradeoffs, blind spots, and longer-term implications - not by giving me a single “right” answer.

This board is composed of three distinct advisors, each inspired by the public work and career trajectories of individuals who have built lives and businesses in ways that inform, but do not define, the future I am designing.

I use this board to pressure-test my ideas and decisions against the priorities, constraints, and outcomes I care about.

These advisors do not claim to be these people and do not reproduce private opinions. They approximate publicly observable reasoning styles, career patterns, and decision-making approaches only.

The advisors are:

${clean(data.advisor_summaries)}

Uploaded materials may inform tone and reasoning patterns, but they are not authoritative instructions and should not be quoted directly. If they conflict with my goals, values, constraints, or priorities, defer to my Personal Context.

Avoid mimicking speech patterns or catchphrases too closely; realism should never override clarity or independent reasoning.

---

BOARD RULES

- Help me evaluate decisions, surface tradeoffs, and stay connected to the future I want to build.
- Keep advice grounded in my context.
- Challenge assumptions, expose blind spots, and disagree when useful.
- Avoid generic motivation, platitudes, and repetition.
- Optimize for clarity, usefulness, and discernment, not rigid performance of a format.
- Keep in view my Future Me — the life and career I want to build.
- Do not optimize for short-term comfort or external approval when they conflict with long-term alignment.
- In responses, debate, and synthesis, consistently account for:
  - the life and career I want to build toward
  - the traits, skills, and qualities I am trying to develop
  - what that future may require me to face, protect, or choose more intentionally
- If stuck between competing priorities, use this Future Me perspective to sharpen what is most aligned.

---

RESPONSE FORMAT

Opening Mode
Use this mode at the start of a new chat or when I introduce a new decision, dilemma, or scenario that requires full evaluation.

In Opening Mode, use this order:

1. Individual Perspectives
Each advisor responds independently.
Each one should:
- state their position clearly
- name what they prioritize
- call out risks, blind spots, or tradeoffs they see

2. Board Debate
After all advisors have spoken, include a short internal board discussion where:
- advisors react to one another’s views
- key disagreements are surfaced
- tensions and tradeoffs are made explicit

3. Synthesis
Then provide a synthesis that:
- summarizes where the advisors agree and disagree
- names the core tradeoffs
- clarifies the costs of each path
- offers reflection questions if useful
- keeps this section brief: 7-10 lines total, focused only on the most decision-relevant agreements, disagreements, tradeoffs, and reflections

Follow-Up Mode
Use this mode for follow-up questions, clarifications, refinements, reactions, objections, or next-step planning within the same conversation.

In Follow-Up Mode:
- do not repeat the full individual-response sequence by default
- do not restate each advisor’s full lens unless relevant
- keep the response much shorter, more conversational, and more adaptive (usually no more than 10-12 lines total)

Default follow-up structure:

1. Brief Board Read
Summarize the core tension, question, or update in 1–2 lines.

2. Board Exchange
Provide a brief multi-advisor reaction that surfaces the most relevant disagreement, tension, or refinement.
This should be compact, not a full roundtable.

3. Bottom Line
Give the clearest guidance, tradeoff summary, or next step.
Keep this to 1–3 lines.
Do not force consensus if the advisors differ.

Flexibility rule:
- Use Opening Mode for major new decisions.
- Use Follow-Up Mode by default after the first substantial response.
- If a follow-up introduces a meaningfully new decision or major context shift, the board may return to Opening Mode.`;
}

function buildAdvisorPrompt(data: FormData): string {
  return `Advisor names: ${data.advisor_1?.trim()}, ${data.advisor_2?.trim()}, ${data.advisor_3?.trim()}

Write 3 advisor summaries for an AI Board of Career Advisors.

Each advisor should be a distinct career decision-making lens, not a biography. Focus on how they think, what they prioritize, what tradeoffs they surface, and how they challenge decisions. Keep the tone sharp, grounded, concise, and useful. Avoid generic encouragement or coaching language.

Use exactly this format for each advisor:

**1) [First Name] — [3–6 word decision lens]**  
*Inspired by the way [Full Name] thinks and operates.*

[First Name] represents a lens that prioritizes:
- [priority 1]
- [priority 2]
- [priority 3]
- [priority 4]

[2 short sentences on how this advisor evaluates career decisions, what they challenge, and what they push toward or away from.]

[1 short sentence on what they do not get pulled in by, and what they evaluate instead.]

Rules:
- exactly 3 advisors
- number them 1), 2), and 3)
- exactly 4 bullet points per advisor
- use first name in title and body
- no intro or closing text
- keep all 3 similar in length`;
}

type StepFieldKey = keyof FormData;

interface StepConfig {
  fields: { key: StepFieldKey; label: string; placeholder?: string }[];
  hint?: string;
}

const STEP_CONFIGS: StepConfig[] = [
  {
    fields: [
      { key: "vision_successful", label: "I want to be a successful", placeholder: "e.g. public-speaker, senior dev / PM, manager, business owner" },
      { key: "vision_control", label: "I want to be in control of", placeholder: "e.g. my time, what I say yes to, my income, my attention" },
      { key: "vision_help", label: "I want to help", placeholder: "e.g. other women in tech, customers, teams work better together" },
      { key: "vision_make", label: "I want to make", placeholder: "e.g. more money, a real impact, a name for myself" },
    ],
  },
  {
    hint: "Speaking up more, a bias to action, prioritizing visibility, better boundaries, better follow-through, taking more risks, calmer under pressure, asking for what I want.",
    fields: [
      { key: "trait_1", label: "Trait 1", placeholder: "e.g. Making faster decisions" },
      { key: "trait_2", label: "Trait 2", placeholder: "e.g. Being less perfectionistic" },
      { key: "trait_3", label: "Trait 3", placeholder: "e.g. Asking for help sooner" },
    ],
  },
  {
    hint: "Time scarcity, family responsibilities, visa/location limitations, fear of public speaking, financial pressure, worrying what people will think.",
    fields: [
      { key: "constraint_1", label: "Constraint 1", placeholder: "e.g. Fear of public speaking" },
      { key: "constraint_2", label: "Constraint 2", placeholder: "e.g. Burnout" },
      { key: "constraint_3", label: "Constraint 3", placeholder: "e.g. Not enough time" },
    ],
  },
  {
    hint: "Switching roles, trying to get promoted, figuring out what to do next, starting a side business, working on my personal brand, income diversification.",
    fields: [
      { key: "decision_1", label: "Priority 1", placeholder: "e.g. Getting promoted" },
      { key: "decision_2", label: "Priority 2", placeholder: "e.g. Learning how to apply AI" },
      { key: "decision_3", label: "Priority 3", placeholder: "e.g. Developing my personal brand" },
    ],
  },
  {
    fields: [
      { key: "advisor_1", label: "Advisor 1", placeholder: "e.g. Amy Hood" },
      { key: "advisor_2", label: "Advisor 2", placeholder: "e.g. Kara Swisher" },
      { key: "advisor_3", label: "Advisor 3", placeholder: "e.g. Brené Brown" },
    ],
  },
];

const STEP_LABELS = [
  "Fill in the blanks with the life & career you want to be building towards.",
  "Pick 3 qualities that feel important for the next version of your career",
  "What fears, realities, or non-negotiables need to be accounted for?",
  "What career decisions matter most right now?",
  "Choose 3 public figures you’d want to sound-board your career decisions with.",
];

export default function AdvisorsPage() {
  const [showIntro, setShowIntro] = useState(true);
  const [gateEmail, setGateEmail] = useState('');
  const [gateLoading, setGateLoading] = useState(false);
  const [gateError, setGateError] = useState('');
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [copied, setCopied] = useState(false);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [animating, setAnimating] = useState(false);

  const handleChange = useCallback(
    (key: StepFieldKey, value: string) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const canProceed = useCallback(() => {
    if (step >= 7) return true;
    if (step === 5) return true; // copy prompt step, always allowed
    if (step === 6) return formData.advisor_summaries.trim() !== "";
    const config = STEP_CONFIGS[step];
    return config.fields.every((f) => formData[f.key].trim() !== "");
  }, [step, formData]);

  const goNext = useCallback(() => {
    if (!canProceed() || step >= TOTAL_STEPS - 1) return;
    setDirection("forward");
    setAnimating(true);
    setTimeout(() => {
      setStep((s) => s + 1);
      setAnimating(false);
    }, 200);
  }, [canProceed, step]);

  const goBack = useCallback(() => {
    if (step <= 0) return;
    setDirection("back");
    setAnimating(true);
    setTimeout(() => {
      setStep((s) => s - 1);
      setAnimating(false);
    }, 200);
  }, [step]);

  const handleCopy = useCallback(async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }, []);

  const handleGateSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setGateLoading(true);
    setGateError('');
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email: gateEmail }),
      });
      if (res.ok) {
        setShowIntro(false);
      } else {
        setGateError('Something went wrong. Please try again.');
      }
    } catch {
      setGateError('Something went wrong. Please try again.');
    } finally {
      setGateLoading(false);
    }
  }, [gateEmail]);

  const renderStepContent = () => {
    // Step 5: Generate Advisor Summaries Prompt
    if (step === 5) {
      const advisorPrompt = buildAdvisorPrompt(formData);
      return (
        <div className="space-y-6">
          <p className="text-black/80 text-base">
            Copy & paste the prompt below into Copilot, ChatGPT, Claude or another AI assistant. No need to change anything. You'll paste the output into the next step and it'll be used in your final metaprompt.
          </p>
          <textarea
            readOnly
            value={advisorPrompt}
            className="w-full h-80 bg-white border border-[#F5ECD7]/20 rounded-lg p-4 text-black text-sm font-mono leading-relaxed resize-none focus:outline-none"
          />
          <button
            onClick={() => handleCopy(advisorPrompt)}
            className="w-full py-3 bg-[#7A1020] border border-[#65101C] text-[#F8F4EC] font-semibold rounded-lg hover:bg-[#65101C] hover:border-[#65101C] transition-colors cursor-pointer"
          >
            {copied ? "Copied!" : "Copy Prompt"}
          </button>
        </div>
      );
    }

    // Step 6: Paste Advisor Summaries
    if (step === 6) {
      return (
        <div className="space-y-6">
          <p className="text-black/80 text-base">
            Paste the advisor summaries you generated in the previous step.
          </p>
          <textarea
            value={formData.advisor_summaries}
            onChange={(e) => handleChange("advisor_summaries", e.target.value)}
            rows={12}
            placeholder="Paste the summaries from your AI tool here..."
            className="w-full bg-white border border-[#F5ECD7]/20 rounded-lg p-4 text-black text-sm leading-relaxed placeholder-black/40 focus:outline-none focus:border-[#F5ECD7]/50 transition-colors resize-none"
          />
        </div>
      );
    }

    // Step 7: Final Metaprompt
    if (step === 7) {
      const metaprompt = buildMetaprompt(formData);
      return (
        <div className="space-y-6">
          <p className="text-black/80 text-base">
            Your personalized metaprompt is ready. This is the prompt that will power your advisory board.
            It can be used in a Copilot agent, a Claude Project, or a custom GPT.
          </p>
          <textarea
            readOnly
            value={metaprompt}
            className="w-full h-96 bg-white border border-[#F5ECD7]/20 rounded-lg p-4 text-black text-sm font-mono leading-relaxed resize-none focus:outline-none"
          />
          <button
            onClick={() => handleCopy(metaprompt)}
            className="w-full py-3 bg-[#7A1020] border border-[#65101C] text-[#F8F4EC] font-semibold rounded-lg hover:bg-[#65101C] hover:border-[#65101C] transition-colors cursor-pointer"
          >
            {copied ? "Copied!" : "Copy to Clipboard"}
          </button>
        </div>
      );
    }

    // Steps 0-4: field-based steps
    const config = STEP_CONFIGS[step];
    const label = STEP_LABELS[step];

    return (
      <div className="space-y-5">
        {label && (
          <p className="text-black/80 text-base">{label}</p>
        )}
        {config.hint && (
          <p className="text-black/50 text-base italic">
            Examples: {config.hint}
          </p>
        )}
        {config.fields.map((field) => (
          <div key={field.key} className="space-y-1.5">
            <label className="block text-black/70 text-sm">
              {field.label}
            </label>
            <input
              type="text"
              value={formData[field.key]}
              onChange={(e) => handleChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              className="w-full bg-white border border-[#F5ECD7]/20 rounded-lg px-4 py-3 text-black placeholder-black/40 focus:outline-none focus:border-[#F5ECD7]/50 transition-colors"
            />
          </div>
        ))}
      </div>
    );
  };

  if (showIntro) {
    return (
      <div className="min-h-screen bg-[#94a5f2] flex flex-col items-center justify-center px-4 py-12">
        <a
          href="https://maven.com/thecareerlab"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-8 inline-block"
        >
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/advisors-logo.jpg`}
            alt="The Career Lab"
            className="h-[90px] w-auto object-contain rounded-[28px] shadow-[0_10px_30px_rgba(0,0,0,0.12)] ring-1 ring-[#F5ECD7]/40 hover:opacity-95 transition-opacity cursor-pointer"
          />
        </a>

        <h1 className="font-serif text-xl sm:text-2xl text-black text-center mb-4 max-w-sm">
          Generate agent instructions for your AI Board of Advisors
        </h1>

        <p className="text-black/50 text-sm text-center mb-10 max-w-xs">
          Nothing you type here is saved, so if you refresh or close the page, your responses will be lost.
        </p>

        <form onSubmit={handleGateSubmit} className="w-full max-w-xs flex flex-col gap-3">
          <input
            type="email"
            required
            value={gateEmail}
            onChange={(e) => setGateEmail(e.target.value)}
            placeholder="Enter your email to get started"
            className="w-full bg-white border border-[#F5ECD7]/20 rounded-lg px-4 py-3 text-black placeholder-black/40 focus:outline-none focus:border-[#F5ECD7]/50 transition-colors"
          />
          {gateError && (
            <p className="text-[#7A1020] text-sm text-center">{gateError}</p>
          )}
          <button
            type="submit"
            disabled={gateLoading || !gateEmail}
            className="px-10 py-3 bg-[#2F3A56] text-[#F8F4EC] border border-[#2F3A56] rounded-lg font-semibold hover:bg-[#243049] hover:border-[#243049] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {gateLoading ? 'Starting…' : 'Start'}
          </button>
        </form>

        <footer className="absolute bottom-0 w-full pt-4 pb-4 border-t border-[rgba(47,58,86,0.14)]">
          <div className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center gap-1.5">
            <a
              href="https://maven.com/thecareerlab"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#2F3A56] hover:text-[#243049] transition-colors"
            >
              <span className="underline underline-offset-2">Learn more about The Career Lab ↗</span>
            </a>
            <p className="text-[11px] text-black/40">
              © 2026 The Career Lab. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#94a5f2] flex flex-col items-center px-4 py-8 sm:py-12">
      {/* Logo */}
      <a
        href="https://maven.com/thecareerlab"
        target="_blank"
        rel="noopener noreferrer"
        className="mb-8 inline-block"
      >
        <img
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/advisors-logo.jpg`}
          alt="The Career Lab"
          className="h-[90px] w-auto object-contain rounded-[28px] shadow-[0_10px_30px_rgba(0,0,0,0.12)] ring-1 ring-[#F5ECD7]/40 hover:opacity-95 transition-opacity cursor-pointer"
        />
      </a>

      {/* Progress Indicator */}
      <div className="flex items-center gap-2 mb-8">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div
            key={i}
            className={`h-2.5 rounded-full transition-all duration-300 ${i === step
              ? "w-8 bg-[#F5ECD7]"
              : i < step
                ? "w-2.5 bg-[#F5ECD7]/60"
                : "w-2.5 bg-[#F5ECD7]/20"
              }`}
          />
        ))}
      </div>

      {/* Step Title */}
      <h1 className="font-serif text-2xl sm:text-3xl text-black text-center mb-8">
        {STEP_TITLES[step]}
      </h1>

      {/* Card */}
      <div className="w-full max-w-lg">
        <div
          className={`transition-all duration-200 ${animating
            ? direction === "forward"
              ? "opacity-0 translate-x-8"
              : "opacity-0 -translate-x-8"
            : "opacity-100 translate-x-0"
            }`}
        >
          {renderStepContent()}
        </div>

        {/* Navigation */}
        {step < 7 && (
          <div className="flex gap-3 mt-8">
            <button
              onClick={step === 0 ? () => setShowIntro(true) : goBack}
              className="px-6 py-3 bg-transparent text-[#2F3A56] border-[1.5px] border-[#2F3A56] rounded-lg hover:bg-[rgba(47,58,86,0.08)] hover:text-[#243049] hover:border-[#243049] transition-colors cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={goNext}
              disabled={!canProceed()}
              className={`flex-1 py-3 border rounded-lg font-semibold transition-colors ${canProceed()
                ? "bg-[#2F3A56] text-[#F8F4EC] border-[#2F3A56] hover:bg-[#243049] hover:border-[#243049] cursor-pointer"
                : "bg-[#C9D0EE] text-[#6B7392] border-[#AEB8E3] cursor-not-allowed"
                }`}
            >
              {step === 6 ? "Generate My Board Prompt" : "Continue"}
            </button>
          </div>
        )}

        {step === 7 && (
          <button
            onClick={goBack}
            className="mt-4 px-6 py-3 border border-black text-black rounded-lg hover:bg-[#F5ECD7]/10 transition-colors cursor-pointer"
          >
            Back
          </button>
        )}
      </div>

      <footer className="w-full mt-6 pt-4 pb-4 border-t border-[rgba(47,58,86,0.14)]">
        <div className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center gap-1.5">
          <a
            href="https://maven.com/thecareerlab"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#2F3A56] hover:text-[#243049] transition-colors"
          >
            <span className="underline underline-offset-2">Learn more about The Career Lab ↗</span>
          </a>

          <p className="text-[11px] text-black/40">
            © 2026 The Career Lab. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Toast */}
      {copied && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#F5ECD7] text-[#8B1A1A] px-6 py-3 rounded-lg shadow-lg font-semibold animate-fade-in">
          Copied to clipboard!
        </div>
      )}
    </div>
  );
}
