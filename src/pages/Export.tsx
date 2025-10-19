import { useState } from 'react';
import { accommodationApi } from '@/services/api';
import { Download, FileText, Loader2 } from 'lucide-react';

export default function Export() {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    try {
      setLoading(true);
      const blob = await accommodationApi.exportCSV();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mytravel-accommodations-${Date.now()}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Export</h1>
        <p className="text-gray-600 mt-1">
          Download accommodation data in various formats
        </p>
      </div>

      {/* Export Options */}
      <div className="grid gap-6 max-w-2xl">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                Export to CSV
              </h3>
              <p className="text-gray-600 mt-1 text-sm">
                Download all accommodations with full details including AI
                descriptions, priority scores, and contact information.
              </p>
              <div className="mt-4">
                <button
                  onClick={handleExport}
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Download className="w-5 h-5" />
                  )}
                  Download CSV
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h4 className="font-semibold text-blue-900 mb-2">
            CSV File Contents
          </h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• ID, Name, Type, Region</li>
            <li>• Address, Coordinates</li>
            <li>• Contact: Phone, Email, Website</li>
            <li>• Priority Score & Lead Status</li>
            <li>• Rating & Reviews</li>
            <li>• AI-Generated SEO Description</li>
          </ul>
        </div>
      </div>
    </div>
  );
}