/**
 * Created by Ron on 30/12/2015.
 */
// Type definitions for Rethinkdb 2.10.0
// Project: http://rethinkdb.com/
// Reference: http://www.rethinkdb.com/api/#js
// TODO: Document manipulation and below
/* tslint:disable */
declare module "rethinkdb" {
    import * as Promise from 'bluebird';

    //somehow it caused Maximum call stack size exceeded exceptions
    export type RString = string|RRunnable<string>;
    export type RNumber = number|RRunnable<number>;
    export type RDate = Date|RRunnable<Date>;

    export type FieldType = any;
    export type Literal = any;
    export type RFactory = any;
    export type RFormat = 'native'|'raw';
    export type RDurability = 'hard'|'soft';

    export interface EventEmitter {
        addListener(event: string, listener: Function): void;
        on(event: string, listener: Function): void;
        once(event: string, listener: Function): void;
        removeListener(event: string, listener: Function): void;
        removeAllListeners(event?: string): void;
        setMaxListeners(n: number): void;
        listeners(event: string): void;
        emit(event: string, ...args: any[]): void;
    }

    //#region Options

    export interface ConnectionOptions {
        host?: string; //default 'localhost'
        port?: number; //default 28015
        db?: string; //default 'test'
        authKey?: string;
        timeout?: number; //in seconds, default 20
        ssl?: { caCerts: string }; //path to certificate
    }

    export interface TableCreateOptions {
        primaryKey?: string; //default: "id"
        shards?: number; //1-32
        replicas?: number| { [serverTag: string]: number };
        primaryReplicaTag?: string;
        nonvotingReplicaTags?: string[];
        durability?: RDurability; // "soft" or "hard" defualt: "hard"
    }
    export interface Repair {
        emergencyRepair: 'unsafe_rollback'|'unsafe_rollback_or_erase';
    }

    export interface TableReconfigureOptions {
        shards?: number; //1-32
        replicas?: number| { [serverTag: string]: number };
        primaryReplicaTag?: string;
        dryRun?: boolean;
    }

    export interface TableOptions {
        readMode?: 'single'|'majority'|'outdated'; // "single" "majority" "outdated"
        identifierFormat?: 'name'|'uuid'; //"name" "uuid";
    }

    export interface DeleteOptions {
        returnChanges?: boolean|string|'always'; //true, false or "always" default: false
        durability?: RDurability; // "soft" or "hard" defualt: table
    }

    export interface InsertOptions extends DeleteOptions {
        conflict?: 'error'|'replace'|'update'; //"error" "replace" "update"
    }

    export interface UpdateOptions extends DeleteOptions {
        nonAtomic?: boolean;
    }

    export interface IndexOptions {
        multi?: boolean,
        geo?: boolean
    }

    export interface RunOptions {
        useOutdated?: boolean; //default false
        timeFormat?: RFormat; //'native' or 'raw', default 'native'
        profile?: boolean; //default false
        durability?: RDurability; //'hard' or 'soft'
        groupFormat?: RFormat; //'native' or 'raw', default 'native'
        noreply?: boolean; //default false
        db?: string;
        arrayLimit?: number; //default 100,000
        binaryFormat?: RFormat; // 'native' or 'raw', default 'native'
        minBatchRows?: number; //default 8
        maxBatchRow?: number; //default unlimited
        maxBatchBytes?: number; //default 1MB
        maxBatchSeconds?: number; //default 0.5
        firstBatchScaledownFactor?: number; //default 4
    }

    export interface HttpRequestOptions {
        //General
        timeout?: number; //default 30
        reattempts?: number; //default 5
        redirects?: number; //default 1
        verify?: boolean; //default true
        resultFormat: 'text'|'json'|'jsonp'|'binary'|'auto'; //"text" "json" "jsonp" "binary" "auto"

        //Request Options
        method?: 'GET'|'POST'|'PUT'|'PATCH'|'DELETE'|'HEAD'; // "GET" "POST" "PUT" "PATCH" "DELETE" "HEAD"
        params?: Object;
        header?: { [key: string]: string|Object };
        data?: Object;
        //Pagination
        page?: string|((param: RStream<{ params: Object, header: Object, body: Object }>) => (RString));
        pageLimit: number; //-1 = no limit.

    }

    export interface WaitOptions {
        waitFor?: 'ready_for_outdated_reads'|'ready_for_reads'|'ready_for_writes'|'all_replicas_ready'; //"ready_for_outdated_reads", "ready_for_reads", "ready_for_writes", "all_replicas_ready" default "ready_for_writes"
        timeout?: number;
    }

    export interface ChangesOptions {
        squash?: boolean|number;
        changefeedQueueSize?: number;
        includeInitial?: boolean;
        includeStates?: boolean;
    }

    //#endregion

    //#region Results
    export interface Geometry {
    }
    export interface Line extends Geometry {
    }
    export interface Point extends Geometry {
    }
    export interface Polygon extends Geometry {
    }

    export interface ValueChange<T> {
        old_val?: T;
        new_val?: T;
    }

    export interface DBChangeResult {
        config_changes: ValueChange<{
            id: string;
            name: string;
        }>[];
        tables_dropped: number;
        dbs_created: number;
        dbs_dropped: number;
    }

