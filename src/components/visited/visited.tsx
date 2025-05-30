import {CardsVisitedMobile} from "@/components/visited/components/cards-visited-mobile/cards-visited-mobile.tsx";
import {TableVisited} from "@/components/visited/components/table-visited/table-visited.tsx";
import {useMediaQuery} from "react-responsive";


export const Visited = () => {
    const isMobileScreen = useMediaQuery({query: '(max-width: 768px)'});

    return (
        <div>
            {isMobileScreen ? <CardsVisitedMobile/> : <TableVisited/>}
        </div>
    );
};
