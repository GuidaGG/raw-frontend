<script lang="ts">
    import DynamicContent from '$lib/components/DynamicContent.svelte';
    import { transformTracks } from '$lib/utils.js';
    import Page from '$lib/components/Page.svelte';
    import Audios from '$lib/components/Dynamic/Audios.svelte';
    export let data;

    let reviews = data.content?.reviews[0];

    $: reviewTracks = reviews?.audioFiles ? transformTracks([reviews]) : [];
</script>

<Page class=" px-10 py-10" >
    <div class="pb-20 ">
        <h3 class="font-medium uppercase">/review</h3>
        <h1 class="">{reviews.title}</h1>
        <div class="flex gap-2">
            <span class="text-base">project:</span><a href="/projects/{reviews.project.slug}" class="text-base">{reviews.project.title}</a>
        </div>
        <div class="w-2/3">
            {#if reviews.audioFiles}
                <Audios tracks={reviewTracks} />
            {/if}
        </div>
    </div>
  
    <DynamicContent page={reviews}/> 
</Page>
