import { Fragment } from "react";
import { cx } from "../../lib/cx";
import ButtonLink from "../ui/button-link";
import SectionShell from "../ui/section-shell";
import SitePageShell from "../site-page-shell";
import { competitors, rowGroups } from "./competition-page-data";

function ValueBadge({ value, featured = false }) {
  return (
    <span
      className={cx(
        "inline-flex min-w-14 items-center justify-center rounded-full px-3 py-1.5 text-sm font-medium ring-1",
        value
          ? featured
            ? "bg-aquamesh-500 text-white ring-aquamesh-500/35"
            : "bg-emerald-50 text-emerald-700 ring-emerald-200"
          : featured
            ? "bg-aquamesh-50 text-aquamesh-700 ring-aquamesh-300/40"
            : "bg-slate-100 text-slate-500 ring-slate-200"
      )}
    >
      {value ? "Yes" : "No"}
    </span>
  );
}

function ComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_40px_rgba(6,24,33,0.08)]">
      <table className="w-full min-w-[980px] border-collapse text-left">
        <thead className="bg-slate-950 text-white">
          <tr>
            <th className="min-w-[220px] px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em]">
              Feature
            </th>
            {competitors.map((competitor) => (
              <th
                key={competitor.id}
                className={cx(
                  "px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em]",
                  competitor.featured ? "bg-[#0f2330]" : null
                )}
              >
                {competitor.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-sm">
          {rowGroups.map((group) => (
            <Fragment key={group.category}>
              <tr>
                <td
                  colSpan={1 + competitors.length}
                  className="bg-slate-100 px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-600"
                >
                  {group.category}
                </td>
              </tr>
              {group.rows.map((row) => (
                <tr key={row.label} className="align-middle hover:bg-slate-50/70">
                  <th scope="row" className="px-5 py-4 font-semibold text-slate-900">
                    {row.label}
                  </th>
                  {competitors.map((competitor) => (
                    <td
                      key={`${row.label}-${competitor.id}`}
                      className={cx(
                        "px-5 py-4 text-center",
                        competitor.featured ? "bg-aquamesh-50/50" : null
                      )}
                    >
                      <ValueBadge
                        value={row.values[competitor.id]}
                        featured={competitor.featured}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CompetitionPage() {
  return (
    <SitePageShell route="competition">
      <SectionShell
        title="Parameter Comparison by Brand"
        description="See how AquaMesh compares with industry leaders across key water quality parameters. AquaMesh delivers unmatched breadth in a compact design."
        className="bg-[linear-gradient(180deg,#f8fbfc_0%,#ffffff_100%)] pt-20 sm:pt-24"
        containerClassName="max-w-[90rem]"
      >
        <ComparisonTable />
        <div className="mt-10 text-center">
          <ButtonLink href="/products/aquaspectra-probe/" size="lg">
            Learn More
          </ButtonLink>
        </div>
      </SectionShell>
    </SitePageShell>
  );
}
