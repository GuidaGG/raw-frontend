import type { PageLoad } from '../$types';
import { gql } from 'graphql-request';
import { client } from '$lib/api';
import { flattenJson } from '$lib/utils';


const projectsQuery = gql`
     query getProjects($slug: String!){
        projects(filters: {slug: { eq: $slug}}, pagination: { limit: 1}) {
            data{
                id
                attributes{ 
                    title
                    subtitle
                    description
                    slug
                    date
                    coordinate
                    funding
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

export const load: import('../$types').PageLoad = (async ({ params }) => {
  try {
    const variables = {
      slug : params.slug
    }
      const project =  await client.request(projectsQuery, variables)
   
    return {
     content: flattenJson(project)
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    // return [];
    return {
      content: []
    };
  }
}) satisfies PageLoad;