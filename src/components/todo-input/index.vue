<template>
    <div>
        <input
            type="text"
            placeholder="输入待办事项~~~"
            v-model="todo"
            @keyup="handleTodoValue"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useTodo, IUseTodo } from '@/hooks/index';

export default defineComponent({
    name: 'todo-input',
    setup() {
        const { setTodo }: IUseTodo = useTodo();
        const todo = ref<string>('');
        const handleTodoValue = (event: KeyboardEvent): void => {
            if (event.keyCode === 13 && todo.value.trim().length) {
                // 设置数据
                setTodo(todo.value);
                todo.value = '';
            }
        };
        return {
            todo,
            handleTodoValue,
        };
    },
});
</script>

<style scoped lang="scss"></style>