    export interface DBConfig {
        id: string;
        name: string;
    }

    export interface TableChangeResult {
        tablesCreated?: number;
        tablesDropped?: number;
        configChanges: ValueChange<TableConfig>;
    }

    export interface TableShard {
        primary_replica: string;
        replicas: string[];
        nonvoting_replicas: string[];
    }

    export interface TableConfig {
        id: string;
        name: string;
        db: string;
        primary_key: string; //default: "id"
        shards: TableShard[];
        indexes: string[];
        write_acks: string;
        durability: RDurability; // "soft" or "hard" defualt: "hard"
    }
    export interface TableStatus extends TableConfig {
        status: {
            all_replicas_ready: boolean;
            ready_for_outdated_reads: boolean;
            ready_for_reads: boolean;
            ready_for_writes: boolean;
        };
    }
    export interface IndexStatus {
        function: Buffer;
        geo: boolean;
        index: string;
        multi: boolean;
        outdated: boolean;
        ready: boolean;
    }

    export interface WriteResult<T> {
        deleted: number;
        skipped: number;
        errors: number;
        first_error?: string;
        inserted: number;
        replaced: number;
        unchanged: number;
        generated_keys?: string[];
        warnings?: string[];
        changes?: ValueChange<T>;
    }

    export interface Changes<T> extends ValueChange<T> {
        state?: 'initializing'|'ready'; //'initializing', 'ready'. cant come together with values
    }

    export interface JoinResult<T1, T2> {
        left: T1;
        right: T2;
    }

    export interface GroupResults<TGroupBy, TReduction> {
        group: TGroupBy;
        reduction: TReduction;
    }

    export interface MatchResults {
        start: number;
        end: number;
        str: string;
        groups: Array<{
            start: number;
            end: number;
            str: string;
        }>;
    }

    export interface Feed<T> extends EventEmitter {
        each(cb: (err: Error, row: T) => boolean|void, onFinishedCallback?: (err: Error) => void): void;

        //events can be 'data' and 'error'
    }

    export interface Cursor<T> extends Feed<T> {
        next(cb: (err: Error, row: T) => void): void;
        next(): Promise<T>;

        toArray(cb: (err: Error, array: Array<T>) => void): void;
        toArray(): Promise<Array<T>>;

        close(): void;
    }

    //#endregion

    export interface Connection extends EventEmitter {
        close(wait: { noreplyWait: boolean }, cb: (err: Error) => void): void;
        close(cb: (err: Error) => void): void;

        close(wait?: { noreplyWait: boolean }): Promise<void>;

        reconnect(wait: { noreplyWait: boolean }, cb: (err: Error) => void): void;
        reconnect(cb: (err: Error) => void): void;

        reconnect(wait?: { noreplyWait: boolean }): Promise<void>;

        use(dbName: string): void;

        noreplyWait(cb: (err: Error) => void): void;
        noreplyWait(): Promise<void>;

        //events can be connect, close, timeout and error.
    }

    export interface RDatabase {
        tableCreate(tableName: string, options: TableCreateOptions): RStream<TableChangeResult>;
        tableDrop(tableName: string): RStream<TableChangeResult>;
        tableList(): RStream<string>;
        table<T>(tableName: string): RTable<T>;

        config(): RStream<DBConfig>;
        rebalance(): RStream<{ rebalanced: number, status_changes: ValueChange<TableStatus>[] }>;
        reconfigure(options: TableReconfigureOptions): RStream<{ reconfigured: number, config_changes: ValueChange<TableConfig>[], status_changes: ValueChange<TableStatus>[] }>;
        wait(options: WaitOptions): RStream<{ ready: number }>;
    }

    export interface RTable<T> extends RStream<T> {
        indexCreate(indexName: string, indexFunction?: MappingFunction<any>|RStream<any>|Array<RStream<any>>, options?: IndexOptions): RStream<{ created: number }>;
        indexCreate(indexName: string, options?: { multi: boolean, geo: boolean }): RStream<{ created: number }>;

        indexDrop(indexName: string): RStream<{ dropped: number }>;
        indexList(): RStream<string>;
        indexRename(oldName: string, newName: string, options?: { overwrite: boolean }): RStream<{ renamed: number }>;
        indexStatus(...indexName: string[]): RStream<IndexStatus>;
        indexWait(...indexName: string[]): RStream<IndexStatus>;

        insert(obj: T|RStream<T>, options?: InsertOptions): RStream<WriteResult<T>>;
        insert(obj1: T|RStream<T>, obj2: T|RStream<T>, options?: InsertOptions): RStream<WriteResult<T>>;
        insert(obj1: T|RStream<T>, obj2: T|RStream<T>, obj3: T|RStream<T>, options?: InsertOptions): RStream<WriteResult<T>>;
        insert(obj1: T|RStream<T>, obj2: T|RStream<T>, obj3: T|RStream<T>, obj4: T|RStream<T>, options?: InsertOptions): RStream<WriteResult<T>>;


        get(key: FieldType): RStream<T>;
        getAll(key: FieldType, options?: { index: string }): RStream<T>;
        getAll(key1: FieldType, key2: FieldType, options?: { index: string }): RStream<T>;
        getAll(key1: FieldType, key2: FieldType, key3: FieldType, options?: { index: string }): RStream<T>;
        getAll(key1: FieldType, key2: FieldType, key3: FieldType, key4: FieldType, options?: { index: string }): RStream<T>;

