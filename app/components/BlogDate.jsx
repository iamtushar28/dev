import { format, formatDistanceToNowStrict } from "date-fns";

const BlogDate = ({ createdAt }) => {
  // Early fallback if no date is provided
  if (!createdAt) {
    return <p className="text-sm text-zinc-500">Invalid date</p>;
  }

  // Normalize: convert numeric/string timestamps safely
  const createdDate = new Date(Number(createdAt));

  // Check for invalid date
  if (isNaN(createdDate.getTime())) {
    return <p className="text-sm text-zinc-500">Invalid date</p>;
  }

  const now = new Date();
  const timeDifference = now - createdDate;

  const ONE_MINUTE = 60 * 1000;
  const FOUR_MINUTES = 4 * ONE_MINUTE;
  const ONE_DAY = 24 * 60 * 60 * 1000;

  // Show "Just now" if within 4 minutes
  if (timeDifference <= FOUR_MINUTES) {
    return <p className="text-sm text-zinc-500">Just now</p>;
  }

  const formattedDate = format(createdDate, "dd MMM yyyy");
  const relativeTime =
    timeDifference < ONE_DAY
      ? ` (${formatDistanceToNowStrict(createdDate, { addSuffix: true })})`
      : "";

  return (
    <p className="text-sm text-zinc-500">
      {formattedDate}
      {relativeTime}
    </p>
  );
};

export default BlogDate;
