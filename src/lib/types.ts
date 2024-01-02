// GENERAL TYPES 
export type Media = {
    id: number;
    name: string;
    alternativeText: string
    url: string;
    formats: {
        thumbnail: {
            url: string;
        }
        small: {
            url: string;
        },
        medium: {
            url: string;
        },
        large: {
            url: string;
        }
    }
}

export type Link = {
    name: string;
    url: string;
}

export type JokerSection= {
    title: string;
    subtitle: string;
    content: string;
    links: Link[];
    player: Media[];
    vide: Media;
    image: Media;
}

export type LinksSection = {
    type: string;
}

export type ProjectsSection = {
    show_all: boolean;
}

export type TextSection = { 
    __typename: string;
    body: HTMLElement;
    title: string;
}

export type GallerySection = {
    __typename: string;
    images: Media[];
}

export type PageSection =
 | JokerSection
 | LinksSection
 | ProjectsSection
 | TextSection 
 | GallerySection


export type Pagination= { 
    page: number;
    pageCount: number;
}
  

// PAGE TYPES

export type PageContents =  {
    __typename: string;
    id: number;
    title: string;
    slug: string;
    content: PageSection[]
}

export type View = {
    title: string;
    slug: string;
    dynamic_content: PageContents[]
}