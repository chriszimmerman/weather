import "./ProgressBar.css";

export default function ProgressBar({
  scaleMin,
  scaleMax,
  min,
  max,
  gradientClassName = "bg-gradient-to-r from-green-400 to-orange-400",
  trackClassName = "h-1.5 bg-slate-200 dark:bg-slate-700",
  labelMin,
  labelMax,
}) {
  const span = scaleMax - scaleMin || 1; // guard divide-by-zero
  const clamp = (v) => Math.min(Math.max(v, scaleMin), scaleMax);

  const startPct = ((clamp(min) - scaleMin) / span) * 100;
  const endPct = ((clamp(max) - scaleMin) / span) * 100;
  const widthPct = Math.max(endPct - startPct, 0);

  return (
    <div className="flex items-center gap-3 w-full">
      {labelMin !== undefined && (
        <span className="text-sm tabular-nums w-10 text-right">{labelMin}</span>
      )}

      <div className={`relative flex-1 rounded-full ${trackClassName}`}>
        <div
          className={`absolute inset-y-0 rounded-full ${gradientClassName}`}
          style={{ left: `${startPct}%`, width: `${widthPct}%` }}
        />
      </div>

      {labelMax !== undefined && (
        <span className="text-sm tabular-nums w-10 font-medium">
          {labelMax}
        </span>
      )}
    </div>
  );
}
