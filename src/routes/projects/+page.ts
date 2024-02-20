import type { PageLoad } from './$types';
import { gql } from 'graphql-request';
import { client } from '$lib/api';
import { flattenJson } from '$lib/utils';


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
      const projects =  await client.request(projectsQuery)
   
    return {
     content: flattenJson(projects)
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    // return [];
    return {
      content: []
    };
  }
}) satisfies PageLoad;