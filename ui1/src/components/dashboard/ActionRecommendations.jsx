// /gebral-Estate/ui/src/components/dashboard/ActionRecommendations.jsx
import React from 'react';
import GlassCard from '../common/GlassCard';
import Button from '../common/Button';
import { CheckIcon, LightBulbIcon, GiftIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

const ActionRecommendations = ({ onApply, actionApplied }) => {
  return (
    <GlassCard>
      <div className="flex items-center mb-4">
        <LightBulbIcon className="w-5 h-5 text-primary-light mr-2" />
        <h3 className="font-semibold">Recommended Actions</h3>
      </div>
      
      <div className="space-y-4">
        <div className="p-3 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center mb-2">
            <ArrowDownIcon className="w-4 h-4 text-danger mr-2" />
            <span className="font-medium">Lower rent by 5%</span>
          </div>
          <p className="text-sm text-gray-light mb-3">
            For Al Barsha 2BRs to match current market demand
          </p>
          {actionApplied ? (
            <div className="flex items-center text-success text-sm">
              <CheckIcon className="w-4 h-4 mr-1" />
              <span>Applied successfully</span>
            </div>
          ) : (
            <Button size="sm" fullWidth onClick={onApply}>
              Apply
            </Button>
          )}
        </div>
        
        <div className="p-3 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center mb-2">
            <GiftIcon className="w-4 h-4 text-warning mr-2" />
            <span className="font-medium">Offer 1 month free</span>
          </div>
          <p className="text-sm text-gray-light mb-3">
            For new 12-month leases in Al Barsha 2BRs
          </p>
          <Button variant="outline" size="sm" fullWidth>
            Apply
          </Button>
        </div>
      </div>
    </GlassCard>
  );
};

export default ActionRecommendations;
