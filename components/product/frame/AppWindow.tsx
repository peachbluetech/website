import type { ReactNode } from "react";
import {
  Activity,
  BookOpen,
  Brain,
  CalendarDays,
  ChevronDown,
  ChevronsUpDown,
  Coins,
  Database,
  FileText,
  LayoutGrid,
  LineChart,
  PanelLeftOpen,
  Radar,
  Search,
  type LucideIcon,
} from "lucide-react";
import { cx } from "../ui/cx";
import { PeachMark } from "../ui/PeachMark";
import { AskPeachButton } from "../ui/AskPeachButton";

/* AppWindow: the real application frame for a brand org (no client
   switcher). A white rail on the left, the stone top bar with breadcrumb
   and controls, then the page. Bare: a 1px hairline, 10px radius, stone
   ground; no browser chrome, no dots, no URL bar.

   Design width: 1200 (the default). The content column inside the gutters
   is the width minus 2px of border, the rail and 48px of gutter:

     width   full rail (236)   icon rail (64)
     1200    914               1086
     1280    994               1152 (the page container's cap)

   Pick the width by what the page holds. The sample account's Today
   VoiceBar needs a 952px column to keep its sentence on two lines, so a
   full-rail Today is a 1280 window; at 1200 use the icon rail or a
   shorter sentence. Without a height the window grows with its
   content (never shorter than the rail needs); with a height it crops the
   page at its bottom edge.

   Render it inside <Shot ground={false} width={the same width}> so the
   corners outside the radius stay clear. */

type NavItem = { label: string; icon: LucideIcon };

const NAV_GROUPS: Array<{ label: string; items: NavItem[] }> = [
  {
    label: "Operate",
    items: [
      { label: "Today", icon: Activity },
      { label: "Economics", icon: Coins },
      { label: "Reports", icon: FileText },
    ],
  },
  {
    label: "Analyze",
    items: [
      { label: "Performance", icon: LineChart },
      { label: "Creative Library", icon: LayoutGrid },
      { label: "Intelligence", icon: Brain },
      { label: "Brand Intel", icon: Radar },
    ],
  },
  {
    label: "Setup",
    items: [
      { label: "Data Hub", icon: Database },
      { label: "Handbook", icon: BookOpen },
    ],
  },
];

/* The signed-in address in the account row. Fizzli is fictional, so the
   address sits on a reserved top-level domain (.example can never be
   registered) rather than on a .com somebody else may own. One place to
   change it: this default, or the account prop for a single window. */
const DEFAULT_EMAIL = "maya@fizzli.example";

/* The app's rule for the avatar: the part before the @, split on dot,
   underscore and hyphen; one word gives its first two letters, two or more
   give the first letter of the first two. */
function initialsOf(email: string): string {
  const words = email.split("@")[0].replace(/[._-]+/g, " ").trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "P";
  const letters = words.length === 1 ? words[0].slice(0, 2) : words[0][0] + words[1][0];
  return letters.toUpperCase();
}

/* The rail's ground. White (the card token), as the app's sidebar is built
   and as its production stylesheet resolves it; the stone canvas starts at
   the rail's right hairline. One constant so every window agrees. */
const RAIL_GROUND = "bg-pb-card";

/* The rail needs this much height to show every row with a little air
   above the account row (562px full, 546px icon). */
const MIN_HEIGHT = 600;

