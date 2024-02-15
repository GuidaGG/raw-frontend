import type { PageLoad } from './$types';
import { gql } from 'graphql-request';
import { client } from '$lib/api';
import { flattenJson, hasValue } from '$lib/utils';

const viewsQuery = gql`
     query getViews($slug: String!){
        views(filters: {slug: { eq: $slug }}){
            data{
                id
                attributes{ 
                    title
                    slug
                    dynamic_content {
                        __typename
                        ... on ComponentDynamicJoker {
                            title
                            subtitle
                            content
                            align
                            layout_joker
                            links { 
                              name
                              url
                            }
                            video {
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
                            image {
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
                     	... on ComponentDynamicText {
                            title
                            body
                            align_text

                        }
                        ... on ComponentDynamicProjects {
                            show_all
                            projects {
                              data {
                                id 
                                attributes {
                                  slug
                                }
                              }
                            }
                            layout
                        }

                    }
                }
            }
        }
    }
`

const projectsQuery = gql`
     query getProjects{
        projects{
            data{
                id
                attributes{ 
                    title
                    subtitle
                    description
                    slug
                    year
                    image {
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
                }
            }
        }
    }
`


export const load: import('./$types').PageLoad = (async ({ params }) => {
  try {
    const variables = {
        slug : params.slug
      }
      const dataPage = await client.request(viewsQuery, variables);
      const dataContent = flattenJson(dataPage);
      let projects = []
      if(hasValue(dataContent, "ComponentDynamicProjects")){
         projects =  await client.request(projectsQuery)
      } 
   
    return {
      content: dataContent,
      allProjects:  flattenJson(projects)
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    // return [];
    return {
      data: []
    };
  }
}) satisfies PageLoad;