// /gebral-Estate/ui/src/components/agents/ConstructionAnalyzerAgent.jsx
import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { 
  BuildingOfficeIcon, 
  MapPinIcon, 
  CalendarIcon,
  ArrowPathIcon,
  AdjustmentsHorizontalIcon,
  MapIcon,
  BuildingLibraryIcon
} from '@heroicons/react/24/outline';
import { formatDate } from '@utils/formatting';
import { useAgentPolling } from '@hooks/useAgentPolling';

const ConstructionAnalyzerAgent = ({ initialProjects }) => {
  const { data, isLoading, lastUpdated, fetchData } = useAgentPolling('construction-analyzer', 300000); // 5 min polling
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'high', 'moderate', 'low'
  const [selectedProject, setSelectedProject] = useState(null);
  
  const defaultProjects = [
    {
      id: 'CP001',
      name: 'Emaar Creek Vista',
      location: 'Dubai Creek Harbour',
      status: 'Under Construction',
      completion_date: '2026-03',
      units: 485,
      impact: 'moderate',
      impact_radius: 2.5,
      developer: 'Emaar Properties',
      details: 'Luxury residential development with waterfront views',
      affected_areas: ['Dubai Creek', 'Ras Al Khor', 'Business Bay']
    },
    {
      id: 'CP002',
      name: 'DAMAC Hills Extension',
      location: 'Dubailand',
      status: 'Planned',
      completion_date: '2027-06',
      units: 820,
      impact: 'high',
      impact_radius: 5,
      developer: 'DAMAC Properties',
      details: 'Mixed-use development with villas and apartments',
      affected_areas: ['Dubailand', 'Al Barsha South', 'Dubai Motor City']
    },
    {
      id: 'CP003',
      name: 'Nakheel Palm West',
      location: 'Palm Jumeirah',
      status: 'Approved',
      completion_date: '2026-09',
      units: 360,
      impact: 'low',
      impact_radius: 1.5,
      developer: 'Nakheel',
      details: 'Premium beachfront residences',
      affected_areas: ['Palm Jumeirah West']
    }
  ];

  // Update projects when data changes
  useEffect(() => {
    if (data?.projects && data.projects.length > 0) {
      setProjects(data.projects);
    } else if (initialProjects) {
      setProjects(initialProjects);
    } else {
      setProjects(defaultProjects);
    }
  }, [data, initialProjects]);
  
  // Filter projects based on active filter
  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'all') return true;
    return project.impact === activeFilter;
  });
  
  // Helper function to format date
  const formatProjectDate = (dateString) => {
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
  
  // Get status badge color
  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'Under Construction': return 'warning';
      case 'Approved': return 'success';
      case 'Planned': return 'info';
      default: return 'default';
    }
  };

  return (
    <Card
      title="Construction Project Analyzer"
      subtitle={`${projects.length} developments affecting rental markets`}
      icon={BuildingOfficeIcon}
      headerClassName="flex justify-between items-center"
      headerContent={
        <div className="flex items-center space-x-2">
          <div className="text-xs bg-white/10 px-2 py-1 rounded">
            {lastUpdated ? `Updated ${formatDate(lastUpdated, 'relative')}` : 'Analyzing projects'}
          </div>
          <button 
            onClick={fetchData} 
            className="p-1 rounded-full hover:bg-white/10 text-gray-light"
            disabled={isLoading}
          >
            <ArrowPathIcon className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      }
    >
      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
        <div className="text-sm text-gray-light">Filter by impact:</div>
        <div className="flex space-x-2">
          <Badge 
            variant={activeFilter === 'all' ? 'primary' : 'default'} 
            size="sm" 
            rounded="full"
            className="cursor-pointer"
            onClick={() => setActiveFilter('all')}
          >
            All
          </Badge>
          <Badge 
            variant={activeFilter === 'high' ? 'danger' : 'default'} 
            size="sm" 
            rounded="full"
            className="cursor-pointer"
            onClick={() => setActiveFilter('high')}
          >
            High
          </Badge>
          <Badge 
            variant={activeFilter === 'moderate' ? 'warning' : 'default'} 
            size="sm" 
            rounded="full"
            className="cursor-pointer"
            onClick={() => setActiveFilter('moderate')}
          >
            Moderate
          </Badge>
          <Badge 
            variant={activeFilter === 'low' ? 'success' : 'default'} 
            size="sm" 
            rounded="full"
            className="cursor-pointer"
            onClick={() => setActiveFilter('low')}
          >
            Low
          </Badge>
        </div>
      </div>
    
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-6 text-gray-light">
              No construction projects match the selected filter
            </div>
          ) : (
            filteredProjects.map((project, index) => (
              <div 
                key={project.id || index} 
                className={`${
                  index < filteredProjects.length - 1 ? 'pb-6 border-b border-white/10' : ''
                } cursor-pointer transition-all duration-200 hover:bg-white/5 -mx-4 px-4 py-2 rounded-lg`}
                onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-lg">{project.name}</h3>
                  <Badge 
                    variant={getStatusBadgeVariant(project.status)} 
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
                    <span className="text-sm">{formatProjectDate(project.completion_date)}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <BuildingOfficeIcon className="w-4 h-4 text-gray-light mr-2 flex-shrink-0" />
                    <span className="text-sm">{project.units} units</span>
                  </div>
                  
                  <div className="flex items-center">
                    <BuildingLibraryIcon className="w-4 h-4 text-gray-light mr-2 flex-shrink-0" />
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
                
                {selectedProject === project.id && (
                  <div className="mt-4 bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="text-sm mb-2">
                      <span className="text-gray-light">Impact radius:</span>
                      <span className="ml-2">{project.impact_radius} km</span>
                    </div>
                    
                    {project.affected_areas && project.affected_areas.length > 0 && (
                      <div className="mb-3">
                        <div className="text-sm text-gray-light mb-2">Affected areas:</div>
                        <div className="flex flex-wrap gap-2">
                          {project.affected_areas.map((area, idx) => (
                            <Badge key={idx} variant="info" size="sm" icon={MapPinIcon}>
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-end mt-2">
                      <Button size="xs" variant="outline" icon={MapIcon}>
                        View on Map
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </Card>
  );
};

export default ConstructionAnalyzerAgent;