        between(lowKey: FieldType, highKey: FieldType, options?: { index?: string, leftBound?: string, rightBound?: string }): RStream<T>;
        getIntersecting(geometry: RStream<Geometry>, index: { index: string }): RStream<T>;
        getNearest(geometry: RStream<Point>, options: { index: string, maxResults?: number, maxDist?: number, unit?: string, geoSystem?: string }): RStream<T>;

        config(): RStream<TableConfig>;
        rebalance(): RStream<{ rebalanced: number, status_changes: ValueChange<TableStatus>[] }>;

        reconfigure(options: TableReconfigureOptions): RStream<{ reconfigured: number, config_changes: ValueChange<TableConfig>[], status_changes: ValueChange<TableStatus>[] }>;
        reconfigure(options: Repair): RStream<{ reconfigured: number, config_changes: ValueChange<TableConfig>[], status_changes: ValueChange<TableStatus>[] }>;
        status(): RStream<TableStatus>;

        sync(): RRunnable<T>;
        wait(options: WaitOptions): RStream<{ ready: number }>;
    }
    export type CoerceType = 'array'|'object'|'string'|'binary'|'number';
    export interface RRunnable<T> {
        do<TOut extends RStream<any>>(func: (res: RStream<T>) => TOut): TOut;
        do<TOut>(func: (res: RStream<T>) => TOut): RRunnable<TOut>;

        forEach<R>(func: (res: RStream<T>) => RStream<WriteResult<R>>): RRunnable<WriteResult<R>>;

        changes(options?: ChangesOptions): RStream<Changes<T>>;

        run(conn: Connection, options?: RunOptions): Promise<Cursor<T>|T>;
        run(conn: Connection, options: RunOptions, cb: (err: Error, result: Cursor<T>|T) => void): void;
        run(conn: Connection, cb: (err: Error, result: Cursor<T>|T) => void): void;
    }
    export interface RStream<T> extends RRunnable<T> {
        (attribute: string): RStream<any>;
        <R>(attribute: string): RStream<R>;
        getField(fieldName: string): RStream<any>;
        getField<R>(fieldName: string): RStream<R>;

        default(value: any): RStream<T>;

        update(obj: RFactory, options?: UpdateOptions): RStream<WriteResult<T>>;
        replace(obj: RFactory, options?: UpdateOptions): RStream<WriteResult<T>>;
        delete(options?: DeleteOptions): RStream<WriteResult<T>>;

        //FROM

        innerJoin<T2>(other: RStream<T2>, predicate: (doc1: RStream<T>, doc2: RStream<T2>) => boolean|RStream<boolean>): RStream<JoinResult<T, T2>>;
        outerJoin<T2>(other: RStream<T2>, predicate: (doc1: RStream<T>, doc2: RStream<T2>) => boolean|RStream<boolean>): RStream<JoinResult<T, T2>>; //actually left join
        eqJoin<T2>(fieldOrPredicate: string|((doc1: RStream<T>) => boolean|RStream<boolean>), rightTable: string, options?: { index: string }): RStream<JoinResult<T, T2>>;

        zip<TZipped>(): RStream<TZipped>;

        union<T2>(other: RStream<T2>): RStream<T|T2>;

        map<TMapped>(mapFunction: (doc: RStream<T>) => any): RStream<TMapped>;
        map<TMapped, T1>(stream1: RStream<T1>, mapFunction: (doc: RStream<T>, doc1: RStream<T1>) => any): RStream<TMapped>;
        map<TMapped, T1, T2>(stream1: RStream<T1>, stream2: RStream<T2>, mapFunction: (doc: RStream<T>, doc1: RStream<T1>, doc2: RStream<T2>) => any): RStream<TMapped>;
        map<TMapped, T1, T2, T3>(stream1: RStream<T1>, stream2: RStream<T2>, stream3: RStream<T3>, mapFunction: (doc: RStream<T>, doc1: RStream<T1>, doc2: RStream<T2>, doc3: RStream<T3>) => any): RStream<TMapped>;

        map(mapFunction: (doc: RStream<T>) => any): RStream<any>;
        map<T1>(stream1: RStream<T1>, mapFunction: (doc: RStream<T>, doc1: RStream<T1>) => any): RStream<any>;
        map<T1, T2>(stream1: RStream<T1>, stream2: RStream<T2>, mapFunction: (doc: RStream<T>, doc1: RStream<T1>, doc2: RStream<T2>) => any): RStream<any>;
        map<T1, T2, T3>(stream1: RStream<T1>, stream2: RStream<T2>, stream3: RStream<T3>, mapFunction: (doc: RStream<T>, doc1: RStream<T1>, doc2: RStream<T2>, doc3: RStream<T3>) => any): RStream<any>;

        concatMap<TMapped>(mapFunction: RStream<any>|((doc: RStream<T>) => any)): RStream<TMapped>;

        //WHERE

        withFields(...fields: string[]): RStream<T>; //subset of T
        hasFields(...fields: string[]): RStream<boolean>;
        filter(predicate: Predicate<T>|Object, options?: { default: FieldType }): RStream<T>;
        includes(geometry: RStream<Geometry>): RStream<Geometry>;
        intersects(geometry: RStream<Geometry>): RStream<Geometry>;

