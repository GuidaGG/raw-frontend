
import type { PageLoad } from './$types';
import { gql } from 'graphql-request';
import { client } from '$lib/api';
import { flattenJson, hasValue } from '$lib/utils';

const contactQuery = gql`
     query getContact{
        contact{
            data{
                id
                attributes{ 
                    email
                    socialMedia{
                        name
                        url
                    }
                    intro
                }
            }
        }
    }
`

const RadioQuery = gql`
     query getAudios{
        tracks(filters: {radio: {eq: true}}) {
            data{
                id
                attributes{ 
                    authors {
                      name
                      url
                    }
                    title
                    audioFile {
                      data {
                          id 
                          attributes { 
                              url
                              formats
                              alternativeText
                              name
                          }
                      }
                  }
                  audioFile_download {
                      data {
                          id 
                          attributes { 
                              url
                              formats
                              alternativeText
                              name
                          }
                      }
                  }
                  radio
                  project {
                    data{
                      id
                      attributes{ 
                        title
                        slug
                        collaborations {
                          name 
                          url
                        } 
                      }
                    }
                  }
                  review {
                    data{
                      id
                      attributes{ 
                        title
                        slug
                      }
                    }
                  }
                }
            }
        }
    }
`

const projectsQuery = gql`
     query getProjects{
        projects(filters:{list_view: {eq: true}}, sort: [  "date:desc", "project_type.name:desc"], pagination: { limit: -1}) {
            data{
                id
                attributes{ 
                    title
                    subtitle
                    description
                    slug
                    coordinate
                    date
                    funding
                    collaborations {
                      name 
                      url
                    } 
                    place {
                      name
                      url
                    }
                    links {
                      name
                      url
                    }
                    project_categories {
                      data {
                        id
                        attributes {
                          name
                          slug
                        }
                      }
                    }
                    project_type {
                      data {
                        id
                        attributes {
                          name
                          slug
                        }
                      }
                    }
                }
            }
        }
    }
`
const themeQuery = gql`
  query getTheme{
    theme{
      data{
        id
        attributes{ 
         fullColor
         lightColor
         seo {
          metaTitle
          metaDescription
          keywords
          metaImage {
            data {
              id
              attributes {
                url
                formats
                alternativeText
                name
              }
            }
    
          }

         }
        }
      }
    }
  }

`
export const load: import('./$types').PageLoad = (async () => {
    try {
        const dataGeneral = await client.request(contactQuery);
        const dataRadio = await client.request(RadioQuery);
        const projects =  await client.request(projectsQuery);
        const theme = await client.request(themeQuery);
        return {
            content: flattenJson(dataGeneral),
            radio: flattenJson(dataRadio) ,
            sidebar: flattenJson(projects),
            themeOptions: flattenJson(theme)
        }
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        data: []
      };
    }
  }) satisfies PageLoad;
