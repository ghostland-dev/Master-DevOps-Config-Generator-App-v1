import React from 'react';
import * as Icons from 'lucide-react';
import { ConfigOption } from '../types';

interface ConfigCardProps {
  config: ConfigOption;
  onClick: (type: ConfigOption) => void;
}

export function ConfigCard({ config, onClick }: ConfigCardProps) {
  const Icon = Icons[config.icon as keyof typeof Icons];

  return (
    <button
      onClick={() => onClick(config)}
      className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 text-left w-full"
    >
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-blue-50 rounded-lg">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{config.title}</h3>
          <p className="mt-1 text-sm text-gray-500">{config.description}</p>
        </div>
      </div>
    </button>
  );
}