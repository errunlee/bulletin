export interface GuardianNewsResponse {
  response: {
    status: "ok";
    userTier: "developer";
    total: number;
    startIndex: number;
    pageSize: number;
    currentPage: number;
    pages: number;
    orderBy: string;
    results: GuardianArticle[];
  };
}

export interface GuardianArticle {
  id: string;
  type: "article" | "liveblog";
  sectionId: string;
  sectionName: string;
  webPublicationDate: string; // ISO 8601 date string
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
  fields: {
    byline: string;
    headline: string;
    thumbnail: string;
    trailText: string;
  };
}
