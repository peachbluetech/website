/* Agent Peach: the full page (home and three conversations) and the
   Ask Peach side sheet. Render each inside the Shot wrapper from
   components/product/frame at its design width.

     export          width  height
     AgentHome       960    436   the page as it opens
     AgentThread     720    493   a question, the answer, the spotlight card
     AgentRanked     720    596   a question, the answer, the ranked list of five
     AgentCompare    720    400   a question, the answer, winner beside challenger
     AskPeachSheet   480    582   the inline side sheet with its Sources trail

   AgentHome takes typed (the question in the composer; "" shows the
   placeholder), subtitle and placeholder; the last two default to the
   app's own words. The three conversations take composer to add the
   page's composer card under the thread (123px more). AskPeachSheet takes
   height. */

export { AgentHome } from "./AgentHome";
export { AgentThread, AgentRanked, AgentCompare } from "./AgentThread";
export { AskPeachSheet } from "./AskPeachSheet";
