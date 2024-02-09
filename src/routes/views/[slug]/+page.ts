import type { PageLoad } from './$types';
import { gql } from 'graphql-request';
import { client } from '$lib/api';
import { flattenJson } from '$lib/utils';

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

                        }
                        ... on ComponentDynamicProjects {
                            show_all
                        }
                      	... on ComponentDynamicList {
                            type
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
    // return data;
    return {
      content: flattenJson(dataPage),
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    // return [];
    return {
      data: []
    };
  }
}) satisfies PageLoad;