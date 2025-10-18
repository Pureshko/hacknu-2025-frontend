import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockObjects } from "@/lib/mockData";
import { Database, TrendingUp, Users, Zap, MapPin, CheckCircle } from "lucide-react";
import { categoryLabels } from "@/types/object";

const Dashboard = () => {
  const totalObjects = mockObjects.length;
  const hotLeads = mockObjects.filter(obj => obj.leadPriority === "hot").length;
  const verifiedObjects = mockObjects.filter(obj => obj.status === "verified").length;
  const avgPriorityScore = (mockObjects.reduce((sum, obj) => sum + obj.priorityScore, 0) / totalObjects).toFixed(1);

  const categoryCounts = mockObjects.reduce((acc, obj) => {
    acc[obj.category] = (acc[obj.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const recentObjects = mockObjects
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, 5);

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Обзор системы сбора туристических объектов</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Objects</CardTitle>
            <Database className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{totalObjects}</div>
            <p className="text-xs text-muted-foreground mt-1">+12 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Hot Leads</CardTitle>
            <Zap className="w-4 h-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-secondary">{hotLeads}</div>
            <p className="text-xs text-muted-foreground mt-1">High priority contacts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Verified</CardTitle>
            <CheckCircle className="w-4 h-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">{verifiedObjects}</div>
            <p className="text-xs text-muted-foreground mt-1">{((verifiedObjects/totalObjects)*100).toFixed(0)}% of total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Priority Score</CardTitle>
            <TrendingUp className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{avgPriorityScore}</div>
            <p className="text-xs text-muted-foreground mt-1">Out of 10</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Categories Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Objects by Category</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(categoryCounts).map(([category, count]) => (
              <div key={category} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm">{categoryLabels[category as keyof typeof categoryLabels]}</span>
                </div>
                <Badge variant="secondary">{count}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Updates */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Updates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentObjects.map((obj) => (
              <div key={obj.id} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{obj.name}</div>
                  <div className="text-xs text-muted-foreground">{new Date(obj.lastUpdated).toLocaleDateString('ru-RU')}</div>
                </div>
                <Badge variant={obj.status === "verified" ? "default" : "outline"} className="text-xs flex-shrink-0">
                  {obj.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">AI Data Collection Active</h3>
              <p className="text-sm text-muted-foreground">
                Система автоматически собирает данные из 8+ источников. Последнее обновление: сегодня в 14:32
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
