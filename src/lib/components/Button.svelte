<script lang="ts">
    export let link:string = ''
    export let margin = false
    export let invert = false

    let random = margin ? `${40 * Math.random() + 20}%` : "auto"
    let typeClass = invert ? "inverted bg-raw-blue  border-raw-blue text-raw-white hover:text-raw-blue hover:bg-raw-white border-" : "border-raw-blue shadow-raw-blue hover:bg-raw-blue transition-all "
</script>

<a class="button  border-2 text-center shadow-inner shadow-raw-blue sm:px-20 rounded-full py-2 text-xl sm:text-3xl uppercase w-full md:max-w-fit {typeClass} {$$restProps.class}"  style="--margin: {random}" href={link}>
    <slot />
</a>

<style lang="postcss">
@screen md {
    .button { 
        margin-left: var(--margin);
        
    }
    }

</style>