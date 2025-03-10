import type { PageLoad } from './$types';
import { gql } from 'graphql-request';
import { client } from '$lib/api';
import { flattenJson, hasValue } from '$lib/utils';

const reviewsQuery = gql`
     query getReviews($slug: String!){
        reviews(filters: {slug: { eq: $slug }}){
            data{
                id
                attributes{ 
                    title
                    slug
                    project{
                      data{
                          id
                          attributes{ 
                              title
                              slug
                          }
                     }
                    }
                    dynamic_content {
                        __typename
                        ... on ComponentDynamicJoker {
                            title
                            subtitle
                            content
                            align
                            layout_joker
                            transparent
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
                        ... on ComponentDynamicContact {
                          title 
                          subtitle
                        }

                        ... on ComponentDynamicAudio {
                          align
                          playlist_content
                           tracks {
                            data{
                              id
                              attributes{ 
                                title
                                authors{
                                  name
                                  url
                                }
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
      const dataPage = await client.request(reviewsQuery, variables);
      const dataContent = flattenJson(dataPage);

   
    return {
      content: dataContent,
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    // return [];
    return {
      data: []
    };
  }
}) satisfies PageLoad;