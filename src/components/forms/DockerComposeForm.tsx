import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { DockerComposeConfig, DockerComposeService } from '../../types';

interface DockerComposeFormProps {
  onGenerate: (config: DockerComposeConfig) => void;
}

export function DockerComposeForm({ onGenerate }: DockerComposeFormProps) {
  const [config, setConfig] = useState<DockerComposeConfig>({
    version: '3.8',
    services: [],
    volumes: [],
    networks: [],
  });

  const addService = () => {
    const newService: DockerComposeService = {
      name: '',
      image: '',
      ports: [],
      environment: [],
      volumes: [],
      depends_on: [],
      restart: 'unless-stopped',
    };
    setConfig({ ...config, services: [...config.services, newService] });
  };

  const removeService = (index: number) => {
    setConfig({
      ...config,
      services: config.services.filter((_, i) => i !== index),
    });
  };

  const updateService = (index: number, field: keyof DockerComposeService, value: any) => {
    const newServices = [...config.services];
    newServices[index] = { ...newServices[index], [field]: value };
    setConfig({ ...config, services: newServices });
  };

  const addServicePort = (serviceIndex: number) => {
    const newServices = [...config.services];
    newServices[serviceIndex].ports.push({ host: 80, container: 80 });
    setConfig({ ...config, services: newServices });
  };

  const removeServicePort = (serviceIndex: number, portIndex: number) => {
    const newServices = [...config.services];
    newServices[serviceIndex].ports = newServices[serviceIndex].ports.filter(
      (_, i) => i !== portIndex
    );
    setConfig({ ...config, services: newServices });
  };

  const updateServicePort = (
    serviceIndex: number,
    portIndex: number,
    field: 'host' | 'container',
    value: number
  ) => {
    const newServices = [...config.services];
    newServices[serviceIndex].ports[portIndex][field] = value;
    setConfig({ ...config, services: newServices });
  };

  const addServiceEnv = (serviceIndex: number) => {
    const newServices = [...config.services];
    newServices[serviceIndex].environment.push({ name: '', value: '' });
    setConfig({ ...config, services: newServices });
  };

  const removeServiceEnv = (serviceIndex: number, envIndex: number) => {
    const newServices = [...config.services];
    newServices[serviceIndex].environment = newServices[serviceIndex].environment.filter(
      (_, i) => i !== envIndex
    );
    setConfig({ ...config, services: newServices });
  };

  const updateServiceEnv = (
    serviceIndex: number,
    envIndex: number,
    field: 'name' | 'value',
    value: string
  ) => {
    const newServices = [...config.services];
    newServices[serviceIndex].environment[envIndex][field] = value;
    setConfig({ ...config, services: newServices });
  };

  const addVolume = () => {
    setConfig({ ...config, volumes: [...config.volumes, ''] });
  };

  const removeVolume = (index: number) => {
    setConfig({
      ...config,
      volumes: config.volumes.filter((_, i) => i !== index),
    });
  };

  const updateVolume = (index: number, value: string) => {
    const newVolumes = [...config.volumes];
    newVolumes[index] = value;
    setConfig({ ...config, volumes: newVolumes });
  };

  const addNetwork = () => {
    setConfig({ ...config, networks: [...config.networks, ''] });
  };

  const removeNetwork = (index: number) => {
    setConfig({
      ...config,
      networks: config.networks.filter((_, i) => i !== index),
    });
  };

  const updateNetwork = (index: number, value: string) => {
    const newNetworks = [...config.networks];
    newNetworks[index] = value;
    setConfig({ ...config, networks: newNetworks });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(config);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Services</h3>
          <button
            type="button"
            onClick={addService}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Service
          </button>
        </div>

        {config.services.map((service, serviceIndex) => (
          <div key={serviceIndex} className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-medium text-gray-700">Service #{serviceIndex + 1}</h4>
              <button
                type="button"
                onClick={() => removeService(serviceIndex)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Service Name</label>
                <input
                  type="text"
                  value={service.name}
                  onChange={(e) => updateService(serviceIndex, 'name', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <input
                  type="text"
                  value={service.image}
                  onChange={(e) => updateService(serviceIndex, 'image', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Ports</label>
                <button
                  type="button"
                  onClick={() => addServicePort(serviceIndex)}
                  className="inline-flex items-center px-2 py-1 text-sm text-blue-700 hover:text-blue-800"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Port
                </button>
              </div>
              {service.ports.map((port, portIndex) => (
                <div key={portIndex} className="flex gap-2 mb-2">
                  <input
                    type="number"
                    value={port.host}
                    onChange={(e) =>
                      updateServicePort(serviceIndex, portIndex, 'host', parseInt(e.target.value))
                    }
                    placeholder="Host Port"
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    min="1"
                    max="65535"
                  />
                  <input
                    type="number"
                    value={port.container}
                    onChange={(e) =>
                      updateServicePort(serviceIndex, portIndex, 'container', parseInt(e.target.value))
                    }
                    placeholder="Container Port"
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    min="1"
                    max="65535"
                  />
                  <button
                    type="button"
                    onClick={() => removeServicePort(serviceIndex, portIndex)}
                    className="p-2 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Environment Variables</label>
                <button
                  type="button"
                  onClick={() => addServiceEnv(serviceIndex)}
                  className="inline-flex items-center px-2 py-1 text-sm text-blue-700 hover:text-blue-800"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Variable
                </button>
              </div>
              {service.environment.map((env, envIndex) => (
                <div key={envIndex} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={env.name}
                    onChange={(e) =>
                      updateServiceEnv(serviceIndex, envIndex, 'name', e.target.value)
                    }
                    placeholder="Name"
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={env.value}
                    onChange={(e) =>
                      updateServiceEnv(serviceIndex, envIndex, 'value', e.target.value)
                    }
                    placeholder="Value"
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeServiceEnv(serviceIndex, envIndex)}
                    className="p-2 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Restart Policy</label>
              <select
                value={service.restart}
                onChange={(e) => updateService(serviceIndex, 'restart', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="no">No</option>
                <option value="always">Always</option>
                <option value="on-failure">On Failure</option>
                <option value="unless-stopped">Unless Stopped</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">Volumes</label>
          <button
            type="button"
            onClick={addVolume}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Volume
          </button>
        </div>
        {config.volumes.map((volume, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={volume}
              onChange={(e) => updateVolume(index, e.target.value)}
              placeholder="Volume Name"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => removeVolume(index)}
              className="p-2 text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">Networks</label>
          <button
            type="button"
            onClick={addNetwork}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Network
          </button>
        </div>
        {config.networks.map((network, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={network}
              onChange={(e) => updateNetwork(index, e.target.value)}
              placeholder="Network Name"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => removeNetwork(index)}
              className="p-2 text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Generate Docker Compose
        </button>
      </div>
    </form>
  );
}