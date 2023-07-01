const express = require('express')
const expressGraphQL = require('express-graphql').graphqlHTTP
const FormatError = require('easygraphql-format-error')
const Data = require('./data')
const cors = require('cors');

const data = Data.data;
app.use(cors());

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql')
const app = express()

const formatError = new FormatError([
    {
        name: 'ALBUM_NOT_FOUND',
        message: 'ALbum not found',
        statusCode: 404
    },
    {
        name: 'SONG_NOT_FOUND',
        message: 'Song not found',
        statusCode: 404
    }
])
const errorName = formatError.errorName

const AlbumType = new GraphQLObjectType({
    name: 'Album',
    description: 'This represents an album created by an artist',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        album_id: { type: GraphQLNonNull(GraphQLString) }
    })
})

const SongType = new GraphQLObjectType({
    name: 'Song',
    description: 'This represents a song created by an artist',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        song_id: { type: GraphQLNonNull(GraphQLString) },
    })
})

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        album: {
            type: AlbumType,
            description: 'A single album',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: ((parent, args) => {
                const album = data.album_ids.find(album => album.id === args.id);
                if (!album) {
                    throw new Error(errorName.ALBUM_NOT_FOUND);
                } else {
                    return album;
                }
            })
        },
        song: {
            type: SongType,
            description: 'A single song',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: ((parent, args) => {
                const song = data.song_id.find(song => song.id === args.id);
                if (!song) {
                    throw new Error(errorName.SONG_NOT_FOUND);
                } else {
                    return song;
                }
            })
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType,
})

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true,
    formatError: (err) => {
        return formatError.getError(err)
    }
}))

app.listen(5000, () => console.log('Server Running'))
