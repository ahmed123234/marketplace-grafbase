import { g, auth, config } from '@grafbase/sdk'

const NFT = g.model('Nft', {
  name: g.string().unique(),
  price: g.float(),
  creator: g.string(),
  description: g.string().length({ min: 3 }),
  image: g.url().unique(),
  bids: g.relation(() => Bid).optional().list()
}).auth((rules) => {
  rules.public().read()
  rules.private().create().update().delete();
})

const Bid = g.model('Bid', {
  name: g.string().unique(),
  price: g.float(),
  image: g.url().unique(),
  date: g.date()
})


const User = g.model('User', {
  name: g.string().length({ min: 2, max: 20 }),
  email: g.string().unique(),
  avatarUrl: g.url(),
  description: g.string().optional(),
  githubUrl: g.url().optional(),
  linkedInUrl: g.url().optional(),
  // @ts-ignore
  nfts: g.relation(() => NFT).list().optional(),
}).auth((rules) => {
  rules.public().read();
})

const jwt = auth.JWT({
  secret: "",
  issuer: "",
})

export default config({
  schema: g,
  auth: {
    providers: [jwt],
    rules: (rules) => {
      rules.private()
    }
  }
})

