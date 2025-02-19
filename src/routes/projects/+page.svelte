<script lang="ts">
    import Contact from '$lib/components/Dynamic/Contact.svelte';
    import Page from '$lib/components/Page.svelte';
    import type { Project } from '$lib/types'
    import { formatDate } from '$lib/utils.js';
    import { getFilteredValues } from '$lib/utils.js';
    import { sortProjects } from '$lib/utils';
    import ExternalLink from 'svelte-feathers/ExternalLink.svelte';
    export let data

    const projects = data.content.projects;
    const sortedProjects = sortProjects(projects)


    
</script>

<!-- <pre>{JSON.stringify(projects, null, 2)}</pre> -->
<Page>
    <div class="mx-auto space-y-10 sm:space-y-20">

    {#each Object.entries(sortedProjects) as [type, { display_name, display_venue, projects }]}
    
        {#if type != "Ongoing"}
        <div class="space-y-5 relative">
            <h3 class="text-base uppercase font-medium">{display_name}</h3>
            <table class="table-fixed text-left text-base border-collapse w-full border-raw-blue border">
                <thead>
                    <tr class="uppercase ">
                    <th class="w-1/6 hidden xl:table-cell ">/COORDINATE</th>
                    <th class="w-3/5 sm:w-2/6">/TITLE</th>
                    <th class="w-1/6 ">/CATEGORY</th>
                    {#if display_venue }
                        <th class="w-1/6 hidden lg:table-cell">/VENUE</th>
                    {/if}
                    <th class="w-1/ {type=== "Release" ? "md:w-2/6" : "md:w-1/6"} hidden md:table-cell " >/DATE</th>
                    </tr>
                </thead>
                <tbody >
                    {#each projects as project}
                
                    <tr>
                        <td class="hidden xl:table-cell">{project.coordinate}</td>
                        <td><a href="/projects/{project.slug}" aria-label="Go to {project.title}">{project.title}</a></td>
                        <td >
                        {#each project.project_categories as cat, index}
                        <span class="{index < project.project_categories.length-1 ? "after:content-[','] after:pr-1" : "" }">{cat.name}</span>
                        {/each}
                        </td>
                        {#if display_venue && project.place }
                            <td class="hidden lg:table-cell">

                            {#each project.place as place, index}
                                {#if place.url }
                                    <a target="_blank" aria-label="Go to website of {place.name}" class="{index < project.place.length-1 ? "after:content-[','] after:pr-1" : "" }" href={place.url}>{place.name}</a>
                                {:else}
                                    {place.name}
                                {/if}
                            
                            {/each}
                        
                            </td>
                        {/if}
                        <td class="hidden md:table-cell" aria-label="Project date">
                            {#if project.date}
                                {formatDate(project.date)} 
                            {/if}
                            {#if project.endDate}
                                <span> - {formatDate(project.endDate)}  </span>
                            {/if}
                        </td>
                        </tr>
            
                    {/each}
                </tbody>
            </table>
        </div>
        {/if}
    {/each} 

    <div class="space-y-5 w-full">  
        <h3 class="text-base uppercase font-medium">Network</h3>
        <div class="flex flex-col sm:flex-row gap-5 md:gap-10 ">
            {#if getFilteredValues(projects, "collaborations").length > 0}
            <ul class="text-base w-full sm:w-3/6  md:w-2/6 border-raw-blue border">
                <li class="uppercase font-medium border-raw-blue border-b p-1 flex items-center gap-2">/People
                    <ExternalLink class="h-5" />

                </li>
                {#each getFilteredValues(projects, "collaborations") as collab}
                    <li class="px-1">
                        {#if collab.url }
                            <a target="_blank" aria-label="Go to website from {collab.name}" href={collab.url}>{collab.name}</a>
                        {:else}
                            {collab.name}
                        {/if}
                    </li>
                {/each}
                </ul>
            {/if}
            {#if getFilteredValues(projects, "place").length > 0}
                <ul class="text-base border-raw-blue border h-min">
                    <li class="uppercase font-medium border-raw-blue border-b p-1 flex  items-center gap-2">/ORGANIZATIONS
                        <ExternalLink class="h-5" />
                    </li>
                {#each getFilteredValues(projects, "place") as collab}
                    <li class="px-1">
                        {#if collab.url }
                            <a target="_blank" aria-label="Go to website from {collab.name}" href={collab.url}>{collab.name}</a>
                        {:else}
                            {collab.name}
                        {/if}
                    </li>
                {/each}
                </ul>
            {/if}
        </div>
    </div>
    {#if sortedProjects["Ongoing"] }
        <div class="space-y-5 relative">
            <h3 class="text-base uppercase font-medium">Ongoing</h3>
            <table class="table-fixed text-left text-base border-collapse w-full">
                <thead>
                    <tr class="uppercase">
                    <th class="w-2/6">/TITLE</th>
                    <th class="w-2/6">/FUNDING</th>
                    <th class="w-2/6 hidden sm:table-cell">/SUPPORT</th>
                    </tr>
                </thead>
    
                <tbody >
                        {#each sortedProjects["Ongoing"].projects as project}
                        <tr>
               
                            <td><a href="/projects/{project.slug}">{project.title}</a></td>
                            <td>{project.funding ? project.funding : "none"}</td>
                            <td class="hidden md:table-cell">
                            {#if project.place }
                                {#each project.place as place}
                                    {#if place.url }
                                        <a target="_blank" href={place.url}>{place.name}</a>
                                    {:else}
                                        {place.name}
                                    {/if}
                                {/each}
                            {/if}
                            </td>
                        </tr>
                        {/each}
                    </tbody>
                </table>
            </div>  
        {/if}
    </div>
    <div class="mx-auto mt-20">
        <Contact section={{title:"Contact", subtitle:"", __typename:""}} />
    </div>
</Page>


<style type="postcss">
    th, td {
        @apply align-top border-raw-blue border p-1;
    }
    th {
        @apply font-medium;
    }
</style>