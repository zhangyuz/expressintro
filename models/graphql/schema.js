var graphqlTools = require('graphql-tools');
var makeExecutableSchema = graphqlTools.makeExecutableSchema;
var addMockFunctionsToSchema  = graphqlTools.addMockFunctionsToSchema;
var mocks = require('./mocks');

const typeDefs = `
type Query {
  testString: String
}
`;

const schema = makeExecutableSchema({ typeDefs });

addMockFunctionsToSchema({ schema, mocks });

module.exports = schema;
// export default schema;
