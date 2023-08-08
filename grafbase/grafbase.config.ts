import { g, auth, config } from '@grafbase/sdk'

const NFT = g.model('NFT', {
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

const FavoriteItem = g.model("FavoriteItem", {
  NFTs: g.relation(() => NFT).optional().list(),
  createdBy: g.relation(() => User).optional()
})

const Bid = g.model('Bid', {
  name: g.string().unique(),
  price: g.float(),
  image: g.url().unique(),
  date: g.date(),
  relatedNFT: g.relation(() => NFT)
})


const User = g.model('User', {
  name: g.string().length({ min: 2, max: 20 }),
  email: g.string().unique(),
  avatarUrl: g.url(),
  description: g.string().optional(),
  githubUrl: g.url().optional(),
  linkedInUrl: g.url().optional(),
  // @ts-ignore
  bids: g.relation(() => Bid).list().optional(),
  FavoriteGroup: g.relation(() => FavoriteItem).optional()
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