function Rail({ active, full, email, initials }: { active: string; full: boolean; email: string; initials: string }) {
  return (
    <div className={cx("shrink-0 flex flex-col border-r border-pb-border", RAIL_GROUND, full ? "w-[236px]" : "w-16")}>
      {/* Brand block: 56px row plus the hairline, level with the top bar's. */}
      <div className="block shrink-0 border-b border-pb-border">
        <div className="flex items-center gap-2.5 h-[56px] px-4">
          <div className="relative size-8 rounded-lg pb-logo shrink-0 flex items-center justify-center">
            <PeachMark size={18} color="#ffffff" />
          </div>
          {full && (
            <span className="font-display text-[17px] leading-none font-semibold tracking-tight text-pb-fg">peachblue</span>
          )}
        </div>
      </div>

      {/* Icon rail only: the expand control. */}
      {!full && (
        <div className="px-3 pt-3">
          <div className="w-full h-10 rounded-md grid place-items-center text-pb-fg-muted">
            <PanelLeftOpen className="size-[18px]" strokeWidth={1.8} />
          </div>
        </div>
      )}

      <div className={cx("flex-1 overflow-hidden space-y-4 pt-3", full ? "px-4" : "px-3")}>
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            {full && (
              <div className="text-[11px] uppercase tracking-[0.08em] font-medium text-pb-fg-faint px-3 mb-1.5">{group.label}</div>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = item.label === active;
                const Icon = item.icon;
                return (
                  <li key={item.label}>
                    <div
                      className={cx(
                        "flex items-center gap-2.5 rounded-lg h-9 text-[13.5px]",
                        full ? "justify-start px-3" : "justify-center px-0",
                        isActive ? "bg-pb-peach-50 text-pb-peach-600 font-semibold" : "text-pb-fg-secondary",
                      )}
                    >
                      {/* Icons exist only in the 64px rail. The full rail is labels only, as in the app. */}
                      {!full && <Icon className="size-[18px] shrink-0" strokeWidth={1.8} />}
                      {full && <span className="truncate flex-1">{item.label}</span>}
                      {full && item.label === "Data Hub" && (
                        <span className="inline-flex">
                          <span className="size-1.5 rounded-full shrink-0 bg-pb-good" />
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className={cx("relative border-t border-pb-border py-2", full ? "px-4" : "px-3")}>
        <div className={cx("w-full flex items-center gap-2.5 rounded-lg py-1.5 text-left", full ? "justify-start px-1.5" : "justify-center px-0")}>
          <div className="size-7 rounded-full bg-pb-peach-500 flex items-center justify-center text-white text-[11px] font-semibold shrink-0">
            {initials}
          </div>
          {full && (
            <div className="flex-1 min-w-0">
              <div className="text-[12px] text-pb-fg truncate">{email}</div>
              <div className="text-[11px] text-pb-fg-faint">Account menu</div>
            </div>
          )}
          {full && <ChevronsUpDown className="size-3.5 text-pb-fg-faint shrink-0" strokeWidth={2} />}
        </div>
      </div>
    </div>
  );
}

function TopBar({ group, page, dateRange, askActive }: { group: string; page: string; dateRange?: string; askActive: boolean }) {
  return (
    <div className="shrink-0 bg-pb-bg border-b border-pb-border">
      <div className="flex items-center gap-3 h-[56px] px-6">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-[13px] text-pb-fg-faint">{group}</span>
          <span className="text-pb-fg-ghost">/</span>
          <span className="text-[14px] font-medium text-pb-fg truncate">{page}</span>
        </div>

        <div className="flex-1" />

        {dateRange && (
          <div className="flex items-center gap-2 h-9 px-3 rounded-[10px] border border-pb-border-control bg-pb-card text-[13px] text-pb-fg">
            <CalendarDays className="size-[15px] text-pb-fg-muted" strokeWidth={1.8} />
            <span className="whitespace-nowrap">{dateRange}</span>
            <ChevronDown className="size-3.5 text-pb-fg-muted" strokeWidth={2} />
          </div>
        )}

        <AskPeachButton variant="topbar" active={askActive} />

        <div
          className={cx(
            "flex items-center gap-2.5 h-9 rounded-md border border-pb-border-control bg-pb-card",
            "text-[13px] text-pb-fg-muted text-left",
            "w-[240px] justify-start px-3",
          )}
        >
          <Search className="size-[15px]" strokeWidth={1.8} />
          <span className="flex-1">Search or ask…</span>
          <span className="text-[11px] font-mono px-1.5 py-0.5 rounded border border-pb-border bg-pb-bg">⌘K</span>
        </div>
      </div>
    </div>
  );
}

export function AppWindow({
  active,
  group,
  page,
  rail = "full",
  dateRange,
  width = 1200,
  height,
  pad = "page",
  wide = false,
  account,
  overlay,
  className,
  children,
}: {
  /** The nav label of the active rail row: "Today", "Economics", "Reports", "Performance", "Creative Library", "Intelligence", "Brand Intel", "Data Hub" or "Handbook". Anything else leaves the rail with no active row (the agent and settings pages). */
  active: string;
  /** Breadcrumb group: "Operate", "Analyze", "Setup" ("Home" for the agent page). */
  group: string;
  /** Breadcrumb page name: "Today". When it is "Agent Peach" the Ask Peach button takes its peach tint. */
  page: string;
  /** "full" is the 236px rail with labels; "icon" is the 64px rail with icons. */
  rail?: "full" | "icon";
  /** Label of the date-range control, for example "Last 30 days". Only Performance, Creative Library and Reports show it. */
  dateRange?: string;
  /** Outer width in px (border included). 1200 by default; a full-rail Today is 1280. See the table above. */
  width?: number;
  /** Fixed height in px: the page is cropped at the window's bottom edge. Omit to grow with the content. */
  height?: number;
  /** Content padding. "page" is the app's PageContainer (24px sides, 40px top and bottom); "tight" is the 32px vertical padding Performance and the agent page use; "none" leaves the slot bare. */
  pad?: "page" | "tight" | "none";
  /** The 1,320px container of the table-heavy pages. Only matters past 1,200px of content width. */
  wide?: boolean;
  /** The signed-in user in the account row. Defaults to the sample account's address; the initials follow from the address unless given. The address column is 129px wide (about 19 characters) before it truncates. */
  account?: { email: string; initials?: string };
  /** Rendered over the whole window (top bar included), absolutely positioned: a scrim and a slide-over panel. */
  overlay?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  const full = rail === "full";
  const email = account?.email ?? DEFAULT_EMAIL;
  const initials = account?.initials ?? initialsOf(email);
  return (
    <div
      className={cx("relative flex bg-pb-bg text-pb-fg overflow-hidden rounded-[10px] border border-pb-border", className)}
      style={{ width, height, minHeight: height == null ? MIN_HEIGHT : undefined }}
    >
      <Rail active={active} full={full} email={email} initials={initials} />
      <div className="flex-1 min-w-0 flex flex-col">
        <TopBar group={group} page={page} dateRange={dateRange} askActive={page === "Agent Peach"} />
        <div className="flex-1 min-w-0 min-h-0 overflow-hidden">
          {pad === "none" ? (
            children
          ) : (
            <div className={cx("mx-auto w-full px-6", pad === "tight" ? "py-8" : "py-10", wide ? "max-w-[1320px]" : "max-w-[1200px]")}>
              {children}
            </div>
          )}
        </div>
      </div>
      {overlay && <div className="absolute inset-0">{overlay}</div>}
    </div>
  );
}
