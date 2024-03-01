<script lang="ts">
    import Contact from '$lib/components/Dynamic/Contact.svelte';
import type { Project } from '$lib/types'
    import { formatDate } from '$lib/utils.js';

    export let data

    const projects = data.content.projects;
    const sortedProjects: Record<string, Project[]> = projects.reduce((acc: any, project: Project) => {
		let type = project.project_type.name;
		if (!acc[type]) {
			acc[type] = [];
		}
		acc[type].push(project);
		return acc;
	}, {});

    const getFilteredValues = (array: Project[], key: string) => {
        const uniqueSlugs: Set<string> = new Set();
        let filtered = array.map(obj => obj[key]).reduce((acc, curr) => acc.concat(curr), []);
        return  filtered.filter(obj => {
                if (uniqueSlugs.has(obj.name)) {
                return false; 
            } else {
                uniqueSlugs.add(obj.name);
                return true;
            }
        });  
    }

    const titles = {
        Event: "events",
        Ongoing: "ongoing",
        Release: "releases"
    }
    
</script>

<div class="max-w-screen-2xl mx-auto space-y-20 px-5 py-10">
{#each Object.entries(sortedProjects) as [type, projects]}
    {#if type != "Ongoing"}
    <div class="space-y-5 relative">
        <h3 class="text-base uppercase font-medium">{titles[type]}</h3>
        <table class="table-fixed text-left text-base border-collapse w-full border-raw-blue border">
            <thead>
                <tr class="uppercase ">
                  <th class="w-1/6 hidden sm:table-cell ">/COORDINATE</th>
                  <th class="w-4/5 sm:w-2/6">/TITLE</th>
                  <th class="w-1/6 hidden sm:table-cell ">/CATEGORY</th>
                  {#if type === "Event"}
                    <th class="w-1/6 hidden md:table-cell">/VENUE</th>
                  {/if}
                  <th class="w-1/ {type=== "Release" ? "md:w-2/6" : "md:w-1/6"}">/DATE</th>
                </tr>
              </thead>
              <tbody >
                {#each projects as project}
                <!-- <pre>{JSON.stringify(project, null,  2)}</pre> -->
               
                <tr>
                    <td class="hidden sm:table-cell">{project.coordinate}</td>
                    <td><a href="/projects/{project.slug}">{project.title}</a></td>
                    <td class="hidden sm:table-cell">
                    {#each project.project_categories as cat, index}
                       <span>{cat.name}</span>
                    {/each}
                    </td>
                    {#if type === "Event"}
                        <td class="hidden md:table-cell">
                        {#each project.place as place, index}
                            {#if place.url }
                                <a href={place.url}>{place.name}</a>
                            {:else}
                                {place.name}
                            {/if}
                          
                        {/each}
                      
                        </td>
                    {/if}
                    <td>{formatDate(project.date)}</td>
                    </tr>
          
                {/each}
              </tbody>
        </table>
    </div>
    {/if}
{/each}

    <div class="space-y-5 w-full">
        <h3 class="text-base uppercase font-medium">Network</h3>
        <div class="flex flex-col sm:flex-row gap-5 md:gap-0 justify-between">
            <ul class="text-base w-2/6 border-raw-blue border">
                <li class="uppercase font-medium border-raw-blue border-b p-1">/People</li>
            {#each getFilteredValues(projects, "collaborations") as collab}
                <li class="px-1">
                    {#if collab.url }
                        <a href={collab.url}>{collab.name}</a>
                    {:else}
                        {collab.name}
                    {/if}
                </li>
            {/each}
            </ul>

            <ul class="text-base border-raw-blue border">
                <li class="uppercase font-medium border-raw-blue border-b p-1">/ORGANIZATIONS</li>
            {#each getFilteredValues(projects, "place") as collab}
                <li class="px-1">
                    {#if collab.url }
                        <a href={collab.url}>{collab.name}</a>
                    {:else}
                        {collab.name}
                    {/if}
                </li>
            {/each}
            </ul>
        </div>
    </div>

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
                    {#each sortedProjects["Ongoing"] as project}
                    <!-- <pre>{JSON.stringify(project, null,  2)}</pre> -->
                
                    <tr>
                        <td><a href="/projects/{project.slug}">{project.title}</a></td>
                        <td>{project.funding ? project.funding : "none"}</td>
                        <td class="hidden md:table-cell">
                            {#each project.place as place}
                                {#if place.url }
                                    <a href={place.url}>{place.name}</a>
                                {:else}
                                    {place.name}
                                {/if}
                            {/each}
                            </td>
                        </tr>
            
                    {/each}
                </tbody>
            </table>
        </div>

</div>

<div class="max-w-screen-2xl mx-auto mb-10">
    <Contact section={{title:"Contact", subtitle:"", __typename:""}} />
</div>

<style type="postcss">
    th, td {
        @apply align-top border-raw-blue border p-1;
    }
    th {
        @apply font-medium;
    }
</style>