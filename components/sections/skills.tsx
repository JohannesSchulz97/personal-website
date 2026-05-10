import { Badge } from "@/components/ui/badge";
import SectionHeading from "@/components/section-heading";

export default function SkillsSection() {
  const skills = {
    "Languages & Frameworks": ["Python", "TypeScript", "Next.js", "FastAPI", "SQL"],
    "AI & ML": ["Claude API", "LangChain", "scikit-learn", "PyTorch"],
    "Infrastructure": ["Docker", "PostgreSQL", "Cloudflare", "GitHub Actions"],
  };

  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <SectionHeading number="02">Skills</SectionHeading>

        <div className="grid md:grid-cols-3 gap-12">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-slate-lighter font-semibold mb-4">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <Badge key={skill} variant="outline" className="font-mono text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
