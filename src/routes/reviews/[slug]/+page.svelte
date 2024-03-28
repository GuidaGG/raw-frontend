<script lang="ts">
    import Page from '$lib/components/Page.svelte';
    import DynamicContent from '$lib/components/DynamicContent.svelte';
    import { transformTracks } from '$lib/utils.js';
    import AudioSection from '$lib/components/Dynamic/AudioSection.svelte';
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
    </div>
  
    <DynamicContent page={reviews}/>  
</Page>
