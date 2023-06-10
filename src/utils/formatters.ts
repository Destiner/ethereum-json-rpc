import { Tier, Feature } from './providers';

function formatProviderTier(tier: Tier): string {
  switch (tier) {
    case 'no_key':
      return 'No Key';
    case 'free_key':
      return 'Free Key';
    case 'paid_key':
      return 'Paid Key';
  }
}

function formatProviderFeature(feature: Feature): string {
  switch (feature) {
    case 'websocket':
      return 'Websocket';
    case 'archive_node':
      return 'Archive Data';
    case 'debug':
      return 'Debug Methods';
    case 'traces':
      return 'Trace Methods';
    case 'erigon':
      return 'Erigon Node';
  }
}

export { formatProviderFeature, formatProviderTier };
