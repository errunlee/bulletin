import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function CardSkeleton() {
  return (
    <div className="flex w-full flex-col gap-4 mt-3">
      {[1, 2, 3].map((item) => (
        <div key={item} className="w-full h-[200px] rounded-xl">
          <Skeleton
            height="100%"
            baseColor="#e0e0e0"
            highlightColor="#f5f5f5"
          />
        </div>
      ))}
    </div>
  );
}
