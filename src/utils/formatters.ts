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
    case 'websockets':
      return 'Websocket';
    case 'latestState':
      return 'Latest State';
    case 'latestEvents':
      return 'Recent Events';
    case 'historicalState':
      return 'Archive Data';
    case 'historicalEvents':
      return 'Archive Events';
    case 'debugMethods':
      return 'Debug Methods';
    case 'traceMethods':
      return 'Trace Methods';
    case 'erigonMethods':
      return 'Erigon Methods';
  }
}

export { formatProviderFeature, formatProviderTier };
