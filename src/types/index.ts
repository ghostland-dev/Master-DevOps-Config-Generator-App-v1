export type ConfigType = 'kubernetes' | 'ansible' | 'docker' | 'docker-compose' | 'backup' | 'webserver';

export interface ConfigOption {
  id: string;
  title: string;
  description: string;
  type: ConfigType;
  icon: string;
}

export interface KubernetesConfig {
  name: string;
  image: string;
  replicas: number;
  port: number;
  env: { name: string; value: string }[];
  resources: {
    requests: {
      cpu: string;
      memory: string;
    };
    limits: {
      cpu: string;
      memory: string;
    };
  };
}

export interface DockerConfig {
  baseImage: string;
  workDir: string;
  ports: { container: number; host: number }[];
  env: { name: string; value: string }[];
  commands: string[];
  copyFiles: { src: string; dest: string }[];
  exposedPorts: number[];
  volumes: { host: string; container: string }[];
}

export interface DockerComposeService {
  name: string;
  image: string;
  build?: {
    context: string;
    dockerfile: string;
  };
  ports: { host: number; container: number }[];
  environment: { name: string; value: string }[];
  volumes: { host: string; container: string }[];
  depends_on: string[];
  command?: string;
  restart: string;
}

export interface DockerComposeConfig {
  version: string;
  services: DockerComposeService[];
  volumes: string[];
  networks: string[];
}