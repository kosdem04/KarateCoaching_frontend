import React, {ChangeEvent, useState} from "react";
import delete_icon from '@/assets/icons/icon_cross.svg';
import s from "./coach-groups.module.css";
import StudentsInGroup from "@/components/CoachComponents/students-in-group/students-in-group.tsx";
import {useCreateGroupMutation, useDeleteGroupMutation, useGetGroupsQuery} from "@/api/groups.ts";

export default function CoachGroups() {
    const [newGroup, setNewGroup] = useState<string>('');
    const [selectedGroupId, setSelectedGroupId] = useState<null | number>(null);
    const {data: groups} = useGetGroupsQuery();
    const [removeGroup] = useDeleteGroupMutation();
    const [createGroup] = useCreateGroupMutation();

    const onClickCreateGroup = () => {
        createGroup(newGroup);
        setNewGroup('');
    }
    const changeName = (name: ChangeEvent<HTMLInputElement>) => {
        setNewGroup(name.currentTarget.value);
    }
    const deleteGroup = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
        event.stopPropagation();
        removeGroup(id)
    }

    return (
        <div className={s.groups_container}>
            <div className={s.title_wrapper}>
                <h3>Мои группы</h3>
                <div className={s.input_wrapper}>
                    <input type="text" onChange={changeName} value={newGroup} className={s.input_form}/>
                    <button className={s.button_add_group} onClick={onClickCreateGroup}
                            disabled={!newGroup}>Добавить
                    </button>
                </div>
            </div>
            <div className={s.groups_list}>
                {groups?.map(group => (
                    <div key={group.id} className={s.group_card} onClick={() => setSelectedGroupId(group.id)}>
                        <h4>{group.name}</h4>
                        <button className={s.delete_button} onClick={(event) => deleteGroup(event, group.id)}>
                            <img src={delete_icon} alt={'delete icon'}/>
                        </button>
                    </div>
                ))}
                {groups?.length === 0 && <p>Группы не найдены.</p>}
            </div>
            {selectedGroupId && (
                <StudentsInGroup
                    groupId={selectedGroupId}
                    onClose={() => setSelectedGroupId(null)}
                />
            )}
        </div>
    );
}
