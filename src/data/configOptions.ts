import { ConfigOption } from '../types';

export const configOptions: ConfigOption[] = [
  {
    id: 'kubernetes',
    title: 'Kubernetes',
    description: 'Generate Kubernetes manifests for deployments, services, and more',
    type: 'kubernetes',
    icon: 'Container'
  },
  {
    id: 'ansible',
    title: 'Ansible',
    description: 'Create Ansible playbooks and roles for infrastructure automation',
    type: 'ansible',
    icon: 'Settings2'
  },
  {
    id: 'docker',
    title: 'Docker',
    description: 'Generate Dockerfiles for containerizing your applications',
    type: 'docker',
    icon: 'Box'
  },
  {
    id: 'docker-compose',
    title: 'Docker Compose',
    description: 'Create docker-compose.yml files for multi-container environments',
    type: 'docker-compose',
    icon: 'Boxes'
  },
  {
    id: 'backup',
    title: 'Backup Scripts',
    description: 'Generate backup scripts for files and databases',
    type: 'backup',
    icon: 'Save'
  },
  {
    id: 'webserver',
    title: 'Web Server',
    description: 'Configure Nginx, Apache, or Caddy servers',
    type: 'webserver',
    icon: 'Server'
  }
];