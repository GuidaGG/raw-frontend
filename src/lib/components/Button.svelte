<script lang="ts">
    export let margin = false
    export let invert = false

    let random = margin ? `${40 * Math.random() + 20}%` : "auto"
    let typeClass = invert ? "bg-raw-blue text-white" : "border-raw-blue"
</script>

<div class="button border text-center px-20 rounded-3xl py-2 text-3xl uppercase max-w-full md:max-w-fit {typeClass}"  style="--margin: {random}">
    <slot />
</div>

<style lang="postcss">
@screen md {
    .button { 
        margin-left: var(--margin);
    }
}

</style>