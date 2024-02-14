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

<div class="max-w-screen-2xl mx-auto">
{#each Object.entries(sortedProjects) as [type, projects]}

    <div>
        <h3>{type}s</h3>
        <table class="table-auto text-left border-spacing-4 text-base border-collapse">
            <thead>
                <tr class="uppercase">
                  <th>/COORDINATE</th>
                  <th>/TITLE</th>
                  <th>/CATEGORY</th>
                  {#if type === "Event"}
                    <th>/VENUE</th>
                  {/if}
                  <th>/DATE</th>
                </tr>
              </thead>
              <tbody >
                {#each projects as project}
                <!-- <pre>{JSON.stringify(project, null,  2)}</pre> -->
                <tr>
                    <td>{project.coordinate}</td>
                    <td>{project.title}</td>
                    <td>
                    {#each project.project_categories as cat, index}
                       <span>{cat.name}</span>
                    {/each}
                    </td>
                    {#if type === "Event"}
                        <td>
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

    <div>
        <h3>Network</h3>
        <div class="flex gap-10">
            <ul class="text-base">
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
        @apply px-5 xl:px-10 first:pl-0 last:pr-0;
    }
</style>