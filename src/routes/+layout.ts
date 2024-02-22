
import type { PageLoad } from './$types';
import { gql } from 'graphql-request';
import { client } from '$lib/api';
import { flattenJson, hasValue } from '$lib/utils';

const contactQuery = gql`
     query getContact{
        contact{
            data{
                id
                attributes{ 
                    email
                    socialMedia{
                        name
                        url
                    }
                }
            }
        }
    }
`

const RadioQuery = gql`
     query getAudios{
        projects(sort: "title") {
            data{
                id
                attributes{ 
                    title
                    slug
                    audioFiles(filters: {radio: {eq: true}}) {
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
                    collaborations {
                            name 
                            url
                        } 
                }
            }
        }
    }
`

export const load: import('./$types').PageLoad = (async () => {
    try {
        const dataGeneral = await client.request(contactQuery);
        const dataRadio = await client.request(RadioQuery);
        return {
            content: flattenJson(dataGeneral),
            radio: flattenJson(dataRadio )
        }
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        data: []
      };
    }
  }) satisfies PageLoad;
