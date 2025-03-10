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
                    endDate
                    coordinate
                    funding
                    list_view
                    images(pagination: {limit: -1}) {
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
                    collaborations(pagination: {limit: -1}) {
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
                    downloads {
                      download_file {
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
                      display_name 
                    }
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

const reviewsQuery = gql`
     query getReviews($id: [ID]!){
        reviews(filters: {id: { in: $id }}){
            data{
                id
                attributes{ 
                    title
                    slug
                
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

    let reviews = []

    const reviewIds = project.projects.data[0].attributes.reviews
    const IDs = [] 

    if(reviewIds.data.length > 0) {
      for (const item of reviewIds.data) {
        console.log(item.id)
          IDs.push(item.id)
        }
     reviews = await client.request(reviewsQuery, {id: IDs});
    }
    return {
     content: flattenJson(project),
     projectReviews: flattenJson(reviews)
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    // return [];
    return {
      content: []
    };
  }
}) satisfies PageLoad;