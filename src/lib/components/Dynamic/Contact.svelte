<script lang="ts">
    import type { ContactInfo, ContactSection} from "$lib/types";
    import { contact } from "$lib/store";

    export let section: ContactSection
    
    let contactInfo: ContactInfo = {}
    contact.subscribe((value) => {
        contactInfo = value.info
    });

    </script>



    <div class=" bg-raw-white max-w-screen-md border border-raw-blue">
        {#if section.title}
            <h2 class="border-b border-raw-blue p-5 pb-2 not-prose uppercase text-xl">{ section.title}</h2>
        {/if}
        {#if section.subtitle}
            <div class="px-5 py-2 ">
                { @html section.subtitle}
            </div>
        {/if}

        {#if contactInfo.intro}
        <div class="px-5 py-2 prose">
            { @html contactInfo.intro}
        </div>
    {/if}
        <div class="p-5 space-y-10">
            <div>
                <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
            </div>
            <div class="flex gap-4 text-sm">
            {#each contactInfo.socialMedia as media}
                    <a target="_blank"  href={media.url}>{media.name}</a>
            {/each}
            </div>
        </div>
    </div>