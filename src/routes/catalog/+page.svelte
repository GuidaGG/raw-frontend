<script lang="ts">
    import type { Project, ProjectsSection } from "$lib/types";
    import Page from "$lib/components/Page.svelte";
    import Image from "$lib/components/Image.svelte";
    import { formatDate } from '$lib/utils.js';
    import Contact from "$lib/components/Dynamic/Contact.svelte";

    export let data;

    let records = data.content.projects;

    function getImage(project: Project) {
        return project.featured_image ?? project.images?.[0];
    }
</script>

<Page class="grainy-gradient">

<div class="grid grid-cols-1 lg:grid-cols-3 gap-5 pb-20">
    {#each records as record}
       <div class=" aspect-square border border-raw-blue relative overflow-hidden">
            <div class="w-full h-full bg-raw-blue-light" >
                {#if record.images || record.featured_image}
                <a href="/projects/{record.slug}">
                <Image size="medium" class="w-full h-full" image={getImage(record)} />
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
                Not added for now            
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
                        <div class="">{record.coordinate}</div>
                    </div>  
                  
                    <a href="#order" class="button border-2 text-center shadow-inner transition-all duration-200 shadow-raw-blue sm:px-2 rounded-full text-base uppercase w-full md:max-w-fit inverted bg-raw-blue hover:no-underline border-raw-blue text-raw-white hover:text-raw-blue hover:bg-raw-white" aria-label="Jump to Contact Section">
                        order  
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