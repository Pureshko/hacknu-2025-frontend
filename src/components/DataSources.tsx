import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, MapPinned, Instagram, ShoppingBag, Newspaper, Users2 } from "lucide-react";

const dataSources = [
  {
    name: "2GIS API",
    icon: MapPinned,
    type: "Primary",
    description: "Places API, Geocoder API, Maps",
    limit: "1M requests/month",
    color: "bg-primary/10 text-primary border-primary/20"
  },
  {
    name: "Google Maps",
    icon: Globe,
    type: "Maps",
    description: "Places, Reviews, Ratings",
    limit: "Standard API limits",
    color: "bg-accent/10 text-accent border-accent/20"
  },
  {
    name: "Instagram",
    icon: Instagram,
    type: "Social",
    description: "Business profiles, posts",
    limit: "API rate limits",
    color: "bg-secondary/10 text-secondary border-secondary/20"
  },
  {
    name: "OLX.kz / Avito.kz",
    icon: ShoppingBag,
    type: "Marketplace",
    description: "Listings, contacts, prices",
    limit: "Parsing limits",
    color: "bg-primary/10 text-primary border-primary/20"
  },
  {
    name: "Yandex Maps",
    icon: MapPinned,
    type: "Maps",
    description: "Organizations, coordinates",
    limit: "API quotas",
    color: "bg-accent/10 text-accent border-accent/20"
  },
  {
    name: "Tourism Blogs",
    icon: Newspaper,
    type: "Content",
    description: "Articles, mentions, reviews",
    limit: "Web scraping",
    color: "bg-secondary/10 text-secondary border-secondary/20"
  },
  {
    name: "Social Networks",
    icon: Users2,
    type: "Social",
    description: "Official pages, groups",
    limit: "Platform specific",
    color: "bg-primary/10 text-primary border-primary/20"
  },
  {
    name: "Tourism Catalogs",
    icon: Globe,
    type: "Directory",
    description: "Official listings, forums",
    limit: "Open access",
    color: "bg-accent/10 text-accent border-accent/20"
  }
];

const DataSources = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            Data Collection
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            8+ Integrated Data Sources
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Сбор информации из ведущих платформ для максимального охвата туристических объектов
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dataSources.map((source, index) => (
            <Card 
              key={index}
              className="border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-12 h-12 rounded-lg ${source.color} flex items-center justify-center border`}>
                    <source.icon className="w-6 h-6" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {source.type}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{source.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {source.description}
                </p>
                <p className="text-xs text-muted-foreground/70 font-mono">
                  {source.limit}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-xl bg-card border border-border/50">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MapPinned className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">2GIS API Battle Key</h3>
              <p className="text-muted-foreground mb-3">
                Боевой ключ предоставлен для хакатона с расширенными лимитами
              </p>
              <code className="px-3 py-1.5 rounded bg-muted text-sm font-mono">
                40160774-dbe8-4f70-91c9-697adac3e650
              </code>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataSources;
