import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { DockerConfig } from '../../types';

interface DockerFormProps {
  onGenerate: (config: DockerConfig) => void;
}

export function DockerForm({ onGenerate }: DockerFormProps) {
  const [config, setConfig] = useState<DockerConfig>({
    baseImage: 'node:18-alpine',
    workDir: '/app',
    ports: [],
    env: [],
    commands: [],
    copyFiles: [],
    exposedPorts: [],
    volumes: [],
  });

  const addPort = () => {
    setConfig({
      ...config,
      ports: [...config.ports, { container: 80, host: 8080 }],
    });
  };

  const removePort = (index: number) => {
    setConfig({
      ...config,
      ports: config.ports.filter((_, i) => i !== index),
    });
  };

  const updatePort = (index: number, field: 'container' | 'host', value: number) => {
    const newPorts = [...config.ports];
    newPorts[index] = { ...newPorts[index], [field]: value };
    setConfig({ ...config, ports: newPorts });
  };

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

  const addCommand = () => {
    setConfig({
      ...config,
      commands: [...config.commands, ''],
    });
  };

  const removeCommand = (index: number) => {
    setConfig({
      ...config,
      commands: config.commands.filter((_, i) => i !== index),
    });
  };

  const updateCommand = (index: number, value: string) => {
    const newCommands = [...config.commands];
    newCommands[index] = value;
    setConfig({ ...config, commands: newCommands });
  };

  const addCopyFile = () => {
    setConfig({
      ...config,
      copyFiles: [...config.copyFiles, { src: '', dest: '' }],
    });
  };

  const removeCopyFile = (index: number) => {
    setConfig({
      ...config,
      copyFiles: config.copyFiles.filter((_, i) => i !== index),
    });
  };

  const updateCopyFile = (index: number, field: 'src' | 'dest', value: string) => {
    const newCopyFiles = [...config.copyFiles];
    newCopyFiles[index] = { ...newCopyFiles[index], [field]: value };
    setConfig({ ...config, copyFiles: newCopyFiles });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(config);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Base Image</label>
          <input
            type="text"
            value={config.baseImage}
            onChange={(e) => setConfig({ ...config, baseImage: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Working Directory</label>
          <input
            type="text"
            value={config.workDir}
            onChange={(e) => setConfig({ ...config, workDir: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">Port Mappings</label>
          <button
            type="button"
            onClick={addPort}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Port
          </button>
        </div>
        <div className="space-y-2">
          {config.ports.map((port, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="number"
                value={port.container}
                onChange={(e) => updatePort(index, 'container', parseInt(e.target.value))}
                placeholder="Container Port"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="1"
                max="65535"
              />
              <input
                type="number"
                value={port.host}
                onChange={(e) => updatePort(index, 'host', parseInt(e.target.value))}
                placeholder="Host Port"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="1"
                max="65535"
              />
              <button
                type="button"
                onClick={() => removePort(index)}
                className="p-2 text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
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
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">Commands</label>
          <button
            type="button"
            onClick={addCommand}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Command
          </button>
        </div>
        <div className="space-y-2">
          {config.commands.map((command, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={command}
                onChange={(e) => updateCommand(index, e.target.value)}
                placeholder="Command"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => removeCommand(index)}
                className="p-2 text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">Copy Files</label>
          <button
            type="button"
            onClick={addCopyFile}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add File
          </button>
        </div>
        <div className="space-y-2">
          {config.copyFiles.map((file, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={file.src}
                onChange={(e) => updateCopyFile(index, 'src', e.target.value)}
                placeholder="Source"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <input
                type="text"
                value={file.dest}
                onChange={(e) => updateCopyFile(index, 'dest', e.target.value)}
                placeholder="Destination"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => removeCopyFile(index)}
                className="p-2 text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Generate Dockerfile
        </button>
      </div>
    </form>
  );
}