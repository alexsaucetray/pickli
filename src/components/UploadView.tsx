import { Package, Activity, FlaskConical, Camera, Sparkles } from 'lucide-react';
import type { UploadedImage } from '../types';

interface Props {
  images: UploadedImage[];
  onAddImage: (image: UploadedImage) => void;
  onRemoveImage: (slot: UploadedImage['slot']) => void;
  onAnalyze: () => void;
  onDemo: () => void;
}

const SLOTS: { slot: UploadedImage['slot']; label: string; title: string; icon: typeof Package }[] = [
  { slot: 'front', label: 'Image 1', title: 'Front of Package', icon: Package },
  { slot: 'nutrition', label: 'Image 2', title: 'Nutrition Facts', icon: Activity },
  { slot: 'ingredients', label: 'Image 3', title: 'Ingredients List', icon: FlaskConical },
];

export default function UploadView({ images, onAddImage, onRemoveImage, onAnalyze, onDemo }: Props) {
  const handleFile = (file: File, slot: UploadedImage['slot']) => {
    const preview = URL.createObjectURL(file);
    onAddImage({ file, preview, slot });
  };

  const getImage = (slot: UploadedImage['slot']) => images.find((i) => i.slot === slot);
  const hasAny = images.length > 0;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-5 pb-28 space-y-5 animate-fade-in-up">
        <p className="text-sm text-pickle-600 font-medium leading-relaxed">
          Upload photos of your food product to discover its nutritional profile,
          analyze every ingredient, and get a science-backed health score.
        </p>

        <div className="grid grid-cols-2 gap-3">
          {SLOTS.map(({ slot, label, title, icon: Icon }, idx) => {
            const img = getImage(slot);
            const isHero = idx === 0;
            return (
              <div
                key={slot}
                className={isHero ? 'col-span-2' : 'col-span-1'}
              >
                <p className="text-[9px] font-bold text-cream-400 uppercase tracking-[0.15em] mb-1.5 pl-1">
                  {label}
                </p>
                <div className="relative group">
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleFile(f, slot);
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div
                    className={`border-2 border-dashed rounded-2xl transition-all flex flex-col items-center justify-center text-center
                    ${isHero ? 'h-36 p-5' : 'h-28 p-3'}
                    ${img
                        ? 'border-pickle-300 bg-pickle-50'
                        : 'border-cream-300 bg-white hover:border-pickle-300 hover:bg-pickle-50/30'
                      }`}
                  >
                    {img ? (
                      <div className="relative w-full h-full">
                        <img
                          src={img.preview}
                          alt={title}
                          className="w-full h-full object-contain rounded-lg"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveImage(slot);
                          }}
                          className="absolute -top-1 -right-1 w-6 h-6 bg-coral-400 text-white rounded-full text-xs font-bold flex items-center justify-center z-20 shadow-sm"
                        >
                          &times;
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className={`rounded-full mb-2 text-pickle-400 group-hover:text-pickle-500 transition-colors
                          ${isHero ? 'bg-pickle-50 p-3' : 'bg-pickle-50/60 p-2'}`}>
                          <Icon className={isHero ? 'w-7 h-7' : 'w-5 h-5'} />
                        </div>
                        <h3 className={`font-bold text-pickle-700 ${isHero ? 'text-sm' : 'text-xs'}`}>
                          {title}
                        </h3>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {!hasAny && (
          <p className="text-center text-xs text-cream-400 italic mt-4">
            No images? Tap "Try Demo" below to explore with sample data.
          </p>
        )}
      </div>

      {/* Bottom actions */}
      <div className="absolute bottom-0 left-0 right-0 p-5 pb-6 bg-gradient-to-t from-cream-50 via-cream-50 to-transparent">
        <div className="flex gap-3">
          <button
            onClick={onDemo}
            className="flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-2xl border-2 border-pickle-200 text-pickle-600 font-bold text-sm bg-white hover:bg-pickle-50 active:scale-[0.97] transition-all"
          >
            <Sparkles className="w-4 h-4" />
            Try Demo
          </button>
          <button
            onClick={onAnalyze}
            disabled={!hasAny}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm shadow-lg active:scale-[0.97] transition-all
              bg-pickle-400 text-white hover:bg-pickle-500
              disabled:opacity-40 disabled:pointer-events-none"
          >
            <Camera className="w-5 h-5" />
            Analyze Product
          </button>
        </div>
      </div>
    </div>
  );
}
