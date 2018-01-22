import { CustomNode } from 'libs/nodes';
import { NODES, NodeConfig, CustomNodeConfig, NodeConfigs } from 'config';

export function makeCustomNodeId(config: CustomNodeConfig): string {
  return `${config.url}:${config.port}`;
}

export function getCustomNodeConfigFromId(
  id: string,
  configs: CustomNodeConfig[]
): CustomNodeConfig | undefined {
  return configs.find(node => makeCustomNodeId(node) === id);
}

export function getNodeConfigFromId(
  id: keyof NodeConfigs,
  configs: CustomNodeConfig[]
): NodeConfig | undefined {
  if (NODES[id]) {
    return NODES[id];
  }

  const config = getCustomNodeConfigFromId(id, configs);
  if (config) {
    return makeNodeConfigFromCustomConfig(config);
  }
}

export function makeNodeConfigFromCustomConfig(config: CustomNodeConfig): NodeConfig {
  interface Override extends NodeConfig {
    network: any;
  }

  const customConfig: Override = {
    network: config.network,
    lib: new CustomNode(config),
    service: 'your custom node',
    estimateGas: true
  };

  return customConfig;
}
