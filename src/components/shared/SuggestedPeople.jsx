import { useEffect } from 'react';
import { usePassParam } from '../../hooks';
import { useGetSuggestedPeople } from '../../lib/react-query/queries';
import Loader from './Loader';
import PersonCard from './PersonCard';
import { spread } from '../../utilities/reduceArray';
import { useInView } from 'react-intersection-observer';

export default function SuggestedPerson({ currentUser }) {
    const { ref, inView } = useInView();
    const { param, setParam } = usePassParam();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isSuccess: hasUsers,
        isFetchingNextPage,
    } = useGetSuggestedPeople(param);

    useEffect(() => {
        if (currentUser)
            setParam([...spread.following(currentUser), currentUser]);
    }, [currentUser]);

    useEffect(() => {
        if (inView) fetchNextPage();
    }, [inView]);

    return (
        <div className="rounded-md">
            <h1 className="text-lg font-system font-semibold p-4 border-b border-primary">
                People you may know
            </h1>
            <div className="overflow-y-scroll h-[472px]">
                {!hasUsers ? (
                    <div className="flex-center p-2">
                        <Loader />
                    </div>
                ) : (
                    spread
                        .pages(data)
                        .map((user) => (
                            <PersonCard user={user} key={user.$id} />
                        ))
                )}
                {hasNextPage && (
                    <div ref={ref}>
                        <Loader />
                    </div>
                )}
            </div>
        </div>
    );
}
