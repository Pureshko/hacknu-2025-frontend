import { useEffect, useState } from 'react';
import { accommodationApi } from '@/services/api';
import { Loader2, TrendingUp, Award, Target } from 'lucide-react';
import type { Accommodation } from '@/types';
import ObjectModal from '@/components/ObjectModal';

export default function Analysis() {
  const [hotLeads, setHotLeads] = useState<Accommodation[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedObject, setSelectedObject] = useState<Accommodation | null>(
    null
  );

  useEffect(() => {
    loadAnalysis();
  }, []);

  const loadAnalysis = async () => {
    try {
      setLoading(true);
      const [leadsData, statsData] = await Promise.all([
        accommodationApi.getAll({ lead_status: 'hot', limit: 10 }),
        accommodationApi.getDashboard(),
      ]);
      setHotLeads(leadsData.items);
      setStats(statsData);
    } catch (error) {
      console.error('Failed to load analysis:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analysis</h1>
        <p className="text-gray-600 mt-1">
          Hot leads and business intelligence
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm font-medium">Hot Leads</p>
              <p className="text-4xl font-bold mt-2">{stats?.hot_leads || 0}</p>
              <p className="text-red-100 text-sm mt-1">Priority ≥ 8.0</p>
            </div>
            <TrendingUp className="w-12 h-12 text-red-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">
                Avg Priority
              </p>
              <p className="text-4xl font-bold mt-2">
                {stats?.average_priority_score.toFixed(1) || '0.0'}
              </p>
              <p className="text-green-100 text-sm mt-1">Out of 10.0</p>
            </div>
            <Award className="w-12 h-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">
                Total Objects
              </p>
              <p className="text-4xl font-bold mt-2">
                {stats?.total_accommodations || 0}
              </p>
              <p className="text-blue-100 text-sm mt-1">In database</p>
            </div>
            <Target className="w-12 h-12 text-blue-200" />
          </div>
        </div>
      </div>

      {/* Hot Leads Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Top Hot Leads (Priority ≥ 8.0)
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            These accommodations have the highest commercial potential
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Popularity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commercial
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {hotLeads.map((lead, idx) => (
                <tr
                  key={lead.id}
                  onClick={() => setSelectedObject(lead)}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-800 font-bold text-sm">
                      {idx + 1}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {lead.name}
                    </div>
                    <div className="text-sm text-gray-500">{lead.region}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                      {lead.accommodation_type?.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-1">
                        <div className="text-sm font-bold text-gray-900">
                          {lead.priority_score.toFixed(1)}/10
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className="bg-red-500 h-2 rounded-full"
                            style={{
                              width: `${(lead.priority_score / 10) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="font-semibold text-gray-900">
                      {lead.popularity_score?.toFixed(1) || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="font-semibold text-gray-900">
                      {lead.commercial_potential_score?.toFixed(1) || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {lead.rating ? (
                      <span className="text-yellow-600 font-medium">
                        {lead.rating.toFixed(1)} ⭐
                      </span>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {hotLeads.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-500">
              No hot leads found. Start scanning to discover high-priority
              accommodations.
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedObject && (
        <ObjectModal
          object={selectedObject}
          onClose={() => setSelectedObject(null)}
        />
      )}
    </div>
  );
}