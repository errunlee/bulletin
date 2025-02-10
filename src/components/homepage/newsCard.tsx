import { NewsArticle } from "@/types/newsArticle";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface Props {
  article: NewsArticle;
}

const NewsCard = ({ article }: Props) => {
  return (
    <article className="md:grid md:grid-cols-3 gap-3 bg-white dark:bg-gray-900 shadow-lg rounded-xl overflow-hidden items-center">
      {/* News Image */}

      <LazyLoadImage
        alt={article.title}
        src={article.urlToImage || "/image-not-found.png"} // use normal <img> attributes as props
        wrapperClassName="w-full lg:w-auto"
        className="w-full md:max-w-[15rem] lg:max-w-[25rem]  h-60 object-cover"
        effect="blur"
      />

      {/* <img
        loading="lazy"
        src={article.urlToImage}
        alt={article.title}
        className="w-full md:max-w-[15rem] lg:max-w-[25rem]  h-60 object-cover"
      /> */}

      {/* News Content */}
      <div className="p-5 md:col-span-2">
        {/* Source & Author */}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {article.source.name} • {article.author}
        </p>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-2">
          {article.title}
        </h2>

        {/* Published Date */}
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {new Date(article.publishedAt).toDateString()}
        </p>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 mt-3">
          {article.description.length > 150
            ? article.description.slice(0, 150) + "..."
            : article.description}
        </p>

        {/* Read More Button */}
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-blue-600 dark:text-blue-400 hover:underline"
        >
          Read Full Article →
        </a>
      </div>
    </article>
  );
};

export default NewsCard;
