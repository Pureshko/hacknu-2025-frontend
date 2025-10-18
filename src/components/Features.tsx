import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Database, Brain, MessageSquare, BarChart3, MapPin, Users, Zap } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Multi-Source Data Collection",
    description: "Автоматический поиск из 2GIS, Google Maps, Instagram, Yandex Maps, OLX.kz и других источников",
    color: "text-primary"
  },
  {
    icon: Database,
    title: "Structured Data Management",
    description: "Сбор и структурирование контактов, координат, цен, отзывов и инфраструктуры объектов",
    color: "text-accent"
  },
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Интеллектуальная классификация объектов по категориям и автоматическая генерация описаний",
    color: "text-secondary"
  },
  {
    icon: BarChart3,
    title: "Priority Analytics",
    description: "Оценка объектов по активности, популярности, потенциалу заполняемости и коммерческому потенциалу",
    color: "text-primary"
  },
  {
    icon: MessageSquare,
    title: "Automated Outreach",
    description: "Персонализированные шаблоны для Email, WhatsApp, Instagram DM и Telegram с A/B тестированием",
    color: "text-accent"
  },
  {
    icon: MapPin,
    title: "Regional Coverage",
    description: "Масштабируемое решение для всех регионов Казахстана с поддержкой координат и адресов",
    color: "text-secondary"
  },
  {
    icon: Users,
    title: "Smart Segmentation",
    description: "Автоматическая сегментация по нишам: люкс глэмпинг, семейные дома, экотуризм, этно-туризм",
    color: "text-primary"
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description: "Ежедневные отчеты с найденными объектами, обновленными данными и топ-10 горячих лидов",
    color: "text-accent"
  }
];

const Features = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powerful Features for
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Tourism Data Intelligence
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Комплексная система для автоматизации поиска, анализа и привлечения туристических объектов
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-[var(--shadow-elegant)] bg-card/80 backdrop-blur-sm"
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
