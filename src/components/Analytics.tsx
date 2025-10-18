import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import aiAnalytics from "@/assets/ai-analytics.jpg";

const metrics = [
  { name: "Активность в сети", weight: 20, description: "Частота постов, подписчики, отзывы" },
  { name: "Полнота данных", weight: 18, description: "Контакты, фото, описания" },
  { name: "Популярность", weight: 16, description: "Упоминания, отзывы, рейтинги" },
  { name: "Потенциал заполняемости", weight: 15, description: "Количество мест, цена, локация" },
  { name: "Соответствие ЦА", weight: 16, description: "Премиум, эко, семьи, молодежь" },
  { name: "Коммерческий потенциал", weight: 15, description: "Платежеспособность, профессионализм" }
];

const categories = [
  { name: "Люкс глэмпинги", count: 234, trend: "+12%", color: "bg-secondary" },
  { name: "Семейные дома", count: 456, trend: "+8%", color: "bg-primary" },
  { name: "Экотуризм", count: 389, trend: "+15%", color: "bg-accent" },
  { name: "Этно-туризм (юрты)", count: 178, trend: "+22%", color: "bg-secondary" },
  { name: "Горные домики", count: 267, trend: "+10%", color: "bg-primary" }
];

const Analytics = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            AI Analytics
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Intelligent Priority
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Ranking System
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Автоматическая оценка объектов по 6 ключевым метрикам для приоритизации контактов
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img 
              src={aiAnalytics} 
              alt="AI Analytics Dashboard"
              className="rounded-xl shadow-[var(--shadow-elegant)] border border-border/50"
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">Критерии оценки объектов</h3>
            
            {metrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{metric.name}</span>
                  <Badge variant="secondary">{metric.weight}%</Badge>
                </div>
                <Progress value={metric.weight * 5} className="h-2" />
                <p className="text-sm text-muted-foreground">{metric.description}</p>
              </div>
            ))}

            <Card className="mt-8 bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold text-secondary-foreground">
                    10
                  </div>
                  <div>
                    <div className="font-semibold">Рейтинг 1-10</div>
                    <div className="text-sm text-muted-foreground">Горячий / Теплый / Холодный лид</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className={`w-3 h-3 rounded-full ${category.color} mx-auto mb-2`} />
                <CardTitle className="text-sm font-medium">{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">{category.count}</div>
                <Badge variant="outline" className="text-xs">
                  {category.trend}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Analytics;
