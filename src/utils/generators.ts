import { KubernetesConfig, DockerConfig, DockerComposeConfig } from '../types';
import { stringify } from 'yaml';

export function generateKubernetesManifests(config: KubernetesConfig): string {
  const deployment = {
    apiVersion: 'apps/v1',
    kind: 'Deployment',
    metadata: {
      name: config.name,
    },
    spec: {
      replicas: config.replicas,
      selector: {
        matchLabels: {
          app: config.name,
        },
      },
      template: {
        metadata: {
          labels: {
            app: config.name,
          },
        },
        spec: {
          containers: [
            {
              name: config.name,
              image: config.image,
              ports: [
                {
                  containerPort: config.port,
                },
              ],
              env: config.env,
              resources: config.resources,
            },
          ],
        },
      },
    },
  };

  const service = {
    apiVersion: 'v1',
    kind: 'Service',
    metadata: {
      name: config.name,
    },
    spec: {
      selector: {
        app: config.name,
      },
      ports: [
        {
          port: config.port,
          targetPort: config.port,
        },
      ],
      type: 'ClusterIP',
    },
  };

  return `# Deployment
${stringify(deployment)}
---
# Service
${stringify(service)}`;
}

export function generateDockerfile(config: DockerConfig): string {
  const lines: string[] = [];

  // Base image
  lines.push(`FROM ${config.baseImage}`);
  lines.push('');

  // Working directory
  lines.push(`WORKDIR ${config.workDir}`);
  lines.push('');

  // Environment variables
  if (config.env.length > 0) {
    config.env.forEach((env) => {
      lines.push(`ENV ${env.name}=${env.value}`);
    });
    lines.push('');
  }

  // Copy files
  if (config.copyFiles.length > 0) {
    config.copyFiles.forEach((file) => {
      lines.push(`COPY ${file.src} ${file.dest}`);
    });
    lines.push('');
  }

  // Commands
  if (config.commands.length > 0) {
    config.commands.forEach((cmd) => {
      lines.push(`RUN ${cmd}`);
    });
    lines.push('');
  }

  // Expose ports
  if (config.ports.length > 0) {
    const exposePorts = config.ports.map((p) => p.container).join(' ');
    lines.push(`EXPOSE ${exposePorts}`);
    lines.push('');
  }

  return lines.join('\n').trim();
}

export function generateDockerCompose(config: DockerComposeConfig): string {
  const compose: any = {
    version: config.version,
    services: {},
  };

  // Add services
  config.services.forEach((service) => {
    compose.services[service.name] = {
      image: service.image,
      restart: service.restart,
    };

    if (service.build) {
      compose.services[service.name].build = service.build;
    }

    if (service.ports.length > 0) {
      compose.services[service.name].ports = service.ports.map(
        (p) => `${p.host}:${p.container}`
      );
    }

    if (service.environment.length > 0) {
      compose.services[service.name].environment = service.environment.reduce(
        (acc: any, curr) => {
          acc[curr.name] = curr.value;
          return acc;
        },
        {}
      );
    }

    if (service.volumes.length > 0) {
      compose.services[service.name].volumes = service.volumes.map(
        (v) => `${v.host}:${v.container}`
      );
    }

    if (service.depends_on.length > 0) {
      compose.services[service.name].depends_on = service.depends_on;
    }

    if (service.command) {
      compose.services[service.name].command = service.command;
    }
  });

  // Add volumes if any
  if (config.volumes.length > 0) {
    compose.volumes = config.volumes.reduce((acc: any, curr) => {
      acc[curr] = {};
      return acc;
    }, {});
  }

  // Add networks if any
  if (config.networks.length > 0) {
    compose.networks = config.networks.reduce((acc: any, curr) => {
      acc[curr] = {};
      return acc;
    }, {});
  }

  return stringify(compose);
}