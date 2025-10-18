import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageCircle, Instagram, Send } from "lucide-react";

const channels = [
  {
    name: "Email",
    icon: Mail,
    description: "Персонализированные письма с демо-аккаунтом",
    color: "text-primary"
  },
  {
    name: "WhatsApp",
    icon: MessageCircle,
    description: "Быстрые сообщения с CTA и ссылками",
    color: "text-accent"
  },
  {
    name: "Instagram DM",
    icon: Instagram,
    description: "Прямые сообщения для активных профилей",
    color: "text-secondary"
  },
  {
    name: "Telegram",
    icon: Send,
    description: "Автоматизированные шаблоны для мессенджера",
    color: "text-primary"
  }
];

const Outreach = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            Automated Outreach
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Personalized Communication
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              At Scale
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Автоматическая генерация персонализированных шаблонов с A/B тестированием
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {channels.map((channel, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4`}>
                  <channel.icon className={`w-6 h-6 ${channel.color}`} />
                </div>
                <CardTitle className="text-lg">{channel.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{channel.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="max-w-3xl mx-auto bg-gradient-to-br from-card to-muted/30 border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Пример шаблона для люкс глэмпинга</CardTitle>
              <Badge className="bg-secondary">WhatsApp</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-background/80 rounded-lg p-6 border border-border/50">
              <p className="text-foreground mb-4">
                Привет, <span className="font-semibold text-primary">[Название]</span>!
              </p>
              <p className="text-foreground/90 mb-4">
                Мы заметили ваш потрясающий глэмпинг рядом с <span className="font-semibold text-accent">[Локация]</span> в <span className="font-semibold">[Соцсеть]</span>.
                Ваше место явно заслуживает большей аудитории туристов!
              </p>
              <p className="text-foreground/90 mb-4">
                <span className="font-semibold">mytravel.kz</span> — это топовая платформа путешествий в Казахстане, где вы получите:
              </p>
              <ul className="space-y-2 mb-4 pl-4">
                <li className="flex items-center gap-2 text-foreground/90">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  10К+ активных туристов ежемесячно
                </li>
                <li className="flex items-center gap-2 text-foreground/90">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  Лучший рейтинг для премиум объектов
                </li>
                <li className="flex items-center gap-2 text-foreground/90">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  Инструменты управления бронированиями
                </li>
              </ul>
              <p className="text-foreground mb-4">
                Хотим добавить вас в каталог. Можно поговорить?
              </p>
              <div className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium">
                [Ссылка на демо]
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Персонализация</Badge>
              <Badge variant="outline">A/B тестирование</Badge>
              <Badge variant="outline">Отслеживание откликов</Badge>
              <Badge variant="outline">Автоматическое логирование</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Outreach;
