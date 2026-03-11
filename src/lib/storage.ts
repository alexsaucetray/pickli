import type { ScanHistoryItem, PickliAnalysis } from '../types';

const STORAGE_KEY = 'pickli_history_v1';

export function getScanHistory(): ScanHistoryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown[];
    // Filter out any malformed entries (e.g. from old schema)
    return parsed.filter(
      (item: any) => item && item.analysis && typeof item.analysis.healthScore === 'number'
    ) as ScanHistoryItem[];
  } catch {
    return [];
  }
}

export function addToHistory(analysis: PickliAnalysis): ScanHistoryItem[] {
  const item: ScanHistoryItem = {
    id: `scan_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    analysis,
    scannedAt: Date.now(),
  };
  const history = getScanHistory();
  history.unshift(item);
  // Keep last 50 scans
  if (history.length > 50) history.length = 50;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  return history;
}

export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}
