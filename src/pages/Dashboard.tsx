import { useEffect, useState } from 'react';
import { accommodationApi } from '@/services/api';
import StatsCard from '@/components/StatsCard';
import {
  Building2,
  TrendingUp,
  MapPin,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import type { DashboardStats } from '@/types';

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await accommodationApi.getDashboard();
      setStats(data);
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleStartScan = async (source: '2gis' | 'google') => {
    try {
      setScanning(true);
      if (source === '2gis') {
        await accommodationApi.startScan();
      } else {
        await accommodationApi.startGoogleScan();
      }
      alert(
        `${source === '2gis' ? '2GIS' : 'Google Places'} scan started! Check Objects page in a few minutes.`
      );
    } catch (error) {
      console.error('Failed to start scan:', error);
      alert('Failed to start scan');
    } finally {
      setScanning(false);
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            MyTravel AI Agent System Overview
          </p>
        </div>
        <button
          onClick={loadStats}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Accommodations"
          value={stats?.total_accommodations || 0}
          icon={Building2}
          color="bg-blue-500"
        />
        <StatsCard
          title="Hot Leads"
          value={stats?.hot_leads || 0}
          icon={TrendingUp}
          color="bg-red-500"
          subtitle="Priority ≥ 8.0"
        />
        <StatsCard
          title="Average Priority"
          value={stats?.average_priority_score.toFixed(1) || '0.0'}
          icon={MapPin}
          color="bg-green-500"
        />
      </div>

      {/* Scan Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Start Data Collection
        </h2>
        <div className="flex gap-4">
          <button
            onClick={() => handleStartScan('2gis')}
            disabled={scanning}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {scanning ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <RefreshCw className="w-5 h-5" />
            )}
            Scan 2GIS
          </button>
          <button
            onClick={() => handleStartScan('google')}
            disabled={scanning}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {scanning ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <RefreshCw className="w-5 h-5" />
            )}
            Scan Google Places
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-3">
          Scans run in background. Results appear in Objects page after a few
          minutes.
        </p>
      </div>

      {/* Regions & Types */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            By Region
          </h3>
          <div className="space-y-3">
            {stats?.by_region &&
              Object.entries(stats.by_region).map(([region, count]) => (
                <div key={region} className="flex justify-between items-center">
                  <span className="text-gray-700">{region || 'Unknown'}</span>
                  <span className="font-semibold text-gray-900">{count}</span>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            By Type
          </h3>
          <div className="space-y-3">
            {stats?.by_type &&
              Object.entries(stats.by_type).map(([type, count]) => (
                <div key={type} className="flex justify-between items-center">
                  <span className="text-gray-700">
                    {type?.replace('_', ' ') || 'Unknown'}
                  </span>
                  <span className="font-semibold text-gray-900">{count}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}