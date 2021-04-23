import React from 'react';
import {
    useHistory,
    useLocation,
    useParams
} from 'react-router-dom';

const useRoute = () => {
    const history = useHistory();
    const { id } = useParams();
    const queryObj = new URLSearchParams(useLocation().search);
    const saveDataIdQuery = queryObj.get(`saveDataId`);

    return React.useMemo(() => true &&
        {
            push: history.push,
            replace: history.replace,
            paramUserId: id,
            querySaveDataId: saveDataIdQuery
        }
        , [history, id, saveDataIdQuery])
}

export default useRoute;