import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { mockObjects } from "@/lib/mockData";
import { categoryLabels, priorityLabels } from "@/types/object";
import { Flame, TrendingUp, MapPin, Users, DollarSign } from "lucide-react";
import { useState } from "react";
import ObjectModal from "@/components/ObjectModal";
import { TouristObject } from "@/types/object";

const Analysis = () => {
  const [selectedObject, setSelectedObject] = useState<TouristObject | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const hotObjects = mockObjects
    .filter(obj => obj.leadPriority === "hot")
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, 10);

  const categoryCounts = mockObjects.reduce((acc, obj) => {
    acc[obj.category] = (acc[obj.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const avgMetrics = {
    activityScore: Math.round(mockObjects.reduce((sum, obj) => sum + obj.activityScore, 0) / mockObjects.length),
    dataCompleteness: Math.round(mockObjects.reduce((sum, obj) => sum + obj.dataCompleteness, 0) / mockObjects.length),
    popularity: Math.round(mockObjects.reduce((sum, obj) => sum + obj.popularity, 0) / mockObjects.length),
    commercialPotential: Math.round(mockObjects.reduce((sum, obj) => sum + obj.commercialPotential, 0) / mockObjects.length),
  };

  const topRegions = [
    { name: "Алматинская область", count: 6, percentage: 75 },
    { name: "Жамбылская область", count: 1, percentage: 12.5 },
    { name: "Костанайская область", count: 1, percentage: 12.5 },
  ];

  const handleObjectClick = (object: TouristObject) => {
    setSelectedObject(object);
    setModalOpen(true);
  };

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Analysis & Insights</h1>
        <p className="text-muted-foreground">Аналитика приоритетов и метрики эффективности</p>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Activity Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary mb-2">{avgMetrics.activityScore}%</div>
            <Progress value={avgMetrics.activityScore} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Data Completeness</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary mb-2">{avgMetrics.dataCompleteness}%</div>
            <Progress value={avgMetrics.dataCompleteness} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Popularity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary mb-2">{avgMetrics.popularity}%</div>
            <Progress value={avgMetrics.popularity} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Commercial Potential</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary mb-2">{avgMetrics.commercialPotential}%</div>
            <Progress value={avgMetrics.commercialPotential} className="h-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Hot Leads */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-secondary" />
                Top 10 Hottest Leads
              </CardTitle>
              <Badge className="bg-secondary">{hotObjects.length}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {hotObjects.map((obj, index) => (
              <div 
                key={obj.id} 
                className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0 cursor-pointer hover:bg-muted/30 p-2 rounded-lg -mx-2"
                onClick={() => handleObjectClick(obj)}
              >
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 font-bold text-secondary text-sm">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm mb-1">{obj.name}</div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{obj.address}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">{categoryLabels[obj.category]}</Badge>
                    {obj.rating && (
                      <span className="text-xs text-muted-foreground">★ {obj.rating}</span>
                    )}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-lg font-bold text-secondary">{obj.priorityScore.toFixed(1)}</div>
                  <div className="text-xs text-muted-foreground">score</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Regional Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Regional Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topRegions.map((region, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">{region.name}</span>
                  <span className="text-sm text-muted-foreground">{region.count} objects</span>
                </div>
                <Progress value={region.percentage} className="h-2" />
              </div>
            ))}

            <div className="pt-4 border-t border-border">
              <h4 className="text-sm font-medium mb-3">Category Breakdown</h4>
              <div className="space-y-2">
                {Object.entries(categoryCounts).map(([category, count]) => (
                  <div key={category} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{categoryLabels[category as keyof typeof categoryLabels]}</span>
                    <Badge variant="secondary">{count}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{mockObjects.length}</div>
                <div className="text-sm text-muted-foreground">Total Objects Found</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {mockObjects.reduce((sum, obj) => sum + obj.capacity, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Capacity</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {Math.round(mockObjects.reduce((sum, obj) => sum + obj.priceRange.min, 0) / mockObjects.length / 1000)}K
                </div>
                <div className="text-sm text-muted-foreground">Avg Min Price (₸)</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <ObjectModal 
        object={selectedObject}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
};

export default Analysis;
