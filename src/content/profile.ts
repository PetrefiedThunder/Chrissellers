export const profile = {
  name: 'Christopher Sellers',
  siteUrl: 'https://chrissellers.com',

  // Shown under the name in the hero and in every social/search preview card.
  role: 'Technical Founder',

  // TODO(chris): This is the one line that does the most work on the whole site.
  // It is the first thing a recruiter, investor, or cold contact reads, and it is
  // the description LinkedIn and search results show. Draft below — rewrite it in
  // your own voice. See the note in the response for what makes this land.
  headline:
    'I build regulatory infrastructure, and I sell it. Twenty years of operating where failure was not an option.',

  summary:
    'Technical founder building RegEngine, a compliance platform for food supply chain traceability. Previously business development at RadarFirst through a $100M exit, technical account management at SeatGeek, and personal aide to a sitting U.S. Senator.',

  bio: [
    'I have spent twenty years in rooms where the cost of getting it wrong was immediate and public — a Senator\'s schedule across 36 counties, enterprise integrations that could not go down during a season, disaster zones where the resources did not exist yet.',
    'Now I build regulatory infrastructure. RegEngine is a compliance platform I architected and shipped solo, using AI agents to cover the ground a small engineering team would normally handle.',
  ],

  links: {
    email: 'hello@chrissellers.com',
    github: 'https://github.com/PetrefiedThunder',
    // TODO(chris): confirm this LinkedIn slug resolves — it was unverified in the old site.
    linkedin: 'https://linkedin.com/in/christopher-sellers',
  },
} as const
