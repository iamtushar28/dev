import { format, formatDistanceToNowStrict } from 'date-fns';

const BlogDate = ({ createdAt }) => {
    const createdDate = new Date(createdAt);
    const now = new Date();
    const timeDifference = now - createdDate;
    const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    const formattedDate = format(createdDate, "dd MMM yyyy"); // e.g., "12 Mar 2025"
    const relativeTime = timeDifference < oneDay ? ` (${formatDistanceToNowStrict(createdDate, { addSuffix: true })})` : '';

    return <p className='text-sm text-zinc-500'>{formattedDate}{relativeTime}</p>;
};

export default BlogDate;
