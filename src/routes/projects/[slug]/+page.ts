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
                    audioFiles {
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