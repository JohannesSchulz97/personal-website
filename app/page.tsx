import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Github, Linkedin, Mail, Globe, Award, GraduationCap, FileText } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Hero Section */}
        <section className="mb-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Johannes Schulz
          </h1>
          <h2 className="text-2xl md:text-3xl text-muted-foreground mb-6">
            Machine Learning Engineer, Computer Scientist, Mathematician
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Specializing in probabilistic modeling, statistical inference, and data-driven decision making.
            Transforming complex mathematical concepts into practical machine learning solutions.
          </p>
          <div className="flex gap-4 justify-center mb-8">
            <Button asChild size="lg">
              <Link href="/projects">View My Projects</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>

          {/* Quick Links */}
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="https://github.com/johannesschulz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/johannesschulz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
            <a
              href="mailto:schulz.johannes97@gmail.com"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>Email</span>
            </a>
            <a
              href="https://www.fiverr.com/johannesschulz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <Globe className="w-5 h-5" />
              <span>Fiverr</span>
            </a>
            <a
              href="https://preply.com/en/tutor/johannesschulz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <Globe className="w-5 h-5" />
              <span>Preply</span>
            </a>
            <a
              href="https://www.kaggle.com/johannesschulz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <Globe className="w-5 h-5" />
              <span>Kaggle</span>
            </a>
          </div>
        </section>

        {/* About Section */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-6 h-6" />
                About Me
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                I'm a Machine Learning Engineer with a strong foundation in probabilistic modeling,
                statistical inference, and data-driven decision making. Currently based in Homburg,
                Saarland, Germany, I combine deep mathematical understanding with practical engineering skills
                to solve complex real-world problems.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                My expertise spans across machine learning, deep learning, and statistical modeling.
                I'm passionate about transforming theoretical concepts into actionable solutions that drive
                meaningful impact. When I'm not coding or researching, I enjoy teaching mathematics online
                and helping others develop their analytical skills.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Analytical and curious by nature, I thrive on challenging problems that require innovative
                thinking and rigorous methodology. I'm always eager to collaborate on interesting projects
                and explore new frontiers in machine learning and artificial intelligence.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Key Achievements */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Key Achievements</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <GraduationCap className="w-10 h-10 mb-2 text-primary" />
                <CardTitle className="text-lg">MSc in Machine Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Master of Science in Machine Learning from the prestigious University of Tübingen,
                  one of Europe's leading institutions for AI research.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Award className="w-10 h-10 mb-2 text-primary" />
                <CardTitle className="text-lg">Max Planck Research</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Conducted cutting-edge research at the Max Planck Institute for Intelligent Systems,
                  contributing to advances in machine learning and AI.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <FileText className="w-10 h-10 mb-2 text-primary" />
                <CardTitle className="text-lg">Published Research</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Published peer-reviewed paper on community detection algorithms, advancing the field
                  of network analysis and graph theory.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Core Competencies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Python</Badge>
                <Badge variant="secondary">Machine Learning</Badge>
                <Badge variant="secondary">Data Science</Badge>
                <Badge variant="secondary">Deep Learning</Badge>
                <Badge variant="secondary">Statistical Inference</Badge>
                <Badge variant="secondary">Probabilistic Modeling</Badge>
                <Badge variant="secondary">PyTorch</Badge>
                <Badge variant="secondary">TensorFlow</Badge>
                <Badge variant="secondary">Scikit-learn</Badge>
                <Badge variant="secondary">NumPy</Badge>
                <Badge variant="secondary">Pandas</Badge>
                <Badge variant="secondary">Mathematics</Badge>
                <Badge variant="secondary">Statistics</Badge>
                <Badge variant="secondary">Computer Science</Badge>
                <Badge variant="secondary">Data Analysis</Badge>
                <Badge variant="secondary">Research</Badge>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Let's Work Together</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                I'm currently available for freelance machine learning projects and consulting.
                Whether you need help with data analysis, model development, or mathematical problem-solving,
                I'd love to hear from you.
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/contact">Contact Me</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="mailto:schulz.johannes97@gmail.com">Send Email</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
