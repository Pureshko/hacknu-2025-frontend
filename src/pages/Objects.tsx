import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockObjects } from "@/lib/mockData";
import { TouristObject, categoryLabels, statusLabels, priorityLabels } from "@/types/object";
import ObjectModal from "@/components/ObjectModal";
import { Search, MapPin, Phone, Star } from "lucide-react";

const Objects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedObject, setSelectedObject] = useState<TouristObject | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredObjects = mockObjects.filter((obj) => {
    const matchesSearch = obj.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         obj.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || obj.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || obj.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleObjectClick = (object: TouristObject) => {
    setSelectedObject(object);
    setModalOpen(true);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Tourist Objects</h1>
        <p className="text-muted-foreground">Управление базой туристических объектов размещения</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search by name or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <SelectItem key={key} value={key}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {Object.entries(statusLabels).map(([key, label]) => (
              <SelectItem key={key} value={key}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredObjects.length} of {mockObjects.length} objects
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredObjects.map((object) => (
              <TableRow 
                key={object.id}
                className="cursor-pointer hover:bg-muted/30"
                onClick={() => handleObjectClick(object)}
              >
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <span>{object.name}</span>
                    <span className="text-xs text-muted-foreground">{object.capacity} мест</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{categoryLabels[object.category]}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-start gap-2 max-w-xs">
                    <MapPin className="w-3 h-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-sm truncate">{object.address}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm">
                    {object.contacts.phone && <Phone className="w-3 h-3 text-primary" />}
                    {object.contacts.email && <span className="text-xs text-muted-foreground">📧</span>}
                    {object.contacts.whatsapp && <span className="text-xs text-muted-foreground">💬</span>}
                  </div>
                </TableCell>
                <TableCell>
                  {object.rating ? (
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-secondary text-secondary" />
                      <span className="text-sm">{object.rating}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">N/A</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge 
                    className={
                      object.leadPriority === "hot" ? "bg-secondary" :
                      object.leadPriority === "warm" ? "bg-accent" : "bg-muted"
                    }
                  >
                    {priorityLabels[object.leadPriority]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={object.status === "verified" ? "default" : "outline"}>
                    {statusLabels[object.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-bold text-primary">
                  {object.priorityScore.toFixed(1)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ObjectModal 
        object={selectedObject}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
};

export default Objects;
