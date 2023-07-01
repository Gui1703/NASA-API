import { GraphQLScalarType, Kind } from "graphql";
import dayjs from "dayjs";

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value: Date) {
    return dayjs(value).format("DD/MM/YY HH:mm");
  },
  parseValue(value: number) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    }
    return null;
  },
});

export default dateScalar;
