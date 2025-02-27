<script lang="ts">
    import { page } from '$app/stores';
    import { config } from '$lib/config';
    import type { SEO } from '$lib/types';

    export let seo: SEO;
  </script>
  
  <svelte:head>
    <title>{seo.metaTitle}</title>
	<meta name="description" content={seo.metaDescription} />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="og:image" content={`${config.apiUrl}${seo.metaImage?.formats.large.url}`} />
    <meta property="og_site_name" content={seo.metaTitle}”>
    <meta property="og:url" content={`${config.frontUrl}${$page.url.pathname.toString()}`}>
    <meta property="og:type" content="website">
    <meta property="og:title" content="{seo.metaTitle}">
    <meta property="og:description" content={seo.metaDescription}>
    <meta name="keywords" content="{seo.keywords}" />
    <link rel="canonical" href="{`${config.frontUrl}${$page.url.pathname}`}">
    {@html `  <script type="application/ld+json">{
     "@context": "https://schema.org",
     "@type": "Website",
     "name": "{seo.metaTitle}",
     "url": "${config.frontUrl}${$page.url.pathname}",
     "logo": "../images/logo.png" }</script>`}
  </svelte:head>
  