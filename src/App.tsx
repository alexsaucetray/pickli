import { useReducer, useCallback } from 'react';
import type { AppState, AppAction, UploadedImage, PickliAnalysis } from './types';
import { MOCK_ANALYSIS } from './mock-data';
import { analyzeImages, applyDeterministicScore } from './lib/gemini';
import { compressImage, fileToDataUrl } from './lib/image-utils';
import { getScanHistory, addToHistory } from './lib/storage';
import Header from './components/Header';
import UploadView from './components/UploadView';
import ScanningView from './components/ScanningView';
import ResultsDashboard from './components/ResultsDashboard';
import HistoryView from './components/HistoryView';

const initialState: AppState = {
  view: 'upload',
  images: [],
  analysis: null,
  history: getScanHistory(),
  loading: false,
  error: null,
};

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_IMAGE': {
      const filtered = state.images.filter((i) => i.slot !== action.image.slot);
      return { ...state, images: [...filtered, action.image] };
    }
    case 'REMOVE_IMAGE':
      return { ...state, images: state.images.filter((i) => i.slot !== action.slot) };
    case 'START_SCAN':
      return { ...state, view: 'scanning', loading: true, error: null };
    case 'SCAN_SUCCESS': {
      const history = addToHistory(action.analysis);
      return {
        ...state,
        view: 'results',
        loading: false,
        analysis: action.analysis,
        history,
      };
    }
    case 'SCAN_ERROR':
      return { ...state, view: 'upload', loading: false, error: action.error };
    case 'VIEW_RESULT':
      return { ...state, view: 'results', analysis: action.analysis };
    case 'NEW_SCAN':
      return { ...state, view: 'upload', images: [], analysis: null, error: null };
    case 'SHOW_HISTORY':
      return { ...state, view: 'history' };
    case 'CLEAR_HISTORY':
      return { ...state, history: [] };
    case 'GO_BACK': {
      if (state.view === 'history') {
        return state.analysis
          ? { ...state, view: 'results' }
          : { ...state, view: 'upload' };
      }
      return { ...state, view: 'upload' };
    }
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleAnalyze = useCallback(async () => {
    if (state.images.length === 0) return;
    dispatch({ type: 'START_SCAN' });

    try {
      const imagePayloads: { data: string; mediaType: string }[] = [];
      for (const img of state.images) {
        const dataUrl = await fileToDataUrl(img.file);
        const compressed = await compressImage(dataUrl);
        imagePayloads.push(compressed);
      }

      const analysis = await analyzeImages(imagePayloads);
      dispatch({ type: 'SCAN_SUCCESS', analysis });
    } catch (err) {
      console.error('Analysis failed:', err);
      dispatch({
        type: 'SCAN_ERROR',
        error: err instanceof Error ? err.message : 'Analysis failed. Please try again.',
      });
    }
  }, [state.images]);

  const handleDemo = useCallback(() => {
    dispatch({ type: 'START_SCAN' });
    setTimeout(() => {
      // Apply the same deterministic scoring to demo data for consistency
      const analysis = applyDeterministicScore(MOCK_ANALYSIS);
      dispatch({ type: 'SCAN_SUCCESS', analysis });
    }, 2200);
  }, []);

  return (
    <div className="h-screen w-screen bg-cream-50 overflow-hidden flex justify-center">
      <div className="w-full max-w-md h-full bg-cream-50 flex flex-col relative overflow-hidden shadow-2xl">
        <Header
          onHistoryClick={() => dispatch({ type: 'SHOW_HISTORY' })}
          showBack={state.view === 'history' || state.view === 'results'}
          onBack={() => dispatch({ type: 'GO_BACK' })}
        />

        <main className="flex-1 overflow-y-auto relative hide-scrollbar">
          {state.view === 'upload' && (
            <UploadView
              images={state.images}
              onAddImage={(image: UploadedImage) => dispatch({ type: 'ADD_IMAGE', image })}
              onRemoveImage={(slot) => dispatch({ type: 'REMOVE_IMAGE', slot })}
              onAnalyze={handleAnalyze}
              onDemo={handleDemo}
            />
          )}

          {state.view === 'results' && state.analysis && (
            <ResultsDashboard
              analysis={state.analysis}
              onNewScan={() => dispatch({ type: 'NEW_SCAN' })}
            />
          )}

          {state.view === 'history' && (
            <HistoryView
              items={state.history}
              onSelect={(analysis: PickliAnalysis) => dispatch({ type: 'VIEW_RESULT', analysis })}
              onClear={() => dispatch({ type: 'CLEAR_HISTORY' })}
              onBack={() => dispatch({ type: 'GO_BACK' })}
            />
          )}

          {state.loading && <ScanningView />}
        </main>

        {state.error && (
          <div className="absolute bottom-6 left-5 right-5 z-50 animate-slide-up">
            <div className="bg-coral-500 text-white rounded-2xl px-5 py-4 shadow-lg flex items-start gap-3">
              <p className="text-sm font-medium flex-1">{state.error}</p>
              <button
                onClick={() => dispatch({ type: 'SCAN_ERROR', error: '' })}
                className="text-white/80 hover:text-white text-lg font-bold"
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
