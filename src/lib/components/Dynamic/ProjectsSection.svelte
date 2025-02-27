<script lang="ts">
    import type { Project, ProjectsSection } from "$lib/types";
    import Arrow from "../Arrow.svelte";
    import Image from "../Image.svelte";
    import { getYear } from "$lib/utils";
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

    const getImage = (project : Project) => {
        return project.featured_image ?? project.images?.[0];
    }


</script>

<!-- <pre>{JSON.stringify(listProjects, null, 2)}</pre> -->
<div class="bg-raw-white border border-raw-blue">
    <div class="relative overflow-hidden ">
        <div class="flex flex-row transition-transform duration-500 ease-in-out overflow-x-auto scroll-smooth no-scrollbar w-auto " bind:this={container}>
            {#each listProjects as project}
                <div class="w-5/6 md:w-3/4 shrink-0 h-[50vh] md:h-[70vh] overflow-auto relative">
                    <Image image={getImage(project)} size="large" class="pr-5 md:pr-20 border-b border-raw-blue object-cover w-full h-[50vh] md:h-[70vh]" /> 
                    <a href="/projects/{project.slug}" class="absolute bottom-4 right-10 sm:right-24 button border-2 text-center shadow-inner transition-all duration-200 shadow-raw-blue px-2 rounded-full text-base uppercase max-w-fit inverted bg-raw-blue hover:no-underline border-raw-blue text-raw-white hover:text-raw-blue hover:bg-raw-white" aria-label="Go to project: {project.title}">
                        <div>Go to Project</div>
                    </a>
                </div>
            {/each}
            <div class="w-3/4 shrink-0 border-t border-b border-raw-blue"></div>
        </div>

        <div class="absolute top-0 w-full flex h-[40vh] md:h-[60vh]">
            <button class="w-5/6 md:w-3/4 shrink-0  cursor-pointer"  on:click={before} aria-label="Previous Project">
            
            </button>
            <button class="w-1/6 md:w-1/4 shrink-0 cursor-pointer " on:click={next} aria-label="Next Project">
            </button>
        </div>
    </div>
    <div class="p-5 flex wp-full md:justify-between flex-col-reverse md:flex-row gap-5 md:h-48">
        <div class="w-full md:w-3/4 shrink-0 ">
            <a href="/projects/{active.slug}"  aria-label="Go to project: {active.title}" >
            <h3 class="text-xl pb-0">{active.title}</h3>
            </a>
            <div class="flex gap-2 text-xs">
                <span>{getYear(active.date)}</span>
                <span>|</span>
                {#each active.place as place}
                <span>{place.name}</span>
                {/each}

            </div>
            {#if active.description}
            <div class="text-base pt-5 line-clamp-3">{ @html active.description}</div>
            {/if}
        </div>

        <div class="flex  gap-5 md:gap-10 items-start">
            <button on:click={before} aria-label="Previous Project">
                <Arrow class="focus:outline-1 focus:ring-none focus:outline-raw-blue stroke-raw-blue" />
            </button> 
            <button on:click={next} aria-label="Next Project"> 
            <Arrow class="rotate-180  focus:outline-1 focus:ring-none focus:outline-raw-blue stroke-raw-blue" />
            </button> 
        </div>

     
    </div>
</div> 