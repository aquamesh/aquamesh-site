import { cx } from "../../../lib/cx";
import SiteContainer from "../../ui/site-container";

const toneClasses = {
  light: {
    section: "bg-white text-slate-900",
    eyebrow: "text-aquamesh-500",
    title: "text-aquamesh-700",
    intro: "text-slate-700"
  },
  mist: {
    section: "bg-[linear-gradient(180deg,#f8fbfc_0%,#eef6f8_100%)] text-slate-900",
    eyebrow: "text-aquamesh-500",
    title: "text-aquamesh-700",
    intro: "text-slate-700"
  },
  dark: {
    section: "text-white",
    sectionStyle: { background: "radial-gradient(ellipse at 10% 0%, rgba(102,211,240,0.08) 0%, transparent 60%), linear-gradient(180deg, #091218 0%, #121d24 100%)" },
    eyebrow: "text-aquamesh-300",
    title: "text-white",
    intro: "text-slate-300"
  }
};

export default function BenchSection({
  id,
  eyebrow,
  title,
  intro,
  tone = "light",
  className,
  containerClassName,
  headerClassName,
  eyebrowClassName,
  titleClassName,
  introClassName,
  children
}) {
  const styles = toneClasses[tone] ?? toneClasses.light;

  return (
    <section
      id={id}
      className={cx("scroll-mt-36 px-4 py-20 sm:px-6 sm:py-24 lg:px-8", styles.section, className)}
      style={styles.sectionStyle}
    >
      <SiteContainer padded={false} className={containerClassName}>
        {eyebrow || title || intro ? (
          <div className={cx("mb-12 max-w-3xl", headerClassName)} data-aos="fade-up">
            {eyebrow ? (
              <p
                className={cx(
                  "text-sm font-semibold uppercase tracking-[0.24em]",
                  styles.eyebrow,
                  eyebrowClassName
                )}
              >
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2
                className={cx(
                  "mt-4 text-3xl font-bold tracking-tight sm:text-4xl",
                  styles.title,
                  titleClassName
                )}
              >
                {title}
              </h2>
            ) : null}
            {intro ? (
              <p className={cx("mt-4 text-lg leading-8", styles.intro, introClassName)}>{intro}</p>
            ) : null}
          </div>
        ) : null}
        {children}
      </SiteContainer>
    </section>
  );
}
