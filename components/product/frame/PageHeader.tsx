import type { ReactNode } from "react";
import { cx } from "../ui/cx";

/* PageContainer: the one content width and padding of every app page:
   24px side gutters, 40px top and bottom, 1,200px max (1,320px when wide). */
export function PageContainer({
  children,
  wide = false,
  className,
}: {
  children: ReactNode;
  wide?: boolean;
  className?: string;
}) {
  return <div className={cx("mx-auto w-full px-6 py-10", wide ? "max-w-[1320px]" : "max-w-[1200px]", className)}>{children}</div>;
}

/* PageHeader: the page title in Fraunces (20px, weight 500), a one-line
   13px muted subtitle, and actions on the title row. One of the few homes
   of the brand serif in the product. The title is a heading in the app and
   a div here, so the marketing page keeps its own outline. About 45px tall
   with a subtitle, then 20px of margin below. */
export function PageHeader({
  title,
  subtitle,
  description,
  actions,
  className,
}: {
  title: string;
  /** The one-line subtitle under the title. */
  subtitle?: ReactNode;
  /** The app's name for subtitle; either works. */
  description?: ReactNode;
  /** Controls on the title row, right-aligned: an outline button, a segmented toggle. */
  actions?: ReactNode;
  className?: string;
}) {
  const sub = subtitle ?? description;
  return (
    <div className={cx("mb-5", className)}>
      <div className="flex flex-row items-start justify-between gap-6">
        <div className="min-w-0">
          <div className="font-display font-medium leading-[1.15] tracking-[-0.01em] text-pb-fg text-[20px]">{title}</div>
          {sub && <p className="text-[13px] leading-snug text-pb-fg-muted mt-1 max-w-xl">{sub}</p>}
        </div>
        {actions && <div className="flex items-center gap-2 flex-wrap shrink-0">{actions}</div>}
      </div>
    </div>
  );
}
