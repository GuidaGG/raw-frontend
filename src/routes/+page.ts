import type { PageLoad } from './$types';
import { gql } from 'graphql-request';
import { client } from '$lib/api';
import { flattenJson } from '$lib/utils';

const homeQuery = gql`
    query getHomepage{
        views{
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

export const load = (async () => {
  try {
    const dataPage = await client.request(homeQuery);
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