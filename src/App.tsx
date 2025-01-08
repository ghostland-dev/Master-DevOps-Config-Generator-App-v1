import React, { useState } from 'react';
import { ConfigCard } from './components/ConfigCard';
import { CodePreview } from './components/CodePreview';
import { KubernetesForm } from './components/forms/KubernetesForm';
import { DockerForm } from './components/forms/DockerForm';
import { DockerComposeForm } from './components/forms/DockerComposeForm';
import { configOptions } from './data/configOptions';
import { ConfigOption, KubernetesConfig, DockerConfig, DockerComposeConfig } from './types';
import { generateKubernetesManifests, generateDockerfile, generateDockerCompose } from './utils/generators';
import { FileCode } from 'lucide-react';

function App() {
  const [selectedConfig, setSelectedConfig] = useState<ConfigOption | null>(null);
  const [generatedCode, setGeneratedCode] = useState<string>('');

  const handleConfigSelect = (config: ConfigOption) => {
    setSelectedConfig(config);
    setGeneratedCode('');
  };

  const handleKubernetesGenerate = (config: KubernetesConfig) => {
    const manifests = generateKubernetesManifests(config);
    setGeneratedCode(manifests);
  };

  const handleDockerGenerate = (config: DockerConfig) => {
    const dockerfile = generateDockerfile(config);
    setGeneratedCode(dockerfile);
  };

  const handleDockerComposeGenerate = (config: DockerComposeConfig) => {
    const compose = generateDockerCompose(config);
    setGeneratedCode(compose);
  };

  const renderForm = () => {
    if (!selectedConfig) return null;

    switch (selectedConfig.type) {
      case 'kubernetes':
        return <KubernetesForm onGenerate={handleKubernetesGenerate} />;
      case 'docker':
        return <DockerForm onGenerate={handleDockerGenerate} />;
      case 'docker-compose':
        return <DockerComposeForm onGenerate={handleDockerComposeGenerate} />;
      default:
        return (
          <p className="text-gray-500">
            Configuration form for {selectedConfig.title} coming soon...
          </p>
        );
    }
  };

  const getLanguage = () => {
    if (!selectedConfig) return 'yaml';
    switch (selectedConfig.type) {
      case 'docker':
        return 'dockerfile';
      case 'kubernetes':
      case 'docker-compose':
        return 'yaml';
      default:
        return 'yaml';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <FileCode className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">DevOps Config Generator</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {configOptions.map((config) => (
            <ConfigCard
              key={config.id}
              config={config}
              onClick={handleConfigSelect}
            />
          ))}
        </div>

        {selectedConfig && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {selectedConfig.title} Configuration
            </h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              {renderForm()}
              {generatedCode && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Generated Configuration</h3>
                  <CodePreview code={generatedCode} language={getLanguage()} />
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;