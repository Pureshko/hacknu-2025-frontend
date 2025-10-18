import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TouristObject, categoryLabels, statusLabels, priorityLabels } from "@/types/object";
import { MapPin, Phone, Mail, Globe, MessageCircle, Instagram, Calendar, Users, DollarSign, Star, Zap } from "lucide-react";

interface ObjectModalProps {
  object: TouristObject | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ObjectModal = ({ object, open, onOpenChange }: ObjectModalProps) => {
  if (!object) return null;

  const openWhatsApp = () => {
    if (object.contacts.whatsapp) {
      window.open(`https://wa.me/${object.contacts.whatsapp.replace(/[^0-9]/g, '')}`, '_blank');
    }
  };

  const openPhone = () => {
    if (object.contacts.phone) {
      window.open(`tel:${object.contacts.phone}`, '_blank');
    }
  };

  const openWebsite = () => {
    if (object.website) {
      window.open(object.website, '_blank');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="text-2xl mb-2">{object.name}</DialogTitle>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{categoryLabels[object.category]}</Badge>
                <Badge variant={object.status === "verified" ? "default" : "outline"}>
                  {statusLabels[object.status]}
                </Badge>
                <Badge 
                  className={
                    object.leadPriority === "hot" ? "bg-secondary" :
                    object.leadPriority === "warm" ? "bg-accent" : "bg-muted"
                  }
                >
                  {priorityLabels[object.leadPriority]} лид
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-secondary font-bold text-xl">
                <Zap className="w-5 h-5" />
                {object.priorityScore.toFixed(1)}
              </div>
              <div className="text-xs text-muted-foreground">Priority Score</div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Basic Info */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Basic Information
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex gap-2">
                <span className="text-muted-foreground min-w-32">Address:</span>
                <span>{object.address}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-muted-foreground min-w-32">Coordinates:</span>
                <span className="font-mono">{object.coordinates.lat}, {object.coordinates.lng}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-muted-foreground min-w-32">Capacity:</span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {object.capacity} мест
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-muted-foreground min-w-32">Price Range:</span>
                <span className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3" />
                  {object.priceRange.min.toLocaleString()} - {object.priceRange.max.toLocaleString()} ₸
                </span>
              </div>
              {object.rating && (
                <div className="flex gap-2">
                  <span className="text-muted-foreground min-w-32">Rating:</span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-secondary text-secondary" />
                    {object.rating} ({object.reviewsCount} отзывов)
                  </span>
                </div>
              )}
              <div className="flex gap-2">
                <span className="text-muted-foreground min-w-32">Last Updated:</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(object.lastUpdated).toLocaleDateString('ru-RU')}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Description & SEO */}
          <div>
            <h3 className="font-semibold mb-3">Description & SEO</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{object.description}</p>
            
            {object.infrastructure.length > 0 && (
              <div className="mt-3">
                <div className="text-xs text-muted-foreground mb-2">Infrastructure:</div>
                <div className="flex flex-wrap gap-1">
                  {object.infrastructure.map((item, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">{item}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Contacts */}
          <div>
            <h3 className="font-semibold mb-3">Contact Information</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {object.contacts.phone && (
                <Button 
                  variant="outline" 
                  className="justify-start"
                  onClick={openPhone}
                >
                  <Phone className="w-4 h-4" />
                  {object.contacts.phone}
                </Button>
              )}
              {object.contacts.whatsapp && (
                <Button 
                  variant="outline"
                  className="justify-start bg-[#25D366]/10 hover:bg-[#25D366]/20 border-[#25D366]/20"
                  onClick={openWhatsApp}
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </Button>
              )}
              {object.contacts.email && (
                <Button 
                  variant="outline"
                  className="justify-start"
                  onClick={() => window.open(`mailto:${object.contacts.email}`, '_blank')}
                >
                  <Mail className="w-4 h-4" />
                  {object.contacts.email}
                </Button>
              )}
              {object.website && (
                <Button 
                  variant="outline"
                  className="justify-start"
                  onClick={openWebsite}
                >
                  <Globe className="w-4 h-4" />
                  Website
                </Button>
              )}
              {object.contacts.instagram && (
                <Button 
                  variant="outline"
                  className="justify-start"
                  onClick={() => window.open(`https://instagram.com/${object.contacts.instagram?.replace('@', '')}`, '_blank')}
                >
                  <Instagram className="w-4 h-4" />
                  {object.contacts.instagram}
                </Button>
              )}
            </div>
          </div>

          <Separator />

          {/* Analytics */}
          <div>
            <h3 className="font-semibold mb-3">Analytics Metrics</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">Activity</div>
                <div className="text-lg font-bold text-primary">{object.activityScore}%</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">Data Complete</div>
                <div className="text-lg font-bold text-primary">{object.dataCompleteness}%</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">Popularity</div>
                <div className="text-lg font-bold text-primary">{object.popularity}%</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">Commercial</div>
                <div className="text-lg font-bold text-primary">{object.commercialPotential}%</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-3 sm:col-span-2">
                <div className="text-xs text-muted-foreground mb-1">Priority Score</div>
                <div className="text-lg font-bold text-secondary">{object.priorityScore.toFixed(1)} / 10</div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ObjectModal;
