import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { mockObjects } from "@/lib/mockData";
import { Download, FileJson, FileSpreadsheet, Calendar, Database } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Export = () => {
  const { toast } = useToast();
  const [includeAnalytics, setIncludeAnalytics] = useState(true);
  const [includeContacts, setIncludeContacts] = useState(true);
  const [includeDescriptions, setIncludeDescriptions] = useState(true);

  const handleExportJSON = () => {
    const data = mockObjects.map(obj => ({
      ...obj,
      ...(includeAnalytics ? {} : { 
        activityScore: undefined, 
        dataCompleteness: undefined,
        popularity: undefined,
        commercialPotential: undefined,
        priorityScore: undefined,
        leadPriority: undefined
      }),
      ...(includeContacts ? {} : { contacts: undefined }),
      ...(includeDescriptions ? {} : { description: undefined })
    }));

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mytravel-objects-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: "JSON file has been downloaded successfully.",
    });
  };

  const handleExportCSV = () => {
    const headers = [
      'ID', 'Name', 'Category', 'Address', 'Latitude', 'Longitude', 
      'Phone', 'Email', 'WhatsApp', 'Website', 'Capacity', 'Price Min', 'Price Max',
      'Rating', 'Reviews', 'Status', 'Priority Score', 'Lead Priority', 'Last Updated'
    ];

    const rows = mockObjects.map(obj => [
      obj.id,
      obj.name,
      obj.category,
      obj.address,
      obj.coordinates.lat,
      obj.coordinates.lng,
      obj.contacts.phone || '',
      obj.contacts.email || '',
      obj.contacts.whatsapp || '',
      obj.website || '',
      obj.capacity,
      obj.priceRange.min,
      obj.priceRange.max,
      obj.rating || '',
      obj.reviewsCount || '',
      obj.status,
      obj.priorityScore,
      obj.leadPriority,
      obj.lastUpdated
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mytravel-objects-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: "CSV file has been downloaded successfully.",
    });
  };

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Export Data</h1>
        <p className="text-muted-foreground">Экспорт данных в различных форматах для импорта на сайт</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Total Objects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{mockObjects.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">With Photos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {mockObjects.filter(obj => obj.photos.length > 0).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">With Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {mockObjects.filter(obj => obj.contacts.phone || obj.contacts.email).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Verified</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">
              {mockObjects.filter(obj => obj.status === "verified").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export Settings</CardTitle>
          <CardDescription>Выберите данные для включения в экспорт</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="analytics" 
              checked={includeAnalytics}
              onCheckedChange={(checked) => setIncludeAnalytics(checked as boolean)}
            />
            <label
              htmlFor="analytics"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Include Analytics Data (priority scores, metrics)
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="contacts" 
              checked={includeContacts}
              onCheckedChange={(checked) => setIncludeContacts(checked as boolean)}
            />
            <label
              htmlFor="contacts"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Include Contact Information (phone, email, social)
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="descriptions" 
              checked={includeDescriptions}
              onCheckedChange={(checked) => setIncludeDescriptions(checked as boolean)}
            />
            <label
              htmlFor="descriptions"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Include SEO Descriptions
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Export Formats */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-all border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileJson className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle>Export as JSON</CardTitle>
                <CardDescription>Структурированные данные для API</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Format:</span>
                <Badge variant="outline">JSON</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Size:</span>
                <span className="font-mono text-xs">~45 KB</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Best for:</span>
                <span className="text-xs">Web import, APIs</span>
              </div>
            </div>
            <Button onClick={handleExportJSON} className="w-full" variant="default">
              <Download className="w-4 h-4 mr-2" />
              Download JSON
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all border-accent/20">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <FileSpreadsheet className="w-6 h-6 text-accent" />
              </div>
              <div>
                <CardTitle>Export as CSV</CardTitle>
                <CardDescription>Табличные данные для анализа</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Format:</span>
                <Badge variant="outline">CSV</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Size:</span>
                <span className="font-mono text-xs">~28 KB</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Best for:</span>
                <span className="text-xs">Excel, Analytics</span>
              </div>
            </div>
            <Button onClick={handleExportCSV} className="w-full" variant="default">
              <Download className="w-4 h-4 mr-2" />
              Download CSV
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Export History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Export Report
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/30 rounded-lg p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Database className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Data Quality</span>
                </div>
                <div className="text-2xl font-bold text-primary mb-1">
                  {Math.round((mockObjects.reduce((sum, obj) => sum + obj.dataCompleteness, 0) / mockObjects.length))}%
                </div>
                <p className="text-xs text-muted-foreground">Среднее заполнение данных</p>
              </div>
              <div>
                <div className="text-sm font-medium mb-2">Ready for Import</div>
                <div className="text-2xl font-bold text-primary mb-1">
                  {mockObjects.filter(obj => obj.dataCompleteness >= 80).length}
                </div>
                <p className="text-xs text-muted-foreground">Объектов с полными данными</p>
              </div>
              <div>
                <div className="text-sm font-medium mb-2">Last Export</div>
                <div className="text-2xl font-bold text-primary mb-1">
                  {new Date().toLocaleDateString('ru-RU')}
                </div>
                <p className="text-xs text-muted-foreground">Сегодня</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Export;
