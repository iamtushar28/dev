const SkeletonLoader = () => {
    return (
        <div className='w-full h-fit mt-2 p-2 pb-6 bg-white shadow-sm rounded overflow-hidden'>

            {/* Creator Skeleton */}
            <div className='mt-2 flex gap-3 items-center'>

                {/* Profile Image */}
                <div className='h-10 w-10 md:h-12 md:w-12 rounded-full overflow-hidden skeleton'></div>

                {/* Name & Date Skeleton */}
                <div className='flex flex-col gap-2'>
                    <div className='h-2 w-48 skeleton'></div>
                    <div className='h-2 w-32 skeleton'></div>
                </div>
            </div>

            {/* Title Skeleton */}
            <div className='w-full h-4 mt-4 skeleton'></div>
            <div className='w-[50%] h-4 mt-2 skeleton'></div>

        </div>
    );
};

const SkeletonList = () => {
    return (
        <div className="w-full flex gap-3 flex-col justify-center items-center">
            {[...Array(3)].map((_, index) => (
                <SkeletonLoader key={index} />
            ))}
        </div>
    );
};

export default SkeletonList;
