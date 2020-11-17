import { IState, ITodo, TODO_STATUS } from '@/typings';
import {
    REMOVE_TODO,
    SET_DOING,
    SET_STATUS,
    SET_TODO,
    SET_TODO_LIST,
} from './actionType';
const { FINISHED, WILLDO, DOING } = TODO_STATUS;

export default {
    [SET_TODO](state: IState, todo: ITodo) {
        state.list = [todo, ...state.list];
    },

    [SET_TODO_LIST](state: IState, todoList: ITodo[]): void {
        state.list = todoList;
    },

    [REMOVE_TODO](state: IState, id: number): void {
        state.list = state.list.filter((item: ITodo) => item.id !== id);
    },

    [SET_STATUS](state: IState, id: number): void {
        state.list = state.list.map(
            (item: ITodo): ITodo => {
                if (item.id === id) {
                    switch (item.status) {
                        case FINISHED:
                            item.status = WILLDO;
                            break;

                        case WILLDO:
                        case DOING:
                            item.status = FINISHED;
                            break;
                    }
                }
                return item;
            },
        );
    },

    [SET_DOING](state: IState, id: number): void {
        state.list = state.list.map(
            (item: ITodo): ITodo => {
                if (item.id != id) {
                    if (item.status === DOING) {
                        item.status = WILLDO;
                    }
                } else {
                    item.status = item.status === WILLDO ? DOING : WILLDO;
                }

                return item;
            },
        );
    },
};
