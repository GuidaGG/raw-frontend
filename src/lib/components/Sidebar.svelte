<script lang="ts">
    import Search from 'svelte-feathers/Search.svelte';
    import Arrow from 'svelte-feathers/ArrowRight.svelte';
    import { sortProjects } from '$lib/utils';
    import { getFilteredValues } from '$lib/utils';
    
    export let hidden: boolean;
    export let data;

    const sortedProjects = sortProjects(data)

    const titles = {
        Event: "/events",
        Ongoing: "/ongoing",
        Release: "/releases"
    }

    $: searchInput = ""
</script>

<div class="hidden md:block md:w-1/5 border-l border-raw-blue bg-white h-screen top-0 right-0 overflow-y-scroll overflow-x-hidden pt-40  pb-20 px-5 no-scrollbar {hidden ? "md:hidden" : "fixed"}">
    <div class="sticky top-0">
        <div class="border rounded-full bg-white  border-raw-blue mb-10 flex p-2 w-full gap-2 items-center" >

            <Search class="cursor-pointer h-6 w-8 shrink-0" />
            <input type="search" bind:value={searchInput} placeholder="search" class="text-base placeholder:text-raw-blue focus:outline-none w-full bg-transparent">
        </div>
    </div>  
    <div class="space-y-10 text-base">
        {#each Object.entries(sortedProjects) as [type, projects]}
            <div>
                <h3 class="uppercase font-medium">{titles[type]}</h3>
                <ul>
                        {#each projects as project}
                        <!-- <pre>{JSON.stringify(project, null,  2)}</pre> -->
                        <li class="flex items-center gap-2  group hover:font-medium">
                            <a href="/projects/{project.slug}">{project.title}</a>
                            <Search class="h-5 w-5 shrink-0 hidden group-hover:block cursor-pointer " on:click={() => {searchInput = project.title}}/>
                        </li>
                        {/each}
                    </ul>
            </div>
        {/each}
        <div>
            <h3 class="uppercase font-medium">/People</h3>
            <ul>
                {#each getFilteredValues(data, "collaborations") as collab}
                <li class="flex items-center gap-2  group hover:font-medium">
                        {#if collab.url }
                            <a target="_blank" href={collab.url}>{collab.name}</a>
                        {:else}
                            {collab.name}
                        {/if}
                        <Search class="h-5 w-5 shrink-0 hidden group-hover:block cursor-pointer" on:click={() => {searchInput = collab.name}}/>
                </li>
            {/each}
            </ul>
        </div>
        <div>
            <h3 class="uppercase font-medium">/Place</h3>
            <ul>
                {#each getFilteredValues(data, "place") as place}
                <li class="flex items-center gap-2  group hover:font-medium ">
                        {#if place.url }
                            <a target="_blank" href={place.url}>{place.name}</a>
                        {:else}
                            {place.name}
                        {/if}
                        <Search class="h-5 w-5 shrink-0 hidden group-hover:block cursor-pointer" on:click={() => {searchInput = place.name}}/>
                </li>
            {/each}
            </ul>
        </div>
    </div>

</div>