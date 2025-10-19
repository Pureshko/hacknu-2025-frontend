import { Link, useLocation } from 'react-router-dom';
import { Home, Database, BarChart3, Download } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const links = [
    { to: '/', label: 'Dashboard', icon: Home },
    { to: '/objects', label: 'Objects', icon: Database },
    { to: '/analysis', label: 'Analysis', icon: BarChart3 },
    { to: '/export', label: 'Export', icon: Download },
  ];

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="font-bold text-xl text-gray-900">
                MyTravel AI
              </span>
            </Link>

            <div className="hidden md:flex space-x-1">
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}