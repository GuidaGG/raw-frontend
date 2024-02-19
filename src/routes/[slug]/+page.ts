
import { gql } from 'graphql-request';
import { client } from '$lib/api';
import { flattenJson} from '$lib/utils';

const pagesQuery = gql`
     query getPages($slug: String!){
        pages(filters: {slug: { eq: $slug }}){
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
export const load: import('./$types').PageLoad = (async ({ params, url }) => {
  try {
    const variables = {
      slug : params.slug
    }
    const page = await client.request(pagesQuery, variables);
    return {
      content : flattenJson(page)
    }
  } catch (error) {
      console.error('Error fetching data:', error);
    return {
      data: []
    };
  }
}) 