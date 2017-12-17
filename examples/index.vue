<template>
    <div>Hello {{ World }}!<ComponentA /></div>
</template>

<script>
import ComponentA from './ComponentA';

export default {
    data() {
        return {
            World: 'World'
        }
    },
    components: {
        ComponentA
    }
};
</script>


<style>
    div {
        color: red;
    }
</style>

<style scoped>
    div {
        font-size: 32px;
    }
</style>