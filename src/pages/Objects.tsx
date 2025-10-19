import { useEffect, useState } from 'react';
import { accommodationApi } from '@/services/api';
import ObjectModal from '@/components/ObjectModal';
import { Loader2, Search, Filter } from 'lucide-react';
import type { Accommodation } from '@/types';

export default function Objects() {
  const [objects, setObjects] = useState<Accommodation[]>([]);
  const [selectedObject, setSelectedObject] = useState<Accommodation | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState({
    region: '',
    lead_status: '',
    accommodation_type: '',
    min_priority: '',
  });

  const limit = 20;

  const loadObjects = async () => {
    try {
      setLoading(true);
      const params: any = { skip: page * limit, limit };

      if (filters.region) params.region = filters.region;
      if (filters.lead_status) params.lead_status = filters.lead_status;
      if (filters.accommodation_type)
        params.accommodation_type = filters.accommodation_type;
      if (filters.min_priority)
        params.min_priority = parseFloat(filters.min_priority);

      const data = await accommodationApi.getAll(params);
      setObjects(data.items);
      setTotal(data.total);
    } catch (error) {
      console.error('Failed to load objects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadObjects();
  }, [page, filters]);

  const getLeadStatusBadge = (status: string) => {
    const colors = {
      hot: 'bg-red-100 text-red-800',
      warm: 'bg-yellow-100 text-yellow-800',
      cold: 'bg-blue-100 text-blue-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
    setPage(0);
  };

  if (loading && objects.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Objects</h1>
        <p className="text-gray-600 mt-1">
          {total} accommodations found in database
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <h3 className="font-semibold text-gray-900">Filters</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Region
            </label>
            <select
              value={filters.region}
              onChange={(e) => handleFilterChange('region', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Regions</option>
              <option value="Almaty">Almaty</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lead Status
            </label>
            <select
              value={filters.lead_status}
              onChange={(e) =>
                handleFilterChange('lead_status', e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Leads</option>
              <option value="hot">Hot</option>
              <option value="warm">Warm</option>
              <option value="cold">Cold</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              value={filters.accommodation_type}
              onChange={(e) =>
                handleFilterChange('accommodation_type', e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="luxury_glamping">Luxury Glamping</option>
              <option value="family_guest_house">Family Guest House</option>
              <option value="eco_tourism">Eco Tourism</option>
              <option value="ethno_tourism">Ethno Tourism</option>
              <option value="mountain_house">Mountain House</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Min Priority
            </label>
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={filters.min_priority}
              onChange={(e) =>
                handleFilterChange('min_priority', e.target.value)
              }
              placeholder="0-10"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Region
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lead Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {objects.map((obj) => (
                <tr
                  key={obj.id}
                  onClick={() => setSelectedObject(obj)}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {obj.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {obj.address?.substring(0, 50)}...
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-700">
                      {obj.accommodation_type?.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {obj.region}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">
                      {obj.priority_score.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getLeadStatusBadge(
                        obj.lead_status
                      )}`}
                    >
                      {obj.lead_status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {obj.rating ? `${obj.rating.toFixed(1)} ⭐` : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {obj.phone && (
                      <span className="text-gray-700">{obj.phone}</span>
                    )}
                    {obj.website && !obj.phone && (
                      <span className="text-blue-600">Website</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {page * limit + 1} to {Math.min((page + 1) * limit, total)}{' '}
            of {total} results
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setPage(page + 1)}
              disabled={(page + 1) * limit >= total}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
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