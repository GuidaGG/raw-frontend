<script lang="ts">
    import type { Project } from '$lib/types'

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

    
</script>

<div class="max-w-screen-2xl mx-auto space-y-20 px-5">
{#each Object.entries(sortedProjects) as [type, projects]}

    <div class="space-y-5 relative">
        <h3 class="text-base uppercase font-bold">{type}s</h3>
        <table class="table-fixed text-left text-base border-collapse w-full">
            <thead>
                <tr class="uppercase">
                  <th class="w-1/6 hidden sm:table-cell">/COORDINATE</th>
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
                    <td><a href="/projects/{project.title}">{project.title}</a></td>
                    <td class="hidden sm:table-cell">
                    {#each project.project_categories as cat, index}
                       <span>{cat.name}</span>
                    {/each}
                    </td>
                    {#if type === "Event"}
                        <td class="hidden md:table-cell">
                        {#each project.place as place}
                            {#if place.url }
                                <a href={place.url}>{place.name}</a>
                            {:else}
                                {place.name}
                            {/if}
                        {/each}
                        </td>
                    {/if}
                    <td>{project.year}</td>
                    </tr>
          
                {/each}
              </tbody>
        </table>
    </div>
{/each}

    <div class="space-y-5 w-full">
        <h3 class="text-base uppercase font-bold">Network</h3>
        <div class="flex flex-col sm:flex-row gap-5">
            <ul class="text-base w-3/6">
                <li class="uppercase font-bold">/People</li>
            {#each getFilteredValues(projects, "collaborations") as collab}
                <li>
                    {#if collab.url }
                        <a href={collab.url}>{collab.name}</a>
                    {:else}
                        {collab.name}
                    {/if}
                </li>
            {/each}
            </ul>

            <ul class="text-base">
                <li class="uppercase font-bold">/ORGANIZATIONS</li>
            {#each getFilteredValues(projects, "place") as collab}
                <li>
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
</div>

<style type="postcss">
    th, td {
        @apply align-top ;
    }
    table a {
        @apply hover:underline-offset-2 hover:underline
    }


</style>