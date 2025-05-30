import {FC, memo, ReactNode} from 'react';
import s from './modal.module.css';
import close_icon from '@/assets/icons/icon_cross.svg';

interface Props {
    children: ReactNode;
    classNameWrapper?: string;
    classNameContainer?: string;
    classNameWindow?: string;
    onClickClose?: () => void;
}

export const Modal: FC<Props> = memo(({children, onClickClose}) => {

    return (
        <div className={s.window}>
            <div className={s.container}>
                <div className={s.content_wrapper}>
                    <div className={s.content}>{children}</div>
                    <button className={s.close_button} onClick={onClickClose}>
                        <img src={close_icon} alt={'close icon'}/>
                    </button>
                </div>
            </div>
        </div>
    );
});
