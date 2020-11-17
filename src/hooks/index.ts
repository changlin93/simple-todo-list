import { Store, useStore } from 'vuex';
import {
    REMOVE_TODO,
    SET_DOING,
    SET_STATUS,
    SET_TODO,
    SET_TODO_LIST,
} from '@/store/actionType';
import { ITodo, TODO_STATUS } from '@/typings';
import { watch } from 'vue';

export interface IUseTodo {
    setTodo: (value: string) => void;
    setTodoList: () => void;
    removeTodo: (id: number) => void;
    setStatus: (id: number) => void;
    setDoing: (id: number) => void;
}

interface IUseLocalStoreage {
    getLocalList: () => ITodo[];
    setLocalList: (todolist: ITodo[]) => void;
}

function useLocalStorage(): IUseLocalStoreage {
    function getLocalList(): ITodo[] {
        return JSON.parse(localStorage.getItem('todoList') || '[]');
    }

    function setLocalList(todolist: ITodo[]): void {
        localStorage.setItem('todolist', JSON.stringify(todolist));
    }

    return {
        getLocalList,
        setLocalList,
    };
}

function useTodo(): IUseTodo {
    /*eslint @typescript-eslint/no-explicit-any: 0 */
    const store: Store<any> = useStore();
    const { setLocalList, getLocalList }: IUseLocalStoreage = useLocalStorage();
    const todoList: ITodo[] = getLocalList();

    // 两个参数， 一个是返回监听的参数
    watch(
        () => store.state.list,
        (todoList) => {
            setLocalList(todoList);
        },
    );

    function setTodo(value: string) {
        const todo: ITodo = {
            id: new Date().getTime(),
            content: value,
            status: TODO_STATUS.WILLDO,
        };

        store.dispatch(SET_TODO, todo);
    }

    function setTodoList(): void {
        store.dispatch(SET_TODO_LIST, todoList);
    }

    function removeTodo(id: number): void {
        store.dispatch(REMOVE_TODO, id);
    }

    function setStatus(id: number): void {
        store.dispatch(SET_STATUS, id);
    }

    function setDoing(id: number): void {
        store.dispatch(SET_DOING, id);
    }

    return {
        setTodo,
        setTodoList,
        removeTodo,
        setStatus,
        setDoing,
    };
}

export { useTodo, useLocalStorage };
