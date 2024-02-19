
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

export const load: import('./$types').PageLoad = (async () => {
    try {
        const dataGeneral = await client.request(contactQuery );

        return {
            content: flattenJson(dataGeneral)
        }
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        data: []
      };
    }
  }) satisfies PageLoad;
