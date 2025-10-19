import { X, Phone, Globe, MapPin, Star, DollarSign } from 'lucide-react';
import type { Accommodation } from '@/types';
import { useState } from 'react';
import { accommodationApi } from '@/services/api';

interface ObjectModalProps {
  object: Accommodation;
  onClose: () => void;
}

export default function ObjectModal({ object, onClose }: ObjectModalProps) {
  const [outreachMessage, setOutreachMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateOutreach = async (channel: string) => {
    try {
      setLoading(true);
      const response = await accommodationApi.generateOutreach(
        object.id,
        channel
      );
      setOutreachMessage(response.message);
    } catch (error) {
      console.error('Failed to generate outreach:', error);
      alert('Failed to generate outreach message');
    } finally {
      setLoading(false);
    }
  };

  const openContact = (type: 'phone' | 'website' | 'whatsapp') => {
    if (type === 'phone' && object.phone) {
      window.open(`tel:${object.phone}`);
    } else if (type === 'website' && object.website) {
      window.open(object.website, '_blank');
    } else if (type === 'whatsapp' && object.whatsapp) {
      window.open(`https://wa.me/${object.whatsapp}`, '_blank');
    } else if (type === 'whatsapp' && object.phone) {
      const cleanPhone = object.phone.replace(/[^0-9]/g, '');
      window.open(`https://wa.me/${cleanPhone}`, '_blank');
    }
  };

  const getLeadStatusColor = (status: string) => {
    switch (status) {
      case 'hot':
        return 'bg-red-100 text-red-800';
      case 'warm':
        return 'bg-yellow-100 text-yellow-800';
      case 'cold':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (type: string) => {
    const labels: Record<string, string> = {
      luxury_glamping: 'Люкс Глэмпинг',
      family_guest_house: 'Семейный Гостевой Дом',
      eco_tourism: 'Эко-туризм',
      ethno_tourism: 'Этно-туризм',
      mountain_house: 'Горный Домик',
    };
    return labels[type] || type;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">{object.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status & Scores */}
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getLeadStatusColor(
                object.lead_status
              )}`}
            >
              {object.lead_status.toUpperCase()} LEAD
            </span>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
              {getCategoryLabel(object.accommodation_type)}
            </span>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              Priority: {object.priority_score.toFixed(1)}/10
            </span>
          </div>

          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg text-gray-900">
                Basic Information
              </h3>
              <div className="space-y-2">
                {object.address && (
                  <div className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{object.address}</span>
                  </div>
                )}
                {object.rating && (
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="text-gray-700">
                      {object.rating.toFixed(1)} ({object.review_count || 0}{' '}
                      reviews)
                    </span>
                  </div>
                )}
                {(object.price_min || object.price_max) && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">
                      {object.price_min?.toLocaleString()} -{' '}
                      {object.price_max?.toLocaleString()} ₸/night
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-lg text-gray-900">
                Scores Breakdown
              </h3>
              <div className="space-y-2">
                {object.online_activity_score !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Online Activity:</span>
                    <span className="font-medium">
                      {object.online_activity_score.toFixed(1)}/10
                    </span>
                  </div>
                )}
                {object.popularity_score !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Popularity:</span>
                    <span className="font-medium">
                      {object.popularity_score.toFixed(1)}/10
                    </span>
                  </div>
                )}
                {object.data_completeness_score !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Data Completeness:</span>
                    <span className="font-medium">
                      {object.data_completeness_score.toFixed(1)}/10
                    </span>
                  </div>
                )}
                {object.commercial_potential_score !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Commercial Potential:
                    </span>
                    <span className="font-medium">
                      {object.commercial_potential_score.toFixed(1)}/10
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SEO Description */}
          {object.ai_generated_description && (
            <div className="space-y-3">
              <h3 className="font-semibold text-lg text-gray-900">
                AI-Generated SEO Description
              </h3>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <p className="text-gray-700 leading-relaxed">
                  {object.ai_generated_description}
                </p>
              </div>
            </div>
          )}

          {/* Original Description */}
          {object.description && (
            <div className="space-y-3">
              <h3 className="font-semibold text-lg text-gray-900">
                Original Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {object.description}
              </p>
            </div>
          )}

          {/* Amenities */}
          {object.amenities && object.amenities.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-lg text-gray-900">
                Amenities
              </h3>
              <div className="flex flex-wrap gap-2">
                {object.amenities.map((amenity, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Contact Buttons */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg text-gray-900">
              Contact & Outreach
            </h3>
            <div className="flex flex-wrap gap-3">
              {object.phone && (
                <button
                  onClick={() => openContact('phone')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Phone</span>
                </button>
              )}
              {(object.whatsapp || object.phone) && (
                <button
                  onClick={() => openContact('whatsapp')}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>WhatsApp</span>
                </button>
              )}
              {object.website && (
                <button
                  onClick={() => openContact('website')}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span>Visit Website</span>
                </button>
              )}
            </div>

            {/* Generate Outreach */}
            <div className="mt-4">
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => handleGenerateOutreach('whatsapp')}
                  disabled={loading}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 text-sm"
                >
                  Generate WhatsApp Message
                </button>
                <button
                  onClick={() => handleGenerateOutreach('email')}
                  disabled={loading}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 text-sm"
                >
                  Generate Email
                </button>
              </div>

              {outreachMessage && (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-sm text-gray-600 mb-2 font-medium">
                    Generated Message:
                  </p>
                  <p className="text-gray-700 whitespace-pre-wrap text-sm">
                    {outreachMessage}
                  </p>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(outreachMessage);
                      alert('Message copied to clipboard!');
                    }}
                    className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Copy to Clipboard
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Data Sources */}
          {object.data_sources && object.data_sources.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold text-sm text-gray-600">
                Data Sources
              </h3>
              <div className="flex gap-2">
                {object.data_sources.map((source, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                  >
                    {source}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}