        //LOGIC
        contains(value: FieldType|Predicate<T>): RStream<boolean>;

        //ORDER BY
        orderBy(index: { index: string }): RStream<T>;
        orderBy(field: RFactory, index?: { index: string }): RStream<T>;
        orderBy(field1: RFactory, field2: RFactory, index?: { index: string }): RStream<T>;
        orderBy(field1: RFactory, field2: RFactory, field3: RFactory, index?: { index: string }): RStream<T>;
        orderBy(field1: RFactory, field2: RFactory, field3: RFactory, field4: RFactory, index?: { index: string }): RStream<T>;

        //GROUP
        group(field: RFactory, index?: { index?: string; multi?: boolean }): RGrouppedStream<any, T>;
        group(field1: RFactory, field2: RFactory, index?: { index?: string; multi?: boolean }): RGrouppedStream<any, T>;
        group(field1: RFactory, field2: RFactory, field3: RFactory, index?: { index?: string; multi?: boolean }): RGrouppedStream<any, T>;
        group(field1: RFactory, field2: RFactory, field3: RFactory, field4: RFactory, index?: { index?: string; multi?: boolean }): RGrouppedStream<any, T>;
        group<TKey>(field: RFactory, index?: { index?: string; multi?: boolean }): RGrouppedStream<TKey, T>;
        group<TKey>(field1: RFactory, field2: RFactory, index?: { index?: string; multi?: boolean }): RGrouppedStream<TKey, T>;
        group<TKey>(field1: RFactory, field2: RFactory, field3: RFactory, index?: { index?: string; multi?: boolean }): RGrouppedStream<TKey, T>;
        group<TKey>(field1: RFactory, field2: RFactory, field3: RFactory, field4: RFactory, index?: { index?: string; multi?: boolean }): RGrouppedStream<TKey, T>;

        //SELECT FUNCTIONS
        count(value?: FieldType|Predicate<T>): RStream<number>;
        sum(value?: FieldType|Predicate<T>): RStream<number>;
        avg(value?: FieldType|Predicate<T>): RStream<number>;
        min(value?: FieldType|Predicate<T>): RStream<T>;
        max(value?: FieldType|Predicate<T>): RStream<T>;
        reduce(reduceFunction: (left: RStream<T>, right: RStream<T>) => RStream<T>): RStream<T>;
        reduce<U>(reduceFunction: (left: RStream<U>, right: RStream<T>) => RStream<U>): RStream<U>;

        //SELECT
        distinct(): RStream<T>;
        distinct<TIndex>(index: { index: string }): RStream<TIndex>;
        pluck(...fieldNames: string[]): RStream<T>; //subset of T
        without(...fieldNames: any[]): RStream<T>; //subset of T
        merge<TOut>(...objects: any[]): RStream<TOut>;
        merge(...objects: any[]): RStream<T>;
        //merge<TOut>(...objects: RStream<any>[]): RStream<TOut>;
        //merge<TOut>(func: (f: RStream<T>) => any): RStream<TOut>;

        skip(n: number): RStream<T>;
        limit(n: number): RStream<T>;
        slice(start: number, end?: number, options?: { leftBound: string, rightBound: string }): RStream<T>;
        nth(n: number): RStream<T>;
        sample(n: number): RStream<T>;
        offsetOf(single: RStream<T>|Predicate<T>): RStream<number>;

        isEmpty(): RStream<boolean>;


        coerceTo<ArrayOfT>(type: 'array'): RStream<ArrayOfT>;
        coerceTo(type: 'array'): RStream<any>;
        coerceTo<T>(type: 'object'): RStream<T>;
        coerceTo(type: 'string'): RStream<string>;
        coerceTo(type: 'number'): RStream<number>;
        coerceTo(type: 'binary'): RStream<Buffer>;
        coerceTo(type: CoerceType): RStream<any>;
        typeOf(): RStream<string>;
        info(): RStream<Object>;

