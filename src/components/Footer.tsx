import { MapPin, Mail, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              MyTravel.kz
            </h3>
            <p className="text-sm text-muted-foreground">
              AI-powered tourism data collection system for Kazakhstan's hospitality industry
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Data Collection</li>
              <li>AI Analysis</li>
              <li>Automated Outreach</li>
              <li>Priority Ranking</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>2GIS API Docs</li>
              <li>Hackathon Guide</li>
              <li>Sample Templates</li>
              <li>Technical Specs</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Globe className="w-4 h-4" />
                mytravel.kz
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                hackathon@mytravel.kz
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                Kazakhstan
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; 2025 MyTravel.kz Hackathon. Built for tourism digitalization in Kazakhstan.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
