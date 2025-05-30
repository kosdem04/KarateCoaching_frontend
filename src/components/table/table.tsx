import {FC, memo, ReactNode} from "react";

interface Props {
    renderThead: ReactNode;
    renderTbody: ReactNode;
    renderTheadClassName?: string;
}

export const Table: FC<Props> = memo(({renderThead, renderTbody, renderTheadClassName}) => {
    return (
        <table style={{width: '100%'}}>
            <thead>
            <tr className={renderTheadClassName}>
                {renderThead}
            </tr>
            </thead>
            <tbody>
            {renderTbody}
            </tbody>
        </table>
    );
});