        //These are available when the result is a single value
        (attribute: string|number): RStream<any>;
        default(value: any): RStream<T>;
        hasFields(...fields: string[]): RStream<T>;
        //Works only if T is an array
        append(value: FieldType): RStream<T>;
        prepend(value: FieldType): RStream<T>;
        difference(value: Array<FieldType>|RStream<T[]>): RStream<T>;
        setInsert(value: FieldType): RStream<T>;
        setUnion(value: FieldType): RStream<T>;
        setIntersection(value: Array<FieldType>|RStream<T[]>): RStream<T>;
        setDifference(value: Array<FieldType>|RStream<T[]>): RStream<T>;
        insertAt(index: number, value: FieldType): RStream<T>;
        changeAt(index: number, value: FieldType): RStream<T>;
        spliceAt(index: number, value: Array<FieldType>|RStream<T[]>): RStream<T>;
        deleteAt(index: number, endIndex?: number): RStream<T>;
        //Works only if T is a string
        match(regexp: string): RStream<MatchResults>;
        split(seperator: string, maxSplits?: number): RStream<string>;
        upcase(): RStream<string>;
        downcase(): RStream<string>;
        add(...str: Array<RString>): RStream<string>;
        gt(...value: Array<RString>): RStream<boolean>;
        ge(...value: Array<RString>): RStream<boolean>;
        lt(...value: Array<RString>): RStream<boolean>;
        le(...value: Array<RString>): RStream<boolean>;
        //Works only for numbers
        add(...num: Array<RNumber>): RStream<number&Date>;
        sub(...num: Array<RNumber|RDate>): RStream<number&Date>;
        mul(...num: Array<RNumber>): RStream<T|number>;
        div(...num: Array<RNumber>): RStream<number>;
        mod(...num: Array<RNumber>): RStream<number>;
        gt(...value: Array<RNumber>): RStream<boolean>;
        ge(...value: Array<RNumber>): RStream<boolean>;
        lt(...value: Array<RNumber>): RStream<boolean>;
        le(...value: Array<RNumber>): RStream<boolean>;
        round(): RStream<number>;
        ceil(): RStream<number>;
        floor(): RStream<number>;
        //Works only for bool
        and(...bool: Array<boolean|RStream<boolean>>): RStream<boolean>;
        or(...bool: Array<boolean|RStream<boolean>>): RStream<boolean>;
        not(): RStream<boolean>;
        //Works only for Date
        inTimezone(timezone: string): RStream<Date>;
        timezone(): RStream<string>;
        during(start: RDate, end: RDate, options?: { leftBound: string, rightBound: string }): RStream<boolean>;
        date(): RStream<Date>;
        timeOfDay(): RStream<number>;
        year(): RStream<number>;
        month(): RStream<number>;
        day(): RStream<number>;
        dayOfWeek(): RStream<number>;
        dayOfYear(): RStream<number>;
        hours(): RStream<number>;
        minutes(): RStream<number>;
        seconds(): RStream<number>;
        toISO8601(): RStream<string>;
        toEpochTime(): RStream<number>;
        //Works only for geo
        distance(geo: RStream<Geometry>, options: { geoSystem: string, unit: string }): RStream<number>;
        toGeojson(): RStream<Object>;
        includes(geometry: RStream<Geometry>): RStream<boolean>;
        intersects(geometry: RStream<Geometry>): RStream<boolean>;
        //Works only for line
        fill(): RStream<Polygon>;
        polygonSub(polygon2: RStream<Polygon>): RStream<Polygon>;


        toJsonString(): RStream<string>;
        toJSON(): RStream<string>;

        eq(...value: Array<FieldType|RStream<any>>): RStream<boolean>;
        ne(...value: Array<FieldType|RStream<any>>): RStream<boolean>;


        keys(): RStream<string>;
        values(): RStream<string>;
    }

    export interface RGrouppedStream<TKey, T> extends RRunnable<GroupResults<TKey, T>> {
        (attribute: string): RGrouppedStream<TKey, any>;
        <R>(attribute: string): RGrouppedStream<TKey, R>;
        getField(fieldName: string): RGrouppedStream<TKey, any>;
        getField<R>(fieldName: string): RGrouppedStream<TKey, R>;

        default(value: any): RGrouppedStream<TKey, T>;


        delete(options?: DeleteOptions): RGrouppedStream<TKey, WriteResult<T>>;

        //FROM

        innerJoin<T2>(other: RStream<T2>, predicate: (doc1: RStream<T>, doc2: RStream<T2>) => boolean|RStream<boolean>): RGrouppedStream<TKey, JoinResult<T, T2>>;
        outerJoin<T2>(other: RStream<T2>, predicate: (doc1: RStream<T>, doc2: RStream<T2>) => boolean|RStream<boolean>): RGrouppedStream<TKey, JoinResult<T, T2>>; //actually left join
        eqJoin<T2>(fieldOrPredicate: string|((doc1: RStream<T>) => boolean|RStream<boolean>), rightTable: string, options?: { index: string }): RGrouppedStream<TKey, JoinResult<T, T2>>;

        zip<TZipped>(): RGrouppedStream<TKey, TZipped>;

        union<T2>(other: RStream<T2>): RGrouppedStream<TKey, T|T2>;

        map<TMapped>(mapFunction: (doc: RStream<T>) => any): RGrouppedStream<TKey, TMapped>;
        map<TMapped, T1>(stream1: RStream<T1>, mapFunction: (doc: RStream<T>, doc1: RStream<T1>) => any): RGrouppedStream<TKey, TMapped>;
        map<TMapped, T1, T2>(stream1: RStream<T1>, stream2: RStream<T2>, mapFunction: (doc: RStream<T>, doc1: RStream<T1>, doc2: RStream<T2>) => any): RGrouppedStream<TKey, TMapped>;
        map<TMapped, T1, T2, T3>(stream1: RStream<T1>, stream2: RStream<T2>, stream3: RStream<T3>, mapFunction: (doc: RStream<T>, doc1: RStream<T1>, doc2: RStream<T2>, doc3: RStream<T3>) => any): RGrouppedStream<TKey, TMapped>;

