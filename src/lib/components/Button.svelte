<script lang="ts">
    export let margin = false

    let random = margin ? `${40 * Math.random() + 20}%` : "auto"

</script>

<div class="button border border-raw-blue px-20 rounded-3xl  py-2 text-3xl uppercase max-w-fit" {...$$restProps} style="--margin: {random}">
    <slot />
</div>

<style lang="postcss">
.button { 
    margin-left: var(--margin);
}
</style>