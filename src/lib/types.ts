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
    video: Media;
    image: Media;
    align: string;
}

export type LinksSection = {
    type: string;
}

export type ProjectsSection = {
    show_all: boolean;
    projects: Project[];
    layout: string;
}

export type TextSection = { 
    __typename: string;
    body: HTMLElement;
    title: string;
    align_text: string;
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

export type ProjectCategory = {
    name: string;
    slug:string;
}

export type Project = {
    title: string;
    subtitle: string;
    description: HTMLElement;
    slug: string;
    year: number;
    coordinate: string;
    image: Media;
    collaborations: Link[];
    place: Link[]
    links: Link[]
    project_categories: ProjectCategory[];
    project_type: ProjectCategory;

}