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
                        ... on ComponentDynamicContact {
                          title 
                          subtitle
                        }
                        ... on ComponentDynamicAudio {
                           tracks {
                            data{
                              id
                              attributes{ 
                                title
                                authors {
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
                    place {
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