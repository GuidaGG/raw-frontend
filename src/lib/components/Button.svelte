<script lang="ts">
    export let margin = false
    export let invert = false

    let random = margin ? `${40 * Math.random() + 20}%` : "auto"
    let typeClass = invert ? "inverted bg-raw-blue text-raw-white hover:bg-raw-white " : "border-raw-blue hover:bg-raw-blue-light transition-all"
</script>

<button class="button border text-center  shadow-raw-blue shadow-inner sm:px-20 rounded-full py-2 text-xl sm:text-3xl uppercase max-w-full md:max-w-fit {typeClass}"  style="--margin: {random}">
    <slot />
</button>

<style lang="postcss">
@screen md {
    .button { 
        margin-left: var(--margin);
        
    }
    }

</style>