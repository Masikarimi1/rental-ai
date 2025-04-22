// /gebral-Estate/ui/src/components/agents/ConstructionAnalyzerAgent.jsx
import React from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { BuildingOfficeIcon, MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline';

const ConstructionAnalyzerAgent = ({ projects }) => {
  const defaultProjects = [
    {
      name: 'Emaar Creek Vista',
      location: 'Dubai Creek Harbour',
      status: 'Under Construction',
      completion_date: '2026-03',
      units: 485,
      impact: 'moderate',
      impact_radius: 2.5,
      developer: 'Emaar Properties',
      details: 'Luxury residential development with waterfront views'
    },
    {
      name: 'DAMAC Hills Extension',
      location: 'Dubailand',
      status: 'Planned',
      completion_date: '2027-06',
      units: 820,
      impact: 'high',
      impact_radius: 5,
      developer: 'DAMAC Properties',
      details: 'Mixed-use development with villas and apartments'
    },
    {
      name: 'Nakheel Palm West',
      location: 'Palm Jumeirah',
      status: 'Approved',
      completion_date: '2026-09',
      units: 360,
      impact: 'low',
      impact_radius: 1.5,
      developer: 'Nakheel',
      details: 'Premium beachfront residences'
    }
  ];

  const constructionProjects = projects || defaultProjects;
  
  // Helper function to format date
  const formatDate = (dateString) => {
    const [year, month] = dateString.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  // Determine impact badge color
  const getImpactBadgeVariant = (impact) => {
    switch (impact.toLowerCase()) {
      case 'high': return 'danger';
      case 'moderate': return 'warning';
      case 'low': return 'success';
      default: return 'info';
    }
  };

  return (
    <Card
      title="Construction Project Analyzer"
      subtitle="Upcoming developments affecting rental markets"
      icon={BuildingOfficeIcon}
    >
      <div className="space-y-6">
        {constructionProjects.map((project, index) => (
          <div 
            key={index} 
            className={`${
              index < constructionProjects.length - 1 ? 'pb-6 border-b border-white/10' : ''
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-medium text-lg">{project.name}</h3>
              <Badge 
                variant={project.status === 'Under Construction' ? 'warning' : project.status === 'Approved' ? 'success' : 'info'} 
                size="sm"
              >
                {project.status}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-y-3 gap-x-6 mb-3">
              <div className="flex items-center">
                <MapPinIcon className="w-4 h-4 text-gray-light mr-2 flex-shrink-0" />
                <span className="text-sm">{project.location}</span>
              </div>
              
              <div className="flex items-center">
                <CalendarIcon className="w-4 h-4 text-gray-light mr-2 flex-shrink-0" />
                <span className="text-sm">{formatDate(project.completion_date)}</span>
              </div>
              
              <div className="flex items-center">
                <BuildingOfficeIcon className="w-4 h-4 text-gray-light mr-2 flex-shrink-0" />
                <span className="text-sm">{project.units} units</span>
              </div>
              
              <div className="flex items-center">
                <span className="text-sm text-gray-light mr-2">Developer:</span>
                <span className="text-sm truncate">{project.developer}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-light">{project.details}</div>
              
              <Badge 
                variant={getImpactBadgeVariant(project.impact)} 
                size="sm"
                rounded="full"
              >
                {project.impact.charAt(0).toUpperCase() + project.impact.slice(1)} impact
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ConstructionAnalyzerAgent;