# Home Page UI Layer

The landing page now has a shared Tailwind component layer.

## Implemented

1. `SectionShell`
   Shared section spacing, heading, eyebrow text, and intro copy.

2. `SiteContainer`
   Shared width and page padding wrapper.

3. `ButtonLink`
   Shared CTA variants and sizing.

4. `InfoCard`
   Shared marketing card for short benefit and use-case content.

5. `FeatureChecklist`
   Shared bullet list for product and feature highlights.

6. `ProductFeature`
   Shared product row with media, checklist, and CTA group.

7. `SectionCta`
   Shared CTA wrapper for conversion sections.

## Good next targets

1. `HomeHeader`
   Replace the Bootstrap-specific landing-page navbar with a Tailwind nav while preserving mobile collapse behavior.

2. `HomeFooter`
   Split the landing footer from the shared legacy footer so the home page can use the same UI layer end to end.

3. `ComparisonTable`
   Extract the competitive matrix table into a standalone UI component if that layout needs reuse on product pages.

4. `FormField`
   Standardize input, select, and textarea styles if more forms are added.
