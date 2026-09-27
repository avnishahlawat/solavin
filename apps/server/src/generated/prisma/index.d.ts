
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Room
 * 
 */
export type Room = $Result.DefaultSelection<Prisma.$RoomPayload>
/**
 * Model GameRecord
 * 
 */
export type GameRecord = $Result.DefaultSelection<Prisma.$GameRecordPayload>
/**
 * Model GameParticipant
 * 
 */
export type GameParticipant = $Result.DefaultSelection<Prisma.$GameParticipantPayload>
/**
 * Model CustomThemeRecord
 * 
 */
export type CustomThemeRecord = $Result.DefaultSelection<Prisma.$CustomThemeRecordPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Rooms
 * const rooms = await prisma.room.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Rooms
   * const rooms = await prisma.room.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.room`: Exposes CRUD operations for the **Room** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Rooms
    * const rooms = await prisma.room.findMany()
    * ```
    */
  get room(): Prisma.RoomDelegate<ExtArgs>;

  /**
   * `prisma.gameRecord`: Exposes CRUD operations for the **GameRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GameRecords
    * const gameRecords = await prisma.gameRecord.findMany()
    * ```
    */
  get gameRecord(): Prisma.GameRecordDelegate<ExtArgs>;

  /**
   * `prisma.gameParticipant`: Exposes CRUD operations for the **GameParticipant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GameParticipants
    * const gameParticipants = await prisma.gameParticipant.findMany()
    * ```
    */
  get gameParticipant(): Prisma.GameParticipantDelegate<ExtArgs>;

  /**
   * `prisma.customThemeRecord`: Exposes CRUD operations for the **CustomThemeRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CustomThemeRecords
    * const customThemeRecords = await prisma.customThemeRecord.findMany()
    * ```
    */
  get customThemeRecord(): Prisma.CustomThemeRecordDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Room: 'Room',
    GameRecord: 'GameRecord',
    GameParticipant: 'GameParticipant',
    CustomThemeRecord: 'CustomThemeRecord'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "room" | "gameRecord" | "gameParticipant" | "customThemeRecord"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Room: {
        payload: Prisma.$RoomPayload<ExtArgs>
        fields: Prisma.RoomFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          findFirst: {
            args: Prisma.RoomFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          findMany: {
            args: Prisma.RoomFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          create: {
            args: Prisma.RoomCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          createMany: {
            args: Prisma.RoomCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoomCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          delete: {
            args: Prisma.RoomDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          update: {
            args: Prisma.RoomUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          deleteMany: {
            args: Prisma.RoomDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RoomUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          aggregate: {
            args: Prisma.RoomAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoom>
          }
          groupBy: {
            args: Prisma.RoomGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomCountArgs<ExtArgs>
            result: $Utils.Optional<RoomCountAggregateOutputType> | number
          }
        }
      }
      GameRecord: {
        payload: Prisma.$GameRecordPayload<ExtArgs>
        fields: Prisma.GameRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GameRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GameRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameRecordPayload>
          }
          findFirst: {
            args: Prisma.GameRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GameRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameRecordPayload>
          }
          findMany: {
            args: Prisma.GameRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameRecordPayload>[]
          }
          create: {
            args: Prisma.GameRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameRecordPayload>
          }
          createMany: {
            args: Prisma.GameRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GameRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameRecordPayload>[]
          }
          delete: {
            args: Prisma.GameRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameRecordPayload>
          }
          update: {
            args: Prisma.GameRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameRecordPayload>
          }
          deleteMany: {
            args: Prisma.GameRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GameRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GameRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameRecordPayload>
          }
          aggregate: {
            args: Prisma.GameRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGameRecord>
          }
          groupBy: {
            args: Prisma.GameRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<GameRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.GameRecordCountArgs<ExtArgs>
            result: $Utils.Optional<GameRecordCountAggregateOutputType> | number
          }
        }
      }
      GameParticipant: {
        payload: Prisma.$GameParticipantPayload<ExtArgs>
        fields: Prisma.GameParticipantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GameParticipantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameParticipantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GameParticipantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameParticipantPayload>
          }
          findFirst: {
            args: Prisma.GameParticipantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameParticipantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GameParticipantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameParticipantPayload>
          }
          findMany: {
            args: Prisma.GameParticipantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameParticipantPayload>[]
          }
          create: {
            args: Prisma.GameParticipantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameParticipantPayload>
          }
          createMany: {
            args: Prisma.GameParticipantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GameParticipantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameParticipantPayload>[]
          }
          delete: {
            args: Prisma.GameParticipantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameParticipantPayload>
          }
          update: {
            args: Prisma.GameParticipantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameParticipantPayload>
          }
          deleteMany: {
            args: Prisma.GameParticipantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GameParticipantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GameParticipantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameParticipantPayload>
          }
          aggregate: {
            args: Prisma.GameParticipantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGameParticipant>
          }
          groupBy: {
            args: Prisma.GameParticipantGroupByArgs<ExtArgs>
            result: $Utils.Optional<GameParticipantGroupByOutputType>[]
          }
          count: {
            args: Prisma.GameParticipantCountArgs<ExtArgs>
            result: $Utils.Optional<GameParticipantCountAggregateOutputType> | number
          }
        }
      }
      CustomThemeRecord: {
        payload: Prisma.$CustomThemeRecordPayload<ExtArgs>
        fields: Prisma.CustomThemeRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomThemeRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomThemeRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomThemeRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomThemeRecordPayload>
          }
          findFirst: {
            args: Prisma.CustomThemeRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomThemeRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomThemeRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomThemeRecordPayload>
          }
          findMany: {
            args: Prisma.CustomThemeRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomThemeRecordPayload>[]
          }
          create: {
            args: Prisma.CustomThemeRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomThemeRecordPayload>
          }
          createMany: {
            args: Prisma.CustomThemeRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomThemeRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomThemeRecordPayload>[]
          }
          delete: {
            args: Prisma.CustomThemeRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomThemeRecordPayload>
          }
          update: {
            args: Prisma.CustomThemeRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomThemeRecordPayload>
          }
          deleteMany: {
            args: Prisma.CustomThemeRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomThemeRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CustomThemeRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomThemeRecordPayload>
          }
          aggregate: {
            args: Prisma.CustomThemeRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomThemeRecord>
          }
          groupBy: {
            args: Prisma.CustomThemeRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomThemeRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomThemeRecordCountArgs<ExtArgs>
            result: $Utils.Optional<CustomThemeRecordCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type GameRecordCountOutputType
   */

  export type GameRecordCountOutputType = {
    participants: number
  }

  export type GameRecordCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participants?: boolean | GameRecordCountOutputTypeCountParticipantsArgs
  }

  // Custom InputTypes
  /**
   * GameRecordCountOutputType without action
   */
  export type GameRecordCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRecordCountOutputType
     */
    select?: GameRecordCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GameRecordCountOutputType without action
   */
  export type GameRecordCountOutputTypeCountParticipantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameParticipantWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Room
   */

  export type AggregateRoom = {
    _count: RoomCountAggregateOutputType | null
    _min: RoomMinAggregateOutputType | null
    _max: RoomMaxAggregateOutputType | null
  }

  export type RoomMinAggregateOutputType = {
    id: string | null
    code: string | null
    hostId: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoomMaxAggregateOutputType = {
    id: string | null
    code: string | null
    hostId: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoomCountAggregateOutputType = {
    id: number
    code: number
    hostId: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RoomMinAggregateInputType = {
    id?: true
    code?: true
    hostId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoomMaxAggregateInputType = {
    id?: true
    code?: true
    hostId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoomCountAggregateInputType = {
    id?: true
    code?: true
    hostId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RoomAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Room to aggregate.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Rooms
    **/
    _count?: true | RoomCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomMaxAggregateInputType
  }

  export type GetRoomAggregateType<T extends RoomAggregateArgs> = {
        [P in keyof T & keyof AggregateRoom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoom[P]>
      : GetScalarType<T[P], AggregateRoom[P]>
  }




  export type RoomGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomWhereInput
    orderBy?: RoomOrderByWithAggregationInput | RoomOrderByWithAggregationInput[]
    by: RoomScalarFieldEnum[] | RoomScalarFieldEnum
    having?: RoomScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomCountAggregateInputType | true
    _min?: RoomMinAggregateInputType
    _max?: RoomMaxAggregateInputType
  }

  export type RoomGroupByOutputType = {
    id: string
    code: string
    hostId: string
    status: string
    createdAt: Date
    updatedAt: Date
    _count: RoomCountAggregateOutputType | null
    _min: RoomMinAggregateOutputType | null
    _max: RoomMaxAggregateOutputType | null
  }

  type GetRoomGroupByPayload<T extends RoomGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomGroupByOutputType[P]>
            : GetScalarType<T[P], RoomGroupByOutputType[P]>
        }
      >
    >


  export type RoomSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    hostId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["room"]>

  export type RoomSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    hostId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["room"]>

  export type RoomSelectScalar = {
    id?: boolean
    code?: boolean
    hostId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $RoomPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Room"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      hostId: string
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["room"]>
    composites: {}
  }

  type RoomGetPayload<S extends boolean | null | undefined | RoomDefaultArgs> = $Result.GetResult<Prisma.$RoomPayload, S>

  type RoomCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RoomFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RoomCountAggregateInputType | true
    }

  export interface RoomDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Room'], meta: { name: 'Room' } }
    /**
     * Find zero or one Room that matches the filter.
     * @param {RoomFindUniqueArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomFindUniqueArgs>(args: SelectSubset<T, RoomFindUniqueArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Room that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RoomFindUniqueOrThrowArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Room that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindFirstArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomFindFirstArgs>(args?: SelectSubset<T, RoomFindFirstArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Room that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindFirstOrThrowArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Rooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rooms
     * const rooms = await prisma.room.findMany()
     * 
     * // Get first 10 Rooms
     * const rooms = await prisma.room.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomWithIdOnly = await prisma.room.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoomFindManyArgs>(args?: SelectSubset<T, RoomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Room.
     * @param {RoomCreateArgs} args - Arguments to create a Room.
     * @example
     * // Create one Room
     * const Room = await prisma.room.create({
     *   data: {
     *     // ... data to create a Room
     *   }
     * })
     * 
     */
    create<T extends RoomCreateArgs>(args: SelectSubset<T, RoomCreateArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Rooms.
     * @param {RoomCreateManyArgs} args - Arguments to create many Rooms.
     * @example
     * // Create many Rooms
     * const room = await prisma.room.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomCreateManyArgs>(args?: SelectSubset<T, RoomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Rooms and returns the data saved in the database.
     * @param {RoomCreateManyAndReturnArgs} args - Arguments to create many Rooms.
     * @example
     * // Create many Rooms
     * const room = await prisma.room.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Rooms and only return the `id`
     * const roomWithIdOnly = await prisma.room.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoomCreateManyAndReturnArgs>(args?: SelectSubset<T, RoomCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Room.
     * @param {RoomDeleteArgs} args - Arguments to delete one Room.
     * @example
     * // Delete one Room
     * const Room = await prisma.room.delete({
     *   where: {
     *     // ... filter to delete one Room
     *   }
     * })
     * 
     */
    delete<T extends RoomDeleteArgs>(args: SelectSubset<T, RoomDeleteArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Room.
     * @param {RoomUpdateArgs} args - Arguments to update one Room.
     * @example
     * // Update one Room
     * const room = await prisma.room.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomUpdateArgs>(args: SelectSubset<T, RoomUpdateArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Rooms.
     * @param {RoomDeleteManyArgs} args - Arguments to filter Rooms to delete.
     * @example
     * // Delete a few Rooms
     * const { count } = await prisma.room.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomDeleteManyArgs>(args?: SelectSubset<T, RoomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rooms
     * const room = await prisma.room.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomUpdateManyArgs>(args: SelectSubset<T, RoomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Room.
     * @param {RoomUpsertArgs} args - Arguments to update or create a Room.
     * @example
     * // Update or create a Room
     * const room = await prisma.room.upsert({
     *   create: {
     *     // ... data to create a Room
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Room we want to update
     *   }
     * })
     */
    upsert<T extends RoomUpsertArgs>(args: SelectSubset<T, RoomUpsertArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomCountArgs} args - Arguments to filter Rooms to count.
     * @example
     * // Count the number of Rooms
     * const count = await prisma.room.count({
     *   where: {
     *     // ... the filter for the Rooms we want to count
     *   }
     * })
    **/
    count<T extends RoomCountArgs>(
      args?: Subset<T, RoomCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Room.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoomAggregateArgs>(args: Subset<T, RoomAggregateArgs>): Prisma.PrismaPromise<GetRoomAggregateType<T>>

    /**
     * Group by Room.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoomGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomGroupByArgs['orderBy'] }
        : { orderBy?: RoomGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Room model
   */
  readonly fields: RoomFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Room.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Room model
   */ 
  interface RoomFieldRefs {
    readonly id: FieldRef<"Room", 'String'>
    readonly code: FieldRef<"Room", 'String'>
    readonly hostId: FieldRef<"Room", 'String'>
    readonly status: FieldRef<"Room", 'String'>
    readonly createdAt: FieldRef<"Room", 'DateTime'>
    readonly updatedAt: FieldRef<"Room", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Room findUnique
   */
  export type RoomFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room findUniqueOrThrow
   */
  export type RoomFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room findFirst
   */
  export type RoomFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rooms.
     */
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room findFirstOrThrow
   */
  export type RoomFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rooms.
     */
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room findMany
   */
  export type RoomFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Filter, which Rooms to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room create
   */
  export type RoomCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * The data needed to create a Room.
     */
    data: XOR<RoomCreateInput, RoomUncheckedCreateInput>
  }

  /**
   * Room createMany
   */
  export type RoomCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Rooms.
     */
    data: RoomCreateManyInput | RoomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Room createManyAndReturn
   */
  export type RoomCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Rooms.
     */
    data: RoomCreateManyInput | RoomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Room update
   */
  export type RoomUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * The data needed to update a Room.
     */
    data: XOR<RoomUpdateInput, RoomUncheckedUpdateInput>
    /**
     * Choose, which Room to update.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room updateMany
   */
  export type RoomUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Rooms.
     */
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyInput>
    /**
     * Filter which Rooms to update
     */
    where?: RoomWhereInput
  }

  /**
   * Room upsert
   */
  export type RoomUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * The filter to search for the Room to update in case it exists.
     */
    where: RoomWhereUniqueInput
    /**
     * In case the Room found by the `where` argument doesn't exist, create a new Room with this data.
     */
    create: XOR<RoomCreateInput, RoomUncheckedCreateInput>
    /**
     * In case the Room was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomUpdateInput, RoomUncheckedUpdateInput>
  }

  /**
   * Room delete
   */
  export type RoomDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Filter which Room to delete.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room deleteMany
   */
  export type RoomDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rooms to delete
     */
    where?: RoomWhereInput
  }

  /**
   * Room without action
   */
  export type RoomDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
  }


  /**
   * Model GameRecord
   */

  export type AggregateGameRecord = {
    _count: GameRecordCountAggregateOutputType | null
    _avg: GameRecordAvgAggregateOutputType | null
    _sum: GameRecordSumAggregateOutputType | null
    _min: GameRecordMinAggregateOutputType | null
    _max: GameRecordMaxAggregateOutputType | null
  }

  export type GameRecordAvgAggregateOutputType = {
    totalRounds: number | null
  }

  export type GameRecordSumAggregateOutputType = {
    totalRounds: number | null
  }

  export type GameRecordMinAggregateOutputType = {
    id: string | null
    roomCode: string | null
    themeId: string | null
    themeName: string | null
    totalRounds: number | null
    createdAt: Date | null
    finishedAt: Date | null
  }

  export type GameRecordMaxAggregateOutputType = {
    id: string | null
    roomCode: string | null
    themeId: string | null
    themeName: string | null
    totalRounds: number | null
    createdAt: Date | null
    finishedAt: Date | null
  }

  export type GameRecordCountAggregateOutputType = {
    id: number
    roomCode: number
    themeId: number
    themeName: number
    totalRounds: number
    createdAt: number
    finishedAt: number
    _all: number
  }


  export type GameRecordAvgAggregateInputType = {
    totalRounds?: true
  }

  export type GameRecordSumAggregateInputType = {
    totalRounds?: true
  }

  export type GameRecordMinAggregateInputType = {
    id?: true
    roomCode?: true
    themeId?: true
    themeName?: true
    totalRounds?: true
    createdAt?: true
    finishedAt?: true
  }

  export type GameRecordMaxAggregateInputType = {
    id?: true
    roomCode?: true
    themeId?: true
    themeName?: true
    totalRounds?: true
    createdAt?: true
    finishedAt?: true
  }

  export type GameRecordCountAggregateInputType = {
    id?: true
    roomCode?: true
    themeId?: true
    themeName?: true
    totalRounds?: true
    createdAt?: true
    finishedAt?: true
    _all?: true
  }

  export type GameRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameRecord to aggregate.
     */
    where?: GameRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameRecords to fetch.
     */
    orderBy?: GameRecordOrderByWithRelationInput | GameRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GameRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GameRecords
    **/
    _count?: true | GameRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GameRecordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GameRecordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GameRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GameRecordMaxAggregateInputType
  }

  export type GetGameRecordAggregateType<T extends GameRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateGameRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGameRecord[P]>
      : GetScalarType<T[P], AggregateGameRecord[P]>
  }




  export type GameRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameRecordWhereInput
    orderBy?: GameRecordOrderByWithAggregationInput | GameRecordOrderByWithAggregationInput[]
    by: GameRecordScalarFieldEnum[] | GameRecordScalarFieldEnum
    having?: GameRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GameRecordCountAggregateInputType | true
    _avg?: GameRecordAvgAggregateInputType
    _sum?: GameRecordSumAggregateInputType
    _min?: GameRecordMinAggregateInputType
    _max?: GameRecordMaxAggregateInputType
  }

  export type GameRecordGroupByOutputType = {
    id: string
    roomCode: string
    themeId: string
    themeName: string
    totalRounds: number
    createdAt: Date
    finishedAt: Date
    _count: GameRecordCountAggregateOutputType | null
    _avg: GameRecordAvgAggregateOutputType | null
    _sum: GameRecordSumAggregateOutputType | null
    _min: GameRecordMinAggregateOutputType | null
    _max: GameRecordMaxAggregateOutputType | null
  }

  type GetGameRecordGroupByPayload<T extends GameRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GameRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GameRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GameRecordGroupByOutputType[P]>
            : GetScalarType<T[P], GameRecordGroupByOutputType[P]>
        }
      >
    >


  export type GameRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomCode?: boolean
    themeId?: boolean
    themeName?: boolean
    totalRounds?: boolean
    createdAt?: boolean
    finishedAt?: boolean
    participants?: boolean | GameRecord$participantsArgs<ExtArgs>
    _count?: boolean | GameRecordCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameRecord"]>

  export type GameRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomCode?: boolean
    themeId?: boolean
    themeName?: boolean
    totalRounds?: boolean
    createdAt?: boolean
    finishedAt?: boolean
  }, ExtArgs["result"]["gameRecord"]>

  export type GameRecordSelectScalar = {
    id?: boolean
    roomCode?: boolean
    themeId?: boolean
    themeName?: boolean
    totalRounds?: boolean
    createdAt?: boolean
    finishedAt?: boolean
  }

  export type GameRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participants?: boolean | GameRecord$participantsArgs<ExtArgs>
    _count?: boolean | GameRecordCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GameRecordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $GameRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GameRecord"
    objects: {
      participants: Prisma.$GameParticipantPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      roomCode: string
      themeId: string
      themeName: string
      totalRounds: number
      createdAt: Date
      finishedAt: Date
    }, ExtArgs["result"]["gameRecord"]>
    composites: {}
  }

  type GameRecordGetPayload<S extends boolean | null | undefined | GameRecordDefaultArgs> = $Result.GetResult<Prisma.$GameRecordPayload, S>

  type GameRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GameRecordFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GameRecordCountAggregateInputType | true
    }

  export interface GameRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GameRecord'], meta: { name: 'GameRecord' } }
    /**
     * Find zero or one GameRecord that matches the filter.
     * @param {GameRecordFindUniqueArgs} args - Arguments to find a GameRecord
     * @example
     * // Get one GameRecord
     * const gameRecord = await prisma.gameRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GameRecordFindUniqueArgs>(args: SelectSubset<T, GameRecordFindUniqueArgs<ExtArgs>>): Prisma__GameRecordClient<$Result.GetResult<Prisma.$GameRecordPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one GameRecord that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {GameRecordFindUniqueOrThrowArgs} args - Arguments to find a GameRecord
     * @example
     * // Get one GameRecord
     * const gameRecord = await prisma.gameRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GameRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, GameRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GameRecordClient<$Result.GetResult<Prisma.$GameRecordPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first GameRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameRecordFindFirstArgs} args - Arguments to find a GameRecord
     * @example
     * // Get one GameRecord
     * const gameRecord = await prisma.gameRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GameRecordFindFirstArgs>(args?: SelectSubset<T, GameRecordFindFirstArgs<ExtArgs>>): Prisma__GameRecordClient<$Result.GetResult<Prisma.$GameRecordPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first GameRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameRecordFindFirstOrThrowArgs} args - Arguments to find a GameRecord
     * @example
     * // Get one GameRecord
     * const gameRecord = await prisma.gameRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GameRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, GameRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__GameRecordClient<$Result.GetResult<Prisma.$GameRecordPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more GameRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GameRecords
     * const gameRecords = await prisma.gameRecord.findMany()
     * 
     * // Get first 10 GameRecords
     * const gameRecords = await prisma.gameRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gameRecordWithIdOnly = await prisma.gameRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GameRecordFindManyArgs>(args?: SelectSubset<T, GameRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameRecordPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a GameRecord.
     * @param {GameRecordCreateArgs} args - Arguments to create a GameRecord.
     * @example
     * // Create one GameRecord
     * const GameRecord = await prisma.gameRecord.create({
     *   data: {
     *     // ... data to create a GameRecord
     *   }
     * })
     * 
     */
    create<T extends GameRecordCreateArgs>(args: SelectSubset<T, GameRecordCreateArgs<ExtArgs>>): Prisma__GameRecordClient<$Result.GetResult<Prisma.$GameRecordPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many GameRecords.
     * @param {GameRecordCreateManyArgs} args - Arguments to create many GameRecords.
     * @example
     * // Create many GameRecords
     * const gameRecord = await prisma.gameRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GameRecordCreateManyArgs>(args?: SelectSubset<T, GameRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GameRecords and returns the data saved in the database.
     * @param {GameRecordCreateManyAndReturnArgs} args - Arguments to create many GameRecords.
     * @example
     * // Create many GameRecords
     * const gameRecord = await prisma.gameRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GameRecords and only return the `id`
     * const gameRecordWithIdOnly = await prisma.gameRecord.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GameRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, GameRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameRecordPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a GameRecord.
     * @param {GameRecordDeleteArgs} args - Arguments to delete one GameRecord.
     * @example
     * // Delete one GameRecord
     * const GameRecord = await prisma.gameRecord.delete({
     *   where: {
     *     // ... filter to delete one GameRecord
     *   }
     * })
     * 
     */
    delete<T extends GameRecordDeleteArgs>(args: SelectSubset<T, GameRecordDeleteArgs<ExtArgs>>): Prisma__GameRecordClient<$Result.GetResult<Prisma.$GameRecordPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one GameRecord.
     * @param {GameRecordUpdateArgs} args - Arguments to update one GameRecord.
     * @example
     * // Update one GameRecord
     * const gameRecord = await prisma.gameRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GameRecordUpdateArgs>(args: SelectSubset<T, GameRecordUpdateArgs<ExtArgs>>): Prisma__GameRecordClient<$Result.GetResult<Prisma.$GameRecordPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more GameRecords.
     * @param {GameRecordDeleteManyArgs} args - Arguments to filter GameRecords to delete.
     * @example
     * // Delete a few GameRecords
     * const { count } = await prisma.gameRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GameRecordDeleteManyArgs>(args?: SelectSubset<T, GameRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GameRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GameRecords
     * const gameRecord = await prisma.gameRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GameRecordUpdateManyArgs>(args: SelectSubset<T, GameRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GameRecord.
     * @param {GameRecordUpsertArgs} args - Arguments to update or create a GameRecord.
     * @example
     * // Update or create a GameRecord
     * const gameRecord = await prisma.gameRecord.upsert({
     *   create: {
     *     // ... data to create a GameRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GameRecord we want to update
     *   }
     * })
     */
    upsert<T extends GameRecordUpsertArgs>(args: SelectSubset<T, GameRecordUpsertArgs<ExtArgs>>): Prisma__GameRecordClient<$Result.GetResult<Prisma.$GameRecordPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of GameRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameRecordCountArgs} args - Arguments to filter GameRecords to count.
     * @example
     * // Count the number of GameRecords
     * const count = await prisma.gameRecord.count({
     *   where: {
     *     // ... the filter for the GameRecords we want to count
     *   }
     * })
    **/
    count<T extends GameRecordCountArgs>(
      args?: Subset<T, GameRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GameRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GameRecordAggregateArgs>(args: Subset<T, GameRecordAggregateArgs>): Prisma.PrismaPromise<GetGameRecordAggregateType<T>>

    /**
     * Group by GameRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GameRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameRecordGroupByArgs['orderBy'] }
        : { orderBy?: GameRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GameRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGameRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GameRecord model
   */
  readonly fields: GameRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GameRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GameRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    participants<T extends GameRecord$participantsArgs<ExtArgs> = {}>(args?: Subset<T, GameRecord$participantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameParticipantPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GameRecord model
   */ 
  interface GameRecordFieldRefs {
    readonly id: FieldRef<"GameRecord", 'String'>
    readonly roomCode: FieldRef<"GameRecord", 'String'>
    readonly themeId: FieldRef<"GameRecord", 'String'>
    readonly themeName: FieldRef<"GameRecord", 'String'>
    readonly totalRounds: FieldRef<"GameRecord", 'Int'>
    readonly createdAt: FieldRef<"GameRecord", 'DateTime'>
    readonly finishedAt: FieldRef<"GameRecord", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GameRecord findUnique
   */
  export type GameRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRecord
     */
    select?: GameRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameRecordInclude<ExtArgs> | null
    /**
     * Filter, which GameRecord to fetch.
     */
    where: GameRecordWhereUniqueInput
  }

  /**
   * GameRecord findUniqueOrThrow
   */
  export type GameRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRecord
     */
    select?: GameRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameRecordInclude<ExtArgs> | null
    /**
     * Filter, which GameRecord to fetch.
     */
    where: GameRecordWhereUniqueInput
  }

  /**
   * GameRecord findFirst
   */
  export type GameRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRecord
     */
    select?: GameRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameRecordInclude<ExtArgs> | null
    /**
     * Filter, which GameRecord to fetch.
     */
    where?: GameRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameRecords to fetch.
     */
    orderBy?: GameRecordOrderByWithRelationInput | GameRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameRecords.
     */
    cursor?: GameRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameRecords.
     */
    distinct?: GameRecordScalarFieldEnum | GameRecordScalarFieldEnum[]
  }

  /**
   * GameRecord findFirstOrThrow
   */
  export type GameRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRecord
     */
    select?: GameRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameRecordInclude<ExtArgs> | null
    /**
     * Filter, which GameRecord to fetch.
     */
    where?: GameRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameRecords to fetch.
     */
    orderBy?: GameRecordOrderByWithRelationInput | GameRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameRecords.
     */
    cursor?: GameRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameRecords.
     */
    distinct?: GameRecordScalarFieldEnum | GameRecordScalarFieldEnum[]
  }

  /**
   * GameRecord findMany
   */
  export type GameRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRecord
     */
    select?: GameRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameRecordInclude<ExtArgs> | null
    /**
     * Filter, which GameRecords to fetch.
     */
    where?: GameRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameRecords to fetch.
     */
    orderBy?: GameRecordOrderByWithRelationInput | GameRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GameRecords.
     */
    cursor?: GameRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameRecords.
     */
    skip?: number
    distinct?: GameRecordScalarFieldEnum | GameRecordScalarFieldEnum[]
  }

  /**
   * GameRecord create
   */
  export type GameRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRecord
     */
    select?: GameRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a GameRecord.
     */
    data: XOR<GameRecordCreateInput, GameRecordUncheckedCreateInput>
  }

  /**
   * GameRecord createMany
   */
  export type GameRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GameRecords.
     */
    data: GameRecordCreateManyInput | GameRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GameRecord createManyAndReturn
   */
  export type GameRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRecord
     */
    select?: GameRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many GameRecords.
     */
    data: GameRecordCreateManyInput | GameRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GameRecord update
   */
  export type GameRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRecord
     */
    select?: GameRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a GameRecord.
     */
    data: XOR<GameRecordUpdateInput, GameRecordUncheckedUpdateInput>
    /**
     * Choose, which GameRecord to update.
     */
    where: GameRecordWhereUniqueInput
  }

  /**
   * GameRecord updateMany
   */
  export type GameRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GameRecords.
     */
    data: XOR<GameRecordUpdateManyMutationInput, GameRecordUncheckedUpdateManyInput>
    /**
     * Filter which GameRecords to update
     */
    where?: GameRecordWhereInput
  }

  /**
   * GameRecord upsert
   */
  export type GameRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRecord
     */
    select?: GameRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the GameRecord to update in case it exists.
     */
    where: GameRecordWhereUniqueInput
    /**
     * In case the GameRecord found by the `where` argument doesn't exist, create a new GameRecord with this data.
     */
    create: XOR<GameRecordCreateInput, GameRecordUncheckedCreateInput>
    /**
     * In case the GameRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameRecordUpdateInput, GameRecordUncheckedUpdateInput>
  }

  /**
   * GameRecord delete
   */
  export type GameRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRecord
     */
    select?: GameRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameRecordInclude<ExtArgs> | null
    /**
     * Filter which GameRecord to delete.
     */
    where: GameRecordWhereUniqueInput
  }

  /**
   * GameRecord deleteMany
   */
  export type GameRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameRecords to delete
     */
    where?: GameRecordWhereInput
  }

  /**
   * GameRecord.participants
   */
  export type GameRecord$participantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameParticipant
     */
    select?: GameParticipantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameParticipantInclude<ExtArgs> | null
    where?: GameParticipantWhereInput
    orderBy?: GameParticipantOrderByWithRelationInput | GameParticipantOrderByWithRelationInput[]
    cursor?: GameParticipantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GameParticipantScalarFieldEnum | GameParticipantScalarFieldEnum[]
  }

  /**
   * GameRecord without action
   */
  export type GameRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRecord
     */
    select?: GameRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameRecordInclude<ExtArgs> | null
  }


  /**
   * Model GameParticipant
   */

  export type AggregateGameParticipant = {
    _count: GameParticipantCountAggregateOutputType | null
    _avg: GameParticipantAvgAggregateOutputType | null
    _sum: GameParticipantSumAggregateOutputType | null
    _min: GameParticipantMinAggregateOutputType | null
    _max: GameParticipantMaxAggregateOutputType | null
  }

  export type GameParticipantAvgAggregateOutputType = {
    finalRank: number | null
  }

  export type GameParticipantSumAggregateOutputType = {
    finalRank: number | null
  }

  export type GameParticipantMinAggregateOutputType = {
    id: string | null
    gameId: string | null
    playerId: string | null
    playerName: string | null
    finalRank: number | null
    completedItem: string | null
  }

  export type GameParticipantMaxAggregateOutputType = {
    id: string | null
    gameId: string | null
    playerId: string | null
    playerName: string | null
    finalRank: number | null
    completedItem: string | null
  }

  export type GameParticipantCountAggregateOutputType = {
    id: number
    gameId: number
    playerId: number
    playerName: number
    finalRank: number
    completedItem: number
    _all: number
  }


  export type GameParticipantAvgAggregateInputType = {
    finalRank?: true
  }

  export type GameParticipantSumAggregateInputType = {
    finalRank?: true
  }

  export type GameParticipantMinAggregateInputType = {
    id?: true
    gameId?: true
    playerId?: true
    playerName?: true
    finalRank?: true
    completedItem?: true
  }

  export type GameParticipantMaxAggregateInputType = {
    id?: true
    gameId?: true
    playerId?: true
    playerName?: true
    finalRank?: true
    completedItem?: true
  }

  export type GameParticipantCountAggregateInputType = {
    id?: true
    gameId?: true
    playerId?: true
    playerName?: true
    finalRank?: true
    completedItem?: true
    _all?: true
  }

  export type GameParticipantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameParticipant to aggregate.
     */
    where?: GameParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameParticipants to fetch.
     */
    orderBy?: GameParticipantOrderByWithRelationInput | GameParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GameParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameParticipants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GameParticipants
    **/
    _count?: true | GameParticipantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GameParticipantAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GameParticipantSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GameParticipantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GameParticipantMaxAggregateInputType
  }

  export type GetGameParticipantAggregateType<T extends GameParticipantAggregateArgs> = {
        [P in keyof T & keyof AggregateGameParticipant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGameParticipant[P]>
      : GetScalarType<T[P], AggregateGameParticipant[P]>
  }




  export type GameParticipantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameParticipantWhereInput
    orderBy?: GameParticipantOrderByWithAggregationInput | GameParticipantOrderByWithAggregationInput[]
    by: GameParticipantScalarFieldEnum[] | GameParticipantScalarFieldEnum
    having?: GameParticipantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GameParticipantCountAggregateInputType | true
    _avg?: GameParticipantAvgAggregateInputType
    _sum?: GameParticipantSumAggregateInputType
    _min?: GameParticipantMinAggregateInputType
    _max?: GameParticipantMaxAggregateInputType
  }

  export type GameParticipantGroupByOutputType = {
    id: string
    gameId: string
    playerId: string
    playerName: string
    finalRank: number
    completedItem: string | null
    _count: GameParticipantCountAggregateOutputType | null
    _avg: GameParticipantAvgAggregateOutputType | null
    _sum: GameParticipantSumAggregateOutputType | null
    _min: GameParticipantMinAggregateOutputType | null
    _max: GameParticipantMaxAggregateOutputType | null
  }

  type GetGameParticipantGroupByPayload<T extends GameParticipantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GameParticipantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GameParticipantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GameParticipantGroupByOutputType[P]>
            : GetScalarType<T[P], GameParticipantGroupByOutputType[P]>
        }
      >
    >


  export type GameParticipantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    playerId?: boolean
    playerName?: boolean
    finalRank?: boolean
    completedItem?: boolean
    game?: boolean | GameRecordDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameParticipant"]>

  export type GameParticipantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    playerId?: boolean
    playerName?: boolean
    finalRank?: boolean
    completedItem?: boolean
    game?: boolean | GameRecordDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameParticipant"]>

  export type GameParticipantSelectScalar = {
    id?: boolean
    gameId?: boolean
    playerId?: boolean
    playerName?: boolean
    finalRank?: boolean
    completedItem?: boolean
  }

  export type GameParticipantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameRecordDefaultArgs<ExtArgs>
  }
  export type GameParticipantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameRecordDefaultArgs<ExtArgs>
  }

  export type $GameParticipantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GameParticipant"
    objects: {
      game: Prisma.$GameRecordPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      gameId: string
      playerId: string
      playerName: string
      finalRank: number
      completedItem: string | null
    }, ExtArgs["result"]["gameParticipant"]>
    composites: {}
  }

  type GameParticipantGetPayload<S extends boolean | null | undefined | GameParticipantDefaultArgs> = $Result.GetResult<Prisma.$GameParticipantPayload, S>

  type GameParticipantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GameParticipantFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GameParticipantCountAggregateInputType | true
    }

  export interface GameParticipantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GameParticipant'], meta: { name: 'GameParticipant' } }
    /**
     * Find zero or one GameParticipant that matches the filter.
     * @param {GameParticipantFindUniqueArgs} args - Arguments to find a GameParticipant
     * @example
     * // Get one GameParticipant
     * const gameParticipant = await prisma.gameParticipant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GameParticipantFindUniqueArgs>(args: SelectSubset<T, GameParticipantFindUniqueArgs<ExtArgs>>): Prisma__GameParticipantClient<$Result.GetResult<Prisma.$GameParticipantPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one GameParticipant that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {GameParticipantFindUniqueOrThrowArgs} args - Arguments to find a GameParticipant
     * @example
     * // Get one GameParticipant
     * const gameParticipant = await prisma.gameParticipant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GameParticipantFindUniqueOrThrowArgs>(args: SelectSubset<T, GameParticipantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GameParticipantClient<$Result.GetResult<Prisma.$GameParticipantPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first GameParticipant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameParticipantFindFirstArgs} args - Arguments to find a GameParticipant
     * @example
     * // Get one GameParticipant
     * const gameParticipant = await prisma.gameParticipant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GameParticipantFindFirstArgs>(args?: SelectSubset<T, GameParticipantFindFirstArgs<ExtArgs>>): Prisma__GameParticipantClient<$Result.GetResult<Prisma.$GameParticipantPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first GameParticipant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameParticipantFindFirstOrThrowArgs} args - Arguments to find a GameParticipant
     * @example
     * // Get one GameParticipant
     * const gameParticipant = await prisma.gameParticipant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GameParticipantFindFirstOrThrowArgs>(args?: SelectSubset<T, GameParticipantFindFirstOrThrowArgs<ExtArgs>>): Prisma__GameParticipantClient<$Result.GetResult<Prisma.$GameParticipantPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more GameParticipants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameParticipantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GameParticipants
     * const gameParticipants = await prisma.gameParticipant.findMany()
     * 
     * // Get first 10 GameParticipants
     * const gameParticipants = await prisma.gameParticipant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gameParticipantWithIdOnly = await prisma.gameParticipant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GameParticipantFindManyArgs>(args?: SelectSubset<T, GameParticipantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameParticipantPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a GameParticipant.
     * @param {GameParticipantCreateArgs} args - Arguments to create a GameParticipant.
     * @example
     * // Create one GameParticipant
     * const GameParticipant = await prisma.gameParticipant.create({
     *   data: {
     *     // ... data to create a GameParticipant
     *   }
     * })
     * 
     */
    create<T extends GameParticipantCreateArgs>(args: SelectSubset<T, GameParticipantCreateArgs<ExtArgs>>): Prisma__GameParticipantClient<$Result.GetResult<Prisma.$GameParticipantPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many GameParticipants.
     * @param {GameParticipantCreateManyArgs} args - Arguments to create many GameParticipants.
     * @example
     * // Create many GameParticipants
     * const gameParticipant = await prisma.gameParticipant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GameParticipantCreateManyArgs>(args?: SelectSubset<T, GameParticipantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GameParticipants and returns the data saved in the database.
     * @param {GameParticipantCreateManyAndReturnArgs} args - Arguments to create many GameParticipants.
     * @example
     * // Create many GameParticipants
     * const gameParticipant = await prisma.gameParticipant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GameParticipants and only return the `id`
     * const gameParticipantWithIdOnly = await prisma.gameParticipant.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GameParticipantCreateManyAndReturnArgs>(args?: SelectSubset<T, GameParticipantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameParticipantPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a GameParticipant.
     * @param {GameParticipantDeleteArgs} args - Arguments to delete one GameParticipant.
     * @example
     * // Delete one GameParticipant
     * const GameParticipant = await prisma.gameParticipant.delete({
     *   where: {
     *     // ... filter to delete one GameParticipant
     *   }
     * })
     * 
     */
    delete<T extends GameParticipantDeleteArgs>(args: SelectSubset<T, GameParticipantDeleteArgs<ExtArgs>>): Prisma__GameParticipantClient<$Result.GetResult<Prisma.$GameParticipantPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one GameParticipant.
     * @param {GameParticipantUpdateArgs} args - Arguments to update one GameParticipant.
     * @example
     * // Update one GameParticipant
     * const gameParticipant = await prisma.gameParticipant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GameParticipantUpdateArgs>(args: SelectSubset<T, GameParticipantUpdateArgs<ExtArgs>>): Prisma__GameParticipantClient<$Result.GetResult<Prisma.$GameParticipantPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more GameParticipants.
     * @param {GameParticipantDeleteManyArgs} args - Arguments to filter GameParticipants to delete.
     * @example
     * // Delete a few GameParticipants
     * const { count } = await prisma.gameParticipant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GameParticipantDeleteManyArgs>(args?: SelectSubset<T, GameParticipantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GameParticipants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameParticipantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GameParticipants
     * const gameParticipant = await prisma.gameParticipant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GameParticipantUpdateManyArgs>(args: SelectSubset<T, GameParticipantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GameParticipant.
     * @param {GameParticipantUpsertArgs} args - Arguments to update or create a GameParticipant.
     * @example
     * // Update or create a GameParticipant
     * const gameParticipant = await prisma.gameParticipant.upsert({
     *   create: {
     *     // ... data to create a GameParticipant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GameParticipant we want to update
     *   }
     * })
     */
    upsert<T extends GameParticipantUpsertArgs>(args: SelectSubset<T, GameParticipantUpsertArgs<ExtArgs>>): Prisma__GameParticipantClient<$Result.GetResult<Prisma.$GameParticipantPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of GameParticipants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameParticipantCountArgs} args - Arguments to filter GameParticipants to count.
     * @example
     * // Count the number of GameParticipants
     * const count = await prisma.gameParticipant.count({
     *   where: {
     *     // ... the filter for the GameParticipants we want to count
     *   }
     * })
    **/
    count<T extends GameParticipantCountArgs>(
      args?: Subset<T, GameParticipantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameParticipantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GameParticipant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameParticipantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GameParticipantAggregateArgs>(args: Subset<T, GameParticipantAggregateArgs>): Prisma.PrismaPromise<GetGameParticipantAggregateType<T>>

    /**
     * Group by GameParticipant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameParticipantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GameParticipantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameParticipantGroupByArgs['orderBy'] }
        : { orderBy?: GameParticipantGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GameParticipantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGameParticipantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GameParticipant model
   */
  readonly fields: GameParticipantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GameParticipant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GameParticipantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    game<T extends GameRecordDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GameRecordDefaultArgs<ExtArgs>>): Prisma__GameRecordClient<$Result.GetResult<Prisma.$GameRecordPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GameParticipant model
   */ 
  interface GameParticipantFieldRefs {
    readonly id: FieldRef<"GameParticipant", 'String'>
    readonly gameId: FieldRef<"GameParticipant", 'String'>
    readonly playerId: FieldRef<"GameParticipant", 'String'>
    readonly playerName: FieldRef<"GameParticipant", 'String'>
    readonly finalRank: FieldRef<"GameParticipant", 'Int'>
    readonly completedItem: FieldRef<"GameParticipant", 'String'>
  }
    

  // Custom InputTypes
  /**
   * GameParticipant findUnique
   */
  export type GameParticipantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameParticipant
     */
    select?: GameParticipantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameParticipantInclude<ExtArgs> | null
    /**
     * Filter, which GameParticipant to fetch.
     */
    where: GameParticipantWhereUniqueInput
  }

  /**
   * GameParticipant findUniqueOrThrow
   */
  export type GameParticipantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameParticipant
     */
    select?: GameParticipantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameParticipantInclude<ExtArgs> | null
    /**
     * Filter, which GameParticipant to fetch.
     */
    where: GameParticipantWhereUniqueInput
  }

  /**
   * GameParticipant findFirst
   */
  export type GameParticipantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameParticipant
     */
    select?: GameParticipantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameParticipantInclude<ExtArgs> | null
    /**
     * Filter, which GameParticipant to fetch.
     */
    where?: GameParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameParticipants to fetch.
     */
    orderBy?: GameParticipantOrderByWithRelationInput | GameParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameParticipants.
     */
    cursor?: GameParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameParticipants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameParticipants.
     */
    distinct?: GameParticipantScalarFieldEnum | GameParticipantScalarFieldEnum[]
  }

  /**
   * GameParticipant findFirstOrThrow
   */
  export type GameParticipantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameParticipant
     */
    select?: GameParticipantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameParticipantInclude<ExtArgs> | null
    /**
     * Filter, which GameParticipant to fetch.
     */
    where?: GameParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameParticipants to fetch.
     */
    orderBy?: GameParticipantOrderByWithRelationInput | GameParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameParticipants.
     */
    cursor?: GameParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameParticipants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameParticipants.
     */
    distinct?: GameParticipantScalarFieldEnum | GameParticipantScalarFieldEnum[]
  }

  /**
   * GameParticipant findMany
   */
  export type GameParticipantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameParticipant
     */
    select?: GameParticipantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameParticipantInclude<ExtArgs> | null
    /**
     * Filter, which GameParticipants to fetch.
     */
    where?: GameParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameParticipants to fetch.
     */
    orderBy?: GameParticipantOrderByWithRelationInput | GameParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GameParticipants.
     */
    cursor?: GameParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameParticipants.
     */
    skip?: number
    distinct?: GameParticipantScalarFieldEnum | GameParticipantScalarFieldEnum[]
  }

  /**
   * GameParticipant create
   */
  export type GameParticipantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameParticipant
     */
    select?: GameParticipantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameParticipantInclude<ExtArgs> | null
    /**
     * The data needed to create a GameParticipant.
     */
    data: XOR<GameParticipantCreateInput, GameParticipantUncheckedCreateInput>
  }

  /**
   * GameParticipant createMany
   */
  export type GameParticipantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GameParticipants.
     */
    data: GameParticipantCreateManyInput | GameParticipantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GameParticipant createManyAndReturn
   */
  export type GameParticipantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameParticipant
     */
    select?: GameParticipantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many GameParticipants.
     */
    data: GameParticipantCreateManyInput | GameParticipantCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameParticipantIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GameParticipant update
   */
  export type GameParticipantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameParticipant
     */
    select?: GameParticipantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameParticipantInclude<ExtArgs> | null
    /**
     * The data needed to update a GameParticipant.
     */
    data: XOR<GameParticipantUpdateInput, GameParticipantUncheckedUpdateInput>
    /**
     * Choose, which GameParticipant to update.
     */
    where: GameParticipantWhereUniqueInput
  }

  /**
   * GameParticipant updateMany
   */
  export type GameParticipantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GameParticipants.
     */
    data: XOR<GameParticipantUpdateManyMutationInput, GameParticipantUncheckedUpdateManyInput>
    /**
     * Filter which GameParticipants to update
     */
    where?: GameParticipantWhereInput
  }

  /**
   * GameParticipant upsert
   */
  export type GameParticipantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameParticipant
     */
    select?: GameParticipantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameParticipantInclude<ExtArgs> | null
    /**
     * The filter to search for the GameParticipant to update in case it exists.
     */
    where: GameParticipantWhereUniqueInput
    /**
     * In case the GameParticipant found by the `where` argument doesn't exist, create a new GameParticipant with this data.
     */
    create: XOR<GameParticipantCreateInput, GameParticipantUncheckedCreateInput>
    /**
     * In case the GameParticipant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameParticipantUpdateInput, GameParticipantUncheckedUpdateInput>
  }

  /**
   * GameParticipant delete
   */
  export type GameParticipantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameParticipant
     */
    select?: GameParticipantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameParticipantInclude<ExtArgs> | null
    /**
     * Filter which GameParticipant to delete.
     */
    where: GameParticipantWhereUniqueInput
  }

  /**
   * GameParticipant deleteMany
   */
  export type GameParticipantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameParticipants to delete
     */
    where?: GameParticipantWhereInput
  }

  /**
   * GameParticipant without action
   */
  export type GameParticipantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameParticipant
     */
    select?: GameParticipantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameParticipantInclude<ExtArgs> | null
  }


  /**
   * Model CustomThemeRecord
   */

  export type AggregateCustomThemeRecord = {
    _count: CustomThemeRecordCountAggregateOutputType | null
    _min: CustomThemeRecordMinAggregateOutputType | null
    _max: CustomThemeRecordMaxAggregateOutputType | null
  }

  export type CustomThemeRecordMinAggregateOutputType = {
    id: string | null
    name: string | null
    itemsJson: string | null
    createdAt: Date | null
  }

  export type CustomThemeRecordMaxAggregateOutputType = {
    id: string | null
    name: string | null
    itemsJson: string | null
    createdAt: Date | null
  }

  export type CustomThemeRecordCountAggregateOutputType = {
    id: number
    name: number
    itemsJson: number
    createdAt: number
    _all: number
  }


  export type CustomThemeRecordMinAggregateInputType = {
    id?: true
    name?: true
    itemsJson?: true
    createdAt?: true
  }

  export type CustomThemeRecordMaxAggregateInputType = {
    id?: true
    name?: true
    itemsJson?: true
    createdAt?: true
  }

  export type CustomThemeRecordCountAggregateInputType = {
    id?: true
    name?: true
    itemsJson?: true
    createdAt?: true
    _all?: true
  }

  export type CustomThemeRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomThemeRecord to aggregate.
     */
    where?: CustomThemeRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomThemeRecords to fetch.
     */
    orderBy?: CustomThemeRecordOrderByWithRelationInput | CustomThemeRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomThemeRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomThemeRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomThemeRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CustomThemeRecords
    **/
    _count?: true | CustomThemeRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomThemeRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomThemeRecordMaxAggregateInputType
  }

  export type GetCustomThemeRecordAggregateType<T extends CustomThemeRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomThemeRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomThemeRecord[P]>
      : GetScalarType<T[P], AggregateCustomThemeRecord[P]>
  }




  export type CustomThemeRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomThemeRecordWhereInput
    orderBy?: CustomThemeRecordOrderByWithAggregationInput | CustomThemeRecordOrderByWithAggregationInput[]
    by: CustomThemeRecordScalarFieldEnum[] | CustomThemeRecordScalarFieldEnum
    having?: CustomThemeRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomThemeRecordCountAggregateInputType | true
    _min?: CustomThemeRecordMinAggregateInputType
    _max?: CustomThemeRecordMaxAggregateInputType
  }

  export type CustomThemeRecordGroupByOutputType = {
    id: string
    name: string
    itemsJson: string
    createdAt: Date
    _count: CustomThemeRecordCountAggregateOutputType | null
    _min: CustomThemeRecordMinAggregateOutputType | null
    _max: CustomThemeRecordMaxAggregateOutputType | null
  }

  type GetCustomThemeRecordGroupByPayload<T extends CustomThemeRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomThemeRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomThemeRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomThemeRecordGroupByOutputType[P]>
            : GetScalarType<T[P], CustomThemeRecordGroupByOutputType[P]>
        }
      >
    >


  export type CustomThemeRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    itemsJson?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["customThemeRecord"]>

  export type CustomThemeRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    itemsJson?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["customThemeRecord"]>

  export type CustomThemeRecordSelectScalar = {
    id?: boolean
    name?: boolean
    itemsJson?: boolean
    createdAt?: boolean
  }


  export type $CustomThemeRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CustomThemeRecord"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      itemsJson: string
      createdAt: Date
    }, ExtArgs["result"]["customThemeRecord"]>
    composites: {}
  }

  type CustomThemeRecordGetPayload<S extends boolean | null | undefined | CustomThemeRecordDefaultArgs> = $Result.GetResult<Prisma.$CustomThemeRecordPayload, S>

  type CustomThemeRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CustomThemeRecordFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CustomThemeRecordCountAggregateInputType | true
    }

  export interface CustomThemeRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CustomThemeRecord'], meta: { name: 'CustomThemeRecord' } }
    /**
     * Find zero or one CustomThemeRecord that matches the filter.
     * @param {CustomThemeRecordFindUniqueArgs} args - Arguments to find a CustomThemeRecord
     * @example
     * // Get one CustomThemeRecord
     * const customThemeRecord = await prisma.customThemeRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomThemeRecordFindUniqueArgs>(args: SelectSubset<T, CustomThemeRecordFindUniqueArgs<ExtArgs>>): Prisma__CustomThemeRecordClient<$Result.GetResult<Prisma.$CustomThemeRecordPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CustomThemeRecord that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CustomThemeRecordFindUniqueOrThrowArgs} args - Arguments to find a CustomThemeRecord
     * @example
     * // Get one CustomThemeRecord
     * const customThemeRecord = await prisma.customThemeRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomThemeRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomThemeRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomThemeRecordClient<$Result.GetResult<Prisma.$CustomThemeRecordPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CustomThemeRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomThemeRecordFindFirstArgs} args - Arguments to find a CustomThemeRecord
     * @example
     * // Get one CustomThemeRecord
     * const customThemeRecord = await prisma.customThemeRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomThemeRecordFindFirstArgs>(args?: SelectSubset<T, CustomThemeRecordFindFirstArgs<ExtArgs>>): Prisma__CustomThemeRecordClient<$Result.GetResult<Prisma.$CustomThemeRecordPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CustomThemeRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomThemeRecordFindFirstOrThrowArgs} args - Arguments to find a CustomThemeRecord
     * @example
     * // Get one CustomThemeRecord
     * const customThemeRecord = await prisma.customThemeRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomThemeRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomThemeRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomThemeRecordClient<$Result.GetResult<Prisma.$CustomThemeRecordPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CustomThemeRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomThemeRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CustomThemeRecords
     * const customThemeRecords = await prisma.customThemeRecord.findMany()
     * 
     * // Get first 10 CustomThemeRecords
     * const customThemeRecords = await prisma.customThemeRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customThemeRecordWithIdOnly = await prisma.customThemeRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomThemeRecordFindManyArgs>(args?: SelectSubset<T, CustomThemeRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomThemeRecordPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CustomThemeRecord.
     * @param {CustomThemeRecordCreateArgs} args - Arguments to create a CustomThemeRecord.
     * @example
     * // Create one CustomThemeRecord
     * const CustomThemeRecord = await prisma.customThemeRecord.create({
     *   data: {
     *     // ... data to create a CustomThemeRecord
     *   }
     * })
     * 
     */
    create<T extends CustomThemeRecordCreateArgs>(args: SelectSubset<T, CustomThemeRecordCreateArgs<ExtArgs>>): Prisma__CustomThemeRecordClient<$Result.GetResult<Prisma.$CustomThemeRecordPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CustomThemeRecords.
     * @param {CustomThemeRecordCreateManyArgs} args - Arguments to create many CustomThemeRecords.
     * @example
     * // Create many CustomThemeRecords
     * const customThemeRecord = await prisma.customThemeRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomThemeRecordCreateManyArgs>(args?: SelectSubset<T, CustomThemeRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CustomThemeRecords and returns the data saved in the database.
     * @param {CustomThemeRecordCreateManyAndReturnArgs} args - Arguments to create many CustomThemeRecords.
     * @example
     * // Create many CustomThemeRecords
     * const customThemeRecord = await prisma.customThemeRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CustomThemeRecords and only return the `id`
     * const customThemeRecordWithIdOnly = await prisma.customThemeRecord.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomThemeRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomThemeRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomThemeRecordPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CustomThemeRecord.
     * @param {CustomThemeRecordDeleteArgs} args - Arguments to delete one CustomThemeRecord.
     * @example
     * // Delete one CustomThemeRecord
     * const CustomThemeRecord = await prisma.customThemeRecord.delete({
     *   where: {
     *     // ... filter to delete one CustomThemeRecord
     *   }
     * })
     * 
     */
    delete<T extends CustomThemeRecordDeleteArgs>(args: SelectSubset<T, CustomThemeRecordDeleteArgs<ExtArgs>>): Prisma__CustomThemeRecordClient<$Result.GetResult<Prisma.$CustomThemeRecordPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CustomThemeRecord.
     * @param {CustomThemeRecordUpdateArgs} args - Arguments to update one CustomThemeRecord.
     * @example
     * // Update one CustomThemeRecord
     * const customThemeRecord = await prisma.customThemeRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomThemeRecordUpdateArgs>(args: SelectSubset<T, CustomThemeRecordUpdateArgs<ExtArgs>>): Prisma__CustomThemeRecordClient<$Result.GetResult<Prisma.$CustomThemeRecordPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CustomThemeRecords.
     * @param {CustomThemeRecordDeleteManyArgs} args - Arguments to filter CustomThemeRecords to delete.
     * @example
     * // Delete a few CustomThemeRecords
     * const { count } = await prisma.customThemeRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomThemeRecordDeleteManyArgs>(args?: SelectSubset<T, CustomThemeRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CustomThemeRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomThemeRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CustomThemeRecords
     * const customThemeRecord = await prisma.customThemeRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomThemeRecordUpdateManyArgs>(args: SelectSubset<T, CustomThemeRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CustomThemeRecord.
     * @param {CustomThemeRecordUpsertArgs} args - Arguments to update or create a CustomThemeRecord.
     * @example
     * // Update or create a CustomThemeRecord
     * const customThemeRecord = await prisma.customThemeRecord.upsert({
     *   create: {
     *     // ... data to create a CustomThemeRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CustomThemeRecord we want to update
     *   }
     * })
     */
    upsert<T extends CustomThemeRecordUpsertArgs>(args: SelectSubset<T, CustomThemeRecordUpsertArgs<ExtArgs>>): Prisma__CustomThemeRecordClient<$Result.GetResult<Prisma.$CustomThemeRecordPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CustomThemeRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomThemeRecordCountArgs} args - Arguments to filter CustomThemeRecords to count.
     * @example
     * // Count the number of CustomThemeRecords
     * const count = await prisma.customThemeRecord.count({
     *   where: {
     *     // ... the filter for the CustomThemeRecords we want to count
     *   }
     * })
    **/
    count<T extends CustomThemeRecordCountArgs>(
      args?: Subset<T, CustomThemeRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomThemeRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CustomThemeRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomThemeRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CustomThemeRecordAggregateArgs>(args: Subset<T, CustomThemeRecordAggregateArgs>): Prisma.PrismaPromise<GetCustomThemeRecordAggregateType<T>>

    /**
     * Group by CustomThemeRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomThemeRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CustomThemeRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomThemeRecordGroupByArgs['orderBy'] }
        : { orderBy?: CustomThemeRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CustomThemeRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomThemeRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CustomThemeRecord model
   */
  readonly fields: CustomThemeRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CustomThemeRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomThemeRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CustomThemeRecord model
   */ 
  interface CustomThemeRecordFieldRefs {
    readonly id: FieldRef<"CustomThemeRecord", 'String'>
    readonly name: FieldRef<"CustomThemeRecord", 'String'>
    readonly itemsJson: FieldRef<"CustomThemeRecord", 'String'>
    readonly createdAt: FieldRef<"CustomThemeRecord", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CustomThemeRecord findUnique
   */
  export type CustomThemeRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomThemeRecord
     */
    select?: CustomThemeRecordSelect<ExtArgs> | null
    /**
     * Filter, which CustomThemeRecord to fetch.
     */
    where: CustomThemeRecordWhereUniqueInput
  }

  /**
   * CustomThemeRecord findUniqueOrThrow
   */
  export type CustomThemeRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomThemeRecord
     */
    select?: CustomThemeRecordSelect<ExtArgs> | null
    /**
     * Filter, which CustomThemeRecord to fetch.
     */
    where: CustomThemeRecordWhereUniqueInput
  }

  /**
   * CustomThemeRecord findFirst
   */
  export type CustomThemeRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomThemeRecord
     */
    select?: CustomThemeRecordSelect<ExtArgs> | null
    /**
     * Filter, which CustomThemeRecord to fetch.
     */
    where?: CustomThemeRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomThemeRecords to fetch.
     */
    orderBy?: CustomThemeRecordOrderByWithRelationInput | CustomThemeRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomThemeRecords.
     */
    cursor?: CustomThemeRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomThemeRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomThemeRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomThemeRecords.
     */
    distinct?: CustomThemeRecordScalarFieldEnum | CustomThemeRecordScalarFieldEnum[]
  }

  /**
   * CustomThemeRecord findFirstOrThrow
   */
  export type CustomThemeRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomThemeRecord
     */
    select?: CustomThemeRecordSelect<ExtArgs> | null
    /**
     * Filter, which CustomThemeRecord to fetch.
     */
    where?: CustomThemeRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomThemeRecords to fetch.
     */
    orderBy?: CustomThemeRecordOrderByWithRelationInput | CustomThemeRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomThemeRecords.
     */
    cursor?: CustomThemeRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomThemeRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomThemeRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomThemeRecords.
     */
    distinct?: CustomThemeRecordScalarFieldEnum | CustomThemeRecordScalarFieldEnum[]
  }

  /**
   * CustomThemeRecord findMany
   */
  export type CustomThemeRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomThemeRecord
     */
    select?: CustomThemeRecordSelect<ExtArgs> | null
    /**
     * Filter, which CustomThemeRecords to fetch.
     */
    where?: CustomThemeRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomThemeRecords to fetch.
     */
    orderBy?: CustomThemeRecordOrderByWithRelationInput | CustomThemeRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CustomThemeRecords.
     */
    cursor?: CustomThemeRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomThemeRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomThemeRecords.
     */
    skip?: number
    distinct?: CustomThemeRecordScalarFieldEnum | CustomThemeRecordScalarFieldEnum[]
  }

  /**
   * CustomThemeRecord create
   */
  export type CustomThemeRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomThemeRecord
     */
    select?: CustomThemeRecordSelect<ExtArgs> | null
    /**
     * The data needed to create a CustomThemeRecord.
     */
    data: XOR<CustomThemeRecordCreateInput, CustomThemeRecordUncheckedCreateInput>
  }

  /**
   * CustomThemeRecord createMany
   */
  export type CustomThemeRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CustomThemeRecords.
     */
    data: CustomThemeRecordCreateManyInput | CustomThemeRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CustomThemeRecord createManyAndReturn
   */
  export type CustomThemeRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomThemeRecord
     */
    select?: CustomThemeRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CustomThemeRecords.
     */
    data: CustomThemeRecordCreateManyInput | CustomThemeRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CustomThemeRecord update
   */
  export type CustomThemeRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomThemeRecord
     */
    select?: CustomThemeRecordSelect<ExtArgs> | null
    /**
     * The data needed to update a CustomThemeRecord.
     */
    data: XOR<CustomThemeRecordUpdateInput, CustomThemeRecordUncheckedUpdateInput>
    /**
     * Choose, which CustomThemeRecord to update.
     */
    where: CustomThemeRecordWhereUniqueInput
  }

  /**
   * CustomThemeRecord updateMany
   */
  export type CustomThemeRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CustomThemeRecords.
     */
    data: XOR<CustomThemeRecordUpdateManyMutationInput, CustomThemeRecordUncheckedUpdateManyInput>
    /**
     * Filter which CustomThemeRecords to update
     */
    where?: CustomThemeRecordWhereInput
  }

  /**
   * CustomThemeRecord upsert
   */
  export type CustomThemeRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomThemeRecord
     */
    select?: CustomThemeRecordSelect<ExtArgs> | null
    /**
     * The filter to search for the CustomThemeRecord to update in case it exists.
     */
    where: CustomThemeRecordWhereUniqueInput
    /**
     * In case the CustomThemeRecord found by the `where` argument doesn't exist, create a new CustomThemeRecord with this data.
     */
    create: XOR<CustomThemeRecordCreateInput, CustomThemeRecordUncheckedCreateInput>
    /**
     * In case the CustomThemeRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomThemeRecordUpdateInput, CustomThemeRecordUncheckedUpdateInput>
  }

  /**
   * CustomThemeRecord delete
   */
  export type CustomThemeRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomThemeRecord
     */
    select?: CustomThemeRecordSelect<ExtArgs> | null
    /**
     * Filter which CustomThemeRecord to delete.
     */
    where: CustomThemeRecordWhereUniqueInput
  }

  /**
   * CustomThemeRecord deleteMany
   */
  export type CustomThemeRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomThemeRecords to delete
     */
    where?: CustomThemeRecordWhereInput
  }

  /**
   * CustomThemeRecord without action
   */
  export type CustomThemeRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomThemeRecord
     */
    select?: CustomThemeRecordSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const RoomScalarFieldEnum: {
    id: 'id',
    code: 'code',
    hostId: 'hostId',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RoomScalarFieldEnum = (typeof RoomScalarFieldEnum)[keyof typeof RoomScalarFieldEnum]


  export const GameRecordScalarFieldEnum: {
    id: 'id',
    roomCode: 'roomCode',
    themeId: 'themeId',
    themeName: 'themeName',
    totalRounds: 'totalRounds',
    createdAt: 'createdAt',
    finishedAt: 'finishedAt'
  };

  export type GameRecordScalarFieldEnum = (typeof GameRecordScalarFieldEnum)[keyof typeof GameRecordScalarFieldEnum]


  export const GameParticipantScalarFieldEnum: {
    id: 'id',
    gameId: 'gameId',
    playerId: 'playerId',
    playerName: 'playerName',
    finalRank: 'finalRank',
    completedItem: 'completedItem'
  };

  export type GameParticipantScalarFieldEnum = (typeof GameParticipantScalarFieldEnum)[keyof typeof GameParticipantScalarFieldEnum]


  export const CustomThemeRecordScalarFieldEnum: {
    id: 'id',
    name: 'name',
    itemsJson: 'itemsJson',
    createdAt: 'createdAt'
  };

  export type CustomThemeRecordScalarFieldEnum = (typeof CustomThemeRecordScalarFieldEnum)[keyof typeof CustomThemeRecordScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type RoomWhereInput = {
    AND?: RoomWhereInput | RoomWhereInput[]
    OR?: RoomWhereInput[]
    NOT?: RoomWhereInput | RoomWhereInput[]
    id?: StringFilter<"Room"> | string
    code?: StringFilter<"Room"> | string
    hostId?: StringFilter<"Room"> | string
    status?: StringFilter<"Room"> | string
    createdAt?: DateTimeFilter<"Room"> | Date | string
    updatedAt?: DateTimeFilter<"Room"> | Date | string
  }

  export type RoomOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    hostId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: RoomWhereInput | RoomWhereInput[]
    OR?: RoomWhereInput[]
    NOT?: RoomWhereInput | RoomWhereInput[]
    hostId?: StringFilter<"Room"> | string
    status?: StringFilter<"Room"> | string
    createdAt?: DateTimeFilter<"Room"> | Date | string
    updatedAt?: DateTimeFilter<"Room"> | Date | string
  }, "id" | "code">

  export type RoomOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    hostId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RoomCountOrderByAggregateInput
    _max?: RoomMaxOrderByAggregateInput
    _min?: RoomMinOrderByAggregateInput
  }

  export type RoomScalarWhereWithAggregatesInput = {
    AND?: RoomScalarWhereWithAggregatesInput | RoomScalarWhereWithAggregatesInput[]
    OR?: RoomScalarWhereWithAggregatesInput[]
    NOT?: RoomScalarWhereWithAggregatesInput | RoomScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Room"> | string
    code?: StringWithAggregatesFilter<"Room"> | string
    hostId?: StringWithAggregatesFilter<"Room"> | string
    status?: StringWithAggregatesFilter<"Room"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Room"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Room"> | Date | string
  }

  export type GameRecordWhereInput = {
    AND?: GameRecordWhereInput | GameRecordWhereInput[]
    OR?: GameRecordWhereInput[]
    NOT?: GameRecordWhereInput | GameRecordWhereInput[]
    id?: StringFilter<"GameRecord"> | string
    roomCode?: StringFilter<"GameRecord"> | string
    themeId?: StringFilter<"GameRecord"> | string
    themeName?: StringFilter<"GameRecord"> | string
    totalRounds?: IntFilter<"GameRecord"> | number
    createdAt?: DateTimeFilter<"GameRecord"> | Date | string
    finishedAt?: DateTimeFilter<"GameRecord"> | Date | string
    participants?: GameParticipantListRelationFilter
  }

  export type GameRecordOrderByWithRelationInput = {
    id?: SortOrder
    roomCode?: SortOrder
    themeId?: SortOrder
    themeName?: SortOrder
    totalRounds?: SortOrder
    createdAt?: SortOrder
    finishedAt?: SortOrder
    participants?: GameParticipantOrderByRelationAggregateInput
  }

  export type GameRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GameRecordWhereInput | GameRecordWhereInput[]
    OR?: GameRecordWhereInput[]
    NOT?: GameRecordWhereInput | GameRecordWhereInput[]
    roomCode?: StringFilter<"GameRecord"> | string
    themeId?: StringFilter<"GameRecord"> | string
    themeName?: StringFilter<"GameRecord"> | string
    totalRounds?: IntFilter<"GameRecord"> | number
    createdAt?: DateTimeFilter<"GameRecord"> | Date | string
    finishedAt?: DateTimeFilter<"GameRecord"> | Date | string
    participants?: GameParticipantListRelationFilter
  }, "id">

  export type GameRecordOrderByWithAggregationInput = {
    id?: SortOrder
    roomCode?: SortOrder
    themeId?: SortOrder
    themeName?: SortOrder
    totalRounds?: SortOrder
    createdAt?: SortOrder
    finishedAt?: SortOrder
    _count?: GameRecordCountOrderByAggregateInput
    _avg?: GameRecordAvgOrderByAggregateInput
    _max?: GameRecordMaxOrderByAggregateInput
    _min?: GameRecordMinOrderByAggregateInput
    _sum?: GameRecordSumOrderByAggregateInput
  }

  export type GameRecordScalarWhereWithAggregatesInput = {
    AND?: GameRecordScalarWhereWithAggregatesInput | GameRecordScalarWhereWithAggregatesInput[]
    OR?: GameRecordScalarWhereWithAggregatesInput[]
    NOT?: GameRecordScalarWhereWithAggregatesInput | GameRecordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GameRecord"> | string
    roomCode?: StringWithAggregatesFilter<"GameRecord"> | string
    themeId?: StringWithAggregatesFilter<"GameRecord"> | string
    themeName?: StringWithAggregatesFilter<"GameRecord"> | string
    totalRounds?: IntWithAggregatesFilter<"GameRecord"> | number
    createdAt?: DateTimeWithAggregatesFilter<"GameRecord"> | Date | string
    finishedAt?: DateTimeWithAggregatesFilter<"GameRecord"> | Date | string
  }

  export type GameParticipantWhereInput = {
    AND?: GameParticipantWhereInput | GameParticipantWhereInput[]
    OR?: GameParticipantWhereInput[]
    NOT?: GameParticipantWhereInput | GameParticipantWhereInput[]
    id?: StringFilter<"GameParticipant"> | string
    gameId?: StringFilter<"GameParticipant"> | string
    playerId?: StringFilter<"GameParticipant"> | string
    playerName?: StringFilter<"GameParticipant"> | string
    finalRank?: IntFilter<"GameParticipant"> | number
    completedItem?: StringNullableFilter<"GameParticipant"> | string | null
    game?: XOR<GameRecordRelationFilter, GameRecordWhereInput>
  }

  export type GameParticipantOrderByWithRelationInput = {
    id?: SortOrder
    gameId?: SortOrder
    playerId?: SortOrder
    playerName?: SortOrder
    finalRank?: SortOrder
    completedItem?: SortOrderInput | SortOrder
    game?: GameRecordOrderByWithRelationInput
  }

  export type GameParticipantWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GameParticipantWhereInput | GameParticipantWhereInput[]
    OR?: GameParticipantWhereInput[]
    NOT?: GameParticipantWhereInput | GameParticipantWhereInput[]
    gameId?: StringFilter<"GameParticipant"> | string
    playerId?: StringFilter<"GameParticipant"> | string
    playerName?: StringFilter<"GameParticipant"> | string
    finalRank?: IntFilter<"GameParticipant"> | number
    completedItem?: StringNullableFilter<"GameParticipant"> | string | null
    game?: XOR<GameRecordRelationFilter, GameRecordWhereInput>
  }, "id">

  export type GameParticipantOrderByWithAggregationInput = {
    id?: SortOrder
    gameId?: SortOrder
    playerId?: SortOrder
    playerName?: SortOrder
    finalRank?: SortOrder
    completedItem?: SortOrderInput | SortOrder
    _count?: GameParticipantCountOrderByAggregateInput
    _avg?: GameParticipantAvgOrderByAggregateInput
    _max?: GameParticipantMaxOrderByAggregateInput
    _min?: GameParticipantMinOrderByAggregateInput
    _sum?: GameParticipantSumOrderByAggregateInput
  }

  export type GameParticipantScalarWhereWithAggregatesInput = {
    AND?: GameParticipantScalarWhereWithAggregatesInput | GameParticipantScalarWhereWithAggregatesInput[]
    OR?: GameParticipantScalarWhereWithAggregatesInput[]
    NOT?: GameParticipantScalarWhereWithAggregatesInput | GameParticipantScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GameParticipant"> | string
    gameId?: StringWithAggregatesFilter<"GameParticipant"> | string
    playerId?: StringWithAggregatesFilter<"GameParticipant"> | string
    playerName?: StringWithAggregatesFilter<"GameParticipant"> | string
    finalRank?: IntWithAggregatesFilter<"GameParticipant"> | number
    completedItem?: StringNullableWithAggregatesFilter<"GameParticipant"> | string | null
  }

  export type CustomThemeRecordWhereInput = {
    AND?: CustomThemeRecordWhereInput | CustomThemeRecordWhereInput[]
    OR?: CustomThemeRecordWhereInput[]
    NOT?: CustomThemeRecordWhereInput | CustomThemeRecordWhereInput[]
    id?: StringFilter<"CustomThemeRecord"> | string
    name?: StringFilter<"CustomThemeRecord"> | string
    itemsJson?: StringFilter<"CustomThemeRecord"> | string
    createdAt?: DateTimeFilter<"CustomThemeRecord"> | Date | string
  }

  export type CustomThemeRecordOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    itemsJson?: SortOrder
    createdAt?: SortOrder
  }

  export type CustomThemeRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CustomThemeRecordWhereInput | CustomThemeRecordWhereInput[]
    OR?: CustomThemeRecordWhereInput[]
    NOT?: CustomThemeRecordWhereInput | CustomThemeRecordWhereInput[]
    name?: StringFilter<"CustomThemeRecord"> | string
    itemsJson?: StringFilter<"CustomThemeRecord"> | string
    createdAt?: DateTimeFilter<"CustomThemeRecord"> | Date | string
  }, "id">

  export type CustomThemeRecordOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    itemsJson?: SortOrder
    createdAt?: SortOrder
    _count?: CustomThemeRecordCountOrderByAggregateInput
    _max?: CustomThemeRecordMaxOrderByAggregateInput
    _min?: CustomThemeRecordMinOrderByAggregateInput
  }

  export type CustomThemeRecordScalarWhereWithAggregatesInput = {
    AND?: CustomThemeRecordScalarWhereWithAggregatesInput | CustomThemeRecordScalarWhereWithAggregatesInput[]
    OR?: CustomThemeRecordScalarWhereWithAggregatesInput[]
    NOT?: CustomThemeRecordScalarWhereWithAggregatesInput | CustomThemeRecordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CustomThemeRecord"> | string
    name?: StringWithAggregatesFilter<"CustomThemeRecord"> | string
    itemsJson?: StringWithAggregatesFilter<"CustomThemeRecord"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CustomThemeRecord"> | Date | string
  }

  export type RoomCreateInput = {
    id?: string
    code: string
    hostId: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomUncheckedCreateInput = {
    id?: string
    code: string
    hostId: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    hostId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    hostId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomCreateManyInput = {
    id?: string
    code: string
    hostId: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    hostId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    hostId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameRecordCreateInput = {
    id?: string
    roomCode: string
    themeId: string
    themeName: string
    totalRounds: number
    createdAt?: Date | string
    finishedAt?: Date | string
    participants?: GameParticipantCreateNestedManyWithoutGameInput
  }

  export type GameRecordUncheckedCreateInput = {
    id?: string
    roomCode: string
    themeId: string
    themeName: string
    totalRounds: number
    createdAt?: Date | string
    finishedAt?: Date | string
    participants?: GameParticipantUncheckedCreateNestedManyWithoutGameInput
  }

  export type GameRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomCode?: StringFieldUpdateOperationsInput | string
    themeId?: StringFieldUpdateOperationsInput | string
    themeName?: StringFieldUpdateOperationsInput | string
    totalRounds?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participants?: GameParticipantUpdateManyWithoutGameNestedInput
  }

  export type GameRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomCode?: StringFieldUpdateOperationsInput | string
    themeId?: StringFieldUpdateOperationsInput | string
    themeName?: StringFieldUpdateOperationsInput | string
    totalRounds?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participants?: GameParticipantUncheckedUpdateManyWithoutGameNestedInput
  }

  export type GameRecordCreateManyInput = {
    id?: string
    roomCode: string
    themeId: string
    themeName: string
    totalRounds: number
    createdAt?: Date | string
    finishedAt?: Date | string
  }

  export type GameRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomCode?: StringFieldUpdateOperationsInput | string
    themeId?: StringFieldUpdateOperationsInput | string
    themeName?: StringFieldUpdateOperationsInput | string
    totalRounds?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomCode?: StringFieldUpdateOperationsInput | string
    themeId?: StringFieldUpdateOperationsInput | string
    themeName?: StringFieldUpdateOperationsInput | string
    totalRounds?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameParticipantCreateInput = {
    id?: string
    playerId: string
    playerName: string
    finalRank: number
    completedItem?: string | null
    game: GameRecordCreateNestedOneWithoutParticipantsInput
  }

  export type GameParticipantUncheckedCreateInput = {
    id?: string
    gameId: string
    playerId: string
    playerName: string
    finalRank: number
    completedItem?: string | null
  }

  export type GameParticipantUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
    playerName?: StringFieldUpdateOperationsInput | string
    finalRank?: IntFieldUpdateOperationsInput | number
    completedItem?: NullableStringFieldUpdateOperationsInput | string | null
    game?: GameRecordUpdateOneRequiredWithoutParticipantsNestedInput
  }

  export type GameParticipantUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
    playerName?: StringFieldUpdateOperationsInput | string
    finalRank?: IntFieldUpdateOperationsInput | number
    completedItem?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GameParticipantCreateManyInput = {
    id?: string
    gameId: string
    playerId: string
    playerName: string
    finalRank: number
    completedItem?: string | null
  }

  export type GameParticipantUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
    playerName?: StringFieldUpdateOperationsInput | string
    finalRank?: IntFieldUpdateOperationsInput | number
    completedItem?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GameParticipantUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
    playerName?: StringFieldUpdateOperationsInput | string
    finalRank?: IntFieldUpdateOperationsInput | number
    completedItem?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CustomThemeRecordCreateInput = {
    id?: string
    name: string
    itemsJson: string
    createdAt?: Date | string
  }

  export type CustomThemeRecordUncheckedCreateInput = {
    id?: string
    name: string
    itemsJson: string
    createdAt?: Date | string
  }

  export type CustomThemeRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    itemsJson?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomThemeRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    itemsJson?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomThemeRecordCreateManyInput = {
    id?: string
    name: string
    itemsJson: string
    createdAt?: Date | string
  }

  export type CustomThemeRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    itemsJson?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomThemeRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    itemsJson?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type RoomCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    hostId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    hostId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    hostId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type GameParticipantListRelationFilter = {
    every?: GameParticipantWhereInput
    some?: GameParticipantWhereInput
    none?: GameParticipantWhereInput
  }

  export type GameParticipantOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GameRecordCountOrderByAggregateInput = {
    id?: SortOrder
    roomCode?: SortOrder
    themeId?: SortOrder
    themeName?: SortOrder
    totalRounds?: SortOrder
    createdAt?: SortOrder
    finishedAt?: SortOrder
  }

  export type GameRecordAvgOrderByAggregateInput = {
    totalRounds?: SortOrder
  }

  export type GameRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    roomCode?: SortOrder
    themeId?: SortOrder
    themeName?: SortOrder
    totalRounds?: SortOrder
    createdAt?: SortOrder
    finishedAt?: SortOrder
  }

  export type GameRecordMinOrderByAggregateInput = {
    id?: SortOrder
    roomCode?: SortOrder
    themeId?: SortOrder
    themeName?: SortOrder
    totalRounds?: SortOrder
    createdAt?: SortOrder
    finishedAt?: SortOrder
  }

  export type GameRecordSumOrderByAggregateInput = {
    totalRounds?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type GameRecordRelationFilter = {
    is?: GameRecordWhereInput
    isNot?: GameRecordWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type GameParticipantCountOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    playerId?: SortOrder
    playerName?: SortOrder
    finalRank?: SortOrder
    completedItem?: SortOrder
  }

  export type GameParticipantAvgOrderByAggregateInput = {
    finalRank?: SortOrder
  }

  export type GameParticipantMaxOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    playerId?: SortOrder
    playerName?: SortOrder
    finalRank?: SortOrder
    completedItem?: SortOrder
  }

  export type GameParticipantMinOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    playerId?: SortOrder
    playerName?: SortOrder
    finalRank?: SortOrder
    completedItem?: SortOrder
  }

  export type GameParticipantSumOrderByAggregateInput = {
    finalRank?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type CustomThemeRecordCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    itemsJson?: SortOrder
    createdAt?: SortOrder
  }

  export type CustomThemeRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    itemsJson?: SortOrder
    createdAt?: SortOrder
  }

  export type CustomThemeRecordMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    itemsJson?: SortOrder
    createdAt?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type GameParticipantCreateNestedManyWithoutGameInput = {
    create?: XOR<GameParticipantCreateWithoutGameInput, GameParticipantUncheckedCreateWithoutGameInput> | GameParticipantCreateWithoutGameInput[] | GameParticipantUncheckedCreateWithoutGameInput[]
    connectOrCreate?: GameParticipantCreateOrConnectWithoutGameInput | GameParticipantCreateOrConnectWithoutGameInput[]
    createMany?: GameParticipantCreateManyGameInputEnvelope
    connect?: GameParticipantWhereUniqueInput | GameParticipantWhereUniqueInput[]
  }

  export type GameParticipantUncheckedCreateNestedManyWithoutGameInput = {
    create?: XOR<GameParticipantCreateWithoutGameInput, GameParticipantUncheckedCreateWithoutGameInput> | GameParticipantCreateWithoutGameInput[] | GameParticipantUncheckedCreateWithoutGameInput[]
    connectOrCreate?: GameParticipantCreateOrConnectWithoutGameInput | GameParticipantCreateOrConnectWithoutGameInput[]
    createMany?: GameParticipantCreateManyGameInputEnvelope
    connect?: GameParticipantWhereUniqueInput | GameParticipantWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type GameParticipantUpdateManyWithoutGameNestedInput = {
    create?: XOR<GameParticipantCreateWithoutGameInput, GameParticipantUncheckedCreateWithoutGameInput> | GameParticipantCreateWithoutGameInput[] | GameParticipantUncheckedCreateWithoutGameInput[]
    connectOrCreate?: GameParticipantCreateOrConnectWithoutGameInput | GameParticipantCreateOrConnectWithoutGameInput[]
    upsert?: GameParticipantUpsertWithWhereUniqueWithoutGameInput | GameParticipantUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: GameParticipantCreateManyGameInputEnvelope
    set?: GameParticipantWhereUniqueInput | GameParticipantWhereUniqueInput[]
    disconnect?: GameParticipantWhereUniqueInput | GameParticipantWhereUniqueInput[]
    delete?: GameParticipantWhereUniqueInput | GameParticipantWhereUniqueInput[]
    connect?: GameParticipantWhereUniqueInput | GameParticipantWhereUniqueInput[]
    update?: GameParticipantUpdateWithWhereUniqueWithoutGameInput | GameParticipantUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: GameParticipantUpdateManyWithWhereWithoutGameInput | GameParticipantUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: GameParticipantScalarWhereInput | GameParticipantScalarWhereInput[]
  }

  export type GameParticipantUncheckedUpdateManyWithoutGameNestedInput = {
    create?: XOR<GameParticipantCreateWithoutGameInput, GameParticipantUncheckedCreateWithoutGameInput> | GameParticipantCreateWithoutGameInput[] | GameParticipantUncheckedCreateWithoutGameInput[]
    connectOrCreate?: GameParticipantCreateOrConnectWithoutGameInput | GameParticipantCreateOrConnectWithoutGameInput[]
    upsert?: GameParticipantUpsertWithWhereUniqueWithoutGameInput | GameParticipantUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: GameParticipantCreateManyGameInputEnvelope
    set?: GameParticipantWhereUniqueInput | GameParticipantWhereUniqueInput[]
    disconnect?: GameParticipantWhereUniqueInput | GameParticipantWhereUniqueInput[]
    delete?: GameParticipantWhereUniqueInput | GameParticipantWhereUniqueInput[]
    connect?: GameParticipantWhereUniqueInput | GameParticipantWhereUniqueInput[]
    update?: GameParticipantUpdateWithWhereUniqueWithoutGameInput | GameParticipantUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: GameParticipantUpdateManyWithWhereWithoutGameInput | GameParticipantUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: GameParticipantScalarWhereInput | GameParticipantScalarWhereInput[]
  }

  export type GameRecordCreateNestedOneWithoutParticipantsInput = {
    create?: XOR<GameRecordCreateWithoutParticipantsInput, GameRecordUncheckedCreateWithoutParticipantsInput>
    connectOrCreate?: GameRecordCreateOrConnectWithoutParticipantsInput
    connect?: GameRecordWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type GameRecordUpdateOneRequiredWithoutParticipantsNestedInput = {
    create?: XOR<GameRecordCreateWithoutParticipantsInput, GameRecordUncheckedCreateWithoutParticipantsInput>
    connectOrCreate?: GameRecordCreateOrConnectWithoutParticipantsInput
    upsert?: GameRecordUpsertWithoutParticipantsInput
    connect?: GameRecordWhereUniqueInput
    update?: XOR<XOR<GameRecordUpdateToOneWithWhereWithoutParticipantsInput, GameRecordUpdateWithoutParticipantsInput>, GameRecordUncheckedUpdateWithoutParticipantsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type GameParticipantCreateWithoutGameInput = {
    id?: string
    playerId: string
    playerName: string
    finalRank: number
    completedItem?: string | null
  }

  export type GameParticipantUncheckedCreateWithoutGameInput = {
    id?: string
    playerId: string
    playerName: string
    finalRank: number
    completedItem?: string | null
  }

  export type GameParticipantCreateOrConnectWithoutGameInput = {
    where: GameParticipantWhereUniqueInput
    create: XOR<GameParticipantCreateWithoutGameInput, GameParticipantUncheckedCreateWithoutGameInput>
  }

  export type GameParticipantCreateManyGameInputEnvelope = {
    data: GameParticipantCreateManyGameInput | GameParticipantCreateManyGameInput[]
    skipDuplicates?: boolean
  }

  export type GameParticipantUpsertWithWhereUniqueWithoutGameInput = {
    where: GameParticipantWhereUniqueInput
    update: XOR<GameParticipantUpdateWithoutGameInput, GameParticipantUncheckedUpdateWithoutGameInput>
    create: XOR<GameParticipantCreateWithoutGameInput, GameParticipantUncheckedCreateWithoutGameInput>
  }

  export type GameParticipantUpdateWithWhereUniqueWithoutGameInput = {
    where: GameParticipantWhereUniqueInput
    data: XOR<GameParticipantUpdateWithoutGameInput, GameParticipantUncheckedUpdateWithoutGameInput>
  }

  export type GameParticipantUpdateManyWithWhereWithoutGameInput = {
    where: GameParticipantScalarWhereInput
    data: XOR<GameParticipantUpdateManyMutationInput, GameParticipantUncheckedUpdateManyWithoutGameInput>
  }

  export type GameParticipantScalarWhereInput = {
    AND?: GameParticipantScalarWhereInput | GameParticipantScalarWhereInput[]
    OR?: GameParticipantScalarWhereInput[]
    NOT?: GameParticipantScalarWhereInput | GameParticipantScalarWhereInput[]
    id?: StringFilter<"GameParticipant"> | string
    gameId?: StringFilter<"GameParticipant"> | string
    playerId?: StringFilter<"GameParticipant"> | string
    playerName?: StringFilter<"GameParticipant"> | string
    finalRank?: IntFilter<"GameParticipant"> | number
    completedItem?: StringNullableFilter<"GameParticipant"> | string | null
  }

  export type GameRecordCreateWithoutParticipantsInput = {
    id?: string
    roomCode: string
    themeId: string
    themeName: string
    totalRounds: number
    createdAt?: Date | string
    finishedAt?: Date | string
  }

  export type GameRecordUncheckedCreateWithoutParticipantsInput = {
    id?: string
    roomCode: string
    themeId: string
    themeName: string
    totalRounds: number
    createdAt?: Date | string
    finishedAt?: Date | string
  }

  export type GameRecordCreateOrConnectWithoutParticipantsInput = {
    where: GameRecordWhereUniqueInput
    create: XOR<GameRecordCreateWithoutParticipantsInput, GameRecordUncheckedCreateWithoutParticipantsInput>
  }

  export type GameRecordUpsertWithoutParticipantsInput = {
    update: XOR<GameRecordUpdateWithoutParticipantsInput, GameRecordUncheckedUpdateWithoutParticipantsInput>
    create: XOR<GameRecordCreateWithoutParticipantsInput, GameRecordUncheckedCreateWithoutParticipantsInput>
    where?: GameRecordWhereInput
  }

  export type GameRecordUpdateToOneWithWhereWithoutParticipantsInput = {
    where?: GameRecordWhereInput
    data: XOR<GameRecordUpdateWithoutParticipantsInput, GameRecordUncheckedUpdateWithoutParticipantsInput>
  }

  export type GameRecordUpdateWithoutParticipantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomCode?: StringFieldUpdateOperationsInput | string
    themeId?: StringFieldUpdateOperationsInput | string
    themeName?: StringFieldUpdateOperationsInput | string
    totalRounds?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameRecordUncheckedUpdateWithoutParticipantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomCode?: StringFieldUpdateOperationsInput | string
    themeId?: StringFieldUpdateOperationsInput | string
    themeName?: StringFieldUpdateOperationsInput | string
    totalRounds?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameParticipantCreateManyGameInput = {
    id?: string
    playerId: string
    playerName: string
    finalRank: number
    completedItem?: string | null
  }

  export type GameParticipantUpdateWithoutGameInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
    playerName?: StringFieldUpdateOperationsInput | string
    finalRank?: IntFieldUpdateOperationsInput | number
    completedItem?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GameParticipantUncheckedUpdateWithoutGameInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
    playerName?: StringFieldUpdateOperationsInput | string
    finalRank?: IntFieldUpdateOperationsInput | number
    completedItem?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GameParticipantUncheckedUpdateManyWithoutGameInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
    playerName?: StringFieldUpdateOperationsInput | string
    finalRank?: IntFieldUpdateOperationsInput | number
    completedItem?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use GameRecordCountOutputTypeDefaultArgs instead
     */
    export type GameRecordCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GameRecordCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RoomDefaultArgs instead
     */
    export type RoomArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RoomDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GameRecordDefaultArgs instead
     */
    export type GameRecordArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GameRecordDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GameParticipantDefaultArgs instead
     */
    export type GameParticipantArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GameParticipantDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CustomThemeRecordDefaultArgs instead
     */
    export type CustomThemeRecordArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CustomThemeRecordDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}