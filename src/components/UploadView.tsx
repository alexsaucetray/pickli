import { useState } from "react";
import {
  Package,
  Activity,
  FlaskConical,
  Camera,
  Sparkles,
  X,
} from "lucide-react";
import type { UploadedImage } from "../types";

interface Props {
  images: UploadedImage[];
  onAddImage: (image: UploadedImage) => void;
  onRemoveImage: (slot: UploadedImage["slot"]) => void;
  onAnalyze: () => void;
  onDemo: () => void;
}

const SLOTS: {
  slot: UploadedImage["slot"];
  label: string;
  title: string;
  hint: string;
  icon: typeof Package;
}[] = [
  {
    slot: "front",
    label: "Image 1",
    title: "Front of Package",
    hint: "Brand, product type, and on-pack claims",
    icon: Package,
  },
  {
    slot: "nutrition",
    label: "Image 2",
    title: "Nutrition Facts",
    hint: "Macros, serving size, sugar, sodium, fiber",
    icon: Activity,
  },
  {
    slot: "ingredients",
    label: "Image 3",
    title: "Ingredients List",
    hint: "Additives, oils, sweeteners, allergens",
    icon: FlaskConical,
  },
];

const QUICK_START_DISMISSED_KEY = "pickli_quick_start_hidden_v1";

export default function UploadView({
  images,
  onAddImage,
  onRemoveImage,
  onAnalyze,
  onDemo,
}: Props) {
  const [showQuickStart, setShowQuickStart] = useState(() => {
    try {
      return localStorage.getItem(QUICK_START_DISMISSED_KEY) !== "1";
    } catch {
      return true;
    }
  });

  const handleFile = (file: File, slot: UploadedImage["slot"]) => {
    const preview = URL.createObjectURL(file);
    onAddImage({ file, preview, slot });
  };

  const getImage = (slot: UploadedImage["slot"]) =>
    images.find((i) => i.slot === slot);
  const hasAny = images.length > 0;
  const shouldShowQuickStart = showQuickStart && !hasAny;

  const dismissQuickStart = () => {
    setShowQuickStart(false);
    try {
      localStorage.setItem(QUICK_START_DISMISSED_KEY, "1");
    } catch {
      // Ignore storage failures and just dismiss for this session.
    }
  };

  return (
    <div className="flex min-h-full flex-col">
      <div className="flex-1 px-5 pt-3 pb-6 space-y-4 animate-fade-in-up">
        {shouldShowQuickStart && (
          <section className="pickle-card-soft rounded-[22px] px-4 py-3">
            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <span className="pickle-chip">Quick Start</span>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-pickle-800">
                  Add 3 label photos for the clearest read.
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-pickle-600 shadow-sm">
                    1 Front
                  </span>
                  <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-pickle-600 shadow-sm">
                    2 Facts
                  </span>
                  <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-pickle-600 shadow-sm">
                    3 Ingredients
                  </span>
                </div>
              </div>

              <button
                onClick={dismissQuickStart}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-pickle-500 shadow-sm transition-all hover:bg-pickle-50 active:scale-95"
                aria-label="Dismiss quick start"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </section>
        )}

        <section className="space-y-4">
          <div className="flex items-end justify-between gap-3 px-1">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-pickle-500">
                Photo Set
              </p>
              <h3 className="mt-1 font-display text-lg font-semibold tracking-[-0.03em] text-pickle-900">
                Three angles, one verdict
              </h3>
            </div>
            <p className="rounded-full bg-white/80 px-3 py-1.5 text-[11px] font-semibold text-pickle-600 shadow-sm">
              {images.length}/3 added
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {SLOTS.map(({ slot, label, title, icon: Icon }, idx) => {
              const img = getImage(slot);
              const isHero = idx === 0;
              return (
                <div
                  key={slot}
                  className={isHero ? "col-span-2" : "col-span-1"}
                >
                  <div className="pickle-card-soft rounded-[26px] p-3 h-full">
                    <div className="mb-3 flex items-start justify-between gap-3 px-1">
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-pickle-500">
                          {label}
                        </p>
                        <h4 className="mt-1 text-sm font-bold text-pickle-900">
                          {title}
                        </h4>
                        <p className="mt-1 text-[11px] leading-relaxed text-pickle-500">
                          {SLOTS[idx].hint}
                        </p>
                      </div>
                      <div className="rounded-2xl bg-pickle-50 p-2.5 text-pickle-500 shadow-sm">
                        <Icon className={isHero ? "h-5 w-5" : "h-4 w-4"} />
                      </div>
                    </div>

                    <div
                      className={`group relative overflow-hidden rounded-[22px] border border-white/70 bg-[linear-gradient(180deg,#ffffff,#f9f4e7)] transition-all
                    ${isHero ? "h-40" : "h-36"}`}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) handleFile(f, slot);
                        }}
                        className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                      />

                      {img ? (
                        <div className="relative h-full w-full">
                          <img
                            src={img.preview}
                            alt={title}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-4 pb-4 pt-8">
                            <p className="text-[11px] font-semibold text-white/90">
                              Tap to replace
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onRemoveImage(slot);
                            }}
                            className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-coral-500 shadow-md active:scale-95"
                            aria-label={`Remove ${title}`}
                          >
                            &times;
                          </button>
                        </div>
                      ) : (
                        <div className="flex h-full flex-col items-center justify-center px-4 text-center">
                          <div
                            className={`rounded-full bg-pickle-50 text-pickle-500 shadow-sm transition-transform group-hover:scale-105
                          ${isHero ? "mb-3 p-3.5" : "mb-2.5 p-2.5"}`}
                          >
                            <Icon className={isHero ? "h-7 w-7" : "h-5 w-5"} />
                          </div>
                          <p
                            className={`font-display font-semibold tracking-[-0.02em] text-pickle-800 ${isHero ? "text-lg" : "text-base"}`}
                          >
                            Tap to add
                          </p>
                          <p className="mt-1 max-w-[15rem] text-[11px] font-medium leading-relaxed text-pickle-500">
                            Use your camera or photo library for the clearest
                            shot.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {!hasAny && (
          <p className="text-center text-xs font-medium italic text-pickle-500/75">
            No photos handy? Try the demo scan below to explore the experience.
          </p>
        )}
      </div>

      <div className="sticky bottom-0 z-20 px-5 pb-6 pt-3">
        <div className="pickle-glass rounded-[28px] p-3 shadow-[0_18px_40px_rgba(61,104,22,0.12)]">
          <div className="flex gap-3">
            <button
              onClick={onDemo}
              className="flex items-center justify-center gap-1.5 rounded-[22px] border border-pickle-200 bg-white px-4 py-3.5 text-sm font-bold text-pickle-600 transition-all active:scale-[0.97] hover:bg-pickle-50"
            >
              <Sparkles className="w-4 h-4" />
              Demo
            </button>
            <button
              onClick={onAnalyze}
              disabled={!hasAny}
              className="flex-1 flex items-center justify-center gap-2 rounded-[22px] bg-pickle-400 py-3.5 text-sm font-bold text-white shadow-[0_18px_32px_rgba(74,124,26,0.28)] transition-all active:scale-[0.97] hover:bg-pickle-500
              disabled:opacity-40 disabled:pointer-events-none"
            >
              <Camera className="w-5 h-5" />
              Analyze {images.length || 1} Photo
              {(images.length || 1) > 1 ? "s" : ""}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