        map(mapFunction: (doc: RStream<T>) => any): RGrouppedStream<TKey, any>;
        map<T1>(stream1: RStream<T1>, mapFunction: (doc: RStream<T>, doc1: RStream<T1>) => any): RGrouppedStream<TKey, any>;
        map<T1, T2>(stream1: RStream<T1>, stream2: RStream<T2>, mapFunction: (doc: RStream<T>, doc1: RStream<T1>, doc2: RStream<T2>) => any): RGrouppedStream<TKey, any>;
        map<T1, T2, T3>(stream1: RStream<T1>, stream2: RStream<T2>, stream3: RStream<T3>, mapFunction: (doc: RStream<T>, doc1: RStream<T1>, doc2: RStream<T2>, doc3: RStream<T3>) => any): RGrouppedStream<TKey, any>;

        concatMap(mapFunction: (doc: RStream<T>) => any): RGrouppedStream<TKey, any>;
        concatMap<TMapped>(mapFunction: (doc: RStream<T>) => any): RGrouppedStream<TKey, TMapped>;

        //WHERE

        withFields(...fields: string[]): RGrouppedStream<TKey, T>; //subset of T
        hasFields(...fields: string[]): RGrouppedStream<TKey, T>;
        filter(predicate: Predicate<T>|Object, options?: { default: FieldType }): RGrouppedStream<TKey, T>;
        includes(geometry: RStream<Geometry>): RGrouppedStream<TKey, Geometry>;
        intersects(geometry: RStream<Geometry>): RGrouppedStream<TKey, Geometry>;

        //LOGIC
        contains(value: FieldType|Predicate<T>): RGrouppedStream<TKey, boolean>;

        //ORDER BY
        orderBy(field: RFactory, index?: { index: string }): RGrouppedStream<TKey, T>;
        orderBy(field1: RFactory, field2: RFactory, index?: { index: string }): RGrouppedStream<TKey, T>;
        orderBy(field1: RFactory, field2: RFactory, field3: RFactory, index?: { index: string }): RGrouppedStream<TKey, T>;
        orderBy(field1: RFactory, field2: RFactory, field3: RFactory, field4: RFactory, index?: { index: string }): RGrouppedStream<TKey, T>;

        //GROUP
        //group(field: RFactory, index?: { index?: string; multi?: boolean }): GrouppedRStreamArray<T>;
        //group(field1: RFactory, field2: RFactory, index?: { index?: string; multi?: boolean }): GrouppedRStreamArray<T>;
        //group(field1: RFactory, field2: RFactory, field3: RFactory, index?: { index?: string; multi?: boolean }): GrouppedRStreamArray<T>;
        //group(field1: RFactory, field2: RFactory, field3: RFactory, field4: RFactory, index?: { index?: string; multi?: boolean }): GrouppedRStreamArray<T>;

        //SELECT FUNCTIONS
        count(value?: FieldType|Predicate<T>): RGrouppedStream<TKey, number>;
        sum(value?: FieldType|Predicate<T>): RGrouppedStream<TKey, number>;
        avg(value?: FieldType|Predicate<T>): RGrouppedStream<TKey, number>;
        min(value?: FieldType|Predicate<T>): RGrouppedStream<TKey, T>;
        max(value?: FieldType|Predicate<T>): RGrouppedStream<TKey, T>;
        reduce(reduceFunction: (left: RStream<T>, right: RStream<T>) => RStream<T>): RGrouppedStream<TKey, T>;

        //SELECT
        distinct(): RGrouppedStream<TKey, T>;
        pluck(...fieldNames: string[]): RGrouppedStream<TKey, T>; //subset of T
        without(...fieldNames: any[]): RGrouppedStream<TKey, T>; //subset of T
        //merge<TOut>(...objects: RStream<any>[]): RGrouppedStream<TKey, TOut>;
        //merge<TOut>(func: RStreamFactory<T>): RGrouppedStream<TKey, TOut>;
        merge<TOut>(...objects: any[]): RGrouppedStream<TKey, TOut>;
        merge(...objects: any[]): RGrouppedStream<TKey, T>;

        skip(n: number): RGrouppedStream<TKey, T>;
        limit(n: number): RGrouppedStream<TKey, T>;
        slice(start: number, end?: number, options?: { leftBound: string, rightBound: string }): RGrouppedStream<TKey, T>;
        nth(n: number): RGrouppedStream<TKey, T>;
        sample(n: number): RGrouppedStream<TKey, T>;
        offsetOf(single: RStream<T>|Predicate<T>): RGrouppedStream<TKey, number>;

        isEmpty(): RGrouppedStream<TKey, boolean>;


        coerceTo<ArrayOfT>(type: 'array'): RGrouppedStream<TKey, ArrayOfT>;
        coerceTo(type: 'array'): RGrouppedStream<TKey, any>;
        coerceTo<T>(type: 'object'): RGrouppedStream<TKey, T>;
        coerceTo(type: 'string'): RGrouppedStream<TKey, string>;
        coerceTo(type: 'number'): RGrouppedStream<TKey, number>;
        coerceTo(type: 'binary'): RGrouppedStream<TKey, Buffer>;
        coerceTo(type: CoerceType): RGrouppedStream<TKey, any>;
        typeOf(): RStream<string>;
        info(): RStream<Object>;

