<template>
    <div>
        <input
            type="checkbox"
            name=""
            id=""
            :checked="item.status === FINISHED"
            @click="handleSetStatus(item.id)"
        />
        <span :class="item.status === FINISHED ? 'line-through' : ''">{{
            item.content
        }}</span>
        <button @click="handleClickRemoveTodo(item.id)">删除</button>
        <button
            @click="handleClickSetDoing(item.id)"
            v-if="item.status !== FINISHED"
            :class="item.status === DOING ? 'doing' : 'willdo'"
        >
            {{ item.status === DOING ? '正在做···' : '马上做' }}
        </button>
    </div>
</template>

<script lang="ts">
import { ITodo, TODO_STATUS } from '@/typings';
import { defineComponent, PropType } from 'vue';

interface IStatusState {
    DOING: TODO_STATUS;
    FINISHED: TODO_STATUS;
    WILLDO: TODO_STATUS;
}

export default defineComponent({
    name: 'item',
    props: {
        item: {
            type: Object as PropType<ITodo>,
            required: true,
        },
    },
    setup(props, { emit }) {
        const statusState: IStatusState = {
            DOING: TODO_STATUS.DOING,
            FINISHED: TODO_STATUS.FINISHED,
            WILLDO: TODO_STATUS.WILLDO,
        };

        const handleSetStatus = (id: number): void => {
            emit('setstatus', id);
        };

        const handleClickRemoveTodo = (id: number): void => {
            emit('removetodo', id);
        };

        const handleClickSetDoing = (id: number): void => {
            emit('setdoing', id);
        };

        return {
            ...statusState,
            handleSetStatus,
            handleClickRemoveTodo,
            handleClickSetDoing,
        };
    },
});
</script>

<style scoped>
.line-through {
    text-decoration: line-through;
}

.doing {
    color: skyblue;
    background-color: #fff;
}

.willdo {
    background-color: orange;
    color: #fff;
}
</style>
