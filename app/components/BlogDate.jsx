import { format, formatDistanceToNowStrict } from "date-fns";

const BlogDate = ({ createdAt }) => {
    // Validate the date
    if (!createdAt) return <p className="text-sm text-zinc-500">Invalid date</p>;

    const createdDate = new Date(createdAt);

    // If createdDate is invalid, return fallback
    if (isNaN(createdDate.getTime())) {
        return <p className="text-sm text-zinc-500">Invalid date</p>;
    }

    const now = new Date();
    const timeDifference = now - createdDate;
    const oneMinute = 60 * 1000; // 1 minute in milliseconds
    const fourMinutes = 4 * oneMinute; // 4 minutes

    // Show "Just now" for comments posted in the last 0-4 minutes
    if (timeDifference <= fourMinutes) {
        return <p className="text-sm text-zinc-500">Just now</p>;
    }

    // Standard date formatting
    const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const formattedDate = format(createdDate, "dd MMM yyyy"); // e.g., "12 Mar 2025"
    const relativeTime =
        timeDifference < oneDay ? ` (${formatDistanceToNowStrict(createdDate, { addSuffix: true })})` : "";

    return <p className="text-sm text-zinc-500">{formattedDate}{relativeTime}</p>;
};

export default BlogDate;
