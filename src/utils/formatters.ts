import { MethodGroup } from './methods';
import { Feature } from './providers';

function formatProviderFeature(feature: Feature): string {
  switch (feature) {
    case 'websockets':
      return 'Websockets';
    case 'latestState':
      return 'Latest State';
    case 'latestEvents':
      return 'Recent Events';
    case 'historicalState':
      return 'Archive Data';
    case 'historicalEvents':
      return 'Archive Events';
  }
}

function formatMethodGroup(group: MethodGroup): string {
  switch (group) {
    case 'reading':
      return 'Reading';
    case 'writing':
      return 'Writing';
    case 'debug':
      return 'Debug methods';
    case 'trace':
      return 'Tracing';
    case 'erigon':
      return 'Erigon';
  }
}

function formatRelativeTime(date: Date): string {
  // Get the difference in seconds
  const diffInSeconds = (date.getTime() - Date.now()) / 1000;

  // Calculate differences
  const minutes = Math.round(diffInSeconds / 60);
  const hours = Math.round(diffInSeconds / 3600);
  const days = Math.round(diffInSeconds / 86400);
  const months = Math.round(diffInSeconds / (86400 * 30));
  const years = Math.round(diffInSeconds / (86400 * 365));

  // Create a RelativeTimeFormat instance (you can also specify the language)
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  // Determine which format to use based on the magnitude of difference
  if (Math.abs(minutes) < 60) {
    return rtf.format(minutes, 'minute');
  } else if (Math.abs(hours) < 24) {
    return rtf.format(hours, 'hour');
  } else if (Math.abs(days) < 30) {
    return rtf.format(days, 'day');
  } else if (Math.abs(months) < 12) {
    return rtf.format(months, 'month');
  } else {
    return rtf.format(years, 'year');
  }
}

export { formatProviderFeature, formatMethodGroup, formatRelativeTime };
