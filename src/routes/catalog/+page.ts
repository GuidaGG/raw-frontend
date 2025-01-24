import type { PageLoad } from './$types';
import { gql } from 'graphql-request';
import { client } from '$lib/api';
import { flattenJson } from '$lib/utils';


const projectsQuery = gql`
     query getProjects{
        projects (filters: {project_categories: {slug: {eq: "vinyl-record"}}}) {
            data{
                id
                attributes{ 
                    title
                    subtitle
                    slug
                    coordinate
                    date
                    images {
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
                    featured_image {
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
                    reviews {
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