        //These are available when the result is a single value
        (attribute: string|number): RGrouppedStream<TKey, any>;
        default(value: any): RGrouppedStream<TKey, T>;
        hasFields(...fields: string[]): RGrouppedStream<TKey, T>;
        //Works only if T is an array
        append(value: FieldType): RGrouppedStream<TKey, T>;
        prepend(value: FieldType): RGrouppedStream<TKey, T>;
        difference(value: Array<FieldType>|RStream<T[]>): RGrouppedStream<TKey, T>;
        setInsert(value: FieldType): RGrouppedStream<TKey, T>;
        setUnion(value: FieldType): RGrouppedStream<TKey, T>;
        setIntersection(value: Array<FieldType>|RStream<T[]>): RGrouppedStream<TKey, T>;
        setDifference(value: Array<FieldType>|RStream<T[]>): RGrouppedStream<TKey, T>;
        insertAt(index: number, value: FieldType): RGrouppedStream<TKey, T>;
        changeAt(index: number, value: FieldType): RGrouppedStream<TKey, T>;
        spliceAt(index: number, value: Array<FieldType>|RStream<T[]>): RGrouppedStream<TKey, T>;
        deleteAt(index: number, endIndex?: number): RGrouppedStream<TKey, T>;
        //Works only if T is a string
        match(regexp: string): RGrouppedStream<TKey, MatchResults>;
        split(seperator: string, maxSplits?: number): RGrouppedStream<TKey, string>;
        upcase(): RGrouppedStream<TKey, string>;
        downcase(): RGrouppedStream<TKey, string>;
        add(...str: Array<RString>): RGrouppedStream<TKey, string>;
        gt(...value: Array<RString>): RGrouppedStream<TKey, boolean>;
        ge(...value: Array<RString>): RGrouppedStream<TKey, boolean>;
        lt(...value: Array<RString>): RGrouppedStream<TKey, boolean>;
        le(...value: Array<RString>): RGrouppedStream<TKey, boolean>;
        //Works only for numbers
        add(...num: Array<RNumber>): RGrouppedStream<TKey, number|Date>;
        sub(...num: Array<RNumber|RDate>): RGrouppedStream<TKey, number|Date>;
        mul(...num: Array<RNumber>): RGrouppedStream<TKey, T|number>;
        div(...num: Array<RNumber>): RGrouppedStream<TKey, number>;
        mod(...num: Array<RNumber>): RGrouppedStream<TKey, number>;
        gt(...value: Array<RNumber>): RGrouppedStream<TKey, boolean>;
        ge(...value: Array<RNumber>): RGrouppedStream<TKey, boolean>;
        lt(...value: Array<RNumber>): RGrouppedStream<TKey, boolean>;
        le(...value: Array<RNumber>): RGrouppedStream<TKey, boolean>;
        round(): RGrouppedStream<TKey, number>;
        ceil(): RGrouppedStream<TKey, number>;
        floor(): RGrouppedStream<TKey, number>;
        //Works only for bool
        and(...bool: Array<boolean|RStream<boolean>>): RGrouppedStream<TKey, boolean>;
        or(...bool: Array<boolean|RStream<boolean>>): RGrouppedStream<TKey, boolean>;
        not(): RGrouppedStream<TKey, boolean>;
        //Works only for Date
        inTimezone(timezone: string): RGrouppedStream<TKey, Date>;
        timezone(): RGrouppedStream<TKey, string>;
        during(start: RDate, end: RDate, options?: { leftBound: string, rightBound: string }): RGrouppedStream<TKey, boolean>;
        date(): RGrouppedStream<TKey, Date>;
        timeOfDay(): RGrouppedStream<TKey, number>;
        year(): RGrouppedStream<TKey, number>;
        month(): RGrouppedStream<TKey, number>;
        day(): RGrouppedStream<TKey, number>;
        dayOfWeek(): RGrouppedStream<TKey, number>;
        dayOfYear(): RGrouppedStream<TKey, number>;
        hours(): RGrouppedStream<TKey, number>;
        minutes(): RGrouppedStream<TKey, number>;
        seconds(): RGrouppedStream<TKey, number>;
        toISO8601(): RStream<string>;
        toEpochTime(): RStream<number>;
        //Works only for geo
        distance(geo: RStream<Geometry>, options: { geoSystem: string, unit: string }): RGrouppedStream<TKey, number>;
        toGeojson(): RGrouppedStream<TKey, Object>;
        includes(geometry: RStream<Geometry>): RGrouppedStream<TKey, boolean>;
        intersects(geometry: RStream<Geometry>): RGrouppedStream<TKey, boolean>;
        //Works only for line
        fill(): RGrouppedStream<TKey, Polygon>;
        polygonSub(polygon2: RStream<Polygon>): RGrouppedStream<TKey, Polygon>;


        toJsonString(): RGrouppedStream<TKey, string>;
        toJSON(): RGrouppedStream<TKey, string>;

        eq(...value: Array<FieldType|RStream<any>>): RGrouppedStream<TKey, boolean>;
        ne(...value: Array<FieldType|RStream<any>>): RGrouppedStream<TKey, boolean>;


        keys(): RGrouppedStream<TKey, string>;
        values(): RGrouppedStream<TKey, string>;

        ungroup(): RStream<GroupResults<TKey, T>>;
    }

    export interface Predicate<T> {
        (doc: RStream<T>): boolean|RStream<boolean>;
    }
    export interface MappingFunction<T> {
        (row: RStream<T>): any;
    }

