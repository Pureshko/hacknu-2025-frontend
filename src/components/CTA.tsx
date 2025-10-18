import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Rocket, Github, FileText } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary via-primary to-accent relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Build the Future of
            <span className="block">Tourism in Kazakhstan?</span>
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-12 max-w-2xl mx-auto">
            Присоединяйтесь к хакатону и создайте инновационное решение для автоматизации туристической индустрии
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-background text-foreground hover:bg-background/90 text-lg px-8 py-6 shadow-xl"
            >
              <Rocket className="w-5 h-5" />
              Start Building
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 text-lg px-8 py-6"
            >
              <FileText className="w-5 h-5" />
              View Documentation
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-background/10 backdrop-blur-sm border-primary-foreground/20 p-6">
              <div className="text-3xl font-bold text-secondary mb-2">35%</div>
              <div className="text-primary-foreground/90">Качество данных</div>
              <div className="text-sm text-primary-foreground/70 mt-2">Точность, полнота, актуальность</div>
            </Card>
            <Card className="bg-background/10 backdrop-blur-sm border-primary-foreground/20 p-6">
              <div className="text-3xl font-bold text-secondary mb-2">30%</div>
              <div className="text-primary-foreground/90">Функциональность</div>
              <div className="text-sm text-primary-foreground/70 mt-2">Охват источников, скорость</div>
            </Card>
            <Card className="bg-background/10 backdrop-blur-sm border-primary-foreground/20 p-6">
              <div className="text-3xl font-bold text-secondary mb-2">25%</div>
              <div className="text-primary-foreground/90">Качество outreach</div>
              <div className="text-sm text-primary-foreground/70 mt-2">Персонализация, конверсия</div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
