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
    layout_joker: string;
    transparent: boolean;
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

export type ContactSection = {
    __typename: string;
    title:  string;
    subtitle: string;
}

export type PageSection =
 | JokerSection
 | LinksSection
 | ProjectsSection
 | TextSection 
 | GallerySection
 | ContactSection


export type Pagination= { 
    page: number;
    pageCount: number;
}
  
export type AudioFile = {
    title: string;
    audioFile: {
      url: string;
      formats: any[] | null;
      alternativeText: string | null;
      name: string;
      id: string;
    };
    audioFile_download: {
      url: string | null;
      formats: any[] | null;
      alternativeText: string | null;
      name: string | null;
      id: string;
    } | null;
    radio: boolean;
  };

export type AudioTrack = {
    title: string;
    artist: Collaboration[];
    project: string;
    file:  {
        url: string;
    }
}
  
 export type Collaboration = {
    name: string;
    url: string | null;
  };
  


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
    subtitle?: string;
    description?: HTMLElement;
    slug: string;
    date?: string;
    coordinate?: string;
    images?: Media[];
    collaborations: Collaboration[];
    place?: Link[]
    links?: Link[]
    project_categories: ProjectCategory[];
    project_type: ProjectCategory;
    funding: string;
    audioFiles: AudioFile[];

}