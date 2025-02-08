interface NYTimesArticle {
  source: string;
  byline: { original: string };
  headline: { main: string };
  abstract: string;
  web_url: string;
  multimedia: { url: string }[];
  pub_date: string;
  lead_paragraph: string;
}

export interface NYTimesResponse {
  response: {
    docs: NYTimesArticle[];
  };
}
