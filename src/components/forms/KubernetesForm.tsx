import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { KubernetesConfig } from '../../types';

interface KubernetesFormProps {
  onGenerate: (config: KubernetesConfig) => void;
}

export function KubernetesForm({ onGenerate }: KubernetesFormProps) {
  const [config, setConfig] = useState<KubernetesConfig>({
    name: '',
    image: '',
    replicas: 1,
    port: 80,
    env: [],
    resources: {
      requests: {
        cpu: '100m',
        memory: '128Mi',
      },
      limits: {
        cpu: '200m',
        memory: '256Mi',
      },
    },
  });

  const addEnvVar = () => {
    setConfig({
      ...config,
      env: [...config.env, { name: '', value: '' }],
    });
  };

  const removeEnvVar = (index: number) => {
    setConfig({
      ...config,
      env: config.env.filter((_, i) => i !== index),
    });
  };

  const updateEnvVar = (index: number, field: 'name' | 'value', value: string) => {
    const newEnv = [...config.env];
    newEnv[index] = { ...newEnv[index], [field]: value };
    setConfig({ ...config, env: newEnv });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(config);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Application Name</label>
          <input
            type="text"
            value={config.name}
            onChange={(e) => setConfig({ ...config, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Docker Image</label>
          <input
            type="text"
            value={config.image}
            onChange={(e) => setConfig({ ...config, image: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Replicas</label>
          <input
            type="number"
            value={config.replicas}
            onChange={(e) => setConfig({ ...config, replicas: parseInt(e.target.value) })}
            min="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Container Port</label>
          <input
            type="number"
            value={config.port}
            onChange={(e) => setConfig({ ...config, port: parseInt(e.target.value) })}
            min="1"
            max="65535"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">Environment Variables</label>
          <button
            type="button"
            onClick={addEnvVar}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Variable
          </button>
        </div>
        <div className="space-y-2">
          {config.env.map((env, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={env.name}
                onChange={(e) => updateEnvVar(index, 'name', e.target.value)}
                placeholder="Name"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <input
                type="text"
                value={env.value}
                onChange={(e) => updateEnvVar(index, 'value', e.target.value)}
                placeholder="Value"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => removeEnvVar(index)}
                className="p-2 text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Resource Limits</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">CPU Request</label>
            <input
              type="text"
              value={config.resources.requests.cpu}
              onChange={(e) =>
                setConfig({
                  ...config,
                  resources: {
                    ...config.resources,
                    requests: { ...config.resources.requests, cpu: e.target.value },
                  },
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Memory Request</label>
            <input
              type="text"
              value={config.resources.requests.memory}
              onChange={(e) =>
                setConfig({
                  ...config,
                  resources: {
                    ...config.resources,
                    requests: { ...config.resources.requests, memory: e.target.value },
                  },
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">CPU Limit</label>
            <input
              type="text"
              value={config.resources.limits.cpu}
              onChange={(e) =>
                setConfig({
                  ...config,
                  resources: {
                    ...config.resources,
                    limits: { ...config.resources.limits, cpu: e.target.value },
                  },
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Memory Limit</label>
            <input
              type="text"
              value={config.resources.limits.memory}
              onChange={(e) =>
                setConfig({
                  ...config,
                  resources: {
                    ...config.resources,
                    limits: { ...config.resources.limits, memory: e.target.value },
                  },
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Generate Configuration
        </button>
      </div>
    </form>
  );
}