<script lang="ts">
    import type { Project, ProjectsSection } from "$lib/types";
    import Arrow from 'svelte-feathers/Play.svelte'
    import Image from "../Image.svelte";
    export let section: ProjectsSection
    export let projects: Project[]

    const filterProjects = (projs: Project[]) => {
        const selected = section.projects;
        const filteredProjects = [];
        for (const key in selected) {
            if (selected.hasOwnProperty(key)) {
                const filtered = projs.filter((p) => {
                    return p.slug === selected[key].slug;
                });
                filteredProjects.push(...filtered);
                }
            }
        return filteredProjects;
    }

    let container: HTMLDivElement;
    let currentSlideElement: number;

    const listProjects: Project[]  = section.show_all ? projects : filterProjects(projects)

    let counter = 0
    $: active = listProjects[counter];

    const next = () => {
       counter = counter < listProjects.length -1 ? counter+=1 : 0
       currentSlideElement = container?.children[counter].offsetLeft || 0;
       container.scrollLeft = currentSlideElement;
    }

    
   

    const before = () => {
       counter = counter > 0 ? counter-=1 : counter
       currentSlideElement = container?.children[counter].offsetLeft || 0;
       container.scrollLeft = currentSlideElement;
    }
</script>

<div class="bg-white mb-10 ">
        <div class="relative overflow-hidden ">
            <div class="flex flex-row transition-transform duration-500 ease-in-out overflow-x-auto scroll-smooth no-scrollbar w-auto " bind:this={container}>
                {#each listProjects as project}
                    <div class="w-5/6 md:w-3/4 shrink-0 h-[70vh] overflow-auto">
                        <a href="/projects/{project.slug}" >
                        <Image image={project.image} size="large" class="pr-20 border-t border-b border-raw-blue object-cover w-full  max-h-[70vh]" />
                            
                        </a>
                    </div>
                {/each}
                <div class="w-3/4 shrink-0 border-t border-b border-raw-blue"></div>
            </div>
        </div>
    <div class="p-5 flex wp-full justify-between flex-col-reverse  md:flex-row gap-5 h-48 ">
        <div class="w-full md:w-3/4 shrink-0 ">
            <h3 class="text-xl pb-0">{active.title}</h3>
            <div class="flex gap-2 text-xs">
                <span>{active.year}</span>
                <span>|</span>
                {#each active.place as place}
                <span>{place.name}</span>
                {/each}

            </div>
            {#if active.description}
            <div class="text-base pt-5 line-clamp-3">{ @html active.description}</div>
            {/if}
        </div>

        <div class="flex  gap-5 md:gap-10">
            <Arrow class="rotate-180 focus:outline-1 focus:ring-none focus:outline-raw-blue" on:click={before}/>
            <Arrow on:click={next} class="focus:outline-1 focus:ring-none focus:outline-raw-blue" />
        </div>
    </div>
</div>