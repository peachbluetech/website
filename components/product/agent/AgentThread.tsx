import { COMPARE, RANKED, SPOTLIGHT } from "./data";
import { ComparePair, RankedList, SpotlightCard, ThreadColumn, Turn } from "./parts";

/* Three conversations, one per answer card. Each is a question and its
   answer in the app's turn style: a muted role label, then plain text on
   the stone ground, no bubbles, nothing right-aligned. The answer names
   its data window in the sentence; the card under it carries the figures.

   All three share one design width, 720: 16px of padding, then the turn.
   The cards keep their own widths (520px spotlight, 672px list and pair)
   and the answer text runs to 684px. They fill their container up to the
   app's 960px column, where only the text gets wider. */

type ThreadProps = {
  /** Show the "Ask Agent Peach" composer card under the thread, as the page has it. Adds 123px. */
  composer?: boolean;
};

/* AgentThread: "What's winning across all my accounts?", the answer, then
   the spotlight card for the week's winner and its two actions.
   Design width: 720. Natural height: 493 (616 with the composer). */
export function AgentThread({ composer = false }: ThreadProps) {
  return (
    <ThreadColumn composer={composer}>
      <Turn role="You" text={SPOTLIGHT.question} />
      <Turn role="Agent Peach" text={SPOTLIGHT.answer}>
        <SpotlightCard card={SPOTLIGHT.card} />
      </Turn>
    </ThreadColumn>
  );
}

/* AgentRanked: a turn that answers with the ranked list, five creatives
   in score order.
   Design width: 720. Natural height: 596 (719 with the composer). */
export function AgentRanked({ composer = false }: ThreadProps) {
  return (
    <ThreadColumn composer={composer}>
      <Turn role="You" text={RANKED.question} />
      <Turn role="Agent Peach" text={RANKED.answer}>
        <RankedList cards={RANKED.cards} />
      </Turn>
    </ThreadColumn>
  );
}

/* AgentCompare: a turn that answers with the winner and the challenger
   side by side.
   Design width: 720. Natural height: 400 (523 with the composer). */
export function AgentCompare({ composer = false }: ThreadProps) {
  return (
    <ThreadColumn composer={composer}>
      <Turn role="You" text={COMPARE.question} />
      <Turn role="Agent Peach" text={COMPARE.answer}>
        <ComparePair a={COMPARE.a} b={COMPARE.b} winner={COMPARE.winner} />
      </Turn>
    </ThreadColumn>
  );
}
