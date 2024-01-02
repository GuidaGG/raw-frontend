<script lang="ts">
import DynamicContent from '$lib/components/DynamicContent.svelte';
export let data;

let page = data.content.views[0]

</script>

<div class="bg-raw-blue p-5">
    <DynamicContent {page}/>
</div>
