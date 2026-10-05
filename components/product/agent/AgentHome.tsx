import { ArrowRight } from "lucide-react";
import { Card, PeachMark, cx } from "@/components/product/ui";
import { COMPOSER_PLACEHOLDER, HOME_SUBTITLE, HOME_TYPED, QUESTION_GROUPS, RECENT } from "./data";
import { SendButton } from "./parts";

/* AgentHome: the Agent Peach page as it opens. A title, one line, the
   composer with the mark inside it, then eight starter questions on
   hairlines beside the recent conversations.

   Design width: 960 (the app's thread column: 16px of padding either side,
   928px of content, a 300px right column). It fills its container up to
   that width, so it also sits inside an AppWindow whose content column is
   at least 960px wide. Natural height: 436. */
export function AgentHome({
  typed = HOME_TYPED,
  subtitle = HOME_SUBTITLE,
  placeholder = COMPOSER_PLACEHOLDER,
  className,
}: {
  /** The question sitting in the composer, ready to send. Pass "" for the empty field with its placeholder and the send button at half strength. */
  typed?: string;
  /** The line under the title. Defaults to the app's own sentence. */
  subtitle?: string;
  /** The muted text in the empty field, seen only when typed is "". Defaults to the app's own. */
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={cx("flex justify-center", className)}>
      <div className="w-full max-w-[960px]">
        <div className="p-4 flex flex-col">
          <div className="order-first pb-4">
            <div className="mb-5">
              {/* tell-ok font-display: agent empty-state title */}
              <div className="font-display text-[20px] leading-[1.15] font-medium tracking-[-0.01em] text-pb-fg">Agent Peach</div>
              <div className="text-[13px] text-pb-fg-muted mt-1">{subtitle}</div>
            </div>

            {/* The composer's card has no border and no ground here: only the field shows. */}
            <Card className="overflow-hidden border-0 bg-transparent">
              <div className="p-0">
                <div className="flex items-center gap-2 rounded-lg border border-pb-border-control bg-pb-card h-14 px-4">
                  <PeachMark size={16} className="shrink-0 text-pb-peach-500" />
                  <div className={cx("flex-1 bg-transparent text-[14px]", typed ? "text-pb-fg" : "text-pb-fg-muted")}>{typed || placeholder}</div>
                  <SendButton disabled={!typed} />
                </div>
              </div>
            </Card>

            <div className="mt-8 grid gap-x-10 gap-y-6 grid-cols-[1fr_300px]">
              <div className="grid gap-x-8 gap-y-5 grid-cols-2">
                {QUESTION_GROUPS.map((g) => (
                  <div key={g.group}>
                    <div className="text-[12px] text-pb-fg-muted pb-1.5 border-b border-pb-border">{g.group}</div>
                    <ul className="divide-y divide-pb-border">
                      {g.items.map((q) => (
                        <li key={q}>
                          <div className="w-full text-left py-2 text-[13px] text-pb-fg flex items-center justify-between gap-3">
                            <span>{q}</span>
                            <ArrowRight className="size-3.5 shrink-0 text-pb-fg-faint" />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-baseline justify-between pb-1.5 border-b border-pb-border">
                  <div className="text-[12px] text-pb-fg-muted">Recent conversations</div>
                  <span className="text-[12px] text-pb-peach-600 underline-offset-2">All</span>
                </div>
                <ul className="divide-y divide-pb-border">
                  {RECENT.map((it) => (
                    <li key={it.title}>
                      <div className="w-full text-left py-2 flex items-baseline justify-between gap-3">
                        <span className="text-[13px] text-pb-fg truncate">{it.title}</span>
                        <span className="font-mono tnum text-[11px] text-pb-fg-faint shrink-0">{it.ago}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
