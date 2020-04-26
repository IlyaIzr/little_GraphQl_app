const axios = require('axios');
const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLInt, 
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = require('graphql');

//__Adding new obj type to retrieve data

const LaunchType = new GraphQLObjectType({
  name: 'Launch',
  fields: () => ({
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    launch_year: { type: GraphQLString },
    launch_date_local: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    rocket: { type: RocketType }
  })
});

//____adding new type, nesting inside, to retrieve object inside prev object

const RocketType = new GraphQLObjectType({
  name: 'Rocket',
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString }
  })
});

//__Resolver
//____after we requested data the way we defined by objects

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: ()=> ({
    launches: {
      type: new GraphQLList(LaunchType),
      resolve(parent, args){
        return axios
          .get('https://api.spacexdata.com/v3/launches')
          .then(res => res.data);
      }
    },
    launch: {
      type: LaunchType,
      args: {  //lets us request a field with arg. Define args here
        flight_number: { type: GraphQLInt }
      },
      resolve(parent, args){
        return axios
          .get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
          .then(res => res.data)
      }
    },
    //__Same for rockets types, whole and singular
    
    rockets: {
      type: new GraphQLList(RocketType),
      resolve(parent, args) {
        return axios
          .get('https://api.spacexdata.com/v3/rockets')
          .then(res => res.data);
      }
    },
    rocket: {
      type: RocketType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/rockets/${args.id}`)
          .then(res => res.data);
      }
    }
    
  })
});

module.exports = new GraphQLSchema({
  query: RootQuery
});