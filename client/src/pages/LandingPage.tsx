import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Sparkles, Heart, Brain, Shield } from "lucide-react";
import HeroImage from "../assets/LDR_LLL1_0.png";

<<<<<<< Updated upstream
export default function LandingSection() {
=======
export default function LandingPage() {
>>>>>>> Stashed changes
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl w-full">
        {/* Hero Content */}
        <div className="text-center space-y-8 mb-20">
<<<<<<< Updated upstream
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Your wellness journey starts here
            </span>
          </div>

          <h1 className="font-serif text-6xl md:text-8xl font-bold text-balance leading-tight">
            Find Your
            <span className="block text-primary mt-2">Inner Peace</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
            A thoughtfully crafted space where mental wellness meets delightful
            design. Start your journey to a calmer, more centered you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button
              size="lg"
              className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
              onClick={() => navigate("/signup")}
            >
              Begin Your Journey
            </Button>
            
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-20">
          {[
            {
              icon: Brain,
              title: "Mindful Practices",
              description:
                "Science-backed techniques to calm your mind and reduce stress",
            },
            {
              icon: Heart,
              title: "Self-Care Tools",
              description:
                "Personalized activities designed to nurture your emotional wellbeing",
            },
            {
              icon: Shield,
              title: "Safe Space",
              description:
                "A private sanctuary where you can be yourself without judgment",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="group relative bg-card/50 backdrop-blur-sm rounded-3xl p-8 border border-border/50 hover:border-primary/30 transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors group-hover:scale-110">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
=======
          <div className="flex justify-center mb-8">
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl animate-float">
              <img
                src={HeroImage}
                alt="Wellness Companion"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Your wellness journey starts here
            </span>
          </div>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
            A thoughtfully crafted space where mental wellness meets delightful
            design. Start your journey to a calmer, more centered you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button
              size="lg"
              className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
              onClick={() => navigate("/signup")}
            >
              Begin Your Journey
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-20">
          {[
            {
              icon: Brain,
              title: "Mindful Practices",
              description:
                "Science-backed techniques to calm your mind and reduce stress",
            },
            {
              icon: Heart,
              title: "Self-Care Tools",
              description:
                "Personalized activities designed to nurture your emotional wellbeing",
            },
            {
              icon: Shield,
              title: "Safe Space",
              description:
                "A private sanctuary where you can be yourself without judgment",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="group relative bg-card/50 backdrop-blur-sm rounded-3xl p-8 border border-border/50 hover:border-primary/30 transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors group-hover:scale-110">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
>>>>>>> Stashed changes
          ))}
        </div>
      </div>
    </section>
  );
}
