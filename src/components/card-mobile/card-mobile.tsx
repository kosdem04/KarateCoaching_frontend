import {FC, memo, ReactNode} from "react";
import s from './card-mobile.module.css'

interface Props {
    onClick?: () => void;
    children: ReactNode;
}

export const CardMobile: FC<Props> = memo(({onClick, children}) => {
    return (
        <div className={s.mobile_result_card} onClick={onClick}>
            {children}
        </div>
    );
});
