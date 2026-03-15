export interface NewsArticle {
  id: number;
  tag: string;
  title: string;
  desc: string;
  extra: string;
  imageId: number;
}

export const newsData: NewsArticle[] = [
  {
    id: 1,
    tag: "High Impact",
    title: "City unveils AI-powered traffic lights",
    desc: "Adaptive signals cut wait times by 22% during rush hour.",
    extra: "Pilot phase to expand next year.",
    imageId: 42,
  },
  {
    id: 2,
    tag: "Breaking",
    title: "Major breakthrough in cancer research",
    desc: "New drug trial shows 70% success in early stages.",
    extra: "Experts call it a game changer.",
    imageId: 87,
  },
  {
    id: 3,
    tag: "Update",
    title: "Electric buses rolled out across the city",
    desc: "Officials estimate 30% reduction in emissions this year.",
    extra: "Fleet expected to double soon.",
    imageId: 156,
  },
  {
    id: 4,
    tag: "Exclusive",
    title: "Space mission discovers new exoplanet",
    desc: "Scientists say it could support liquid water and life.",
    extra: "Telescope to investigate atmosphere.",
    imageId: 230,
  },
  {
    id: 5,
    tag: "Alert",
    title: "Global markets see sudden surge",
    desc: "Tech sector drives major stock index rally.",
    extra: "Investors optimistic about future.",
    imageId: 315,
  },
  {
    id: 6,
    tag: "Trending",
    title: "New smartphone sets sales record",
    desc: "Pre-orders cross 5 million in first 48 hours.",
    extra: "Analysts predict industry shakeup.",
    imageId: 410,
  },
];

export const voxHeadlines: NewsArticle[] = [
  {
    id: 1,
    tag: "High Impact",
    title: "AI-powered traffic lights",
    desc: "Adaptive signals cut wait times by 22%.",
    extra: "",
    imageId: 42,
  },
  {
    id: 2,
    tag: "Breaking",
    title: "Cancer research breakthrough",
    desc: "Drug trial shows 70% success rate.",
    extra: "",
    imageId: 87,
  },
  {
    id: 3,
    tag: "Tech",
    title: "Reusable rocket launch",
    desc: "Affordable space travel is closer.",
    extra: "",
    imageId: 156,
  },
  {
    id: 4,
    tag: "Environment",
    title: "Climate policies introduced",
    desc: "Carbon emissions cut by 15%.",
    extra: "",
    imageId: 230,
  },
  {
    id: 5,
    tag: "Finance",
    title: "Markets at record highs",
    desc: "Tech sector drives growth.",
    extra: "",
    imageId: 315,
  },
];
