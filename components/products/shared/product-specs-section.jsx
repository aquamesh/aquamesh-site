import FeatureChecklist from "../../ui/feature-checklist"

export default function ProductSpecsSection({
  specs,
  highlights = [],
  tableLabel = "Full technical specifications",
  actionLabel,
  actionHref
}) {
  const actionClassName =
    "inline-flex items-center gap-2 rounded-full bg-aquamesh-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-aquamesh-600"

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_360px] lg:items-start">
      <div
        className="overflow-hidden rounded-[30px] border border-[rgba(18,37,47,0.08)] bg-white/[0.97] shadow-[0_22px_54px_rgba(8,24,32,0.08)]"
        data-aos="fade-up"
      >
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-6 py-4">
          <span className="text-sm font-medium text-slate-500">{tableLabel}</span>
          {actionLabel ? (
            actionHref ? (
              <a href={actionHref} className={actionClassName}>
                <i className="fa-solid fa-file-arrow-down text-xs"></i>
                {actionLabel}
              </a>
            ) : (
              <button type="button" className={actionClassName}>
                <i className="fa-solid fa-file-arrow-down text-xs"></i>
                {actionLabel}
              </button>
            )
          ) : null}
        </div>
        {specs.map((spec, index) => (
          <div
            key={spec.label}
            className={`grid gap-3 border-slate-200 px-6 py-5 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-6 ${
              index === 0 ? "" : "border-t"
            } ${index % 2 === 0 ? "bg-slate-50/60" : ""}`}
          >
            <div className="text-sm font-semibold uppercase tracking-[0.16em] text-aquamesh-500">
              {spec.label}
            </div>
            <div className="text-sm leading-7 text-slate-700">{spec.value}</div>
          </div>
        ))}
      </div>

      {highlights.length ? (
        <div className="space-y-4">
          {highlights.map((highlight, index) => (
            <aside
              key={highlight.title}
              className="rounded-[28px] border border-white/10 p-6 text-white shadow-[0_22px_54px_rgba(0,0,0,0.16)]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03)), #0e1a22"
              }}
              data-aos="fade-up"
              data-aos-delay={(index + 1) * 100}
            >
              <h3 className="text-xl font-semibold text-white">{highlight.title}</h3>
              {highlight.body ? (
                <p className="mt-3 text-sm leading-7 text-slate-300">{highlight.body}</p>
              ) : null}
              {highlight.items ? (
                <FeatureChecklist
                  items={highlight.items}
                  className="mt-4"
                  itemClassName="text-slate-300"
                  iconClassName="bg-white/10 text-aquamesh-300"
                />
              ) : null}
            </aside>
          ))}
        </div>
      ) : null}
    </div>
  )
}
