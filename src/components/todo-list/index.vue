<template>
    <div>
        <todo-item
            v-for="item of todoList"
            :item="item"
            :key="item.id"
            @removetodo="handleRemoveTodo"
            @setstatus="handleSetStatus"
            @setdoing="handleSetDoing"
        />
    </div>
</template>

<script lang="ts">
import { IUseTodo, useTodo } from '@/hooks';
import { ITodo } from '@/typings';
import { defineComponent, PropType } from 'vue';
import TodoItem from './item.vue';
export default defineComponent({
    name: 'todo-list',
    props: {
        todoList: {
            type: Array as PropType<ITodo[]>,
            required: true,
        },
    },
    components: {
        TodoItem,
    },
    setup() {
        const { removeTodo, setStatus, setDoing }: IUseTodo = useTodo();
        return {
            handleRemoveTodo: removeTodo,
            handleSetStatus: setStatus,
            handleSetDoing: setDoing,
        };
    },
});
</script>

<style scoped></style>
