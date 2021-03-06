// Cannot implicitly shard accessed collections because of extra shard key index in sharded
// collection.
// @tags: [assumes_no_implicit_index_creation]

t = db.index_many2;
t.drop();

t.save({x: 1});

assert.eq(1, t.getIndexKeys().length, "A1");

function make(n) {
    var x = {};
    x["x" + n] = 1;
    return x;
}

for (i = 1; i < 1000; i++) {
    t.createIndex(make(i));
}

assert.eq(64, t.getIndexKeys().length, "A2");

num = t.getIndexKeys().length;

t.dropIndex(make(num - 1));
assert.eq(num - 1, t.getIndexKeys().length, "B0");

t.createIndex({z: 1});
assert.eq(num, t.getIndexKeys().length, "B1");

t.dropIndexes("*");
assert.eq(1, t.getIndexKeys().length, "C1");
