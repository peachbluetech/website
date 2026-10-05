/* The MCP server's inline creative card (an MCP Apps card, as a host
   renders it inside a reply) and the neutral turn drawn around it.
   Static server components; render each inside the Shot wrapper from
   components/product/frame at its design width, with ground={false} on
   the Shot (the card brings its own frame). MCP_LABEL holds a text
   alternative for each picture.

     export        width  height
     McpRanked     664    1232  question, get_creatives row, the card grid (top five)
                          1184  asked={false}; 1254 with you
     McpCompare    642    725   question, compare_ads row, the compare card
     CardGrid      664    1140  three columns of 205, the second row holds two
                   1128   596   five columns of 211, one row
                   282    3273  one column (a phone)
     CardCompare   642    633   the 618px compare card in its frame
                   278    468   a phone: two sides of 127
     CardSingle    744    417   one creative, the card at its 720px cap
                   360    971   stacked (540 and under)
     ToolCall      any    32    one row; 42 when the arguments wrap (under about 330)
     AskedChip     any    36    one line of question, right-aligned; 58 with you

   In McpRanked at 664 the tool row starts 48px down (0 with asked false)
   and the card's frame 92px down (44). Inside the frame the first row of
   cards starts 12px down, its images run from 13 to 374.5 (203 by 361.5),
   its pills from 386.8 to 406, its names from 414.4 to 432.6 (one line),
   and the white under the pills is 406 to 414.4. Heights are at the
   default ground; with ground false the card has 24px more width, so its
   columns and heights change.

   Every card takes width (the frame's width; the card picks its own
   layout from it) and ground (false drops the frame's cream ground and
   12px padding). McpRanked and McpCompare also take asked (false drops
   the question chip, where the page's lead asks it) and you (prints "You"
   over the chip). Defaults draw the agent's own answers (MCP_RANKED,
   MCP_COMPARE, MCP_SINGLE in data.ts), so both surfaces agree to the digit.
   What differs from the app's card, and why, is listed at the top of
   CreativeCard.tsx. */

export { CardFrame, CardGrid, CardCompare, CardSingle } from "./CreativeCard";
export { ToolCall, AskedChip, McpTurn, McpRanked, McpCompare } from "./Turn";
export { MCP_RANKED, MCP_COMPARE, MCP_SINGLE, MCP_LABEL, toCard, cardFmt, callParams } from "./data";
export type { CardCreative, CardTags, ToolCallSpec } from "./data";