    /*
     changing to any, it's just too much
     interface RStreamFactory<T> {
     (doc: RStream<T>): any;
     }
     */
    export interface R {
        minval: any;
        maxval: any;

        connect(options: ConnectionOptions, cb: (err: Error, conn: Connection) => void): void;
        connect(host: string, cb: (err: Error, conn: Connection) => void): void;
        connect(options: ConnectionOptions): Promise<Connection>;
        connect(host: string): Promise<Connection>;

        dbCreate(dbName: string): RStream<DBChangeResult>;
        dbDrop(dbName: string): RStream<DBChangeResult>;
        dbList(): RStream<string>;
        db(dbName: string): RDatabase;

        //For default database
        tableCreate(tableName: string, options?: TableCreateOptions): RStream<TableChangeResult>;
        tableDrop(tableName: string): RStream<TableChangeResult>;
        tableList(): RStream<string>;
        table<T>(tableName: string, options?: TableOptions): RTable<T>;
        //additional
        map<TMapped, T1>(stream1: RStream < T1 >, mapFunction: (doc1: RStream<T1>) => any): RStream<TMapped>;
        map<TMapped, T1, T2>(stream1: RStream < T1 >, stream2: RStream < T2 >, mapFunction: (doc1: RStream<T1>, doc2: RStream<T2>) => any): RStream<TMapped>;
        map<TMapped, T1, T2, T3>(stream1: RStream<T1>, stream2: RStream<T2>, stream3: RStream<T3>, mapFunction: (doc1: RStream<T1>, doc2: RStream<T2>, doc3: RStream<T3>) => any): RStream<TMapped>;

        row(name: string): RStream<FieldType>;
        literal(any: any): Literal;
        object(...keyValue: any[]): RStream<any>; //should be (key: string, value: any...)
        and(...bool: Array<boolean|RStream<boolean>>): RStream<boolean>;
        or(...bool: Array<boolean|RStream<boolean>>): RStream<boolean>;
        not(bool: boolean|RStream<boolean>): RStream<boolean>;
        random(lowBound?: number, highBound?: number, options?: { float: boolean }): RStream<number>;
        round(num: RNumber): RStream<number>;
        ceil(bool: RNumber): RStream<number>;
        floor(bool: RNumber): RStream<number>;
        now(): RStream<Date>;
        time(year: number, month: number, day: number, hour: number, minute: number, second: number, timezone: string): RStream<Date>;
        time(year: number, month: number, day: number, timezone: string): RStream<Date>;
        epochTime(epochTime: number): RStream<Date>;
        ISO8601(time: string, options?: { defaultTimezone: string }): RStream<Date>;
        args<T>(arg: T[]): T;
        binary(data: any): Buffer;
        branch(test: RStream<boolean>, trueBranch: any, falseBranch: any): RStream<any>;
        branch<T>(test: RStream<boolean>, trueBranch: any, falseBranch: any): RStream<T>;
        range(): RStream<number>;
        range(endValue: number): RStream<number>;
        range(startValue: number, endValue: number): RStream<number>;
        error(message?: string): any;
        expr<T>(val: T[]): RStream<T>;
        expr<T>(val: T): RStream<T>;
        js(js: string): RStream<any>;
        json(json: string): RStream<Object>;
        http(url: string, options: HttpRequestOptions): RStream<Object>;
        uuid(): RStream<string>;
        circle(longitudeLatitude: string[]|Point, radius: number, options: { numVertices: number, geoSystem: string, unit: string, fill: boolean }): RStream<Geometry>;
        line(...points: RStream<Point>[]): RStream<Line>;
        line(...longitudeLatitudes: string[][]): RStream<Line>;
        point(longitude: string, latitude: string): RStream<Point>;
        polygon(...points: RStream<Point>[]): RStream<Polygon>;
        polygon(...longitudeLatitudes: string[][]): RStream<Polygon>;

        geojson(geoJSON: Object): RStream<Geometry>;
        distance(geo1: RStream<Geometry>, geo2: RStream<Geometry>, options: { geoSystem: string, unit: string }): RStream<number>;
        intersects(stream: RStream<Geometry>, geometry: RStream<Geometry>): RStream<Geometry>;
        intersects(geometry1: RStream<Geometry>, geometry2: RStream<Geometry>): RStream<boolean>;
        wait(options: WaitOptions): RStream<{ ready: number }>;

        do<T>(arg: RStream<T>, func: (arg: RStream<T>) => any): RStream<any>;
        do<T1, T2>(arg1: RStream<T1>, arg2: RStream<T2>, func: (arg1: RStream<T1>, arg2: RStream<T2>) => any): RStream<any>;
        do<T1, T2, T3>(arg1: RStream<T1>, arg2: RStream<T2>, arg3: RStream<T3>, func: (arg1: RStream<T1>, arg2: RStream<T2>, arg3: RStream<T3>) => any): RStream<any>;
        do<T1, T2, T3, T4>(arg1: RStream<T1>, arg2: RStream<T2>, arg3: RStream<T3>, arg4: RStream<T4>, func: (arg1: RStream<T1>, arg2: RStream<T2>, arg3: RStream<T3>, arg4: RStream<T4>) => any): RStream<any>;
    }
    //let r: R;
    //export = r;
}
/* tslint:enable */