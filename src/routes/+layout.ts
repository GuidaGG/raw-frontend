
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
                }
            }
        }
    }
`

const projectsQuery = gql`
     query getProjects{
        projects(sort: [ "project_type.name:desc", "date" ]) {
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

export const load: import('./$types').PageLoad = (async () => {
    try {
        const dataGeneral = await client.request(contactQuery);
        const dataRadio = await client.request(RadioQuery);
        const projects =  await client.request(projectsQuery)
        return {
            content: flattenJson(dataGeneral),
            radio: flattenJson(dataRadio) ,
            sidebar: flattenJson(projects)
        }
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        data: []
      };
    }
  }) satisfies PageLoad;
