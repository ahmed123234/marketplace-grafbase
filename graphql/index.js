const { gql } = require('graphql-request')

const NFTCreateQuery = gql`
    mutation createNFT($input: NFTCreateInput!) {
        NFTCreate(input: $input) {
            id
            name
            description
            image
            price
            creator
        }
    }
`

const userCreateQuery = gql`
    mutation createUser($input: userCreateInput!) {
        UserCreate(input: $input) {
            id
            name
            description
            avatarUrl
            email
            githubUrl
            linkedInUrl
        }
    }
`

const bidCreateQuery = gql`
    mutation createBid($input: bidCreateInput!) {
        bidCreate(input: $input) {
            id
            name
            price
            image
            date
        }
    }
`

const getNFTsRelatedBidsQuery = gql`
    
`




