<template>
    <div class="home">
        <todo-input @editor="handleEditor" />
        <todo-list :todoList="todoList" />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import TodoInput from '@/components/todo-input/index.vue';
import TodoList from '@/components/todo-list/index.vue';
import { IUseTodo, useTodo } from '@/hooks';
import { Store, useStore } from 'vuex';

export default defineComponent({
    name: 'home',
    components: {
        TodoInput,
        TodoList,
    },
    setup() {
        const { setTodoList }: IUseTodo = useTodo();

        /*eslint @typescript-eslint/no-explicit-any: 0 */
        const store: Store<any> = useStore();

        onMounted(() => {
            setTodoList();
        });
        const todoList = computed(() => store.state.list);

        return {
            todoList,
        };
    },
});
</script>

<style scoped lang="scss">
.home {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    min-height: 300px;
    border-radius: 20px;
    background-color: #fff;
    box-shadow: 2px 2px 50px 5px rgba(0, 0, 0, 0.2);
}
</style>
