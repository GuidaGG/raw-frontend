<script lang="ts">
    import Page from "$lib/components/Page.svelte";
    import Image from "$lib/components/Image.svelte";
    import { formatDate } from '$lib/utils.js';
    import Contact from "$lib/components/Dynamic/Contact.svelte";

    export let data;

    let records = data.content.projects
</script>

<Page class="grainy-gradient">

<div class="grid grid-cols-1 lg:grid-cols-3 gap-5 pb-20">
    {#each records as record}
       <div class=" aspect-square border border-raw-blue relative overflow-hidden">
            <div class="bg-blue-200 w-full h-full bg-raw-blue-light" >
                {#if record.images}
                <a href="/projects/{record.slug}">
                <Image size="large" class="w-full h-full" image={record.images[0]} />
                </a>
                {/if}
            </div>
            <div class="flex flex-col md:opacity-0 hover:opacity-100 absolute top-0  w-full md:h-full z-6 bg-white px-2 pt-3 border-b border-raw-blue md:border-none md:p-5 justify-between">
                <a href="/projects/{record.slug}">
                    <h2 class="text-xl 2xl:text-4xl">{record.title}</h2>
                    {#if record.subtitle}
                        <h3 class="text-base 2xl:text-xl">{record.subtitle}</h3>
                    {/if}
                </a>
<!--                
                <div>
                    {#if record.reviews.length}
                    <div class="py-10 space-y-2 ">
                        <h3 class="text-base uppercase font-medium">/Reviews</h3>
                        <ul >
                            {#each record.reviews as review} 
                            <li class="text-base">   
                                <a href="/reviews/{review.slug}">{review.title}</a>
                            </li>	
                            {/each}
                        </ul>   
                    </div>
                    {/if}
                </div> -->
                <div class="hidden md:flex text-xs gap-2 justify-between items-end" >
                    <div class="flex flex-col">
                        <div>{formatDate(record.date)} </div>
                        <div class="">RAW {record.coordinate}</div>
                    </div>  
                  
                    <a href="#order" class="bg-raw-blue text-white text-center text-base px-2 rounded-full  flex items-center uppercase hover:no-underline max-w-min">order
                        
                    </a>
                </div>
           
                   
            </div>
        </div>
    {/each}
</div>
<div id="order">
<Contact section={{title:"Contact", subtitle:"", __typename:""}} />
</div>
</Page>